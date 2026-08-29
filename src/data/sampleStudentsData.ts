import { ClassGroup, Student } from "../types";

export const SAMPLE_CLASSES: ClassGroup[] = [
  {
    id: "cls-8a",
    name: "8-A",
    grade: "8th Grade",
    studentCount: 24,
    averageNet: 8.75,
    targetNet: 9.5
  },
  {
    id: "cls-8b",
    name: "8-B",
    grade: "8th Grade",
    studentCount: 22,
    averageNet: 7.4,
    targetNet: 8.5
  },
  {
    id: "cls-8c",
    name: "8-C (Intensive)",
    grade: "8th Grade",
    studentCount: 20,
    averageNet: 9.1,
    targetNet: 10.0
  }
];

export const SAMPLE_STUDENTS: Student[] = [
  {
    id: "stu-1",
    studentNumber: "801",
    fullName: "Zeynep Yılmaz",
    className: "8-A",
    targetLgsNet: 10.0,
    notes: "Excellent reading comprehension and vocabulary. Occasionally makes quick misreads on 'DOES NOT' question stems.",
    weakUnits: [4],
    mockResults: [
      {
        examId: "mock-1",
        examName: "MEB LGS Deneme 1",
        date: "2026-01-15",
        correct: 9,
        incorrect: 1,
        empty: 0,
        netScore: 8.67,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 2: { correct: 1, incorrect: 0 }, 3: { correct: 1, incorrect: 0 }, 4: { correct: 0, incorrect: 1 } }
      },
      {
        examId: "mock-2",
        examName: "LGS Master Deneme 2",
        date: "2026-02-10",
        correct: 10,
        incorrect: 0,
        empty: 0,
        netScore: 10.0,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 2: { correct: 1, incorrect: 0 }, 3: { correct: 1, incorrect: 0 }, 4: { correct: 1, incorrect: 0 }, 5: { correct: 1, incorrect: 0 } }
      },
      {
        examId: "mock-3",
        examName: "Türkiye Geneli LGS 3",
        date: "2026-03-05",
        correct: 10,
        incorrect: 0,
        empty: 0,
        netScore: 10.0,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 4: { correct: 1, incorrect: 0 }, 6: { correct: 1, incorrect: 0 }, 7: { correct: 1, incorrect: 0 } }
      }
    ]
  },
  {
    id: "stu-2",
    studentNumber: "804",
    fullName: "Emre Demir",
    className: "8-A",
    targetLgsNet: 9.0,
    notes: "Solid on Unit 1 (Friendship) and Unit 3 (Kitchen), needs reinforcement on Unit 6 (Adventures - would rather/prefer) and Unit 8 (Chores).",
    weakUnits: [6, 8],
    mockResults: [
      {
        examId: "mock-1",
        examName: "MEB LGS Deneme 1",
        date: "2026-01-15",
        correct: 7,
        incorrect: 2,
        empty: 1,
        netScore: 6.33,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 2: { correct: 1, incorrect: 0 }, 3: { correct: 1, incorrect: 0 }, 6: { correct: 0, incorrect: 1 } }
      },
      {
        examId: "mock-2",
        examName: "LGS Master Deneme 2",
        date: "2026-02-10",
        correct: 8,
        incorrect: 2,
        empty: 0,
        netScore: 7.33,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 3: { correct: 1, incorrect: 0 }, 6: { correct: 0, incorrect: 1 }, 8: { correct: 0, incorrect: 1 } }
      },
      {
        examId: "mock-3",
        examName: "Türkiye Geneli LGS 3",
        date: "2026-03-05",
        correct: 9,
        incorrect: 1,
        empty: 0,
        netScore: 8.67,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 2: { correct: 1, incorrect: 0 }, 6: { correct: 1, incorrect: 0 }, 8: { correct: 0, incorrect: 1 } }
      }
    ]
  },
  {
    id: "stu-3",
    studentNumber: "812",
    fullName: "Defne Kaya",
    className: "8-A",
    targetLgsNet: 10.0,
    notes: "High potential. Consistently scores 9-10 nets. Loves vocabulary competitions.",
    weakUnits: [10],
    mockResults: [
      {
        examId: "mock-1",
        examName: "MEB LGS Deneme 1",
        date: "2026-01-15",
        correct: 9,
        incorrect: 1,
        empty: 0,
        netScore: 8.67,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 2: { correct: 1, incorrect: 0 } }
      },
      {
        examId: "mock-2",
        examName: "LGS Master Deneme 2",
        date: "2026-02-10",
        correct: 9,
        incorrect: 1,
        empty: 0,
        netScore: 8.67,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 5: { correct: 1, incorrect: 0 } }
      },
      {
        examId: "mock-3",
        examName: "Türkiye Geneli LGS 3",
        date: "2026-03-05",
        correct: 10,
        incorrect: 0,
        empty: 0,
        netScore: 10.0,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 3: { correct: 1, incorrect: 0 }, 7: { correct: 1, incorrect: 0 } }
      }
    ]
  },
  {
    id: "stu-4",
    studentNumber: "825",
    fullName: "Arda Öztürk",
    className: "8-B",
    targetLgsNet: 8.0,
    notes: "Improving rapidly. Making progress with daily 15-minute LGS word flashcards.",
    weakUnits: [3, 9],
    mockResults: [
      {
        examId: "mock-1",
        examName: "MEB LGS Deneme 1",
        date: "2026-01-15",
        correct: 6,
        incorrect: 3,
        empty: 1,
        netScore: 5.0,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 3: { correct: 0, incorrect: 1 } }
      },
      {
        examId: "mock-2",
        examName: "LGS Master Deneme 2",
        date: "2026-02-10",
        correct: 7,
        incorrect: 2,
        empty: 1,
        netScore: 6.33,
        unitPerformance: { 2: { correct: 1, incorrect: 0 }, 3: { correct: 0, incorrect: 1 } }
      },
      {
        examId: "mock-3",
        examName: "Türkiye Geneli LGS 3",
        date: "2026-03-05",
        correct: 8,
        incorrect: 2,
        empty: 0,
        netScore: 7.33,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 9: { correct: 0, incorrect: 1 } }
      }
    ]
  },
  {
    id: "stu-5",
    studentNumber: "833",
    fullName: "Elif Çelik",
    className: "8-B",
    targetLgsNet: 8.5,
    notes: "Strong in grammar, needs vocabulary drill on Unit 5 (Internet safety terms) and Unit 7 (Tourism types).",
    weakUnits: [5, 7],
    mockResults: [
      {
        examId: "mock-1",
        examName: "MEB LGS Deneme 1",
        date: "2026-01-15",
        correct: 7,
        incorrect: 2,
        empty: 1,
        netScore: 6.33,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 5: { correct: 0, incorrect: 1 } }
      },
      {
        examId: "mock-2",
        examName: "LGS Master Deneme 2",
        date: "2026-02-10",
        correct: 8,
        incorrect: 1,
        empty: 1,
        netScore: 7.67,
        unitPerformance: { 2: { correct: 1, incorrect: 0 }, 7: { correct: 0, incorrect: 1 } }
      },
      {
        examId: "mock-3",
        examName: "Türkiye Geneli LGS 3",
        date: "2026-03-05",
        correct: 8,
        incorrect: 1,
        empty: 1,
        netScore: 7.67,
        unitPerformance: { 3: { correct: 1, incorrect: 0 }, 5: { correct: 1, incorrect: 0 } }
      }
    ]
  },
  {
    id: "stu-6",
    studentNumber: "840",
    fullName: "Kerem Aksoy",
    className: "8-C (Intensive)",
    targetLgsNet: 10.0,
    notes: "Consistently top performer in school. Perfect 10 nets in last 4 consecutive mock exams.",
    weakUnits: [],
    mockResults: [
      {
        examId: "mock-1",
        examName: "MEB LGS Deneme 1",
        date: "2026-01-15",
        correct: 10,
        incorrect: 0,
        empty: 0,
        netScore: 10.0,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 2: { correct: 1, incorrect: 0 } }
      },
      {
        examId: "mock-2",
        examName: "LGS Master Deneme 2",
        date: "2026-02-10",
        correct: 10,
        incorrect: 0,
        empty: 0,
        netScore: 10.0,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 3: { correct: 1, incorrect: 0 } }
      },
      {
        examId: "mock-3",
        examName: "Türkiye Geneli LGS 3",
        date: "2026-03-05",
        correct: 10,
        incorrect: 0,
        empty: 0,
        netScore: 10.0,
        unitPerformance: { 1: { correct: 1, incorrect: 0 }, 7: { correct: 1, incorrect: 0 } }
      }
    ]
  }
];
