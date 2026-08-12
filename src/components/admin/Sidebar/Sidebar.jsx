"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        Swal.fire({
          title: "Logged out!",
          icon: "success",
          background: "#1e293b",
          color: "#fff",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/iqbal_07", icon: "fa-solid fa-chart-line" },
    { label: "Hero Settings", href: "/iqbal_07/hero", icon: "fa-solid fa-home" },
    { label: "Projects", href: "/iqbal_07/projects", icon: "fa-solid fa-briefcase" },
    { label: "Platforms", href: "/iqbal_07/platforms", icon: "fa-solid fa-layer-group" },
    { label: "Messages", href: "/iqbal_07/messages", icon: "fa-solid fa-envelope" },
    { label: "Settings", href: "/iqbal_07/settings", icon: "fa-solid fa-cog" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={`fixed md:static inset-y-0 left-0 w-[280px] md:w-64 bg-[#0a0a0a] border-r border-white/10 h-screen flex flex-col z-50 transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <img src="/logo.png" alt="Iqbal Hossen Logo" className="h-10 w-auto object-contain" />
            <p className="text-xs text-slate-400 font-bold tracking-wider mt-2 uppercase">Admin Panel</p>
          </div>
          {/* Mobile Close Button */}
          <button 
            className="md:hidden text-slate-400 hover:text-white p-2"
            onClick={() => setIsMobileOpen(false)}
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href || (item.href !== "/iqbal_07" && pathname.startsWith(item.href + "/"));
          return (
            <Link
              key={idx}
              href={item.href}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
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
        <button 
          onClick={handleLogout} 
          className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-bold transition-all border border-red-500/20"
        >
          <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
          Logout
        </button>
      </div>
      </aside>
    </>
  );
}
