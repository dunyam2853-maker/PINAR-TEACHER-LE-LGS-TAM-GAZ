import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Send,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  Sparkles,
  Paperclip,
  Award,
  MessageSquare,
  RotateCcw
} from "lucide-react";
import confetti from "canvas-confetti";
import { PortalMaterial, AssignmentSubmission, UserAuth } from "../types";

interface StudentHomeworkSubmissionProps {
  currentUser: UserAuth;
  materials: PortalMaterial[];
  onActivityLog?: (materialId: string, title: string, actionType: any, details?: string) => void;
}

export const StudentHomeworkSubmission: React.FC<StudentHomeworkSubmissionProps> = ({
  currentUser,
  materials,
  onActivityLog,
}) => {
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<PortalMaterial | null>(null);
  const [studentNote, setStudentNote] = useState("");
  const [attachedFileName, setAttachedFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const homeworkMaterials = materials.filter(
    (m) => m.type === "assignment" || m.actionType === "solve"
  );

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/homework/submissions?role=student&studentId=${currentUser.id}`);
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
  }, [currentUser.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterial) return;

    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/homework/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialId: selectedMaterial.id,
          materialTitle: selectedMaterial.title,
          studentId: currentUser.id,
          studentUsername: currentUser.username,
          studentNote,
          attachedFileName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ödev gönderilemedi.");
      }

      setSuccessMsg(`🌸 "${selectedMaterial.title}" ödeviniz başarıyla Pınar Öğretmene iletildi!`);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      setStudentNote("");
      setAttachedFileName("");
      setSelectedMaterial(null);
      fetchSubmissions();

      if (onActivityLog) {
        onActivityLog(selectedMaterial.id, selectedMaterial.title, "complete", "Ödev teslim edildi");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Ödev gönderilirken bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSimulateFileUpload = () => {
    const fakeNames = [
      `${currentUser.username}_lgs_unit_odev.pdf`,
      `${currentUser.username}_kitchen_vocab_exercise.docx`,
      `${currentUser.username}_lgs_deneme_cozumleri.jpg`
    ];
    const picked = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    setAttachedFileName(picked);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-black mb-1">
              <span>🌸 Özel Güneysu Okulları Öğrenci Ödev Merkezi</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Ödev Yollama & Not / Değerlendirme Takibi
            </h2>
            <p className="text-xs text-slate-500">
              Pınar Öğretmeninizin verdiği ödevleri yanıtlayın, çözümlerinizi gönderin ve aldığınız puanları inceleyin.
            </p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-xs p-4 rounded-2xl flex items-start space-x-2.5 shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-black block text-emerald-800">Ödev Teslim Alındı!</strong>
            <p className="font-medium">{successMsg}</p>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-2xl flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="font-medium">{errorMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Assignments to Submit */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Pınar Öğretmenin Verdiği Aktif Ödevler</span>
          </h3>

          <div className="space-y-3">
            {homeworkMaterials.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border-2 border-emerald-100 text-slate-500 text-xs">
                Şu an atanmış yeni bir ödev bulunmamaktadır.
              </div>
            ) : (
              homeworkMaterials.map((mat) => {
                const existingSub = submissions.find((s) => s.materialId === mat.id);
                const isSelected = selectedMaterial?.id === mat.id;

                return (
                  <div
                    key={mat.id}
                    className={`bg-white rounded-3xl border-2 p-5 transition shadow-sm ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-200"
                        : "border-emerald-100 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-50">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="bg-emerald-100 text-emerald-900 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                            Unit {mat.unitNumber || 1}
                          </span>
                          {mat.dueDate && (
                            <span className="text-[11px] text-rose-700 bg-rose-50 border border-rose-200 font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Son Teslim: {mat.dueDate}</span>
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-black text-slate-800">{mat.title}</h4>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {existingSub ? (
                          existingSub.status === "graded" ? (
                            <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1.5 rounded-xl flex items-center space-x-1 shadow-2xs">
                              <Award className="w-4 h-4" />
                              <span>Not: {existingSub.grade}/100</span>
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center space-x-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Kontrol Bekliyor</span>
                            </span>
                          )
                        ) : (
                          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-xl">
                            Teslim Edilmedi
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 py-3 leading-relaxed">
                      {mat.description}
                    </p>

                    {/* Teacher Feedback if already graded */}
                    {existingSub && existingSub.teacherFeedback && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 mb-3 space-y-1">
                        <div className="flex items-center space-x-1.5 text-emerald-800 font-black">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Pınar Öğretmenin Değerlendirmesi & Notu:</span>
                        </div>
                        <p className="font-medium">{existingSub.teacherFeedback}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-end pt-2">
                      <button
                        onClick={() => setSelectedMaterial(mat)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2 rounded-xl text-xs transition flex items-center space-x-1.5 shadow-2xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{existingSub ? "Ödevi Yeniden Gönder" : "Ödevi Hazırla & Gönder 🌸"}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Submission Modal / Box when selected */}
          {selectedMaterial && (
            <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-xl p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h4 className="text-base font-black text-slate-800">
                      Ödev Yanıtı Gönder: {selectedMaterial.title}
                    </h4>
                    <span className="text-xs text-slate-500">
                      Öğretmen: {selectedMaterial.createdBy || "Pınar PEKER"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1"
                >
                  Kapat ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ödev Çözümün, Notların veya Cevapların:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={studentNote}
                    onChange={(e) => setStudentNote(e.target.value)}
                    placeholder="Örn: 1. Soru: B (excuse bildiriyor), 2. Soru: C, 3. Soru: First, next, then sıralaması..."
                    className="w-full bg-slate-50 border-2 border-emerald-200 rounded-2xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                {/* Simulated File Attachment */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Paperclip className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {attachedFileName || "Ödev Dosyası / Belge Ekle"}
                      </span>
                      <span className="text-[10px] text-slate-500">PDF, Word, Görsel vb.</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateFileUpload}
                    className="bg-white hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-300 transition shadow-2xs"
                  >
                    {attachedFileName ? "Dosyayı Değiştir" : "Dosya Ekle 📎"}
                  </button>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMaterial(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl text-xs transition flex items-center space-x-2 shadow-md shadow-emerald-200 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? "Gönderiliyor..." : "Öğretmene Gönder 🌸"}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right 1 Col: Previous Submissions History */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Teslim Geçmişim & Notlarım</span>
          </h3>

          <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-md p-4 space-y-3">
            {submissions.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                Henüz teslim ettiğiniz bir ödev bulunmamaktadır.
              </div>
            ) : (
              submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-start">
                    <strong className="font-black text-slate-800 line-clamp-1">{sub.materialTitle}</strong>
                    {sub.grade !== undefined ? (
                      <span className="bg-emerald-600 text-white font-black px-2 py-0.5 rounded-lg text-[11px]">
                        {sub.grade}/100
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-lg text-[10px]">
                        İnceleniyor
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 line-clamp-2 italic text-[11px]">
                    "{sub.studentNote}"
                  </p>

                  {sub.teacherFeedback && (
                    <div className="bg-emerald-100/70 p-2 rounded-xl text-[11px] text-emerald-950">
                      <strong className="block text-emerald-800 font-bold">Öğretmen Notu:</strong>
                      {sub.teacherFeedback}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                    <span>{new Date(sub.submittedAt).toLocaleDateString("tr-TR")}</span>
                    {sub.attachedFileName && <span>📎 {sub.attachedFileName}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
