import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#E8EBF0] text-[#111827] p-2.5 sm:p-4 md:p-6 lg:p-8 flex flex-col font-sans">
      {/* Pristine Inset Framed Canvas matching the reference visual style */}
      <div className="marketing-canvas flex-1 bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-[#DCE0E7] flex flex-col relative overflow-hidden">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
