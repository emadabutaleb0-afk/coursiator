/**
 * خدمة الدفع المتقدمة
 * تدعم Stripe و PayPal والكوبونات والأكواز الترويجية
 */

export interface PaymentMethod {
  id: string;
  type: 'stripe' | 'paypal' | 'wallet';
  name: string;
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free-session';
  value: number; // النسبة المئوية أو المبلغ
  maxUses: number;
  usedCount: number;
  expiryDate: Date;
  minPurchase?: number;
  applicableCourses?: string[];
  isActive: boolean;
  description: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discount: number; // النسبة المئوية
  maxUses: number;
  usedCount: number;
  expiryDate: Date;
  createdBy: string; // معرف المدرس أو الإدارة
  description: string;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  courseId?: string;
  sessionId?: string;
  couponCode?: string;
  discountAmount: number;
  finalAmount: number;
  stripePaymentId?: string;
  paypalTransactionId?: string;
  timestamp: Date;
  invoiceNumber: string;
  description: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  amount: number;
  discountAmount: number;
  finalAmount: number;
  items: InvoiceItem[];
  issueDate: Date;
  dueDate: Date;
  paidDate?: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: string;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  courseId?: string;
  sessionId?: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  features: string[];
  maxSessions?: number;
  maxCourses?: number;
  isPopular?: boolean;
}

export interface Refund {
  id: string;
  transactionId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: Date;
  processedDate?: Date;
  refundMethod: 'original' | 'wallet';
}

// خدمة الدفع
export class PaymentService {
  private static instance: PaymentService;
  private coupons: Map<string, Coupon> = new Map();
  private promoCodes: Map<string, PromoCode> = new Map();
  private transactions: Transaction[] = [];
  private invoices: Invoice[] = [];
  private paymentMethods: Map<string, PaymentMethod[]> = new Map();
  private paymentPlans: PaymentPlan[] = [];
  private refunds: Refund[] = [];

  private constructor() {
    this.initializeDefaultData();
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  // ===== إدارة الكوبونات =====

  public createCoupon(coupon: Coupon): void {
    this.coupons.set(coupon.code, coupon);
    this.logAction('CREATE_COUPON', coupon.code);
  }

  public getCoupon(code: string): Coupon | undefined {
    return this.coupons.get(code.toUpperCase());
  }

  public validateCoupon(code: string, purchaseAmount: number): { valid: boolean; discount: number; message: string } {
    const coupon = this.getCoupon(code);

    if (!coupon) {
      return { valid: false, discount: 0, message: 'الكوبون غير موجود' };
    }

    if (!coupon.isActive) {
      return { valid: false, discount: 0, message: 'الكوبون غير نشط' };
    }

    if (coupon.usedCount >= coupon.maxUses) {
      return { valid: false, discount: 0, message: 'انتهت عدد استخدامات الكوبون' };
    }

    if (new Date() > coupon.expiryDate) {
      return { valid: false, discount: 0, message: 'انتهت صلاحية الكوبون' };
    }

    if (coupon.minPurchase && purchaseAmount < coupon.minPurchase) {
      return {
        valid: false,
        discount: 0,
        message: `الحد الأدنى للشراء: ${coupon.minPurchase}`
      };
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (purchaseAmount * coupon.value) / 100;
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }

    return { valid: true, discount, message: 'الكوبون صحيح' };
  }

  public useCoupon(code: string): void {
    const coupon = this.getCoupon(code);
    if (coupon) {
      coupon.usedCount++;
      this.logAction('USE_COUPON', code);
    }
  }

  public getAllCoupons(): Coupon[] {
    return Array.from(this.coupons.values());
  }

  public updateCoupon(code: string, updates: Partial<Coupon>): void {
    const coupon = this.getCoupon(code);
    if (coupon) {
      Object.assign(coupon, updates);
      this.logAction('UPDATE_COUPON', code);
    }
  }

  public deleteCoupon(code: string): void {
    this.coupons.delete(code);
    this.logAction('DELETE_COUPON', code);
  }

  // ===== إدارة أكواز الترويج =====

  public createPromoCode(promo: PromoCode): void {
    this.promoCodes.set(promo.code, promo);
    this.logAction('CREATE_PROMO', promo.code);
  }

  public getPromoCode(code: string): PromoCode | undefined {
    return this.promoCodes.get(code.toUpperCase());
  }

  public validatePromoCode(code: string): { valid: boolean; discount: number; message: string } {
    const promo = this.getPromoCode(code);

    if (!promo) {
      return { valid: false, discount: 0, message: 'الكود الترويجي غير موجود' };
    }

    if (!promo.isActive) {
      return { valid: false, discount: 0, message: 'الكود الترويجي غير نشط' };
    }

    if (promo.usedCount >= promo.maxUses) {
      return { valid: false, discount: 0, message: 'انتهت عدد استخدامات الكود' };
    }

    if (new Date() > promo.expiryDate) {
      return { valid: false, discount: 0, message: 'انتهت صلاحية الكود' };
    }

    return { valid: true, discount: promo.discount, message: 'الكود صحيح' };
  }

  public usePromoCode(code: string): void {
    const promo = this.getPromoCode(code);
    if (promo) {
      promo.usedCount++;
      this.logAction('USE_PROMO', code);
    }
  }

  public getAllPromoCodes(): PromoCode[] {
    return Array.from(this.promoCodes.values());
  }

  // ===== إدارة المعاملات =====

  public createTransaction(transaction: Transaction): string {
    transaction.invoiceNumber = this.generateInvoiceNumber();
    this.transactions.push(transaction);
    this.logAction('CREATE_TRANSACTION', transaction.id);
    return transaction.invoiceNumber;
  }

  public getTransaction(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  public getUserTransactions(userId: string): Transaction[] {
    return this.transactions.filter(t => t.userId === userId);
  }

  public updateTransactionStatus(id: string, status: Transaction['status']): void {
    const transaction = this.getTransaction(id);
    if (transaction) {
      transaction.status = status;
      this.logAction('UPDATE_TRANSACTION_STATUS', id);
    }
  }

  // ===== إدارة الفواتير =====

  public createInvoice(invoice: Invoice): void {
    invoice.invoiceNumber = this.generateInvoiceNumber();
    this.invoices.push(invoice);
    this.logAction('CREATE_INVOICE', invoice.invoiceNumber);
  }

  public getInvoice(id: string): Invoice | undefined {
    return this.invoices.find(i => i.id === id);
  }

  public getUserInvoices(userId: string): Invoice[] {
    return this.invoices.filter(i => i.userId === userId);
  }

  public markInvoiceAsPaid(id: string, paymentMethod: string): void {
    const invoice = this.getInvoice(id);
    if (invoice) {
      invoice.status = 'paid';
      invoice.paidDate = new Date();
      invoice.paymentMethod = paymentMethod;
      this.logAction('MARK_INVOICE_PAID', id);
    }
  }

  public generateInvoicePDF(id: string): string {
    // محاكاة توليد PDF
    return `invoice_${id}_${Date.now()}.pdf`;
  }

  // ===== إدارة خطط الدفع =====

  public getPaymentPlans(): PaymentPlan[] {
    return this.paymentPlans;
  }

  public getPaymentPlan(id: string): PaymentPlan | undefined {
    return this.paymentPlans.find(p => p.id === id);
  }

  public addPaymentPlan(plan: PaymentPlan): void {
    this.paymentPlans.push(plan);
    this.logAction('ADD_PAYMENT_PLAN', plan.id);
  }

  // ===== إدارة المبالغ المسترجعة =====

  public requestRefund(refund: Refund): void {
    this.refunds.push(refund);
    this.logAction('REQUEST_REFUND', refund.id);
  }

  public getRefund(id: string): Refund | undefined {
    return this.refunds.find(r => r.id === id);
  }

  public approveRefund(id: string): void {
    const refund = this.getRefund(id);
    if (refund) {
      refund.status = 'approved';
      this.logAction('APPROVE_REFUND', id);
    }
  }

  public processRefund(id: string): void {
    const refund = this.getRefund(id);
    if (refund) {
      refund.status = 'completed';
      refund.processedDate = new Date();
      this.logAction('PROCESS_REFUND', id);
    }
  }

  public getUserRefunds(userId: string): Refund[] {
    const userTransactions = this.getUserTransactions(userId);
    const transactionIds = userTransactions.map(t => t.id);
    return this.refunds.filter(r => transactionIds.includes(r.transactionId));
  }

  // ===== طرق مساعدة =====

  private generateInvoiceNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000);
    return `INV-${year}${month}-${String(random).padStart(5, '0')}`;
  }

  public calculateTotalRevenue(): number {
    return this.transactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.finalAmount, 0);
  }

  public calculateTotalDiscounts(): number {
    return this.transactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.discountAmount, 0);
  }

  public getRevenueStats() {
    const completed = this.transactions.filter(t => t.status === 'completed');
    return {
      totalTransactions: this.transactions.length,
      completedTransactions: completed.length,
      totalRevenue: this.calculateTotalRevenue(),
      totalDiscounts: this.calculateTotalDiscounts(),
      averageTransaction: completed.length > 0 ? this.calculateTotalRevenue() / completed.length : 0,
      failedTransactions: this.transactions.filter(t => t.status === 'failed').length,
    };
  }

  private logAction(action: string, reference: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${action} - Reference: ${reference}`);
  }

  private initializeDefaultData(): void {
    // إضافة كوبونات افتراضية
    const defaultCoupon: Coupon = {
      id: 'coupon_1',
      code: 'WELCOME50',
      type: 'percentage',
      value: 50,
      maxUses: 100,
      usedCount: 25,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      minPurchase: 50,
      isActive: true,
      description: 'عرض ترحيبي - خصم 50% على الدورات الأولى',
    };

    this.createCoupon(defaultCoupon);

    // إضافة خطط دفع افتراضية
    const plans: PaymentPlan[] = [
      {
        id: 'plan_basic',
        name: 'الخطة الأساسية',
        description: 'مناسبة للمبتدئين',
        price: 29.99,
        currency: 'USD',
        billingCycle: 'monthly',
        features: ['5 جلسات شهرية', 'وصول للفيديوهات', 'معلم ذكي'],
        maxSessions: 5,
      },
      {
        id: 'plan_pro',
        name: 'الخطة الاحترافية',
        description: 'للمتعلمين الجادين',
        price: 79.99,
        currency: 'USD',
        billingCycle: 'monthly',
        features: ['20 جلسة شهرية', 'وصول كامل', 'معلم ذكي', 'تقارير مفصلة'],
        maxSessions: 20,
        isPopular: true,
      },
      {
        id: 'plan_premium',
        name: 'الخطة المتقدمة',
        description: 'للمتفانين',
        price: 199.99,
        currency: 'USD',
        billingCycle: 'monthly',
        features: ['جلسات غير محدودة', 'وصول كامل', 'معلم ذكي', 'تقارير مفصلة', 'دعم 24/7'],
      },
    ];

    plans.forEach(plan => this.addPaymentPlan(plan));
  }

  // تصدير البيانات
  public exportPaymentData() {
    return {
      coupons: Array.from(this.coupons.values()),
      promoCodes: Array.from(this.promoCodes.values()),
      transactions: this.transactions,
      invoices: this.invoices,
      paymentPlans: this.paymentPlans,
      refunds: this.refunds,
    };
  }

  // استيراد البيانات
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public importPaymentData(data: any): void {
    if (data.coupons) {
      data.coupons.forEach((c: Coupon) => this.createCoupon(c));
    }
    if (data.promoCodes) {
      data.promoCodes.forEach((p: PromoCode) => this.createPromoCode(p));
    }
    this.logAction('IMPORT_PAYMENT_DATA', 'system');
  }
}

// تصدير الخدمة الواحدة
export const paymentService = PaymentService.getInstance();
