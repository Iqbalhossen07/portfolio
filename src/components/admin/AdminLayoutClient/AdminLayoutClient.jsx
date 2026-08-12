"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import BottomNav from "../BottomNav/BottomNav";

export default function AdminLayoutClient({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* Sidebar (Desktop + Mobile Drawer) */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0"> {/* pb-16 for mobile bottom nav space */}
        <Topbar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav 
        toggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
        isSidebarOpen={isMobileSidebarOpen}
      />
    </div>
  );
}
