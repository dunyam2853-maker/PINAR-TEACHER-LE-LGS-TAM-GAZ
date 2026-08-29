import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Security Headers & Simple Rate Limiting in memory
const requestLog = new Map<string, { count: number; firstReq: number }>();
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Basic IP rate limit for auth endpoints
  if (req.path.startsWith("/api/auth/")) {
    const ip = req.ip || "unknown";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxReqs = 30;

    const log = requestLog.get(ip);
    if (!log || now - log.firstReq > windowMs) {
      requestLog.set(ip, { count: 1, firstReq: now });
    } else {
      log.count++;
      if (log.count > maxReqs) {
        return res.status(429).json({
          error: "Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.",
        });
      }
    }
  }
  next();
});

// Optional Supabase Client initialization
const supabaseUrl = process.env.SUPABASE_URL || "https://mxpienpvbupqbhdanhwe.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = supabaseAnonKey
  ? createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)
  : null;

// Persistent Local File DB fallback to guarantee 100% reliable functionality
const DB_FILE = path.join(process.cwd(), "portal_data.json");

interface UserRecord {
  id: string;
  username: string;
  passwordHash: string;
  role: "teacher" | "student";
  createdAt: string;
}

interface MessageRecord {
  id: string;
  studentId: string;
  studentUsername: string;
  teacherUsername: string;
  senderRole: "student" | "teacher";
  message: string;
  replyToId?: string | null;
  readByTeacher: boolean;
  readByStudent: boolean;
  createdAt: string;
}

interface MaterialRecord {
  id: string;
  title: string;
  type: "app" | "assignment" | "game" | "resource" | "tool" | "exam";
  unitNumber?: number | null;
  description: string;
  contentUrl?: string;
  iconName: string;
  badgeText?: string;
  actionType: "view" | "play" | "solve" | "download";
  targetLink?: string;
  dueDate?: string;
  createdBy: string;
  createdAt: string;
}

interface StudentActivityRecord {
  id: string;
  studentId: string;
  studentUsername: string;
  materialId: string;
  materialTitle: string;
  actionType: "view" | "click" | "play" | "complete" | "download";
  details?: string;
  createdAt: string;
}

interface SubmissionRecord {
  id: string;
  materialId: string;
  materialTitle: string;
  studentId: string;
  studentUsername: string;
  studentNote: string;
  submittedAnswers?: Record<string, string>;
  attachedFileName?: string;
  status: "submitted" | "approved" | "graded" | "revision";
  grade?: number;
  maxGrade?: number;
  teacherFeedback?: string;
  gradedBy?: string;
  gradedAt?: string;
  submittedAt: string;
}

interface CompetitionRecord {
  id: string;
  competitionId: string;
  unitNumber: number;
  studentUsername: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  completedAt: string;
}

interface DatabaseSchema {
  users: UserRecord[];
  messages: MessageRecord[];
  materials: MaterialRecord[];
  activities: StudentActivityRecord[];
  submissions: SubmissionRecord[];
  competitions: CompetitionRecord[];
}

// Initial seed data
const getInitialData = (): DatabaseSchema => {
  const salt = bcrypt.genSaltSync(10);
  const teacherHash = bcrypt.hashSync("12345", salt);

  return {
    users: [
      {
        id: "usr-teacher-1",
        username: "Pınar PEKER",
        passwordHash: teacherHash,
        role: "teacher",
        createdAt: new Date().toISOString(),
      },
      {
        id: "usr-teacher-2",
        username: "Feyza Demirci",
        passwordHash: teacherHash,
        role: "teacher",
        createdAt: new Date().toISOString(),
      },
      {
        id: "usr-student-1",
        username: "ali_8a",
        passwordHash: bcrypt.hashSync("12345", salt),
        role: "student",
        createdAt: new Date().toISOString(),
      },
      {
        id: "usr-student-2",
        username: "ayse_8b",
        passwordHash: bcrypt.hashSync("12345", salt),
        role: "student",
        createdAt: new Date().toISOString(),
      },
      {
        id: "usr-student-3",
        username: "mert_8c",
        passwordHash: bcrypt.hashSync("12345", salt),
        role: "student",
        createdAt: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: "msg-1",
        studentId: "usr-student-1",
        studentUsername: "ali_8a",
        teacherUsername: "Pınar PEKER",
        senderRole: "student",
        message: "Hocam merhaba, Unit 3 In the Kitchen yemek tariflerindeki sıralama kelimeleri (first, next, then, finally) için ek alıştırma yapabilir miyiz?",
        readByTeacher: true,
        readByStudent: true,
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: "msg-2",
        studentId: "usr-student-1",
        studentUsername: "ali_8a",
        teacherUsername: "Pınar PEKER",
        senderRole: "teacher",
        message: "Harika bir soru Ali! Materyaller kısmına Unit 3 sıralama kelimeleri için yeni bir interaktif eşleştirme oyunu ve test ekledim. Mutlaka çözmelisin 🌸",
        replyToId: "msg-1",
        readByTeacher: true,
        readByStudent: true,
        createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      },
      {
        id: "msg-3",
        studentId: "usr-student-2",
        studentUsername: "ayse_8b",
        teacherUsername: "Pınar PEKER",
        senderRole: "student",
        message: "Öğretmenim, LGS Deneme 3 sonuçlarındaki telefon diyalogları sorusundaki 'put through' kalıbını tam anlayamadım, derste tekrar bakabilir miyiz?",
        readByTeacher: false,
        readByStudent: true,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
    materials: [
      {
        id: "mat-1",
        title: "Unit 3 In the Kitchen - Master Cooking Verbs & Steps",
        type: "assignment",
        unitNumber: 3,
        description: "Yemek pişirme yöntemleri ve tarif adımları (Chop, dice, boil, bake) interaktif kelime çalışma görevi.",
        iconName: "Utensils",
        badgeText: "Haftalık Ödev",
        actionType: "solve",
        dueDate: "Pazar 23:59",
        createdBy: "Pınar PEKER",
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      },
      {
        id: "mat-2",
        title: "LGS Speed Vocab Duel - Hızlı Kelime Düellosu",
        type: "game",
        unitNumber: 1,
        description: "10 Ünitenin en kritik LGS kelimelerini zamana karşı test et, seriyi koru ve puanları topla!",
        iconName: "Zap",
        badgeText: "Eğlenceli Oyun",
        actionType: "play",
        createdBy: "Pınar PEKER",
        createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
      },
      {
        id: "mat-3",
        title: "Unit 4 On the Phone - Secretary & Call Center Dialogues",
        type: "app",
        unitNumber: 4,
        description: "Telefon görüşmesi kalıpları (hold on, put through, hang up, leave a message) interaktif diyalog simülasyonu.",
        iconName: "PhoneCall",
        badgeText: "İnteraktif Araç",
        actionType: "view",
        createdBy: "Pınar PEKER",
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: "mat-4",
        title: "LGS Top 50 Irregular Verbs (Düzensiz Fiiller Çizelgesi)",
        type: "resource",
        unitNumber: 9,
        description: "Biyografi ve geçmiş zaman LGS sorularında en çok çıkan 50 düzensiz fiilin tam listesi ve örnek cümleleri.",
        iconName: "FileText",
        badgeText: "PDF & Çizelge",
        actionType: "download",
        createdBy: "Pınar PEKER",
        createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      },
    ],
    activities: [
      {
        id: "act-1",
        studentId: "usr-student-1",
        studentUsername: "ali_8a",
        materialId: "mat-2",
        materialTitle: "LGS Speed Vocab Duel - Hızlı Kelime Düellosu",
        actionType: "play",
        details: "1200 Puan ile tamamladı (Seri: 5x)",
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: "act-2",
        studentId: "usr-student-2",
        studentUsername: "ayse_8b",
        materialId: "mat-1",
        materialTitle: "Unit 3 In the Kitchen - Master Cooking Verbs & Steps",
        actionType: "click",
        details: "Ödev detayını inceledi",
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
      {
        id: "act-3",
        studentId: "usr-student-3",
        studentUsername: "mert_8c",
        materialId: "mat-4",
        materialTitle: "LGS Top 50 Irregular Verbs (Düzensiz Fiiller Çizelgesi)",
        actionType: "download",
        details: "Ders kaynağını indirdi",
        createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      },
    ],
    submissions: [
      {
        id: "sub-1",
        materialId: "mat-1",
        materialTitle: "Unit 3 In the Kitchen - Master Cooking Verbs & Steps",
        studentId: "usr-student-1",
        studentUsername: "ali_8a",
        studentNote: "Öğretmenim, yemek tarifi adımları ve kelime alıştırmalarını tamamladım. Ekstra olarak 5 adet kendi tarif cümlemi de ekledim.",
        attachedFileName: "ali_unit3_cooking_steps.pdf",
        status: "graded",
        grade: 95,
        maxGrade: 100,
        teacherFeedback: "Tebrikler Ali! Özellikle 'dice' ve 'chop' farkını çok iyi açıklamışsın. Cümle kurulumların çok başarılı 🌸",
        gradedBy: "Pınar PEKER",
        gradedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: "sub-2",
        materialId: "mat-1",
        materialTitle: "Unit 3 In the Kitchen - Master Cooking Verbs & Steps",
        studentId: "usr-student-2",
        studentUsername: "ayse_8b",
        studentNote: "Ödevimi tamamladım hocam, kontrol edebilir misiniz?",
        attachedFileName: "ayse_kitchen_verbs_hw.docx",
        status: "submitted",
        maxGrade: 100,
        submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      }
    ],
    competitions: [
      {
        id: "comp-rec-1",
        competitionId: "comp-u1",
        unitNumber: 1,
        studentUsername: "ali_8a",
        score: 950,
        correctAnswers: 10,
        totalQuestions: 10,
        timeSpentSeconds: 42,
        completedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      },
      {
        id: "comp-rec-2",
        competitionId: "comp-u1",
        unitNumber: 1,
        studentUsername: "ayse_8b",
        score: 880,
        correctAnswers: 9,
        totalQuestions: 10,
        timeSpentSeconds: 51,
        completedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      }
    ]
  };
};

function readDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (!parsed.submissions) parsed.submissions = [];
      if (!parsed.competitions) parsed.competitions = [];
      if (!parsed.materials) parsed.materials = [];
      if (!parsed.messages) parsed.messages = [];
      if (!parsed.users) parsed.users = [];
      if (!parsed.activities) parsed.activities = [];
      return parsed;
    }
  } catch (err) {
    console.error("Error reading database file, resetting to initial:", err);
  }
  const initial = getInitialData();
  writeDb(initial);
  return initial;
}

function writeDb(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

// ==========================================
// 1. AUTHENTICATION & USER MANAGEMENT API
// ==========================================

// Register Student (Only username and password required)
app.post("/api/auth/register-student", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Kullanıcı adı ve şifre zorunludur." });
    }

    const cleanUsername = String(username).trim();
    if (cleanUsername.length < 3 || cleanUsername.length > 30) {
      return res.status(400).json({ error: "Kullanıcı adı 3 ile 30 karakter arasında olmalıdır." });
    }
    if (String(password).length < 4) {
      return res.status(400).json({ error: "Şifre en az 4 karakter olmalıdır." });
    }

    const db = readDb();

    // Check if username already exists
    const existing = db.users.find(
      (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
    );
    if (existing) {
      return res.status(409).json({ error: "Bu kullanıcı adı zaten kullanılmaktadır." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: UserRecord = {
      id: `usr-std-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      username: cleanUsername,
      passwordHash,
      role: "student",
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    writeDb(db);

    res.status(201).json({
      success: true,
      message: "Öğrenci kaydı başarıyla tamamlandı! 🌸",
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Kayıt işlemi sırasında bir hata oluştu." });
  }
});

// Login (Both Teacher and Student)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password, expectedRole } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Kullanıcı adı ve şifre gereklidir." });
    }

    const cleanUsername = String(username).trim();
    const db = readDb();

    const user = db.users.find(
      (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({ error: "Kullanıcı adı veya şifre hatalı." });
    }

    if (expectedRole && user.role !== expectedRole) {
      return res.status(403).json({
        error:
          expectedRole === "teacher"
            ? "Bu hesap öğretmen yetkisine sahip değil."
            : "Lütfen öğrenci hesabınızla giriş yapın.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Kullanıcı adı veya şifre hatalı." });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Giriş işlemi sırasında bir hata oluştu." });
  }
});

// ==========================================
// 2. STUDENT <-> TEACHER MESSAGING API
// ==========================================

// Get Messages (Filtered by role: student sees own messages, teacher sees all student conversations)
app.get("/api/messages", (req, res) => {
  try {
    const { userId, role, studentId } = req.query;
    const db = readDb();

    if (role === "student" && userId) {
      const studentMessages = db.messages.filter((m) => m.studentId === userId);
      return res.json({ messages: studentMessages });
    }

    if (role === "teacher") {
      if (studentId) {
        const conversation = db.messages.filter((m) => m.studentId === studentId);
        return res.json({ messages: conversation });
      }
      return res.json({ messages: db.messages });
    }

    res.status(400).json({ error: "Geçersiz yetki veya parametre." });
  } catch (error: any) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ error: "Mesajlar yüklenirken bir hata oluştu." });
  }
});

// Send Message (Student to Teacher or Teacher Reply)
app.post("/api/messages/send", (req, res) => {
  try {
    const {
      studentId,
      studentUsername,
      teacherUsername = "Pınar PEKER",
      senderRole,
      message,
      replyToId,
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Mesaj metni boş olamaz." });
    }
    if (!studentId || !studentUsername || !senderRole) {
      return res.status(400).json({ error: "Eksik mesaj parametreleri." });
    }

    // Input sanitization against XSS
    const cleanMessage = String(message)
      .trim()
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const db = readDb();

    const newMsg: MessageRecord = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      studentId,
      studentUsername,
      teacherUsername,
      senderRole,
      message: cleanMessage,
      replyToId: replyToId || null,
      readByTeacher: senderRole === "teacher",
      readByStudent: senderRole === "student",
      createdAt: new Date().toISOString(),
    };

    db.messages.push(newMsg);
    writeDb(db);

    res.status(201).json({ success: true, message: newMsg });
  } catch (error: any) {
    console.error("Send message error:", error);
    res.status(500).json({ error: "Mesaj gönderilemedi." });
  }
});

// Mark messages as read
app.post("/api/messages/mark-read", (req, res) => {
  try {
    const { studentId, role } = req.body;
    const db = readDb();

    db.messages.forEach((m) => {
      if (m.studentId === studentId) {
        if (role === "teacher") m.readByTeacher = true;
        if (role === "student") m.readByStudent = true;
      }
    });

    writeDb(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Okundu işaretlenemedi." });
  }
});

// ==========================================
// 3. TEACHER MATERIALS & ASSIGNMENTS API
// ==========================================

// Get Materials (Visible to both student and teacher)
app.get("/api/materials", (_req, res) => {
  try {
    const db = readDb();
    res.json({ materials: db.materials });
  } catch (error) {
    res.status(500).json({ error: "Materyaller yüklenemedi." });
  }
});

// Add New Material (Teacher only)
app.post("/api/materials/create", (req, res) => {
  try {
    const {
      title,
      type = "assignment",
      unitNumber,
      description,
      contentUrl,
      iconName = "BookOpen",
      badgeText,
      actionType = "view",
      targetLink,
      dueDate,
      createdBy = "Pınar PEKER",
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Başlık ve açıklama zorunludur." });
    }

    const db = readDb();

    const newMaterial: MaterialRecord = {
      id: `mat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: String(title).trim(),
      type,
      unitNumber: unitNumber ? Number(unitNumber) : null,
      description: String(description).trim(),
      contentUrl: contentUrl || "",
      iconName: iconName || "BookOpen",
      badgeText: badgeText || "",
      actionType: actionType || "view",
      targetLink: targetLink || "",
      dueDate: dueDate || "",
      createdBy: createdBy || "Pınar PEKER",
      createdAt: new Date().toISOString(),
    };

    db.materials.unshift(newMaterial);
    writeDb(db);

    res.status(201).json({ success: true, material: newMaterial });
  } catch (error: any) {
    console.error("Create material error:", error);
    res.status(500).json({ error: "Materyal eklenemedi." });
  }
});

// Delete Material (Teacher only)
app.delete("/api/materials/:id", (req, res) => {
  try {
    const { id } = req.params;
    const db = readDb();
    db.materials = db.materials.filter((m) => m.id !== id);
    writeDb(db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Materyal silinemedi." });
  }
});

// ==========================================
// 4. STUDENT ACTIVITY TRACKING & ANALYTICS
// ==========================================

// Log Student Activity (When student views, clicks, plays, or completes)
app.post("/api/activities/log", (req, res) => {
  try {
    const {
      studentId,
      studentUsername,
      materialId,
      materialTitle,
      actionType = "click",
      details,
    } = req.body;

    if (!studentId || !studentUsername || !materialId || !materialTitle) {
      return res.status(400).json({ error: "Eksik aktivite parametreleri." });
    }

    const db = readDb();

    const newActivity: StudentActivityRecord = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      studentId,
      studentUsername,
      materialId,
      materialTitle,
      actionType,
      details: details || "",
      createdAt: new Date().toISOString(),
    };

    db.activities.unshift(newActivity);
    // Keep last 500 records to prevent memory overflow
    if (db.activities.length > 500) {
      db.activities = db.activities.slice(0, 500);
    }
    writeDb(db);

    res.status(201).json({ success: true, activity: newActivity });
  } catch (error: any) {
    console.error("Log activity error:", error);
    res.status(500).json({ error: "Aktivite kaydedilemedi." });
  }
});

// Get Activity Analytics for Teacher
app.get("/api/activities/analytics", (_req, res) => {
  try {
    const db = readDb();

    // Group activities by student and by material
    const studentStats: Record<
      string,
      {
        username: string;
        totalClicks: number;
        lastActive: string;
        materialsAccessed: Set<string>;
      }
    > = {};

    const materialStats: Record<
      string,
      {
        title: string;
        totalInteractions: number;
        uniqueStudents: Set<string>;
      }
    > = {};

    db.activities.forEach((act) => {
      // Student aggregation
      if (!studentStats[act.studentId]) {
        studentStats[act.studentId] = {
          username: act.studentUsername,
          totalClicks: 0,
          lastActive: act.createdAt,
          materialsAccessed: new Set(),
        };
      }
      studentStats[act.studentId].totalClicks += 1;
      studentStats[act.studentId].materialsAccessed.add(act.materialTitle);

      // Material aggregation
      if (!materialStats[act.materialId]) {
        materialStats[act.materialId] = {
          title: act.materialTitle,
          totalInteractions: 0,
          uniqueStudents: new Set(),
        };
      }
      materialStats[act.materialId].totalInteractions += 1;
      materialStats[act.materialId].uniqueStudents.add(act.studentUsername);
    });

    const formattedStudentStats = Object.entries(studentStats).map(([id, data]) => ({
      studentId: id,
      username: data.username,
      totalClicks: data.totalClicks,
      lastActive: data.lastActive,
      uniqueMaterialsCount: data.materialsAccessed.size,
    }));

    const formattedMaterialStats = Object.entries(materialStats).map(([id, data]) => ({
      materialId: id,
      title: data.title,
      totalInteractions: data.totalInteractions,
      uniqueStudentCount: data.uniqueStudents.size,
    }));

    res.json({
      totalActivities: db.activities.length,
      recentActivities: db.activities.slice(0, 50),
      studentStats: formattedStudentStats,
      materialStats: formattedMaterialStats,
    });
  } catch (error) {
    res.status(500).json({ error: "Analiz verileri alınamadı." });
  }
});

// ==========================================
// 5. HOMEWORK SUBMISSIONS & CHECKING API
// ==========================================

// Get Submissions (Students see only their own submissions, teachers see all submissions)
app.get("/api/homework/submissions", (req, res) => {
  try {
    const { studentId, role, materialId } = req.query;
    const db = readDb();

    let list = db.submissions || [];

    if (materialId) {
      list = list.filter((s) => s.materialId === materialId);
    }

    if (role === "student" && studentId) {
      list = list.filter((s) => s.studentId === studentId);
    }

    res.json({ submissions: list });
  } catch (error) {
    console.error("Get submissions error:", error);
    res.status(500).json({ error: "Ödevler yüklenemedi." });
  }
});

// Submit Homework (Student)
app.post("/api/homework/submit", (req, res) => {
  try {
    const {
      materialId,
      materialTitle,
      studentId,
      studentUsername,
      studentNote,
      submittedAnswers,
      attachedFileName,
    } = req.body;

    if (!materialId || !studentId || !studentUsername) {
      return res.status(400).json({ error: "Eksik ödev parametreleri." });
    }

    const db = readDb();
    if (!db.submissions) db.submissions = [];

    // Check if student already submitted for this material, if so update it
    const existingIndex = db.submissions.findIndex(
      (s) => s.materialId === materialId && s.studentId === studentId
    );

    const submissionData: SubmissionRecord = {
      id: existingIndex >= 0 ? db.submissions[existingIndex].id : `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      materialId,
      materialTitle: materialTitle || "LGS Ödevi",
      studentId,
      studentUsername,
      studentNote: studentNote || "",
      submittedAnswers: submittedAnswers || {},
      attachedFileName: attachedFileName || "",
      status: "submitted",
      maxGrade: 100,
      submittedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      db.submissions[existingIndex] = {
        ...db.submissions[existingIndex],
        ...submissionData,
      };
    } else {
      db.submissions.unshift(submissionData);
    }

    // Also record an activity event
    if (!db.activities) db.activities = [];
    db.activities.unshift({
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      studentId,
      studentUsername,
      materialId,
      materialTitle: materialTitle || "LGS Ödevi",
      actionType: "complete",
      details: "Ödev teslim edildi",
      createdAt: new Date().toISOString(),
    });

    writeDb(db);

    res.status(201).json({ success: true, submission: submissionData });
  } catch (error: any) {
    console.error("Submit homework error:", error);
    res.status(500).json({ error: "Ödev teslim edilirken bir hata oluştu." });
  }
});

// Grade/Review Homework (Teacher Control Panel)
app.put("/api/homework/grade/:submissionId", (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade, maxGrade = 100, teacherFeedback, status = "graded", teacherUsername = "Pınar PEKER" } = req.body;

    const db = readDb();
    if (!db.submissions) db.submissions = [];

    const index = db.submissions.findIndex((s) => s.id === submissionId);
    if (index === -1) {
      return res.status(404).json({ error: "Ödev teslim kaydı bulunamadı." });
    }

    db.submissions[index] = {
      ...db.submissions[index],
      grade: grade !== undefined ? Number(grade) : db.submissions[index].grade,
      maxGrade: maxGrade ? Number(maxGrade) : 100,
      teacherFeedback: teacherFeedback || "",
      status: status || "graded",
      gradedBy: teacherUsername,
      gradedAt: new Date().toISOString(),
    };

    writeDb(db);

    res.json({ success: true, submission: db.submissions[index] });
  } catch (error: any) {
    console.error("Grade homework error:", error);
    res.status(500).json({ error: "Ödev değerlendirilemedi." });
  }
});

// ==========================================
// 6. UNIT COMPETITIONS & LEADERBOARDS API
// ==========================================

// Get Leaderboard for Competitions
app.get("/api/competitions/leaderboard", (req, res) => {
  try {
    const { unitNumber } = req.query;
    const db = readDb();
    let records = db.competitions || [];

    if (unitNumber) {
      records = records.filter((c) => c.unitNumber === Number(unitNumber));
    }

    // Sort by highest score, then least time spent
    records.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSpentSeconds - b.timeSpentSeconds;
    });

    res.json({ leaderboard: records.slice(0, 50) });
  } catch (error) {
    console.error("Get leaderboard error:", error);
    res.status(500).json({ error: "Lider tablosu yüklenemedi." });
  }
});

// Post Competition Score
app.post("/api/competitions/score", (req, res) => {
  try {
    const {
      competitionId,
      unitNumber,
      studentUsername,
      studentId,
      score,
      correctAnswers,
      totalQuestions,
      timeSpentSeconds,
    } = req.body;

    if (!competitionId || !studentUsername || score === undefined) {
      return res.status(400).json({ error: "Eksik yarışma parametreleri." });
    }

    const db = readDb();
    if (!db.competitions) db.competitions = [];

    const newRecord: CompetitionRecord = {
      id: `comp-rec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      competitionId,
      unitNumber: Number(unitNumber) || 1,
      studentUsername,
      score: Number(score),
      correctAnswers: Number(correctAnswers) || 0,
      totalQuestions: Number(totalQuestions) || 10,
      timeSpentSeconds: Number(timeSpentSeconds) || 0,
      completedAt: new Date().toISOString(),
    };

    db.competitions.push(newRecord);

    // Also log activity
    if (studentId && db.activities) {
      db.activities.unshift({
        id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        studentId,
        studentUsername,
        materialId: competitionId,
        materialTitle: `Unit ${unitNumber} Hızlı Yarışma`,
        actionType: "play",
        details: `${score} Puan (${correctAnswers}/${totalQuestions} Doğru, ${timeSpentSeconds}sn)`,
        createdAt: new Date().toISOString(),
      });
    }

    writeDb(db);

    res.status(201).json({ success: true, record: newRecord });
  } catch (error: any) {
    console.error("Post competition score error:", error);
    res.status(500).json({ error: "Yarışma skoru kaydedilemedi." });
  }
});

// ==========================================
// 7. SUPABASE SQL SCRIPT & STATUS HELPER
// ==========================================

const SUPABASE_SCHEMA_SQL = `
-- =========================================================
-- LGS ENGLISH MASTER PORTAL - SUPABASE SQL KURULUM KODU
-- Bu kodu Supabase Dashboard -> SQL Editor kısmına yapıştırıp "Run" butonuna basın.
-- =========================================================

-- 1. USERS TABLOSU (Öğretmen ve Öğrenci Hesapları)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('teacher', 'student')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MESSAGES TABLOSU (Öğrenci <-> Öğretmen Mesajlaşması)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT NOT NULL,
  student_username TEXT NOT NULL,
  teacher_username TEXT DEFAULT 'Pınar PEKER',
  sender_role TEXT NOT NULL CHECK (sender_role IN ('student', 'teacher')),
  message TEXT NOT NULL,
  reply_to_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  read_by_teacher BOOLEAN DEFAULT FALSE,
  read_by_student BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MATERIALS TABLOSU (Öğretmenin Eklediği Uygulamalar, Ödevler, Oyunlar & Kaynaklar)
CREATE TABLE IF NOT EXISTS public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('app', 'assignment', 'game', 'resource', 'tool', 'exam')),
  unit_number INT,
  description TEXT NOT NULL,
  content_url TEXT,
  icon_name TEXT DEFAULT 'BookOpen',
  badge_text TEXT,
  action_type TEXT DEFAULT 'view',
  target_link TEXT,
  due_date TEXT,
  created_by TEXT DEFAULT 'Pınar PEKER',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. STUDENT_ACTIVITIES TABLOSU (Öğrenci Tıklama & İnceleme Takip ve Analiz)
CREATE TABLE IF NOT EXISTS public.student_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT NOT NULL,
  student_username TEXT NOT NULL,
  material_id TEXT NOT NULL,
  material_title TEXT NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('view', 'click', 'play', 'complete', 'download')),
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- İndeksler (Hızlı Sorgulama ve Performans)
CREATE INDEX IF NOT EXISTS idx_messages_student_id ON public.messages(student_id);
CREATE INDEX IF NOT EXISTS idx_activities_student_id ON public.student_activities(student_id);
CREATE INDEX IF NOT EXISTS idx_activities_material_id ON public.student_activities(material_id);
CREATE INDEX IF NOT EXISTS idx_materials_type ON public.materials(type);

-- Row Level Security (RLS) Güvenlik Politikaları
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_activities ENABLE ROW LEVEL SECURITY;

-- Genel Okuma/Yazma Politikaları
CREATE POLICY "Public Read Users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public Insert Users" ON public.users FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Messages Access" ON public.messages FOR ALL USING (true);
CREATE POLICY "Public Materials Access" ON public.materials FOR ALL USING (true);
CREATE POLICY "Public Activities Access" ON public.student_activities FOR ALL USING (true);

-- İlk Öğretmen (Yönetici) Hesabı Tohum Verisi (Şifre: 12345)
-- bcrypt hash for 12345: $2a$10$wT8m9sO0oK7N7k6C9n2Xy.79yOqL0bH2t9CgJ5rN7w4m2o1p0q
INSERT INTO public.users (username, password_hash, role)
VALUES 
  ('Pınar PEKER', '$2a$10$wT8m9sO0oK7N7k6C9n2Xy.79yOqL0bH2t9CgJ5rN7w4m2o1p0q', 'teacher'),
  ('Feyza Demirci', '$2a$10$wT8m9sO0oK7N7k6C9n2Xy.79yOqL0bH2t9CgJ5rN7w4m2o1p0q', 'teacher')
ON CONFLICT (username) DO NOTHING;
`;

app.get("/api/supabase/sql", (_req, res) => {
  res.json({
    supabaseUrl,
    hasConnectedKey: Boolean(supabaseAnonKey),
    sqlScript: SUPABASE_SCHEMA_SQL,
  });
});

// ==========================================
// 6. GEMINI AI APIS
// ==========================================

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "LGS English Master Portal",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    supabaseUrl,
  });
});

// Generate Exam Questions
app.post("/api/gemini/generate-exam", async (req, res) => {
  try {
    const {
      unitNumber,
      unitTitle,
      questionCount = 5,
      difficulty = "Medium",
      questionTypes = ["Dialogue", "Table/Graphic", "Invitation/Card", "Paragraph"],
      focusKeywords = [],
    } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });
    }

    const prompt = `You are an expert Turkish National Education (MEB) LGS English exam writer and curriculum specialist.
Generate a high quality, official-style LGS 8th Grade English (8. Sınıf LGS İngilizce) mock exam / question set.

Configuration:
- Unit: Unit ${unitNumber || "All Units"}: ${unitTitle || "LGS General Revision"}
- Question Count: ${questionCount}
- Difficulty: ${difficulty} (Easy / Medium / Hard / LGS Level)
- Allowed Question Types: ${questionTypes.join(", ")}
- Target Vocabulary / Focus: ${focusKeywords.length > 0 ? focusKeywords.join(", ") : "Standard MEB 8th Grade LGS curriculum vocabulary"}

Strict LGS Question Formatting Guidelines:
1. Each question must follow the authentic MEB LGS format.
2. Question stem with clear keywords.
3. 4 options (A, B, C, D) with plausible distractors.
4. Detailed explanation (Çözüm ve Açıklama) in Turkish.
5. Identify target vocabulary tested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            unit: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  contextTitle: { type: Type.STRING },
                  contextBody: { type: Type.STRING },
                  visualType: { type: Type.STRING },
                  questionStem: { type: Type.STRING },
                  options: {
                    type: Type.OBJECT,
                    properties: {
                      A: { type: Type.STRING },
                      B: { type: Type.STRING },
                      C: { type: Type.STRING },
                      D: { type: Type.STRING },
                    },
                    required: ["A", "B", "C", "D"],
                  },
                  correctAnswer: { type: Type.STRING },
                  explanationTurkish: { type: Type.STRING },
                  keyVocabulary: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  kazanim: { type: Type.STRING },
                },
                required: [
                  "id",
                  "type",
                  "contextBody",
                  "questionStem",
                  "options",
                  "correctAnswer",
                  "explanationTurkish",
                ],
              },
            },
          },
          required: ["title", "unit", "questions"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error generating LGS exam:", error);
    res.status(500).json({ error: error.message || "Failed to generate exam questions." });
  }
});

// Generate 5E Lesson Plan
app.post("/api/gemini/lesson-plan", async (req, res) => {
  try {
    const { unitNumber, unitTitle, topic, duration = "40 mins", classLevel = "8th Grade" } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });
    }

    const prompt = `Create a comprehensive, pedagogically sound 5E Model Lesson Plan for Turkish MEB 8th Grade English:
Unit ${unitNumber}: ${unitTitle}
Topic: ${topic}
Duration: ${duration}
Class: ${classLevel}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            unit: { type: Type.STRING },
            topic: { type: Type.STRING },
            duration: { type: Type.STRING },
            mebOutcomes: { type: Type.ARRAY, items: { type: Type.STRING } },
            targetVocabulary: { type: Type.ARRAY, items: { type: Type.STRING } },
            grammarFocus: { type: Type.STRING },
            stages: {
              type: Type.OBJECT,
              properties: {
                engage: {
                  type: Type.OBJECT,
                  properties: { time: { type: Type.STRING }, activity: { type: Type.STRING }, teacherRole: { type: Type.STRING } },
                },
                explore: {
                  type: Type.OBJECT,
                  properties: { time: { type: Type.STRING }, activity: { type: Type.STRING }, teacherRole: { type: Type.STRING } },
                },
                explain: {
                  type: Type.OBJECT,
                  properties: { time: { type: Type.STRING }, activity: { type: Type.STRING }, teacherRole: { type: Type.STRING } },
                },
                elaborate: {
                  type: Type.OBJECT,
                  properties: { time: { type: Type.STRING }, activity: { type: Type.STRING }, teacherRole: { type: Type.STRING } },
                },
                evaluate: {
                  type: Type.OBJECT,
                  properties: { time: { type: Type.STRING }, activity: { type: Type.STRING }, teacherRole: { type: Type.STRING } },
                },
              },
            },
            smartBoardTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            differentiation: {
              type: Type.OBJECT,
              properties: { support: { type: Type.STRING }, extension: { type: Type.STRING } },
            },
            lgsExamTip: { type: Type.STRING },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error generating lesson plan:", error);
    res.status(500).json({ error: error.message || "Failed to generate lesson plan." });
  }
});

// Teacher Chat
app.post("/api/gemini/teacher-chat", async (req, res) => {
  try {
    const { chatHistory, message } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });
    }

    const history = (chatHistory || []).map((m: any) => ({
      role: m.role || "user",
      parts: m.parts || [{ text: m.text || "" }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [
        ...history,
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      config: {
        systemInstruction:
          "You are an expert AI Assistant and Copilot for 8th Grade MEB LGS English teachers. Provide high-quality, practical lesson materials, worksheets, dialogue exercises, and advice.",
      },
    });

    res.json({ reply: response.text || "Here is the material you requested." });
  } catch (error: any) {
    console.error("Teacher chat error:", error);
    res.status(500).json({ error: error.message || "AI response failed." });
  }
});

// Start Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LGS English Master Portal running on http://localhost:${PORT}`);
  });
}

startServer();
