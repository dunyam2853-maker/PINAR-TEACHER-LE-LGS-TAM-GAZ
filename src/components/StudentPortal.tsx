import React, { useState, useEffect } from "react";
import {
  Flower2,
  Sparkles,
  Send,
  BookOpen,
  Gamepad2,
  FileText,
  MessageSquare,
  LogOut,
  CheckCircle2,
  Clock,
  ExternalLink,
  Zap,
  PhoneCall,
  Utensils,
  Award,
  RefreshCw,
  Search,
  Check,
  ChevronRight,
  Heart,
  Trophy,
  FileCheck2,
  Layers
} from "lucide-react";
import { UserAuth, PortalMaterial, PortalMessage } from "../types";
import { GameStation } from "./GameStation";
import { ThreeDGames } from "./ThreeDGames";
import { UnitCompetitions } from "./UnitCompetitions";
import { StudentHomeworkSubmission } from "./StudentHomeworkSubmission";
import { LgsPastQuestionsSection } from "./LgsPastQuestionsSection";
import { speakWord } from "../utils/speech";

interface StudentPortalProps {
  user: UserAuth;
  onLogout: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<
    "materials" | "3d_games" | "competitions" | "homework" | "lgs_past" | "messages" | "games"
  >("materials");
  const [materials, setMaterials] = useState<PortalMaterial[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");

  // Messaging State
  const [messages, setMessages] = useState<PortalMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [activeMaterialModal, setActiveMaterialModal] = useState<PortalMaterial | null>(null);

  useEffect(() => {
    fetchMaterials();
    fetchMessages();
  }, []);

  const fetchMaterials = async () => {
    setLoadingMaterials(true);
    try {
      const res = await fetch("/api/materials");
      const data = await res.json();
      if (data.materials) {
        setMaterials(data.materials);
      }
    } catch (err) {
      console.error("Error loading materials:", err);
    } finally {
      setLoadingMaterials(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?role=student&userId=${user.id}`);
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || sendingMessage) return;

    setSendingMessage(true);
    try {
      const res = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: user.id,
          studentUsername: user.username,
          teacherUsername: "Pınar PEKER",
          senderRole: "student",
          message: newMessageText.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.message) {
        setMessages((prev) => [...prev, data.message]);
        setNewMessageText("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSendingMessage(false);
    }
  };

  // Activity click tracking
  const logActivity = async (materialId: string, materialTitle: string, actionType: "view" | "click" | "play" | "download" | "solve" | "complete", details?: string) => {
    try {
      await fetch("/api/activities/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: user.id,
          studentUsername: user.username,
          materialId,
          materialTitle,
          actionType,
          details: details || "Etkinliğe katılım sağlandı.",
        }),
      });
    } catch (err) {
      console.error("Error logging activity:", err);
    }
  };

  const handleOpenMaterial = (material: PortalMaterial) => {
    const action = material.type === "game" ? "play" : material.type === "resource" ? "download" : "view";
    logActivity(material.id, material.title, action, `${material.type} içeriğine tıklandı.`);
    setActiveMaterialModal(material);
  };

  const filteredMaterials = selectedTypeFilter === "all"
    ? materials
    : materials.filter((m) => m.type === selectedTypeFilter);

  const getIcon = (iconName: string, type: string) => {
    if (type === "game" || iconName === "Zap") return <Zap className="w-5 h-5 text-amber-500" />;
    if (type === "assignment" || iconName === "Utensils") return <Utensils className="w-5 h-5 text-emerald-600" />;
    if (iconName === "PhoneCall") return <PhoneCall className="w-5 h-5 text-indigo-600" />;
    if (type === "resource" || iconName === "FileText") return <FileText className="w-5 h-5 text-blue-600" />;
    return <BookOpen className="w-5 h-5 text-teal-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-teal-50/20 to-slate-50">
      {/* Top Header */}
      <header className="bg-white/95 backdrop-blur-md border-b-2 border-emerald-100 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl shadow-md shadow-emerald-200">
              🌸
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ÖZEL GÜNEYSU OKULLARI
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                  PINAR TEACHER İLE TAM GAZ LGS 🚀
                </span>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-200">
                  8. SINIF LGS
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-slate-800 flex items-center space-x-1.5 mt-0.5">
                <span>Pınar Teacher ile Tam Gaz LGS</span>
                <span className="text-slate-400 font-normal">•</span>
                <span className="text-emerald-700 font-bold text-xs">{user.username} 🌿</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold">
              <span>İngilizce Öğretmeni:</span>
              <span className="text-emerald-950 font-black">Pınar PEKER 🎓</span>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center space-x-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-slate-200 hover:border-rose-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto border-t border-emerald-50 py-2">
          <div className="flex space-x-1.5 min-w-max">
            <button
              onClick={() => setActiveTab("materials")}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "materials"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Ders Paylaşımları ({materials.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("3d_games")}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "3d_games"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-emerald-300" />
              <span>3D Oyunlar & Etkinlikler 🎮</span>
            </button>

            <button
              onClick={() => setActiveTab("competitions")}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "competitions"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Ünite Yarışmaları 🏆</span>
            </button>

            <button
              onClick={() => setActiveTab("homework")}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "homework"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Ödevlerim & Teslim 📝</span>
            </button>

            <button
              onClick={() => setActiveTab("lgs_past")}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "lgs_past"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>LGS Çıkmış Sorular 📚</span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition relative ${
                activeTab === "messages"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Öğretmenime Mesaj 💌</span>
              {messages.filter((m) => m.senderRole === "teacher" && !m.readByStudent).length > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("games")}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "games"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Hızlı Kelime İstasyonu ⚡</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Active Tab Dispatcher */}
        {activeTab === "3d_games" && (
          <ThreeDGames currentUser={user} onActivityLog={logActivity} />
        )}

        {activeTab === "competitions" && (
          <UnitCompetitions currentUser={user} onActivityLog={logActivity} />
        )}

        {activeTab === "homework" && (
          <StudentHomeworkSubmission currentUser={user} materials={materials} onActivityLog={logActivity} />
        )}

        {activeTab === "lgs_past" && (
          <LgsPastQuestionsSection currentUser={user} onActivityLog={logActivity} />
        )}

        {activeTab === "games" && (
          <GameStation onActivityLog={(name, act) => logActivity("game-station", name, act)} />
        )}

        {/* TAB: MATERIALS & ASSIGNMENTS */}
        {activeTab === "materials" && (
          <div className="space-y-6">
            {/* School Hero Banner */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 z-10 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-black backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Özel Güneysu Okulları 🌸 Pınar Teacher ile Tam Gaz LGS 🚀</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Pınar Teacher ile Tam Gaz LGS: Hedef 10'da 10 Tam Net! 🌟
                </h2>
                <p className="text-emerald-50 text-xs sm:text-sm max-w-xl">
                  Pınar Öğretmeninizin hazırladığı özel MEB ünite uygulamaları, ödevler, 3D oyunlar ve LGS çıkmış soru analizleriyle hedefine tam gaz ilerle!
                </p>
              </div>

              <div className="flex-shrink-0 z-10 flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setActiveTab("3d_games")}
                  className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-4 py-2.5 rounded-2xl font-black text-xs shadow-md transition flex items-center space-x-1.5"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>3D Oyunları Başlat</span>
                </button>
                <button
                  onClick={() => setActiveTab("competitions")}
                  className="bg-white text-emerald-900 hover:bg-emerald-50 px-4 py-2.5 rounded-2xl font-black text-xs shadow-md transition flex items-center space-x-1.5"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Ünite Yarışması 🏆</span>
                </button>
              </div>

              <div className="absolute -right-8 -bottom-8 text-white/10 pointer-events-none">
                <Flower2 className="w-48 h-48" />
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border-2 border-emerald-100 rounded-2xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500">Kategori Filtresi:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: "Tüm Paylaşımlar" },
                    { id: "assignment", label: "Ödevler 📝" },
                    { id: "game", label: "Oyunlar 🎮" },
                    { id: "app", label: "İnteraktif Araçlar 🚀" },
                    { id: "resource", label: "Kaynaklar & PDF 📄" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedTypeFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        selectedTypeFilter === filter.id
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : "bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Toplam <strong>{filteredMaterials.length}</strong> materyal listeleniyor
              </div>
            </div>

            {/* Materials Grid */}
            {loadingMaterials ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-emerald-100">
                <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Materyaller yükleniyor...</p>
              </div>
            ) : filteredMaterials.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-emerald-100 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                  🌸
                </div>
                <h3 className="text-base font-black text-slate-700">Henüz Bu Kategoride Materyal Eklenmedi</h3>
                <p className="text-xs text-slate-400">
                  Öğretmeniniz Pınar Peker materyal ekledikçe anında burada görebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMaterials.map((mat) => (
                  <div
                    key={mat.id}
                    className="bg-white rounded-3xl border-2 border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-200">
                            {getIcon(mat.iconName || "", mat.type)}
                          </span>
                          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {mat.type === "game" ? "Oyun" : mat.type === "assignment" ? "Ödev" : mat.type === "app" ? "Uygulama" : "Ders Kaynağı"}
                          </span>
                        </div>

                        {mat.unitNumber && (
                          <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                            Unit {mat.unitNumber}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-800 leading-snug">
                          {mat.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                          {mat.description}
                        </p>
                      </div>

                      {mat.dueDate && (
                        <div className="flex items-center space-x-1.5 text-xs text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-100">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Son Teslim: <strong>{mat.dueDate}</strong></span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-emerald-50 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {mat.createdBy || "Pınar PEKER"}
                      </span>

                      <button
                        onClick={() => handleOpenMaterial(mat)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center space-x-1.5 shadow-2xs"
                      >
                        <span>{mat.type === "game" ? "Oyna" : mat.type === "assignment" ? "Ödevi Aç" : "İncele"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: MESSAGES TO TEACHER */}
        {activeTab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Teacher Profile & Info */}
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-emerald-200">
                  🌸
                </div>
                <div>
                  <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider block">
                    İngilizce Öğretmeni
                  </span>
                  <h3 className="text-xl font-black text-slate-800">Pınar PEKER</h3>
                  <span className="text-xs text-slate-500">Özel Güneysu Okulları</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
                <div className="flex items-center space-x-1.5 font-black text-emerald-800">
                  <Sparkles className="w-4 h-4" />
                  <span>Öğretmenine Özel Mesaj Gönder:</span>
                </div>
                <p className="leading-relaxed">
                  LGS hazırlığında takıldığın soruları, anlamadığın kalıpları veya ödevlerinle ilgili aklındaki her şeyi buradan Pınar Öğretmene sorabilirsin.
                </p>
                <p className="text-[11px] text-emerald-700 italic">
                  🔒 Gönderdiğin mesajları ve öğretmenin verdiği yanıtları sadece sen ve öğretmenin görebilir.
                </p>
              </div>
            </div>

            {/* Right 2 Cols: Chat Window */}
            <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-emerald-100 shadow-sm flex flex-col h-[520px] overflow-hidden">
              <div className="p-4 bg-emerald-50/60 border-b border-emerald-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-black text-slate-800">Öğretmen Mesajlaşma Hattı</span>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  {messages.length} Mesaj
                </span>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                    <div className="text-3xl">💌</div>
                    <p className="text-xs">Henüz mesajlaşma geçmişiniz bulunmuyor.</p>
                    <p className="text-[11px] text-slate-500">Aşağıdaki kutudan Pınar Öğretmene ilk mesajını yazabilirsin!</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isFromMe = msg.senderRole === "student";
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isFromMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-2xs space-y-1 ${
                            isFromMe
                              ? "bg-emerald-600 text-white rounded-tr-none"
                              : "bg-white text-slate-800 border-2 border-emerald-100 rounded-tl-none"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] opacity-80 pb-1 border-b border-white/20">
                            <span className="font-bold">
                              {isFromMe ? "Sen (Öğrenci)" : "Pınar PEKER (Öğretmen)"}
                            </span>
                            <span>{new Date(msg.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-emerald-100 flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Pınar Öğretmene mesajınızı yazın..."
                  className="flex-1 bg-slate-50 border-2 border-emerald-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={sendingMessage || !newMessageText.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition flex items-center space-x-1.5 shadow-md shadow-emerald-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Gönder</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Material Interactive Modal / Reader */}
      {activeMaterialModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-2 border-emerald-200 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
                  🌸
                </span>
                <div>
                  <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider block">
                    Unit {activeMaterialModal.unitNumber || 1} • {activeMaterialModal.type}
                  </span>
                  <h3 className="text-lg font-black">{activeMaterialModal.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveMaterialModal(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-black transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-1">
                <strong className="text-emerald-900 font-black block">Açıklama:</strong>
                <p>{activeMaterialModal.description}</p>
              </div>

              {activeMaterialModal.content && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 whitespace-pre-wrap font-mono text-xs">
                  {activeMaterialModal.content}
                </div>
              )}

              {activeMaterialModal.externalUrl && (
                <div className="pt-2">
                  <a
                    href={activeMaterialModal.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-md transition"
                  >
                    <span>Uygulamayı / Bağlantıyı Yeni Sekmede Aç</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-bold">
                ✓ Bu içeriğe baktığınız öğretmen arayüzüne kaydedildi.
              </span>
              <button
                onClick={() => setActiveMaterialModal(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
