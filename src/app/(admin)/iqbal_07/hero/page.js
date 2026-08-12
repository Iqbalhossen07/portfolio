"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function HeroSettings() {
  const [formData, setFormData] = useState({ cvText: "Download CV", cvLink: "" });
  const [cvFile, setCvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();
      if (data) {
        setFormData({ 
          cvText: data.cvText || "Download CV", 
          cvLink: data.cvLink || "" 
        });
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
      const submitData = new FormData();
      submitData.append("cvText", formData.cvText);
      submitData.append("cvLink", formData.cvLink);
      if (cvFile) {
        submitData.append("cvFile", cvFile);
      }

      const res = await fetch("/api/hero", {
        method: "PUT",
        body: submitData,
      });
      if (res.ok) {
        Swal.fire({
          title: "Saved!",
          text: "CV settings updated successfully.",
          icon: "success",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#14b8a6",
        });
        fetchHero(); // Refresh to get the new link
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to save CV settings.",
          icon: "error",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#f43f5e",
        });
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
        <h2 className="text-2xl font-black text-white">Hero / CV Settings</h2>
        <p className="text-slate-400 text-sm mt-1">Manage your CV button text and upload your resume</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/5 p-8 rounded-xl">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CV Button Text</label>
          <input required type="text" name="cvText" value={formData.cvText} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="E.g. Download Resume" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upload New CV File (PDF)</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files[0])} className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-teal-500 file:text-teal-950 hover:file:bg-teal-400 cursor-pointer bg-black/20 border border-white/10 rounded-md" />
          <p className="text-xs text-slate-500 mt-2">Uploading a new file will automatically replace your old one.</p>
        </div>
        
        {formData.cvLink && (
          <div className="text-sm text-teal-400">
            <a href={formData.cvLink} target="_blank" rel="noreferrer" className="hover:underline">
              <i className="fa-solid fa-file-pdf mr-2"></i> View Current CV
            </a>
          </div>
        )}

        <div className="pt-4 border-t border-white/10">
          <button type="submit" disabled={isSaving} className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold text-sm rounded-md transition-colors disabled:opacity-50">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
