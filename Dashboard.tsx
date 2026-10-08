"use client";
import React from "react";
import {
  TrendingUp,
  Flame,
  ClipboardCheck,
  Target,
  BookOpen,
  Layers,
  ChevronRight,
  Award,
  Zap,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import {
  DUMMY_USER,
  SKILL_DATA,
  RECENT_TESTS,
  RECOMMENDATIONS,
} from "@/data/dummyData";
import clsx from "clsx";

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  sub?: string;
}) => (
  <div className="card flex items-start gap-4">
    <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", color)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

export default function Dashboard() {
  const { t, lang } = useLanguage();
  const { setActiveView, setExamData } = useApp();

  const handleStartTest = () => {
    setExamData({ level: "A1", section: "reading", duration: 20 * 60 });
    setActiveView("exam");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-purple-600 p-6 text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">{t("dash.welcome")}</h2>
          <p className="text-brand-100 mt-1 text-sm">{t("dash.subtitle")}</p>
          <div className="mt-4 flex items-center gap-3">
            <button onClick={handleStartTest} className="bg-white text-brand-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-brand-50 transition-all">
              {t("dash.start_test")}
            </button>
            <button onClick={() => setActiveView("learning")} className="bg-white/20 text-white font-semibold px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition-all">
              {t("dash.continue_lesson")}
            </button>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -right-2 top-12 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute right-24 -bottom-6 w-32 h-32 bg-purple-500/30 rounded-full" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label={t("dash.overall_progress")} value={`${DUMMY_USER.overallProgress}%`} color="bg-brand-500" sub="A1 → A2 journey" />
        <StatCard icon={Flame} label={t("dash.streak")} value={DUMMY_USER.streak} color="bg-orange-500" sub="days in a row 🔥" />
        <StatCard icon={ClipboardCheck} label={t("dash.tests_taken")} value={DUMMY_USER.totalTests} color="bg-purple-500" sub="all time" />
        <StatCard icon={Target} label={t("dash.avg_score")} value={`${DUMMY_USER.avgScore}%`} color="bg-green-500" sub="last 10 tests" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Radar */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">{t("dash.skills_analysis")}</h3>
            <span className="badge badge-blue text-xs">Live Data</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={SKILL_DATA}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "#64748b" }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.15}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                formatter={(val) => [`${val}%`, "Score"]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Score Breakdown</h3>
            <span className="badge badge-purple text-xs">By Skill</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={SKILL_DATA} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="skill" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                formatter={(val) => [`${val}%`, "Score"]}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {SKILL_DATA.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tests & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tests */}
        <div className="card">
          <h3 className="font-bold text-slate-800 mb-4">{t("dash.recent_tests")}</h3>
          <div className="space-y-3">
            {RECENT_TESTS.map((test) => (
              <div key={test.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all cursor-pointer">
                <div className={clsx(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0",
                  test.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {test.level}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{test.section}</p>
                  <p className="text-xs text-slate-400">{test.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={clsx("font-bold text-lg", test.passed ? "text-green-600" : "text-red-500")}>
                    {test.score}%
                  </p>
                  <span className={clsx("badge text-[10px]", test.passed ? "badge-green" : "badge-red")}>
                    {test.passed ? "Pass" : "Fail"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Targeted Recommendations */}
        <div className="card">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-brand-600" />
            <h3 className="font-bold text-slate-800">{t("dash.recommendations")}</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">{t("dash.rec_subtitle")}</p>
          <div className="space-y-3">
            {RECOMMENDATIONS.map((rec) => (
              <div key={rec.id} className="flex items-start gap-3 p-3 border border-slate-100 rounded-xl hover:border-brand-200 hover:bg-brand-50/50 transition-all cursor-pointer group">
                <div className={clsx(
                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                  rec.urgency === "high" ? "bg-red-100" : rec.urgency === "medium" ? "bg-yellow-100" : "bg-green-100"
                )}>
                  {rec.type === "listening" ? "🎧" : rec.type === "writing" ? "✍️" : "📚"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-800 text-sm">
                      {lang === "bn" ? rec.titleBn : rec.title}
                    </p>
                    <span className={clsx("badge text-[10px] flex-shrink-0",
                      rec.urgency === "high" ? "badge-red" : rec.urgency === "medium" ? "badge-yellow" : "badge-green"
                    )}>
                      {rec.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {lang === "bn" ? rec.reasonBn : rec.reason}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 flex-shrink-0 mt-1 transition-colors" />
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveView("learning")}
            className="w-full mt-4 btn-primary text-sm text-center"
          >
            {t("dash.study_now")}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="font-bold text-slate-800 mb-4">{t("dash.quick_actions")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "📖", label: t("dash.start_test"), action: handleStartTest, color: "from-brand-500 to-brand-700" },
            { icon: "🃏", label: t("dash.review_flash"), action: () => setActiveView("flashcards"), color: "from-purple-500 to-purple-700" },
            { icon: "📚", label: t("dash.continue_lesson"), action: () => setActiveView("learning"), color: "from-green-500 to-green-700" },
            { icon: "📊", label: "View Progress", action: () => setActiveView("progress"), color: "from-orange-500 to-orange-700" },
          ].map((action, idx) => (
            <button
              key={idx}
              onClick={action.action}
              className={clsx(
                "flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br text-white font-semibold text-sm",
                "hover:scale-105 transition-all duration-200 active:scale-95",
                action.color
              )}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-center text-xs leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
