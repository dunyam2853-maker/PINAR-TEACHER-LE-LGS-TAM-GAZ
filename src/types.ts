export interface VocabularyItem {
  id: string;
  word: string;
  partOfSpeech: string;
  turkishMeaning: string;
  definition: string;
  exampleSentence: string;
  synonyms?: string[];
  antonyms?: string[];
  lgsFrequency: "High" | "Crucial" | "Core";
}

export interface GrammarStructure {
  id: string;
  title: string;
  turkishTitle: string;
  explanation: string;
  formula: string;
  examples: { english: string; turkish: string }[];
  lgsTrapTip: string;
}

export interface KeyPhrase {
  category: string; // e.g. "Making an offer", "Refusing politely", "Giving a reason"
  phrases: { english: string; turkish: string }[];
}

export interface LGSQuestion {
  id: string;
  unitNumber: number;
  type: "Dialogue" | "Table/Graphic" | "Invitation/Card" | "Poster" | "Paragraph" | "Recipe/Steps";
  contextTitle?: string;
  contextBody: string;
  visualType?: "dialogue" | "table" | "card" | "poster" | "chart" | "text" | "pie";
  chartData?: { label: string; value: number }[];
  questionStem: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanationTurkish: string;
  keyVocabulary: string[];
  kazanim?: string;
}

export interface LGSUnit {
  unitNumber: number;
  id: string;
  title: string;
  turkishTitle: string;
  iconName: string;
  color: string;
  themeOverview: string;
  learningOutcomes: string[]; // MEB Kazanımları
  targetVocabulary: VocabularyItem[];
  grammarStructures: GrammarStructure[];
  keyPhrases: KeyPhrase[];
  lgsStrategyTips: string[];
  speakingPrompts: string[];
  sampleQuestions: LGSQuestion[];
}

export interface ExamPaper {
  id: string;
  title: string;
  unitNumber?: number | "all";
  createdAt: string;
  difficulty: string;
  durationMinutes: number;
  questions: LGSQuestion[];
  instructions: string;
}

export interface StudentMockResult {
  examId: string;
  examName: string;
  date: string;
  correct: number;
  incorrect: number;
  empty: number;
  netScore: number; // Correct - (Incorrect / 3) or Turkish LGS standard net
  unitPerformance: { [unitNumber: number]: { correct: number; incorrect: number } };
}

export interface Student {
  id: string;
  studentNumber: string;
  fullName: string;
  className: string;
  avatarUrl?: string;
  targetLgsNet: number;
  mockResults: StudentMockResult[];
  notes: string;
  weakUnits: number[];
}

export interface ClassGroup {
  id: string;
  name: string; // e.g. "8-A"
  grade: string;
  studentCount: number;
  averageNet: number;
  targetNet: number;
}

export interface LessonPlanData {
  id: string;
  unitNumber: number;
  unitTitle: string;
  topic: string;
  duration: string;
  classLevel: string;
  mebOutcomes: string[];
  targetVocabulary: string[];
  grammarFocus: string;
  stages: {
    engage: { time: string; activity: string; teacherRole: string };
    explore: { time: string; activity: string; teacherRole: string };
    explain: { time: string; activity: string; teacherRole: string };
    elaborate: { time: string; activity: string; teacherRole: string };
    evaluate: { time: string; activity: string; teacherRole: string };
  };
  smartBoardTips: string[];
  differentiation: {
    support: string;
    extension: string;
  };
  lgsExamTip: string;
}

export interface PrintableWorksheet {
  id: string;
  title: string;
  unitName: string;
  instructions: string;
  sectionA: {
    title: string;
    wordBank: string[];
    items: { number: number; sentence: string; answer: string }[];
  };
  sectionB: {
    title: string;
    dialogues: {
      id: string;
      speakerA: string;
      lineA: string;
      speakerB: string;
      options: string[];
      correctOption: string;
    }[];
  };
  sectionC: {
    title: string;
    readingPassage: string;
    questions: { q: string; a: string }[];
  };
  sectionD: {
    title: string;
    questionStem: string;
    options: { A: string; B: string; C: string; D: string };
    answer: string;
    explanation: string;
  };
  teacherAnswerKeySummary: string;
}

export interface AcademicWeekPlan {
  week: number;
  month: string;
  dateRange: string;
  unitNumber: number;
  unitName: string;
  kazanimCode: string;
  kazanimDescription: string;
  keyTopics: string;
  suggestedActivity: string;
  assessmentType: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface UserAuth {
  id: string;
  username: string;
  role: "teacher" | "student";
}

export interface PortalMessage {
  id: string;
  studentId: string;
  studentUsername: string;
  teacherUsername: string;
  senderRole: "student" | "teacher";
  message: string;
  replyToId?: string | null;
  readByTeacher: boolean;
  readByStudent: boolean;
  createdAt: string;
}

export interface PortalMaterial {
  id: string;
  title: string;
  type: "app" | "assignment" | "game" | "resource" | "tool" | "exam";
  unitNumber?: number | null;
  description: string;
  contentUrl?: string;
  iconName: string;
  badgeText?: string;
  actionType: "view" | "play" | "solve" | "download";
  targetLink?: string;
  dueDate?: string;
  createdBy: string;
  createdAt: string;
}

export interface PortalStudentActivity {
  id: string;
  studentId: string;
  studentUsername: string;
  materialId: string;
  materialTitle: string;
  actionType: "view" | "click" | "play" | "complete" | "download";
  details?: string;
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  materialId: string;
  materialTitle: string;
  studentId: string;
  studentUsername: string;
  studentNote: string;
  submittedAnswers?: Record<string, string>;
  attachedFileName?: string;
  status: "submitted" | "approved" | "graded" | "revision";
  grade?: number;
  maxGrade?: number;
  teacherFeedback?: string;
  gradedBy?: string;
  gradedAt?: string;
  submittedAt: string;
}

export interface CompetitionQuestion {
  id: string;
  question: string;
  visualContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimitSec: number;
}

export interface UnitCompetition {
  id: string;
  unitNumber: number;
  unitTitle: string;
  badgeEmoji: string;
  durationMinutes: number;
  questions: CompetitionQuestion[];
}

export interface CompetitionLeaderboardEntry {
  id: string;
  competitionId: string;
  unitNumber: number;
  studentUsername: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  completedAt: string;
}

export interface LgsPastQuestion {
  id: string;
  year: number;
  questionNumber: number;
  unitNumber: number;
  unitTitle: string;
  topic: string;
  questionPrompt: string;
  contextPassage?: string;
  visualGraphic?: {
    type: "invitation" | "survey" | "chart" | "recipe" | "chat" | "poster" | "rules";
    title?: string;
    items?: { label: string; value: string | number }[];
    content?: string;
  };
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
  }[];
  correctAnswer: "A" | "B" | "C" | "D";
  mebAnalysis: string;
  strategyTactic: string;
  distractorExplanation: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  difficulty: "Temel" | "Orta" | "LGS Ayarı (Seçici)";
}

export interface ActivityAnalytics {
  totalActivities: number;
  recentActivities: PortalStudentActivity[];
  studentStats: {
    studentId: string;
    username: string;
    totalClicks: number;
    lastActive: string;
    uniqueMaterialsCount: number;
  }[];
  materialStats: {
    materialId: string;
    title: string;
    totalInteractions: number;
    uniqueStudentCount: number;
  }[];
}

