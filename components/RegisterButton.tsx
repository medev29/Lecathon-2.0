"use client";

import type { RegistrationAvailability } from "@/lib/types/site";

type Variant = "nav" | "hero" | "themes";

const styles: Record<Variant, { base: string; closed: string }> = {
  nav: {
    base: "px-5 py-2 text-sm font-semibold text-yellow-400 border border-yellow-400 rounded-full hover:bg-yellow-400/10 transition-all duration-200",
    closed:
      "px-5 py-2 text-sm font-semibold text-[#666] border border-white/10 rounded-full cursor-not-allowed",
  },
  hero: {
    base: "flex items-center gap-2 px-7 py-3 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20",
    closed:
      "flex items-center gap-2 px-7 py-3 bg-[#1E1E1E] text-[#888] font-semibold rounded-full text-sm border border-white/10 cursor-not-allowed",
  },
  themes: {
    base: "inline-flex items-center gap-2 px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-300 transition-all",
    closed:
      "inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E1E1E] text-[#888] font-semibold rounded-full text-sm border border-white/10 cursor-not-allowed",
  },
};

export default function RegisterButton({
  variant,
  registration,
  onOpen,
  className = "",
  children,
}: {
  variant: Variant;
  registration: RegistrationAvailability;
  onOpen: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const open = registration.open;
  const style = open ? styles[variant].base : styles[variant].closed;

  return (
    <button
      type="button"
      disabled={!open}
      title={!open ? registration.reason : undefined}
      onClick={() => open && onOpen()}
      className={`${style} ${className}`}
    >
      {children}
      {!open && registration.reason ? (
        <span className="sr-only">{registration.reason}</span>
      ) : null}
    </button>
  );
}
