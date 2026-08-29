import React, { useState, useEffect } from "react";
import { LGS_UNITS } from "../data/lgsCurriculum";
import { SAMPLE_STUDENTS } from "../data/sampleStudentsData";
import {
  Monitor,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCcw,
  Sparkles,
  Users,
  Timer,
  Play,
  Pause,
  Award,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { speakWord } from "../utils/speech";
import confetti from "canvas-confetti";

export const SmartBoardMode: React.FC = () => {
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [currentSlideType, setCurrentSlideType] = useState<"flashcards" | "quickquiz" | "roleplay" | "randompicker">("flashcards");
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const [showMeaning, setShowMeaning] = useState<boolean>(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizRevealed, setQuizRevealed] = useState<boolean>(false);

  // Classroom Timer / Stopwatch State
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Random Student Picker State
  const [pickedStudent, setPickedStudent] = useState<string | null>(null);
  const [isPickingStudent, setIsPickingStudent] = useState<boolean>(false);

  const currentUnit = LGS_UNITS.find((u) => u.unitNumber === selectedUnitNumber) || LGS_UNITS[0];
  const currentVocab = currentUnit.targetVocabulary[vocabIndex] || currentUnit.targetVocabulary[0];
  const currentQuiz = currentUnit.sampleQuestions[quizQuestionIndex] || currentUnit.sampleQuestions[0];

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      speakWord("Time is up!");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleNextVocab = () => {
    setShowMeaning(false);
    setVocabIndex((prev) => (prev + 1) % currentUnit.targetVocabulary.length);
  };

  const handlePrevVocab = () => {
    setShowMeaning(false);
    setVocabIndex((prev) => (prev - 1 + currentUnit.targetVocabulary.length) % currentUnit.targetVocabulary.length);
  };

  const handlePickRandomStudent = () => {
    setIsPickingStudent(true);
    let counter = 0;
    const interval = setInterval(() => {
      const rand = SAMPLE_STUDENTS[Math.floor(Math.random() * SAMPLE_STUDENTS.length)];
      setPickedStudent(rand.fullName);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setIsPickingStudent(false);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    }, 100);
  };

  const handleQuizAnswer = (option: string) => {
    setQuizSelectedOption(option);
    setQuizRevealed(true);
    if (option === currentQuiz.correctAnswer) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      speakWord("Correct! Great job.");
    } else {
      speakWord("Try again next time.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Smartboard Control Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              Smart Board & Classroom Interaction Mode
            </h2>
            <p className="text-xs text-slate-500">
              High-contrast vocabulary flashcards, interactive quick quizzes, dialogue arena, and random student picker for projector and smart board.
            </p>
          </div>
        </div>

        {/* Unit Selector & Modes */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <select
            value={selectedUnitNumber}
            onChange={(e) => {
              setSelectedUnitNumber(Number(e.target.value));
              setVocabIndex(0);
              setQuizQuestionIndex(0);
              setQuizRevealed(false);
              setQuizSelectedOption(null);
            }}
            className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {LGS_UNITS.map((u) => (
              <option key={u.unitNumber} value={u.unitNumber}>
                Unit {u.unitNumber}: {u.title}
              </option>
            ))}
          </select>

          {/* Activity Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setCurrentSlideType("flashcards")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                currentSlideType === "flashcards" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Vocabulary Cards
            </button>
            <button
              onClick={() => setCurrentSlideType("quickquiz")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                currentSlideType === "quickquiz" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Classroom Quiz
            </button>
            <button
              onClick={() => setCurrentSlideType("roleplay")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                currentSlideType === "roleplay" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Dialogue Arena
            </button>
            <button
              onClick={() => setCurrentSlideType("randompicker")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                currentSlideType === "randompicker" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Lucky Student Picker
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Tools Floating Bar (Timer & Controls) */}
      <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center space-x-1.5">
            <Timer className="w-4 h-4 text-amber-600" />
            <span>Activity Timer:</span>
          </span>
          <span className="font-mono text-base font-bold text-amber-800 px-2.5 py-0.5 bg-amber-50 rounded-lg border border-amber-200">
            {Math.floor(timerSeconds / 60)}:{timerSeconds % 60 < 10 ? "0" : ""}{timerSeconds % 60}
          </span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            {isTimerRunning ? <Pause className="w-4 h-4 text-rose-600" /> : <Play className="w-4 h-4 text-emerald-600" />}
          </button>
          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(60);
            }}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="hidden sm:flex space-x-1">
            {[30, 60, 120, 300].map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setTimerSeconds(sec);
                  setIsTimerRunning(false);
                }}
                className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                {sec < 60 ? `${sec}s` : `${sec / 60}m`}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium hidden md:block">
          Shortcuts: Space = Pronounce | Arrow Keys = Prev / Next
        </div>
      </div>

      {/* 1. FLASHCARDS PRESENTATION MODE */}
      {currentSlideType === "flashcards" && currentVocab && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center flex flex-col items-center justify-center min-h-[460px] space-y-6 relative overflow-hidden">
          {/* Card counter badge */}
          <div className="absolute top-6 left-6 flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs">
              Unit {currentUnit.unitNumber}: {vocabIndex + 1} / {currentUnit.targetVocabulary.length}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              LGS Frequency: <strong className="text-indigo-600">{currentVocab.lgsFrequency}</strong>
            </span>
          </div>

          <div className="space-y-3 pt-6">
            <div className="flex items-center justify-center space-x-3">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                {currentVocab.word}
              </h3>
              <button
                onClick={() => speakWord(currentVocab.word)}
                title="Listen to Word"
                className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
            <p className="text-slate-500 text-sm font-medium italic">
              ({currentVocab.partOfSpeech})
            </p>
          </div>

          {/* Meaning / Definition Reveal Card */}
          <div className="w-full max-w-2xl">
            {showMeaning ? (
              <div
                onClick={() => setShowMeaning(false)}
                className="cursor-pointer bg-indigo-50/70 border border-indigo-200 p-6 rounded-xl shadow-xs space-y-3 animate-fadeIn"
              >
                <div className="text-2xl sm:text-3xl font-black text-indigo-900">
                  {currentVocab.turkishMeaning}
                </div>
                <p className="text-sm text-slate-700">{currentVocab.definition}</p>
                <div className="text-xs text-indigo-700 italic pt-2 border-t border-indigo-100 font-medium">
                  "{currentVocab.exampleSentence}"
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowMeaning(true)}
                className="w-full bg-slate-50 hover:bg-indigo-50/40 border-2 border-dashed border-slate-300 hover:border-indigo-300 p-8 rounded-xl text-slate-600 font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 transition group"
              >
                <Eye className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition" />
                <span>Click to Reveal Meaning & English Definition</span>
              </button>
            )}
          </div>

          {/* Next / Prev Navigation */}
          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={handlePrevVocab}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Word</span>
            </button>
            <button
              onClick={() => setShowMeaning(!showMeaning)}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200"
            >
              {showMeaning ? "Hide Meaning" : "Reveal Meaning"}
            </button>
            <button
              onClick={handleNextVocab}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition"
            >
              <span>Next Word</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. CLASSROOM QUICK QUIZ PROJECTION */}
      {currentSlideType === "quickquiz" && currentQuiz && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
                Question {quizQuestionIndex + 1} / {currentUnit.sampleQuestions.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">[{currentQuiz.type}]</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setQuizQuestionIndex((prev) => (prev - 1 + currentUnit.sampleQuestions.length) % currentUnit.sampleQuestions.length);
                  setQuizRevealed(false);
                  setQuizSelectedOption(null);
                }}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setQuizQuestionIndex((prev) => (prev + 1) % currentUnit.sampleQuestions.length);
                  setQuizRevealed(false);
                  setQuizSelectedOption(null);
                }}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Display */}
          {currentQuiz.contextBody && (
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-slate-800 text-sm sm:text-base leading-relaxed">
              {currentQuiz.contextTitle && (
                <div className="font-bold text-indigo-700 mb-2 uppercase text-xs">
                  {currentQuiz.contextTitle}
                </div>
              )}
              <div className="whitespace-pre-line font-sans">{currentQuiz.contextBody}</div>
            </div>
          )}

          {/* Question Stem */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQuiz.questionStem}
          </h3>

          {/* Options for Class Click */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {(["A", "B", "C", "D"] as const).map((opt) => {
              const isSelected = quizSelectedOption === opt;
              const isCorrect = currentQuiz.correctAnswer === opt;

              let style = "bg-slate-50 border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-200 text-slate-800";
              if (quizRevealed) {
                if (isCorrect) {
                  style = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-400 font-semibold";
                } else if (isSelected && !isCorrect) {
                  style = "bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-400 font-semibold";
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleQuizAnswer(opt)}
                  className={`flex items-start text-left p-4 rounded-xl border transition-all ${style}`}
                >
                  <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0 text-slate-700 shadow-2xs">
                    {opt}
                  </span>
                  <span className="font-medium pt-0.5 leading-snug">{currentQuiz.options[opt]}</span>
                </button>
              );
            })}
          </div>

          {/* Solution Banner */}
          {quizRevealed && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-1.5 animate-fadeIn text-xs sm:text-sm">
              <div className="font-bold text-emerald-800 flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Correct Answer: Option {currentQuiz.correctAnswer}</span>
              </div>
              <p className="text-emerald-900">
                <strong>Explanation:</strong> {currentQuiz.explanationTurkish}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. DIALOGUE ROLEPLAY ARENA */}
      {currentSlideType === "roleplay" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Unit {currentUnit.unitNumber} Interactive Dialogue & Roleplay Arena</h3>
            <p className="text-xs text-slate-500">Pick two students in the classroom to practice and perform the target dialogue exchanges below.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentUnit.keyPhrases.map((kp, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  {kp.category}
                </div>
                <div className="space-y-2">
                  {kp.phrases.map((phrase, pIdx) => (
                    <div
                      key={pIdx}
                      className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-800">{phrase.english}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{phrase.turkish}</div>
                      </div>
                      <button
                        onClick={() => speakWord(phrase.english)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. RANDOM STUDENT PICKER */}
      {currentSlideType === "randompicker" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm text-center space-y-6 flex flex-col items-center justify-center min-h-[420px]">
          <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Users className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800">Classroom Random Student Picker</h3>
            <p className="text-xs text-slate-500 mt-1">
              Select a random student to answer the question or roleplay on the board.
            </p>
          </div>

          <div className="w-full max-w-md bg-slate-50 border-2 border-indigo-200 p-8 rounded-2xl shadow-inner min-h-[120px] flex items-center justify-center">
            {pickedStudent ? (
              <div className="text-2xl sm:text-3xl font-black text-indigo-700 animate-pulse">
                {pickedStudent}
              </div>
            ) : (
              <span className="text-slate-400 font-medium text-sm">Click the button below to pick a student...</span>
            )}
          </div>

          <button
            onClick={handlePickRandomStudent}
            disabled={isPickingStudent}
            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs disabled:opacity-50 transition"
          >
            {isPickingStudent ? "Selecting Student..." : "🎯 Pick Next Student"}
          </button>
        </div>
      )}
    </div>
  );
};
