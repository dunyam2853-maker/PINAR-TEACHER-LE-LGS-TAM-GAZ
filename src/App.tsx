import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { UnitsHub } from "./components/UnitsHub";
import { ExamMaker } from "./components/ExamMaker";
import { SmartBoardMode } from "./components/SmartBoardMode";
import { LessonPlanner } from "./components/LessonPlanner";
import { ClassTracker } from "./components/ClassTracker";
import { GameStation } from "./components/GameStation";
import { TeacherCopilot } from "./components/TeacherCopilot";
import { AuthView } from "./components/AuthView";
import { StudentPortal } from "./components/StudentPortal";
import { TeacherMessageCenter } from "./components/TeacherMessageCenter";
import { MaterialsManager } from "./components/MaterialsManager";
import { StudentActivityTracker } from "./components/StudentActivityTracker";
import { TeacherHomeworkChecker } from "./components/TeacherHomeworkChecker";
import { SupabaseSqlModal } from "./components/SupabaseSqlModal";
import { motion, AnimatePresence } from "motion/react";
import { UserAuth } from "./types";

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAuth | null>(() => {
    try {
      const stored = sessionStorage.getItem("lgs_portal_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<string>("units");
  const [isSqlModalOpen, setIsSqlModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("lgs_portal_user", JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem("lgs_portal_user");
    }
  }, [currentUser]);

  const handleLoginSuccess = (user: UserAuth) => {
    setCurrentUser(user);
    if (user.role === "teacher") {
      setActiveTab("units");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handlePrintCurrentView = () => {
    window.print();
  };

  // 1. If not logged in -> Show Floral Green Login / Register View
  if (!currentUser) {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. If logged in as Student -> Show Student Portal
  if (currentUser.role === "student") {
    return <StudentPortal user={currentUser} onLogout={handleLogout} />;
  }

  // 3. If logged in as Teacher / Admin -> Show Full Teacher Dashboard
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-emerald-600 selection:text-white font-sans antialiased">
      {/* Teacher Portal Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenSqlModal={() => setIsSqlModalOpen(true)}
        onPrintCurrentView={handlePrintCurrentView}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {activeTab === "units" && (
            <motion.div
              key="units"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <UnitsHub />
            </motion.div>
          )}

          {activeTab === "homework-checker" && (
            <motion.div
              key="homework-checker"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <TeacherHomeworkChecker />
            </motion.div>
          )}

          {activeTab === "materials" && (
            <motion.div
              key="materials"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <MaterialsManager />
            </motion.div>
          )}

          {activeTab === "activities" && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <StudentActivityTracker />
            </motion.div>
          )}

          {activeTab === "messages" && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <TeacherMessageCenter />
            </motion.div>
          )}

          {activeTab === "exam-maker" && (
            <motion.div
              key="exam-maker"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ExamMaker />
            </motion.div>
          )}

          {activeTab === "smartboard" && (
            <motion.div
              key="smartboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SmartBoardMode />
            </motion.div>
          )}

          {activeTab === "planner" && (
            <motion.div
              key="planner"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <LessonPlanner />
            </motion.div>
          )}

          {activeTab === "tracker" && (
            <motion.div
              key="tracker"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ClassTracker />
            </motion.div>
          )}

          {activeTab === "games" && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <GameStation />
            </motion.div>
          )}

          {activeTab === "copilot" && (
            <motion.div
              key="copilot"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <TeacherCopilot />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Supabase SQL Setup Modal */}
      <SupabaseSqlModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />

      {/* Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-800 font-bold">LGS English Master Portal</span>
            <span className="text-slate-400">| MEB 8. Sınıf Öğretmen ve Öğrenci Platformu</span>
          </div>
          <div className="text-slate-500 font-medium">
            Supabase Veritabanı Destekli &bull; 10 Ünite &bull; LGS 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
