'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ArrowRight, Loader2 } from 'lucide-react';

export default function ProfileSurvey() {
  const router = useRouter();

  // State
  const [role, setRole] = useState('');
  const [useCase, setUseCase] = useState('');
  const [discovery, setDiscovery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Mock API Call for profile update
    setTimeout(() => {
      console.log('Profile Survey saved:', {
        role: role || null,
        useCase: useCase || null,
        discoverySource: discovery || null,
      });
      // Navigate to next screen
      router.push('/onboarding/intent');
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col h-[calc(100vh-[8rem])] sm:h-[600px] max-h-screen relative">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col pt-4 pb-8 sm:py-8">
        {/* Headings */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
          Tell us more about you
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          We just need a few more details to complete your profile.
        </p>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="w-full flex-1 flex flex-col">
          
          {/* Role Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="role" className="block text-sm font-medium text-gray-800 mb-1">
              What is your role?
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isSubmitting}
                className={`w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 sm:py-3.5 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed motion-safe:transition-colors ${role === '' ? 'text-gray-500' : 'text-gray-900'}`}
              >
                <option value="" disabled className="text-gray-500">Select an option</option>
                <option value="Product">Product</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
                <option value="Founder/CEO">Founder/CEO</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Use-case Dropdown */}
          <div className="flex flex-col mt-5">
            <label htmlFor="useCase" className="block text-sm font-medium text-gray-800 mb-1">
              What is your main use-case with Lindy?
            </label>
            <div className="relative">
              <select
                id="useCase"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                disabled={isSubmitting}
                className={`w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 sm:py-3.5 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed motion-safe:transition-colors ${useCase === '' ? 'text-gray-500' : 'text-gray-900'}`}
              >
                <option value="" disabled className="text-gray-500">Select an option</option>
                <option value="Looking around">I&apos;m just looking around</option>
                <option value="Automate emails">Automate emails</option>
                <option value="Customer support">Customer support</option>
                <option value="Sales automation">Sales automation</option>
                <option value="Meeting management">Meeting management</option>
                <option value="Lead generation">Lead generation</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Discovery Dropdown */}
          <div className="flex flex-col mt-5">
            <label htmlFor="discovery" className="block text-sm font-medium text-gray-800 mb-1">
              How did you hear about us?
            </label>
            <div className="relative">
              <select
                id="discovery"
                value={discovery}
                onChange={(e) => setDiscovery(e.target.value)}
                disabled={isSubmitting}
                className={`w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 sm:py-3.5 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed motion-safe:transition-colors ${discovery === '' ? 'text-gray-500' : 'text-gray-900'}`}
              >
                <option value="" disabled className="text-gray-500">Select an option</option>
                <option value="Google/Search">Google/Search</option>
                <option value="Twitter/X">Twitter/X</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Friend/Colleague">Friend/Colleague</option>
                <option value="Product Hunt">Product Hunt</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="Newsletter">Newsletter</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-1 min-h-[40px]"></div>

          {/* Continue Button centered at bottom */}
          <div className="mt-auto flex justify-center pb-4 sm:pb-0">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={`flex items-center gap-2 rounded-lg text-sm font-medium text-white px-6 py-3 sm:py-3.5 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 motion-safe:transition-colors ${
                isSubmitting 
                  ? 'bg-blue-500 opacity-80 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 motion-safe:animate-spin" aria-hidden="true" />
                  <span aria-live="polite">Saving...</span>
                </>
              ) : (
                <>
                  Continue <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
