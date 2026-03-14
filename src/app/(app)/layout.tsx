import { Menu } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/40 via-yellow-50/30 to-white relative font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* ── Optional Background Texture (Noise) ── */}
      {/* Uncomment to add the faint noise texture as per mockup constraints, or use a pseudo-element */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] z-0 mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E")' }}
        aria-hidden="true"
      />

      {/* ── Sidebar (Collapsed) ── */}
      <aside className="fixed top-0 left-0 h-full z-40 transition-all duration-300 w-16 bg-transparent flex flex-col items-center pt-4">
        {/* Hamburger Toggle */}
        <button 
          aria-label="Open sidebar"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-black/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          <Menu className="w-5 h-5" strokeWidth={2} />
        </button>
      </aside>

      {/* ── Main Dashboard Content Area ── */}
      {/* Subtracting the collapsed sidebar width functionally or allowing content to center inside the whole screen. 
          Given the hamburger is transparent floating, the page content centers in the viewport for now. */}
      <main className="relative z-10 min-h-screen w-full flex flex-col items-center">
        {children}
      </main>

    </div>
  );
}
