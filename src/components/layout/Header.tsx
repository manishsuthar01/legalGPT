"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LogOut } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthstore";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setMounted(true);
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
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo/legalGPT_logo.png"
            alt="LegalGPT Logo"
            width={32}
            height={32}
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-white font-bold text-lg tracking-tight">
            LegalGPT
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {[
            { name: "Features", href: "/#features" },
            { name: "Pricing", href: "/pricing" },
            { name: "Contracts", href: "/contracts" },
            { name: "Clauses", href: "/clauses" },
            { name: "Security", href: "/security" },
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
        <div className="flex items-center gap-2 sm:gap-3">
          {mounted && user ? (
            <>
              {/* User badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-edge text-xs text-silver">
                <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-[10px] font-bold text-accent uppercase">
                  {user.name ? user.name[0] : user.email ? user.email[0] : "U"}
                </div>
                <span className="max-w-[120px] truncate text-white font-medium">
                  {user.name || user.email}
                </span>
              </div>

              {/* Launch Workspace */}
              <Link
                href="/app/contracts/new"
                className="flex group items-center gap-1.5 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(124,92,252,0.3)]"
              >
                <span>Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={() => logout()}
                className="flex items-center gap-1.5 text-silver hover:text-white hover:bg-surface border border-transparent hover:border-edge transition-all duration-200 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-flex text-silver hover:text-white transition-colors font-medium text-xs tracking-wider uppercase px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 bg-surface border border-edge hover:border-[#333] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:scale-[1.02] transition-all duration-300"
              >
                <span>Sign Up</span>
              </Link>
              <Link
                href="/login"
                className="hidden sm:flex group items-center gap-1.5 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(124,92,252,0.3)]"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
