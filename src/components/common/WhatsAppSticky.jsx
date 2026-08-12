"use client";

import React from "react";
import { usePathname } from "next/navigation";

const WhatsAppSticky = () => {
  const pathname = usePathname();

  // Hide WhatsApp button on admin routes
  if (pathname && pathname.startsWith("/iqbal_07")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/8801781834638"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 8px 30px rgba(37, 211, 102, 0.4)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}
      aria-label="Chat on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppSticky;
