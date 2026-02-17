'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Services from '../components/Services';
import { CheckCircle, ArrowRight, Lock, Truck } from 'lucide-react';
import Link from 'next/link';
import { cartUtils, CartItem } from '../../lib/utils/cart';
import { orderApi } from '../../lib/api/orderApi';
import { useAuthStore } from '../../lib/store/authStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });

  useEffect(() => {
    const items = cartUtils.getCart();
    if (items.length === 0) {
      router.push('/cart');
      return;
    }
    setCartItems(items);
  }, [router]);

  // Pre-fill form if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const nameParts = user.name?.split(' ') || [];
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone_number || user.mobile_number || '',
        address: user.address || '',
        city: '', // City not in Customer schema, user will fill manually
        postalCode: '', // Postal code not in Customer schema, user will fill manually
      }));
    }
  }, [isAuthenticated, user]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate step 1
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.postalCode) {
        alert('Please fill in all required fields');
        return;
      }
      setStep(2);
    } else {
      // Place order
      setLoading(true);
      try {
        // Prepare order data for API
        const orderData = {
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          shipping: {
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
          },
          paymentMethod: 'cash' as const,
          subtotal,
          shippingCost: shipping,
          total,
          orderNotes: formData.notes || undefined,
        };

        // Call API to create order
        const orderResponse = await orderApi.createGuestOrder(orderData);

        // Save order to localStorage for thank you page
        const orderDetails = {
          orderId: orderResponse.id,
          orderNumber: orderResponse.order_number,
          orderDate: new Date().toISOString(),
          customerInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
          },
          orderNotes: formData.notes,
          items: cartItems,
          subtotal,
          shipping,
          total,
          paymentMethod: 'cash',
          status: orderResponse.status,
        };

        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

        // Clear cart
        cartUtils.clearCart();

        // Redirect to thank you page with order number
        router.push(`/checkout/thank-you?order=${orderResponse.order_number}`);
      } catch (error: any) {
        console.error('Error placing order:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to place order. Please try again.';
        alert(errorMessage);
        setLoading(false);
      }
    }
  };

  if (cartItems.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0D2B3A] to-[#1A73A8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Checkout</h1>
            <p className="text-xl text-white/90">Complete your order</p>
          </motion.div>
        </div>
      </section>

      {/* Checkout Steps */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1
                    ? 'bg-[#1A73A8] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
              </div>
              <div
                className={`h-1 w-24 ${
                  step >= 2 ? 'bg-[#1A73A8]' : 'bg-gray-200'
                }`}
              />
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2
                    ? 'bg-[#1A73A8] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > 2 ? <CheckCircle className="w-6 h-6" /> : '2'}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-[#0D2B3A] mb-6">Shipping Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#0D2B3A] font-medium mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[#0D2B3A] font-medium mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#0D2B3A] font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#0D2B3A] font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
                        placeholder="+92 342 3344040"
                      />
                    </div>
                    <div>
                      <label className="block text-[#0D2B3A] font-medium mb-2">Delivery Address *</label>
                      <textarea
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
                        rows={3}
                        placeholder="House/Street address, Area, Landmark"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#0D2B3A] font-medium mb-2">City *</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[#0D2B3A] font-medium mb-2">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) =>
                            setFormData({ ...formData, postalCode: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#0D2B3A] font-medium mb-2">Order Notes (Optional)</label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1A73A8] focus:ring-2 focus:ring-[#1A73A8]/20 outline-none"
                        rows={3}
                        placeholder="Any special instructions for delivery..."
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-[#0D2B3A] mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-6 border-2 border-[#1A73A8] rounded-xl bg-[#DFF3EA]/30">
                        <Truck className="w-6 h-6 text-[#1A73A8] mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-bold text-[#0D2B3A] text-lg">Cash on Delivery</p>
                          <p className="text-sm text-[#6B7280] mt-1">
                            Pay with cash when your order is delivered. Our delivery person will collect the payment.
                          </p>
                          <div className="mt-3 flex items-center gap-2 text-sm text-[#1A73A8]">
                            <CheckCircle className="w-4 h-4" />
                            <span>No online payment required</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Review */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-bold text-[#0D2B3A] mb-4">Order Review</h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-[#6B7280]">
                              {item.name} x {item.quantity}
                            </span>
                            <span className="font-semibold text-[#0D2B3A]">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                        </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex space-x-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      disabled={loading}
                      className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-[#0D2B3A] rounded-full font-semibold transition-colors disabled:opacity-50"
                    >
                      Back
                    </button>
                  )}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.05 }}
                    whileTap={{ scale: loading ? 1 : 0.95 }}
                    className="flex-1 bg-[#1A73A8] hover:bg-[#0D2B3A] text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Placing Order...</span>
                      </>
                    ) : (
                      <>
                    <span>{step === 1 ? 'Continue to Payment' : 'Place Order'}</span>
                    {step === 2 && <Lock className="w-5 h-5" />}
                    {step === 1 && <ArrowRight className="w-5 h-5" />}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-[#F8F2DE] rounded-2xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-[#0D2B3A] mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-200">
                      <img
                        src={item.image || '/Banner-01.jpg'}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-[#0D2B3A] text-sm">{item.name}</p>
                        <p className="text-xs text-[#6B7280]">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-[#1A73A8]">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between text-[#6B7280] pt-2">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                    <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        `Rs. ${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {subtotal < 5000 && (
                    <p className="text-sm text-[#6B7280]">
                      Add Rs. {(5000 - subtotal).toLocaleString()} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-xl font-bold text-[#0D2B3A]">
                      <span>Total</span>
                      <span>Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Services />
      <Footer />
    </div>
  );
}
