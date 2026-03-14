'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, User, ArrowRight, Loader2 } from 'lucide-react';

export default function UsageIntent() {
  const router = useRouter();
  const [selectedIntent, setSelectedIntent] = useState<'team' | 'solo' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async (intent: 'team' | 'solo') => {
    if (isLoading) return;
    
    setSelectedIntent(intent);
    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      // PATCH /api/users/me/intent { intent }
      console.log(`Setting intent: ${intent}`);
      
      if (intent === 'team') {
        router.push('/onboarding/workspace');
      } else {
        router.push('/onboarding/pricing');
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setSelectedIntent(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto xl:mx-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
        How do you plan to use Lindy?
      </h1>

      <div className="flex flex-col gap-4">
        {/* Team Card */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSelect('team')}
          className={`flex items-center gap-4 w-full text-left bg-white p-5 rounded-xl border transition-all duration-200 ${
            selectedIntent === 'team'
              ? 'border-blue-500 shadow-sm ring-1 ring-blue-500 ring-offset-0'
              : 'border-gray-200 hover:border-gray-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          } ${isLoading && selectedIntent !== 'team' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-busy={isLoading && selectedIntent === 'team'}
          aria-disabled={isLoading}
        >
          <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-amber-600" aria-hidden="true" />
          </div>
          
          <div className="flex-1">
            <div className="font-semibold text-gray-900 text-base">With my team</div>
            <div className="text-sm text-gray-500 mt-1">
              Share agents with your team, manage billing and oversee tasks and credit consumption.
            </div>
          </div>
          
          <div className="flex-shrink-0 ml-auto pl-2">
            {isLoading && selectedIntent === 'team' ? (
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
            )}
          </div>
        </button>

        {/* Solo Card */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSelect('solo')}
          className={`flex items-center gap-4 w-full text-left bg-white p-5 rounded-xl border transition-all duration-200 ${
            selectedIntent === 'solo'
              ? 'border-blue-500 shadow-sm ring-1 ring-blue-500 ring-offset-0'
              : 'border-gray-200 hover:border-gray-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          } ${isLoading && selectedIntent !== 'solo' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-busy={isLoading && selectedIntent === 'solo'}
          aria-disabled={isLoading}
        >
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-gray-600" aria-hidden="true" />
          </div>
          
          <div className="flex-1">
            <div className="font-semibold text-gray-900 text-base">On my own</div>
            <div className="text-sm text-gray-500 mt-1">
              It&apos;s just me casually automating stuff.
            </div>
          </div>
          
          <div className="flex-shrink-0 ml-auto pl-2">
            {isLoading && selectedIntent === 'solo' ? (
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
