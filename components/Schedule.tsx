"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import type { ScheduleItem as ScheduleItemType } from "@/lib/types/site";
import { ORGANIZER_NAME } from "@/app/constants";

type ScheduleItem = { time: string; phase: string; description: string };

function TimelineCard({ item, index }: { item: ScheduleItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="flex gap-4 sm:gap-6 group"
    >
      <div className="shrink-0 flex flex-col items-end gap-1 w-28 sm:w-36 pt-3">
        <span className="text-yellow-400 font-mono text-xs font-bold">
          {item.time}
        </span>
      </div>

      <div className="flex flex-col items-center shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mt-3.5 ring-2 ring-yellow-400/20 shrink-0" />
        <div className="w-px flex-1 bg-white/10 mt-1 min-h-[40px]" />
      </div>

      <div className="flex-1 bg-[#1a1a1a] border border-white/8 rounded-xl p-4 mb-3 group-hover:border-yellow-400/20 transition-all duration-300">
        <h4 className="text-white font-semibold text-sm">{item.phase}</h4>
        <p className="text-[#A3A3A3] text-xs mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Schedule({
  lecaWeekSchedule,
  hackathonSchedule,
  scheduleDateLabel,
}: {
  lecaWeekSchedule: ScheduleItemType[];
  hackathonSchedule: ScheduleItemType[];
  scheduleDateLabel: string;
}) {
  const [activeTab, setActiveTab] = useState<"online" | "offline">("online");

  const toItems = (rows: ScheduleItemType[]): ScheduleItem[] =>
    rows.map(({ time, phase, description }) => ({ time, phase, description }));

  const lecaItems = toItems(lecaWeekSchedule);
  const hackItems = toItems(hackathonSchedule);
  const schedule = activeTab === "online" ? lecaItems : hackItems;

  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Plan Your Day
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Event <span className="text-yellow-400">Schedule</span>
          </h2>
          {scheduleDateLabel ? (
            <div className="flex items-center justify-center gap-2 mt-3 text-[#A3A3A3] text-sm">
              <Calendar size={14} />
              <span>{scheduleDateLabel}</span>
            </div>
          ) : null}
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="flex bg-[#1a1a1a] border border-white/10 rounded-full p-1 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("online")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "online"
                  ? "bg-yellow-400 text-black"
                  : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              <Clock size={13} />
              Lecaweek (Online)
              {lecaItems.length > 0 && (
                <span className="opacity-70">({lecaItems.length})</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("offline")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "offline"
                  ? "bg-yellow-400 text-black"
                  : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              Offline 48 hrs Hackathon
              {hackItems.length > 0 && (
                <span className="opacity-70">({hackItems.length})</span>
              )}
            </button>
          </div>
        </div>

        {schedule.length === 0 ? (
          <p className="text-center text-[#888] text-sm py-8">
            Schedule details will be posted soon. Check back later or contact{" "}
            {ORGANIZER_NAME}.
          </p>
        ) : (
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
                <TimelineCard
                  key={`${activeTab}-${item.phase}-${item.time}`}
                  item={item}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
