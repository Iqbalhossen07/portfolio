"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();
  
  // Format pathname to display a nice title
  const getPageTitle = () => {
    if (pathname === "/iqbal_07") return "Dashboard";
    const segment = pathname.split("/").pop();
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
  };

  return (
    <header className="h-20 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-black text-white">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-300">System Online</span>
        </div>

        <button className="flex items-center gap-3 hover:bg-white/5 px-3 py-2 rounded-md transition-colors border border-transparent hover:border-white/5">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center text-teal-400 font-black">
            IQ
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-bold text-white">Iqbal Hossen</div>
            <div className="text-xs text-slate-500">Super Admin</div>
          </div>
          <i className="fa-solid fa-chevron-down text-xs text-slate-500 ml-2 hidden sm:block"></i>
        </button>
      </div>
    </header>
  );
}
