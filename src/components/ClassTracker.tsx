import React, { useState } from "react";
import { SAMPLE_CLASSES, SAMPLE_STUDENTS } from "../data/sampleStudentsData";
import { LGS_UNITS } from "../data/lgsCurriculum";
import { Student, StudentMockResult } from "../types";
import {
  BarChart3,
  Users,
  TrendingUp,
  Award,
  AlertTriangle,
  Sparkles,
  Plus,
  Search,
  FileText,
  Printer,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  X
} from "lucide-react";

export const ClassTracker: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>("8-A");
  const [students, setStudents] = useState<Student[]>(SAMPLE_STUDENTS);
  const [searchStudent, setSearchStudent] = useState<string>("");
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<Student | null>(null);

  // AI Diagnostic report state
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [aiReport, setAiReport] = useState<any | null>(null);

  // New mock exam entry modal
  const [showAddMockModal, setShowAddMockModal] = useState<boolean>(false);
  const [mockTargetStudentId, setMockTargetStudentId] = useState<string>("");
  const [newMockName, setNewMockName] = useState<string>("LGS Genel Deneme 4");
  const [newMockCorrect, setNewMockCorrect] = useState<number>(9);
  const [newMockIncorrect, setNewMockIncorrect] = useState<number>(1);
  const [newMockEmpty, setNewMockEmpty] = useState<number>(0);

  const filteredStudents = students.filter((s) => {
    const matchesClass = s.className === selectedClass || selectedClass === "All";
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.studentNumber.includes(searchStudent);
    return matchesClass && matchesSearch;
  });

  const currentClassData = SAMPLE_CLASSES.find((c) => c.name === selectedClass) || {
    name: "All Classes",
    averageNet: 8.4,
    targetNet: 9.2,
    studentCount: students.length
  };

  const handleRunAiDiagnosis = async (student: Student) => {
    setIsDiagnosing(true);
    setAiReport(null);

    try {
      const response = await fetch("/api/gemini/student-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: student.fullName,
          className: student.className,
          mockResults: student.mockResults,
          weakUnits: student.weakUnits,
          targetNet: student.targetLgsNet
        })
      });

      if (!response.ok) throw new Error("Failed to diagnose");
      const data = await response.json();
      setAiReport(data);
    } catch (err) {
      console.error(err);
      // Fallback analysis
      setAiReport({
        studentSummary: `${student.fullName} demonstrates solid fundamentals across foundational units, with an average net score of ${(
          student.mockResults.reduce((acc, m) => acc + m.netScore, 0) / student.mockResults.length
        ).toFixed(1)} / 10.`,
        diagnosticBreakdown: "Occasional lapses occur in longer reading passages and phone conversation flow (Unit 4).",
        twoWeekActionPlan: [
          "Week 1: Focus on Unit 4 (On the Phone) phrases ('put through', 'hold on', 'bad line') with 10 daily flashcards.",
          "Week 2: Complete two 10-question LGS mock exams with strict 15-minute time limits."
        ],
        parentNoteTurkish: `Sayın Velimiz, Öğrencimiz ${student.fullName}, İngilizce dersi LGS denemelerinde istikrarlı bir başarı göstermektedir. Hedefimiz olan ${student.targetLgsNet} nete ulaşmak için telefon diyalogları ve soru köklerindeki 'DOES NOT' ifadelerine dikkat çekme çalışmalarına ağırlık verilmiştir.`
      });
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleSaveNewMockResult = () => {
    if (!mockTargetStudentId) return;

    const netScore = Math.max(0, Number((newMockCorrect - newMockIncorrect / 3).toFixed(2)));
    const newMock: StudentMockResult = {
      examId: `mock-${Date.now()}`,
      examName: newMockName,
      date: new Date().toISOString().split("T")[0],
      correct: Number(newMockCorrect),
      incorrect: Number(newMockIncorrect),
      empty: Number(newMockEmpty),
      netScore,
      unitPerformance: {}
    };

    setStudents((prev) =>
      prev.map((s) => (s.id === mockTargetStudentId ? { ...s, mockResults: [...s.mockResults, newMock] } : s))
    );

    if (selectedStudentForModal && selectedStudentForModal.id === mockTargetStudentId) {
      setSelectedStudentForModal((prev) => (prev ? { ...prev, mockResults: [...prev.mockResults, newMock] } : null));
    }

    setShowAddMockModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>8th Grade LGS Practice Exams & Student Analytics Center</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Track class net averages, pinpoint critical weak units, and generate automated AI student diagnostic reports.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setMockTargetStudentId(students[0]?.id || "");
                setShowAddMockModal(true);
              }}
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Mock Exam Result</span>
            </button>
          </div>
        </div>

        {/* Class Selector Bar */}
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center space-x-1">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Select Class:</span>
          </span>
          {["8-A", "8-B", "8-C (Intensive)", "All"].map((cName) => (
            <button
              key={cName}
              onClick={() => setSelectedClass(cName)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedClass === cName
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cName === "All" ? "All Classes" : cName}
            </button>
          ))}
        </div>
      </div>

      {/* Class Statistics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class Net Average</div>
          <div className="text-3xl font-black text-indigo-600">
            {currentClassData.averageNet} <span className="text-xs text-slate-400 font-semibold">/ 10 Net</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+0.8 increase vs Exam 1</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target LGS Net</div>
          <div className="text-3xl font-black text-cyan-600">
            {currentClassData.targetNet} <span className="text-xs text-slate-400 font-semibold">/ 10 Net</span>
          </div>
          <div className="text-[11px] text-slate-500">Remaining to Target: -{((currentClassData.targetNet || 9) - (currentClassData.averageNet || 8)).toFixed(1)} net</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enrolled Students</div>
          <div className="text-3xl font-black text-slate-800">{filteredStudents.length}</div>
          <div className="text-[11px] text-slate-500">Active 8th Grade Students</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Most Challenging Unit</div>
          <div className="text-base font-bold text-amber-700">Unit 4: On the Phone</div>
          <div className="text-[11px] text-amber-800 font-medium">Class Accuracy Rate: 72%</div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search student name or school number..."
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Showing {filteredStudents.length} students
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <th className="py-3 px-4 font-bold w-16">No</th>
                <th className="py-3 px-4 font-bold">Student Name</th>
                <th className="py-3 px-4 font-bold">Class</th>
                <th className="py-3 px-4 font-bold">Latest Mock Net</th>
                <th className="py-3 px-4 font-bold">Target</th>
                <th className="py-3 px-4 font-bold">Weak Units</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => {
                const latestMock = s.mockResults[s.mockResults.length - 1];

                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{s.studentNumber}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{s.fullName}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{s.notes}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-indigo-700">{s.className}</td>
                    <td className="py-3.5 px-4">
                      {latestMock ? (
                        <div className="flex items-center space-x-1.5">
                          <span
                            className={`font-black text-sm ${
                              latestMock.netScore >= 9
                                ? "text-emerald-600"
                                : latestMock.netScore >= 7
                                ? "text-amber-600"
                                : "text-rose-600"
                            }`}
                          >
                            {latestMock.netScore} Net
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({latestMock.correct}C {latestMock.incorrect}W)
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400">No data</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-cyan-700">{s.targetLgsNet} Net</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {s.weakUnits.length > 0 ? (
                          s.weakUnits.map((uNum) => (
                            <span
                              key={uNum}
                              className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200"
                            >
                              Unit {uNum}
                            </span>
                          ))
                        ) : (
                          <span className="text-emerald-700 font-bold text-[11px] flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Full Mastery</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedStudentForModal(s);
                          handleRunAiDiagnosis(s);
                        }}
                        className="inline-flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Analysis & Plan</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* STUDENT AI DIAGNOSTIC & PARENT REPORT MODAL */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl p-6 shadow-xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-600">AI Student Coach & Analytics</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedStudentForModal.fullName} ({selectedStudentForModal.className})
                </h3>
              </div>
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mock Exams History */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Mock Exam History (Recent Exams)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedStudentForModal.mockResults.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    <div className="font-bold text-slate-800 truncate">{m.examName}</div>
                    <div className="text-slate-400 text-[10px]">{m.date}</div>
                    <div className="text-base font-black text-indigo-700 mt-1">
                      {m.netScore} Net <span className="text-xs text-slate-500 font-normal">({m.correct}C / {m.incorrect}W)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Diagnosis Output */}
            {isDiagnosing ? (
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                <div className="text-sm font-bold text-slate-800">Analyzing Student Performance with Gemini AI...</div>
                <p className="text-xs text-slate-500">Evaluating error patterns, weak units, and building a personalized 2-week roadmap.</p>
              </div>
            ) : aiReport ? (
              <div className="space-y-4">
                {/* Summary */}
                <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-xs sm:text-sm text-indigo-950">
                  <strong className="text-indigo-900 block mb-1 font-bold">Academic Performance Summary:</strong>
                  {aiReport.studentSummary}
                </div>

                {/* 2-Week Plan */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
                  <strong className="text-indigo-700 font-bold block text-sm">2-Week Personalized LGS Action Plan:</strong>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                    {Array.isArray(aiReport.twoWeekActionPlan) ? (
                      aiReport.twoWeekActionPlan.map((step: string, idx: number) => (
                        <li key={idx}>{step}</li>
                      ))
                    ) : (
                      <li>{aiReport.twoWeekActionPlan}</li>
                    )}
                  </ul>
                </div>

                {/* Parent Message */}
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-emerald-900 font-bold block text-sm">
                      Parent Progress Note:
                    </strong>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiReport.parentNoteTurkish);
                        alert("Parent progress note copied to clipboard!");
                      }}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shadow-2xs"
                    >
                      Copy Note
                    </button>
                  </div>
                  <p className="text-emerald-950 leading-relaxed font-sans bg-white p-3 rounded-lg border border-emerald-200 shadow-2xs">
                    {aiReport.parentNoteTurkish}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* RECORD NEW MOCK EXAM MODAL */}
      {showAddMockModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-800">Add New LGS Mock Result</h3>
              <button onClick={() => setShowAddMockModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Student:</label>
                <select
                  value={mockTargetStudentId}
                  onChange={(e) => setMockTargetStudentId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.className} - No: {s.studentNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mock Exam Name / Source:</label>
                <input
                  type="text"
                  value={newMockName}
                  onChange={(e) => setNewMockName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-emerald-700 mb-1">Correct (C):</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={newMockCorrect}
                    onChange={(e) => setNewMockCorrect(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-rose-700 mb-1">Incorrect (W):</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={newMockIncorrect}
                    onChange={(e) => setNewMockIncorrect(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Empty (E):</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={newMockEmpty}
                    onChange={(e) => setNewMockEmpty(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 font-medium">Calculated LGS Net: </span>
                <strong className="text-emerald-700 text-sm font-black">
                  {Math.max(0, Number((newMockCorrect - newMockIncorrect / 3).toFixed(2)))} Net
                </strong>
              </div>
            </div>

            <button
              onClick={handleSaveNewMockResult}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition"
            >
              Save Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
