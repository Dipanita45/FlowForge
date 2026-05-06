"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  FolderOpen,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";

const links = [
  {
    href: "/projects",
    label: "Projects",
    desc: "Track delivery and create new initiatives.",
    icon: FolderOpen,
  },
  {
    href: "/workspace",
    label: "Workspace",
    desc: "See active developers and live activity.",
    icon: Activity,
  },
  {
    href: "/chat",
    label: "Chat",
    desc: "Keep team communication in one place.",
    icon: MessageSquare,
  },
];

const stats = [
  {
    title: "Velocity",
    value: "+18%",
    detail: "Growth over last sprint",
    icon: TrendingUp,
  },
  {
    title: "Deploys",
    value: "24",
    detail: "Successful releases this week",
    icon: Sparkles,
  },
  {
    title: "Incidents",
    value: "2",
    detail: "Minor issues currently open",
    icon: ShieldCheck,
  },
];

const activity = [
  {
    text: "Sprint planning started for Q2 roadmap.",
    time: "2h ago",
  },
  {
    text: "New design review added to Marketing campaign.",
    time: "5h ago",
  },
  {
    text: "Standup summary posted in team chat.",
    time: "Today",
  },
];
  Search,
  TrendingUp,
  Rocket,
  AlertTriangle,
  FolderKanban,
  Users,
  MessageSquare,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const [filter, setFilter] = useState("This Month");

  const user = {
    name: "Anshi",
    role: "admin",
  };

  // ✅ Dynamic chart data based on filter
  const chartData =
    filter === "This Week"
      ? [
          { name: "Mon", value: 10 },
          { name: "Tue", value: 25 },
          { name: "Wed", value: 18 },
          { name: "Thu", value: 40 },
          { name: "Fri", value: 32 },
          { name: "Sat", value: 50 },
          { name: "Sun", value: 45 },
        ]
      : [
          { name: "Week 1", value: 20 },
          { name: "Week 2", value: 35 },
          { name: "Week 3", value: 50 },
          { name: "Week 4", value: 70 },
        ];

  const stats = [
    { title: "Velocity", value: "+18%", icon: TrendingUp },
    { title: "Deploys", value: "24", icon: Rocket },
    { title: "Incidents", value: "2", icon: AlertTriangle },
  ];

  const team = [
    { name: "Alex", img: "https://i.pravatar.cc/40?img=1" },
    { name: "Sam", img: "https://i.pravatar.cc/40?img=2" },
    { name: "Jordan", img: "https://i.pravatar.cc/40?img=3" },
    { name: "Taylor", img: "https://i.pravatar.cc/40?img=4" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-10">
      
      {/* HEADER */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="chip inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Command Center
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Monitor performance, manage projects, and stay in sync with your team.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/projects"
            className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
          >
            + New Sprint
          </Link>
          <Link
            href="/workspace"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Workspace
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div className="bg-teal-100 p-2 rounded-xl text-teal-600">
                  <Icon size={20} />
                </div>
              </div>

              {/* Progress bar (NEW) */}
              <div className="mt-4 h-2 w-full bg-slate-100 rounded-full">
                <div className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 w-[70%]" />
              </div>

              <p className="mt-2 text-xs text-slate-500">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        
        {/* QUICK ACTIONS */}
        <div className="grid gap-5 sm:grid-cols-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-3 rounded-xl text-teal-600 group-hover:bg-teal-100">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {item.label}
                    </h2>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* 🔍 SEARCH */}
        <div className="flex items-center gap-3 w-full max-w-2xl bg-white px-5 py-3 rounded-2xl border shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 transition">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search projects, tasks, or messages..."
            className="w-full outline-none text-sm"
          />
        </div>

        {/* 👋 HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 mt-1">Welcome back, {user.name} 👋</p>
          </div>

          {/* 🟢 ACTION BUTTONS */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
            >
              📁 Projects
            </Link>
            <Link
              href="/workspace"
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition"
            >
              👥 Workspace
            </Link>

            {/* 🔐 ROLE-BASED BUTTON */}
            {user.role === "admin" && (
              <Link
                href="/projects"
                className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition"
              >
                ➕ New Sprint
              </Link>
            )}
          </div>
        </div>

        {/* 📊 STATS */}
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition hover:-translate-y-1"
              >
                <div className="flex justify-between">
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <Icon size={18} className="text-slate-400" />
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* ACTIVITY */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs uppercase text-slate-500">Activity</p>
              <h2 className="text-xl font-semibold text-slate-900">
                Recent Updates
              </h2>
            </div>
            <Clock className="text-slate-400" />
          </div>

          {/* Timeline style */}
          <div className="mt-6 space-y-5">
            {activity.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-teal-500" />
                <div>
                  <p className="text-sm text-slate-700">{item.text}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
        {/* 📈 CHART */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Productivity Analytics
              </h2>
              <p className="text-sm text-slate-500">
                Track your team's performance trends over time
              </p>
            </div>

            {/* ✅ FILTER BUTTONS */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
              {["This Week", "This Month"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-1.5 text-sm rounded-lg transition ${
                    filter === item
                      ? "bg-white shadow text-slate-900"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ FIX: Use inline styles for guaranteed dimensions */}
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📊 INSIGHTS OVERVIEW */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Insights Overview
            </h2>
            <p className="text-sm text-slate-500">
              Key analytics and intelligent recommendations to guide your
              workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 📊 PROJECT INSIGHTS */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-slate-900">
                Project Insights
              </h3>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>✔ 12 tasks completed this week</p>
                <p>✔ 3 projects ahead of schedule</p>
                <p>⚠ 1 project needs attention</p>
              </div>

              <Link
                href="/projects"
                className="mt-5 inline-block text-sm font-medium text-emerald-600 hover:underline"
              >
                View detailed report →
              </Link>
            </div>

            {/* 🤖 AI INSIGHTS */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold">AI Insights 🤖</h3>

              <p className="mt-3 text-sm text-emerald-100">
                Your productivity increased by 18%. Completing pending tasks
                today can further boost efficiency by 10%.
              </p>

              <button className="mt-5 bg-white text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-100 transition">
                View Recommendations
              </button>
            </div>

            {/* 🚧 PROJECTS IN PROGRESS */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-slate-900">
                Projects In Progress
              </h3>

              <div className="mt-4 space-y-4">
                {[
                  { name: "Project Alpha", progress: "70%" },
                  { name: "Client Dashboard", progress: "50%" },
                  { name: "AI Assistant", progress: "85%" },
                ].map((project) => (
                  <div key={project.name}>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>{project.name}</span>
                      <span>{project.progress}</span>
                    </div>

                    <div className="mt-1 h-2 bg-slate-200 rounded-full">
                      <div
                        className="h-2 bg-emerald-500 rounded-full"
                        style={{ width: project.progress }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/projects"
                className="mt-5 inline-block text-sm font-medium text-emerald-600 hover:underline"
              >
                Manage projects →
              </Link>
            </div>
          </div>
        </div>

        {/* 👥 TEAM */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-slate-900">
            Team Members
          </h2>

          <div className="flex gap-5">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.img}
                  className="w-12 h-12 rounded-full border hover:scale-105 transition"
                />
                <p className="text-xs mt-2 text-slate-600">{member.name}</p>
              </div>
            ))}
          </div>
        </div>

          <Link
            href="/chat"
            className="mt-6 inline-flex items-center text-sm font-semibold text-teal-600 hover:underline"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Go to chat
          </Link>
        </div>
      </div>

      {/* EXTRA SECTION (NEW) */}
      <div className="mt-10 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              Boost your team productivity 🚀
            </h2>
            <p className="text-sm opacity-90">
              Plan better sprints and collaborate smarter with your team.
            </p>
          </div>

          <Link
            href="/projects"
            className="bg-white text-teal-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-100"
          >
            Start Planning
          </Link>
        {/* 📌 BOTTOM */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>✔ New sprint created</li>
              <li>✔ Task updated in Project Alpha</li>
              <li>✔ Team member joined workspace</li>
            </ul>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold">Upgrade Workspace 🚀</h2>
            <p className="text-sm mt-2 text-slate-300">
              Unlock advanced analytics, integrations, and priority support.
            </p>

            <button className="mt-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
}

/* 🔹 Buttons */
const btn =
  "rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition";

const btnLight =
  "rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition";

const btnStrong =
  "rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition";

/* 🔹 Card */
function Card({ icon, title, link }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition hover:-translate-y-1">
      <div className="mb-3 text-slate-700">{icon}</div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <Link href={link} className="mt-4 inline-block text-sm hover:underline">
        Open →
      </Link>
    </div>
  );
}
