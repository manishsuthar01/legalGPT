import Link from "next/link";
import { Check } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-edge bg-obsidian relative z-10">
      <div className="max-w-[var(--width-container)] mx-auto px-6 py-16">
        {/* 3-Column Grid: Brand, Navigation, Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="w-6 h-6 rounded bg-accent flex items-center justify-center text-white font-bold text-xs group-hover:scale-105 transition-transform duration-300">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                LegalGPT
              </span>
            </Link>
            <p className="text-silver text-sm leading-relaxed mb-6 max-w-sm">
              Autonomous legal contract audit &amp; redlining engine. Powered by deterministic legal retrieval and sovereign privacy isolation.
            </p>
            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111116] border border-edge text-xs">
              <span className="w-2 h-2 rounded-full bg-risk-low animate-pulse" />
              <span className="text-silver font-mono text-[11px]">System Operational</span>
            </div>
          </div>

          {/* Column 2: Navigation & Resources */}
          <div>
            <h3 className="text-white font-medium text-sm mb-4 uppercase tracking-wider text-xs">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Live Contract Demo", href: "#demo" },
                { name: "Architecture & Features", href: "#features" },
                { name: "Reasoning Pipeline", href: "#how-it-works" },
                { name: "Zero-Data Security", href: "#security" },
                { name: "Document Workspace", href: "/contracts/mock-id" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-silver hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tech Stack & Verification */}
          <div>
            <h3 className="text-white font-medium text-sm mb-4 uppercase tracking-wider text-xs">
              Core Architecture
            </h3>
            <div className="space-y-2">
              {[
                { label: "Pipeline", value: "LangGraph StateGraph" },
                { label: "Encryption", value: "AES-256 Memory Scrubbing" },
                { label: "Vector Search", value: "Semantic Chunk Embeddings" },
                { label: "Runtime", value: "Next.js 16 + React 19" },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-edge/50 font-mono"
                >
                  <span className="text-[#777]">{spec.label}</span>
                  <span className="text-silver">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-edge pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666]">
          <p>
            © {new Date().getFullYear()} LegalGPT Enigma. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-[#555]">
              PRIVACY BY DESIGN • LOCAL IN-MEMORY PROCESSING
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
