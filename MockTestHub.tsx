"use client";
import React from "react";
import { Play, Clock, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import clsx from "clsx";

const MOCK_TESTS = [
  {
    id: 1,
    level: "A1",
    format: "Goethe-Zertifikat",
    sections: ["Lesen", "Hören", "Schreiben", "Sprechen"],
    duration: "65 min",
    questions: 26,
    color: "from-green-500 to-emerald-600",
    badge: "badge-green",
    difficulty: "Beginner",
    attempts: 3,
    bestScore: 85,
  },
  {
    id: 2,
    level: "A2",
    format: "Goethe-Zertifikat",
    sections: ["Lesen", "Hören", "Schreiben", "Sprechen"],
    duration: "75 min",
    questions: 30,
    color: "from-blue-500 to-brand-600",
    badge: "badge-blue",
    difficulty: "Elementary",
    attempts: 1,
    bestScore: 60,
  },
  {
    id: 3,
    level: "B1",
    format: "Goethe-Zertifikat / telc",
    sections: ["Lesen", "Hören", "Schreiben", "Sprechen"],
    duration: "165 min",
    questions: 50,
    color: "from-purple-500 to-violet-600",
    badge: "badge-purple",
    difficulty: "Intermediate",
    attempts: 0,
    bestScore: 0,
  },
  {
    id: 4,
    level: "B2",
    format: "Goethe-Zertifikat",
    sections: ["Lesen", "Hören", "Schreiben", "Sprechen"],
    duration: "190 min",
    questions: 60,
    color: "from-orange-500 to-red-500",
    badge: "badge-yellow",
    difficulty: "Upper Intermediate",
    attempts: 0,
    bestScore: 0,
  },
];

const SECTION_ICONS: Record<string, string> = {
  Lesen: "📖",
  Hören: "🎧",
  Schreiben: "✍️",
  Sprechen: "🎤",
};

export default function MockTestHub() {
  const { t } = useLanguage();
  const { setActiveView, setExamData } = useApp();

  const startTest = (level: string) => {
    setExamData({ level, section: "reading", duration: 20 * 60 });
    setActiveView("exam");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <h2 className="text-xl font-bold">🎯 Mock Test Hub</h2>
        <p className="text-slate-400 text-sm mt-1">
          Simulate real Goethe-Zertifikat & telc exam conditions
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <div className="bg-white/10 rounded-xl px-3 py-2">
            <p className="font-bold text-white">4</p>
            <p className="text-slate-400 text-xs">Exam Levels</p>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2">
            <p className="font-bold text-white">2</p>
            <p className="text-slate-400 text-xs">Formats</p>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2">
            <p className="font-bold text-white">4</p>
            <p className="text-slate-400 text-xs">Sections Each</p>
          </div>
        </div>
      </div>

      {/* Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_TESTS.map((test) => (
          <div key={test.id} className="card hover:shadow-md transition-all duration-200 group">
            {/* Level Header */}
            <div className={clsx("h-20 rounded-2xl bg-gradient-to-r flex items-end p-4 mb-4 relative overflow-hidden", test.color)}>
              <div className="relative z-10">
                <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {test.format}
                </span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl font-black text-white/30">
                {test.level}
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-white text-slate-700 font-bold text-xl px-2 py-0.5 rounded-lg">
                  {test.level}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex items-center gap-2 mb-3">
              <span className={clsx("badge", test.badge)}>{test.difficulty}</span>
              <span className="badge badge-blue">
                <Clock className="w-3 h-3 mr-1 inline" />
                {test.duration}
              </span>
              <span className="badge bg-slate-100 text-slate-600">{test.questions} Qs</span>
            </div>

            {/* Sections */}
            <div className="flex gap-2 mb-4">
              {test.sections.map((s) => (
                <div key={s} className="flex flex-col items-center gap-1 bg-slate-50 rounded-xl px-2.5 py-2 flex-1">
                  <span className="text-lg">{SECTION_ICONS[s]}</span>
                  <span className="text-[10px] font-semibold text-slate-500">{s}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            {test.attempts > 0 && (
              <div className="flex items-center gap-3 mb-4 bg-slate-50 rounded-xl p-3">
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Best Score</p>
                  <p className={clsx("font-bold text-sm", test.bestScore >= 60 ? "text-green-600" : "text-red-500")}>
                    {test.bestScore}%
                  </p>
                </div>
                <p className="text-xs text-slate-400">{test.attempts} attempts</p>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => startTest(test.level)}
              className={clsx(
                "w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm text-white",
                "bg-gradient-to-r transition-all duration-200 hover:scale-105 active:scale-95 group-hover:shadow-lg",
                test.color
              )}
            >
              <Play className="w-4 h-4" />
              {test.attempts > 0 ? "Retake " : "Start "}{test.level} Mock Test
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="card border border-brand-200 bg-brand-50">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">ℹ️</span>
          <div>
            <p className="font-semibold text-brand-800 text-sm">Exam Simulator Rules</p>
            <ul className="text-brand-700 text-xs mt-1 space-y-1">
              <li>• The Hören (Listening) audio can only be played <strong>2 times</strong> (matching real exam rules)</li>
              <li>• A countdown timer tracks your remaining time — it turns <span className="text-red-500 font-semibold">red</span> when under 5 minutes</li>
              <li>• Instant automated grading for Reading and Listening sections</li>
              <li>• Post-test analysis shows exactly which questions you missed and why</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
