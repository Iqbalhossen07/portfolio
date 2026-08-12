"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/iqbal_07", icon: "fa-solid fa-chart-line" },
    { label: "Hero Settings", href: "/iqbal_07/hero", icon: "fa-solid fa-home" },
    { label: "Projects", href: "/iqbal_07/projects", icon: "fa-solid fa-briefcase" },
    { label: "Platforms", href: "/iqbal_07/platforms", icon: "fa-solid fa-layer-group" },
    { label: "Messages", href: "/iqbal_07/messages", icon: "fa-solid fa-envelope" },
    { label: "Settings", href: "/iqbal_07/settings", icon: "fa-solid fa-cog" },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Iqbal<span className="text-teal-400">.</span>
        </h2>
        <p className="text-xs text-slate-400 font-bold tracking-wider mt-1 uppercase">Admin Panel</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href || (item.href !== "/iqbal_07" && pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 text-sm font-bold ${
                isActive
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <i className={`${item.icon} w-5`}></i>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link href="/" target="_blank" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-bold transition-all border border-white/5">
          <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
          View Live Site
        </Link>
      </div>
    </aside>
  );
}
