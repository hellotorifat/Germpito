"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type View =
  | "dashboard"
  | "learning"
  | "tests"
  | "flashcards"
  | "progress"
  | "exam"
  | "results"
  | "settings";

interface AppContextType {
  activeView: View;
  setActiveView: (view: View) => void;
  examData: ExamData | null;
  setExamData: (data: ExamData | null) => void;
  testResults: TestResult | null;
  setTestResults: (r: TestResult | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export interface ExamData {
  level: string;
  section: "reading" | "listening" | "writing" | "speaking";
  duration: number; // in seconds
}

export interface TestResult {
  level: string;
  section: string;
  score: number;
  total: number;
  answers: { questionId: number; correct: boolean; userAnswer: string; correctAnswer: string; question: string }[];
}

const AppContext = createContext<AppContextType>({
  activeView: "dashboard",
  setActiveView: () => {},
  examData: null,
  setExamData: () => {},
  testResults: null,
  setTestResults: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        examData,
        setExamData,
        testResults,
        setTestResults,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
