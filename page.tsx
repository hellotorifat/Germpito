"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import LearningZone from "@/components/LearningZone";
import MockTestHub from "@/components/MockTestHub";
import Flashcards from "@/components/Flashcards";
import ExamSimulator from "@/components/ExamSimulator";
import ResultsPage from "@/components/ResultsPage";
import ProgressView from "@/components/ProgressView";
import { useApp } from "@/context/AppContext";

function MainContent() {
  const { activeView } = useApp();

  return (
    <>
      {activeView === "dashboard" && <Dashboard />}
      {activeView === "learning" && <LearningZone />}
      {activeView === "tests" && <MockTestHub />}
      {activeView === "flashcards" && <Flashcards />}
      {activeView === "exam" && <ExamSimulator />}
      {activeView === "results" && <ResultsPage />}
      {activeView === "progress" && <ProgressView />}
      {activeView === "settings" && (
        <div className="card text-center py-16">
          <p className="text-4xl mb-4">⚙️</p>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Settings</h2>
          <p className="text-slate-500">Profile and preferences coming soon.</p>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Navbar />
        <main className="pt-16 min-h-screen">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <MainContent />
          </div>
        </main>
      </div>
    </div>
  );
}
