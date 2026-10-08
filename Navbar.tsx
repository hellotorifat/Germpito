"use client";
import React from "react";
import { Menu, Bell, Globe, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import clsx from "clsx";

const pageTitles: Record<string, { en: string; bn: string }> = {
  dashboard: { en: "Dashboard", bn: "ড্যাশবোর্ড" },
  learning: { en: "Learning Zone", bn: "শিক্ষা অঞ্চল" },
  tests: { en: "Mock Test Hub", bn: "মক টেস্ট হাব" },
  flashcards: { en: "Flashcards", bn: "ফ্ল্যাশকার্ড" },
  progress: { en: "My Progress", bn: "আমার অগ্রগতি" },
  exam: { en: "Exam Simulator", bn: "পরীক্ষা সিমুলেটর" },
  results: { en: "Test Results", bn: "পরীক্ষার ফলাফল" },
  settings: { en: "Settings", bn: "সেটিংস" },
};

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { activeView, setSidebarOpen } = useApp();

  const title = pageTitles[activeView]?.[lang] ?? "Dashboard";

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center px-4 lg:px-6 gap-4">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 flex-shrink-0"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-slate-800 truncate">{title}</h1>
      </div>

      {/* Search bar (desktop only) */}
      <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-48 lg:w-64">
        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          placeholder={lang === "en" ? "Search..." : "অনুসন্ধান করুন..."}
          className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none flex-1 min-w-0"
        />
      </div>

      {/* Language Toggle */}
      <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1">
        <button
          onClick={() => setLang("en")}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200",
            lang === "en"
              ? "bg-brand-600 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          <Globe className="w-3.5 h-3.5" />
          EN
        </button>
        <button
          onClick={() => setLang("bn")}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200",
            lang === "bn"
              ? "bg-brand-600 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          বাং
        </button>
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 flex-shrink-0">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </header>
  );
}
