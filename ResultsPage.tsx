"use client";
import React from "react";
import { CheckCircle, XCircle, RotateCcw, ArrowLeft, Zap, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import { RECOMMENDATIONS } from "@/data/dummyData";
import clsx from "clsx";

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="-rotate-90" width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#f1f5f9" strokeWidth="12" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-800">{score}</span>
        <span className="text-xs text-slate-500 font-medium">/ 100</span>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const { t, lang } = useLanguage();
  const { testResults, setActiveView, setExamData } = useApp();

  if (!testResults) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>No results found.</p>
        <button onClick={() => setActiveView("tests")} className="btn-primary mt-4">
          Go to Tests
        </button>
      </div>
    );
  }

  const { score, answers, level, section } = testResults;
  const passed = score >= 60;
  const correct = answers.filter((a) => a.correct).length;
  const incorrect = answers.filter((a) => !a.correct).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Card */}
      <div className={clsx(
        "card text-center relative overflow-hidden",
        passed
          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
          : "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
      )}>
        <div className="relative z-10">
          <p className="text-sm font-semibold text-slate-500 mb-1">
            {level} {section.charAt(0).toUpperCase() + section.slice(1)} Test
          </p>
          <h2 className="text-2xl font-bold mb-4">
            {passed ? t("results.passed") : t("results.failed")}
          </h2>
          <ScoreRing score={score} />
          <p className="mt-4 text-slate-600 text-sm">
            {t("results.score")}: <span className="font-bold text-slate-800">{score}%</span>
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-green-700">{correct} {t("results.correct")}</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-red-600">{incorrect} {t("results.incorrect")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Breakdown */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-bold text-slate-800">{t("results.breakdown")}</h3>
        </div>
        <div className="space-y-3">
          {answers.map((ans, i) => (
            <div
              key={ans.questionId}
              className={clsx(
                "p-4 rounded-2xl border-2",
                ans.correct
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={clsx(
                  "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5",
                  ans.correct ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                )}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{ans.question}</p>
                  <div className="mt-2 flex flex-col sm:flex-row gap-2 text-xs">
                    <div className={clsx(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                      ans.correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    )}>
                      {ans.correct ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span className="font-medium">Your answer: </span>
                      <span>{ans.userAnswer}</span>
                    </div>
                    {!ans.correct && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100 text-green-700">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span className="font-medium">Correct: </span>
                        <span>{ans.correctAnswer}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-brand-600" />
          <h3 className="font-bold text-slate-800">{t("results.recommendations")}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECOMMENDATIONS.map((rec) => (
            <div
              key={rec.id}
              onClick={() => setActiveView("learning")}
              className={clsx(
                "p-4 rounded-2xl border-2 cursor-pointer hover:scale-105 transition-all",
                rec.urgency === "high"
                  ? "border-red-200 bg-red-50 hover:border-red-400"
                  : rec.urgency === "medium"
                  ? "border-yellow-200 bg-yellow-50 hover:border-yellow-400"
                  : "border-green-200 bg-green-50 hover:border-green-400"
              )}
            >
              <div className="text-2xl mb-2">
                {rec.type === "listening" ? "🎧" : rec.type === "writing" ? "✍️" : "📚"}
              </div>
              <span className={clsx("badge text-[10px] mb-2",
                rec.urgency === "high" ? "badge-red" : rec.urgency === "medium" ? "badge-yellow" : "badge-green"
              )}>
                {rec.level} • {rec.urgency} priority
              </span>
              <p className="font-semibold text-slate-800 text-sm mt-1">
                {lang === "bn" ? rec.titleBn : rec.title}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {lang === "bn" ? rec.reasonBn : rec.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={() => setActiveView("tests")} className="flex-1 flex items-center justify-center gap-2 btn-secondary">
          <ArrowLeft className="w-4 h-4" />
          {t("results.back")}
        </button>
        <button onClick={() => setActiveView("learning")} className="flex-1 flex items-center justify-center gap-2 btn-secondary">
          <BookOpen className="w-4 h-4" />
          Study Recommendations
        </button>
        <button
          onClick={() => {
            setExamData({ level, section: section as any, duration: 20 * 60 });
            setActiveView("exam");
          }}
          className="flex-1 flex items-center justify-center gap-2 btn-primary"
        >
          <RotateCcw className="w-4 h-4" />
          {t("results.retake")}
        </button>
      </div>
    </div>
  );
}
