import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-edge bg-obsidian relative z-10">
      <div className="max-w-[var(--width-container)] mx-auto px-6 py-16">
        {/* 4-Column Grid: Brand, Product, Knowledge Hub, Company & Legal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <Image
                src="/logo/legalGPT_logo.png"
                alt="LegalGPT Logo"
                width={24}
                height={24}
              />
              <span className="text-white font-semibold text-lg tracking-tight">
                LegalGPT
              </span>
            </Link>
            <p className="text-silver text-sm leading-relaxed mb-6">
              Autonomous AI contract audit &amp; redlining engine. In-memory processing, zero data retention, and statutory research verification.
            </p>
            {/* System Status Indicator */}
            <div
              role="status"
              aria-label="System operational status"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111116] border border-edge text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-risk-low animate-pulse" />
              <span className="text-silver font-mono text-[11px]">System Operational</span>
            </div>
          </div>

          {/* Column 2: Product & Platform */}
          <div>
            <h3 className="text-white font-medium text-xs mb-4 uppercase tracking-wider">
              Product &amp; Pricing
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Pricing & Plans", href: "/pricing" },
                { name: "Zero-Data Security", href: "/security" },
                { name: "Free Tools Suite", href: "/tools" },
                { name: "Document Workspace", href: "/app/contracts/mock-id" },
                { name: "Architecture & Pipeline", href: "/#how-it-works" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-silver hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Knowledge Hub */}
          <div>
            <h3 className="text-white font-medium text-xs mb-4 uppercase tracking-wider">
              Knowledge Hub
            </h3>
            <ul className="space-y-2.5 text-sm">
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
                    className="text-silver hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Trust */}
          <div>
            <h3 className="text-white font-medium text-xs mb-4 uppercase tracking-wider">
              Company &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
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
                    className="text-silver hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-edge pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666]">
          <p>
            © {new Date().getFullYear()} LegalGPT. All rights reserved. Not an attorney-client relationship.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-silver transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-silver transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-silver transition-colors">Disclaimer</Link>
            <span className="font-mono text-[11px] text-[#555] hidden sm:inline">
              IN-MEMORY ANALYSIS • ZERO RETENTION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
