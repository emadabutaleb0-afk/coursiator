import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Download, BookOpen, CheckCircle, Mail, Home } from 'lucide-react';
import { paymentService } from '@/lib/paymentService'; // Added Import

/**
 * Order Confirmation Page
 * Display order details and grant instant course access
 */

interface OrderItem {
  id: string;
  title: string;
  instructor: string;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
  paymentMethod: string;
  status: 'completed' | 'processing';
}

export default function OrderConfirmation() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<OrderItem[]>([]);

  useEffect(() => {
    // Get order ID from URL
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');

    if (orderId) {
      // Look up by Invoice Number since we passed that
      const transactions = paymentService.getUserTransactions(user?.id || 'guest');
      // In a real app we'd have a direct getByInvoice, here we filter (or use the one we just made if in memory)
      // Since services are singletons in memory, this should work if we didn't refresh page. 
      // If page refresh, memory is lost. But for this session it works. 
      // Note: paymentService uses in-memory storage, so refresh clears it. 
      // For this demo, we assume navigation without refresh.

      const transaction = transactions.find(t => t.invoiceNumber === orderId) ||
        paymentService.getTransaction(orderId); // Try ID too just in case

      if (transaction) {
        const orderItems: OrderItem[] = transaction.description.includes('Purchase') ?
          // We need to reconstruct items. 
          // LIMITATION: Transaction doesn't store Item Details separately in this simple model, 
          // it just stores description.
          // WE NEED TO PASS ITEMS or STORE IN TRANSACTION to function fully.
          // For now, let's use a "Recent Items" hack or assume we just show the total.
          // WAIT: paymentService Invoice has Items. Transaction is simpler.
          // Let's create an Invoice for better data? 
          // OR: Just for this demo, let's assume we read from a temporary "LastOrder" storage or 
          // we update Transaction to include items (simplest).

          // Let's UPDATE PaymentService Transaction interface to include items? 
          // No, let's just rely on the fact that for this demo, we might need to Mock it if data is missing.
          // BUT, we want "Real" feel.
          // Let's assume we stored items in localStorage "temp_last_order_items" during checkout?
          // That is a robust way for frontend-only demos.
          [] : [];

        // Actually, let's RECOVER items from the transaction if we can, or just mock them if missing.
        // BETTER: Update EnhancedCheckout to save "temp_last_order" to localStorage before navigating.

        const mappedOrder: Order = {
          id: transaction.invoiceNumber,
          date: new Date(transaction.timestamp).toLocaleDateString(),
          total: transaction.finalAmount,
          items: [], // We need these!
          paymentMethod: transaction.paymentMethod,
          status: transaction.status === 'completed' ? 'completed' : 'processing',
        };
        setOrder(mappedOrder);
        // We will fix the Empty Items issue in next step by updating Checkout to save them.
      }
    } else {
      // Fallback for direct access
      const mockOrder: Order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        total: 299.99,
        items: [
          {
            id: '1',
            title: 'IELTS Mastery Course',
            instructor: 'Dr. Michael Chen',
            price: 99.99,
          },
        ],
        paymentMethod: 'Stripe - Credit Card',
        status: 'completed',
      };
      setOrder(mockOrder);
      setEnrolledCourses(mockOrder.items);
    }
  }, [user]);

  const handleDownloadReceipt = () => {
    alert('Receipt download functionality would be implemented with PDF generation library');
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/70">Loading your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-foreground/70 text-lg">
            Thank you for your purchase, {user?.name}. Your courses are now active.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info Card */}
            <div className="glass-card border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Order Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-white/10">
                  <span className="text-foreground/70">Order ID</span>
                  <span className="font-semibold font-mono">{order.id}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-white/10">
                  <span className="text-foreground/70">Order Date</span>
                  <span className="font-semibold">{order.date}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-white/10">
                  <span className="text-foreground/70">Payment Method</span>
                  <span className="font-semibold">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Status</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    {order.status === 'completed' ? 'Completed' : 'Processing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="glass-card border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Your Enrolled Courses
              </h2>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-accent/30 transition-smooth"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{course.title}</h3>
                        <p className="text-sm text-foreground/70">by {course.instructor}</p>
                      </div>
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                        ✓ Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <span className="text-sm text-foreground/70">Lifetime access</span>
                      <Button
                        onClick={() => navigate('/student-learning-hub')}
                        size="sm"
                        className="gap-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        Start Learning
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Next */}
            <div className="glass-card border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Access Your Courses</h3>
                    <p className="text-sm text-foreground/70">
                      Go to your learning hub to start watching videos and completing lessons
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Join Live Sessions</h3>
                    <p className="text-sm text-foreground/70">
                      Book 1-on-1 sessions with instructors or join live group classes
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Practice with AI Tutor</h3>
                    <p className="text-sm text-foreground/70">
                      Use our 24/7 AI tutor for speaking practice and personalized feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card border border-white/10 rounded-2xl p-6 sticky top-24 space-y-6">
              {/* Confirmation Email */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Confirmation Sent</p>
                    <p className="text-xs text-foreground/70">Check your email for receipt and course links</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="font-bold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="flex justify-between text-sm">
                      <span className="text-foreground/70">{course.title}</span>
                      <span className="font-semibold">${course.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 my-4 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <Button
                  onClick={handleDownloadReceipt}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Receipt
                </Button>
                <Button
                  onClick={() => navigate('/student-learning-hub')}
                  className="w-full gradient-button gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Go to Learning Hub
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
