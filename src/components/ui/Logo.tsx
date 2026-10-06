"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  href?: string;
}

export function LogoIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Outer Shield Outline */}
      <path
        d="M50 8L82 22V50C82 70.5 68.5 87.5 50 93C31.5 87.5 18 70.5 18 50V22L50 8Z"
        fill="#583AFE"
      />
      {/* Inner Cutout / Shield depth */}
      <path
        d="M50 16L74 27V49C74 65.5 63.5 79.5 50 84.5C36.5 79.5 26 65.5 26 49V27L50 16Z"
        fill="#FFFFFF"
      />
      {/* Dynamic Security Checkmark */}
      <path
        d="M43.5 68.5L29 54L34.5 48.5L43.5 57.5L68 33L73.5 38.5L43.5 68.5Z"
        fill="#583AFE"
      />
    </svg>
  );
}

export function LegalGptLogo({
  className = "",
  size = 28,
  showText = true,
  href = "/",
}: LogoProps) {
  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      <div className="w-8 h-8 rounded-xl bg-[#583AFE]/10 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
        <LogoIcon size={size} />
      </div>
      {showText && (
        <span className="text-[#0A0D14] font-bold text-xl tracking-tight">
          legal<span className="text-[#583AFE]">gpt</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
