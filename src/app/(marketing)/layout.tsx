import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white sm:bg-[#E8EBF0] text-[#111827] p-0 sm:p-4 md:p-6 lg:p-8 flex flex-col font-sans">
      {/* Inset framed canvas on sm+, 100% edge-to-edge viewport width on mobile */}
      <div className="marketing-canvas w-full flex-1 bg-white rounded-none sm:rounded-[32px] md:rounded-[40px] shadow-none sm:shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-0 sm:border sm:border-[#DCE0E7] flex flex-col relative overflow-visible sm:overflow-hidden">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
