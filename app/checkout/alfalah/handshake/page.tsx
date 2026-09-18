'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { alfalahApi, submitAlfalahForm } from '@/lib/api/alfalahApi';

function HandshakeContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ref = searchParams.get('ref') || '';
    const authToken =
      searchParams.get('auth_token') ||
      searchParams.get('AuthToken') ||
      searchParams.get('Auth_Token') ||
      '';

    if (!ref || !authToken) {
      setError('Missing payment session from Bank Alfalah. Please return to checkout and try again.');
      return;
    }

    alfalahApi
      .getSsoForm(ref, authToken)
      .then((form) => submitAlfalahForm(form.actionUrl, form.fields))
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            'Could not continue to Bank Alfalah card payment.',
        );
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {!error ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A73A8] mx-auto mb-4" />
            <h1 className="text-xl font-bold text-[#0D2B3A] mb-2">Connecting to Bank Alfalah</h1>
            <p className="text-sm text-[#6B7280]">Please wait while we open the secure card payment page.</p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-[#0D2B3A] mb-2">Payment could not continue</h1>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <a href="/checkout" className="text-[#1A73A8] font-semibold hover:underline">
              Return to checkout
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function AlfalahHandshakePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A73A8]" />
        </div>
      }
    >
      <HandshakeContent />
    </Suspense>
  );
}
