'use client';

import { ArrowUp, Loader2, Mic, Paperclip } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export interface TemplateChip {
  id: string;
  label: string;
  icon: string;
  promptTemplate: string;
}

interface AgentBuilderInputProps {
  onSubmit: (prompt: string) => void;
  isSubmitting?: boolean;
}

export default function AgentBuilderInput({ onSubmit, isSubmitting = false }: AgentBuilderInputProps) {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`; // Adjust
    }
  }, [prompt]);

  const handleSubmit = () => {
    if (prompt.trim() && !isSubmitting) {
      onSubmit(prompt.trim());
    }
  };

  const hasContent = prompt.trim().length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-[20px] border border-gray-200/80 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-gray-300">
      
      {/* ── Textarea ── */}
      <div className="p-4 pb-2">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Build an agent or perform a task"
          className="w-full bg-transparent text-[15px] text-gray-900 placeholder:text-gray-400 resize-none outline-none min-h-[56px] leading-relaxed max-h-[200px] overflow-y-auto"
          aria-label="Build an agent or perform a task"
          disabled={isSubmitting}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
      </div>

      {/* ── Bottom Controls Row ── */}
      <div className="flex items-center justify-between px-3 pb-3 pt-1">
        
        {/* Left: "Build apps" chip */}
        <button
          type="button"
          onClick={() => setPrompt('Build a React application that ')}
          disabled={isSubmitting}
          aria-label="Fill prompt with app building template"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200/80 bg-white hover:bg-gray-50 transition-colors text-[13px] text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {/* Custom pink 'layout' icon SVG inside an emerald/pink background square to mimic the specific design style */}
          <div className="w-4 h-4 rounded-[4px] bg-pink-100 flex items-center justify-center text-pink-500 overflow-hidden">
             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
          Build apps
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none disabled:opacity-50"
            disabled={isSubmitting}
            aria-label="Attach file"
          >
            <Paperclip className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>
          
          <button
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none disabled:opacity-50"
            disabled={isSubmitting}
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* Submit Arrow Button */}
          <button
            onClick={handleSubmit}
            disabled={!hasContent || isSubmitting}
            aria-label={hasContent ? "Submit agent prompt" : "Enter a prompt first"}
            className={`w-[36px] h-[36px] rounded-full flex items-center justify-center ml-1 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
              ${hasContent && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md cursor-pointer active:scale-95' 
                : isSubmitting
                  ? 'bg-blue-600 cursor-not-allowed opacity-90'
                  : 'bg-blue-100 text-white cursor-not-allowed opacity-50'
              }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" strokeWidth={2.5} />
            ) : (
              <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
