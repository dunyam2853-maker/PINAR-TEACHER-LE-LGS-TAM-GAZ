import React, { useState, useEffect } from "react";
import {
  Trophy,
  Flame,
  Zap,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Medal,
  Users,
  Play,
  Volume2,
  VolumeX
} from "lucide-react";
import confetti from "canvas-confetti";
import { UNIT_COMPETITIONS } from "../data/unitCompetitionsData";
import { UserAuth, UnitCompetition, CompetitionQuestion, CompetitionLeaderboardEntry } from "../types";

interface UnitCompetitionsProps {
  currentUser: UserAuth;
  onActivityLog?: (materialId: string, title: string, actionType: any, details?: string) => void;
}

export const UnitCompetitions: React.FC<UnitCompetitionsProps> = ({ currentUser, onActivityLog }) => {
  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [activeComp, setActiveComp] = useState<UnitCompetition | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpentTotal, setTimeSpentTotal] = useState(0);

  const [leaderboard, setLeaderboard] = useState<CompetitionLeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Fetch leaderboard for active unit
  const fetchLeaderboard = async (unitNum: number) => {
    setLoadingLeaderboard(true);
    try {
      const res = await fetch(`/api/competitions/leaderboard?unitNumber=${unitNum}`);
      const data = await res.json();
      if (data.leaderboard) {
        setLeaderboard(data.leaderboard);
      }
    } catch {
      // Fallback
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(selectedUnit);
  }, [selectedUnit]);

  // Timer interval
  useEffect(() => {
    if (!isStarted || isCompleted || isAnswered) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setTimeSpentTotal((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isStarted, isCompleted, isAnswered, timeLeft]);

  const currentCompetition = UNIT_COMPETITIONS.find((c) => c.unitNumber === selectedUnit) || UNIT_COMPETITIONS[0];
  const currentQuestion: CompetitionQuestion | undefined = currentCompetition.questions[currentQIndex];

  const handleStart = () => {
    setActiveComp(currentCompetition);
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setTimeSpentTotal(0);
    setTimeLeft(currentCompetition.questions[0]?.timeLimitSec || 15);
    setIsStarted(true);
    setIsCompleted(false);

    if (onActivityLog) {
      onActivityLog(currentCompetition.id, `Unit ${selectedUnit} Hızlı Yarışma`, "play", "Yarışma başlatıldı");
    }
  };

  const handleTimeout = () => {
    setIsAnswered(true);
    setStreak(0);
    setTimeout(handleNext, 1800);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || isCompleted || !currentQuestion) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuestion.correctIndex;

    if (isCorrect) {
      const added = 100 + streak * 25 + timeLeft * 10;
      setScore((prev) => prev + added);
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);

      if (streak + 1 >= 3) {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      setStreak(0);
    }

    setTimeout(handleNext, 1600);
  };

  const handleNext = () => {
    if (!currentCompetition) return;
    if (currentQIndex + 1 < currentCompetition.questions.length) {
      const nextIdx = currentQIndex + 1;
      setCurrentQIndex(nextIdx);
      setSelectedOpt(null);
      setIsAnswered(false);
      setTimeLeft(currentCompetition.questions[nextIdx]?.timeLimitSec || 15);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setIsCompleted(true);
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });

    // Submit score to backend
    try {
      await fetch("/api/competitions/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          competitionId: currentCompetition.id,
          unitNumber: selectedUnit,
          studentUsername: currentUser.username,
          studentId: currentUser.id,
          score,
          correctAnswers: correctCount,
          totalQuestions: currentCompetition.questions.length,
          timeSpentSeconds: timeSpentTotal,
        }),
      });
      fetchLeaderboard(selectedUnit);
    } catch {
      // Ignore
    }

    if (onActivityLog) {
      onActivityLog(
        currentCompetition.id,
        `Unit ${selectedUnit} Hızlı Yarışma`,
        "complete",
        `${score} Puan (${correctCount}/${currentCompetition.questions.length} Doğru)`
      );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-100">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-black mb-1">
              <span>🏆 Özel Güneysu Okulları Ünite Düelloları</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              LGS Ünite Hızlı Yarışmaları & Kahoot Düellosu
            </h2>
            <p className="text-xs text-slate-500">
              MEB 8. Sınıf 10 ünitesinin kısa yarışmalarında zamana karşı yarış, okul liderlik tablosunda zirveye yerleş!
            </p>
          </div>
        </div>
      </div>

      {/* 10-Unit Fast Selector Bar */}
      <div className="bg-white p-3 rounded-2xl border-2 border-emerald-100 shadow-sm overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {UNIT_COMPETITIONS.map((comp) => {
            const isSelected = selectedUnit === comp.unitNumber;
            return (
              <button
                key={comp.unitNumber}
                onClick={() => {
                  setSelectedUnit(comp.unitNumber);
                  setIsStarted(false);
                  setIsCompleted(false);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition flex items-center space-x-2 ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                    : "bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200"
                }`}
              >
                <span>{comp.badgeEmoji}</span>
                <span>Unit {comp.unitNumber}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Competition Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Competition Game Screen */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-md p-6 relative overflow-hidden">
            {/* Header with Unit Info */}
            <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{currentCompetition.badgeEmoji}</span>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Unit {currentCompetition.unitNumber}: {currentCompetition.unitTitle}
                  </h3>
                  <span className="text-xs text-emerald-700 font-bold">
                    {currentCompetition.questions.length} Hızlı Soru • Süre & Seri Çarpanı
                  </span>
                </div>
              </div>

              {isStarted && !isCompleted && (
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-xl text-xs font-black">
                    Skor: {score}
                  </div>
                  <div className={`px-3 py-1 rounded-xl text-xs font-black flex items-center space-x-1 ${
                    timeLeft <= 5 ? "bg-rose-100 text-rose-700 animate-pulse" : "bg-slate-100 text-slate-800"
                  }`}>
                    <Timer className="w-3.5 h-3.5" />
                    <span>{timeLeft}s</span>
                  </div>
                </div>
              )}
            </div>

            {/* State 1: Ready to Start Screen */}
            {!isStarted && !isCompleted && (
              <div className="py-12 text-center space-y-5">
                <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl shadow-inner">
                  {currentCompetition.badgeEmoji}
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h4 className="text-xl font-black text-slate-800">
                    {currentCompetition.unitTitle} Yarışmasına Hazır mısın?
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Her soru için 10-15 saniye süren var. Hızlı ve doğru cevap vererek seri çarpanı kazan, okulunun lider tablosunda 1. sıraya yüksel!
                  </p>
                </div>

                <button
                  onClick={handleStart}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-3.5 rounded-2xl text-sm transition shadow-lg shadow-emerald-200 inline-flex items-center space-x-2"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Yarışmayı Başlat 🌸</span>
                </button>
              </div>
            )}

            {/* State 2: Active Question Playing */}
            {isStarted && !isCompleted && currentQuestion && (
              <div className="py-6 space-y-6">
                {/* Progress Bar & Streak */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Soru {currentQIndex + 1} / {currentCompetition.questions.length}</span>
                    {streak > 1 && (
                      <span className="text-amber-600 flex items-center space-x-1 font-black">
                        <Flame className="w-4 h-4 fill-amber-500" />
                        <span>{streak}x Seri Çarpan!</span>
                      </span>
                    )}
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                      style={{ width: `${((currentQIndex + 1) / currentCompetition.questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    Hızlı Soru
                  </span>
                  <p className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                    {currentQuestion.question}
                  </p>
                </div>

                {/* Option Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, idx) => {
                    let btnClass = "bg-white hover:bg-emerald-50 border-slate-200 text-slate-800";
                    if (isAnswered) {
                      if (idx === currentQuestion.correctIndex) {
                        btnClass = "bg-emerald-600 text-white border-emerald-600 font-black shadow-md";
                      } else if (idx === selectedOpt) {
                        btnClass = "bg-rose-500 text-white border-rose-500 font-black shadow-md";
                      } else {
                        btnClass = "bg-slate-50 text-slate-400 border-slate-100 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-4 rounded-2xl border-2 text-sm font-bold text-left transition flex items-center justify-between shadow-2xs ${btnClass}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center flex-shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>

                        {isAnswered && idx === currentQuestion.correctIndex && (
                          <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 ml-2" />
                        )}
                        {isAnswered && idx === selectedOpt && idx !== currentQuestion.correctIndex && (
                          <XCircle className="w-5 h-5 text-white flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation during answer state */}
                {isAnswered && (
                  <div className="bg-emerald-100/90 border border-emerald-300 p-3.5 rounded-2xl text-xs text-emerald-950 flex items-start space-x-2 animate-in fade-in duration-150">
                    <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block">Açıklama:</strong>
                      <p>{currentQuestion.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* State 3: Completed Scoreboard */}
            {isCompleted && (
              <div className="py-8 text-center space-y-6 animate-in zoom-in duration-200">
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-4xl shadow-md animate-bounce">
                  🏆
                </div>

                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-slate-800">
                    Yarışmayı Tamamladın! 🌸
                  </h4>
                  <p className="text-xs text-slate-500">
                    Özel Güneysu Okulları Unit {selectedUnit} Liderlik Tablosuna Skorun Kaydedildi.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
                    <span className="text-[11px] font-bold text-emerald-800 block">Toplam Skor</span>
                    <strong className="text-2xl font-black text-emerald-700 font-mono">{score}</strong>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
                    <span className="text-[11px] font-bold text-amber-800 block">Doğru / Toplam</span>
                    <strong className="text-2xl font-black text-amber-700 font-mono">{correctCount}/{currentCompetition.questions.length}</strong>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200 text-center">
                    <span className="text-[11px] font-bold text-teal-800 block">Geçen Süre</span>
                    <strong className="text-2xl font-black text-teal-700 font-mono">{timeSpentTotal}s</strong>
                  </div>
                </div>

                <button
                  onClick={handleStart}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-2xl text-xs transition inline-flex items-center space-x-2 shadow-md shadow-emerald-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tekrar Yarış</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Unit Leaderboard */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-md p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-50">
              <div className="flex items-center space-x-2">
                <Medal className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-black text-slate-800">
                  Unit {selectedUnit} Lider Tablosu
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                En Yüksek Skorlar
              </span>
            </div>

            {loadingLeaderboard ? (
              <div className="py-8 text-center text-xs text-slate-400">Yükleniyor...</div>
            ) : leaderboard.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <div className="text-3xl">🌿</div>
                <p className="text-xs text-slate-500 font-medium">
                  Bu ünite için ilk skoru sen kaydet!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.slice(0, 7).map((entry, idx) => {
                  let rankBadge = `${idx + 1}.`;
                  let rankStyle = "bg-slate-100 text-slate-700";
                  if (idx === 0) {
                    rankBadge = "🥇";
                    rankStyle = "bg-amber-100 text-amber-800 font-black";
                  } else if (idx === 1) {
                    rankBadge = "🥈";
                    rankStyle = "bg-slate-200 text-slate-800 font-black";
                  } else if (idx === 2) {
                    rankBadge = "🥉";
                    rankStyle = "bg-amber-200 text-amber-900 font-black";
                  }

                  const isCurrentUser = entry.studentUsername === currentUser.username;

                  return (
                    <div
                      key={entry.id || idx}
                      className={`p-2.5 rounded-2xl flex items-center justify-between text-xs border transition ${
                        isCurrentUser
                          ? "bg-emerald-50 border-emerald-300 font-black"
                          : "bg-white border-slate-100 hover:border-emerald-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs ${rankStyle}`}>
                          {rankBadge}
                        </span>
                        <div>
                          <span className="font-bold text-slate-800 block">
                            {entry.studentUsername} {isCurrentUser && "🌸 (Sen)"}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {entry.correctAnswers}/{entry.totalQuestions} Doğru • {entry.timeSpentSeconds}s
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-700 font-mono">
                          {entry.score} pts
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
