import { TestResult } from "@/context/AppContext";

export const DUMMY_USER = {
  name: "Alex",
  avatar: "A",
  level: "A2",
  streak: 7,
  totalTests: 23,
  avgScore: 74,
  overallProgress: 42,
  xp: 1840,
};

export const SKILL_DATA = [
  { skill: "Grammar", score: 68, fill: "#3b82f6" },
  { skill: "Vocabulary", score: 82, fill: "#8b5cf6" },
  { skill: "Listening", score: 55, fill: "#f59e0b" },
  { skill: "Reading", score: 77, fill: "#22c55e" },
  { skill: "Writing", score: 48, fill: "#ef4444" },
  { skill: "Speaking", score: 61, fill: "#06b6d4" },
];

export const RECENT_TESTS = [
  { id: 1, level: "A1", section: "Reading", score: 85, total: 100, date: "2026-10-05", passed: true },
  { id: 2, level: "A2", section: "Listening", score: 60, total: 100, date: "2026-10-04", passed: false },
  { id: 3, level: "A1", section: "Writing", score: 72, total: 100, date: "2026-10-02", passed: true },
  { id: 4, level: "B1", section: "Reading", score: 45, total: 100, date: "2026-09-29", passed: false },
];

export const READING_PASSAGE = {
  title: "Ein Tag in Berlin",
  text: `Berlin ist die Hauptstadt von Deutschland. Die Stadt hat viele schöne Parks und Museen. Jeden Morgen gehe ich in den Park und trinke dort Kaffee. 

Das Brandenburger Tor ist sehr bekannt. Touristen aus aller Welt kommen nach Berlin, um es zu sehen. Neben dem Tor gibt es viele Restaurants und Cafés.

Ich wohne seit drei Jahren in Berlin. Die Stadt ist sehr groß, aber ich kenne sie jetzt gut. Mit der U-Bahn kann man schnell von einem Ort zum anderen fahren. Die öffentlichen Verkehrsmittel sind sehr gut in Berlin.

Am Wochenende gehe ich oft in ein Museum oder in ein Kino. Berlin hat über 170 Museen! Mein Lieblingsmuseum ist das Pergamonmuseum. Dort gibt es alte Kunstwerke aus vielen Ländern.`,
  level: "A1",
};

export const READING_QUESTIONS = [
  {
    id: 1,
    type: "mcq" as const,
    question: "Was ist Berlin?",
    options: ["Eine kleine Stadt", "Die Hauptstadt von Deutschland", "Eine Stadt in Österreich", "Ein Dorf"],
    correct: "Die Hauptstadt von Deutschland",
  },
  {
    id: 2,
    type: "tf" as const,
    question: "Das Brandenburger Tor ist bei Touristen sehr unbeliebt.",
    correct: "false",
  },
  {
    id: 3,
    type: "mcq" as const,
    question: "Wie lange wohnt die Person schon in Berlin?",
    options: ["Ein Jahr", "Zwei Jahre", "Drei Jahre", "Fünf Jahre"],
    correct: "Drei Jahre",
  },
  {
    id: 4,
    type: "tf" as const,
    question: "Berlin hat mehr als 100 Museen.",
    correct: "true",
  },
  {
    id: 5,
    type: "mcq" as const,
    question: "Wie kommt man schnell in Berlin von Ort zu Ort?",
    options: ["Mit dem Auto", "Mit dem Fahrrad", "Mit der U-Bahn", "Zu Fuß"],
    correct: "Mit der U-Bahn",
  },
  {
    id: 6,
    type: "tf" as const,
    question: "Das Lieblingsmuseum der Person ist das Kunstmuseum.",
    correct: "false",
  },
];

export const LISTENING_QUESTIONS = [
  {
    id: 1,
    type: "mcq" as const,
    question: "Where is Maria going on Saturday?",
    options: ["To the cinema", "To the supermarket", "To a restaurant", "To the museum"],
    correct: "To the supermarket",
  },
  {
    id: 2,
    type: "mcq" as const,
    question: "What time does the store open?",
    options: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
    correct: "9:00 AM",
  },
  {
    id: 3,
    type: "tf" as const,
    question: "The man will meet Maria at the train station.",
    correct: "false",
  },
  {
    id: 4,
    type: "mcq" as const,
    question: "What does Maria need to buy?",
    options: ["Bread and milk", "Vegetables and fruit", "Coffee and tea", "Bread and butter"],
    correct: "Bread and milk",
  },
];

export const FLASHCARD_DECK = [
  { id: 1, german: "das Haus", english: "the house", bengali: "বাড়ি", example: "Das Haus ist groß.", level: "A1" },
  { id: 2, german: "die Schule", english: "the school", bengali: "স্কুল", example: "Die Schule beginnt um 8 Uhr.", level: "A1" },
  { id: 3, german: "der Bahnhof", english: "the train station", bengali: "রেলওয়ে স্টেশন", example: "Wo ist der Bahnhof?", level: "A1" },
  { id: 4, german: "kaufen", english: "to buy", bengali: "কেনা", example: "Ich möchte Brot kaufen.", level: "A1" },
  { id: 5, german: "sprechen", english: "to speak", bengali: "বলা / কথা বলা", example: "Kannst du Deutsch sprechen?", level: "A1" },
  { id: 6, german: "die Arbeit", english: "work / job", bengali: "কাজ", example: "Die Arbeit ist interessant.", level: "A2" },
  { id: 7, german: "verstehen", english: "to understand", bengali: "বোঝা", example: "Ich verstehe dich nicht.", level: "A2" },
  { id: 8, german: "die Gesundheit", english: "health", bengali: "স্বাস্থ্য", example: "Gesundheit ist wichtig.", level: "A2" },
];

export const LESSON_MODULES = [
  {
    level: "A1",
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    progress: 75,
    lessons: [
      { id: 1, title: "Greetings & Introductions", done: true, type: "vocabulary" },
      { id: 2, title: "Numbers & Colors", done: true, type: "vocabulary" },
      { id: 3, title: "Articles: der, die, das", done: true, type: "grammar" },
      { id: 4, title: "Present Tense Verbs", done: false, type: "grammar" },
      { id: 5, title: "Family & Home", done: false, type: "vocabulary" },
    ],
  },
  {
    level: "A2",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    progress: 30,
    lessons: [
      { id: 1, title: "Past Tense (Perfekt)", done: true, type: "grammar" },
      { id: 2, title: "Modal Verbs", done: false, type: "grammar" },
      { id: 3, title: "Shopping & Money", done: false, type: "vocabulary" },
      { id: 4, title: "Separable Verbs", done: false, type: "grammar" },
    ],
  },
  {
    level: "B1",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    progress: 5,
    lessons: [
      { id: 1, title: "Subjunctive II (Konjunktiv II)", done: false, type: "grammar" },
      { id: 2, title: "Relative Clauses", done: false, type: "grammar" },
      { id: 3, title: "Work & Career Vocabulary", done: false, type: "vocabulary" },
    ],
  },
  {
    level: "B2",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    progress: 0,
    lessons: [
      { id: 1, title: "Passive Voice", done: false, type: "grammar" },
      { id: 2, title: "Complex Sentence Structures", done: false, type: "grammar" },
      { id: 3, title: "Advanced Vocabulary", done: false, type: "vocabulary" },
    ],
  },
];

export const RECOMMENDATIONS: { id: number; title: string; titleBn: string; reason: string; reasonBn: string; type: string; level: string; urgency: "high" | "medium" | "low" }[] = [
  {
    id: 1,
    title: "A1 Listening: Daily Conversations",
    titleBn: "A1 শ্রবণ: দৈনন্দিন কথোপকথন",
    reason: "You scored 55% on Listening. Practice basic conversation patterns.",
    reasonBn: "আপনি শ্রবণে ৫৫% পেয়েছেন। মৌলিক কথোপকথন অনুশীলন করুন।",
    type: "listening",
    level: "A1",
    urgency: "high",
  },
  {
    id: 2,
    title: "A2 Writing: Sentence Structure",
    titleBn: "A2 লেখা: বাক্য গঠন",
    reason: "Your writing score is 48%. Focus on basic German sentence order.",
    reasonBn: "আপনার লেখার স্কোর ৪৮%। মৌলিক জার্মান বাক্যের ক্রম শিখুন।",
    type: "writing",
    level: "A2",
    urgency: "high",
  },
  {
    id: 3,
    title: "A1 Grammar: Modal Verbs Review",
    titleBn: "A1 ব্যাকরণ: মোডাল ক্রিয়া পর্যালোচনা",
    reason: "You missed 3 grammar questions about modal verbs.",
    reasonBn: "আপনি মোডাল ক্রিয়া সম্পর্কে ৩টি প্রশ্ন মিস করেছেন।",
    type: "grammar",
    level: "A1",
    urgency: "medium",
  },
];

export function generateDummyResults(answers: Record<number, string>, questions: typeof READING_QUESTIONS | typeof LISTENING_QUESTIONS): Omit<TestResult, "level" | "section"> {
  let correct = 0;
  const breakdown = questions.map((q) => {
    const userAnswer = answers[q.id] ?? "";
    const isCorrect = userAnswer.toLowerCase() === q.correct.toLowerCase();
    if (isCorrect) correct++;
    return {
      questionId: q.id,
      correct: isCorrect,
      userAnswer: userAnswer || "Not answered",
      correctAnswer: q.correct,
      question: q.question,
    };
  });
  return {
    score: Math.round((correct / questions.length) * 100),
    total: 100,
    answers: breakdown,
  };
}
