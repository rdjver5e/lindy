import Link from 'next/link';

export default function OnboardingLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen flex selection:bg-blue-100 selection:text-blue-900 font-sans text-gray-900">
      
      {/* LEFT PANEL — Responsive split (100% Mobile, 55% Tablet, 50% Desktop) */}
      <div className="w-full md:w-[55%] xl:w-1/2 relative flex flex-col px-6 md:px-12 py-8 bg-white">
        
        {/* Logo — absolute positioned, appears on every onboarding screen */}
        <Link 
          href="/" 
          aria-label="Lindy Homepage"
          className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 font-semibold text-lg text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:opacity-80 transition-opacity"
        >
          <svg className="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 2L2 12l10 10 10-10L12 2z"/>
          </svg>
          Lindy
        </Link>

        {/* Page content centered vertically wrapped in main semantic tag */}
        <main className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          {children}
        </main>
      </div>

      {/* RIGHT PANEL — Responsive split (Hidden Mobile, 45% Tablet, 50% Desktop), amber gradient, purely decorative */}
      <div 
        className="hidden md:flex md:w-[45%] xl:w-1/2 bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-400 relative overflow-hidden"
        aria-hidden="true" 
        role="presentation"
      >
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Decorative product preview mockup */}
          <div className="w-80 h-64 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg transform rotate-2">
            <div className="p-4 space-y-3">
              <div className="h-3 bg-white/40 rounded w-3/4"></div>
              <div className="h-3 bg-white/30 rounded w-1/2"></div>
              <div className="h-8 bg-white/20 rounded mt-4"></div>
              <div className="h-8 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>

        {/* Portal root for injecting the Stripe UI specifically over the right panel from the pricing route */}
        <div id="stripe-portal-root" className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"></div>
      </div>

    </div>
  );
}
