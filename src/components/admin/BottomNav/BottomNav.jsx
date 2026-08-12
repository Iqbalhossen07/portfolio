"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav({ toggleSidebar, isSidebarOpen }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/iqbal_07", icon: "fa-solid fa-chart-line" },
    { label: "Projects", href: "/iqbal_07/projects", icon: "fa-solid fa-briefcase" },
    { label: "Platforms", href: "/iqbal_07/platforms", icon: "fa-solid fa-layer-group" },
    { label: "Messages", href: "/iqbal_07/messages", icon: "fa-solid fa-envelope" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 z-40 flex items-center justify-around px-2">
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href || (item.href !== "/iqbal_07" && pathname.startsWith(item.href + "/"));
        return (
          <Link
            key={idx}
            href={item.href}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
              isActive ? "text-teal-400" : "text-slate-400 hover:text-white"
            }`}
          >
            <i className={`${item.icon} text-lg`}></i>
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}

      {/* Hamburger Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
          isSidebarOpen ? "text-teal-400" : "text-slate-400 hover:text-white"
        }`}
      >
        <i className="fa-solid fa-bars text-lg"></i>
        <span className="text-[10px] font-bold">Menu</span>
      </button>
    </nav>
  );
}
