"use client";
import React, { useState } from "react";
import { Play, Lock, CheckCircle, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import { LESSON_MODULES } from "@/data/dummyData";
import clsx from "clsx";

const typeIcon: Record<string, string> = { vocabulary: "🔤", grammar: "⚙️", reading: "📖", listening: "🎧" };

export default function LearningZone() {
  const { t } = useLanguage();
  const { setActiveView, setExamData } = useApp();
  const [openLevel, setOpenLevel] = useState<string | null>("A1");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-brand-700 to-purple-600 text-white">
        <h2 className="text-xl font-bold">{t("learn.title")}</h2>
        <p className="text-brand-100 text-sm mt-1">{t("learn.subtitle")}</p>
        <div className="flex gap-3 mt-4">
          <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
            <p className="text-lg font-bold">4</p>
            <p className="text-xs text-brand-100">Levels</p>
          </div>
          <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
            <p className="text-lg font-bold">15</p>
            <p className="text-xs text-brand-100">Lessons</p>
          </div>
          <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
            <p className="text-lg font-bold">4</p>
            <p className="text-xs text-brand-100">Skills</p>
          </div>
        </div>
      </div>

      {/* Level Modules */}
      {LESSON_MODULES.map((mod) => (
        <div key={mod.level} className={clsx("card border-l-4 overflow-hidden transition-all", mod.borderColor)}>
          {/* Level Header */}
          <button
            onClick={() => setOpenLevel(openLevel === mod.level ? null : mod.level)}
            className="w-full flex items-center gap-4 text-left"
          >
            <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0", mod.color)}>
              {mod.level}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800">{t(`level.${mod.level.toLowerCase()}` as any)}</h3>
                <span className={clsx("badge text-xs", mod.lightColor, mod.textColor)}>
                  {mod.lessons.filter((l) => l.done).length}/{mod.lessons.length} done
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={clsx("h-full rounded-full", mod.color)}
                    style={{ width: `${mod.progress}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">{mod.progress}%</span>
              </div>
            </div>
            {openLevel === mod.level ? (
              <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
            )}
          </button>

          {/* Lessons List */}
          {openLevel === mod.level && (
            <div className="mt-4 space-y-2">
              {mod.lessons.map((lesson, idx) => {
                const locked = idx > 0 && !mod.lessons[idx - 1].done;
                return (
                  <div
                    key={lesson.id}
                    className={clsx(
                      "flex items-center gap-3 p-3 rounded-xl transition-all",
                      locked
                        ? "opacity-50 cursor-not-allowed bg-slate-50"
                        : lesson.done
                        ? "bg-green-50 cursor-pointer hover:bg-green-100"
                        : `cursor-pointer hover:${mod.lightColor} ${mod.lightColor}`
                    )}
                    onClick={() => !locked && setActiveView("exam")}
                  >
                    <div className={clsx(
                      "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                      lesson.done
                        ? "bg-green-200 text-green-700"
                        : locked
                        ? "bg-slate-200 text-slate-400"
                        : `${mod.lightColor} ${mod.textColor}`
                    )}>
                      {locked ? (
                        <Lock className="w-4 h-4" />
                      ) : lesson.done ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-sm">{typeIcon[lesson.type]}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 text-sm">{lesson.title}</p>
                      <p className="text-xs text-slate-500 capitalize">{lesson.type}</p>
                    </div>
                    {!locked && (
                      <button className={clsx(
                        "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0",
                        lesson.done
                          ? "bg-green-200 text-green-700"
                          : `${mod.color} text-white`
                      )}>
                        {lesson.done ? (
                          <><CheckCircle className="w-3.5 h-3.5" /> {t("learn.completed")}</>
                        ) : (
                          <><Play className="w-3.5 h-3.5" /> {t("learn.start")}</>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    setExamData({ level: mod.level, section: "reading", duration: 20 * 60 });
                    setActiveView("exam");
                  }}
                  className="flex items-center gap-2 btn-primary text-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  Take {mod.level} Mock Test
                </button>
                <button
                  onClick={() => setActiveView("flashcards")}
                  className="btn-secondary text-sm"
                >
                  🃏 Flashcards
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
