'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AuthGate() {
  const router = useRouter();
  
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSsoLoading, setIsSsoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setError(null);
    
    // Simulate OAuth Delay
    setTimeout(() => {
      console.log('Google OAuth simulated success');
      setIsGoogleLoading(false);
      router.push('/home');
    }, 1500);
  };

  const handleSsoSignIn = () => {
    setIsSsoLoading(true);
    setError(null);
    
    // Simulate SSO Delay
    setTimeout(() => {
      console.log('SSO simulated success');
      setIsSsoLoading(false);
      router.push('/home');
    }, 1500);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
        Get started for free
      </h1>
      
      <p className="text-sm text-gray-500 mb-8 max-w-[340px] leading-relaxed">
        You&apos;re just a few steps away from automating your work and growing your business with AI Agents.
      </p>

      <div className="flex flex-col w-full gap-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isSsoLoading}
          aria-busy={isGoogleLoading}
          aria-disabled={isGoogleLoading || isSsoLoading}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3.5 md:py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          {isGoogleLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full motion-safe:animate-spin" aria-hidden="true" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
          )}
          <span aria-live="polite">{isGoogleLoading ? 'Connecting...' : 'Sign up with Google'}</span>
        </button>

        <button
          type="button"
          onClick={handleSsoSignIn}
          disabled={isGoogleLoading || isSsoLoading}
          aria-busy={isSsoLoading}
          aria-disabled={isGoogleLoading || isSsoLoading}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3.5 md:py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          {isSsoLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full motion-safe:animate-spin" aria-hidden="true" />
          ) : (
            <>Continue with SSO <ExternalLink className="w-4 h-4 text-gray-400" aria-hidden="true" /></>
          )}
          <span aria-live="polite">{isSsoLoading && 'Connecting...'}</span>
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded bg-red-50 text-red-600 text-sm border border-red-100" role="alert">
          {error}
        </div>
      )}

      <p className="text-xs text-gray-500 text-center mt-5 leading-relaxed mx-auto">
        By signing up, you agree to Lindy&apos;s <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 px-0.5 motion-safe:transition-colors">Privacy Policy</Link> and <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 px-0.5 motion-safe:transition-colors">Terms of Service</Link>
      </p>

      <hr className="my-6 border-gray-200 w-full" aria-hidden="true" />

      <Link 
        href="/signup/email" 
        className="text-sm text-gray-700 underline underline-offset-2 text-center block hover:text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 py-2 motion-safe:transition-colors"
      >
        I don&apos;t use Gmail
      </Link>

      <p className="text-sm text-gray-500 text-center mt-6">
        Already have an account? <Link href="/login" className="text-gray-800 font-medium underline underline-offset-2 hover:text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 py-2 px-1 motion-safe:transition-colors">Log in</Link>
      </p>
    </>
  );
}
