"use client";
import React, { useState } from "react";
import { RotateCcw, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FLASHCARD_DECK } from "@/data/dummyData";
import clsx from "clsx";

type FilterLevel = "all" | "A1" | "A2" | "B1" | "B2";

export default function Flashcards() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<FilterLevel>("all");
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [review, setReview] = useState<Set<number>>(new Set());

  const cards = FLASHCARD_DECK.filter((c) => filter === "all" || c.level === filter);
  const card = cards[current];
  const total = cards.length;
  const knownCount = [...known].filter((id) => cards.find((c) => c.id === id)).length;

  const next = () => { setFlipped(false); setTimeout(() => setCurrent((c) => Math.min(total - 1, c + 1)), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setCurrent((c) => Math.max(0, c - 1)), 150); };

  const markKnown = () => {
    setKnown((s) => new Set([...s, card.id]));
    setReview((s) => { const n = new Set(s); n.delete(card.id); return n; });
    if (current < total - 1) next();
  };
  const markReview = () => {
    setReview((s) => new Set([...s, card.id]));
    setKnown((s) => { const n = new Set(s); n.delete(card.id); return n; });
    if (current < total - 1) next();
  };

  const levelColors: Record<string, string> = {
    A1: "bg-green-100 text-green-700",
    A2: "bg-blue-100 text-blue-700",
    B1: "bg-purple-100 text-purple-700",
    B2: "bg-orange-100 text-orange-700",
  };

  if (!card) return (
    <div className="text-center py-20 text-slate-400">
      <p>No flashcards for this level yet.</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header & Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800">🃏 {lang === "bn" ? "ফ্ল্যাশকার্ড" : "Flashcards"}</h2>
          <div className="flex gap-2">
            {(["all", "A1", "A2", "B1", "B2"] as FilterLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => { setFilter(lvl); setCurrent(0); setFlipped(false); }}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                  filter === lvl ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>Card {current + 1} / {total}</span>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${((current + 1) / total) * 100}%` }} />
          </div>
          <span className="text-green-600 font-medium">✓ {knownCount}</span>
        </div>
      </div>

      {/* Flashcard */}
      <div
        className={clsx(
          "relative w-full cursor-pointer select-none transition-all duration-300",
          "rounded-3xl shadow-lg border-2 overflow-hidden",
          flipped ? "border-purple-200 bg-purple-50" : "border-brand-200 bg-brand-50"
        )}
        style={{ minHeight: "280px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <span className={clsx("badge mb-4", levelColors[card.level])}>{card.level}</span>

          {!flipped ? (
            <>
              <p className="text-4xl font-bold text-slate-800 mb-3">{card.german}</p>
              <p className="text-slate-500 italic text-sm">{card.example}</p>
              <p className="text-brand-400 text-xs mt-6">{t("flash.flip")} →</p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-purple-700 mb-2">{card.english}</p>
              {lang === "bn" && (
                <p className="text-lg font-semibold text-slate-700 mb-2">{card.bengali}</p>
              )}
              <p className="text-slate-400 italic text-sm mt-2">{card.example}</p>
              <p className="text-purple-400 text-xs mt-6 animate-pulse">← {t("flash.flip")}</p>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={prev} disabled={current === 0} className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-all">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={markReview}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-600 font-semibold text-sm transition-all active:scale-95"
        >
          <ThumbsDown className="w-4 h-4" />
          {t("flash.didnt")}
        </button>
        <button
          onClick={markKnown}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-50 hover:bg-green-100 border-2 border-green-200 text-green-600 font-semibold text-sm transition-all active:scale-95"
        >
          <ThumbsUp className="w-4 h-4" />
          {t("flash.knew")}
        </button>
        <button onClick={next} disabled={current === total - 1} className="p-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-all">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Reset */}
      <div className="flex justify-center">
        <button
          onClick={() => { setCurrent(0); setFlipped(false); setKnown(new Set()); setReview(new Set()); }}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset deck
        </button>
      </div>
    </div>
  );
}
