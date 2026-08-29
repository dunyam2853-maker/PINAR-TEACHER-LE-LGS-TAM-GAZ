import React, { useState } from "react";
import { WORD_DUEL_ITEMS, TRAP_HUNTER_QUESTIONS, WordDuelItem, TrapHunterQuestion } from "../data/interactiveGamesData";
import {
  Gamepad2,
  Trophy,
  Flame,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertTriangle,
  Zap,
  Award
} from "lucide-react";
import { speakWord } from "../utils/speech";
import confetti from "canvas-confetti";

export const GameStation: React.FC = () => {
  const [activeGame, setActiveGame] = useState<"duel" | "traphunter">("duel");

  // Word Duel State
  const [duelIndex, setDuelIndex] = useState<number>(0);
  const [duelScore, setDuelScore] = useState<number>(0);
  const [duelStreak, setDuelStreak] = useState<number>(0);
  const [duelSelectedOption, setDuelSelectedOption] = useState<string | null>(null);
  const [duelAnswerState, setDuelAnswerState] = useState<"correct" | "incorrect" | null>(null);
  const [isDuelFinished, setIsDuelFinished] = useState<boolean>(false);

  // Trap Hunter State
  const [trapIndex, setTrapIndex] = useState<number>(0);
  const [trapSelectedLetter, setTrapSelectedLetter] = useState<string | null>(null);
  const [trapShowAnalysis, setTrapShowAnalysis] = useState<boolean>(false);

  const currentDuelItem: WordDuelItem = WORD_DUEL_ITEMS[duelIndex] || WORD_DUEL_ITEMS[0];
  const currentTrapItem: TrapHunterQuestion = TRAP_HUNTER_QUESTIONS[trapIndex] || TRAP_HUNTER_QUESTIONS[0];

  const handleDuelAnswer = (option: string) => {
    if (duelSelectedOption !== null) return; // Prevent double clicking

    setDuelSelectedOption(option);
    const isCorrect = option === currentDuelItem.correctMeaning;

    if (isCorrect) {
      setDuelAnswerState("correct");
      const bonus = duelStreak * 50;
      setDuelScore((prev) => prev + 100 + bonus);
      setDuelStreak((prev) => prev + 1);
      speakWord(currentDuelItem.word);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } else {
      setDuelAnswerState("incorrect");
      setDuelStreak(0);
    }

    setTimeout(() => {
      if (duelIndex + 1 < WORD_DUEL_ITEMS.length) {
        setDuelIndex((prev) => prev + 1);
        setDuelSelectedOption(null);
        setDuelAnswerState(null);
      } else {
        setIsDuelFinished(true);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      }
    }, 1400);
  };

  const handleRestartDuel = () => {
    setDuelIndex(0);
    setDuelScore(0);
    setDuelStreak(0);
    setDuelSelectedOption(null);
    setDuelAnswerState(null);
    setIsDuelFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-black shadow-xs">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Interactive LGS Activity & Game Station
            </h2>
            <p className="text-xs text-slate-500">
              Classroom vocabulary duels, distractor hunter exercises, and gamified LGS preparation.
            </p>
          </div>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveGame("duel")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              activeGame === "duel" ? "bg-white text-indigo-700 shadow-xs font-black" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>LGS Speed Vocab Duel</span>
          </button>
          <button
            onClick={() => setActiveGame("traphunter")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              activeGame === "traphunter" ? "bg-white text-indigo-700 shadow-xs font-black" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Trap Hunter (Distractor Lab)</span>
          </button>
        </div>
      </div>

      {/* GAME 1: LGS SPEED VOCAB DUEL */}
      {activeGame === "duel" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {!isDuelFinished ? (
            <>
              {/* Score & Streak HUD */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5 text-amber-600 font-black text-lg">
                    <Trophy className="w-5 h-5" />
                    <span>Score: {duelScore}</span>
                  </div>
                  {duelStreak > 1 && (
                    <div className="flex items-center space-x-1 text-orange-700 font-bold text-xs bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200 animate-bounce">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <span>{duelStreak}x Streak Bonus!</span>
                    </div>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-500">
                  Question <strong className="text-slate-900">{duelIndex + 1}</strong> / {WORD_DUEL_ITEMS.length}
                </div>
              </div>

              {/* Central Word Display */}
              <div className="text-center space-y-3 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Unit {currentDuelItem.unit} Target Vocabulary
                </span>

                <div className="flex items-center justify-center space-x-3 pt-2">
                  <h3 className="text-4xl sm:text-5xl font-black text-slate-900">{currentDuelItem.word}</h3>
                  <button
                    onClick={() => speakWord(currentDuelItem.word)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition"
                    title="Audio Pronunciation"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs font-mono text-slate-500">{currentDuelItem.pronunciationHint}</div>
                <div className="text-xs italic text-slate-600 max-w-md mx-auto">
                  "{currentDuelItem.example}"
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {currentDuelItem.options.map((opt, idx) => {
                  const isSelected = duelSelectedOption === opt;
                  const isCorrectOpt = opt === currentDuelItem.correctMeaning;

                  let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs";
                  if (duelSelectedOption !== null) {
                    if (isCorrectOpt) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400";
                    } else if (isSelected && !isCorrectOpt) {
                      btnStyle = "bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleDuelAnswer(opt)}
                      disabled={duelSelectedOption !== null}
                      className={`p-4 rounded-xl border text-sm sm:text-base font-bold transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {duelSelectedOption !== null && isCorrectOpt && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 ml-2" />
                      )}
                      {duelSelectedOption !== null && isSelected && !isCorrectOpt && (
                        <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Duel Result Screen */
            <div className="text-center space-y-5 py-8 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-600 mx-auto shadow-xs">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Duel Completed!</h3>
                <p className="text-xs sm:text-sm text-slate-500">Congratulations! You successfully finished the LGS speed vocabulary practice.</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs uppercase font-bold text-slate-500">Total Score Earned</div>
                <div className="text-4xl font-black text-amber-600">{duelScore} PTS</div>
              </div>

              <button
                onClick={handleRestartDuel}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-sm shadow-xs transition flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: TRAP HUNTER */}
      {activeGame === "traphunter" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">
                LGS Question Distractor Diagnostic Lab
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">Identify Sneaky Traps in This Question</h3>
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              Question <strong>{trapIndex + 1}</strong> / {TRAP_HUNTER_QUESTIONS.length}
            </div>
          </div>

          {/* Context box */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
            {currentTrapItem.questionContext}
          </div>

          <div className="font-bold text-sm sm:text-base text-slate-900">
            {currentTrapItem.questionStem}
          </div>

          {/* Options with Trap Diagnostic Analysis */}
          <div className="space-y-3">
            {currentTrapItem.options.map((opt) => {
              const isSelected = trapSelectedLetter === opt.letter;

              return (
                <div
                  key={opt.letter}
                  onClick={() => {
                    setTrapSelectedLetter(opt.letter);
                    setTrapShowAnalysis(true);
                  }}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    opt.isCorrect && trapShowAnalysis
                      ? "bg-emerald-50 border-emerald-500 shadow-2xs"
                      : isSelected
                      ? "bg-indigo-50/70 border-indigo-400 ring-1 ring-indigo-400"
                      : "bg-white border-slate-200 hover:bg-slate-50 shadow-2xs"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                        {opt.letter}
                      </span>
                      <span className="font-semibold text-xs sm:text-sm text-slate-800">
                        {opt.text}
                      </span>
                    </div>

                    {trapShowAnalysis && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          opt.isCorrect
                            ? "bg-emerald-600 text-white"
                            : "bg-rose-100 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {opt.isCorrect ? "Correct Answer" : "Distractor Trap"}
                      </span>
                    )}
                  </div>

                  {trapShowAnalysis && (
                    <div
                      className={`mt-2.5 pt-2 border-t text-xs ${
                        opt.isCorrect
                          ? "border-emerald-200 text-emerald-800"
                          : "border-slate-200 text-rose-700"
                      }`}
                    >
                      {opt.trapReason}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-200">
            <button
              onClick={() => setTrapShowAnalysis(!trapShowAnalysis)}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
            >
              {trapShowAnalysis ? "Hide Trap Explanations" : "Show All Trap Explanations"}
            </button>

            <button
              onClick={() => {
                setTrapIndex((prev) => (prev + 1) % TRAP_HUNTER_QUESTIONS.length);
                setTrapSelectedLetter(null);
                setTrapShowAnalysis(false);
              }}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
            >
              Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
