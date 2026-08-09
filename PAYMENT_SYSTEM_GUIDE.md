# دليل نظام الدفع والكوبونات

## 📋 نظرة عامة

نظام الدفع المتقدم في Coursiator يوفر:
- دعم Stripe و PayPal
- نظام الكوبونات والأكواز الترويجية
- إدارة الفواتير والمعاملات
- تتبع الخصومات والعروض الخاصة

## 🏗️ البنية المعمارية

### الخدمات الرئيسية

#### 1. PaymentService
خدمة مركزية لإدارة جميع عمليات الدفع

```typescript
// الميزات الرئيسية:
- إدارة الكوبونات (Coupons)
- إدارة الأكواز الترويجية (Promo Codes)
- إدارة المعاملات (Transactions)
- إدارة الفواتير (Invoices)
- إدارة خطط الدفع (Payment Plans)
- إدارة المبالغ المسترجعة (Refunds)
```

### الصفحات والواجهات

#### 1. صفحة الدفع (Checkout)
**المسار**: `/checkout`

**الميزات**:
- عرض سلة التسوق
- تطبيق الكوبونات
- تطبيق الأكواز الترويجية
- اختيار طريقة الدفع
- ملخص الدفع والفاتورة

**طرق الدفع المدعومة**:
- Stripe (بطاقة ائتمان)
- PayPal
- محفظة Coursiator

#### 2. صفحة إدارة الكوبونات (Coupon Management)
**المسار**: `/coupon-management`

**الميزات**:
- إنشاء كوبونات جديدة
- إدارة الأكواز الترويجية
- تتبع الاستخدام
- تفعيل/تعطيل الكوبونات
- نسخ الأكواز

## 📊 أنواع البيانات

### 1. الكوبون (Coupon)

```typescript
interface Coupon {
  id: string;                    // معرف فريد
  code: string;                  // كود الكوبون (مثال: WELCOME50)
  type: 'percentage' | 'fixed' | 'free-session';  // نوع الخصم
  value: number;                 // قيمة الخصم
  maxUses: number;               // الحد الأقصى للاستخدام
  usedCount: number;             // عدد مرات الاستخدام
  expiryDate: Date;              // تاريخ انتهاء الصلاحية
  minPurchase?: number;          // الحد الأدنى للشراء
  applicableCourses?: string[];  // الدورات المطبقة عليها
  isActive: boolean;             // هل الكوبون نشط
  description: string;           // وصف الكوبون
}
```

### 2. الكود الترويجي (Promo Code)

```typescript
interface PromoCode {
  id: string;                    // معرف فريد
  code: string;                  // الكود الترويجي
  discount: number;              // نسبة الخصم (%)
  maxUses: number;               // الحد الأقصى للاستخدام
  usedCount: number;             // عدد مرات الاستخدام
  expiryDate: Date;              // تاريخ انتهاء الصلاحية
  createdBy: string;             // من أنشأ الكود
  description: string;           // وصف الكود
  isActive: boolean;             // هل الكود نشط
}
```

### 3. المعاملة (Transaction)

```typescript
interface Transaction {
  id: string;                    // معرف فريد
  userId: string;                // معرف المستخدم
  amount: number;                // المبلغ الأصلي
  currency: string;              // العملة
  paymentMethod: string;         // طريقة الدفع
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  courseId?: string;             // معرف الدورة (اختياري)
  sessionId?: string;            // معرف الجلسة (اختياري)
  couponCode?: string;           // كود الكوبون المستخدم
  discountAmount: number;        // مبلغ الخصم
  finalAmount: number;           // المبلغ النهائي
  stripePaymentId?: string;      // معرف Stripe
  paypalTransactionId?: string;  // معرف PayPal
  timestamp: Date;               // وقت المعاملة
  invoiceNumber: string;         // رقم الفاتورة
  description: string;           // وصف المعاملة
}
```

### 4. الفاتورة (Invoice)

```typescript
interface Invoice {
  id: string;                    // معرف فريد
  invoiceNumber: string;         // رقم الفاتورة (مثال: INV-202412-00001)
  userId: string;                // معرف المستخدم
  amount: number;                // المبلغ الأصلي
  discountAmount: number;        // مبلغ الخصم
  finalAmount: number;           // المبلغ النهائي
  items: InvoiceItem[];          // عناصر الفاتورة
  issueDate: Date;               // تاريخ الإصدار
  dueDate: Date;                 // تاريخ الاستحقاق
  paidDate?: Date;               // تاريخ الدفع
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: string;        // طريقة الدفع
  notes?: string;                // ملاحظات
}
```

## 🔧 الاستخدام

### 1. التحقق من صحة الكوبون

```typescript
import { paymentService } from '@/lib/paymentService';

const result = paymentService.validateCoupon('WELCOME50', 100);
// النتيجة:
// {
//   valid: true,
//   discount: 50,
//   message: 'الكوبون صحيح'
// }
```

### 2. استخدام الكوبون

```typescript
paymentService.useCoupon('WELCOME50');
```

### 3. إنشاء معاملة

```typescript
const transaction = {
  id: 'trans_123',
  userId: 'student_1',
  amount: 100,
  currency: 'USD',
  paymentMethod: 'stripe',
  status: 'completed',
  discountAmount: 50,
  finalAmount: 50,
  couponCode: 'WELCOME50',
  timestamp: new Date(),
  invoiceNumber: '',
  description: 'شراء دورة',
};

const invoiceNumber = paymentService.createTransaction(transaction);
```

### 4. إنشاء فاتورة

```typescript
const invoice = {
  id: 'inv_123',
  invoiceNumber: 'INV-202412-00001',
  userId: 'student_1',
  amount: 100,
  discountAmount: 50,
  finalAmount: 50,
  items: [
    {
      id: 'item_1',
      description: 'دورة IELTS',
      quantity: 1,
      unitPrice: 100,
      totalPrice: 100,
    },
  ],
  issueDate: new Date(),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  status: 'paid',
  paymentMethod: 'stripe',
};

paymentService.createInvoice(invoice);
```

## 💰 خطط الدفع المدعومة

### 1. الخطة الأساسية
- **السعر**: $29.99/شهر
- **الجلسات**: 5 جلسات شهرية
- **الميزات**: وصول للفيديوهات، معلم ذكي

### 2. الخطة الاحترافية
- **السعر**: $79.99/شهر
- **الجلسات**: 20 جلسة شهرية
- **الميزات**: وصول كامل، معلم ذكي، تقارير مفصلة

### 3. الخطة المتقدمة
- **السعر**: $199.99/شهر
- **الجلسات**: جلسات غير محدودة
- **الميزات**: وصول كامل، معلم ذكي، تقارير مفصلة، دعم 24/7

## 📊 الإحصائيات والتقارير

### الإحصائيات المتاحة

```typescript
const stats = paymentService.getRevenueStats();
// النتيجة:
// {
//   totalTransactions: 150,
//   completedTransactions: 145,
//   totalRevenue: 15000,
//   totalDiscounts: 2500,
//   averageTransaction: 103.45,
//   failedTransactions: 5
// }
```

## 🔐 الأمان

### أفضل الممارسات

1. **التحقق من الكوبونات**
   - التحقق من الصلاحية
   - التحقق من الحد الأقصى للاستخدام
   - التحقق من الحد الأدنى للشراء

2. **حماية البيانات**
   - تشفير معلومات الدفع
   - عدم تخزين بيانات البطاقة محلياً
   - استخدام HTTPS فقط

3. **منع الاحتيال**
   - تتبع المعاملات المشبوهة
   - تحديد حد أقصى للخصم
   - التحقق من هوية المستخدم

## 🔄 التكامل مع Stripe و PayPal

### Stripe Integration
```typescript
// يتطلب مفتاح API
const stripeKey = process.env.STRIPE_PUBLIC_KEY;

// إنشاء جلسة دفع
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [...],
  mode: 'payment',
  success_url: 'https://coursiator.com/success',
  cancel_url: 'https://coursiator.com/cancel',
});
```

### PayPal Integration
```typescript
// يتطلب معرف العميل والسر
const clientId = process.env.PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_SECRET;

// إنشاء طلب دفع
const order = await paypalClient.execute({
  intent: 'sale',
  payer: {...},
  transactions: [...],
});
```

## 📱 واجهات المستخدم

### صفحة الدفع
- عرض العناصر المشتراة
- إدخال كود الكوبون
- إدخال الكود الترويجي
- اختيار طريقة الدفع
- ملخص الدفع النهائي

### صفحة إدارة الكوبونات
- جدول الكوبونات النشطة
- جدول الأكواز الترويجية
- إضافة كوبون جديد
- تعديل الكوبونات
- حذف الكوبونات
- نسخ الأكواز

## 🚀 الخطوات التالية

1. **تطبيق Stripe API الحقيقي**
   - توصيل مفاتيح API
   - معالجة الدفع الفعلية
   - التعامل مع الأخطاء

2. **تطبيق PayPal API الحقيقي**
   - توصيل معرف العميل
   - معالجة الدفع الفعلية
   - التعامل مع الأخطاء

3. **إضافة نظام الإشعارات**
   - إرسال رسائل بريد إلكترونية للفواتير
   - إرسال إشعارات SMS
   - إرسال إشعارات في التطبيق

4. **تقارير متقدمة**
   - تقارير الإيرادات
   - تقارير الخصومات
   - تقارير المستخدمين

---

**آخر تحديث**: ديسمبر 2025  
**الإصدار**: 2.0.0 (مع نظام الدفع)
