import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Projects", value: "12", icon: "fa-briefcase", color: "text-teal-400", bg: "bg-teal-400/10" },
    { label: "Messages", value: "4", icon: "fa-envelope", color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 rounded-xl bg-gradient-to-br from-teal-900/40 to-slate-900/40 border border-teal-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-2">Welcome back, Iqbal! 👋</h2>
          <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
            Here's what's happening with your portfolio today. You have 4 unread messages from potential recruiters and contacts.
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/iqbal_07/messages" className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold text-sm rounded-md transition-colors">
              View Messages
            </Link>
            <Link href="/iqbal_07/projects/new" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm rounded-md transition-colors">
              Add New Project
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <i className={`fa-solid ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity placeholder */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/5">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-slate-400"></i> Recent Activity
        </h3>
        <div className="text-center py-12 text-slate-500 text-sm">
          Activity log will appear here once connected to the database.
        </div>
      </div>
    </div>
  );
}
