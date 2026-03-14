// src/components/onboarding/MockStripeLinkPanel.tsx
'use client';

interface MockStripeLinkPanelProps {
  onComplete?: () => void;
}

export default function MockStripeLinkPanel({ onComplete }: MockStripeLinkPanelProps) {
  return (
    <div className="w-full max-w-sm bg-white border border-dashed border-gray-200 rounded-2xl p-8 shadow-sm font-sans">
      {/* Header: link logo + overflow */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-[22px] h-[22px] bg-emerald-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 14 14" fill="none" className="w-[11px] h-[11px] text-white overflow-visible" aria-hidden="true">
              <path d="M4.5 2L10 7L4.5 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight leading-none pt-0.5">link</span>
        </div>
        <button className="text-gray-400 text-xl font-bold leading-none hover:text-gray-600 outline-none pb-1">...</button>
      </div>

      {/* Confirm heading */}
      <h2 className="text-xl font-bold text-gray-900 text-center mt-6">
        Confirm it&apos;s you
      </h2>
      <p className="text-[13px] text-gray-500 text-center mt-2 leading-relaxed px-2">
        Enter the code sent to (•••) ••• ••79 to use your saved information.
      </p>

      {/* OTP boxes */}
      <div className="flex justify-center gap-[7px] mt-6" onClick={onComplete}>
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            aria-label={`Digit ${i + 1}`}
            className="w-11 h-12 border border-gray-200 rounded-lg text-center text-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-shadow cursor-pointer"
            readOnly
          />
        ))}
      </div>

      {/* Send code to email */}
      <button className="w-full text-[13px] text-teal-600 font-medium text-center mt-4 focus:outline-none hover:opacity-80 transition-opacity">
        Send code to email instead
      </button>

      {/* Divider + login email */}
      <div className="border-t border-gray-100 mt-5 pt-4">
        <p className="text-[11px] text-gray-400 text-center">
          Logging in as alexsmith.mobbin@gmail.com
        </p>
      </div>

      {/* Pay without Link */}
      <button className="w-full text-[13px] text-teal-600 font-medium text-center mt-4 focus:outline-none hover:opacity-80 transition-opacity">
        Pay without Link
      </button>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 mt-8 text-[11px] text-gray-400">
        <span>Powered by <strong className="text-gray-600 font-bold">stripe</strong></span>
        <span className="text-gray-200">|</span>
        <span className="hover:text-gray-600 cursor-pointer transition-colors">Terms</span>
        <span className="hover:text-gray-600 cursor-pointer transition-colors">Privacy</span>
      </div>
    </div>
  );
}
