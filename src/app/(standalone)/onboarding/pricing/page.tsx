import PricingTrial from '@/components/onboarding/PricingTrial';

// Standalone pricing route override (Screen 14 IDLE State)
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white flex w-full">
      {/* Left half — content centered within this half */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 lg:px-8">
        <div className="w-full max-w-sm">
          <PricingTrial />
        </div>
      </div>
      
      {/* Right half — empty white in IDLE state (Screen 14) */}
      <div className="hidden md:block md:w-1/2 bg-white" />
    </div>
  );
}
