"use client";

import { Heart, GitBranch, Globe, Link, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-white font-bold text-lg">Cipher<span className="text-yellow-400">Thon 2.0</span></span>
              <p className="text-[10px] text-[#A3A3A3] tracking-widest uppercase">by CipherSchools</p>
            </div>
            <p className="text-[#A3A3A3] text-xs leading-relaxed max-w-xs">
              The flagship hackathon empowering the next generation of innovators and tech builders.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Quick Links</h4>
            {["About", "Problem Themes", "Schedule", "Prizes", "FAQs"].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-[#A3A3A3] text-xs hover:text-yellow-400 transition-colors w-fit">
                {link}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Follow Us</h4>
            <div className="flex gap-3">
              {[GitBranch, Send, Link, Globe].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-[#A3A3A3] hover:text-yellow-400 hover:border-yellow-400/30 transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <p className="text-[#A3A3A3] text-xs mt-2">
              <a href="mailto:hello@cipherschools.com" className="hover:text-yellow-400 transition-colors">
                hello@cipherschools.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#A3A3A3] text-xs">
            © 2025 CipherThon 2.0. All rights reserved.
          </p>
          <p className="text-[#A3A3A3] text-xs flex items-center gap-1">
            Built with <Heart size={10} className="text-yellow-400" /> by CipherSchools
          </p>
        </div>
      </div>
    </footer>
  );
}
