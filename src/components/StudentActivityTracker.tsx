import React, { useState, useEffect } from "react";
import {
  Activity,
  UserCheck,
  MousePointerClick,
  Eye,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Clock,
  Layers,
  Award,
  Sparkles
} from "lucide-react";
import { ActivityAnalytics } from "../types";

export const StudentActivityTracker: React.FC = () => {
  const [analytics, setAnalytics] = useState<ActivityAnalytics | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/activities/analytics");
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-xs">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Öğrenci Etkileşim & Tıklama Analiz Paneli
            </h2>
            <p className="text-xs text-slate-500">
              Öğrencilerinizin sayfadaki ödevlere, oyunlara ve ders kaynaklarına tıklama ve katılım verileri.
            </p>
          </div>
        </div>

        <button
          onClick={fetchAnalytics}
          className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-slate-200"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Analizi Yenile</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>TOPLAM ETKİLEŞİM</span>
            <MousePointerClick className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {analytics ? analytics.totalActivities : 0}
          </div>
          <p className="text-[11px] text-slate-500">Ödev inceleme, oyun oynama & indirme</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>AKTİF ÖĞRENCİ SAYISI</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {analytics ? analytics.studentStats.length : 0}
          </div>
          <p className="text-[11px] text-slate-500">Portala giriş yapıp işlem yapanlar</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>EN ÇOK ERİŞİLEN MATERYALLER</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {analytics ? analytics.materialStats.length : 0}
          </div>
          <p className="text-[11px] text-slate-500">Farklı materyal etkileşimi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Engagement Leaderboard */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Öğrenci Katılım Çizelgesi</span>
            </h3>
            <span className="text-xs text-slate-400">Tıklama & Erişim Sıralaması</span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {!analytics || analytics.studentStats.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Henüz öğrenci aktivitesi kaydedilmedi.</p>
            ) : (
              analytics.studentStats.map((st, idx) => (
                <div
                  key={st.studentId}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-slate-800">{st.username}</div>
                      <div className="text-[10px] text-slate-400">
                        {st.uniqueMaterialsCount} farklı materyale erişti
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-2.5 py-1 rounded-full border border-indigo-100">
                      {st.totalClicks} Tıklama / İşlem
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Popular Materials Chart / Breakdown */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>Materyal & Oyun İnceleme Dağılımı</span>
            </h3>
            <span className="text-xs text-slate-400">Popülerlik Durumu</span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {!analytics || analytics.materialStats.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Henüz materyal etkileşimi yok.</p>
            ) : (
              analytics.materialStats.map((mat) => (
                <div
                  key={mat.materialId}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800 truncate max-w-[280px]">
                      {mat.title}
                    </span>
                    <span className="font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {mat.totalInteractions} Etkileşim
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Erişen Öğrenci Sayısı: {mat.uniqueStudentCount}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Live Recent Activity Stream */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>Canlı Öğrenci Etkileşim Akışı</span>
          </h3>
          <span className="text-xs text-slate-400">Son 50 İşlem</span>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {!analytics || analytics.recentActivities.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">Henüz aktivite kaydı yok.</p>
          ) : (
            analytics.recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {act.studentUsername.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{act.studentUsername}</span>
                    <span className="text-slate-500 mx-1.5">&bull;</span>
                    <span className="text-slate-700 font-medium">{act.materialTitle}</span>
                    {act.details && (
                      <span className="text-slate-400 text-[11px] block">{act.details}</span>
                    )}
                  </div>
                </div>

                <div className="text-right flex items-center space-x-2 text-[11px] text-slate-400">
                  <span className="bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full font-bold uppercase text-[9px]">
                    {act.actionType}
                  </span>
                  <span>{new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
