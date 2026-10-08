"use client";
import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { SKILL_DATA, RECENT_TESTS, DUMMY_USER } from "@/data/dummyData";
import { useLanguage } from "@/context/LanguageContext";
import clsx from "clsx";

const TREND_DATA = [
  { week: "W1", reading: 60, listening: 45, grammar: 55 },
  { week: "W2", reading: 65, listening: 50, grammar: 58 },
  { week: "W3", reading: 70, listening: 48, grammar: 62 },
  { week: "W4", reading: 77, listening: 55, grammar: 68 },
  { week: "W5", reading: 80, listening: 58, grammar: 72 },
  { week: "W6", reading: 77, listening: 55, grammar: 68 },
];

export default function ProgressView() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {DUMMY_USER.avatar}
        </div>
        <div>
          <h2 className="font-bold text-slate-800 text-xl">Alex Müller</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="badge badge-blue">A2 Level</span>
            <span className="text-sm text-slate-500">🔥 {DUMMY_USER.streak} day streak</span>
            <span className="text-sm text-slate-500">⭐ {DUMMY_USER.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Skills Radar */}
      <div className="card">
        <h3 className="font-bold text-slate-800 mb-4">{t("dash.skills_analysis")}</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={SKILL_DATA}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: "#64748b" }} />
            <Radar dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} dot />
            <Tooltip formatter={(val) => [`${val}%`, ""]} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Chart */}
      <div className="card">
        <h3 className="font-bold text-slate-800 mb-4">📈 Progress Over Time</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={TREND_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} formatter={(val) => [`${val}%`, ""]} />
            <Legend />
            <Line type="monotone" dataKey="reading" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Reading" />
            <Line type="monotone" dataKey="listening" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Listening" />
            <Line type="monotone" dataKey="grammar" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} name="Grammar" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* All Tests Table */}
      <div className="card overflow-x-auto">
        <h3 className="font-bold text-slate-800 mb-4">📋 Test History</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-2 text-slate-500 font-medium">Level</th>
              <th className="text-left py-2 text-slate-500 font-medium">Section</th>
              <th className="text-left py-2 text-slate-500 font-medium">Score</th>
              <th className="text-left py-2 text-slate-500 font-medium">Date</th>
              <th className="text-left py-2 text-slate-500 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_TESTS.map((test) => (
              <tr key={test.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-3">
                  <span className={clsx("badge", test.level === "A1" ? "badge-green" : test.level === "A2" ? "badge-blue" : test.level === "B1" ? "badge-purple" : "badge-yellow")}>
                    {test.level}
                  </span>
                </td>
                <td className="py-3 font-medium text-slate-700">{test.section}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={clsx("h-full rounded-full", test.passed ? "bg-green-500" : "bg-red-400")}
                        style={{ width: `${test.score}%` }}
                      />
                    </div>
                    <span className={clsx("font-bold", test.passed ? "text-green-600" : "text-red-500")}>{test.score}%</span>
                  </div>
                </td>
                <td className="py-3 text-slate-400">{test.date}</td>
                <td className="py-3">
                  <span className={clsx("badge", test.passed ? "badge-green" : "badge-red")}>
                    {test.passed ? "Passed" : "Failed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
