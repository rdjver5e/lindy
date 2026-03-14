// src/components/onboarding/MockStripeProcessingPanel.tsx
'use client';

import { ChevronDown, Loader2 } from 'lucide-react';

export default function MockStripeProcessingPanel() {
  return (
    <div className="w-full max-w-sm bg-white border border-dashed border-gray-200 rounded-2xl p-6 shadow-sm">

      {/* ── Header — "•••" DIMMED ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-[22px] h-[22px] bg-emerald-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 14 14" fill="none" className="w-[11px] h-[11px] text-white overflow-visible" aria-hidden="true">
              <path d="M4.5 2L10 7L4.5 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight leading-none pt-0.5">link</span>
        </div>
        <span className="text-gray-300 text-xl font-bold leading-none pointer-events-none pb-1">•••</span>
      </div>

      {/* ── Email row ── */}
      <div className="flex justify-between items-center mt-6 pb-3.5 border-b border-gray-100">
        <span className="text-sm text-gray-500">Email</span>
        <span className="text-sm text-gray-900 pr-1">alexsmith.mobbin@gmail.com</span>
      </div>

      {/* ── Pay with row (collapsed, non-interactive) ── */}
      <div className="flex justify-between items-center py-3.5 border-b border-gray-100">
        <span className="text-sm text-gray-500">Pay with</span>
        <div className="flex items-center gap-2">
          {/* Visa logo placeholder */}
          <div className="w-[34px] h-[22px] bg-gradient-to-br from-blue-800 to-blue-600 rounded flex items-center justify-center relative overflow-hidden">
            <span className="text-white text-[10px] font-bold italic tracking-tighter mix-blend-overlay">VISA</span>
          </div>
          <div className="text-right flex flex-col pt-0.5">
            <p className="text-[13px] font-medium text-gray-900 leading-tight">Visa Debit</p>
            <p className="text-[11px] text-gray-500 leading-tight mt-[1px]">•••• 0561</p>
          </div>
          <ChevronDown className="w-[18px] h-[18px] text-gray-300 ml-0.5" strokeWidth={2} />
        </div>
      </div>

      {/* ── Pay by bank promo (visible but non-interactive) ── */}
      <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5 bg-[#F6FDF9] rounded-lg py-2.5 px-3 w-full border border-emerald-100/50">
          <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm">
             <span className="text-[10px] text-white font-bold leading-none">$</span>
          </div>
          <span className="text-[13px] text-gray-800 font-medium tracking-tight">Pay by bank to get $5 back</span>
          <span className="text-[13px] font-medium text-teal-600 ml-auto mr-1">Switch</span>
        </div>
      </div>

      {/* ── Processing button (replaces Save) ── */}
      <button
        disabled
        aria-busy="true"
        aria-label="Processing payment"
        className="w-full bg-emerald-500 text-white text-[15px] font-medium rounded-xl py-3.5 mt-5 cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        <span>Processing</span>
        <Loader2 className="w-[18px] h-[18px] animate-spin text-white/90" aria-hidden="true" strokeWidth={2.5} />
      </button>

      {/* ── Fine print ── */}
      <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed px-2">
        By saving your payment information, you allow Lindy to charge you for future payments in accordance with their terms.
      </p>

      {/* ── Pay without Link — GRAYED OUT ── */}
      <div className="w-full text-center mt-4">
        <span className="text-[13px] text-gray-300 font-medium cursor-default" aria-disabled="true">
          Pay without Link
        </span>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-center gap-2 mt-5 text-[11px] text-gray-400 pb-1">
        <span>Powered by <strong className="text-gray-600 font-bold ml-0.5 tracking-tight text-[12px]">stripe</strong></span>
        <span className="text-gray-200">|</span>
        <span className="text-gray-400">Terms</span>
        <span className="text-gray-200">|</span>
        <span className="text-gray-400">Privacy</span>
      </div>
    </div>
  );
}
