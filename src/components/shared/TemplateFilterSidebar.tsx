'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  roleFilters: string[];
  useCaseFilters: string[];
  onRoleToggle: (role: string) => void;
  onUseCaseToggle: (useCase: string) => void;
}

const ROLES = [
  { id: 'engineering', label: 'Engineering' },
  { id: 'human_resources', label: 'Human Resources' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'operations', label: 'Operations' },
  { id: 'product', label: 'Product' },
  { id: 'sales', label: 'Sales' },
  { id: 'support', label: 'Support' },
];

const USE_CASES = [
  { id: 'ai_assistant', label: 'AI Assistant' },
  { id: 'chatbot', label: 'Chatbot' },
  { id: 'coaching', label: 'Coaching' },
  { id: 'content_creation', label: 'Content creation' },
  { id: 'document_processing', label: 'Document processing' },
  { id: 'emails', label: 'Emails' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'phone', label: 'Phone' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'research', label: 'Research' },
  { id: 'teams', label: 'Teams' },
  { id: 'web_scraper', label: 'Web scraper' },
];

export function TemplateFilterSidebar({ roleFilters, useCaseFilters, onRoleToggle, onUseCaseToggle }: Props) {
  const [roleExpanded, setRoleExpanded] = useState(true);
  const [useCaseExpanded, setUseCaseExpanded] = useState(true);

  return (
    <aside className="w-full md:w-[200px] md:flex-shrink-0 md:sticky md:top-16 md:self-start pt-2">
      {/* Role */}
      <div>
        <button
          onClick={() => setRoleExpanded(!roleExpanded)}
          className="flex items-center justify-between w-full py-1"
          aria-expanded={roleExpanded}
        >
          <span className="text-sm font-semibold text-gray-900">Role</span>
          {roleExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {roleExpanded && (
          <div className="mt-2.5 space-y-2.5">
            {ROLES.map(role => (
              <label key={role.id} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={roleFilters.includes(role.id)}
                  onChange={() => onRoleToggle(role.id)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{role.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Use case */}
      <div className="mt-6">
        <button
          onClick={() => setUseCaseExpanded(!useCaseExpanded)}
          className="flex items-center justify-between w-full py-1"
          aria-expanded={useCaseExpanded}
        >
          <span className="text-sm font-semibold text-gray-900">Use case</span>
          {useCaseExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {useCaseExpanded && (
          <div className="mt-2.5 space-y-2.5">
            {USE_CASES.map(uc => (
              <label key={uc.id} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCaseFilters.includes(uc.id)}
                  onChange={() => onUseCaseToggle(uc.id)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{uc.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
