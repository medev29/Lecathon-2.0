"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { cipherWeekSchedule, hackathonSchedule } from "@/app/constants";

type ScheduleItem = { time: string; phase: string; description: string };

function TimelineCard({ item, index }: { item: ScheduleItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-4 sm:gap-6 group"
    >
      {/* Time */}
      <div className="shrink-0 flex flex-col items-end gap-1 w-28 sm:w-36 pt-3">
        <span className="text-yellow-400 font-mono text-xs font-bold">{item.time}</span>
      </div>

      {/* Connector */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mt-3.5 ring-2 ring-yellow-400/20 shrink-0" />
        <div className="w-px flex-1 bg-white/10 mt-1" />
      </div>

      {/* Card */}
      <div className="flex-1 bg-[#1a1a1a] border border-white/8 rounded-xl p-4 mb-3 group-hover:border-yellow-400/20 transition-all duration-300">
        <h4 className="text-white font-semibold text-sm">{item.phase}</h4>
        <p className="text-[#A3A3A3] text-xs mt-1 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<"online" | "offline">("online");
  const schedule = activeTab === "online" ? cipherWeekSchedule : hackathonSchedule;

  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-3">Plan Your Day</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Event <span className="text-yellow-400">Schedule</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-[#A3A3A3] text-sm">
            <Calendar size={14} />
            <span>September 15–16, 2025</span>
          </div>
        </motion.div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#1a1a1a] border border-white/10 rounded-full p-1 gap-1">
            <button
              onClick={() => setActiveTab("online")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "online"
                  ? "bg-yellow-400 text-black"
                  : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              <Clock size={13} />
              CipherWeek (Online)
            </button>
            <button
              onClick={() => setActiveTab("offline")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "offline"
                  ? "bg-yellow-400 text-black"
                  : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              Offline 24 hrs Hackathon
            </button>
          </div>
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col"
          >
            {schedule.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
