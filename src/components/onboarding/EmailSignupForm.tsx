'use client';

import React, { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function EmailSignupForm() {
  const router = useRouter();

  // State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    server: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for focusing first error
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Validation Logic
  const validateFullName = (value: string) => {
    if (!value.trim() || value.trim().length < 2) return 'Please enter your full name';
    if (value.length > 100) return 'Name cannot exceed 100 characters';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value) return 'Please enter a valid email address';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value || value.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  // Handlers
  const handleBlur = (field: 'fullName' | 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let error = '';
    if (field === 'fullName') error = validateFullName(fullName);
    if (field === 'email') error = validateEmail(email);
    if (field === 'password') error = validatePassword(password);

    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: 'fullName' | 'email' | 'password', value: string) => {
    if (field === 'fullName') setFullName(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);

    // Clear error immediately if user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, server: '' })); // clear server error on new try

    // Mark all as touched
    setTouched({ fullName: true, email: true, password: true });

    // Validate all
    const nameErr = validateFullName(fullName);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    setErrors(prev => ({
      ...prev,
      fullName: nameErr,
      email: emailErr,
      password: passErr,
    }));

    if (nameErr || emailErr || passErr) {
      if (nameErr && fullNameRef.current) {
        fullNameRef.current.focus();
      } else if (emailErr && emailRef.current) {
        emailRef.current.focus();
      } else if (passErr && passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Mock API Call
    setTimeout(() => {
      // Simulate checking taken email for demo logic (e.g. if email is taken@test.com)
      if (email.toLowerCase() === 'taken@test.com') {
        setErrors(prev => ({ ...prev, email: 'An account with this email already exists.' }));
        setIsSubmitting(false);
        if (emailRef.current) emailRef.current.focus();
        return;
      }

      console.log('Form Submitted via mock API:', { fullName, email, password: '***' });
      router.push(`/signup/verify?email=${encodeURIComponent(email)}`);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
        Let&apos;s get you signed up
      </h1>

      {errors.server && (
        <div className="mb-6 p-3 rounded bg-red-50 text-red-600 text-sm border border-red-100" role="alert">
          {errors.server}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col w-full">
        
        {/* Full Name Field */}
        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            ref={fullNameRef}
            type="text"
            value={fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            disabled={isSubmitting}
            autoComplete="name"
            aria-invalid={touched.fullName && !!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={`w-full bg-gray-50 border rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:opacity-80 disabled:cursor-not-allowed motion-safe:transition-colors
              ${touched.fullName && errors.fullName 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-200 focus:border-blue-500'}`}
          />
          {touched.fullName && errors.fullName && (
            <p id="fullName-error" className="text-xs text-red-500 mt-1" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address Field */}
        <div className="flex flex-col mt-5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            value={email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            disabled={isSubmitting}
            autoComplete="email"
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full bg-gray-50 border rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:opacity-80 disabled:cursor-not-allowed motion-safe:transition-colors
              ${touched.email && errors.email 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-200 focus:border-blue-500'}`}
          />
          {touched.email && errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-1" role="alert">
              {errors.email}
              {errors.email === 'An account with this email already exists.' && (
                <Link href="/login" className="ml-1 text-blue-600 hover:underline">Log in instead?</Link>
              )}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col mt-5">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              ref={passwordRef}
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              disabled={isSubmitting}
              autoComplete="new-password"
              aria-invalid={touched.password && !!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`w-full bg-gray-50 border rounded-lg pl-4 pr-12 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 disabled:opacity-80 disabled:cursor-not-allowed motion-safe:transition-colors
                ${touched.password && errors.password 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-200 focus:border-blue-500'}`}
            />
            {/* Eye Toggle Button */}
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              disabled={isSubmitting}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPasswordVisible ? (
                <EyeOff className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Eye className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
          {touched.password && errors.password && (
            <p id="password-error" className="text-xs text-red-500 mt-1" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          aria-label={isSubmitting ? "Creating your account" : undefined}
          className={`w-full mt-6 py-3 rounded-lg text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 motion-safe:transition-colors
            ${isSubmitting 
              ? 'bg-blue-500 opacity-80 cursor-not-allowed flex items-center justify-center gap-2' 
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 motion-safe:animate-spin" aria-hidden="true" />
              <span aria-live="polite">Signing up...</span>
            </>
          ) : (
            'Sign up'
          )}
        </button>
      </form>

      {/* Legal Text below Button */}
      <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
        By signing up, you agree to Lindy&apos;s{' '}
        <Link href="/privacy" className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm px-0.5" tabIndex={0}>
          Privacy Policy
        </Link>
        {' '}and{' '}
        <Link href="/terms" className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm px-0.5" tabIndex={0}>
          Terms of Service
        </Link>
      </p>

    </div>
  );
}
