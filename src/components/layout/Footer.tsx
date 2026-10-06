import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white relative z-10">
      <div className="max-w-[var(--width-container)] mx-auto px-6 py-16">
        {/* 4-Column Grid: Brand, Product, Knowledge Hub, Company & Legal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex select-none">
              <div className="w-7 h-7 rounded-xl bg-[#583AFE]/10 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                <svg
                  width="18"
                  height="18"
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
              <span className="text-[#0A0D14] font-bold text-lg tracking-tight">
                legal<span className="text-[#583AFE]">gpt</span>
              </span>
            </Link>
            <p className="text-[#4B5565] text-xs sm:text-sm leading-relaxed mb-6">
              Autonomous AI contract audit &amp; redlining engine. In-memory processing, zero data retention, and statutory research verification.
            </p>
            {/* System Status Indicator */}
            <div
              role="status"
              aria-label="System operational status"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-[#4B5565] font-mono text-[11px] font-medium">System Operational</span>
            </div>
          </div>

          {/* Column 2: Product & Platform */}
          <div>
            <h3 className="text-[#0A0D14] font-semibold text-xs mb-4 uppercase tracking-wider">
              Product &amp; Platform
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Pricing & Plans", href: "/pricing" },
                { name: "Zero-Data Security", href: "/security" },
                { name: "Free Tools Suite", href: "/tools" },
                { name: "Document Workspace", href: "/app/contracts/new" },
                { name: "Architecture & Pipeline", href: "/#how-it-works" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#6B7280] hover:text-[#0A0D14] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Knowledge Hub */}
          <div>
            <h3 className="text-[#0A0D14] font-semibold text-xs mb-4 uppercase tracking-wider">
              Knowledge Hub
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Contract Guides Hub", href: "/contracts" },
                { name: "Jurisdiction Hubs", href: "/jurisdictions" },
                { name: "Clause Risk Library", href: "/clauses" },
                { name: "Legal Tech Glossary", href: "/glossary" },
                { name: "Comparisons Hub", href: "/compare" },
                { name: "NDA Teardown Guide", href: "/contracts/nda" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#6B7280] hover:text-[#0A0D14] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Trust */}
          <div>
            <h3 className="text-[#0A0D14] font-semibold text-xs mb-4 uppercase tracking-wider">
              Company &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "About Our Mission", href: "/about" },
                { name: "Security Architecture", href: "/security" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Legal Disclaimer", href: "/disclaimer" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#6B7280] hover:text-[#0A0D14] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F0F2F5] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>
            © {new Date().getFullYear()} LegalGPT. All rights reserved. Not an attorney-client relationship.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#0A0D14] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#0A0D14] transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-[#0A0D14] transition-colors">Disclaimer</Link>
            <span className="font-mono text-[11px] text-[#9CA3AF] hidden sm:inline">
              IN-MEMORY ANALYSIS • ZERO RETENTION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
