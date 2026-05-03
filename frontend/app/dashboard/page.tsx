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

export default function Dashboard() {
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
              </Link>
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
              </div>
            ))}
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
        </div>
      </div>
    </div>
  );
}