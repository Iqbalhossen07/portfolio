"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from 'sweetalert2';

export default function EditProject({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "", type: "", category: "Frontend", liveLink: "", githubLink: "", 
    shortDescription: "", year: "", duration: "",
    problemTitle: "", problemDescription: "", solutionTitle: "", solutionDescription: "",
    mainImageUrl: "", galleryUrls: []
  });
  
  const [mainImage, setMainImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [deletedGalleryIds, setDeletedGalleryIds] = useState([]);

  const [techs, setTechs] = useState([{ icon: "", name: "" }]);
  const [features, setFeatures] = useState([{ icon: "", title: "", description: "" }]);
  const [problemPoints, setProblemPoints] = useState([""]);
  const [solutionPoints, setSolutionPoints] = useState([""]);
  const [results, setResults] = useState([{ stats: "", heading: "", description: "" }]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        
        setFormData({
          title: data.title || "",
          type: data.type || "",
          category: data.category || "Frontend",
          liveLink: data.liveLink || "",
          githubLink: data.githubLink || "",
          shortDescription: data.shortDescription || "",
          year: data.year || "",
          duration: data.duration || "",
          problemTitle: data.problemTitle || "",
          problemDescription: data.problemDescription || "",
          solutionTitle: data.solutionTitle || "",
          solutionDescription: data.solutionDescription || "",
          mainImageUrl: data.mainImageUrl || "",
          galleryUrls: Array.isArray(data.gallery) ? data.gallery : []
        });

        if (Array.isArray(data.techs)) setTechs(data.techs.length ? data.techs : [{ icon: "", name: "" }]);
        if (Array.isArray(data.features)) setFeatures(data.features.length ? data.features : [{ icon: "", title: "", description: "" }]);
        if (Array.isArray(data.problemPoints)) setProblemPoints(data.problemPoints.length ? data.problemPoints : [""]);
        if (Array.isArray(data.solutionPoints)) setSolutionPoints(data.solutionPoints.length ? data.solutionPoints : [""]);
        if (Array.isArray(data.results)) setResults(data.results.length ? data.results : [{ stats: "", heading: "", description: "" }]);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleListChange = (index, value, list, setList) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };
  
  const handleObjectListChange = (index, field, value, list, setList) => {
    const newList = [...list];
    newList[index][field] = value;
    setList(newList);
  };
  
  const addListItem = (list, setList, defaultObj = "") => setList([...list, defaultObj]);
  const removeListItem = (index, list, setList) => setList(list.filter((_, i) => i !== index));

  const handleGalleryChange = (e) => {
    if (e.target.files) {
      setGallery(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      ["title", "type", "category", "liveLink", "githubLink", "shortDescription", "year", "duration", "problemTitle", "problemDescription", "solutionTitle", "solutionDescription"].forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      submitData.append("techs", JSON.stringify(techs.filter(t => t.name && t.name.trim() !== "")));
      submitData.append("features", JSON.stringify(features.filter(f => f.title && f.title.trim() !== "")));
      submitData.append("problemPoints", JSON.stringify(problemPoints.filter(p => p.trim() !== "")));
      submitData.append("solutionPoints", JSON.stringify(solutionPoints.filter(s => s.trim() !== "")));
      submitData.append("results", JSON.stringify(results.filter(r => r.heading && r.heading.trim() !== "")));
      
      if (mainImage) submitData.append("mainImage", mainImage);
      
      submitData.append("retainedGallery", JSON.stringify(formData.galleryUrls || []));
      submitData.append("deletedGalleryIds", JSON.stringify(deletedGalleryIds));
      
      gallery.forEach(item => {
         if (item.file) {
            submitData.append("galleryFiles", item.file);
            submitData.append("galleryCaptions", item.caption || "");
         }
      });
      
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: submitData,
      });
      
      if (res.ok) {
        Swal.fire({
          title: 'Updated!',
          text: 'Project has been updated successfully.',
          icon: 'success',
          confirmButtonColor: '#14b8a6',
          background: '#0f172a',
          color: '#fff'
        }).then(() => {
          router.push("/iqbal_07/projects");
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update project.',
          icon: 'error',
          confirmButtonColor: '#14b8a6',
          background: '#0f172a',
          color: '#fff'
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepHeader = ({ step, title, icon }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400">
        <i className={`${icon} text-xl`}></i>
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Step {step}</p>
        <h3 className="text-xl font-black text-white">{title}</h3>
      </div>
    </div>
  );

  if (isLoading) return <div className="text-white p-8">Loading project...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 drop-shadow-sm">Edit <span className="text-teal-400">Case Study</span></h2>
        <Link href="/iqbal_07/projects" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-full transition-colors border border-white/10 flex items-center gap-2">
          <i className="fa-solid fa-arrow-left"></i> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* STEP 01: Basic Essentials */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-300 p-8 md:p-10">
          <StepHeader step="01" title="Basic Essentials" icon="fa-solid fa-rocket" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="Project Title" />
                <input type="text" name="type" value={formData.type} onChange={handleInputChange} className="w-full w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="Type (App, UI/UX)" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="url" name="liveLink" value={formData.liveLink} onChange={handleInputChange} className="w-full w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="Live Link" />
                <input type="url" name="githubLink" value={formData.githubLink} onChange={handleInputChange} className="w-full w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="GitHub Link" />
              </div>
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} rows="5" className="w-full w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="Short Description"></textarea>
            </div>
            
            <div className="flex flex-col">
              <p className="text-xs font-bold text-slate-400 italic mb-2">Feature Banner (Cover Image)</p>
              <div className="flex-1 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 bg-slate-900/50 hover:bg-slate-800/60 transition-all duration-300 shadow-inner group-hover:border-teal-500/50 relative group overflow-hidden">
                <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                
                {!mainImage && formData.mainImageUrl ? (
                   <img src={formData.mainImageUrl} alt="Current" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-10 transition-opacity" />
                ) : null}

                <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
                  <i className="fa-solid fa-cloud-arrow-up text-2xl text-teal-950"></i>
                </div>
                <span className="text-teal-500 font-black tracking-widest text-xs uppercase relative z-10">Upload Image</span>
                {mainImage && <div className="mt-4 text-sm text-white font-bold relative z-10">{mainImage.name}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 02: Timeline & Category */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-300 p-8 md:p-10">
          <StepHeader step="02" title="Timeline & Category" icon="fa-solid fa-calendar" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="year" value={formData.year} onChange={handleInputChange} className="w-full w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="Year (e.g. 2026)" />
              <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="Duration (e.g. 3 Months)" />
            </div>
            <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="Category (e.g. Frontend)" />
          </div>
        </div>

        {/* STEP 03: The Problem */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-300 p-8 md:p-10">
          <StepHeader step="03" title="The Problem" icon="fa-solid fa-circle-exclamation" />
          <div className="space-y-4">
            <input type="text" name="problemTitle" value={formData.problemTitle} onChange={handleInputChange} className="w-full w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="Problem Heading" />
            
            <div className="bg-black/20 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-black/40 border-b border-white/10 px-4 py-2 flex items-center gap-4 text-slate-400">
                <div className="flex items-center gap-2"><i className="fa-solid fa-rotate-left hover:text-white cursor-pointer"></i> <i className="fa-solid fa-rotate-right hover:text-white cursor-pointer"></i></div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="font-bold text-xs">Paragraph <i className="fa-solid fa-chevron-down ml-1"></i></div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-bold hover:text-white cursor-pointer"></i>
                  <i className="fa-solid fa-italic hover:text-white cursor-pointer"></i>
                  <i className="fa-solid fa-link hover:text-white cursor-pointer"></i>
                  <i className="fa-solid fa-image hover:text-white cursor-pointer"></i>
                </div>
              </div>
              <textarea name="problemDescription" value={formData.problemDescription} onChange={handleInputChange} rows="6" className="w-full bg-transparent px-5 py-4 text-white focus:outline-none" placeholder="Describe the problem..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {problemPoints.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input type="text" value={pt} onChange={(e) => handleListChange(idx, e.target.value, problemPoints, setProblemPoints)} className="flex-1 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 shadow-inner focus:ring-2 focus:ring-teal-500/40 text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder={`Point ${idx + 1}`} />
                  <button type="button" onClick={() => removeListItem(idx, problemPoints, setProblemPoints)} className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform bg-red-400/10 hover:bg-red-400/20 w-8 h-8 flex items-center justify-center rounded-full"><i className="fa-solid fa-trash"></i></button>
                </div>
              ))}
              <button type="button" onClick={() => addListItem(problemPoints, setProblemPoints)} className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 text-xs px-4 py-2.5 rounded-full transition-colors mt-2">
                <i className="fa-solid fa-plus mr-1"></i> Add Problem Point
              </button>
            </div>
          </div>
        </div>

        {/* STEP 04: The Solution */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-300 p-8 md:p-10">
          <StepHeader step="04" title="The Solution" icon="fa-solid fa-lightbulb" />
          <div className="space-y-4">
            <input type="text" name="solutionTitle" value={formData.solutionTitle} onChange={handleInputChange} className="w-full w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all duration-300 placeholder-slate-500 shadow-inner" placeholder="Solution Heading" />
            
            <div className="bg-black/20 border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-black/40 border-b border-white/10 px-4 py-2 flex items-center gap-4 text-slate-400">
                <div className="flex items-center gap-2"><i className="fa-solid fa-rotate-left hover:text-white cursor-pointer"></i> <i className="fa-solid fa-rotate-right hover:text-white cursor-pointer"></i></div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="font-bold text-xs">Paragraph <i className="fa-solid fa-chevron-down ml-1"></i></div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-bold hover:text-white cursor-pointer"></i>
                  <i className="fa-solid fa-italic hover:text-white cursor-pointer"></i>
                  <i className="fa-solid fa-link hover:text-white cursor-pointer"></i>
                </div>
              </div>
              <textarea name="solutionDescription" value={formData.solutionDescription} onChange={handleInputChange} rows="6" className="w-full bg-transparent px-5 py-4 text-white focus:outline-none" placeholder="Describe the solution..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {solutionPoints.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input type="text" value={pt} onChange={(e) => handleListChange(idx, e.target.value, solutionPoints, setSolutionPoints)} className="flex-1 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 shadow-inner focus:ring-2 focus:ring-teal-500/40 text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder={`Point ${idx + 1}`} />
                  <button type="button" onClick={() => removeListItem(idx, solutionPoints, setSolutionPoints)} className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform bg-red-400/10 hover:bg-red-400/20 w-8 h-8 flex items-center justify-center rounded-full"><i className="fa-solid fa-trash"></i></button>
                </div>
              ))}
              <button type="button" onClick={() => addListItem(solutionPoints, setSolutionPoints)} className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 text-xs px-4 py-2.5 rounded-full transition-colors mt-2">
                <i className="fa-solid fa-plus mr-1"></i> Add Solution Point
              </button>
            </div>
          </div>
        </div>

        {/* STEP 05: Tech Stack */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-300 p-8 md:p-10">
          <StepHeader step="05" title="Tech Stack" icon="fa-solid fa-layer-group" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techs.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-800/40 border border-white/10 rounded-xl overflow-hidden p-3 shadow-lg hover:border-white/20 transition-colors flex flex-col gap-2">
                   <input type="text" value={tech.icon} onChange={(e) => handleObjectListChange(idx, "icon", e.target.value, techs, setTechs)} className="w-full bg-transparent border-b border-white/10 pb-2 text-sm text-white focus:outline-none placeholder-slate-500" placeholder="Icon (fa-react)" />
                   <input type="text" value={tech.name} onChange={(e) => handleObjectListChange(idx, "name", e.target.value, techs, setTechs)} className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500" placeholder="Tech (React)" />
                </div>
                <button type="button" onClick={() => removeListItem(idx, techs, setTechs)} className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform bg-red-400/10 hover:bg-red-400/20 w-8 h-8 flex items-center justify-center rounded-full"><i className="fa-solid fa-trash"></i></button>
              </div>
            ))}
            </div>
            <button type="button" onClick={() => addListItem(techs, setTechs, { icon: "", name: "" })} className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 text-xs px-4 py-2.5 rounded-full transition-colors mt-4">
              <i className="fa-solid fa-plus mr-1"></i> Add New Tech
            </button>
          </div>
        </div>

        {/* STEP 06: Key Features */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-300 p-8 md:p-10">
          <StepHeader step="06" title="Key Features" icon="fa-solid fa-bolt" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="w-full bg-slate-800/40 border border-white/10 rounded-xl p-4 shadow-lg hover:border-white/20 transition-colors flex gap-3 relative">
                 <button type="button" onClick={() => removeListItem(idx, features, setFeatures)} className="absolute top-4 right-4 text-red-400 hover:text-red-300 hover:scale-110 transition-transform bg-red-400/10 hover:bg-red-400/20 w-8 h-8 flex items-center justify-center rounded-full"><i className="fa-solid fa-trash"></i></button>
                 <div className="w-full space-y-3">
                    <div className="flex gap-3">
                      <input type="text" value={feature.icon} onChange={(e) => handleObjectListChange(idx, "icon", e.target.value, features, setFeatures)} className="w-1/3 bg-transparent border-b border-white/10 pb-2 text-sm text-white focus:outline-none focus:border-teal-500" placeholder="Icon Class" />
                      <input type="text" value={feature.title} onChange={(e) => handleObjectListChange(idx, "title", e.target.value, features, setFeatures)} className="flex-1 bg-transparent border-b border-white/10 pb-2 text-sm text-white focus:outline-none focus:border-teal-500" placeholder="Feature Title" />
                    </div>
                    <textarea value={feature.description} onChange={(e) => handleObjectListChange(idx, "description", e.target.value, features, setFeatures)} rows="2" className="w-full bg-black/20 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-teal-500" placeholder="Short description..."></textarea>
                 </div>
              </div>
            ))}
            </div>
            <button type="button" onClick={() => addListItem(features, setFeatures, { icon: "", title: "", description: "" })} className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 text-xs px-4 py-2.5 rounded-full transition-colors mt-2">
              <i className="fa-solid fa-plus mr-1"></i> Add New Feature
            </button>
          </div>
        </div>

        {/* STEP 07: Project Gallery */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-300 p-8 md:p-10">
          <StepHeader step="07" title="Project Gallery" icon="fa-solid fa-image" />
          
          <div className="space-y-4">
             {formData.galleryUrls && formData.galleryUrls.length > 0 && (
                <div className="mb-6 p-6 bg-black/20 border border-white/10 rounded-xl">
                  <span className="text-xs font-bold text-slate-400 mb-4 block">Current Gallery ({formData.galleryUrls.length} images):</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.galleryUrls.map((urlObj, idx) => (
                       <div key={idx} className="relative group rounded-md overflow-hidden border border-white/10 hover:border-red-500/50 transition-colors">
                          <img src={urlObj.url} alt="Gallery" className="w-full h-32 object-cover" />
                          <div className="p-2 bg-black/60 absolute bottom-0 left-0 right-0">
                             <p className="text-xs text-white truncate">{urlObj.caption || "No caption"}</p>
                          </div>
                          <button type="button" onClick={() => {
                              const confirmDelete = window.confirm("Remove this image from gallery?");
                              if (confirmDelete) {
                                  if (urlObj.id) setDeletedGalleryIds([...deletedGalleryIds, urlObj.id]);
                                  const newUrls = [...formData.galleryUrls];
                                  newUrls.splice(idx, 1);
                                  setFormData({ ...formData, galleryUrls: newUrls });
                              }
                          }} className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <i className="fa-solid fa-trash text-xs"></i>
                          </button>
                       </div>
                    ))}
                  </div>
                  <p className="text-xs text-teal-400 mt-4"><i className="fa-solid fa-circle-info"></i> These images will be kept unless you remove them. New uploads below will be added to the gallery.</p>
                </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {gallery.map((item, idx) => (
                  <div key={item.id} className="w-full bg-slate-800/40 border border-white/10 rounded-xl p-4 shadow-lg hover:border-white/20 transition-colors flex flex-col gap-3 relative">
                     <button type="button" onClick={() => {
                        const newG = [...gallery];
                        newG.splice(idx, 1);
                        setGallery(newG);
                     }} className="absolute top-4 right-4 text-red-400 hover:text-red-300 hover:scale-110 transition-transform bg-red-400/10 hover:bg-red-400/20 w-8 h-8 flex items-center justify-center rounded-full z-20"><i className="fa-solid fa-trash"></i></button>
                     
                     <div className="w-full h-40 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-800/60 transition-all duration-300 shadow-inner group-hover:border-teal-500/50 relative group overflow-hidden">
                        <input type="file" accept="image/*" onChange={(e) => {
                           const newG = [...gallery];
                           newG[idx].file = e.target.files[0];
                           setGallery(newG);
                        }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        
                        {item.file ? (
                           <div className="text-teal-400 font-bold z-10 text-center px-4 break-all">{item.file.name}</div>
                        ) : (
                           <>
                              <i className="fa-solid fa-camera text-3xl text-slate-500 mb-2 group-hover:scale-110 transition-transform"></i>
                              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Upload New Image</span>
                           </>
                        )}
                     </div>
                     <input type="text" value={item.caption} onChange={(e) => {
                        const newG = [...gallery];
                        newG[idx].caption = e.target.value;
                        setGallery(newG);
                     }} className="w-full bg-transparent border-b border-white/10 pb-2 text-sm text-white focus:outline-none focus:border-teal-500" placeholder="Gallery Caption" />
                  </div>
               ))}
             </div>
             <button type="button" onClick={() => setGallery([...gallery, { id: Date.now(), file: null, caption: "" }])} className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 text-xs px-4 py-2.5 rounded-full transition-colors mt-2">
               <i className="fa-solid fa-plus mr-1"></i> Add Gallery Image
             </button>
          </div>
        </div>

        {/* STEP 08: Results & Impact */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-300 p-8 md:p-10">
          <StepHeader step="08" title="Results & Impact" icon="fa-solid fa-chart-line" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((result, idx) => (
                 <div key={idx} className="flex flex-col items-start gap-4 p-6 bg-black/20 border border-white/10 rounded-xl relative">
                    <button type="button" onClick={() => removeListItem(idx, results, setResults)} className="absolute top-4 right-4 text-red-400 hover:text-red-300 hover:scale-110 transition-transform bg-red-400/10 hover:bg-red-400/20 w-8 h-8 flex items-center justify-center rounded-full"><i className="fa-solid fa-trash"></i></button>
                    <div className="w-full flex justify-center">
                       <input type="text" value={result.stats} onChange={(e) => handleObjectListChange(idx, "stats", e.target.value, results, setResults)} className="w-full max-w-[200px] bg-transparent text-teal-400 font-black text-xl text-center focus:outline-none placeholder-teal-800" placeholder="99% / 10k+" />
                    </div>
                    <div className="w-full space-y-3">
                       <input type="text" value={result.heading} onChange={(e) => handleObjectListChange(idx, "heading", e.target.value, results, setResults)} className="w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 shadow-inner focus:ring-2 focus:ring-teal-500/40 text-sm text-white focus:outline-none focus:border-teal-500" placeholder="Result Heading" />
                       <input type="text" value={result.description} onChange={(e) => handleObjectListChange(idx, "description", e.target.value, results, setResults)} className="w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 shadow-inner focus:ring-2 focus:ring-teal-500/40 text-sm text-white focus:outline-none focus:border-teal-500" placeholder="Short description..." />
                    </div>
                 </div>
              ))}
            </div>
            <button type="button" onClick={() => addListItem(results, setResults, { stats: "", heading: "", description: "" })} className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transform hover:-translate-y-0.5 text-xs px-4 py-2.5 rounded-full transition-colors mt-2">
              <i className="fa-solid fa-plus mr-1"></i> Add New Result Card
            </button>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button type="submit" disabled={isSubmitting} className="bg-[#00a884] hover:bg-[#008f6f] text-white font-black text-sm px-8 py-4 rounded-full transition-colors disabled:opacity-50 flex items-center gap-2">
            {isSubmitting ? "Saving..." : "Save Changes"} <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>

      </form>
    </div>
  );
}
