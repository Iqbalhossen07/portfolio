"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* মাউসের চারপাশের সেই সুন্দর সার্কেল/বর্ডার */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#14b8a6] rounded-none pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
      />

      {/* মাউসের একদম মাঝখানের ডট */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#14b8a6] rounded-none pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.2 }}
      />

      {/* ডায়নামিক হাইলাইট/লাইট ইফেক্ট */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(20, 184, 166, 0.1), transparent 80%)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
