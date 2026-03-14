'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft, ChevronRight, Plus, Search, X, SlidersHorizontal
} from 'lucide-react';
import { allTemplates } from '@/components/shared/TemplateSectionData';
import TemplateCard from '@/components/shared/TemplateCard';
import FeaturedTemplateCard from '@/components/shared/FeaturedTemplateCard';
import { TemplateFilterSidebar } from '@/components/shared/TemplateFilterSidebar';

export function TemplateGallery() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const router = useRouter();

  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [roleFilters, setRoleFilters] = useState<string[]>([]);
  const [useCaseFilters, setUseCaseFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter logic
  const filteredTemplates = allTemplates.filter(t => {
    if (categoryFilter && t.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
    }
    if (roleFilters.length > 0 && !t.roles.some(r => roleFilters.includes(r))) return false;
    if (useCaseFilters.length > 0 && !t.useCases.some(u => useCaseFilters.includes(u))) return false;
    return true;
  });

  const mostPopular = filteredTemplates.filter(t => t.category === 'most_popular');
  const mostPopularFeatured = mostPopular.find(t => t.isFeatured);
  const mostPopularRegulars = mostPopular.filter(t => !t.isFeatured);
  const allNonFeatured = filteredTemplates.filter(t => !t.isFeatured);

  const handleRoleToggle = (role: string) => {
    setRoleFilters(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };
  const handleUseCaseToggle = (uc: string) => {
    setUseCaseFilters(prev => prev.includes(uc) ? prev.filter(u => u !== uc) : [...prev, uc]);
  };

  return (
    <div className="min-h-screen">

      {/* ── Top bar — SINGLE ROW ── */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="flex items-center gap-3">
          {/* Note: The DashboardLayout already renders a global hamburger on the left.
              To avoid double hamburgers, we only render the < Back button here. */}
          <Link href="/home" className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 ml-12">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
        </div>
        <button
          onClick={() => { console.log('POST /api/agents'); router.push('/agents/mock-agent-id/configure'); }}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> New Agent
        </button>
      </div>

      {/* ── Mobile filter toggle — md:hidden ── */}
      <div className="md:hidden px-4 mb-3">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 w-full justify-center"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* ── Body: sidebar + content ── */}
      <div className="flex flex-col md:flex-row px-4 md:px-6 gap-6 md:gap-8 max-w-[1400px] mx-auto">

        {/* Sidebar — always visible on md+, toggle on mobile */}
        <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block`}>
          <TemplateFilterSidebar
            roleFilters={roleFilters}
            useCaseFilters={useCaseFilters}
            onRoleToggle={handleRoleToggle}
            onUseCaseToggle={handleUseCaseToggle}
          />
        </div>

        {/* Content area */}
        <div className="flex-1 max-w-full md:max-w-4xl">

          {/* Category filter chip — only if URL has ?category */}
          {categoryFilter && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">Filtered by:</span>
              <button
                onClick={() => setCategoryFilter('')}
                className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
              >
                {categoryFilter.replace(/_/g, ' ')}
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Search bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-gray-400 transition"
              aria-label="Search templates"
            />
          </div>

          {/* "Most popular" section */}
          {mostPopular.length > 0 && roleFilters.length === 0 && useCaseFilters.length === 0 && !searchQuery && (
            <section className="mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Most popular</h2>
                <span className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  See all <ChevronRight className="w-4 h-4" />
                </span>
              </div>

              {/* Featured row: 60/40 split */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
                {mostPopularFeatured && (
                  <div className="col-span-1 md:col-span-3">
                    <FeaturedTemplateCard template={mostPopularFeatured} />
                  </div>
                )}
                {mostPopularRegulars[0] && (
                  <div className="col-span-1 md:col-span-2">
                    <TemplateCard template={mostPopularRegulars[0]} />
                  </div>
                )}
              </div>

              {/* 3 regular cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {mostPopularRegulars.slice(1, 4).map(t => (
                  <TemplateCard key={t.id} template={t} />
                ))}
              </div>
            </section>
          )}

          {/* "All templates" section */}
          <section className="mt-10 mb-12">
            <h2 className="text-lg font-semibold text-gray-900">All templates</h2>
            {allNonFeatured.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {allNonFeatured.map(t => (
                  <TemplateCard key={t.id} template={t} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16" role="status">
                <p className="text-gray-500 text-sm">No templates found. Try adjusting your filters.</p>
                <button
                  onClick={() => { setRoleFilters([]); setUseCaseFilters([]); setSearchQuery(''); setCategoryFilter(''); }}
                  className="text-sm text-blue-500 hover:underline mt-2"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
