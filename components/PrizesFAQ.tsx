"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trophy, Briefcase, Cpu } from "lucide-react";
import type { Faq } from "@/lib/types/site";

function PrizeCard() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Gadgets Card */}
      <div className="relative rounded-2xl overflow-hidden p-5 h-36"
        style={{ background: "linear-gradient(135deg, #1a1200 0%, #2d2000 50%, #1a1200 100%)" }}>
        <div className="absolute inset-0 border border-yellow-400/20 rounded-2xl" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={18} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Top Prize</span>
          </div>
          <h3 className="text-white font-black text-xl leading-tight">Exciting Gadgets</h3>
          <p className="text-yellow-400/70 text-xs mt-1">Latest tech gear for the champions</p>
        </div>
        <div className="absolute bottom-4 right-4 opacity-20">
          <Cpu size={48} className="text-yellow-400" />
        </div>
      </div>

      {/* Internship Card */}
     <div
  className="relative rounded-2xl overflow-hidden p-6 h-36"
        style={{ background: "linear-gradient(135deg, #0d1a0d 0%, #142014 50%, #0d1a0d 100%)" }}>
        <div className="absolute inset-0 border border-green-500/20 rounded-2xl" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-400/8 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={18} className="text-green-400" />
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Opportunity</span>
          </div>
          <h3 className="text-white font-black text-xl leading-tight">Internship Opportunity</h3>
          <p className="text-green-400/70 text-xs mt-1">At leading tech companies</p>
        </div>
        <div className="absolute bottom-4 right-4 opacity-20">
          <Briefcase size={48} className="text-green-400" />
        </div>
      </div>

      {/* Certificate card */}
      <div className="relative rounded-2xl overflow-hidden p-5 h-40"
        style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #14142a 50%, #0d0d1a 100%)" }}>
        <div className="absolute inset-0 border border-blue-500/20 rounded-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={18} className="text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Recognition</span>
          </div>
          <h3 className="text-white font-black text-xl leading-tight">Certificates</h3>
          <p className="text-blue-400/70 text-xs mt-1">Industry-recognized achievements for all finalists</p>
        </div>
      </div>
    </div>
  );
}

function PrizeMoney({ prizePool }: { prizePool: string }) {
  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative bg-[#1a1a1a] border border-yellow-400/20 rounded-3xl p-8 h-full min-h-[320px] flex flex-col justify-center overflow-hidden group hover:border-yellow-400/40 transition-all duration-300"
      >
        <p className="text-[#A3A3A3] text-sm uppercase tracking-[0.25em] mb-4">
          Total prize pool
        </p>
        <span
          className="text-5xl sm:text-6xl font-black leading-none"
          style={{
            background: "linear-gradient(135deg, #FACC15, #84cc16)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {prizePool}
        </span>
        <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-sm">
          Cash prizes, gadgets, internship opportunities, certificates and
          exclusive sponsor rewards.
        </p>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-yellow-400/3 pointer-events-none" />
      </motion.div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left gap-4 hover:text-yellow-400 transition-colors duration-200"
      >
        <span className={`text-sm font-semibold ${open ? "text-yellow-400" : "text-white"} transition-colors`}>
          {question}
        </span>
        <span className="shrink-0">
          {open ? (
            <Minus size={16} className="text-yellow-400" />
          ) : (
            <Plus size={16} className="text-white" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-[#A3A3A3] text-sm leading-relaxed pb-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PrizesFAQ({
  faqs,
  prizePool,
}: {
  faqs: Faq[];
  prizePool: string;
}) {
  return (
    <section id="prizes" className="py-28 lg:py-32 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prizes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-3">Win Big</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Prizes & <span className="text-yellow-400">Rewards</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <PrizeCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <PrizeMoney prizePool={prizePool} />
          </motion.div>
        </div>

        {/* FAQs */}
        <div id="faqs">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-3">Got Questions?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
