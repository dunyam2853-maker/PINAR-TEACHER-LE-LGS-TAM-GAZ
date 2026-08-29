import React, { useState } from "react";
import {
  BookOpen,
  FileCheck2,
  HelpCircle,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Filter,
  Lightbulb,
  Printer,
  ChevronDown,
  ChevronUp,
  BookmarkCheck
} from "lucide-react";
import confetti from "canvas-confetti";
import { LGS_PAST_QUESTIONS, LGS_UNIT_NAMES } from "../data/lgsPastQuestions";
import { LgsPastQuestion, UserAuth } from "../types";

interface LgsPastQuestionsSectionProps {
  currentUser: UserAuth;
  onActivityLog?: (materialId: string, title: string, actionType: any, details?: string) => void;
}

export const LgsPastQuestionsSection: React.FC<LgsPastQuestionsSectionProps> = ({
  currentUser,
  onActivityLog,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedUnit, setSelectedUnit] = useState<number | "all">("all");
  const [activeTab, setActiveTab] = useState<"practice" | "exam_mode" | "tactics">("practice");

  // Practice state
  const [userAnswers, setUserAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [showAnalysis, setShowAnalysis] = useState<Record<string, boolean>>({});

  // Filtered Questions
  const filteredQuestions = LGS_PAST_QUESTIONS.filter((q) => {
    if (selectedYear !== "all" && q.year !== selectedYear) return false;
    if (selectedUnit !== "all" && q.unitNumber !== selectedUnit) return false;
    return true;
  });

  const handleSelectAnswer = (questionId: string, optionKey: "A" | "B" | "C" | "D") => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    setShowAnalysis((prev) => ({ ...prev, [questionId]: true }));

    const question = LGS_PAST_QUESTIONS.find((q) => q.id === questionId);
    if (question && question.correctAnswer === optionKey) {
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
    }

    if (onActivityLog) {
      onActivityLog(questionId, `LGS ${question?.year || ""} Soru ${question?.questionNumber || ""}`, "solve", `Seçilen şık: ${optionKey}`);
    }
  };

  const toggleAnalysis = (questionId: string) => {
    setShowAnalysis((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const yearsList = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-200">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-black mb-1">
              <span>🌸 Özel Güneysu Okulları LGS Arşivi</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              LGS İngilizce Çıkmış Sorular & MEB Analiz Havuzu
            </h2>
            <p className="text-xs text-slate-500">
              2018-2024 arası tüm resmi LGS İngilizce soruları, detaylı çözüm taktikleri ve çeldirici analizleri.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Yazdır / PDF</span>
          </button>
        </div>
      </div>

      {/* Filter & Submenu Bar */}
      <div className="bg-white rounded-2xl p-4 border-2 border-emerald-100 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Year Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              <span>Yıl:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedYear("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  selectedYear === "all"
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-emerald-50"
                }`}
              >
                Tümü
              </button>
              {yearsList.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    selectedYear === year
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700 hover:bg-emerald-50"
                  }`}
                >
                  {year} LGS
                </button>
              ))}
            </div>
          </div>

          {/* Unit Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500">Ünite:</span>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="bg-slate-50 border border-emerald-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <option value="all">Tüm Üniteler (1-10)</option>
              {Object.entries(LGS_UNIT_NAMES).map(([num, name]) => (
                <option key={num} value={num}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-emerald-100 space-y-3">
            <div className="text-4xl">🌿</div>
            <h4 className="text-base font-bold text-slate-700">Seçilen filtrelere uygun soru bulunamadı.</h4>
            <p className="text-xs text-slate-400">Lütfen farklı bir yıl veya ünite filtresi seçiniz.</p>
          </div>
        ) : (
          filteredQuestions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isAnswered = !!userAnswer;
            const isCorrect = userAnswer === question.correctAnswer;
            const isOpen = showAnalysis[question.id];

            return (
              <div
                key={question.id}
                className="bg-white rounded-3xl border-2 border-emerald-100 shadow-md p-6 space-y-5 transition hover:border-emerald-300"
              >
                {/* Header Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-50">
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-xl shadow-2xs">
                      {question.year} LGS • Soru {question.questionNumber}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-xl border border-emerald-200">
                      Unit {question.unitNumber}: {question.unitTitle}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg">
                    Konu: {question.topic}
                  </span>
                </div>

                {/* Context Passage or Visual Graphic if exists */}
                {question.contextPassage && (
                  <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 font-mono text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                    {question.contextPassage}
                  </div>
                )}

                {question.visualGraphic && (
                  <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2">
                    <span className="text-xs font-black text-amber-900 block">
                      📊 {question.visualGraphic.title}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {question.visualGraphic.items?.map((item, i) => (
                        <div key={i} className="bg-white p-2.5 rounded-xl border border-amber-100 flex justify-between text-xs font-medium">
                          <span className="text-slate-700">{item.label}</span>
                          <strong className="text-amber-800">{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question Prompt */}
                <div>
                  <p className="text-base font-black text-slate-800 leading-snug">
                    {question.questionPrompt}
                  </p>
                </div>

                {/* Options (A, B, C, D) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map((opt) => {
                    let optionStyle = "bg-white border-slate-200 hover:bg-emerald-50 text-slate-800";
                    if (isAnswered) {
                      if (opt.key === question.correctAnswer) {
                        optionStyle = "bg-emerald-600 text-white border-emerald-600 shadow-md font-black";
                      } else if (opt.key === userAnswer) {
                        optionStyle = "bg-rose-500 text-white border-rose-500 shadow-md font-black";
                      } else {
                        optionStyle = "bg-slate-50 text-slate-400 border-slate-200 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectAnswer(question.id, opt.key)}
                        className={`p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold text-left transition flex items-center justify-between shadow-2xs ${optionStyle}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-black flex items-center justify-center flex-shrink-0">
                            {opt.key}
                          </span>
                          <span>{opt.text}</span>
                        </div>

                        {isAnswered && opt.key === question.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 ml-2" />
                        )}
                        {isAnswered && opt.key === userAnswer && opt.key !== question.correctAnswer && (
                          <XCircle className="w-5 h-5 text-white flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Toggle MEB Analysis Accordion */}
                <div className="pt-2 border-t border-emerald-50">
                  <button
                    onClick={() => toggleAnalysis(question.id)}
                    className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center space-x-1.5 py-1"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>{isOpen ? "MEB Çözüm Analizini Gizle" : "💡 MEB Çözüm Analizi & Çeldirici İpuçlarını Gör"}</span>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isOpen && (
                    <div className="mt-3 bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 space-y-3 text-xs text-slate-800 animate-in fade-in duration-200">
                      <div>
                        <strong className="text-emerald-900 font-black block mb-1">
                          🎯 Doğru Cevap: {question.correctAnswer} - MEB Soru İncelemesi:
                        </strong>
                        <p className="leading-relaxed text-slate-700">{question.mebAnalysis}</p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-emerald-100">
                        <strong className="text-amber-800 font-bold block mb-1">
                          ⚡ LGS Taktik & İpucu:
                        </strong>
                        <p className="text-slate-600">{question.strategyTactic}</p>
                      </div>

                      <div>
                        <strong className="text-slate-700 font-bold block mb-1.5">
                          🔍 Çeldirici Şıkların Açıklamaları:
                        </strong>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          {Object.entries(question.distractorExplanation).map(([key, desc]) => (
                            <div key={key} className="bg-white/90 p-2 rounded-lg border border-emerald-100">
                              <span className="font-bold text-emerald-800 mr-1">{key}:</span>
                              <span className="text-slate-600">{desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
