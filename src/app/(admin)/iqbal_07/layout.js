import React from "react";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";
import Topbar from "../../../components/admin/Topbar/Topbar";

export const metadata = {
  title: "Admin Dashboard - Iqbal's Portfolio",
  description: "Secure admin area",
  robots: "noindex, nofollow", // Prevent search engines from indexing the admin panel
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
