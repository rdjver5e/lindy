import { Suspense } from 'react';
import EmailVerification from '@/components/onboarding/EmailVerificationForm';

export default function Page() {
  return (
    <Suspense fallback={<div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[200px]"><p className="text-sm text-gray-400">Loading...</p></div>}>
      <EmailVerification />
    </Suspense>
  );
}
