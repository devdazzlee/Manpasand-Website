'use client';

import { FormEvent, Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  Package,
  CheckCircle,
  Clock,
  Truck,
  MapPin,
  CreditCard,
  Loader2,
  XCircle,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import {
  orderApi,
  TrackOrderResult,
  TrackableOrderStatus,
} from '../../lib/api/orderApi';

const STATUS_STEPS: TrackableOrderStatus[] = [
  'PENDING',
  'PROCESSING',
  'COMPLETED',
];

function statusLabel(status: string) {
  switch (status) {
    case 'PENDING':
      return 'Order placed';
    case 'PROCESSING':
      return 'Being prepared';
    case 'COMPLETED':
      return 'Completed / delivered';
    case 'CANCELLED':
      return 'Cancelled';
    default:
      return status;
  }
}

function paymentMethodLabel(method: string | null) {
  switch ((method || '').toUpperCase()) {
    case 'CASH':
      return 'Cash on delivery';
    case 'CARD':
      return 'Card';
    case 'BANK_TRANSFER':
      return 'Bank transfer';
    case 'MOBILE_MONEY':
      return 'Mobile money';
    case 'CREDIT':
      return 'Credit';
    default:
      return method || '—';
  }
}

function paymentStatusLabel(status: string) {
  switch (status) {
    case 'PAID':
      return 'Paid';
    case 'PENDING':
      return 'Payment pending';
    case 'FAILED':
      return 'Payment failed';
    case 'PARTIAL':
      return 'Partially paid';
    case 'OVERDUE':
      return 'Payment overdue';
    default:
      return status;
  }
}

function displayPaymentStatus(order: TrackOrderResult) {
  if (order.status === 'COMPLETED' && order.payment_status === 'PENDING') {
    return 'PAID';
  }
  return order.payment_status;
}

function statusBadgeClass(status: string) {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    case 'PROCESSING':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-amber-100 text-amber-800';
  }
}

function OrderStatusContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<TrackOrderResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const qOrder = searchParams.get('order') || searchParams.get('orderNumber') || '';
    if (qOrder) {
      setOrderNumber(qOrder);
      void lookupOrder(qOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const currentStepIndex = useMemo(() => {
    if (!order || order.status === 'CANCELLED') return -1;
    return STATUS_STEPS.indexOf(order.status);
  }, [order]);

  async function lookupOrder(rawOrderNumber: string) {
    const trimmedOrder = rawOrderNumber.trim();
    if (!trimmedOrder) {
      setError('Enter your order number');
      return;
    }

    setLoading(true);
    setSearched(true);
    setError('');
    setOrder(null);

    try {
      const result = await orderApi.trackOrder({ orderNumber: trimmedOrder });
      setOrder(result);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'No order found with that order number';
      setError(message);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    void lookupOrder(orderNumber);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="mb-3 font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl md:text-5xl">
              Order status
            </h1>
            <p className="text-base text-white/90 sm:text-lg">
              Enter your order number from the confirmation email or thank-you
              page.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.form
            onSubmit={handleTrack}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl bg-[#F8F2DE] p-5 sm:p-8"
          >
            <label className="mb-1.5 block text-sm font-semibold text-[#0D2B3A]">
              Order number
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]" />
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. MP…"
                  className="w-full rounded-xl border border-gray-300 py-3.5 pl-12 pr-4 outline-none focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20"
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 rounded-xl bg-[#1A73A8] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#0D2B3A] disabled:opacity-60"
              >
                {loading ? 'Checking…' : 'Check status'}
              </button>
            </div>
          </motion.form>

          {loading && (
            <div className="flex items-center justify-center gap-3 py-12 text-[#1A73A8]">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Looking up your order…</span>
            </div>
          )}

          {searched && !loading && error && !order && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
              <Package className="mx-auto mb-3 h-12 w-12 text-red-300" />
              <p className="text-lg text-[#6B7280]">{error}</p>
            </div>
          )}

          {searched && !loading && order && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <Package className="mt-1 h-6 w-6 shrink-0 text-[#1A73A8]" />
                    <div>
                      <h2 className="text-xl font-bold text-[#0D2B3A] sm:text-2xl">
                        Order #{order.order_number}
                      </h2>
                      <p className="text-sm text-[#6B7280]">
                        Placed{' '}
                        {new Date(order.created_at).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${statusBadgeClass(order.status)}`}
                  >
                    {statusLabel(order.status)}
                  </span>
                </div>

                {order.status === 'CANCELLED' ? (
                  <div className="rounded-xl bg-red-50 px-4 py-8 text-center">
                    <XCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
                    <p className="font-semibold text-red-700">
                      This order was cancelled
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {STATUS_STEPS.map((step, index) => {
                      const isDone = currentStepIndex >= index;
                      const isCurrent = currentStepIndex === index;
                      return (
                        <div key={step} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-full ${
                                isDone
                                  ? 'bg-[#1A73A8] text-white'
                                  : 'bg-gray-200 text-gray-400'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <Clock className="h-5 w-5" />
                              )}
                            </div>
                            {index < STATUS_STEPS.length - 1 && (
                              <div
                                className={`my-1 h-10 w-1 ${
                                  currentStepIndex > index
                                    ? 'bg-[#1A73A8]'
                                    : 'bg-gray-200'
                                }`}
                              />
                            )}
                          </div>
                          <div className="pt-2">
                            <h3
                              className={`font-semibold ${
                                isDone ? 'text-[#0D2B3A]' : 'text-gray-400'
                              }`}
                            >
                              {statusLabel(step)}
                            </h3>
                            {isCurrent && (
                              <p className="text-sm text-[#6B7280]">
                                Current status
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-2 text-[#0D2B3A]">
                    <CreditCard className="h-5 w-5 text-[#1A73A8]" />
                    <h3 className="font-semibold">Payment</h3>
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    Method:{' '}
                    <span className="font-medium text-[#0D2B3A]">
                      {paymentMethodLabel(order.payment_method)}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    Status:{' '}
                    <span className="font-medium text-[#0D2B3A]">
                      {paymentStatusLabel(displayPaymentStatus(order))}
                    </span>
                  </p>
                  <p className="mt-3 text-lg font-bold text-[#1A73A8]">
                    Rs. {Number(order.total_amount).toLocaleString()}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-2 text-[#0D2B3A]">
                    <MapPin className="h-5 w-5 text-[#1A73A8]" />
                    <h3 className="font-semibold">Delivery</h3>
                  </div>
                  <p className="text-sm text-[#0D2B3A]">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {order.shipping.address}
                    <br />
                    {order.shipping.city}
                    {order.shipping.postalCode
                      ? `, ${order.shipping.postalCode}`
                      : ''}
                    <br />
                    {order.customer.phone}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-[#0D2B3A]">
                  <Truck className="h-5 w-5 text-[#1A73A8]" />
                  <h3 className="font-semibold">Items</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 py-3 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-[#0D2B3A]">{item.name}</p>
                        <p className="text-[#6B7280]">
                          Qty {item.quantity}
                          {item.unit_name ? ` ${item.unit_name}` : ''} × Rs.{' '}
                          {Number(item.price).toLocaleString()}
                        </p>
                      </div>
                      <p className="shrink-0 font-semibold text-[#0D2B3A]">
                        Rs. {Number(item.total_price).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
export default function OrderStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <Loader2 className="h-8 w-8 animate-spin text-[#1A73A8]" />
        </div>
      }
    >
      <OrderStatusContent />
    </Suspense>
  );
}
