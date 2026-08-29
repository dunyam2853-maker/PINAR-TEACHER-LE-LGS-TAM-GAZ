import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Zap,
  PhoneCall,
  Utensils,
  FileText,
  Clock,
  ExternalLink,
  Layers,
  RefreshCw
} from "lucide-react";
import { PortalMaterial } from "../types";

export const MaterialsManager: React.FC = () => {
  const [materials, setMaterials] = useState<PortalMaterial[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New material form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"assignment" | "game" | "app" | "resource" | "tool">("assignment");
  const [unitNumber, setUnitNumber] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [badgeText, setBadgeText] = useState("Yeni Görev");
  const [dueDate, setDueDate] = useState("Bu Hafta Pazar 23:59");
  const [iconName, setIconName] = useState("BookOpen");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/materials");
      const data = await res.json();
      if (data.materials) {
        setMaterials(data.materials);
      }
    } catch (err) {
      console.error("Error fetching materials:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/materials/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          type,
          unitNumber: Number(unitNumber),
          description: description.trim(),
          badgeText: badgeText.trim(),
          dueDate: dueDate.trim(),
          iconName,
          createdBy: "Pınar PEKER",
        }),
      });

      const data = await res.json();
      if (res.ok && data.material) {
        setMaterials((prev) => [data.material, ...prev]);
        setShowAddModal(false);
        // Reset form
        setTitle("");
        setDescription("");
      }
    } catch (err) {
      console.error("Error creating material:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu materyali silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMaterials((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error("Error deleting material:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Öğrenci Materyalleri, Ödevler ve Araç Yayınlama
            </h2>
            <p className="text-xs text-slate-500">
              Öğrencilerinizin ekranında görüntülenecek ödevleri, LGS oyunlarını, testleri ve kaynakları yönetin.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={fetchMaterials}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            title="Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Materyal / Ödev Ekle</span>
          </button>
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs hover:shadow-sm transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
                    {mat.type}
                  </span>
                  {mat.unitNumber && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Unit {mat.unitNumber}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(mat.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">{mat.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {mat.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-1 text-slate-600 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{mat.dueDate || "Süresiz"}</span>
              </div>

              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold text-[10px] border border-emerald-100">
                {mat.badgeText || "Aktif"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <span>Yeni Öğrenci Materyali / Ödevi Yayınla</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Materyal Başlığı:</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Unit 3 Cooking Verbs & Steps Alıştırması"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Materyal Türü:</label>
                  <select
                    value={type}
                    onChange={(e: any) => setType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="assignment">Ödev (Assignment)</option>
                    <option value="game">Oyun (Interactive Game)</option>
                    <option value="app">İnteraktif Araç (App/Tool)</option>
                    <option value="resource">Ders Kaynağı / PDF</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">MEB Ünitesi:</label>
                  <select
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((u) => (
                      <option key={u} value={u}>
                        Unit {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama & Öğrenci Yönergesi:</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Öğrencilerinizin bu görevde ne yapması gerektiğini açıklayın..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Etiket / Rozet:</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="Örn: Haftalık Ödev"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Son Tarih / Süre:</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="Örn: Pazar 23:59"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition disabled:opacity-50"
                >
                  {submitting ? "Yayınlanıyor..." : "Materyali Yayınla"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
