"use client";

import React, { useState, useEffect } from "react";

const LogoMarquee = () => {
  const [logos, setLogos] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await fetch("/api/platforms");
        const data = await res.json();
        if (data && Array.isArray(data)) {
          const mapped = data.map(p => ({
            name: p.name,
            img: p.imageUrl,
            link: p.link,
          }));
          setLogos(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch platforms", error);
      }
    };
    fetchPlatforms();
  }, []);

  // Seamless লুপের জন্য ডুপ্লিকেট অ্যারে
  // যদি লোগো খুব কম থাকে তাহলে স্ক্রিন ভরানোর জন্য বেশি বার ডুপ্লিকেট করতে হবে
  const displayLogos = Array.from({ length: 6 }).flatMap(() => logos);

  if (logos.length === 0) return null;

  return (
    <section className="logo-marquee-section py-12 md:py-16 overflow-hidden relative">
      {/* দুই পাশের ফেড ইফেক্ট (Gradient Overlay) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none select-none"
        style={{
          background:
            "linear-gradient(to right, var(--bg-body) 0%, transparent 15%, transparent 85%, var(--bg-body) 100%)",
        }}
      ></div>

      <div className="text-center mb-8 md:mb-10 relative z-20 px-4">
        <p
          className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]"
          style={{ color: "var(--text-muted)" }}
        >
          UK Companies I Work With
        </p>
      </div>

      <div className="relative flex overflow-hidden group/marquee">
        {/* ইনফিনিট অ্যানিমেশন কন্টেইনার */}
        <div className="flex gap-4 md:gap-6 animate-logo-marquee whitespace-nowrap group-hover/marquee:[animation-play-state:paused]">
          {displayLogos.map((logo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPlatform(logo)}
              className="logo-pill group flex-shrink-0 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-md transition-all duration-300 border border-white/10 bg-white hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:-translate-y-1 overflow-hidden cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <i className="fa-solid fa-expand text-white text-xl"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Click to view</span>
                </div>
              </div>
              <img
                src={logo.img}
                alt={logo.name}
                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-all duration-500 relative z-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedPlatform && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedPlatform(null)}
        >
          <div className="relative max-w-6xl w-full max-h-full flex items-center justify-center flex-col gap-6">
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedPlatform(null); }}
              className="absolute -top-12 right-0 md:-right-12 text-white/50 hover:text-white transition-colors text-4xl font-black focus:outline-none"
            >
              &times;
            </button>
            <img 
              src={selectedPlatform.img} 
              alt={selectedPlatform.name} 
              className="w-full max-w-4xl h-auto max-h-[75vh] object-contain bg-white p-8 md:p-12 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            {selectedPlatform.link && (
              <a 
                href={selectedPlatform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all shadow-lg hover:shadow-teal-500/25 flex items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                Live Link <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default LogoMarquee;
