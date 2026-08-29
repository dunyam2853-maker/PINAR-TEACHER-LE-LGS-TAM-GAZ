import React from "react";
import {
  BookOpen,
  Sparkles,
  Monitor,
  Calendar,
  BarChart3,
  Gamepad2,
  BotMessageSquare,
  Clock,
  Printer,
  MessageSquare,
  Layers,
  Activity,
  Database,
  LogOut,
  User,
  FileCheck2,
  Trophy,
  Award
} from "lucide-react";
import { UserAuth } from "../types";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserAuth;
  onLogout: () => void;
  onOpenSqlModal: () => void;
  onPrintCurrentView?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
  onOpenSqlModal,
  onPrintCurrentView
}) => {
  const calculateDaysToLGS = () => {
    const today = new Date();
    const lgsDate = new Date(today.getFullYear(), 5, 7);
    if (today > lgsDate) {
      lgsDate.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = Math.abs(lgsDate.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysToLGS = calculateDaysToLGS();

  const navItems = [
    { id: "units", label: "10 Ünite Müfredatı", icon: BookOpen, tag: "MEB" },
    { id: "homework-checker", label: "Ödev Kontrol & Notlandırma", icon: FileCheck2, tag: "Gelen Ödevler" },
    { id: "materials", label: "Ödev & Materyal Ekle", icon: Layers, tag: "Öğrenci Paneli" },
    { id: "activities", label: "Öğrenci Etkileşim & Tıklama", icon: Activity, tag: "Canlı Analiz" },
    { id: "messages", label: "Öğrenci Mesajları", icon: MessageSquare, tag: "Özel" },
    { id: "exam-maker", label: "AI Exam & Quiz Maker", icon: Sparkles, tag: "Yapay Zeka" },
    { id: "smartboard", label: "Akıllı Tahta Modu", icon: Monitor, tag: "Etkileşimli" },
    { id: "tracker", label: "Deneme & Net Takip", icon: BarChart3, tag: "Net Takip" },
    { id: "games", label: "3D Oyunlar & İstasyon", icon: Gamepad2, tag: "3D Oyun" },
    { id: "copilot", label: "Öğretmen AI Copilot", icon: BotMessageSquare, tag: "Asistan" }
  ];

  return (
    <header className="no-print sticky top-0 z-40 bg-white border-b-2 border-emerald-100 shadow-xs">
      {/* Top Bar with Brand & Teacher Profile */}
      <div className="border-b border-emerald-950/20 bg-[#064E3B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-lg font-black shadow-inner">
              🌸
            </div>
            <div className="border-l-2 border-emerald-400/50 pl-3">
              <h1 className="text-white text-sm sm:text-base font-black tracking-tight flex items-center flex-wrap gap-2">
                <span>Özel Güneysu Okulları</span>
                <span className="text-emerald-300 font-bold text-xs sm:text-sm">
                  • Pınar Teacher ile Tam Gaz LGS 🚀
                </span>
                <span className="text-[10px] font-black bg-emerald-400/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/40">
                  ÖĞRETMEN & YÖNETİCİ PANELİ
                </span>
              </h1>
              <p className="text-emerald-200/80 text-[10px] uppercase tracking-wider font-semibold">
                MEB 8. Sınıf Müfredat, 3D Oyunlar & Ödev Kontrol Masası
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Supabase SQL Button */}
            <button
              onClick={onOpenSqlModal}
              className="flex items-center space-x-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-emerald-100 hover:text-white px-2.5 py-1.5 rounded-xl text-xs font-bold transition border border-emerald-500/40"
              title="Supabase SQL Tablo Kurulum Kodu"
            >
              <Database className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">Supabase SQL Kodu</span>
            </button>

            {/* LGS Countdown Badge */}
            <div className="hidden md:flex items-center space-x-2 bg-emerald-900/90 border border-emerald-700/60 px-3 py-1.5 rounded-xl text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-emerald-200">
                LGS'ye: <strong className="text-white font-bold">{daysToLGS} Gün</strong>
              </span>
            </div>

            {/* Teacher Profile & Logout */}
            <div className="flex items-center space-x-2 pl-2 border-l border-emerald-800">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 text-xs font-black shadow-xs">
                {currentUser.username.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-white text-xs font-bold leading-tight">{currentUser.username}</p>
                <p className="text-emerald-300 text-[10px] font-semibold">Yönetici / Öğretmen</p>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg bg-emerald-900/80 hover:bg-rose-900/60 text-emerald-200 hover:text-rose-200 transition border border-emerald-700/40"
                title="Çıkış Yap"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex items-center justify-between py-2">
          {/* Nav Items */}
          <nav className="flex space-x-1.5 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-emerald-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Action Print */}
          {onPrintCurrentView && (
            <div className="hidden xl:flex items-center pl-3 border-l border-emerald-200">
              <button
                onClick={onPrintCurrentView}
                title="Yazdır / PDF Olarak Kaydet"
                className="flex items-center space-x-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold transition"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-700" />
                <span>Yazdır</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
