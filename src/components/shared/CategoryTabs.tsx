'use client';

import { Search } from 'lucide-react';

export interface TemplateCategory {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  categories: TemplateCategory[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryTabs({ categories, activeCategoryId, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="w-full flex items-center justify-center -ml-4">
      <div className="flex items-center gap-2">
        
        {/* Search Icon */}
        <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 hover:bg-gray-50 cursor-pointer mr-1 shrink-0">
          <Search className="w-[15px] h-[15px] text-gray-500" strokeWidth={2} />
        </div>

        {/* Categories Flex List */}
        <div 
          className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 px-1"
          role="tablist"
          aria-label="Template categories"
        >
          {categories.map((category) => {
            const isActive = category.id === activeCategoryId;
            
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(category.id)}
                className={`
                  px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300
                  ${isActive 
                    ? 'bg-[#18181B] text-white shadow-sm hover:bg-black cursor-default' 
                    : 'bg-white text-gray-600 hover:bg-gray-100/80 border border-transparent hover:border-gray-200/50'}
                `}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* See all button inline */}
        <button 
          className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors ml-1 whitespace-nowrap flex items-center"
        >
          See all <span className="text-[11px] font-bold ml-1 mb-px">&gt;</span>
        </button>

      </div>
    </div>
  );
}
