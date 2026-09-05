"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/85 backdrop-blur-xl border-b border-edge py-3.5"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-[var(--width-container)] mx-auto px-6 flex items-center justify-between">
        
        {/* Logo with purple badge & checkmark icon */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(124,92,252,0.5)] transition-all duration-300">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold text-lg tracking-tight">
              LegalGPT
            </span>
            <span className="text-[10px] font-mono text-accent bg-accent/15 px-1.5 py-0.2 rounded border border-accent/30 uppercase">
              AI
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {[
            { name: "Demo", href: "#demo" },
            { name: "Features", href: "#features" },
            { name: "Pipeline", href: "#how-it-works" },
            { name: "Security", href: "#security" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-silver hover:text-white transition-colors font-medium text-xs tracking-wider uppercase"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/contracts/mock-id"
            className="group flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(124,92,252,0.3)]"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </header>
  );
}
