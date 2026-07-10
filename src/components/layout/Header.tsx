import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 frosted-glass border-t-0 border-x-0 border-b border-edge">
      <div className="max-w-[var(--width-container)] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300">
            L
          </div>
          <span className="text-white font-semibold text-xl tracking-tight">
            LegalGPT
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {["Features", "Security", "Pricing"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-silver hover:text-white transition-colors text-sm font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="hidden sm:block text-silver hover:text-white transition-colors text-sm font-medium"
          >
            Sign In
          </Link>
          <Link 
            href="/dashboard"
            className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-[0_0_20px_rgba(124,92,252,0.4)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
