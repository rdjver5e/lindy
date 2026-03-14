'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExternalLink, Loader2 } from 'lucide-react';

export default function EmailVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  
  const displayEmail = emailParam || 'your email';

  // State
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'rate-limited'>('idle');
  const [errorType, setErrorType] = useState<'' | 'invalid' | 'expired' | 'rate_limited'>('');
  
  const isCodeValidLength = code.length >= 5;

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear errors when typing starts
    if (errorType) setErrorType('');
    
    // Auto-uppercase
    const newCode = e.target.value.toUpperCase();
    setCode(newCode);
  };

  const handleResend = () => {
    if (isResending || resendStatus === 'rate-limited') return;
    
    setIsResending(true);
    setErrorType('');

    // Mock API Call for resend
    setTimeout(() => {
      setIsResending(false);
      
      // Simulate rate limit randomly or you can force it based on a condition
      // For demonstration, let's say success
      setResendStatus('success');
      
      // Reset after 3 seconds
      setTimeout(() => setResendStatus('idle'), 3000);
    }, 1000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isCodeValidLength || isSubmitting) return;

    setIsSubmitting(true);
    setErrorType('');
    
    // Mock API Call for verification
    setTimeout(() => {
      // Mock validation scenarios natively via input content for QA checking:
      if (code === 'INVALID' || code === '000000') {
        setErrorType('invalid');
        setIsSubmitting(false);
      } else if (code === 'EXPIRED') {
        setErrorType('expired');
        setIsSubmitting(false);
      } else if (code === 'RATELIM') {
        setErrorType('rate_limited');
        setIsSubmitting(false);
        setCode('');
      } else {
        // Success
        console.log('Verification Success for code:', code);
        router.push('/onboarding/profile'); // Navigate to next step
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-start text-left">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
        Check your inbox
      </h1>
      
      <p className="text-sm text-gray-500 mt-2">
        A verification email has been sent to
      </p>
      
      <span className="block text-sm font-medium text-gray-700 mt-1 mb-4">
        {displayEmail}
      </span>
      
      <p className="text-sm text-gray-500">
        Confirm your email and start using Lindy.
      </p>

      {/* Email Client Link */}
      <a 
        href={`mailto:${displayEmail}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-800 underline hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm py-1 motion-safe:transition-colors"
      >
        Open email app <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
      </a>

      {/* Verification Form */}
      <form onSubmit={handleSubmit} className="w-full mt-6">
        <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-1">
          Code
        </label>
        
        <input
          id="verification-code"
          type="text"
          maxLength={6}
          value={code}
          onChange={handleCodeChange}
          disabled={isSubmitting}
          aria-invalid={errorType !== ''}
          aria-describedby={errorType ? "verification-error" : undefined}
          aria-label="Verification code"
          placeholder="000000"
          className={`w-full bg-gray-50 border rounded-lg px-4 py-3 text-center text-xl tracking-[0.5em] font-mono text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:opacity-80 disabled:cursor-not-allowed motion-safe:transition-colors
            ${errorType === 'invalid' 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-200 focus:border-blue-500'}`}
        />

        {/* Dynamic Error Rendering */}
        {errorType && (
          <div id="verification-error" className="mt-2" role="alert" aria-live="polite">
            {errorType === 'invalid' && (
              <p className="text-xs text-red-500">
                Invalid code. Please check your email and try again.
              </p>
            )}
            {errorType === 'expired' && (
              <p className="text-xs text-red-500">
                Your code has expired. Please request a new one.
              </p>
            )}
            {errorType === 'rate_limited' && (
              <p className="text-xs text-red-500">
                Too many attempts. Please request a new code.
              </p>
            )}

            {/* Resend Link natively appended directly inside the error block structure if expired or rate limited (as requested) */}
            {(errorType === 'expired' || errorType === 'rate_limited') && (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || resendStatus === 'rate-limited'}
                className="mt-1 text-sm text-blue-600 underline font-medium hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
              >
                {isResending ? (
                  <span className="flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin"/> Sending...</span>
                ) : resendStatus === 'success' ? (
                  <span className="text-green-600 no-underline">Code sent!</span>
                ) : (
                  'Resend code'
                )}
              </button>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!isCodeValidLength || isSubmitting}
          aria-disabled={!isCodeValidLength || isSubmitting}
          aria-busy={isSubmitting}
          aria-label={isSubmitting ? "Verifying your code" : undefined}
          className={`w-full mt-3 py-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 motion-safe:transition-colors
            ${isSubmitting 
              ? 'bg-blue-600 text-white opacity-80 cursor-not-allowed flex items-center justify-center gap-2' 
              : isCodeValidLength 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 motion-safe:animate-spin" aria-hidden="true" />
              <span>Verifying...</span>
            </>
          ) : (
            'Continue'
          )}
        </button>
      </form>

      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push('/signup/email')}
        aria-label="Go back to signup"
        className="mt-6 border border-gray-200 bg-white rounded-lg px-6 py-2.5 sm:py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 motion-safe:transition-colors md:py-2.5 max-sm:py-3"
      >
        Back
      </button>

    </div>
  );
}
