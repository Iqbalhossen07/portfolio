"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getIconClass } from "@/lib/iconUtils";
import { useParams } from "next/navigation";
import Breadcrumb from "../Projects/Breadcrumb/Breadcrumb";

const ProjectDetails = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Project not found");
        const data = await res.json();
        setProjectData(data);
      } catch (error) {
        console.error("Failed to fetch project", error);
        setProjectData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
           <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
           <p className="text-slate-400 font-bold tracking-wider">LOADING PROJECT...</p>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
        <h1 className="text-4xl font-black mb-4">404 - Project Not Found</h1>
        <Link href="/projects" className="text-teal-400 hover:underline font-bold">Back to Projects</Link>
      </div>
    );
  }

  const parseJson = (val, defaultVal = []) => {
    if (!val) return defaultVal;
    if (typeof val === "string") {
      try { return JSON.parse(val); } catch(e) { return defaultVal; }
    }
    return val;
  };

  const problemPoints = parseJson(projectData.problemPoints);
  const solutionPoints = parseJson(projectData.solutionPoints);
  const techStack = parseJson(projectData.techs);
  const whatIDid = parseJson(projectData.features);
  const results = parseJson(projectData.results);
  const gallery = parseJson(projectData.gallery);

  const project = {
    title: projectData.title,
    tagline: projectData.shortDescription || "",
    category: projectData.type || projectData.category || "Project",
    year: projectData.year || new Date().getFullYear().toString(),
    duration: projectData.duration || "",
    status: projectData.liveLink ? "Live" : "Completed",
    cover: projectData.mainImageUrl || "",
    live_url: projectData.liveLink || "#",
    github_url: projectData.githubLink || "#",
    gfrom: "#3b82f6",
    gto: "#7c3aed",
    glow: "rgba(59,130,246,0.4)",
    problem: {
      headline: projectData.problemTitle || "The Problem",
      body: projectData.problemDescription || "",
      pains: problemPoints,
    },
    solution: {
      headline: projectData.solutionTitle || "The Solution",
      body: projectData.solutionDescription || "",
      points: solutionPoints,
    },
    tech_stack: techStack.map(t => ({
      name: t.name,
      icon: t.icon,
      role: "", 
      color: "#14b8a6", 
      bg: "rgba(20,184,166,0.1)", 
    })),
    what_i_did: whatIDid.map((f, i) => {
      const gradients = [
        { from: "#3b82f6", to: "#06b6d4" },
        { from: "#7c3aed", to: "#a855f7" },
        { from: "#10b981", to: "#059669" },
        { from: "#f59e0b", to: "#ea580c" },
        { from: "#ec4899", to: "#be185d" },
      ];
      const g = gradients[i % gradients.length];
      return {
        num: String(i + 1).padStart(2, "0"),
        icon: f.icon,
        title: f.title,
        desc: f.description,
        gfrom: g.from,
        gto: g.to,
      };
    }),
    gallery: gallery.map(img => img.url),
    results: results.map(r => ({
      num: r.stats,
      label: r.heading,
      desc: r.description,
      gfrom: "#3b82f6",
      gto: "#06b6d4",
    }))
  };

  const metas = [
    { label: "Category", value: project.category, icon: "fa-layer-group" },
    { label: "Year", value: project.year, icon: "fa-calendar" },
    { label: "Duration", value: project.duration, icon: "fa-clock" },
    { label: "Status", value: project.status, icon: "fa-circle-check" },
  ];

  return (
    <main className=" min-h-screen">
      <Breadcrumb title={project.title} pageName="Project Details" />

      <div
        className="fixed top-0 right-0 w-[700px] h-[700px] rounded-none blur-[220px] pointer-events-none opacity-[0.08] -z-0"
        style={{ background: project.gfrom }}
      ></div>
      <div
        className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-none blur-[200px] pointer-events-none opacity-[0.08] -z-0"
        style={{ background: project.gto }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-20 relative z-10 flex flex-col gap-24">
        <div className="flex flex-col gap-6 md:gap-8">
          <div
            className="relative rounded-md overflow-hidden group"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-[350px] sm:h-[450px] md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
              }}
            ></div>

            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 rounded-md text-[10px] font-black"
                    style={{
                      background: "rgba(0,0,0,0.6)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-black"
                    style={{
                      background: "rgba(20, 184, 166, 0.15)",
                      border: "1px solid rgba(20, 184, 166, 0.3)",
                      color: "#2dd4bf",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-none bg-teal-400 animate-pulse inline-block"></span>
                    {project.status}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black text-white leading-tight tracking-tight">
                  {project.title}
                </h2>
              </div>

              <div className="flex flex-row gap-3 w-full md:w-auto">
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-md font-black text-xs text-white transition-all active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                    boxShadow: "0 10px 20px -5px rgba(20, 184, 166, 0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  <span className="whitespace-nowrap">Live Demo</span>
                </a>
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-md font-black text-xs text-white transition-all active:scale-95 border border-white/20 bg-white/10 backdrop-blur-md"
                >
                  <i className="fa-brands fa-github text-sm"></i>
                  <span className="whitespace-nowrap">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {metas.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 md:p-4 rounded-md transition-all duration-300 hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="w-8 h-8 md:w-9 md:h-9 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(20, 184, 166, 0.1)",
                    border: "1px solid rgba(20, 184, 166, 0.25)",
                  }}
                >
                  <i
                    className={`fa-solid ${m.icon} text-teal-400 text-[10px] md:text-xs`}
                  ></i>
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-slate-600 truncate">
                    {m.label}
                  </div>
                  <div className="text-[11px] md:text-sm font-black text-white mt-0.5 truncate">
                    {m.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== STEP 1 — PROBLEM ==================== */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0 transition-transform duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                boxShadow:
                  "0 6px 20px rgba(249, 115, 22, 0.3), 0 1px 0 rgba(255,255,255,0.2) inset",
              }}
            >
              <i className="fa-solid fa-triangle-exclamation text-white text-base"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/80">
                Step 01
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                The Problem
              </h2>
            </div>
            <div
              className="flex-1 h-px ml-4"
              style={{
                background:
                  "linear-gradient(to right, rgba(249, 115, 22, 0.25), transparent)",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <div
              className="rounded-md p-8 relative overflow-hidden transition-all duration-300 hover:border-white/20"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div
                className="absolute -top-10 -left-10 w-44 h-44 rounded-none blur-[70px] opacity-[0.08] pointer-events-none"
                style={{ background: "#f97316" }}
              ></div>
              <h3 className="text-xl font-black text-white mb-4">
                {project.problem.headline}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {project.problem.body}
              </p>
            </div>

            <div
              className="rounded-md p-6 relative overflow-hidden flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-1">
                Pain Points
              </div>
              {project.problem.pains.map((pain, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300"
                    style={{
                      background: "rgba(249, 115, 22, 0.1)",
                      border: "1px solid rgba(249, 115, 22, 0.25)",
                    }}
                  >
                    <i className="fa-solid fa-xmark text-[9px] text-orange-500"></i>
                  </div>
                  <span className="text-sm font-semibold text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-200">
                    {pain}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== STEP 2 — SOLUTION ==================== */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0 transition-transform duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #14b8a6, #2563eb)",
                boxShadow:
                  "0 6px 20px rgba(20, 184, 166, 0.3), 0 1px 0 rgba(255,255,255,0.25) inset",
              }}
            >
              <i className="fa-solid fa-lightbulb text-white text-base"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-500">
                Step 02
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                The Solution
              </h2>
            </div>
            <div
              className="flex-1 h-px ml-4"
              style={{
                background:
                  "linear-gradient(to right, rgba(20, 184, 166, 0.25), transparent)",
              }}
            ></div>
          </div>

          <div
            className="rounded-md p-8 relative overflow-hidden transition-all duration-300 hover:border-white/20"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="absolute -top-10 -right-10 w-48 h-48 rounded-none blur-[70px] opacity-[0.08] pointer-events-none"
              style={{ background: "#14b8a6" }}
            ></div>
            <h3 className="text-xl font-black text-white mb-4">
              {project.solution.headline}
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              {project.solution.body}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.solution.points && project.solution.points.map((p, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-5 rounded-md relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6, #2563eb)",
                    boxShadow:
                      "0 4px 14px rgba(20, 184, 166, 0.25), 0 1px 0 rgba(255,255,255,0.2) inset",
                  }}
                >
                  <i className={`fa-solid fa-check text-white text-sm`}></i>
                </div>
                <div className="min-w-0 flex items-center">
                  <div className="text-sm text-slate-300 leading-relaxed">
                    {p}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== STEP 3 — TECH STACK ==================== */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0 transition-transform duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #14b8a6, #2563eb)",
                boxShadow:
                  "0 6px 20px rgba(20, 184, 166, 0.3), 0 1px 0 rgba(255,255,255,0.25) inset",
              }}
            >
              <i className="fa-solid fa-microchip text-white text-base"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-500">
                Step 03
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Tech Stack
              </h2>
            </div>
            <div
              className="flex-1 h-px ml-4"
              style={{
                background:
                  "linear-gradient(to right, rgba(20, 184, 166, 0.25), transparent)",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.tech_stack.map((tech, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 py-6 px-4 rounded-md text-center group transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-20"
                  style={{
                    background: tech.bg,
                    border: `1px solid ${tech.color}33`,
                  }}
                >
                  <i
                    className={`${getIconClass(tech.icon)} text-[28px]`}
                    style={{ color: "#14b8a6" }}
                  ></i>
                </div>
                <div>
                  <div className="text-sm font-black text-white group-hover:text-teal-400 transition-colors duration-200">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                    {tech.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== STEP 4 — WHAT I DID ==================== */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0 transition-transform duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #14b8a6, #059669)",
                boxShadow:
                  "0 6px 20px rgba(16, 185, 129, 0.3), 0 1px 0 rgba(255, 255, 255, 0.25) inset",
              }}
            >
              <i className="fa-solid fa-code text-white text-base"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-500">
                Step 04
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                What I Built
              </h2>
            </div>
            <div
              className="flex-1 h-px ml-4"
              style={{
                background:
                  "linear-gradient(to right, rgba(16, 185, 129, 0.25), transparent)",
              }}
            ></div>
          </div>

          <div className="flex flex-col gap-4">
            {project.what_i_did.map((wi, idx) => (
              <div
                key={idx}
                className="flex gap-6 p-6 rounded-md relative overflow-hidden group transition-all duration-300 hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="absolute -top-8 -right-8 w-36 h-36 rounded-none blur-[55px] opacity-[0.06] group-hover:opacity-[0.14] transition-opacity duration-500 pointer-events-none"
                  style={{ background: wi.gfrom }}
                ></div>
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:rotate-6"
                    style={{
                      background: `linear-gradient(135deg,${wi.gfrom},${wi.gto})`,
                      boxShadow: `0 6px 18px ${wi.gfrom}44, 0 1px 0 rgba(255,255,255,0.2) inset`,
                    }}
                  >
                    <i className={`${getIconClass(wi.icon)} text-white text-sm`}></i>
                  </div>
                  <span
                    className="text-[10px] font-black tracking-widest uppercase"
                    style={{ color: wi.gfrom }}
                  >
                    {wi.num}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-black text-white mb-2 group-hover:text-teal-400 transition-colors duration-200">
                    {wi.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {wi.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== GALLERY ==================== */}
        {project.gallery.length > 0 && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0 transition-transform duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #f97316, #f59e0b)",
                  boxShadow:
                    "0 6px 20px rgba(245, 158, 11, 0.3), 0 1px 0 rgba(255, 255, 255, 0.25) inset",
                }}
              >
                <i className="fa-solid fa-images text-white text-base"></i>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
                  Gallery
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  Screenshots
                </h2>
              </div>
              <div
                className="flex-1 h-px ml-4"
                style={{
                  background:
                    "linear-gradient(to right, rgba(245, 158, 11, 0.25), transparent)",
                }}
              ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className="rounded-md overflow-hidden group relative transition-all duration-300 hover:border-white/20 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 flex items-center justify-center">
                    <i className="fa-solid fa-magnifying-glass-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0"></i>
                  </div>
                  <img
                    src={img}
                    alt="Screenshot"
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110 relative z-0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== STEP 5 — RESULTS ==================== */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-md flex-shrink-0 transition-transform duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #14b8a6, #2563eb)",
                boxShadow:
                  "0 6px 20px rgba(20, 184, 166, 0.3), 0 1px 0 rgba(255, 255, 255, 0.25) inset",
              }}
            >
              <i className="fa-solid fa-chart-line text-white text-base"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">
                Step 05
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Results & Impact
              </h2>
            </div>
            <div
              className="flex-1 h-px ml-4"
              style={{
                background:
                  "linear-gradient(to right, rgba(20, 184, 166, 0.25), transparent)",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.results.map((r, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-8 px-4 rounded-md text-center relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${r.gfrom || '#14b8a6'}44` }}
                ></div>
                <div
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${r?.gfrom || '#14b8a6'}, ${r?.gto || '#059669'})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {r?.stats || r?.num || r?.heading || (typeof r === 'string' ? r : '')}
                </div>
                <div className="text-sm font-black text-white mb-1 group-hover:text-teal-400 transition-colors duration-200">
                  {r?.heading || r?.label || ''}
                </div>
                <div className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  {r?.description || r?.desc || ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== BOTTOM NAV ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-8">
          <Link href="/projects"
            className="flex items-center gap-4 p-6 rounded-md group transition-all duration-200 hover:-translate-x-1"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <i className="fa-solid fa-arrow-left text-white text-sm"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                Back to
              </div>
              <div className="text-sm font-black text-white group-hover:text-teal-400 transition-colors duration-200">
                All Projects
              </div>
            </div>
          </Link>

          <Link href="/contact"
            className="flex items-center justify-between gap-4 p-6 rounded-md group transition-all duration-200 hover:-translate-y-1 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #14b8a6, #0d9488)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.2) inset, 0 8px 28px rgba(20, 184, 166, 0.3)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)",
              }}
            ></div>
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-wider text-white/70">
                Like what you see?
              </div>
              <div className="text-sm font-black text-white">
                Let's work together →
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1 relative z-10"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <i className="fa-solid fa-arrow-right text-white text-sm"></i>
            </div>
          </Link>
        </div>
      </div>
      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md transition-all duration-300 opacity-100"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-full flex items-center justify-center">
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute -top-12 right-0 md:-right-12 text-white/50 hover:text-white transition-colors text-4xl font-black focus:outline-none"
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged screenshot" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </main>
  );
};

export default ProjectDetails;
