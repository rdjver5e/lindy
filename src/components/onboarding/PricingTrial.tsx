'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ClipboardCheck, 
  LayoutGrid, 
  Mail, 
  Briefcase, 
  Calendar, 
  Phone, 
  Headphones,
  Check,
  X,
  Info,
  Loader2
} from 'lucide-react';
import MockStripeLinkPanel from './MockStripeLinkPanel';
import MockStripeBillingPanel from './MockStripeBillingPanel';
import MockStripeProcessingPanel from './MockStripeProcessingPanel';

type PricingState = 'idle' | 'loading' | 'stripe_2fa' | 'stripe_billing' | 'stripe_processing' | 'success' | 'error';

interface PricingFeature {
  name: string;
  icon: React.ComponentType<{ className?: string, strokeWidth?: number }>;
  freeValue: string | boolean;
  proValue: string | boolean;
  hasInfo?: boolean;
}

const features: PricingFeature[] = [
  { name: 'Tasks', icon: ClipboardCheck, freeValue: '40', proValue: '500', hasInfo: true },
  { name: 'Integrations', icon: LayoutGrid, freeValue: '100+', proValue: '6,000+' },
  { name: 'Email Agents', icon: Mail, freeValue: true, proValue: true },
  { name: 'Sales Agents', icon: Briefcase, freeValue: true, proValue: true },
  { name: 'Meeting Agents', icon: Calendar, freeValue: false, proValue: true },
  { name: 'Phone Agents', icon: Phone, freeValue: false, proValue: true },
  { name: 'Customer Support Agents', icon: Headphones, freeValue: false, proValue: true },
];

export default function PricingTrial() {
  const router = useRouter();
  const [state, setState] = useState<PricingState>('idle');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check existing subscription
    console.log('GET /api/subscriptions/me');
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleStartTrial = async () => {
    if (state !== 'idle') return;
    setState('loading');
    
    try {
      console.log('POST /api/subscriptions/create-trial', { priceId: 'price_pro_monthly', trialDays: 7 });
      
      // Simulating initial API request delay before Stripe opens
      await new Promise(r => setTimeout(r, 1500));
      setState('stripe_2fa');
      
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2000);
    }
  };

  // Extract shared pricing content internally
  const renderPricingContent = () => {
    const isDisabled = state === 'stripe_2fa' || state === 'stripe_billing' || state === 'stripe_processing';
    const isLoading = state === 'loading';
    
    // Internal helper component specifically mapping Check/X styles identically to the standalone wrapper
    const renderValue = (value: string | boolean, isPro: boolean = false) => {
      if (typeof value === 'boolean') {
        return value ? (
          <div className="flex justify-center items-center h-full">
            <span className="sr-only">Included</span>
            <Check className={`w-4 h-4 ${isPro ? 'text-amber-500' : 'text-gray-300'}`} />
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <span className="sr-only">Not included</span>
            <X className={`w-4 h-4 text-gray-300`} />
          </div>
        );
      }
      return (
        <span className={`text-sm ${isPro ? "font-bold text-gray-900" : "text-gray-400"}`}>
          {value}
        </span>
      );
    };

    return (
      <div className="w-full flex flex-col items-start font-sans selection:bg-blue-100 selection:text-blue-900">
        
        {/* Header Section */}
        <div className="w-full text-left">
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight leading-[1.15]">
            Get Lindy for free for 7 days.
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            $0 due today. Cancel any time.
          </p>
        </div>

        {/* Pricing Table Wrapper */}
        <div className="w-full mt-5 bg-white rounded-xl relative border border-gray-100/50">
          
          {/* Header Grid Container */}
          <div className="grid grid-cols-[1fr_80px_96px] items-end pb-0">
            <div className="px-4"></div>
            <div className="text-center text-sm font-medium text-gray-500 pb-2.5">
              Free
            </div>
            
            {/* Pro Header Badge - Solid Amber Gradient */}
            <div className="relative h-[38px] bg-gradient-to-b from-yellow-300 to-amber-400 rounded-t-xl flex items-center justify-center z-10 w-full shadow-[-2px_0_6px_rgba(0,0,0,0.05)]">
              <div className="font-bold text-gray-900 flex items-center gap-1 text-sm pt-0.5">
                <span aria-hidden="true" className="text-[13px] drop-shadow-sm leading-none">🟡</span> Pro
              </div>
            </div>
          </div>

          {/* Table Body Container */}
          <div className="relative z-10 w-full flex flex-col bg-white rounded-b-xl border-t border-gray-100/50 overflow-hidden">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isLast = index === features.length - 1;
              
              return (
                <div 
                  key={feature.name} 
                  className="grid grid-cols-[1fr_80px_96px] items-center relative overflow-visible"
                >
                  {/* Pro Column Background Overlay (Rendered per-row to keep continuous flow) */}
                  <div 
                    className={`absolute top-0 right-0 w-[96px] h-full bg-amber-50/50 pointer-events-none z-0 shadow-[-2px_0_6px_rgba(0,0,0,0.05)] ${isLast ? 'rounded-br-xl' : ''}`}
                  />

                  {/* Feature Name Column */}
                  <div className="flex flex-1 items-center -ml-1 py-2.5 px-4 z-10">
                    <div className="flex-shrink-0 w-[22px] flex justify-start">
                      <Icon strokeWidth={2} className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-800 whitespace-nowrap pl-1">{feature.name}</span>
                    
                    {feature.hasInfo && (
                      <div className="relative ml-1.5 flex items-center flex-shrink-0 group">
                        <button 
                          type="button" 
                          aria-label="A task is one AI agent execution"
                          className="text-gray-400 hover:text-gray-600 focus:outline-none rounded-full"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* CSS Hover Tooltip Implementation natively */}
                        <div className="absolute opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none left-1/2 -translate-x-1/2 bottom-[130%] mb-1 w-[200px] p-2.5 bg-gray-900 text-white text-xs rounded-lg shadow-lg text-center z-50 leading-relaxed">
                          A task is one AI agent execution
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Free Column Value */}
                  <div className="text-center flex items-center justify-center h-full -ml-4 z-10 py-2.5">
                    {renderValue(feature.freeValue, false)}
                  </div>
                  
                  {/* Pro Column Value */}
                  <div className="text-center flex items-center justify-center h-full bg-transparent -mr-4 z-10 py-2.5">
                    {renderValue(feature.proValue, true)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full mt-5">
          <button
            onClick={isDisabled ? undefined : handleStartTrial}
            disabled={isDisabled || isLoading}
            aria-disabled={isDisabled}
            aria-busy={isLoading}
            className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              ${isDisabled 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-100' // explicitly 100 opacity override from disabled tailwind generic styles
                : isLoading 
                  ? 'bg-blue-500 text-white opacity-90 cursor-wait' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white active:scale-[0.99]'}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-[18px] h-[18px] mr-2 animate-spin" />
                <span>Starting trial...</span>
              </>
            ) : (
              <span>Start free trial — $0 due today</span>
            )}
          </button>
          
          <p className="text-xs text-gray-400 mt-2.5 leading-relaxed text-left">
            After the trial period, you will be charged $49.99 per month unless you cancel before the trial expires.
          </p>
        </div>
      </div>
    );
  };

  // ─── Screen 14 IDLE State (Fully Centered) ───
  if (state === 'idle' || state === 'loading' || state === 'success') {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-y-auto w-full min-h-screen pb-12 md:pb-0">
        <div className="w-full max-w-sm px-6 md:px-0 mx-auto">
          {renderPricingContent()}
        </div>
      </div>
    );
  }

  // ─── Screen 15 STRIPE_OPEN State (Flex Split layout override covering screen) ───
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col md:flex-row min-h-[100dvh] overflow-y-auto overflow-x-hidden md:overflow-hidden">
      
      {/* LEFT PORTION: Narrower Flex block housing PricingContent (40-45% width) */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-6 lg:px-12 py-10 md:py-0 bg-white min-h-[500px] shrink-0">
        <div className="w-full max-w-sm mx-auto">
          {renderPricingContent()}
        </div>
      </div>

      {/* RIGHT PORTION: Pale Amber Background housing the Stripe Link Panel (55-60% width) */}
      <div className="w-full md:w-[55%] md:flex-1 bg-gradient-to-br from-[#FEFCE8]/80 to-[#FEF08A]/40 flex items-start justify-center pt-12 md:pt-16 px-6 lg:px-8 shrink-0 min-h-screen md:min-h-0 border-t border-gray-100 md:border-t-0 md:border-l">
        {state === 'stripe_2fa' && (
          <MockStripeLinkPanel onComplete={() => setState('stripe_billing')} />
        )}
        {state === 'stripe_billing' && (
          <MockStripeBillingPanel onSave={() => {
            setState('stripe_processing');
            setTimeout(() => {
              setState('success');
              router.push('/home');
            }, 3000);
          }} />
        )}
        {state === 'stripe_processing' && (
          <MockStripeProcessingPanel />
        )}
      </div>

    </div>
  );
}
