import React, { useState } from "react";
import { LGS_UNITS } from "../data/lgsCurriculum";
import { LGSQuestion, ExamPaper } from "../types";
import {
  Sparkles,
  Printer,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Plus
} from "lucide-react";

export const ExamMaker: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<number | "all">("all");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<string>("LGS New Generation Standard");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Current Generated Exam
  const [currentExam, setCurrentExam] = useState<ExamPaper | null>(() => {
    // Initial default pre-compiled 5-question LGS mock exam
    const sampleQuestions: LGSQuestion[] = [
      ...LGS_UNITS[0].sampleQuestions,
      ...LGS_UNITS[1].sampleQuestions,
      ...LGS_UNITS[2].sampleQuestions,
      ...LGS_UNITS[3].sampleQuestions,
      ...LGS_UNITS[4].sampleQuestions
    ];
    return {
      id: "exam-init-1",
      title: "8th Grade LGS English Master Mock Exam - Starter Edition",
      unitNumber: "all",
      createdAt: new Date().toLocaleDateString("tr-TR"),
      difficulty: "LGS Standard",
      durationMinutes: 15,
      questions: sampleQuestions,
      instructions: "Read the texts, charts, and dialogues carefully. Choose the correct option (A, B, C, or D). Each question is worth 10 points."
    };
  });

  const [savedExams, setSavedExams] = useState<ExamPaper[]>(() => {
    const local = localStorage.getItem("lgs_saved_exams");
    return local ? JSON.parse(local) : [];
  });

  const [revealedSolutions, setRevealedSolutions] = useState<{ [qId: string]: boolean }>({});
  const [studentAnswers, setStudentAnswers] = useState<{ [qId: string]: string }>({});
  const [schoolHeader, setSchoolHeader] = useState<string>("2025-2026 ACADEMIC YEAR 8TH GRADE LGS ENGLISH PRACTICE EXAM");

  const handleGenerateAIExam = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    let unitTitle = "All 10 MEB Units (General Revision)";
    if (selectedUnit !== "all") {
      const u = LGS_UNITS.find((item) => item.unitNumber === selectedUnit);
      if (u) unitTitle = `Unit ${u.unitNumber}: ${u.title}`;
    }

    try {
      const response = await fetch("/api/gemini/generate-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitNumber: selectedUnit,
          unitTitle,
          questionCount,
          difficulty,
          questionTypes: ["Dialogue", "Table/Graphic", "Invitation/Card", "Poster", "Paragraph"]
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned error ${response.status}`);
      }

      const data = await response.json();
      if (data && data.questions && Array.isArray(data.questions)) {
        const newExam: ExamPaper = {
          id: `exam-${Date.now()}`,
          title: data.title || `8th Grade LGS Practice Exam (${unitTitle})`,
          unitNumber: selectedUnit,
          createdAt: new Date().toLocaleDateString("tr-TR"),
          difficulty,
          durationMinutes: questionCount * 2,
          questions: data.questions.map((q: any, idx: number) => ({
            ...q,
            id: q.id || `gen-q-${idx + 1}`
          })),
          instructions: "Answer all questions according to the MEB LGS curriculum. Good luck!"
        };

        setCurrentExam(newExam);
        setRevealedSolutions({});
        setStudentAnswers({});
      } else {
        throw new Error("Invalid response format from AI generator.");
      }
    } catch (err: any) {
      console.error("AI Exam Generation failed:", err);
      setErrorMessage(err.message || "Failed to generate exam questions. Please check your Gemini API connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveExam = () => {
    if (!currentExam) return;
    const updated = [currentExam, ...savedExams.filter((e) => e.id !== currentExam.id)];
    setSavedExams(updated);
    localStorage.setItem("lgs_saved_exams", JSON.stringify(updated));
    alert("Exam successfully saved to your local test library!");
  };

  const handleDeleteSavedExam = (examId: string) => {
    const updated = savedExams.filter((e) => e.id !== examId);
    setSavedExams(updated);
    localStorage.setItem("lgs_saved_exams", JSON.stringify(updated));
  };

  const handlePrintExam = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Generator Control Panel */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>AI-Powered LGS Exam & Quiz Generator</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Create authentic MEB LGS-style new generation mock tests with visual tables, charts, dialogues, and comprehensive answer keys.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {currentExam && (
              <>
                <button
                  onClick={handleSaveExam}
                  className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 transition"
                >
                  <Save className="w-4 h-4 text-emerald-600" />
                  <span>Save Exam</span>
                </button>
                <button
                  onClick={handlePrintExam}
                  className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Student Exam Paper</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Generator Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Unit selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Curriculum Unit:</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">⭐ All 10 Units (General Revision Mock)</option>
              {LGS_UNITS.map((u) => (
                <option key={u.unitNumber} value={u.unitNumber}>
                  Unit {u.unitNumber}: {u.title}
                </option>
              ))}
            </select>
          </div>

          {/* Question Count */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Question Count:</label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value={3}>3 Questions (Quick Mini Quiz)</option>
              <option value={5}>5 Questions (Standard Practice)</option>
              <option value={10}>10 Questions (Full LGS Exam Format)</option>
              <option value={15}>15 Questions (Intensive Revision Test)</option>
            </select>
          </div>

          {/* Difficulty / Format */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Question Format & Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="LGS New Generation Standard">LGS Standard (New Generation MEB)</option>
              <option value="Advanced / Distractor Heavy">Advanced (Distractor Heavy / Challenging)</option>
              <option value="Visual Table and Chart Focused">Visual Table & Chart Focused</option>
              <option value="Core Vocabulary & Dialogue">Core Vocabulary & Dialogue Focused</option>
            </select>
          </div>

          {/* Action button */}
          <div className="flex items-end">
            <button
              onClick={handleGenerateAIExam}
              disabled={isGenerating}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-xs flex items-center justify-center space-x-2 shadow-xs disabled:opacity-50 transition"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Exam</span>
                </>
              )}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs text-rose-800 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Saved Tests Library Bar (Horizontal Drawer) */}
      {savedExams.length > 0 && (
        <div className="no-print bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Saved Test Library ({savedExams.length})</span>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-thin">
            {savedExams.map((saved) => (
              <div
                key={saved.id}
                className="flex-shrink-0 bg-slate-50 border border-slate-200 hover:border-indigo-300 p-2.5 rounded-lg text-xs flex items-center space-x-2.5 transition"
              >
                <button
                  onClick={() => setCurrentExam(saved)}
                  className="text-left font-bold text-slate-800 hover:text-indigo-600 truncate max-w-[180px]"
                >
                  {saved.title}
                </button>
                <span className="text-[10px] text-slate-500">({saved.questions.length} Qs)</span>
                <button
                  onClick={() => handleDeleteSavedExam(saved.id)}
                  title="Delete"
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXAM PAPER VIEW (Dual Mode: Web Interactive + Printable Sheet) */}
      {currentExam && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
          {/* Printable School & Exam Header */}
          <div className="border-b-2 border-slate-200 print:border-black pb-4 space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <input
                type="text"
                value={schoolHeader}
                onChange={(e) => setSchoolHeader(e.target.value)}
                className="no-print w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 px-3 py-1.5 rounded-lg text-center"
              />
              <div className="print-only hidden text-center w-full font-black text-base uppercase tracking-wider pb-2 border-b">
                {schoolHeader}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 print:text-black pt-1">
              <div>
                <strong>Exam Title:</strong> <span className="text-slate-800 print:text-black font-semibold">{currentExam.title}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span><strong>Questions:</strong> {currentExam.questions.length}</span>
                <span><strong>Duration:</strong> {currentExam.durationMinutes} Minutes</span>
                <span><strong>Date:</strong> {currentExam.createdAt}</span>
              </div>
            </div>

            {/* Student Info Fields for Printable Version */}
            <div className="print-only hidden border-t border-black pt-2 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div><strong>Student Name / Surname:</strong> ____________________</div>
                <div><strong>Class / Number:</strong> 8-___ / ______</div>
                <div><strong>Score / Net:</strong> _____ / 100</div>
              </div>
            </div>
          </div>

          {/* Exam Instructions */}
          <div className="bg-slate-50 print:bg-gray-100 p-3 rounded-lg text-xs text-slate-700 print:text-black border border-slate-200 print:border-gray-300">
            <strong>INSTRUCTIONS:</strong> {currentExam.instructions}
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {currentExam.questions.map((q, idx) => {
              const isSolutionRevealed = revealedSolutions[q.id];
              const selectedOpt = studentAnswers[q.id];

              return (
                <div
                  key={q.id || idx}
                  className="bg-slate-50/70 print:bg-white border border-slate-200 print:border-gray-300 p-5 rounded-xl space-y-3.5 print:p-2 print:rounded-none"
                >
                  {/* Question number and type tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-md bg-indigo-600 print:bg-black text-white font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-indigo-700 print:text-black">
                        [{q.type || "LGS Type"}]
                      </span>
                      {q.kazanim && (
                        <span className="no-print text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                          {q.kazanim}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        setRevealedSolutions((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                      }
                      className="no-print text-xs font-semibold px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition"
                    >
                      {isSolutionRevealed ? "Hide Solution" : "Teacher Solution"}
                    </button>
                  </div>

                  {/* Context Block (Visual, Card, Table, or Dialogue) */}
                  {q.contextBody && (
                    <div className="bg-white print:bg-gray-50 border border-slate-200 print:border-gray-400 p-3.5 rounded-lg text-xs sm:text-sm text-slate-800 print:text-black shadow-2xs">
                      {q.contextTitle && (
                        <div className="font-bold text-indigo-700 print:text-black mb-1.5 uppercase text-xs">
                          {q.contextTitle}
                        </div>
                      )}
                      <div className="whitespace-pre-line leading-relaxed font-sans font-medium">
                        {q.contextBody}
                      </div>
                    </div>
                  )}

                  {/* Question Stem */}
                  <div className="font-bold text-sm sm:text-base text-slate-900 print:text-black leading-snug">
                    {q.questionStem}
                  </div>

                  {/* Options Grid (A, B, C, D) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {(["A", "B", "C", "D"] as const).map((opt) => {
                      const isChosen = selectedOpt === opt;
                      const isCorrect = q.correctAnswer === opt;

                      let btnStyle = "bg-white print:bg-white border-slate-200 print:border-gray-400 text-slate-800 print:text-black hover:bg-indigo-50/50 hover:border-indigo-200";
                      if (isChosen) {
                        btnStyle = isCorrect
                          ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-400 font-semibold"
                          : "bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-400 font-semibold";
                      } else if (isSolutionRevealed && isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold";
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => setStudentAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                          className={`flex items-start text-left p-3 rounded-lg border transition ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded bg-slate-100 print:bg-gray-200 flex items-center justify-center font-bold text-xs mr-2 flex-shrink-0 text-slate-700 print:text-black border border-slate-200">
                            {opt}
                          </span>
                          <span className="leading-snug">{q.options[opt]}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Teacher Solution */}
                  {isSolutionRevealed && (
                    <div className="no-print bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 text-xs text-emerald-900 space-y-1">
                      <div className="font-bold text-emerald-800 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct Answer: Option {q.correctAnswer}</span>
                      </div>
                      <p><strong>Explanation:</strong> {q.explanationTurkish}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Printable Optical Answer Bubble Sheet at bottom */}
          <div className="print-only hidden pt-6 border-t-2 border-black page-break">
            <h4 className="font-bold text-xs uppercase mb-2 text-center">Optical Answer Sheet</h4>
            <div className="flex justify-center space-x-6 text-xs">
              {currentExam.questions.map((_, qIdx) => (
                <div key={qIdx} className="flex items-center space-x-1">
                  <span className="font-bold mr-1">{qIdx + 1}.</span>
                  {(["A", "B", "C", "D"] as const).map((l) => (
                    <span key={l} className="w-4 h-4 rounded-full border border-black text-[9px] flex items-center justify-center">
                      {l}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
