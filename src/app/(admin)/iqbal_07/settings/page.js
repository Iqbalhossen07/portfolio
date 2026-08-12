"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function UserSettings() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", avatar: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setFormData({ fullName: data.fullName || "", email: data.email || "", password: "", avatar: data.avatar || "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      if (formData.password) {
        data.append("password", formData.password);
      }
      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      const res = await fetch("/api/settings", {
        method: "PUT",
        body: data,
      });
      if (res.ok) {
        Swal.fire({
          title: "Settings Saved!",
          text: "Your profile has been updated successfully.",
          icon: "success",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#14b8a6",
        });
        setFormData(prev => ({ ...prev, password: "" })); // Clear password field after save
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to save settings.",
          icon: "error",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
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
          <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-black text-3xl overflow-hidden relative group">
            {avatarFile ? (
              <img src={URL.createObjectURL(avatarFile)} alt="Avatar Preview" className="w-full h-full object-cover" />
            ) : formData.avatar ? (
              <img src={formData.avatar} alt="Current Avatar" className="w-full h-full object-cover" />
            ) : (
              formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "A"
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <i className="fa-solid fa-camera text-white text-xl"></i>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Profile Picture</h3>
            <p className="text-xs text-slate-500 mt-1">Click the image to upload a new avatar.</p>
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
            <div className="relative w-full max-w-md">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                className="w-full bg-black/20 border border-white/10 rounded-md pl-4 pr-10 py-2.5 text-white focus:outline-none focus:border-teal-500" 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white transition-colors focus:outline-none"
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
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
