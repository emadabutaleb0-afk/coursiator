import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { paymentService, Transaction } from '@/lib/paymentService'; // Import Service
import {
  CreditCard, Lock, ArrowLeft, Check, Loader2, AlertCircle,
  Zap, Shield, TrendingUp,
} from 'lucide-react';

/**
 * Enhanced Checkout Page
 * Stripe and PayPal payment integration with order confirmation
 */

export default function EnhancedCheckout() {
  const { t, language } = useLanguage();
  const { items, getSubtotal, getTax, getTotalPrice, clearCart, couponCode, discountAmount } = useCart();
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [error, setError] = useState('');

  // Form state... (unchanged)
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Validate card details
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        throw new Error('Please fill in all card details');
      }

      if (formData.cardNumber.length < 13) {
        throw new Error('Invalid card number');
      }

      // Create Transaction
      const transaction: Transaction = {
        id: `txn_${Date.now()}`,
        userId: user?.id || 'guest',
        amount: getSubtotal(),
        currency: 'USD',
        paymentMethod: 'stripe',
        status: 'completed',
        couponCode: couponCode || undefined,
        discountAmount: discountAmount,
        finalAmount: getTotalPrice(),
        timestamp: new Date(),
        invoiceNumber: '',
        description: `Purchase of ${items.length} courses`,
      };

      const invNum = paymentService.createTransaction(transaction);
      setInvoiceNumber(invNum);

      // Consume Coupon
      if (couponCode) {
        paymentService.useCoupon(couponCode);
      }

      setOrderPlaced(true);
      setTimeout(() => {
        clearCart();
        navigate(`/order-confirmation?orderId=${invNum}`);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setIsProcessing(false);
    }
  };

  const handlePayPalPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      // Simulate PayPal payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create Transaction
      const transaction: Transaction = {
        id: `txn_${Date.now()}`,
        userId: user?.id || 'guest',
        amount: getSubtotal(),
        currency: 'USD',
        paymentMethod: 'paypal',
        status: 'completed',
        couponCode: couponCode || undefined,
        discountAmount: discountAmount,
        finalAmount: getTotalPrice(),
        timestamp: new Date(),
        invoiceNumber: '',
        description: `Purchase of ${items.length} courses`,
      };

      const invNum = paymentService.createTransaction(transaction);
      setInvoiceNumber(invNum);

      if (couponCode) {
        paymentService.useCoupon(couponCode);
      }

      setOrderPlaced(true);
      setTimeout(() => {
        clearCart();
        navigate(`/order-confirmation?orderId=${invNum}`);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    // ... empty cart UI (unchanged)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
        <div className="container mx-auto text-center py-20">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Cart is Empty</h1>
          <p className="text-foreground/70 mb-8">Add courses before proceeding to checkout</p>
          <Button onClick={() => navigate('/courses')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
        <div className="glass-card border border-white/10 rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-foreground/70 mb-2">Your courses are being activated.</p>
          {invoiceNumber && <p className="text-sm font-mono text-accent mb-6">Invoice: {invoiceNumber}</p>}
          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/shopping-cart')}
          className="flex items-center gap-2 text-accent hover:underline mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('checkout.backToCart')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <div className="glass-card border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">{t('checkout.billing')}</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t('checkout.firstName')}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t('checkout.lastName')}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder={t('checkout.email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder={t('checkout.phone')}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                />

                <input
                  type="text"
                  name="address"
                  placeholder={t('checkout.address')}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                />

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder={t('checkout.city')}
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder={t('checkout.state')}
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder={t('checkout.zip')}
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                  />
                </div>
              </form>
            </div>

            {/* Payment Method Selection */}
            <div className="glass-card border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">{t('checkout.paymentMethod')}</h2>
              <div className="space-y-4">
                {/* Stripe */}
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition-smooth ${paymentMethod === 'stripe'
                  ? 'border-accent bg-accent/5'
                  : 'border-white/20 hover:border-white/40'
                  }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal')}
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 text-accent" />
                    <span className="font-semibold">{t('checkout.card')}</span>
                  </div>
                </label>

                {/* PayPal */}
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition-smooth ${paymentMethod === 'paypal'
                  ? 'border-accent bg-accent/5'
                  : 'border-white/20 hover:border-white/40'
                  }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal')}
                      className="w-4 h-4"
                    />
                    <span className="text-xl font-bold text-blue-600">PayPal</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Card Details (Stripe) */}
            {paymentMethod === 'stripe' && (
              <div className="glass-card border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">{t('checkout.card')}</h2>
                <form onSubmit={handleStripePayment} className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder={t('checkout.cardNumber')}
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={19}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder={t('checkout.expiry')}
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      maxLength={5}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder={t('checkout.cvv')}
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full gradient-button py-3 font-semibold flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('checkout.processing')}
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        {t('checkout.pay')} ${getTotalPrice().toFixed(2)}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}

            {/* PayPal Button */}
            {paymentMethod === 'paypal' && (
              <div className="glass-card border border-white/10 rounded-2xl p-6">
                <form onSubmit={handlePayPalPayment} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="text-xl font-bold">PayPal</span>
                        Pay ${getTotalPrice().toFixed(2)}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card border border-white/10 rounded-2xl p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-bold">{t('checkout.summary')}</h2>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground/70">{item.title}</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10"></div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-foreground/70">
                  <span>{t('checkout.subtotal')}</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>{t('checkout.discount')} ({couponCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-foreground/70">
                  <span>{t('checkout.tax')} (10%)</span>
                  <span>${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-3">
                  <span>{t('checkout.total')}</span>
                  <span className="text-slate-900">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Instant Access</p>
                    <p className="text-xs text-foreground/70">Start learning immediately after purchase</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Secure Payment</p>
                    <p className="text-xs text-foreground/70">Encrypted with industry-standard SSL</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Lifetime Access</p>
                    <p className="text-xs text-foreground/70">Access your courses forever</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
