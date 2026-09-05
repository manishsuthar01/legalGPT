import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DotGrid } from "@/components/ui/DotGrid";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-obsidian text-silver flex flex-col relative">
      {/* Universal Interactive DotGrid background at z-0 */}
      <DotGrid
        dotSize={3}
        gap={24}
        baseColor="#523c7f"
        activeColor="#9d82fc"
        proximity={100}
      />

      {/* Main content layer at z-10 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
