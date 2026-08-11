"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Breadcrumb from "../Projects/Breadcrumb/Breadcrumb"; // আগের ব্রেডক্রাম্ব ইমপোর্ট


const ProjectDetails = () => {
  // const { id } = useParams(); // URL থেকে id নিতে চাইলে

  // ডামি ডেটা (DB থেকে আসবে)
  const project = {
    title: "E-Commerce Platform",
    tagline: "A full-stack multi-vendor marketplace built for scale.",
    category: "Full Stack Web App",
    year: "2024",
    duration: "6 Weeks",
    status: "Live",
    cover:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&auto=format",
    live_url: "#",
    github_url: "#",
    gfrom: "#3b82f6",
    gto: "#7c3aed",
    glow: "rgba(59,130,246,0.4)",

    problem: {
      headline: "A growing business stuck on a broken platform.",
      body: "The client was running their multi-vendor marketplace on an outdated WordPress + WooCommerce setup that couldn't handle their growth. Page load times were exceeding 8 seconds, checkout failures were occurring daily, and the admin had no real-time visibility into sales or inventory across vendors. They were losing customers and revenue — every single day.",
      pains: [
        "8s+ page load times killing conversions",
        "Checkout failing under moderate traffic",
        "No real-time inventory tracking",
        "Zero vendor analytics or reporting",
        "Manual order management eating hours",
      ],
    },

    solution: {
      headline: "A custom-built platform, designed for performance.",
      body: "I designed and built a completely new full-stack marketplace from the ground up — a React frontend served by a Laravel API backend, with MySQL for relational data and Redis for caching. The architecture was built to handle traffic spikes, support multiple vendors independently, and give every stakeholder the visibility they needed.",
      decisions: [
        {
          icon: "fa-bolt",
          title: "Server-side caching",
          desc: "Redis caching on product and category queries — sub-100ms response times.",
        },
        {
          icon: "fa-layer-group",
          title: "Decoupled architecture",
          desc: "React SPA frontend + REST API backend — independently scalable.",
        },
        {
          icon: "fa-shield",
          title: "Secure payments",
          desc: "Stripe integration with webhook verification and idempotency keys.",
        },
        {
          icon: "fa-chart-bar",
          title: "Real-time dashboard",
          desc: "Live sales, inventory, and vendor analytics via polling + SSE.",
        },
      ],
    },

    tech_stack: [
      {
        name: "React.js",
        icon: "fa-react",
        role: "Frontend UI",
        color: "#61DAFB",
        bg: "rgba(97,218,251,0.10)",
      },
      {
        name: "Laravel",
        icon: "fa-laravel",
        role: "Backend API",
        color: "#FF2D20",
        bg: "rgba(255,45,32,0.10)",
      },
      {
        name: "MySQL",
        icon: "fa-database",
        role: "Primary Database",
        color: "#4479A1",
        bg: "rgba(68,121,161,0.10)",
      },
      {
        name: "Redis",
        icon: "fa-bolt",
        role: "Caching Layer",
        color: "#DC382D",
        bg: "rgba(220,56,45,0.10)",
      },
      {
        name: "Stripe",
        icon: "fa-cc-stripe",
        role: "Payments",
        color: "#635BFF",
        bg: "rgba(99,91,255,0.10)",
      },
      {
        name: "Tailwind CSS",
        icon: "fa-wind",
        role: "Styling",
        color: "#06B6D4",
        bg: "rgba(6,182,212,0.10)",
      },
      {
        name: "AWS S3",
        icon: "fa-aws",
        role: "Media Storage",
        color: "#FF9900",
        bg: "rgba(255,153,0,0.10)",
      },
      {
        name: "GitHub CI/CD",
        icon: "fa-github",
        role: "Deployment",
        color: "#ffffff",
        bg: "rgba(255,255,255,0.06)",
      },
    ],

    what_i_did: [
      {
        num: "01",
        icon: "fa-sitemap",
        title: "Architecture & Database Design",
        desc: "Designed the full system architecture and normalized MySQL schema supporting multi-vendor relationships, product variants, order lifecycle, and role-based access for admins, vendors, and customers.",
        gfrom: "#3b82f6",
        gto: "#06b6d4",
      },
      {
        num: "02",
        icon: "fa-server",
        title: "REST API Development",
        desc: "Built 40+ API endpoints in Laravel covering auth (JWT), product management, cart, checkout, order tracking, and vendor dashboards — all documented with Swagger.",
        gfrom: "#7c3aed",
        gto: "#a855f7",
      },
      {
        num: "03",
        icon: "fa-display",
        title: "React Frontend",
        desc: "Developed a fully responsive SPA with React — product listing with filters, cart, multi-step checkout, customer dashboard, and a real-time vendor panel with live charts.",
        gfrom: "#10b981",
        gto: "#059669",
      },
      {
        num: "04",
        icon: "fa-credit-card",
        title: "Stripe Payment Integration",
        desc: "Integrated Stripe Checkout with webhook handling, automatic vendor payouts via Stripe Connect, refund flows, and payment failure recovery.",
        gfrom: "#635BFF",
        gto: "#a78bfa",
      },
      {
        num: "05",
        icon: "fa-rocket",
        title: "Deployment & CI/CD",
        desc: "Set up AWS EC2 + S3, configured Nginx, SSL, and built a GitHub Actions CI/CD pipeline for zero-downtime deployments on every push to main.",
        gfrom: "#ec4899",
        gto: "#f97316",
      },
    ],

    results: [
      {
        num: "94%",
        label: "Faster Load Time",
        desc: "8s → under 500ms",
        gfrom: "#3b82f6",
        gto: "#06b6d4",
      },
      {
        num: "40%",
        label: "Revenue Increase",
        desc: "First month post-launch",
        gfrom: "#10b981",
        gto: "#059669",
      },
      {
        num: "0",
        label: "Checkout Failures",
        desc: "vs daily failures before",
        gfrom: "#7c3aed",
        gto: "#a855f7",
      },
      {
        num: "10x",
        label: "Traffic Capacity",
        desc: "Handles 10x more load",
        gfrom: "#f59e0b",
        gto: "#f97316",
      },
    ],

    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80&auto=format",
    ],
  };

  const metas = [
    { label: "Category", value: project.category, icon: "fa-layer-group" },
    { label: "Year", value: project.year, icon: "fa-calendar" },
    { label: "Duration", value: project.duration, icon: "fa-clock" },
    { label: "Status", value: project.status, icon: "fa-circle-check" },
  ];

  return (
    <main className=" min-h-screen">
      {/* Breadcrumb (যদি চান রাখতে পারেন, আমি স্কিপ করে ডিরেক্ট হিরোতে যাচ্ছি) */}
      <Breadcrumb title={project.title} pageName="Project Details" />

      {/* Ambient glows */}
      <div
        className="fixed top-0 right-0 w-[700px] h-[700px] rounded-none blur-[220px] pointer-events-none opacity-[0.08] -z-0"
        style={{ background: project.gfrom }}
      ></div>
      <div
        className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-none blur-[200px] pointer-events-none opacity-[0.08] -z-0"
        style={{ background: project.gto }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-20 relative z-10 flex flex-col gap-24">
        {/* ==================== COVER + META ==================== */}
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
            {project.solution.decisions.map((d, idx) => (
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
                  <i className={`fa-solid ${d.icon} text-white text-sm`}></i>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-black text-white mb-1 truncate">
                    {d.title}
                  </div>
                  <div className="text-xs text-slate-500 leading-relaxed">
                    {d.desc}
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
                    className={`${tech.icon.startsWith("fa-") ? (tech.icon.includes("react") || tech.icon.includes("laravel") || tech.icon.includes("aws") || tech.icon.includes("github") ? "fa-brands " : "fa-solid ") : "fa-brands "}${tech.icon} text-xl`}
                    style={{ color: tech.color }}
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
                    <i className={`fa-solid ${wi.icon} text-white text-sm`}></i>
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
                  className="rounded-md overflow-hidden group relative transition-all duration-300 hover:border-white/20"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <img
                    src={img}
                    alt="Screenshot"
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
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
                  style={{ boxShadow: `inset 0 0 0 1px ${r.gfrom}44` }}
                ></div>
                <div
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-black mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${r.gfrom}, ${r.gto})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {r.num}
                </div>
                <div className="text-sm font-black text-white mb-1 group-hover:text-teal-400 transition-colors duration-200">
                  {r.label}
                </div>
                <div className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  {r.desc}
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
    </main>
  );
};

export default ProjectDetails;
