"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAuthStore } from "@/features/auth/store/useAuthstore";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

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

  useEffect(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setUserMenuOpen(true);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setUserMenuOpen(false);
    }, 200);
  };

  const initial = user?.name ? user.name[0] : user?.email ? user.email[0] : "U";
  const displayName = user?.name || user?.email?.split("@")[0] || "User";

  return (
    <header
      className={`sticky top-0 z-40 relative transition-all duration-200 select-none ${scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] py-3 shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
          : "bg-white/70 backdrop-blur-xs border-b border-transparent py-4 sm:py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0 select-none">
          <div className="w-8 h-8 rounded-xl bg-[#583AFE]/10 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform duration-200">
            <svg
              width="20"
              height="20"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 8L82 22V50C82 70.5 68.5 87.5 50 93C31.5 87.5 18 70.5 18 50V22L50 8Z"
                fill="#583AFE"
              />
              <path
                d="M50 16L74 27V49C74 65.5 63.5 79.5 50 84.5C36.5 79.5 26 65.5 26 49V27L50 16Z"
                fill="#FFFFFF"
              />
              <path
                d="M43.5 68.5L29 54L34.5 48.5L43.5 57.5L68 33L73.5 38.5L43.5 68.5Z"
                fill="#583AFE"
              />
            </svg>
          </div>
          <span className="text-[#0A0D14] font-bold text-xl sm:text-2xl tracking-tight">
            legal<span className="text-[#583AFE]">gpt</span>
          </span>
        </Link>

        {/* Center Floating Pill Menu matching Wollo reference */}
        <nav className="hidden md:flex items-center gap-7 bg-[#F3F4F6] rounded-full px-6 py-2 text-[13px] font-medium text-[#4B5565] border border-[#E5E7EB]/50">
          {[
            { name: "Features", href: "/#features" },
            { name: "Analysis", href: "/#demo" },
            { name: "Pricing", href: "/pricing" },
            { name: "Security", href: "/security" },
            { name: "Pipeline", href: "/#how-it-works" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-[#0A0D14] transition-colors duration-150 py-0.5"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA matching Wollo reference */}
        <div className="hidden sm:flex items-center gap-5">
          {mounted && user ? (
            <>
              {/* Workspace CTA Button */}
              <Link
                href="/app/contracts/new"
                className="flex items-center gap-1.5 bg-[#0A0D14] hover:bg-[#1f242e] text-white px-5 py-2 rounded-full text-[13px] font-medium transition-all shadow-sm active:scale-95"
              >
                <span>Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* User Avatar with Hover Dropdown */}
              <div
                ref={menuRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  aria-label="User profile menu"
                  aria-expanded={userMenuOpen}
                  className="flex items-center gap-1.5 p-1 pr-2 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] hover:border-[#D1D5DB] transition-colors cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0A0D14] flex items-center justify-center text-xs font-bold text-white uppercase">
                    {initial}
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#0A0D14] transition-transform duration-150 ${userMenuOpen ? "rotate-180 text-[#0A0D14]" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-2 w-60 rounded-xl bg-white border border-[#E5E7EB] shadow-xl p-1.5 z-50 select-text"
                    >
                      {/* User Info Header */}
                      <div className="px-3 py-2 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#0A0D14] flex items-center justify-center text-xs font-bold text-white uppercase shrink-0">
                          {initial}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[#0A0D14] text-xs font-semibold truncate capitalize">
                            {displayName}
                          </p>
                          <p className="text-[#6B7280] text-[10px] truncate font-mono">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="h-px bg-[#F3F4F6] my-1" />

                      {/* Menu Items */}
                      <div className="flex flex-col gap-0.5">
                        <Link
                          href="/app/contracts/new"
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[#4B5565] hover:text-[#0A0D14] hover:bg-[#F3F4F6] transition-colors group"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-[#583AFE]" />
                          <span>Audit Workspace</span>
                        </Link>

                        <Link
                          href="/security"
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[#4B5565] hover:text-[#0A0D14] hover:bg-[#F3F4F6] transition-colors"
                        >
                          <Shield className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span>Security &amp; Encryption</span>
                        </Link>
                      </div>

                      <div className="h-px bg-[#F3F4F6] my-1" />

                      {/* Logout Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[#0A0D14] hover:text-black/70 transition-colors font-medium text-[13px] px-1 py-1"
              >
                Log in
              </Link>
              <Link
                href="/app/contracts/new"
                className="flex items-center gap-1.5 bg-[#0A0D14] hover:bg-[#1f242e] text-white px-5 py-2.5 rounded-full text-[13px] font-medium transition-all shadow-sm active:scale-95"
              >
                <span>Start Free Trial</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {mounted && user && (
            <Link
              href="/app/contracts/new"
              className="bg-[#0A0D14] text-white text-[11px] font-medium px-3 py-1.5 rounded-full"
            >
              Workspace
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="p-2 text-[#0A0D14] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-full transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay - Floats over page without shifting hero */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="sm:hidden fixed inset-0 top-[60px] bg-black/25 backdrop-blur-[2px] z-40"
            />

            {/* Dropdown Floating Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="sm:hidden absolute top-full left-0 right-0 w-full bg-white/98 backdrop-blur-md border-b border-[#E5E7EB] px-5 py-4 flex flex-col gap-3 shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-50"
            >
              <nav className="flex flex-col gap-1">
                {[
                  { name: "Features", href: "/#features" },
                  { name: "Analysis", href: "/#demo" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "Security", href: "/security" },
                  { name: "Pipeline", href: "/#how-it-works" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#4B5565] hover:text-[#0A0D14] hover:bg-gray-50 px-2 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="h-px bg-[#F3F4F6] my-1" />

              {mounted && user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 py-1 px-2">
                    <div className="w-6 h-6 rounded-full bg-[#0A0D14] flex items-center justify-center text-xs font-bold text-white uppercase">
                      {initial}
                    </div>
                    <span className="text-[#0A0D14] text-xs font-medium truncate">
                      {user.email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 text-xs text-rose-600 py-1.5 px-2 rounded-lg hover:bg-rose-50 text-left font-medium cursor-pointer transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-xs text-[#0A0D14] font-medium py-2.5 border border-[#E5E7EB] rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/app/contracts/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-xs bg-[#583AFE] hover:bg-[#4d32e6] text-white py-2.5 rounded-full font-medium transition-colors shadow-sm"
                  >
                    Start Free Trial
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
