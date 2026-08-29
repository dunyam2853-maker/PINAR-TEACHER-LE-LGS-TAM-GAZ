import React, { useState, useEffect } from "react";
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  Award,
  MessageSquare,
  Search,
  Filter,
  AlertCircle,
  User,
  Paperclip,
  Sparkles,
  Send
} from "lucide-react";
import confetti from "canvas-confetti";
import { AssignmentSubmission } from "../types";

interface TeacherHomeworkCheckerProps {
  teacherUsername: string;
}

export const TeacherHomeworkChecker: React.FC<TeacherHomeworkCheckerProps> = ({ teacherUsername }) => {
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSub, setSelectedSub] = useState<AssignmentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(90);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [grading, setGrading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "submitted" | "graded">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/homework/submissions?role=teacher");
      const data = await res.json();
      if (data.submissions) {
        setSubmissions(data.submissions);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    setGrading(true);
    try {
      const res = await fetch(`/api/homework/grade/${selectedSub.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: gradeInput,
          maxGrade: 100,
          teacherFeedback: feedbackInput,
          teacherUsername,
          status: "graded",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Puan kaydedilemedi.");

      setToastMsg(`🌸 ${selectedSub.studentUsername} öğrencisinin ödevi başarıyla ${gradeInput}/100 olarak notlandırıldı!`);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      setSelectedSub(null);
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message || "Hata oluştu.");
    } finally {
      setGrading(false);
    }
  };

  const handleSelectSub = (sub: AssignmentSubmission) => {
    setSelectedSub(sub);
    setGradeInput(sub.grade !== undefined ? sub.grade : 90);
    setFeedbackInput(sub.teacherFeedback || "Tebrikler, ödevini çok başarılı ve eksiksiz bir şekilde tamamlamışsın 🌸");
  };

  const filtered = submissions.filter((s) => {
    if (filterStatus === "submitted" && s.status !== "submitted") return false;
    if (filterStatus === "graded" && s.status !== "graded") return false;
    if (
      searchQuery &&
      !s.studentUsername.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !s.materialTitle.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-emerald-200">
            <FileCheck2 className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-black mb-1">
              <span>🌸 Özel Güneysu Okulları Öğretmen Kontrol Paneli</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Ödev Kontrol & Notlandırma Masası
            </h2>
            <p className="text-xs text-slate-500">
              Öğrencilerden gelen ödev teslimlerini inceleyin, 100 üzerinden not verin ve teşvik edici geri bildirimler yazın.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-3 py-1.5 rounded-xl text-xs">
            Toplam Teslim: <strong>{submissions.length}</strong>
          </span>
        </div>
      </div>

      {toastMsg && (
        <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-xs p-4 rounded-2xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-bold">{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-emerald-700 font-black text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border-2 border-emerald-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Öğrenci adı veya ödev ara..."
              className="w-full bg-slate-50 border border-emerald-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === "all"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-slate-100 text-slate-700 hover:bg-emerald-50"
            }`}
          >
            Tümü ({submissions.length})
          </button>
          <button
            onClick={() => setFilterStatus("submitted")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === "submitted"
                ? "bg-amber-500 text-white shadow-2xs"
                : "bg-slate-100 text-slate-700 hover:bg-amber-50"
            }`}
          >
            Bekleyenler ({submissions.filter((s) => s.status === "submitted").length})
          </button>
          <button
            onClick={() => setFilterStatus("graded")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === "graded"
                ? "bg-emerald-700 text-white shadow-2xs"
                : "bg-slate-100 text-slate-700 hover:bg-emerald-50"
            }`}
          >
            Notlandırılanlar ({submissions.filter((s) => s.status === "graded").length})
          </button>
        </div>
      </div>

      {/* Submissions List & Grading Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Submissions Table / Cards */}
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            <div className="bg-white rounded-3xl p-12 text-center text-xs text-slate-400">
              Yükleniyor...
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-emerald-100 space-y-2">
              <div className="text-3xl">🌿</div>
              <p className="text-xs text-slate-500 font-medium">
                Bu filtreye uygun teslim edilmiş ödev bulunamadı.
              </p>
            </div>
          ) : (
            filtered.map((sub) => {
              const isSelected = selectedSub?.id === sub.id;

              return (
                <div
                  key={sub.id}
                  className={`bg-white rounded-3xl border-2 p-5 transition shadow-sm ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-200"
                      : "border-emerald-100 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-emerald-50">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-sm font-black text-slate-800 block">
                          {sub.studentUsername}
                        </strong>
                        <span className="text-[11px] text-slate-500">{sub.materialTitle}</span>
                      </div>
                    </div>

                    <div>
                      {sub.status === "graded" ? (
                        <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-xl flex items-center space-x-1 shadow-2xs">
                          <Award className="w-3.5 h-3.5" />
                          <span>Not: {sub.grade}/100</span>
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1 rounded-xl flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>İnceleme Bekliyor</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="py-2.5 space-y-2">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-700 font-mono leading-relaxed">
                      "{sub.studentNote}"
                    </div>

                    {sub.attachedFileName && (
                      <div className="inline-flex items-center space-x-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Ekli Dosya: {sub.attachedFileName}</span>
                      </div>
                    )}

                    {sub.teacherFeedback && (
                      <div className="bg-emerald-100/70 p-2.5 rounded-xl text-xs text-emerald-950">
                        <strong className="block text-emerald-800 font-bold">Verilen Öğretmen Notu:</strong>
                        {sub.teacherFeedback}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                    <span>Teslim Tarihi: {new Date(sub.submittedAt).toLocaleString("tr-TR")}</span>
                    <button
                      onClick={() => handleSelectSub(sub)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-1.5 rounded-xl text-xs transition shadow-2xs"
                    >
                      {sub.status === "graded" ? "Notu Güncelle ✏️" : "Değerlendir & Not Ver 🌸"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right 1 Col: Grading Inspector Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-md p-5 space-y-4 sticky top-6">
            <div className="pb-3 border-b border-emerald-50">
              <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Ödev Değerlendirme Masası</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Sol listeden bir ödev seçerek hızlıca puanlayın.
              </p>
            </div>

            {selectedSub ? (
              <form onSubmit={handleGradeSubmit} className="space-y-4">
                <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200 text-xs space-y-1">
                  <strong className="text-emerald-900 font-bold block">
                    Öğrenci: {selectedSub.studentUsername}
                  </strong>
                  <span className="text-slate-600 block">{selectedSub.materialTitle}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Puan (0 - 100):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={gradeInput}
                    onChange={(e) => setGradeInput(Number(e.target.value))}
                    className="w-full bg-slate-50 border-2 border-emerald-200 rounded-xl px-3 py-2 text-sm font-black text-emerald-800 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Öğretmen Geri Bildirimi:
                  </label>
                  <textarea
                    rows={4}
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-emerald-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    placeholder="Örn: Tebrikler, çok başarılı bir çalışma 🌸"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFeedbackInput("Tebrikler! Mükemmel ve eksiksiz bir çözüm 🌸")}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-emerald-200"
                  >
                    + Mükemmel
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackInput("Çok iyi çalışma. Kelime kullanımların harika.")}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-emerald-200"
                  >
                    + Çok İyi
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={grading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-2xl text-xs transition shadow-md shadow-emerald-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{grading ? "Kaydediliyor..." : "Notu & Geri Bildirimi Kaydet 🌸"}</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                <div className="text-3xl">📝</div>
                <p>İncelemek ve not vermek için bir ödeve tıklayınız.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
