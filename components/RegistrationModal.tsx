"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    teamName: "",
    college: "",
    theme: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const themes = ["Education", "Advertisement", "Hiring", "Community", "Healthcare"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSuccess(false); setError(""); setForm({ name: "", email: "", phone: "", teamName: "", college: "", theme: "" }); }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 relative"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-[#A3A3A3] hover:text-white">
              <X size={20} />
            </button>

            {success ? (
              <div className="flex flex-col items-center py-8 text-center gap-4">
                <CheckCircle size={56} className="text-yellow-400" />
                <h3 className="text-xl font-bold text-white">You&apos;re Registered!</h3>
                <p className="text-[#A3A3A3] text-sm">We&apos;ll send event details to your email shortly.</p>
                <button onClick={handleClose} className="mt-2 px-6 py-2 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-300 transition-all">
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white">Register for <span className="text-yellow-400">Lecathon 2.0</span></h2>
                  <p className="text-[#A3A3A3] text-sm mt-1">Fill in your details to secure your spot.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { key: "name", label: "Full Name", type: "text", required: true },
                    { key: "email", label: "Email Address", type: "email", required: true },
                    { key: "phone", label: "Phone Number", type: "tel", required: false },
                    { key: "teamName", label: "Team Name", type: "text", required: false },
                    { key: "college", label: "College / Institution", type: "text", required: false },
                  ].map(({ key, label, type, required }) => (
                    <div key={key}>
                      <label className="text-xs text-[#A3A3A3] mb-1 block">{label}{required && " *"}</label>
                      <input
                        type={type}
                        required={required}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-yellow-400/50 transition-colors"
                        placeholder={label}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="text-xs text-[#A3A3A3] mb-1 block">Preferred Theme</label>
                    <select
                      value={form.theme}
                      onChange={(e) => setForm({ ...form, theme: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400/50 transition-colors"
                    >
                      <option value="">Select a theme</option>
                      {themes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {error && <p className="text-red-400 text-xs">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full py-2.5 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-300 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Registering...</> : "Register Now"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
