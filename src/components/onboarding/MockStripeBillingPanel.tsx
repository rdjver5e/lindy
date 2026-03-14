// src/components/onboarding/MockStripeBillingPanel.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, Plus, Building2 } from 'lucide-react';

interface MockStripeBillingPanelProps {
  onSave?: () => void;
}

export default function MockStripeBillingPanel({ onSave }: MockStripeBillingPanelProps) {
  const [isPayWithExpanded, setIsPayWithExpanded] = useState(false);
  const [useBankPay, setUseBankPay] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-sm bg-white border border-dashed border-gray-200 rounded-2xl p-6 shadow-sm font-sans relative">
      <div className="absolute inset-0 z-[-1] bg-white rounded-2xl" />
      
      {/* ── Header: link logo + overflow ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-[22px] h-[22px] bg-emerald-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 14 14" fill="none" className="w-[11px] h-[11px] text-white overflow-visible" aria-hidden="true">
              <path d="M4.5 2L10 7L4.5 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight leading-none pt-0.5">link</span>
        </div>
        
        {/* ••• Menu Dropdown */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-400 text-xl font-bold leading-none hover:text-gray-600 outline-none pb-1 transition-colors"
          >
            ...
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] z-50 py-1.5 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <button 
                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                onClick={() => {
                  console.log("Log out of Link clicked");
                  setIsMenuOpen(false);
                }}
              >
                Log out of Link
              </button>
              <div className="border-t border-gray-100 my-1" />
              <button 
                className="w-full text-left px-4 py-2 text-[13px] text-gray-500 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Email row ── */}
      <div className="flex justify-between items-center mt-6 pb-3.5 border-b border-gray-100">
        <span className="text-sm text-gray-500">Email</span>
        <span className="text-sm text-gray-900 pr-1">alexsmith.mobbin@gmail.com</span>
      </div>

      {/* ── Pay with row ── */}
      <div className="flex flex-col py-3.5 border-b border-gray-100">
        <div 
          className="flex justify-between items-center cursor-pointer group"
          onClick={() => setIsPayWithExpanded(!isPayWithExpanded)}
        >
          <span className="text-sm text-gray-500">Pay with</span>
          <div className="flex items-center gap-2">
            {!useBankPay ? (
              <>
                <div className="w-[34px] h-[22px] bg-gradient-to-br from-blue-800 to-blue-600 rounded flex items-center justify-center relative overflow-hidden">
                  <span className="text-white text-[10px] font-bold italic tracking-tighter mix-blend-overlay">VISA</span>
                </div>
                <div className="text-right flex flex-col pt-0.5">
                  <p className="text-[13px] font-medium text-gray-900 leading-tight">Visa Debit</p>
                  <p className="text-[11px] text-gray-500 leading-tight mt-[1px]">•••• 0561</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-[34px] h-[22px] bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-gray-500">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="text-right flex flex-col pt-0.5">
                  <p className="text-[13px] font-medium text-gray-900 leading-tight">Bank account</p>
                </div>
              </>
            )}
            {isPayWithExpanded ? (
               <ChevronUp className="w-[18px] h-[18px] text-gray-400 ml-0.5 group-hover:text-gray-600 transition-colors" strokeWidth={2} />
            ) : (
               <ChevronDown className="w-[18px] h-[18px] text-gray-400 ml-0.5 group-hover:text-gray-600 transition-colors" strokeWidth={2} />
            )}
          </div>
        </div>
        
        {/* Expanded Dropdown Options */}
        {isPayWithExpanded && (
          <div className="mt-4 pt-3 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* Current Method */}
            <div 
              className="w-full flex items-center justify-between p-2.5 -mx-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => {
                setUseBankPay(false);
                setIsPayWithExpanded(false);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-[34px] h-[22px] bg-gradient-to-br from-blue-800 to-blue-600 rounded flex items-center justify-center relative overflow-hidden">
                  <span className="text-white text-[10px] font-bold italic tracking-tighter mix-blend-overlay">VISA</span>
                </div>
                <div className="text-left flex flex-col pt-0.5">
                  <p className="text-[13px] font-medium text-gray-900 leading-tight">Visa Debit</p>
                  <p className="text-[11px] text-gray-500 leading-tight mt-[1px]">•••• 0561</p>
                </div>
              </div>
              {!useBankPay && <Check className="w-4 h-4 text-emerald-500" />}
            </div>

            {/* Add New Method */}
            <button 
              className="w-full flex items-center gap-3 p-2.5 -mx-2 mt-1 hover:bg-gray-50 rounded-lg transition-colors group/btn focus:outline-none"
            >
              <div className="w-[34px] h-[22px] border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 group-hover/btn:border-gray-400 transition-colors">
                <Plus className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-gray-600 transition-colors" />
              </div>
              <span className="text-[13px] font-medium text-gray-700 group-hover/btn:text-gray-900 transition-colors">Add a new payment method</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Pay by bank promo ── */}
      <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <div 
          className="flex items-center gap-2.5 bg-[#F6FDF9] border border-emerald-100 rounded-lg py-2.5 px-3 w-full cursor-pointer hover:bg-emerald-50 transition-colors active:scale-[0.99]"
          onClick={() => setUseBankPay(!useBankPay)}
        >
          <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm">
             <span className="text-[10px] text-white font-bold leading-none">$</span>
          </div>
          <span className="text-[13px] text-gray-800 font-medium">
            {useBankPay ? "Pay by bank to get $5 back" : "Pay by bank to get $5 back"}
          </span>
          <span className="text-[13px] font-medium text-teal-600 ml-auto mr-1 truncate">
            {useBankPay ? "Switch back to card" : "Switch"}
          </span>
        </div>
      </div>

      {/* ── Enter billing details ── */}
      <div className="mt-5">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">Enter billing details</h3>
        <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
          For security purposes, please enter your billing details.
        </p>
      </div>

      {/* ── Name field ── */}
      <div className="mt-5">
        <label htmlFor="billing-name" className="block text-sm font-medium text-gray-800 mb-1.5">Name</label>
        <input
          id="billing-name"
          type="text"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-shadow bg-white/50 focus:bg-white"
          placeholder=""
        />
      </div>

      {/* ── Country + ZIP grouped ── */}
      <div className="mt-4">
        <label htmlFor="billing-country" className="block text-sm font-medium text-gray-800 mb-1.5">Country or region</label>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white/50 focus-within:bg-white transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
          
          {/* Country dropdown */}
          <div className="relative border-b border-gray-200 focus-within:border-b-emerald-500 transition-colors">
            <select 
              id="billing-country"
              className="w-full px-3 py-3 text-sm text-gray-900 appearance-none outline-none bg-transparent cursor-pointer"
              defaultValue="United States"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          
          {/* ZIP field */}
          <input
            type="text"
            aria-label="ZIP or postal code"
            placeholder="ZIP"
            className="w-full px-3 py-3 text-sm outline-none bg-transparent text-gray-900"
          />
        </div>
      </div>

      {/* ── Save button (GREEN) ── */}
      <button
        type="button"
        onClick={onSave}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-[15px] font-medium rounded-xl py-3.5 mt-6 transition-colors shadow-sm active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Save
      </button>

      {/* ── Fine print ── */}
      <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed px-2">
        By saving your payment information, you allow Lindy to charge you for future payments in accordance with their terms.
      </p>
    </div>
  );
}
