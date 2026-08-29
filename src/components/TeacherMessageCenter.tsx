import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Send,
  User,
  CheckCircle2,
  Clock,
  Search,
  RefreshCw,
  Sparkles,
  Inbox
} from "lucide-react";
import { PortalMessage } from "../types";

export const TeacherMessageCenter: React.FC = () => {
  const [messages, setMessages] = useState<PortalMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages?role=teacher");
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
        // Default select the first student if none selected
        if (!selectedStudentId && data.messages.length > 0) {
          setSelectedStudentId(data.messages[0].studentId);
        }
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // Group messages by student
  const studentGroups: Record<
    string,
    {
      studentId: string;
      studentUsername: string;
      messages: PortalMessage[];
      unreadCount: number;
      lastTimestamp: string;
    }
  > = {};

  messages.forEach((msg) => {
    if (!studentGroups[msg.studentId]) {
      studentGroups[msg.studentId] = {
        studentId: msg.studentId,
        studentUsername: msg.studentUsername,
        messages: [],
        unreadCount: 0,
        lastTimestamp: msg.createdAt,
      };
    }
    studentGroups[msg.studentId].messages.push(msg);
    if (msg.senderRole === "student" && !msg.readByTeacher) {
      studentGroups[msg.studentId].unreadCount += 1;
    }
    if (new Date(msg.createdAt) > new Date(studentGroups[msg.studentId].lastTimestamp)) {
      studentGroups[msg.studentId].lastTimestamp = msg.createdAt;
    }
  });

  const studentsList = Object.values(studentGroups).sort(
    (a, b) => new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime()
  );

  const filteredStudents = studentsList.filter((s) =>
    s.studentUsername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeGroup = selectedStudentId ? studentGroups[selectedStudentId] : null;

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeGroup || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: activeGroup.studentId,
          studentUsername: activeGroup.studentUsername,
          teacherUsername: "Pınar PEKER",
          senderRole: "teacher",
          message: replyText.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.message) {
        setMessages((prev) => [...prev, data.message]);
        setReplyText("");
      }
    } catch (err) {
      console.error("Error sending reply:", err);
    } finally {
      setSending(false);
    }
  };

  const handleMarkAsRead = async (studentId: string) => {
    try {
      await fetch("/api/messages/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, role: "teacher" }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.studentId === studentId ? { ...m, readByTeacher: true } : m))
      );
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Öğrenci Özel Mesajlaşma & Soru-Cevap Merkezi
            </h2>
            <p className="text-xs text-slate-500">
              Öğrencilerinizden gelen özel soruları ve mesajları tek bir güvenli panelden yanıtlayın.
            </p>
          </div>
        </div>

        <button
          onClick={fetchMessages}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-slate-200"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Yenile</span>
        </button>
      </div>

      {/* Messages Layout: Sidebar List + Conversation View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm min-h-[580px]">
        {/* Left: Students Conversations List */}
        <div className="md:col-span-1 border-r border-slate-100 pr-0 md:pr-4 space-y-3 flex flex-col">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Öğrenci ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
            Öğrenci Sohbetleri ({filteredStudents.length})
          </div>

          {/* Student List Items */}
          <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[460px] pr-1">
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Kayıtlı mesaj bulunamadı.
              </div>
            ) : (
              filteredStudents.map((group) => {
                const isSelected = selectedStudentId === group.studentId;
                const lastMsg = group.messages[group.messages.length - 1];

                return (
                  <button
                    key={group.studentId}
                    onClick={() => {
                      setSelectedStudentId(group.studentId);
                      handleMarkAsRead(group.studentId);
                    }}
                    className={`w-full text-left p-3 rounded-2xl transition border flex items-start justify-between ${
                      isSelected
                        ? "bg-indigo-50 border-indigo-200 text-indigo-900 shadow-2xs"
                        : "bg-white border-transparent hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                          {group.studentUsername.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-xs truncate">
                          {group.studentUsername}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate pl-9">
                        {lastMsg ? lastMsg.message : "Mesaj yok"}
                      </p>
                    </div>

                    {group.unreadCount > 0 && (
                      <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0">
                        {group.unreadCount} yeni
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Chat Conversation */}
        <div className="md:col-span-2 flex flex-col justify-between h-[520px]">
          {activeGroup ? (
            <>
              {/* Top Chat Info Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    {activeGroup.studentUsername.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      {activeGroup.studentUsername}
                    </h3>
                    <span className="text-[10px] text-slate-400">8. Sınıf Öğrencisi</span>
                  </div>
                </div>

                <span className="text-xs text-slate-400">
                  Toplam {activeGroup.messages.length} mesaj
                </span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto space-y-3 py-4 pr-2">
                {activeGroup.messages.map((msg) => {
                  const isTeacher = msg.senderRole === "teacher";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isTeacher ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center space-x-1.5 mb-1 text-[10px] text-slate-400">
                        <span>{isTeacher ? "Siz (Pınar Öğretmen)" : activeGroup.studentUsername}</span>
                        <span>&bull;</span>
                        <span>
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                          isTeacher
                            ? "bg-indigo-600 text-white rounded-tr-none font-medium"
                            : "bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Bar */}
              <form onSubmit={handleSendReply} className="flex items-center space-x-2 pt-3 border-t border-slate-100">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`${activeGroup.studentUsername} isimli öğrenciye cevabınızı yazın...`}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={sending || !replyText.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center space-x-1.5 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>Yanıtla</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
              <Inbox className="w-12 h-12 text-slate-300" />
              <p className="text-xs">Görüntülemek için sol menüden bir öğrenci seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
