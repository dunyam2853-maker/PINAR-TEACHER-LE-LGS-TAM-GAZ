import React, { useState } from "react";
import { MEB_ANNUAL_PLAN } from "../data/annualPlanData";
import { LGS_UNITS } from "../data/lgsCurriculum";
import { LessonPlanData } from "../types";
import {
  Calendar,
  Sparkles,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  BookOpen,
  Layers,
  FileCheck,
  RefreshCw
} from "lucide-react";

export const LessonPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"annual" | "5e-generator">("annual");
  const [monthFilter, setMonthFilter] = useState<string>("All");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // 5E Generator State
  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [lessonTopic, setLessonTopic] = useState<string>("Accepting and Refusing Invitations with Excuses");
  const [duration, setDuration] = useState<string>("40 Minutes (1 Lesson Hour)");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<LessonPlanData | null>(null);

  // Filter Annual Plan
  const filteredAnnualPlan = MEB_ANNUAL_PLAN.filter((item) => {
    const matchesMonth = monthFilter === "All" || item.month === monthFilter;
    const matchesKeyword =
      item.unitName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.kazanimCode.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.keyTopics.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.kazanimDescription.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesMonth && matchesKeyword;
  });

  const months = ["All", "September", "October", "November", "December", "January", "February", "March", "April", "May"];

  const handleGenerate5EPlan = async () => {
    setIsGenerating(true);
    const unitObj = LGS_UNITS.find((u) => u.unitNumber === selectedUnit);

    try {
      const response = await fetch("/api/gemini/lesson-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitNumber: selectedUnit,
          unitTitle: unitObj?.title || "English",
          topic: lessonTopic,
          duration,
          classLevel: "8th Grade"
        })
      });

      if (!response.ok) throw new Error("Failed to generate plan");
      const data = await response.json();
      setGeneratedPlan({
        id: `lp-${Date.now()}`,
        unitNumber: selectedUnit,
        unitTitle: unitObj?.title || "",
        topic: lessonTopic,
        duration,
        classLevel: "8th Grade",
        mebOutcomes: data.mebOutcomes || unitObj?.learningOutcomes || [],
        targetVocabulary: data.targetVocabulary || ["back up", "count on", "honest"],
        grammarFocus: data.grammarFocus || "Would you like to...? / I'd love to, but...",
        stages: data.stages || {
          engage: { time: "5 mins", activity: "Warmup video and class discussion", teacherRole: "Guides questions" },
          explore: { time: "10 mins", activity: "Dialogue matching on smartboard", teacherRole: "Monitors pairs" },
          explain: { time: "10 mins", activity: "Grammar formula explanation", teacherRole: "Explicit instruction" },
          elaborate: { time: "10 mins", activity: "Pair roleplay creating invitation cards", teacherRole: "Facilitator" },
          evaluate: { time: "5 mins", activity: "Exit ticket 3-question mini quiz", teacherRole: "Assesses understanding" }
        },
        smartBoardTips: data.smartBoardTips || ["Use flashcard animations", "Run quick poll"],
        differentiation: data.differentiation || {
          support: "Provide word bank with Turkish translations.",
          extension: "Have advanced students write multi-turn refusal dialogues."
        },
        lgsExamTip: data.lgsExamTip || "Highlight the difference between 'accept' and 'refuse with excuse'."
      });
    } catch (err) {
      console.error(err);
      // Fallback pre-filled plan so teacher is never stuck
      setGeneratedPlan({
        id: `lp-fallback`,
        unitNumber: selectedUnit,
        unitTitle: unitObj?.title || "Friendship",
        topic: lessonTopic,
        duration,
        classLevel: "8th Grade",
        mebOutcomes: unitObj?.learningOutcomes || [
          "E8.1.S1. Students will be able to make offers, accept or refuse invitations and give reasons."
        ],
        targetVocabulary: ["count on", "back up", "honest", "refuse", "excuse"],
        grammarFocus: "Would you like to + V1...? / How about + V_ing...?",
        stages: {
          engage: {
            time: "7 Mins",
            activity: "Teacher projects an invitation card onto the Smartboard and asks: 'Who wants to come to my pizza party?'",
            teacherRole: "Elicits polite acceptance and refusal phrases from students."
          },
          explore: {
            time: "10 Mins",
            activity: "Students work in pairs with dialogue strips on the Smartboard, arranging accepting vs refusing lines.",
            teacherRole: "Circulates the classroom and provides pronunciation guidance."
          },
          explain: {
            time: "8 Mins",
            activity: "Teacher explicitly breaks down the formula 'Would you like to + V1' vs 'How about + V_ing'.",
            teacherRole: "Draws attention to LGS trap keywords: 'excuse', 'deadline', 'inviter/invitee'."
          },
          elaborate: {
            time: "10 Mins",
            activity: "Classroom Roleplay: Student A invites Student B to 3 different events; Student B must refuse at least one with a valid excuse.",
            teacherRole: "Monitors spoken accuracy and encourages natural intonation."
          },
          evaluate: {
            time: "5 Mins",
            activity: "Exit Ticket: Quick 2-question LGS style mini-quiz on Smartboard.",
            teacherRole: "Instant diagnostic evaluation of lesson outcomes."
          }
        },
        smartBoardTips: [
          "Use the built-in Vocabulary Flashcard mode in Smartboard view.",
          "Display the 60-second activity timer during pair work."
        ],
        differentiation: {
          support: "Provide a printed key phrase cheat sheet for students who struggle with spelling.",
          extension: "Ask fast finishers to construct a 4-line invitation email for a class reunion."
        },
        lgsExamTip: "Always remind students that in LGS, 'I'd love to' followed by 'BUT' indicates a refusal with an excuse."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Planner Header */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                MEB Academic Curriculum & Lesson Plan Center
              </h2>
              <p className="text-xs text-slate-500">
                36-Week Official MEB Annual Framework Plan & AI-Powered 5E Lesson Planner.
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-2">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveTab("annual")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  activeTab === "annual" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                36-Week Annual Plan
              </button>
              <button
                onClick={() => setActiveTab("5e-generator")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center space-x-1.5 ${
                  activeTab === "5e-generator" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI 5E Plan Generator</span>
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 transition"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: 36-WEEK ANNUAL PLAN (MEB YILLIK PLAN) */}
      {activeTab === "annual" && (
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className="no-print bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search learning outcome, unit or topic..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Month:</span>
              </span>
              {months.map((m) => (
                <button
                  key={m}
                  onClick={() => setMonthFilter(m)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                    monthFilter === m ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {m === "All" ? "All" : m}
                </button>
              ))}
            </div>
          </div>

          {/* Annual Plan Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs print:border-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <th className="py-3 px-3 font-bold w-16 text-center">Week</th>
                    <th className="py-3 px-3 font-bold w-28">Date & Month</th>
                    <th className="py-3 px-3 font-bold w-40">Unit</th>
                    <th className="py-3 px-3 font-bold w-32">Outcome Code</th>
                    <th className="py-3 px-4 font-bold">MEB Learning Outcome & Topic</th>
                    <th className="py-3 px-4 font-bold">Suggested Activity</th>
                    <th className="py-3 px-3 font-bold w-36">Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAnnualPlan.map((row) => (
                    <tr
                      key={row.week}
                      className="hover:bg-slate-50/70 transition"
                    >
                      <td className="py-3 px-3 text-center font-bold text-indigo-600">
                        #{row.week}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800">
                        <div>{row.month}</div>
                        <div className="text-[10px] text-slate-500">{row.dateRange}</div>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {row.unitName}
                      </td>
                      <td className="py-3 px-3 font-mono text-indigo-700 font-semibold">
                        {row.kazanimCode}
                      </td>
                      <td className="py-3 px-4 text-slate-800 space-y-0.5">
                        <div className="font-medium">{row.kazanimDescription}</div>
                        <div className="text-[11px] text-slate-500">{row.keyTopics}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {row.suggestedActivity}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {row.assessmentType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI 5E LESSON PLAN GENERATOR */}
      {activeTab === "5e-generator" && (
        <div className="space-y-6">
          {/* Input control */}
          <div className="no-print bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI-Powered 5E Lesson Plan Architect</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Unit:</label>
                <select
                  value={selectedUnit}
                  onChange={(e) => {
                    const uNum = Number(e.target.value);
                    setSelectedUnit(uNum);
                    const u = LGS_UNITS.find((item) => item.unitNumber === uNum);
                    if (u) setLessonTopic(u.themeOverview.slice(0, 50));
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-indigo-500"
                >
                  {LGS_UNITS.map((u) => (
                    <option key={u.unitNumber} value={u.unitNumber}>
                      Unit {u.unitNumber}: {u.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lesson Topic & Focus:</label>
                <input
                  type="text"
                  value={lessonTopic}
                  onChange={(e) => setLessonTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duration & Format:</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="40 Minutes (1 Lesson Hour)">40 Minutes (1 Lesson Hour)</option>
                  <option value="80 Minutes (Block Lesson)">80 Minutes (Block Lesson)</option>
                  <option value="Weekend LGS Workshop (120 Mins)">Weekend LGS Workshop (120 Mins)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate5EPlan}
              disabled={isGenerating}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xs disabled:opacity-50 transition"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating 5E Pedagogical Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Detailed 5E Lesson Plan</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Plan Display */}
          {generatedPlan && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 print:border-none print:p-0">
              {/* Header Box */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-xs font-bold bg-indigo-600 text-white px-2.5 py-0.5 rounded">
                      8th Grade MEB 5E Lesson Plan
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      Unit {generatedPlan.unitNumber}: {generatedPlan.unitTitle} - {generatedPlan.topic}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-500 font-semibold text-right">
                    <div>Duration: {generatedPlan.duration}</div>
                    <div>Level: 8th Grade LGS Preparation</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <strong className="text-indigo-700 block mb-1">Target Outcomes (MEB):</strong>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                      {generatedPlan.mebOutcomes.map((o, idx) => (
                        <li key={idx}>{o}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <strong className="text-cyan-700 block mb-1">Target Vocabulary:</strong>
                    <div className="flex flex-wrap gap-1">
                      {generatedPlan.targetVocabulary.map((v, idx) => (
                        <span key={idx} className="bg-white px-1.5 py-0.5 rounded text-[11px] font-semibold border border-slate-200 text-slate-800 shadow-2xs">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <strong className="text-emerald-700 block mb-1">Grammar & Structure Focus:</strong>
                    <div className="text-slate-800 font-mono text-[11px]">
                      {generatedPlan.grammarFocus}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5E Stages List */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  5E Model Instructional Phases (Lesson Sequence)
                </h4>

                {[
                  { stage: "1. ENGAGE (Hook & Introduction)", data: generatedPlan.stages.engage },
                  { stage: "2. EXPLORE (Hands-on & Pair Discovery)", data: generatedPlan.stages.explore },
                  { stage: "3. EXPLAIN (Direct Clarification & Form)", data: generatedPlan.stages.explain },
                  { stage: "4. ELABORATE (Practice & Production)", data: generatedPlan.stages.elaborate },
                  { stage: "5. EVALUATE (Exit Ticket & Assessment)", data: generatedPlan.stages.evaluate }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-800">{item.stage}</span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shadow-2xs">
                        {item.data.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Activity:</strong> {item.data.activity}
                    </p>
                    <p className="text-xs text-slate-500">
                      <strong>Teacher's Role:</strong> {item.data.teacherRole}
                    </p>
                  </div>
                ))}
              </div>

              {/* Differentiation & Exam Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                  <strong className="text-indigo-700 font-bold block">Differentiated Instruction:</strong>
                  <div className="text-slate-700"><strong>Support:</strong> {generatedPlan.differentiation.support}</div>
                  <div className="text-slate-700"><strong>Extension:</strong> {generatedPlan.differentiation.extension}</div>
                </div>

                <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs space-y-1">
                  <strong className="text-amber-800 font-bold block">LGS Strategy & Distractor Alert:</strong>
                  <p className="text-amber-900 font-medium">{generatedPlan.lgsExamTip}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
