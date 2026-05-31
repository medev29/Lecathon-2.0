"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/app/constants";
import RegistrationModal from "./RegistrationModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-lg tracking-wide">
                Cipher<span className="text-yellow-400">Thon 2.0</span>
              </span>
              <span className="text-[10px] text-[#A3A3A3] tracking-widest uppercase">
                by CipherSchools
              </span>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#A3A3A3] hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setRegOpen(true)}
                className="px-5 py-2 text-sm font-semibold text-yellow-400 border border-yellow-400 rounded-full hover:bg-yellow-400/10 transition-all duration-200"
              >
                Registration
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#111111] border-t border-white/5"
            >
              <div className="px-4 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[#A3A3A3] hover:text-white text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => { setRegOpen(true); setMenuOpen(false); }}
                  className="w-full px-5 py-2 text-sm font-semibold text-yellow-400 border border-yellow-400 rounded-full hover:bg-yellow-400/10 transition-all"
                >
                  Registration
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <RegistrationModal open={regOpen} onClose={() => setRegOpen(false)} />
    </>
  );
}
