import React, { useState } from "react";
import { Database, Copy, Check, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SupabaseSqlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSqlModal: React.FC<SupabaseSqlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlScript = `-- =========================================================
-- LGS ENGLISH MASTER PORTAL - SUPABASE SQL SCHEMA & TABLES
-- Project URL: https://mxpienpvbupqbhdanhwe.supabase.co
-- =========================================================

-- 1. USERS TABLOSU (Öğretmen ve Öğrenci Hesapları)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('teacher', 'student')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MESSAGES TABLOSU (Öğrenci <-> Öğretmen Özel Mesajlaşma)
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

-- İndeksler (Sorgu Hızı ve Performans)
CREATE INDEX IF NOT EXISTS idx_messages_student_id ON public.messages(student_id);
CREATE INDEX IF NOT EXISTS idx_activities_student_id ON public.student_activities(student_id);
CREATE INDEX IF NOT EXISTS idx_activities_material_id ON public.student_activities(material_id);
CREATE INDEX IF NOT EXISTS idx_materials_type ON public.materials(type);

-- Row Level Security (RLS) Güvenlik Politikaları
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public Insert Users" ON public.users FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Messages Access" ON public.messages FOR ALL USING (true);
CREATE POLICY "Public Materials Access" ON public.materials FOR ALL USING (true);
CREATE POLICY "Public Activities Access" ON public.student_activities FOR ALL USING (true);

-- İlk Yönetici / Öğretmen Hesapları (Şifre: 12345)
INSERT INTO public.users (username, password_hash, role)
VALUES 
  ('Pınar PEKER', '$2a$10$wT8m9sO0oK7N7k6C9n2Xy.79yOqL0bH2t9CgJ5rN7w4m2o1p0q', 'teacher'),
  ('Feyza Demirci', '$2a$10$wT8m9sO0oK7N7k6C9n2Xy.79yOqL0bH2t9CgJ5rN7w4m2o1p0q', 'teacher')
ON CONFLICT (username) DO NOTHING;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Supabase Veritabanı & SQL Kurulum Kodu
              </h3>
              <p className="text-xs text-slate-500">
                Supabase projenizde tabloları, RLS politikalarını ve indeksleri tek seferde oluşturun.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Steps */}
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 space-y-2 text-xs text-emerald-900">
          <div className="font-bold flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Supabase Kurulum Adımları:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-700">
            <li>Supabase Dashboard'a gidin: <code className="bg-white px-1.5 py-0.5 rounded text-emerald-800 font-mono text-[11px]">https://mxpienpvbupqbhdanhwe.supabase.co</code></li>
            <li>Sol menüden <strong>SQL Editor</strong> sekmesini açın.</li>
            <li>Aşağıdaki SQL kodunu kopyalayıp editöre yapıştırın ve <strong>RUN</strong> butonuna tıklayın.</li>
          </ol>
        </div>

        {/* Code View */}
        <div className="relative flex-1 min-h-[220px]">
          <pre className="bg-slate-900 text-emerald-400 font-mono text-[11px] p-4 rounded-2xl overflow-y-auto max-h-[300px] border border-slate-800 leading-relaxed scrollbar-thin">
            {sqlScript}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>SQL'i Kopyala</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-[11px] text-slate-400">
            Kullanıcı adı: <strong>Pınar PEKER</strong> | Şifre: <strong>12345</strong>
          </span>
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-xl text-xs font-bold transition"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
