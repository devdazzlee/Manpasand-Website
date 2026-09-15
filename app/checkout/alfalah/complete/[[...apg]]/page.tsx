'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { alfalahApi } from '../../../../lib/api/alfalahApi';
import { cartUtils } from '../../../../lib/utils/cart';

function CompleteContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const orderNumber = searchParams.get('ref') || searchParams.get('O') || searchParams.get('o') || '';

    alfalahApi
      .verifyPayment({
        orderNumber: orderNumber || undefined,
        path: pathname,
      })
      .then((result) => {
        if (result.paid) {
          const lastOrderRaw = localStorage.getItem('lastOrder');
          if (lastOrderRaw) {
            try {
              const lastOrder = JSON.parse(lastOrderRaw);
              lastOrder.paymentMethod = 'card';
              lastOrder.status = result.order?.status || 'PROCESSING';
              lastOrder.paymentStatus = 'PAID';
              localStorage.setItem('lastOrder', JSON.stringify(lastOrder));
            } catch {
              // keep whatever was stored
            }
          }
          cartUtils.clearCart();
          router.replace(`/checkout/thank-you?order=${result.order.order_number}`);
          return;
        }
        setError(
          'Card payment was not completed. Your cart is still saved — you can try again or choose Cash on Delivery.',
        );
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            'Could not confirm payment status. If money was deducted, please contact Manpasand with your order number.',
        );
      });
  }, [pathname, router, searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {!error ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A73A8] mx-auto mb-4" />
            <h1 className="text-xl font-bold text-[#0D2B3A] mb-2">Confirming your payment</h1>
            <p className="text-sm text-[#6B7280]">Please wait while we verify the Bank Alfalah response.</p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-[#0D2B3A] mb-2">Payment not confirmed</h1>
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

export default function AlfalahCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A73A8]" />
        </div>
      }
    >
      <CompleteContent />
    </Suspense>
  );
}
