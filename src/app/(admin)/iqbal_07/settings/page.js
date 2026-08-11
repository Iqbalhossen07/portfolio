"use client";
import React, { useEffect, useState } from "react";

export default function UserSettings() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setFormData({ fullName: data.fullName || "", email: data.email || "", password: "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Settings saved successfully!");
        setFormData(prev => ({ ...prev, password: "" })); // Clear password field after save
      } else {
        alert("Failed to save settings.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white">Settings</h2>
        <p className="text-slate-400 text-sm mt-1">Manage your admin profile and credentials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/5 p-8 rounded-xl">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-black text-3xl">
            {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Profile Picture</h3>
            <p className="text-xs text-slate-500 mt-1">Avatar feature coming soon.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
            <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="E.g. Iqbal Hossen" />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="admin@example.com" />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white mb-4">Security</h3>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Password (leave blank to keep current)</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full max-w-md bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="••••••••" />
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={isSaving} className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold text-sm rounded-md transition-colors disabled:opacity-50">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
