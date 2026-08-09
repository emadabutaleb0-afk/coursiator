import { useState } from 'react';
// import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Plus, Edit2, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { paymentService } from '@/lib/paymentService';

/**
 * صفحة إدارة الكوبونات والأكواز الترويجية
 */

export default function CouponManagement() {
  // const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'coupons' | 'promos'>('coupons');
  const [showForm, setShowForm] = useState(false);
  // const [editingId, setEditingId] = useState<string | null>(null);
  const [coupons, setCoupons] = useState(paymentService.getAllCoupons());
  const [promoCodes, setPromoCodes] = useState(paymentService.getAllPromoCodes());

  // نموذج الكوبون
  const [couponForm, setCouponForm] = useState<{
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    maxUses: number;
    minPurchase: number;
    description: string;
    expiryDays: number;
  }>({
    code: '',
    type: 'percentage',
    value: 0,
    maxUses: 100,
    minPurchase: 0,
    description: '',
    expiryDays: 30,
  });

  // نموذج الكود الترويجي
  const [promoForm, setPromoForm] = useState({
    code: '',
    discount: 10,
    maxUses: 50,
    description: '',
    expiryDays: 30,
  });

  // إضافة كوبون جديد
  const handleAddCoupon = () => {
    if (!couponForm.code.trim()) {
      alert('أدخل كود الكوبون');
      return;
    }

    const newCoupon = {
      id: `coupon_${Date.now()}`,
      code: couponForm.code.toUpperCase(),
      type: couponForm.type,
      value: couponForm.value,
      maxUses: couponForm.maxUses,
      usedCount: 0,
      expiryDate: new Date(Date.now() + couponForm.expiryDays * 24 * 60 * 60 * 1000),
      minPurchase: couponForm.minPurchase || undefined,
      isActive: true,
      description: couponForm.description,
    };

    paymentService.createCoupon(newCoupon);
    setCoupons(paymentService.getAllCoupons());
    setCouponForm({
      code: '',
      type: 'percentage',
      value: 0,
      maxUses: 100,
      minPurchase: 0,
      description: '',
      expiryDays: 30,
    });
    setShowForm(false);
  };

  // إضافة كود ترويجي جديد
  const handleAddPromo = () => {
    if (!promoForm.code.trim()) {
      alert('أدخل الكود الترويجي');
      return;
    }

    const newPromo = {
      id: `promo_${Date.now()}`,
      code: promoForm.code.toUpperCase(),
      discount: promoForm.discount,
      maxUses: promoForm.maxUses,
      usedCount: 0,
      expiryDate: new Date(Date.now() + promoForm.expiryDays * 24 * 60 * 60 * 1000),
      createdBy: 'admin_1',
      description: promoForm.description,
      isActive: true,
    };

    paymentService.createPromoCode(newPromo);
    setPromoCodes(paymentService.getAllPromoCodes());
    setPromoForm({
      code: '',
      discount: 10,
      maxUses: 50,
      description: '',
      expiryDays: 30,
    });
    setShowForm(false);
  };

  // حذف كوبون
  const handleDeleteCoupon = (code: string) => {
    if (confirm('هل تريد حذف هذا الكوبون؟')) {
      paymentService.deleteCoupon(code);
      setCoupons(paymentService.getAllCoupons());
    }
  };

  // نسخ الكود
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('تم نسخ الكود');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-SA');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <section className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">إدارة الكوبونات والأكواز</h1>
            <Button onClick={() => setShowForm(true)} className="gradient-button">
              <Plus className="w-4 h-4 mr-2" />
              إضافة جديد
            </Button>
          </div>

          {/* الأتاب */}
          <div className="flex gap-4 mb-8 border-b border-white/10">
            <button
              onClick={() => setActiveTab('coupons')}
              className={`px-4 py-2 font-semibold transition-smooth ${activeTab === 'coupons'
                ? 'text-accent border-b-2 border-accent'
                : 'text-foreground/60 hover:text-foreground'
                }`}
            >
              الكوبونات
            </button>
            <button
              onClick={() => setActiveTab('promos')}
              className={`px-4 py-2 font-semibold transition-smooth ${activeTab === 'promos'
                ? 'text-accent border-b-2 border-accent'
                : 'text-foreground/60 hover:text-foreground'
                }`}
            >
              الأكواز الترويجية
            </button>
          </div>

          {/* جدول الكوبونات */}
          {activeTab === 'coupons' && (
            <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-right font-semibold">الكود</th>
                      <th className="px-6 py-4 text-right font-semibold">النوع</th>
                      <th className="px-6 py-4 text-right font-semibold">القيمة</th>
                      <th className="px-6 py-4 text-right font-semibold">الاستخدام</th>
                      <th className="px-6 py-4 text-right font-semibold">انتهاء الصلاحية</th>
                      <th className="px-6 py-4 text-right font-semibold">الحالة</th>
                      <th className="px-6 py-4 text-right font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((coupon) => (
                      <tr key={coupon.code} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="font-mono font-bold text-accent">{coupon.code}</code>
                            <button
                              onClick={() => copyToClipboard(coupon.code)}
                              className="p-1 hover:bg-white/10 rounded transition-smooth"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                            {coupon.type === 'percentage' ? 'نسبة مئوية' : 'مبلغ ثابت'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-semibold">{coupon.usedCount}/{coupon.maxUses}</p>
                            <div className="w-20 h-2 bg-white/10 rounded-full mt-1">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                                style={{ width: `${(coupon.usedCount / coupon.maxUses) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{formatDate(coupon.expiryDate)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${coupon.isActive
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-red-500/20 text-red-600'
                            }`}>
                            {coupon.isActive ? 'نشط' : 'معطل'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-white/10 rounded transition-smooth">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCoupon(coupon.code)}
                              className="p-2 hover:bg-red-500/20 text-red-600 rounded transition-smooth"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* جدول الأكواز الترويجية */}
          {activeTab === 'promos' && (
            <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-right font-semibold">الكود</th>
                      <th className="px-6 py-4 text-right font-semibold">الخصم</th>
                      <th className="px-6 py-4 text-right font-semibold">الاستخدام</th>
                      <th className="px-6 py-4 text-right font-semibold">انتهاء الصلاحية</th>
                      <th className="px-6 py-4 text-right font-semibold">الحالة</th>
                      <th className="px-6 py-4 text-right font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((promo) => (
                      <tr key={promo.code} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="font-mono font-bold text-accent">{promo.code}</code>
                            <button
                              onClick={() => copyToClipboard(promo.code)}
                              className="p-1 hover:bg-white/10 rounded transition-smooth"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold">{promo.discount}%</td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-semibold">{promo.usedCount}/{promo.maxUses}</p>
                            <div className="w-20 h-2 bg-white/10 rounded-full mt-1">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                                style={{ width: `${(promo.usedCount / promo.maxUses) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{formatDate(promo.expiryDate)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${promo.isActive
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-red-500/20 text-red-600'
                            }`}>
                            {promo.isActive ? 'نشط' : 'معطل'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-white/10 rounded transition-smooth">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-red-500/20 text-red-600 rounded transition-smooth">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* نموذج الإضافة */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-6">
              {activeTab === 'coupons' ? 'إضافة كوبون جديد' : 'إضافة كود ترويجي جديد'}
            </h2>

            {activeTab === 'coupons' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">الكود</label>
                  <input
                    type="text"
                    value={couponForm.code}
                    onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                    placeholder="مثال: WELCOME50"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">النوع</label>
                    <select
                      value={couponForm.type}
                      onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="percentage">نسبة مئوية</option>
                      <option value="fixed">مبلغ ثابت</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">القيمة</label>
                    <input
                      type="number"
                      value={couponForm.value}
                      onChange={(e) => setCouponForm({ ...couponForm, value: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">الحد الأقصى للاستخدام</label>
                  <input
                    type="number"
                    value={couponForm.maxUses}
                    onChange={(e) => setCouponForm({ ...couponForm, maxUses: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">الحد الأدنى للشراء</label>
                  <input
                    type="number"
                    value={couponForm.minPurchase}
                    onChange={(e) => setCouponForm({ ...couponForm, minPurchase: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">صلاحية (أيام)</label>
                  <input
                    type="number"
                    value={couponForm.expiryDays}
                    onChange={(e) => setCouponForm({ ...couponForm, expiryDays: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">الوصف</label>
                  <textarea
                    value={couponForm.description}
                    onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                    placeholder="وصف الكوبون..."
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleAddCoupon} className="flex-1 gradient-button">
                    إضافة
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                    إلغاء
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">الكود</label>
                  <input
                    type="text"
                    value={promoForm.code}
                    onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value })}
                    placeholder="مثال: SUMMER2024"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">الخصم (%)</label>
                    <input
                      type="number"
                      value={promoForm.discount}
                      onChange={(e) => setPromoForm({ ...promoForm, discount: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">الحد الأقصى</label>
                    <input
                      type="number"
                      value={promoForm.maxUses}
                      onChange={(e) => setPromoForm({ ...promoForm, maxUses: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">صلاحية (أيام)</label>
                  <input
                    type="number"
                    value={promoForm.expiryDays}
                    onChange={(e) => setPromoForm({ ...promoForm, expiryDays: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">الوصف</label>
                  <textarea
                    value={promoForm.description}
                    onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                    placeholder="وصف الكود الترويجي..."
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleAddPromo} className="flex-1 gradient-button">
                    إضافة
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                    إلغاء
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
