"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProject() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "", type: "", category: "Frontend", liveLink: "", githubLink: "", shortDescription: "", year: "", duration: ""
  });
  const [mainImage, setMainImage] = useState(null);

  // Dynamic lists
  const [techs, setTechs] = useState([""]);
  const [features, setFeatures] = useState([""]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleListChange = (index, value, list, setList) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };
  
  const addListItem = (list, setList) => setList([...list, ""]);
  const removeListItem = (index, list, setList) => setList(list.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => submitData.append(key, value));
      
      // Append JSON fields
      submitData.append("techs", JSON.stringify(techs.filter(t => t.trim() !== "")));
      submitData.append("features", JSON.stringify(features.filter(f => f.trim() !== "")));
      
      if (mainImage) submitData.append("mainImage", mainImage);
      
      const res = await fetch("/api/projects", {
        method: "POST",
        body: submitData,
      });
      
      if (res.ok) {
        router.push("/iqbal_07/projects");
      } else {
        alert("Failed to create project");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white">Add New Project</h2>
          <p className="text-slate-400 text-sm mt-1">Create a new portfolio piece</p>
        </div>
        <Link href="/iqbal_07/projects" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-md transition-colors">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/5 p-8 rounded-xl">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Title *</label>
              <input required type="text" name="title" onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="E.g. E-Commerce Platform" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category *</label>
              <select name="category" onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500">
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Short Description</label>
            <textarea name="shortDescription" onChange={handleInputChange} rows="3" className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="Brief summary of the project..."></textarea>
          </div>
        </div>

        {/* Links & Metadata */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Links & Meta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Live URL</label>
              <input type="text" name="liveLink" onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="https://" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">GitHub URL</label>
              <input type="text" name="githubLink" onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="https://github.com/..." />
            </div>
          </div>
        </div>

        {/* Dynamic Lists */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Technologies & Features</h3>
          
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technologies Used</label>
            {techs.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input type="text" value={tech} onChange={(e) => handleListChange(idx, e.target.value, techs, setTechs)} className="flex-1 bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="E.g. React.js" />
                <button type="button" onClick={() => removeListItem(idx, techs, setTechs)} className="w-10 h-10 rounded-md bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20"><i className="fa-solid fa-times"></i></button>
              </div>
            ))}
            <button type="button" onClick={() => addListItem(techs, setTechs)} className="text-xs font-bold text-teal-400 mt-1 hover:text-teal-300"><i className="fa-solid fa-plus mr-1"></i> Add Tech</button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Features</label>
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input type="text" value={feature} onChange={(e) => handleListChange(idx, e.target.value, features, setFeatures)} className="flex-1 bg-black/20 border border-white/10 rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-teal-500" placeholder="Feature description..." />
                <button type="button" onClick={() => removeListItem(idx, features, setFeatures)} className="w-10 h-10 rounded-md bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20"><i className="fa-solid fa-times"></i></button>
              </div>
            ))}
            <button type="button" onClick={() => addListItem(features, setFeatures)} className="text-xs font-bold text-teal-400 mt-1 hover:text-teal-300"><i className="fa-solid fa-plus mr-1"></i> Add Feature</button>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Media</h3>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Main Cover Image *</label>
            <input required type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-teal-500 file:text-teal-950 hover:file:bg-teal-400 cursor-pointer bg-black/20 border border-white/10 rounded-md" />
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-teal-950 font-black text-lg rounded-md transition-colors disabled:opacity-50">
            {isSubmitting ? "Creating Project..." : "Publish Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
