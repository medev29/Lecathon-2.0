"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/app/constants";
import type { RegistrationAvailability } from "@/lib/types/site";
import RegistrationModal from "./RegistrationModal";
import RegisterButton from "./RegisterButton";

export default function Navbar({
  registrationThemes,
  registration,
}: {
  registrationThemes: string[];
  registration: RegistrationAvailability;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-lg tracking-wide">
                LECA<span className="text-yellow-400">THON 2.0</span>
              </span>
              <span className="text-[10px] text-[#A3A3A3] tracking-widest uppercase">
                by LEC-HACKS
              </span>
            </div>

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

            <div className="hidden md:flex items-center gap-3">
              <RegisterButton
                variant="nav"
                registration={registration}
                onOpen={() => setRegOpen(true)}
              >
                {registration.open ? "Registration" : "Closed"}
              </RegisterButton>
            </div>

            <button
              type="button"
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

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
                <RegisterButton
                  variant="nav"
                  registration={registration}
                  onOpen={() => {
                    setRegOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full"
                >
                  {registration.open ? "Registration" : "Registration Closed"}
                </RegisterButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <RegistrationModal
        open={regOpen}
        onClose={() => setRegOpen(false)}
        registrationThemes={registrationThemes}
        registration={registration}
      />
    </>
  );
}
