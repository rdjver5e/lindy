'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';

export default function WorkspaceSetup() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("Alex Smith's Workspace");
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File must be under 5MB.');
      return;
    }
    
    setLogoFile(file);
    setLogoPreviewUrl(URL.createObjectURL(file));
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newEmail = emailInput.trim();
      if (newEmail && validateEmail(newEmail) && !emails.includes(newEmail)) {
        setEmails([...emails, newEmail]);
        setEmailInput('');
      }
    } else if (e.key === 'Backspace' && emailInput === '' && emails.length > 0) {
      setEmails(emails.slice(0, -1));
    }
  };

  const removeEmail = (indexToRemove: number) => {
    setEmails(emails.filter((_, index) => index !== indexToRemove));
  };

  const initial = workspaceName ? workspaceName.charAt(0).toUpperCase() : 'A';

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Create your workspace and<br />invite others to join.
        </h1>

        <div className="flex items-center mt-6">
          {logoPreviewUrl ? (
            <img src={logoPreviewUrl} alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-xl font-bold text-amber-600">
              {initial}
            </div>
          )}
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()} 
            className="text-sm text-gray-500 ml-3 underline hover:text-gray-700 focus:outline-none"
          >
            {logoPreviewUrl ? 'Change logo' : 'Upload your logo'}
          </button>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleLogoUpload}
            className="hidden" 
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Workspace name
          </label>
          <input
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Invite members to join
          </label>
          <div 
            className="min-h-[120px] border border-gray-200 rounded-lg p-3 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent cursor-text flex flex-wrap gap-2 items-start"
            onClick={() => emailInputRef.current?.focus()}
          >
            {emails.map((email, index) => (
              <span key={index} className="bg-gray-100 rounded px-2 py-1 text-sm flex items-center group">
                {email}
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeEmail(index);
                  }} 
                  className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              ref={emailInputRef}
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleEmailKeyDown}
              placeholder={emails.length === 0 ? "Separate emails by comma" : ""}
              className="flex-1 min-w-[150px] outline-none text-sm bg-transparent py-1"
            />
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center justify-between mt-auto pt-8">
        <button
          onClick={() => router.push('/onboarding/intent')}
          className="border border-gray-200 rounded-lg px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => router.push('/onboarding/pricing')}
          className="bg-blue-600 text-white rounded-lg px-6 py-3 text-sm font-medium flex items-center hover:bg-blue-700 transition-colors"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
