"use client";

import { motion } from "framer-motion";
import { partners } from "@/app/constants";

export default function Partners() {
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-center p-5 bg-[#1a1a1a] border border-white/8 rounded-xl hover:border-white/20 transition-all duration-300 group"
            >
              <span className="text-white/50 font-bold text-sm tracking-wide group-hover:text-white/80 transition-colors duration-300 text-center">
                {partner.logo}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#A3A3A3] text-xs mt-10"
        >
          Interested in sponsoring CipherThon 2.0?{" "}
          <span className="text-yellow-400 underline cursor-pointer hover:text-yellow-300 transition-colors">
            Get in touch
          </span>
        </motion.p>
      </div>
    </section>
  );
}
