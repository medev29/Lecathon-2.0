"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Lightbulb, ArrowRight } from "lucide-react";
import type { ProblemTheme, RegistrationAvailability } from "@/lib/types/site";
import RegistrationModal from "./RegistrationModal";
import RegisterButton from "./RegisterButton";

export default function ProblemThemes({
  problemThemes,
  registrationThemes,
  registration,
}: {
  problemThemes: ProblemTheme[];
  registrationThemes: string[];
  registration: RegistrationAvailability;
}) {
  const [startIdx, setStartIdx] = useState(0);
  const [regOpen, setRegOpen] = useState(false);
  const visible = Math.min(4, Math.max(problemThemes.length, 1));

  const canPrev = startIdx > 0;
  const canNext = problemThemes.length > visible && startIdx + visible < problemThemes.length;

  const prev = () => canPrev && setStartIdx(startIdx - 1);
  const next = () => canNext && setStartIdx(startIdx + 1);

  const shown = problemThemes.slice(startIdx, startIdx + visible);

  return (
    <>
      <section id="themes" className="py-24 relative overflow-hidden">
        {/* Background glow behind heading */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-yellow-400/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 relative z-10"
          >
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-3">Hack For Impact</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Problem Sector <span className="text-yellow-400">Themes</span>
            </h2>
            <p className="text-[#A3A3A3] text-sm mt-3 max-w-lg mx-auto">
              Choose your domain and build solutions that create real-world impact across these key sectors.
            </p>
          </motion.div>

          {/* Carousel Row */}
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {shown.map((theme) => (
                  <motion.div
                    key={theme.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    {/* Background image */}
                    <img
                      src={theme.imageUrl}
                      alt={theme.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    {/* Border glow on hover */}
                    <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-yellow-400/30 transition-colors duration-300" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-lg leading-tight">{theme.title}</h3>
                      <p className="text-[#A3A3A3] text-xs mt-1 leading-relaxed">{theme.description}</p>
                      <div className="mt-3 flex items-center gap-1 text-yellow-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore <ArrowRight size={12} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Nav arrows */}
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={prev}
                disabled={!canPrev}
                className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-[#A3A3A3] hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                disabled={!canNext}
                className="w-10 h-10 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-[#A3A3A3] hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-[#1A1A1A] border border-white/8 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center shrink-0">
                <Lightbulb size={20} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-bold text-base">Convert Your Idea Into Action / Product</p>
                <p className="text-[#A3A3A3] text-xs mt-0.5">Pick a theme and start building something that matters.</p>
              </div>
            </div>
            <RegisterButton
              variant="themes"
              registration={registration}
              onOpen={() => setRegOpen(true)}
              className="shrink-0 whitespace-nowrap"
            >
              {registration.open ? "Register Now" : "Registration Closed"}
            </RegisterButton>
          </motion.div>
        </div>
      </section>

      <RegistrationModal
        open={regOpen}
        onClose={() => setRegOpen(false)}
        registrationThemes={registrationThemes}
        registration={registration}
      />
    </>
  );
}
