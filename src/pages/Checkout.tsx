import { useState } from 'react';
// import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CreditCard, Wallet, Gift, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { paymentService } from '@/lib/paymentService';

/**
 * صفحة الدفع المتقدمة
 * تدعم Stripe و PayPal والكوبونات والأكواز الترويجية
 */

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'course' | 'session' | 'plan';
}

export default function Checkout() {
  // const { t } = useLanguage();
  const [cartItems] = useState<CartItem[]>([
    {
      id: 'course_1',
      name: 'دورة IELTS المتقدمة',
      price: 99.99,
      quantity: 1,
      type: 'course',
    },
    {
      id: 'session_1',
      name: 'جلسة مع معلم خاص',
      price: 50,
      quantity: 2,
      type: 'session',
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'wallet'>('stripe');
  const [couponCode, setCouponCode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [promoError, setPromoError] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // حساب الإجماليات
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = couponDiscount + promoDiscount;
  const total = Math.max(0, subtotal - totalDiscount);

  // تطبيق الكوبون
  const applyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('أدخل كود الكوبون');
      return;
    }

    const result = paymentService.validateCoupon(couponCode, subtotal);
    if (result.valid) {
      setCouponDiscount(result.discount);
      setAppliedCoupon(couponCode);
      setCouponError('');
      paymentService.useCoupon(couponCode);
    } else {
      setCouponError(result.message);
      setCouponDiscount(0);
      setAppliedCoupon(null);
    }
  };

  // تطبيق كود ترويجي
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoError('أدخل الكود الترويجي');
      return;
    }

    const result = paymentService.validatePromoCode(promoCode);
    if (result.valid) {
      const discount = (subtotal * result.discount) / 100;
      setPromoDiscount(discount);
      setAppliedPromo(promoCode);
      setPromoError('');
      paymentService.usePromoCode(promoCode);
    } else {
      setPromoError(result.message);
      setPromoDiscount(0);
      setAppliedPromo(null);
    }
  };

  // معالجة الدفع
  const handlePayment = async () => {
    setProcessingPayment(true);

    // محاكاة معالجة الدفع
    setTimeout(() => {
      const transaction = {
        id: `trans_${Date.now()}`,
        userId: 'student_1',
        amount: subtotal,
        currency: 'USD',
        paymentMethod,
        status: 'completed' as const,
        discountAmount: totalDiscount,
        finalAmount: total,
        couponCode: appliedCoupon || undefined,
        timestamp: new Date(),
        invoiceNumber: '',
        description: `دفع لـ ${cartItems.length} عنصر`,
      };

      const invoiceNumber = paymentService.createTransaction(transaction);
      setProcessingPayment(false);
      setPaymentSuccess(true);

      // إنشاء فاتورة
      const invoice = {
        id: `inv_${Date.now()}`,
        invoiceNumber,
        userId: 'student_1',
        amount: subtotal,
        discountAmount: totalDiscount,
        finalAmount: total,
        items: cartItems.map(item => ({
          id: item.id,
          description: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
        })),
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'paid' as const,
        paymentMethod,
      };

      paymentService.createInvoice(invoice);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Header />
        <section className="flex-1 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">تم الدفع بنجاح!</h1>
              <p className="text-foreground/70 mb-6">
                شكراً لك على الشراء. سيتم إرسال الفاتورة إلى بريدك الإلكتروني.
              </p>
              <Button className="gradient-button" onClick={() => window.location.href = '/'}>
                العودة للرئيسية
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <section className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">الدفع والفاتورة</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* سلة التسوق */}
            <div className="lg:col-span-2 space-y-6">
              {/* ملخص السلة */}
              <div className="glass-card border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-foreground/60">الكمية: {item.quantity}</p>
                      </div>
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* الكوبونات والأكواز */}
              <div className="glass-card border border-white/10 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold">الخصومات</h2>

                {/* الكوبون */}
                <div>
                  <label className="block text-sm font-semibold mb-2">كود الكوبون</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="أدخل كود الكوبون"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      disabled={appliedCoupon !== null}
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                    />
                    {appliedCoupon ? (
                      <button
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponCode('');
                          setCouponDiscount(0);
                        }}
                        className="px-4 py-2 bg-red-500/20 text-red-600 rounded-lg hover:bg-red-500/30 transition-smooth"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    ) : (
                      <Button onClick={applyCoupon} variant="outline">
                        <Gift className="w-4 h-4 mr-2" />
                        تطبيق
                      </Button>
                    )}
                  </div>
                  {couponError && (
                    <p className="text-sm text-red-500 mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {couponError}
                    </p>
                  )}
                  {appliedCoupon && (
                    <p className="text-sm text-green-500 mt-2 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      تم تطبيق الكوبون بنجاح
                    </p>
                  )}
                </div>

                {/* الكود الترويجي */}
                <div>
                  <label className="block text-sm font-semibold mb-2">الكود الترويجي</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="أدخل الكود الترويجي"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      disabled={appliedPromo !== null}
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                    />
                    {appliedPromo ? (
                      <button
                        onClick={() => {
                          setAppliedPromo(null);
                          setPromoCode('');
                          setPromoDiscount(0);
                        }}
                        className="px-4 py-2 bg-red-500/20 text-red-600 rounded-lg hover:bg-red-500/30 transition-smooth"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    ) : (
                      <Button onClick={applyPromoCode} variant="outline">
                        <Gift className="w-4 h-4 mr-2" />
                        تطبيق
                      </Button>
                    )}
                  </div>
                  {promoError && (
                    <p className="text-sm text-red-500 mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {promoError}
                    </p>
                  )}
                  {appliedPromo && (
                    <p className="text-sm text-green-500 mt-2 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      تم تطبيق الكود بنجاح
                    </p>
                  )}
                </div>
              </div>

              {/* طرق الدفع */}
              <div className="glass-card border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">طريقة الدفع</h2>
                <div className="space-y-3">
                  {/* Stripe */}
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-white/5 transition-smooth">
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal' | 'wallet')}
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 mr-3 text-accent" />
                    <span className="font-semibold">Stripe - بطاقة ائتمان</span>
                  </label>

                  {/* PayPal */}
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-white/5 transition-smooth">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal' | 'wallet')}
                      className="w-4 h-4"
                    />
                    <Wallet className="w-5 h-5 mr-3 text-accent" />
                    <span className="font-semibold">PayPal</span>
                  </label>

                  {/* المحفظة */}
                  <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-white/5 transition-smooth">
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal' | 'wallet')}
                      className="w-4 h-4"
                    />
                    <Wallet className="w-5 h-5 mr-3 text-accent" />
                    <span className="font-semibold">محفظة Coursiator</span>
                  </label>
                </div>
              </div>
            </div>

            {/* ملخص الدفع */}
            <div className="lg:col-span-1">
              <div className="glass-card border border-white/10 rounded-2xl p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">ملخص الدفع</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">المجموع الفرعي</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>خصم الكوبون</span>
                      <span>-${couponDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>خصم الكود الترويجي</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>إجمالي الخصم</span>
                      <span>-${totalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mb-6 text-lg">
                  <span className="font-bold">الإجمالي</span>
                  <span className="font-bold gradient-text">${total.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={processingPayment}
                  className="w-full gradient-button"
                >
                  {processingPayment ? 'جاري المعالجة...' : 'إتمام الدفع'}
                </Button>

                <p className="text-xs text-foreground/60 text-center mt-4">
                  بالنقر على الزر، أوافق على شروط الخدمة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
