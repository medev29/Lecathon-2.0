"use client";

import { motion } from "framer-motion";
import type { RegistrationAvailability } from "@/lib/types/site";

export default function RegistrationBanner({
  registration,
}: {
  registration: RegistrationAvailability;
}) {
  if (registration.open) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-16 left-0 right-0 z-40 bg-[#1a1200] border-b border-yellow-400/20 px-4 py-2 text-center"
    >
      <p className="text-xs sm:text-sm text-yellow-400/90">
        {registration.reason ?? "Registration is currently closed."}
      </p>
    </motion.div>
  );
}
