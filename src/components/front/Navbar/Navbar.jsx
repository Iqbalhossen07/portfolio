"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div
          className="pointer-events-auto  rounded-md px-6 md:px-10 py-3 flex items-center justify-between relative"
          style={{
            border: "1px solid rgba(255,255,255,0.13)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex items-center flex-shrink-0 relative">
            <Link href="/"
              className="flex items-center gap-2 group relative z-50"
            >
              <img
                className="w-20 md:w-20 absolute left-0 max-w-none transition-transform duration-300 group-hover:scale-110"
                src="/logo.png"
                alt="Logo"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || 
                (link.path !== '/' && pathname.startsWith(link.path)) ||
                (link.name === 'Projects' && pathname.startsWith('/project-details'));
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-bold transition-colors duration-200 ${isActive ? 'text-[#00BDCA]' : 'text-gray-400 hover:text-[#00BDCA]'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3 flex-shrink-0">
            <Link href="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-none text-sm font-black text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                color: "#ffffff",
                boxShadow:
                  "0 4px 15px rgba(20, 184, 166, 0.3), 0 1px 0 rgba(255,255,255,0.2) inset",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Contact
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2"
            >
              <i
                className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-2xl`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 bg-[#0a0a0a] border border-white/10 rounded-md p-6 space-y-4 shadow-2xl pointer-events-auto"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.path || 
                  (link.path !== '/' && pathname.startsWith(link.path)) ||
                  (link.name === 'Projects' && pathname.startsWith('/project-details'));
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 border-b border-white/5 font-bold text-sm ${isActive ? 'text-[#00BDCA]' : 'text-gray-300 hover:text-[#00BDCA]'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
