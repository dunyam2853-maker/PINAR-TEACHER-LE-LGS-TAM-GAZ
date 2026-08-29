import React, { useState } from "react";
import { LGS_UNITS } from "../data/lgsCurriculum";
import { LGSUnit, VocabularyItem, LGSQuestion } from "../types";
import {
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Search,
  Printer,
  Sparkles,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Filter
} from "lucide-react";
import { speakWord } from "../utils/speech";

export const UnitsHub: React.FC = () => {
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [activeSection, setActiveSection] = useState<"vocab" | "grammar" | "phrases" | "questions" | "tips">("vocab");
  const [vocabSearch, setVocabSearch] = useState<string>("");
  const [vocabFilter, setVocabFilter] = useState<"All" | "Crucial" | "High" | "Core">("All");
  const [revealedAnswers, setRevealedAnswers] = useState<{ [qId: string]: boolean }>({});
  const [userSelectedOption, setUserSelectedOption] = useState<{ [qId: string]: string }>({});

  const currentUnit = LGS_UNITS.find((u) => u.unitNumber === selectedUnitNumber) || LGS_UNITS[0];

  // Filter vocabulary
  const filteredVocabulary = currentUnit.targetVocabulary.filter((v) => {
    const matchesSearch =
      v.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      v.turkishMeaning.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      v.definition.toLowerCase().includes(vocabSearch.toLowerCase());
    const matchesFilter = vocabFilter === "All" || v.lgsFrequency === vocabFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleAnswerReveal = (qId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSelectOption = (qId: string, opt: string) => {
    setUserSelectedOption((prev) => ({ ...prev, [qId]: opt }));
  };

  const handlePrintUnit = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Unit Selector Bar (1 to 10) */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>MEB 8th Grade LGS English Curriculum - 10 Units Hub</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a unit to access target vocabulary, grammar formulas, key dialogue patterns, and sample LGS questions.
            </p>
          </div>
          <button
            onClick={handlePrintUnit}
            className="flex items-center justify-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Unit Study Sheet</span>
          </button>
        </div>

        {/* 10 Unit Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {LGS_UNITS.map((unit) => {
            const isSelected = unit.unitNumber === selectedUnitNumber;
            return (
              <button
                key={unit.id}
                onClick={() => {
                  setSelectedUnitNumber(unit.unitNumber);
                  setVocabSearch("");
                }}
                className={`flex flex-col items-center text-center p-2.5 rounded-lg border transition-all duration-150 ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50/60 hover:border-indigo-200"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mb-1 ${
                    isSelected ? "bg-white text-indigo-600" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {unit.unitNumber}
                </span>
                <span className="text-xs font-bold truncate max-w-full">{unit.title}</span>
                <span className={`text-[10px] truncate max-w-full ${isSelected ? "text-indigo-100" : "text-slate-500"}`}>
                  Unit {unit.unitNumber}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Unit Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-600 text-white uppercase tracking-wider">
                Unit {currentUnit.unitNumber}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">{currentUnit.title}</h3>
            </div>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">{currentUnit.themeOverview}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {currentUnit.learningOutcomes.map((outcome, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {outcome.split(".")[0]}: {outcome.substring(outcome.indexOf(".") + 1).slice(0, 55)}...
                </span>
              ))}
            </div>
          </div>

          {/* Quick stats badge */}
          <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <div className="text-center px-2">
              <div className="text-lg font-black text-indigo-600">{currentUnit.targetVocabulary.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Target Words</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-lg font-black text-cyan-600">{currentUnit.grammarStructures.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Grammar Rules</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-lg font-black text-emerald-600">{currentUnit.sampleQuestions.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-500">LGS Question Types</div>
            </div>
          </div>
        </div>

        {/* Section Tabs inside Unit */}
        <div className="no-print flex space-x-2 mt-5 border-t border-slate-200 pt-4 overflow-x-auto">
          {[
            { id: "vocab", label: "Target Vocabulary", count: currentUnit.targetVocabulary.length, icon: BookOpen },
            { id: "grammar", label: "Grammar & Formulas", count: currentUnit.grammarStructures.length, icon: Sparkles },
            { id: "phrases", label: "Dialogue Key Phrases", count: currentUnit.keyPhrases.length, icon: MessageSquare },
            { id: "questions", label: "Sample LGS Questions", count: currentUnit.sampleQuestions.length, icon: HelpCircle },
            { id: "tips", label: "LGS Tactics & Speaking", icon: Lightbulb }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-indigo-700 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: TARGET VOCABULARY */}
      {activeSection === "vocab" && (
        <div className="space-y-4">
          {/* Search and Frequency filter */}
          <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search vocabulary, meaning, or definition..."
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
              <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5" />
                <span>LGS Frequency:</span>
              </span>
              {(["All", "Crucial", "High", "Core"] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setVocabFilter(freq)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                    vocabFilter === freq
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                  }`}
                >
                  {freq === "All" ? "All" : freq === "Crucial" ? "Crucial" : freq === "High" ? "High" : "Core"}
                </button>
              ))}
            </div>
          </div>

          {/* Vocabulary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredVocabulary.map((vocab) => {
              const frequencyColors = {
                Crucial: "bg-rose-50 text-rose-700 border-rose-200",
                High: "bg-amber-50 text-amber-700 border-amber-200",
                Core: "bg-emerald-50 text-emerald-700 border-emerald-200"
              };

              return (
                <div
                  key={vocab.id}
                  className="bg-white border border-slate-200 hover:border-indigo-300 p-4 rounded-xl shadow-xs transition group relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                          {vocab.word}
                        </h4>
                        <button
                          onClick={() => speakWord(vocab.word)}
                          title="Listen to Pronunciation"
                          className="p-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] text-slate-400 italic">({vocab.partOfSpeech})</span>
                      </div>
                      <div className="text-sm font-semibold text-indigo-600 mt-0.5">
                        {vocab.turkishMeaning}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        frequencyColors[vocab.lgsFrequency]
                      }`}
                    >
                      LGS: {vocab.lgsFrequency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <strong className="text-slate-500">Definition:</strong> {vocab.definition}
                  </p>

                  <div className="text-xs text-slate-700 mt-2 italic flex items-start space-x-1.5">
                    <span className="text-indigo-600 font-bold not-italic">Example:</span>
                    <span>"{vocab.exampleSentence}"</span>
                  </div>

                  {(vocab.synonyms || vocab.antonyms) && (
                    <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px]">
                      {vocab.synonyms && vocab.synonyms.length > 0 && (
                        <div className="text-emerald-700 font-medium">
                          <strong>Synonyms:</strong> {vocab.synonyms.join(", ")}
                        </div>
                      )}
                      {vocab.antonyms && vocab.antonyms.length > 0 && (
                        <div className="text-rose-700 font-medium">
                          <strong>Antonyms:</strong> {vocab.antonyms.join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: GRAMMAR & FORMULAS */}
      {activeSection === "grammar" && (
        <div className="space-y-4">
          {currentUnit.grammarStructures.map((grammar) => (
            <div
              key={grammar.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-800 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>{grammar.title}</span>
                  </h4>
                  <p className="text-xs text-slate-500">{grammar.turkishTitle}</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">{grammar.explanation}</p>

              {/* Formula Box */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-xs sm:text-sm font-mono font-bold text-indigo-950">
                <span className="text-indigo-600 select-none mr-2 font-black">FORMULA:</span>
                {grammar.formula}
              </div>

              {/* Examples */}
              <div className="space-y-1.5 pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Example Sentences:</h5>
                {grammar.examples.map((ex, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                    <div className="font-semibold text-slate-800 flex items-center justify-between">
                      <span>{ex.english}</span>
                      <button
                        onClick={() => speakWord(ex.english)}
                        className="text-slate-500 hover:text-indigo-600 transition p-0.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-indigo-700 font-medium mt-0.5">{ex.turkish}</div>
                  </div>
                ))}
              </div>

              {/* LGS Trap Alert */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start space-x-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-800 font-bold block">LGS Trap & Distractor Alert:</strong>
                  {grammar.lgsTrapTip}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: DIALOGUE KEY PHRASES */}
      {activeSection === "phrases" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUnit.keyPhrases.map((phraseGroup, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3"
            >
              <h4 className="text-xs sm:text-sm font-bold text-indigo-700 uppercase tracking-wide flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>{phraseGroup.category}</span>
              </h4>

              <div className="space-y-2">
                {phraseGroup.phrases.map((item, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">{item.english}</span>
                      <button
                        onClick={() => speakWord(item.english)}
                        className="text-slate-500 hover:text-indigo-600 p-1 rounded-md hover:bg-slate-100"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">{item.turkish}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 4: SAMPLE LGS QUESTIONS */}
      {activeSection === "questions" && (
        <div className="space-y-5">
          {currentUnit.sampleQuestions.map((q, qIndex) => {
            const isRevealed = revealedAnswers[q.id];
            const userChoice = userSelectedOption[q.id];

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-600 text-white">
                      Question #{qIndex + 1}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">[{q.type}]</span>
                    {q.kazanim && (
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {q.kazanim}
                      </span>
                    )}
                  </div>
                </div>

                {/* Context Box (Invitation / Dialogue / Chart / Passage) */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs sm:text-sm text-slate-800">
                  {q.contextTitle && (
                    <div className="font-bold text-indigo-700 mb-2 uppercase tracking-wide">
                      {q.contextTitle}
                    </div>
                  )}
                  <div className="whitespace-pre-line leading-relaxed font-sans">{q.contextBody}</div>
                </div>

                {/* Question Stem */}
                <div className="font-bold text-sm sm:text-base text-slate-900 pl-1">
                  {q.questionStem}
                </div>

                {/* Options A, B, C, D */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(["A", "B", "C", "D"] as const).map((letter) => {
                    const isSelected = userChoice === letter;
                    const isCorrect = q.correctAnswer === letter;

                    let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50/50 hover:border-indigo-200";
                    if (isSelected) {
                      btnStyle = isCorrect
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-400 font-medium"
                        : "bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-400 font-medium";
                    } else if (isRevealed && isCorrect) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-medium";
                    }

                    return (
                      <button
                        key={letter}
                        onClick={() => handleSelectOption(q.id, letter)}
                        className={`flex items-start text-left p-3 rounded-lg border text-xs sm:text-sm transition-all ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold text-xs mr-2.5 flex-shrink-0 text-slate-700 shadow-2xs">
                          {letter}
                        </span>
                        <span className="leading-snug">{q.options[letter]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Reveal & Explain Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-slate-500">Target Vocabulary:</span>
                    {q.keyVocabulary.map((kw, kwIdx) => (
                      <span
                        key={kwIdx}
                        className="text-[11px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleAnswerReveal(q.id)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                  >
                    {isRevealed ? "Hide Solution" : "Show Correct Answer & Detailed Explanation"}
                  </button>
                </div>

                {/* Explanation Box */}
                {isRevealed && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-1.5 animate-fadeIn">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Correct Answer: Option {q.correctAnswer}</span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      <strong>Solution & Explanation:</strong> {q.explanationTurkish}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 5: LGS STRATEGY TIPS & SPEAKING */}
      {activeSection === "tips" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-wide flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Unit {currentUnit.unitNumber} LGS Exam Tactics & Distractor Guide</span>
            </h4>
            <ul className="space-y-2.5">
              {currentUnit.lgsStrategyTips.map((tip, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200"
                >
                  <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-cyan-700 uppercase tracking-wide flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-cyan-600" />
              <span>Speaking Exam & Warm-up Prompts</span>
            </h4>
            <div className="space-y-2.5">
              {currentUnit.speakingPrompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800"
                >
                  <div className="font-semibold text-slate-800 flex items-center justify-between">
                    <span>Task #{idx + 1}: {prompt}</span>
                    <button
                      onClick={() => speakWord(prompt)}
                      className="p-1 text-slate-500 hover:text-indigo-600"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
