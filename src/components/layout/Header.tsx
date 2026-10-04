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

  // Close menus on route change
  useEffect(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Click outside to close user menu
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/85 backdrop-blur-xl border-b border-[#1f1f23] py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c5cfc]/20 to-[#7c5cfc]/5 border border-[#7c5cfc]/30 flex items-center justify-center p-1 group-hover:border-[#7c5cfc]/60 transition-colors">
            <Image
              src="/logo/legalGPT_logo.png"
              alt="LegalGPT Logo"
              width={26}
              height={26}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Legal<span className="text-[#7c5cfc]">GPT</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase">
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
              className="text-[#888] hover:text-white transition-colors duration-200 relative group py-1"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7c5cfc] rounded-full group-hover:w-full transition-all duration-200" />
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {mounted && user ? (
            <>
              {/* Workspace CTA Button */}
              <Link
                href="/app/contracts/new"
                className="flex items-center gap-1.5 bg-[#7c5cfc] hover:bg-[#6b47fa] text-white px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(124,92,252,0.3)] hover:shadow-[0_0_25px_rgba(124,92,252,0.5)] hover:scale-[1.02] active:scale-[0.98]"
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
                  className="flex items-center gap-1.5 p-1 pr-2 rounded-full bg-[#111115] border border-[#26262e] hover:border-[#7c5cfc]/50 hover:bg-[#16161d] transition-all cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c5cfc]"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#7c5cfc] to-[#9b7bfa] flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
                    {initial}
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#888] group-hover:text-white transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0c0c12]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2 z-50"
                    >
                      {/* User Info Header */}
                      <div className="px-3 py-2.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7c5cfc] to-[#9b7bfa] flex items-center justify-center text-sm font-bold text-white uppercase shrink-0 shadow-inner">
                          {initial}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white text-xs font-semibold truncate capitalize">
                            {displayName}
                          </p>
                          <p className="text-[#777] text-[11px] truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="h-px bg-white/[0.06] my-1" />

                      {/* Menu Items */}
                      <div className="flex flex-col gap-0.5">
                        <Link
                          href="/app/contracts/new"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#aaa] hover:text-white hover:bg-white/[0.05] transition-colors group"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-[#7c5cfc]" />
                          <span className="font-medium">Open Workspace</span>
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#7c5cfc]" />
                        </Link>

                        <Link
                          href="/security"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#aaa] hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <Shield className="w-3.5 h-3.5 text-[#888]" />
                          <span className="font-medium">Security & Privacy</span>
                        </Link>
                      </div>

                      <div className="h-px bg-white/[0.06] my-1" />

                      {/* Logout Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#999] hover:text-red-400 hover:bg-red-500/10 transition-colors font-medium cursor-pointer text-left"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-400" />
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
                className="text-[#888] hover:text-white transition-colors font-medium text-xs tracking-wider uppercase px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 bg-[#7c5cfc] hover:bg-[#6b47fa] text-white px-4 py-2 rounded-full text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(124,92,252,0.3)] hover:shadow-[0_0_25px_rgba(124,92,252,0.5)]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {mounted && user && (
            <Link
              href="/app/contracts/new"
              className="bg-[#7c5cfc] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full"
            >
              Workspace
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="p-2 text-[#888] hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-[#07070a]/95 backdrop-blur-2xl border-b border-[#1f1f23] px-6 py-4 flex flex-col gap-3"
          >
            <nav className="flex flex-col gap-2">
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
                  className="text-[#aaa] hover:text-white text-sm font-medium py-1.5 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="h-px bg-white/[0.06] my-1" />

            {mounted && user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 py-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#7c5cfc] to-[#9b7bfa] flex items-center justify-center text-xs font-bold text-white uppercase">
                    {initial}
                  </div>
                  <span className="text-white text-xs font-medium truncate">
                    {user.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 py-1.5 text-left font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/login"
                  className="text-center text-xs text-[#aaa] hover:text-white py-2 border border-[#222] rounded-xl"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-center text-xs bg-[#7c5cfc] text-white py-2 rounded-xl font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
