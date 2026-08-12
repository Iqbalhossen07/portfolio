"use client";

import React, { useState, useEffect } from "react";

const LogoMarquee = () => {
  const [logos, setLogos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await fetch("/api/platforms");
        const data = await res.json();
        if (data && Array.isArray(data)) {
          const mapped = data.map(p => ({
            name: p.name,
            img: p.imageUrl,
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
  const displayLogos = Array.from({ length: 15 }).flatMap(() => logos);

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

      <div className="relative flex overflow-hidden">
        {/* ইনফিনিট অ্যানিমেশন কন্টেইনার */}
        <div className="flex gap-4 md:gap-6 animate-logo-marquee whitespace-nowrap">
          {displayLogos.map((logo, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(logo.img)}
              className="logo-pill group flex-shrink-0 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-md transition-all duration-300 border border-white/10 bg-white/5 hover:bg-[#14b8a6]/10 hover:border-[#14b8a6]/30 hover:-translate-y-1 overflow-hidden cursor-pointer"
              style={{ background: "rgba(255, 255, 255, 0.03)", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
            >
              <img
                src={logo.img}
                alt={logo.name}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md transition-all duration-300"
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
              alt="Enlarged Logo" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default LogoMarquee;
