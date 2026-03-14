'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronDown, 
  ArrowRight, 
  ArrowUp, 
  Globe, 
  Headset, 
  Phone, 
  Filter, 
  Video, 
  Linkedin, 
  Bot, 
  Settings, 
  Target, 
  Pause,
  Menu,
  X
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [promptText, setPromptText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePromptSubmit = () => {
    if (promptText.trim().length === 0) return;
    sessionStorage.setItem('pendingPrompt', promptText);
    router.push('/signup');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

  const isPromptActive = promptText.length > 10;

  const navigateToExternalSales = () => {
    window.open('https://calendly.com', '_blank'); // Mock external navigation as specified
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white">
      {/* ZONE A: Nav bar (sticky) */}
      <nav aria-label="Main navigation" className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 xl:px-8 py-4 bg-white/80 backdrop-blur-sm w-full">
        {/* A1: Logo */}
        <Link 
          href="/" 
          aria-label="Lindy Homepage"
          className="flex items-center gap-2 font-semibold text-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
        >
          <div className="w-5 h-5 text-teal-600" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8l-4 4 4 4m10-8l4 4-4 4" />
            </svg>
          </div>
          Lindy
        </Link>

        {/* Desktop Nav Links (xl breakpoint) */}
        <div className="hidden xl:flex items-center gap-8 text-sm font-medium text-gray-600">
          <button type="button" className="flex items-center gap-1 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm">
            Product <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm">
            Solutions <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>
          <Link href="/enterprise" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm">
            Enterprise
          </Link>
          <Link href="/pricing" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm">
            Pricing
          </Link>
          <button type="button" className="flex items-center gap-1 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm">
            Resources <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Nav CTAs */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm">
              Log in
            </Link>
            <button 
              type="button" 
              onClick={navigateToExternalSales}
              className="text-sm font-medium text-gray-900 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 motion-safe:transition"
            >
              Talk to sales
            </button>
          </div>

          <Link 
            href="/signup" 
            className="hidden md:flex bg-red-600 text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 motion-safe:transition"
          >
            Try for free
          </Link>

          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-40 top-[60px] bg-white w-full h-full flex flex-col p-6 overflow-y-auto">
          <div className="flex flex-col gap-6 text-base font-medium text-gray-900">
            <button type="button" className="flex justify-between items-center w-full border-b border-gray-100 pb-3">Product <ChevronDown className="w-5 h-5 text-gray-400" /></button>
            <button type="button" className="flex justify-between items-center w-full border-b border-gray-100 pb-3">Solutions <ChevronDown className="w-5 h-5 text-gray-400" /></button>
            <Link href="/enterprise" className="w-full border-b border-gray-100 pb-3">Enterprise</Link>
            <Link href="/pricing" className="w-full border-b border-gray-100 pb-3">Pricing</Link>
            <button type="button" className="flex justify-between items-center w-full border-b border-gray-100 pb-3">Resources <ChevronDown className="w-5 h-5 text-gray-400" /></button>
            
            <Link href="/login" className="w-full font-semibold border-b border-gray-100 pb-3">Log in</Link>
            <button type="button" onClick={navigateToExternalSales} className="text-left w-full font-semibold border-b border-gray-100 pb-3">Talk to sales</button>
            <Link href="/signup" className="md:hidden mt-4 w-full bg-red-600 text-white text-center py-3 rounded-full font-semibold">Try for free</Link>
          </div>
        </div>
      )}

      {/* ZONE C: Hero with Gradient Background */}
      <div className="relative pt-12 md:pt-16 pb-20 overflow-hidden text-center">
        {/* Background gradient covering hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-yellow-50/40 to-transparent pointer-events-none -z-10 bg-white" aria-hidden="true" />
        
        {/* ZONE B: Announcement banner */}
        <div className="px-4 sm:px-6 mb-12">
          <div 
            className="inline-flex flex-col sm:flex-row items-center gap-3 bg-gray-900 text-white pl-5 pr-2 py-2 w-full sm:w-auto rounded-xl sm:rounded-full text-sm font-medium shadow-md mx-auto"
            role="banner"
          >
            <span className="text-center sm:text-left">Announcing Lindy Assistant: Put your inbox and meetings on autopilot</span>
            <button 
              type="button" 
              onClick={navigateToExternalSales}
              className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-4 py-1.5 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 motion-safe:transition-colors w-full sm:w-auto justify-center"
            >
              Talk to sales <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="px-4 sm:px-6 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4 leading-tight tracking-tight">
            Meet your first AI employee
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            Lindy is the simplest way for businesses to create, manage, and share agents. Now with just a prompt.
          </p>
        </div>

        {/* ZONE D: Prompt card */}
        <div className="px-4 mx-auto max-w-2xl w-full">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-left relative group motion-safe:transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <textarea 
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="How can I help? Describe your agent and I'll build it."
              className="w-full h-24 lg:h-28 resize-none bg-transparent outline-none text-base text-gray-900 placeholder:text-gray-400 font-sans"
              aria-label="Describe the agent you want to build"
            />
            
            {/* Submit Arrow */}
            <button 
              type="button"
              onClick={handlePromptSubmit}
              disabled={promptText.trim().length === 0}
              aria-label="Submit prompt"
              className={`absolute bottom-4 right-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 motion-safe:transition-colors
                ${isPromptActive 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105' 
                  : 'bg-gray-300/60 text-white cursor-not-allowed'
                }`}
            >
              <ArrowUp className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ZONE E: Template chips */}
        <div className="mt-8 px-4 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {/* Row 1 equivalents */}
          <button 
            type="button" 
            onClick={() => setPromptText('Build a personal website')}
            className="bg-white border text-gray-700 border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-safe:transition-colors"
          >
            <div className="p-1 rounded bg-green-100 text-green-700" aria-hidden="true"><Globe className="w-3.5 h-3.5" /></div>
            Personal website
          </button>

          <button 
            type="button" 
            onClick={() => setPromptText('Handle customer support tickets')}
            className="bg-white border text-gray-700 border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-safe:transition-colors"
          >
            <div className="p-1 rounded bg-orange-100 text-orange-700" aria-hidden="true"><Headset className="w-3.5 h-3.5" /></div>
            Customer Support
          </button>

          <button 
            type="button" 
            onClick={() => setPromptText('Make outbound sales calls')}
            className="bg-white border text-gray-700 border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-safe:transition-colors"
          >
            <div className="p-1 rounded bg-purple-100 text-purple-700" aria-hidden="true"><Phone className="w-3.5 h-3.5" /></div>
            Outbound Sales Calls
          </button>

          <button 
            type="button" 
            onClick={() => setPromptText('Scrape leads')}
            className="bg-white border text-gray-700 border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-safe:transition-colors"
          >
            <div className="p-1 rounded bg-green-100 text-green-700" aria-hidden="true"><Filter className="w-3.5 h-3.5" /></div>
            Lead gen
          </button>

          {/* Row 2 equivalents */}
          <button 
            type="button" 
            onClick={() => setPromptText('Record and summarize my meetings')}
            className="bg-white border text-gray-700 border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-safe:transition-colors"
          >
            <div className="p-1 rounded bg-pink-100 text-pink-700" aria-hidden="true"><Video className="w-3.5 h-3.5" /></div>
            Meeting Recorder
          </button>

          <button 
            type="button" 
            onClick={() => setPromptText('Automate LinkedIn outreach')}
            className="bg-white border text-gray-700 border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-safe:transition-colors"
          >
            <div className="p-1 rounded bg-green-100 text-green-700" aria-hidden="true"><Linkedin className="w-3.5 h-3.5" /></div>
            LinkedIn outreach
          </button>

          <button 
            type="button" 
            onClick={() => setPromptText('Build a support chatbot')}
            className="bg-white border text-gray-700 border-gray-200 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 motion-safe:transition-colors"
          >
            <div className="p-1 rounded bg-orange-100 text-orange-700" aria-hidden="true"><Bot className="w-3.5 h-3.5" /></div>
            Support Chatbot
          </button>
        </div>
      </div>

      {/* ZONE F & G: Agents & Features (Below Fold) */}
      <section className="bg-white max-w-6xl mx-auto px-4 sm:px-6 py-20 text-left" aria-labelledby="agents-heading">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-4">
          <div className="flex items-center justify-center w-5 h-5 rounded bg-gray-100" aria-hidden="true">
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-sm"></div>
          </div>
          Agents
        </div>
        
        <h2 id="agents-heading" className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 max-w-xl mb-12">
          Build, scale, and manage your entire AI workforce with one platform.
        </h2>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          {/* Card 1: Support */}
          <article className="p-6 bg-white hover:bg-gray-50 motion-safe:transition-colors flex flex-col pt-5">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-2 font-semibold text-sm text-gray-900">
                 <Settings className="w-4 h-4 text-gray-400" aria-hidden="true" />
                 Support
               </div>
               <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center bg-white" aria-hidden="true">
                 <Pause className="w-3 h-3 text-gray-500 fill-current" />
               </div>
            </div>
            <p className="text-sm text-gray-500">
              Handle tickets autonomously.
            </p>
          </article>

          {/* Card 2: Sales */}
          <article className="p-6 bg-white hover:bg-gray-50 motion-safe:transition-colors flex flex-col pt-5">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-2 font-semibold text-sm text-gray-900">
                 <Target className="w-4 h-4 text-gray-400" aria-hidden="true" />
                 Sales
               </div>
            </div>
            <p className="text-sm text-gray-500">
              Convert more leads
            </p>
          </article>

          {/* Card 3: Marketing */}
          <article className="p-6 bg-white hover:bg-gray-50 motion-safe:transition-colors flex flex-col pt-5">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-2 font-semibold text-sm text-gray-900">
                 <div className="w-4 h-4 text-gray-400 flex items-center justify-center" aria-hidden="true">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg>
                 </div>
                 Marketing
               </div>
            </div>
            <p className="text-sm text-gray-500">
              Accelerate campaign execution.
            </p>
          </article>

          {/* Card 4: Operations */}
          <article className="p-6 bg-white hover:bg-gray-50 motion-safe:transition-colors flex flex-col pt-5">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-2 font-semibold text-sm text-gray-900">
                 <Settings className="w-4 h-4 text-gray-400" aria-hidden="true" />
                 Operations
               </div>
            </div>
            <p className="text-sm text-gray-500">
              Turn documents into insights.
            </p>
          </article>

        </div>
      </section>
      
    </div>
  );
}
