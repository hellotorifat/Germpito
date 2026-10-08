"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  Volume2,
  Mic,
  MicOff,
  StopCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import {
  READING_PASSAGE,
  READING_QUESTIONS,
  LISTENING_QUESTIONS,
  generateDummyResults,
} from "@/data/dummyData";
import clsx from "clsx";

// ─────────────────────────────────────────────
// Countdown Timer
// ─────────────────────────────────────────────
function useCountdown(initialSeconds: number, onExpire: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [onExpire]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return { seconds, formatted: fmt(seconds) };
}

// ─────────────────────────────────────────────
// Timer Bar (top strip)
// ─────────────────────────────────────────────
function TimerBar({
  seconds,
  total,
  formatted,
}: {
  seconds: number;
  total: number;
  formatted: string;
}) {
  const { t } = useLanguage();
  const pct = (seconds / total) * 100;
  const critical = seconds < 300;

  return (
    <div
      className={clsx(
        "flex items-center gap-3 px-4 py-2 rounded-2xl font-semibold text-sm",
        critical
          ? "bg-red-50 border border-red-200 text-red-600"
          : "bg-slate-50 border border-slate-200 text-slate-700"
      )}
    >
      <Clock className={clsx("w-4 h-4", critical && "animate-pulse")} />
      <span className="hidden sm:inline text-xs font-medium text-slate-500">
        {t("exam.timer")}
      </span>
      <span
        className={clsx(
          "text-xl font-bold tabular-nums tracking-tight",
          critical && "timer-critical"
        )}
      >
        {formatted}
      </span>
      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-1000",
            critical ? "bg-red-500" : pct > 50 ? "bg-green-500" : "bg-yellow-500"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Reading Section
// ─────────────────────────────────────────────
function ReadingSection({
  answers,
  setAnswers,
}: {
  answers: Record<number, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}) {
  const { t } = useLanguage();
  const [activeQ, setActiveQ] = useState(0);
  const questions = READING_QUESTIONS;

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Passage (Left) */}
      <div className="lg:w-1/2 card overflow-auto flex-shrink-0" style={{ maxHeight: "calc(100vh - 220px)" }}>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-brand-600" />
          <h3 className="font-bold text-slate-800">{t("exam.passage")}</h3>
          <span className="badge badge-green">A1</span>
        </div>
        <h4 className="text-lg font-bold text-slate-800 mb-3">{READING_PASSAGE.title}</h4>
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
          {READING_PASSAGE.text}
        </p>
      </div>

      {/* Questions (Right) */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        {/* Question Tabs */}
        <div className="flex flex-wrap gap-2">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setActiveQ(i)}
              className={clsx(
                "w-9 h-9 rounded-xl font-bold text-sm transition-all",
                activeQ === i
                  ? "bg-brand-600 text-white"
                  : answers[q.id]
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Active Question Card */}
        <div className="card flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge badge-blue">
              {t("exam.question")} {activeQ + 1} {t("exam.of")} {questions.length}
            </span>
            <span className="badge badge-purple">{questions[activeQ].type === "mcq" ? "MCQ" : "True / False"}</span>
          </div>

          <p className="font-semibold text-slate-800 mb-4 text-base leading-relaxed">
            {questions[activeQ].question}
          </p>

          {questions[activeQ].type === "mcq" && (
            <div className="space-y-2.5">
              {(questions[activeQ] as any).options.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => setAnswers((a) => ({ ...a, [questions[activeQ].id]: opt }))}
                  className={clsx(
                    "w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium",
                    answers[questions[activeQ].id] === opt
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-slate-100 hover:border-brand-200 hover:bg-slate-50 text-slate-700"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {questions[activeQ].type === "tf" && (
            <div className="flex gap-3">
              {["true", "false"].map((v) => (
                <button
                  key={v}
                  onClick={() => setAnswers((a) => ({ ...a, [questions[activeQ].id]: v }))}
                  className={clsx(
                    "flex-1 py-4 rounded-2xl border-2 font-bold text-base transition-all",
                    answers[questions[activeQ].id] === v
                      ? v === "true"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-red-500 bg-red-50 text-red-700"
                      : "border-slate-100 hover:border-slate-300 text-slate-600"
                  )}
                >
                  {v === "true" ? "✓ " + t("exam.true") : "✗ " + t("exam.false")}
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveQ((q) => Math.max(0, q - 1))}
              disabled={activeQ === 0}
              className="flex items-center gap-1 btn-secondary text-sm disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              {t("exam.prev")}
            </button>
            <span className="text-sm text-slate-400">
              {Object.keys(answers).length} / {questions.length} answered
            </span>
            <button
              onClick={() => setActiveQ((q) => Math.min(questions.length - 1, q + 1))}
              disabled={activeQ === questions.length - 1}
              className="flex items-center gap-1 btn-secondary text-sm disabled:opacity-40"
            >
              {t("exam.next")}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Listening Section
// ─────────────────────────────────────────────
function ListeningSection({
  answers,
  setAnswers,
}: {
  answers: Record<number, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}) {
  const { t } = useLanguage();
  const [playsLeft, setPlaysLeft] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [activeQ, setActiveQ] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const AUDIO_DURATION = 45; // seconds (simulated)

  const handlePlay = () => {
    if (playsLeft <= 0 || isPlaying) return;
    setPlaysLeft((p) => p - 1);
    setIsPlaying(true);
    setPlayProgress(0);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const pct = Math.min((elapsed / AUDIO_DURATION) * 100, 100);
      setPlayProgress(pct);
      if (elapsed >= AUDIO_DURATION) {
        clearInterval(progressRef.current!);
        setIsPlaying(false);
      }
    }, 100);
  };

  useEffect(() => () => clearInterval(progressRef.current!), []);

  const questions = LISTENING_QUESTIONS;

  return (
    <div className="flex flex-col gap-4">
      {/* Audio Player Card */}
      <div className="card bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold">Hörtext: Gespräch im Supermarkt</p>
            <p className="text-slate-400 text-xs">A1 Listening Exercise • ~45 seconds</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/20 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-brand-400 rounded-full transition-all duration-100"
            style={{ width: `${playProgress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePlay}
            disabled={playsLeft <= 0 || isPlaying}
            className={clsx(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all",
              playsLeft > 0 && !isPlaying
                ? "bg-brand-500 hover:bg-brand-400 text-white"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            )}
          >
            <Volume2 className="w-4 h-4" />
            {isPlaying ? "Playing..." : t("exam.play_audio")}
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "w-3 h-3 rounded-full",
                  i < playsLeft ? "bg-brand-400" : "bg-white/20"
                )}
              />
            ))}
            <span className="text-sm text-slate-300 ml-1">
              {playsLeft} {t("exam.plays_left")}
            </span>
          </div>
        </div>

        {playsLeft === 0 && (
          <div className="mt-3 flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-xl px-3 py-2 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Maximum plays reached. Answer from memory.
          </div>
        )}
      </div>

      {/* Question Tabs */}
      <div className="flex flex-wrap gap-2">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setActiveQ(i)}
            className={clsx(
              "w-9 h-9 rounded-xl font-bold text-sm transition-all",
              activeQ === i
                ? "bg-brand-600 text-white"
                : answers[q.id]
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Active Question */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-blue">
            {t("exam.question")} {activeQ + 1} {t("exam.of")} {questions.length}
          </span>
          <span className="badge badge-yellow">{questions[activeQ].type === "mcq" ? "MCQ" : "True / False"}</span>
        </div>
        <p className="font-semibold text-slate-800 mb-4 text-base">{questions[activeQ].question}</p>

        {questions[activeQ].type === "mcq" && (
          <div className="space-y-2.5">
            {(questions[activeQ] as any).options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => setAnswers((a) => ({ ...a, [questions[activeQ].id]: opt }))}
                className={clsx(
                  "w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium",
                  answers[questions[activeQ].id] === opt
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-slate-100 hover:border-brand-200 hover:bg-slate-50 text-slate-700"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {questions[activeQ].type === "tf" && (
          <div className="flex gap-3">
            {["true", "false"].map((v) => (
              <button
                key={v}
                onClick={() => setAnswers((a) => ({ ...a, [questions[activeQ].id]: v }))}
                className={clsx(
                  "flex-1 py-4 rounded-2xl border-2 font-bold text-base transition-all",
                  answers[questions[activeQ].id] === v
                    ? v === "true"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-red-500 bg-red-50 text-red-700"
                    : "border-slate-100 hover:border-slate-300 text-slate-600"
                )}
              >
                {v === "true" ? "✓ " + t("exam.true") : "✗ " + t("exam.false")}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveQ((q) => Math.max(0, q - 1))}
            disabled={activeQ === 0}
            className="flex items-center gap-1 btn-secondary text-sm disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("exam.prev")}
          </button>
          <span className="text-sm text-slate-400">
            {Object.keys(answers).length} / {questions.length} answered
          </span>
          <button
            onClick={() => setActiveQ((q) => Math.min(questions.length - 1, q + 1))}
            disabled={activeQ === questions.length - 1}
            className="flex items-center gap-1 btn-secondary text-sm disabled:opacity-40"
          >
            {t("exam.next")}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Writing Section
// ─────────────────────────────────────────────
function WritingSection() {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const MIN_WORDS = 40;
  const MAX_WORDS = 60;

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <div className="card border-l-4 border-brand-500">
        <h3 className="font-bold text-slate-800 mb-2">Aufgabe (Task)</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Schreiben Sie eine kurze Mitteilung (40–60 Wörter) an Ihren Freund Max. Sie waren krank und konnten
          nicht zur Schule kommen. Erklären Sie, was passiert ist, und bitten Sie um die Hausaufgaben.
        </p>
        <div className="mt-2 flex gap-2">
          <span className="badge badge-yellow">Min: {MIN_WORDS} words</span>
          <span className="badge badge-blue">Max: {MAX_WORDS} words</span>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-slate-700 text-sm">{t("exam.writing")}</p>
          <div className={clsx(
            "badge font-bold",
            wordCount < MIN_WORDS ? "badge-red" : wordCount <= MAX_WORDS ? "badge-green" : "badge-yellow"
          )}>
            {t("exam.word_count")}: {wordCount}
          </div>
        </div>
        <textarea
          className="w-full min-h-[240px] resize-none p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          placeholder="Schreiben Sie hier Ihren Text... (Write your text here...)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-2 flex justify-between items-center">
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden mr-4">
            <div
              className={clsx("h-full rounded-full transition-all", wordCount <= MAX_WORDS ? "bg-brand-500" : "bg-red-500")}
              style={{ width: `${Math.min((wordCount / MAX_WORDS) * 100, 100)}%` }}
            />
          </div>
          <span className="text-xs text-slate-400">{MAX_WORDS} word limit</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Speaking Section
// ─────────────────────────────────────────────
function SpeakingSection() {
  const { t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecorded(false);
    setRecSeconds(0);
    timerRef.current = setInterval(() => setRecSeconds((s) => s + 1), 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecorded(true);
    clearInterval(timerRef.current!);
  };

  useEffect(() => () => clearInterval(timerRef.current!), []);

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <div className="card border-l-4 border-purple-500">
        <h3 className="font-bold text-slate-800 mb-2">Aufgabe (Task)</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Stellen Sie sich vor! Sagen Sie: Wie heißen Sie? Woher kommen Sie? Was machen Sie? Sprechen Sie
          für 60–90 Sekunden.
        </p>
        <div className="mt-2 flex gap-2">
          <span className="badge badge-purple">Target: 60–90 seconds</span>
        </div>
      </div>

      <div className="card text-center">
        {/* Recording Visualizer */}
        <div className={clsx(
          "w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-300",
          isRecording ? "bg-red-100 animate-pulse" : recorded ? "bg-green-100" : "bg-slate-100"
        )}>
          {isRecording ? (
            <div className="text-center">
              <Mic className="w-10 h-10 text-red-500 mx-auto" />
              <p className="text-red-500 font-bold text-sm mt-1">{fmt(recSeconds)}</p>
            </div>
          ) : recorded ? (
            <div className="text-center">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
              <p className="text-green-600 font-bold text-sm mt-1">Recorded!</p>
            </div>
          ) : (
            <Mic className="w-10 h-10 text-slate-400" />
          )}
        </div>

        {/* Sound wave bars (decorative) */}
        {isRecording && (
          <div className="flex items-end justify-center gap-1 h-8 mb-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 bg-red-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 28 + 4}px`,
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all active:scale-95"
            >
              <Mic className="w-5 h-5" />
              {t("exam.start_record")}
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-2xl transition-all active:scale-95"
            >
              <StopCircle className="w-5 h-5" />
              {t("exam.stop_record")}
            </button>
          )}
          {recorded && (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 btn-secondary text-sm"
            >
              Re-record
            </button>
          )}
        </div>

        {recorded && (
          <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            Recording saved ({fmt(recSeconds)}). You can re-record if needed.
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main ExamSimulator
// ─────────────────────────────────────────────
type Section = "reading" | "listening" | "writing" | "speaking";

const SECTIONS: { key: Section; label: string; icon: string }[] = [
  { key: "reading", label: "Lesen", icon: "📖" },
  { key: "listening", label: "Hören", icon: "🎧" },
  { key: "writing", label: "Schreiben", icon: "✍️" },
  { key: "speaking", label: "Sprechen", icon: "🎤" },
];

export default function ExamSimulator() {
  const { t } = useLanguage();
  const { examData, setActiveView, setTestResults } = useApp();
  const [activeSection, setActiveSection] = useState<Section>(
    examData?.section ?? "reading"
  );
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const DURATION = examData?.duration ?? 20 * 60;

  const handleExpire = useCallback(() => setShowConfirm(true), []);
  const { seconds, formatted } = useCountdown(DURATION, handleExpire);

  const handleSubmit = () => {
    const questions =
      activeSection === "reading" ? READING_QUESTIONS : LISTENING_QUESTIONS;
    const raw = generateDummyResults(answers, questions);
    setTestResults({
      ...raw,
      level: examData?.level ?? "A1",
      section: activeSection,
    });
    setActiveView("results");
  };

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 flex items-center gap-3 flex-wrap">
          <span className="badge badge-blue text-sm font-bold px-3 py-1">
            {examData?.level ?? "A1"} Mock Test
          </span>
          <span className="text-slate-400 text-sm">Goethe-Zertifikat Format</span>
        </div>
        <TimerBar seconds={seconds} total={DURATION} formatted={formatted} />
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm flex-shrink-0 transition-all",
              activeSection === s.key
                ? "bg-brand-600 text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
        <div className="ml-auto flex-shrink-0">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 btn-danger text-sm"
          >
            <Send className="w-4 h-4" />
            {t("exam.submit")}
          </button>
        </div>
      </div>

      {/* Section Content */}
      {activeSection === "reading" && (
        <ReadingSection answers={answers} setAnswers={setAnswers} />
      )}
      {activeSection === "listening" && (
        <ListeningSection answers={answers} setAnswers={setAnswers} />
      )}
      {activeSection === "writing" && <WritingSection />}
      {activeSection === "speaking" && <SpeakingSection />}

      {/* Confirm Submit Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="font-bold text-slate-800 text-center text-lg mb-2">
              {t("exam.confirm_submit")}
            </h3>
            <p className="text-slate-500 text-sm text-center mb-6">
              {Object.keys(answers).length} answers recorded. Unanswered questions will be marked incorrect.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 btn-secondary"
              >
                {t("misc.cancel")}
              </button>
              <button onClick={handleSubmit} className="flex-1 btn-primary">
                <Send className="w-4 h-4 inline mr-2" />
                {t("exam.submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
