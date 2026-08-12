"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Failed to fetch user", err));
  }, []);
  
  // Format pathname to display a nice title
  const getPageTitle = () => {
    if (pathname === "/iqbal_07") return "Dashboard";
    const segment = pathname.split("/").pop();
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
  };

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

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 hover:bg-white/5 px-3 py-2 rounded-md transition-colors border border-transparent hover:border-white/5"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="Admin Avatar" className="w-8 h-8 rounded-full border border-teal-500/50 object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center text-teal-400 font-black">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "IQ"}
              </div>
            )}
            
            <div className="text-left hidden sm:block">
              <div className="text-sm font-bold text-white">{user?.fullName || "Iqbal Hossen"}</div>
              <div className="text-xs text-slate-500">{user?.email || "admin@example.com"}</div>
            </div>
            <i className={`fa-solid fa-chevron-down text-xs text-slate-500 ml-2 hidden sm:block transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}></i>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="p-3 border-b border-white/10 sm:hidden">
                <div className="text-sm font-bold text-white truncate">{user?.fullName || "Iqbal Hossen"}</div>
                <div className="text-xs text-slate-500 truncate">{user?.email || "admin@example.com"}</div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
