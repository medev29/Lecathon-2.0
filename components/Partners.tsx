"use client";

import { motion } from "framer-motion";
import type { Sponsor } from "@/lib/types/site";

function SponsorCard({ partner, index }: { partner: Sponsor; index: number }) {
  const content = partner.logoUrl ? (
    <img
      src={partner.logoUrl}
      alt={partner.name}
      className="max-h-10 max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
    />
  ) : (
    <span className="text-white/50 font-bold text-sm tracking-wide group-hover:text-white/80 transition-colors text-center">
      {partner.logoText || partner.name}
    </span>
  );

  const className =
    "flex items-center justify-center p-5 bg-[#1a1a1a] border border-white/8 rounded-xl hover:border-white/20 transition-all duration-300 group min-h-[88px]";

  if (partner.websiteUrl) {
    return (
      <motion.a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className={className}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={className}
    >
      {content}
    </motion.div>
  );
}

export default function Partners({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <section className="py-20 border-t border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-3">Our Ecosystem</p>
          <h2 className="text-3xl font-black text-white">
            Partners & <span className="text-yellow-400">Sponsors</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {sponsors.map((partner, i) => (
            <SponsorCard key={partner.id} partner={partner} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#A3A3A3] text-xs mt-10"
        >
          Interested in sponsoring Lecathon 2.0?{" "}
          <span className="text-yellow-400 underline cursor-pointer hover:text-yellow-300 transition-colors">
            Get in touch
          </span>
        </motion.p>
      </div>
    </section>
  );
}
