'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle, Plus, Search, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

import AgentBuilderInput, { TemplateChip } from '@/components/shared/AgentBuilderInput';
import { allTemplates, templateCategories } from '@/components/shared/TemplateSectionData';
import FeaturedTemplateCard from '@/components/shared/FeaturedTemplateCard';
import TemplateCard from '@/components/shared/TemplateCard';

// ── Mock Data Sources (Hero) ──
const templateChips: TemplateChip[] = [
  { id: '1', label: 'Personal website', icon: '🟢', promptTemplate: 'Build a personal website agent that...' },
  { id: '2', label: 'Customer support email', icon: '🔧', promptTemplate: 'Create a customer support email agent...' },
  { id: '3', label: 'Outbound sales calls', icon: '🔧', promptTemplate: 'Build an outbound sales calling agent...' },
  { id: '4', label: 'Lead gen', icon: '🟢', promptTemplate: 'Create a lead generation agent...' },
  { id: '5', label: 'Meeting recorder', icon: '🔧', promptTemplate: 'Build a meeting recorder agent...' },
  { id: '6', label: 'LinkedIn outreach', icon: '🟢', promptTemplate: 'Create a LinkedIn outreach agent...' },
  { id: '7', label: 'Support chatbot', icon: '🔧', promptTemplate: 'Build a support chatbot agent...' },
];

export default function AgentBuilderHome() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState('product');

  const handlePromptSubmit = async (prompt: string) => {
    setIsSubmitting(true);
    console.log('POST /api/agents/create-from-prompt', { prompt });
    await new Promise(r => setTimeout(r, 2000));
    router.push('/agents/mock-agent-id');
  };

  const handleNewAgent = () => {
    console.log('POST /api/agents', { name: undefined });
    router.push('/agents/mock-agent-id/configure');
  };

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      // Offset by the sticky header height + some padding
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Helper to render a category section
  const renderTemplateSection = (categoryId: string, label: string) => {
    const sectionTemplates = allTemplates.filter(t => t.category === categoryId);
    if (sectionTemplates.length === 0) return null;

    const featured = sectionTemplates.find(t => t.isFeatured);
    const regulars = sectionTemplates.filter(t => !t.isFeatured);

    return (
      <section className="mt-6 md:mt-10" id={`section-${categoryId}`} key={categoryId}>
        <div className="flex items-center justify-between mb-[18px] px-1">
          <h2 className="text-[19px] font-bold tracking-tight text-gray-900">{label}</h2>
          <Link href={`/templates?category=${categoryId}`} className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center">
            See all <span className="ml-[2px] mb-px">&gt;</span>
          </Link>
        </div>

        {/* Row 1: Featured (3 cols) + Regular (2 cols) on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[14px] mb-[14px]">
          <div className="col-span-1 lg:col-span-3">
            {featured && <FeaturedTemplateCard template={featured} />}
          </div>
          <div className="col-span-1 lg:col-span-2">
            {regulars[0] && <TemplateCard template={regulars[0]} />}
          </div>
        </div>

        {/* Row 2: remaining regular cards */}
        {regulars.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
            {regulars.slice(1, 4).map(t => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="w-full relative min-h-[100dvh] flex flex-col pt-12 pb-24 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* ── Fixed Top Controls ── */}
      <div className="fixed top-5 right-5 z-50">
        <button
          onClick={handleNewAgent}
          className="flex items-center gap-1.5 px-[14px] py-[9px] bg-white border border-gray-200/80 shadow-sm rounded-[10px] hover:bg-gray-50 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <Plus className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
          <span className="text-[13px] font-semibold text-gray-900 tracking-tight leading-none mb-px">New Agent</span>
        </button>
      </div>

      {/* ── Hero Section ── */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center mt-[72px] relative z-10 px-4 lg:px-0">
        
        <h1 className="text-[34px] md:text-[40px] font-bold text-gray-900 tracking-[-0.02em] mb-7 leading-none">
          How can I help?
        </h1>

        <AgentBuilderInput 
          onSubmit={handlePromptSubmit} 
          isSubmitting={isSubmitting} 
        />

        <div className="mt-[18px] w-full max-w-[650px] mx-auto flex flex-col gap-[10px] items-center justify-center pointer-events-auto z-20 relative">
          <div className="flex flex-wrap justify-center gap-2">
            {templateChips.slice(0, 4).map((chip) => (
              <button
                key={chip.id}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200/80 rounded-full hover:bg-gray-50 transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200 shadow-sm whitespace-nowrap text-[13px] text-gray-700 font-medium"
              >
                <span className="text-[13px] leading-none mb-[1px]" aria-hidden="true">{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
             {templateChips.slice(4).map((chip) => (
              <button
                key={chip.id}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200/80 rounded-full hover:bg-gray-50 transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200 shadow-sm whitespace-nowrap text-[13px] text-gray-700 font-medium"
              >
                <span className="text-[13px] leading-none mb-[1px]" aria-hidden="true">{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable Template Container ── */}
      <div className="w-full relative z-10 mt-[60px] md:mt-[72px] animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
        
        {/* Sticky Category Tabs */}
        <div className="sticky top-0 z-30 w-full bg-gradient-to-br from-amber-50/95 via-yellow-50/90 to-white/95 backdrop-blur-md py-3.5 border-b border-gray-200/40">
          <div className="w-full max-w-5xl mx-auto flex items-center justify-start md:justify-center px-4 md:px-0 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max py-1">
              <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 hover:bg-gray-50 cursor-pointer mr-1 shrink-0">
                <Search className="w-[15px] h-[15px] text-gray-500" strokeWidth={2} />
              </div>
              
              <div className="flex items-center space-x-1.5 px-1">
                {templateCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToSection(cat.id)}
                    className={`
                      px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300
                      ${cat.id === activeCategory 
                        ? 'bg-[#18181B] text-white shadow-sm hover:bg-black' 
                        : 'bg-white text-gray-600 hover:bg-gray-100/80 border border-transparent hover:border-gray-200/50'}
                    `}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <Link href="/templates" className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors ml-1 whitespace-nowrap hidden sm:flex items-center">
                See all <span className="text-[11px] font-bold ml-1 mb-px">&gt;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Sections ── */}
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-12">
          {templateCategories.map(cat => renderTemplateSection(cat.id, cat.label))}

          {/* ── Academy Section (Promo) ── */}
          <section className="mt-[80px] mb-8 mx-4 md:mx-0">
            <div className="bg-[#F8F9FA] rounded-[24px] p-6 relative overflow-hidden flex flex-col items-start border border-gray-100/80 hover:shadow-sm transition-shadow">
              <span className="inline-block border border-gray-200 rounded-full px-3 py-1 text-[12px] font-medium text-gray-700 bg-white shadow-sm mb-5">
                Academy
              </span>
              
              <div className="flex items-center gap-5 w-full max-w-[400px]">
                <div className="w-14 h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer">
                  <Play className="w-6 h-6 text-gray-500 ml-1" fill="currentColor" strokeWidth={1} />
                </div>
                
                <div className="flex flex-col gap-2.5 flex-1">
                  <div className="w-full h-[14px] bg-gray-200/70 rounded-md" />
                  <div className="w-[65%] h-[14px] bg-gray-200/70 rounded-md" />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── Fixed Help Button ── */}
      <button
        aria-label="Get help"
        className="fixed bottom-[22px] right-[22px] w-10 h-10 bg-white border border-gray-200/80 shadow-md hover:shadow-lg rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all z-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <span className="text-[16px] font-medium leading-none mb-px">?</span>
      </button>

    </div>
  );
}
