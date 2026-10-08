"use client";
import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Layers,
  TrendingUp,
  Settings,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import clsx from "clsx";

const navItems = [
  { key: "dashboard", icon: LayoutDashboard, labelKey: "nav.dashboard" },
  { key: "learning", icon: BookOpen, labelKey: "nav.learning" },
  { key: "tests", icon: ClipboardList, labelKey: "nav.tests" },
  { key: "flashcards", icon: Layers, labelKey: "nav.flashcards" },
  { key: "progress", icon: TrendingUp, labelKey: "nav.progress" },
  { key: "settings", icon: Settings, labelKey: "nav.settings" },
] as const;

const levelColors = {
  A1: "bg-green-100 text-green-700",
  A2: "bg-blue-100 text-blue-700",
  B1: "bg-purple-100 text-purple-700",
  B2: "bg-orange-100 text-orange-700",
};

export default function Sidebar() {
  const { t } = useLanguage();
  const { activeView, setActiveView, sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 z-30 flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm leading-tight">{t("nav.title")}</p>
              <p className="text-[10px] text-slate-500 leading-tight">{t("nav.subtitle")}</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Card */}
        <div className="mx-4 mt-4 p-3 bg-brand-50 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            A
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-800 text-sm truncate">Alex Müller</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={clsx("badge text-[10px]", levelColors["A2"])}>A2</span>
              <span className="text-[10px] text-slate-500">🔥 7 days</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-4 mb-2">
            Main Menu
          </p>
          {navItems.map(({ key, icon: Icon, labelKey }) => (
            <button
              key={key}
              onClick={() => {
                setActiveView(key as any);
                setSidebarOpen(false);
              }}
              className={clsx("nav-link w-full text-left", activeView === key && "active")}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{t(labelKey)}</span>
              {activeView === key && <ChevronRight className="w-4 h-4 opacity-60" />}
            </button>
          ))}

          <div className="pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-4 mb-2">
              Quick Practice
            </p>
            <div className="space-y-2">
              {["A1", "A2", "B1", "B2"].map((lvl) => (
                <div
                  key={lvl}
                  className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-slate-50 cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className={clsx("badge", levelColors[lvl as keyof typeof levelColors])}>{lvl}</span>
                  </div>
                  <div className="flex-1 mx-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-400"
                      style={{
                        width: lvl === "A1" ? "75%" : lvl === "A2" ? "30%" : lvl === "B1" ? "5%" : "0%",
                      }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">
                    {lvl === "A1" ? "75%" : lvl === "A2" ? "30%" : lvl === "B1" ? "5%" : "0%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl p-4 text-white text-center">
            <p className="text-sm font-semibold">🎯 Daily Goal</p>
            <p className="text-xs opacity-80 mt-1">Complete 1 more lesson today</p>
            <div className="mt-2 h-1.5 bg-white/20 rounded-full">
              <div className="h-full w-2/3 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
