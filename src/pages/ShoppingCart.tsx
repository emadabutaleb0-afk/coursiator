import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { paymentService } from '@/lib/paymentService';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react';

/**
 * Shopping Cart Page
 * Display cart items, calculate totals, and proceed to checkout
 */

export default function ShoppingCart() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getTax, getTotalPrice, getTotalItems, applyCoupon, removeCoupon, couponCode, discountAmount } = useCart();
  const [, navigate] = useLocation();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;

    const result = paymentService.validateCoupon(couponInput, getSubtotal());
    if (result.valid) {
      applyCoupon(couponInput, result.discount);
      setCouponMsg(`Applied! You saved $${result.discount.toFixed(2)}`);
      setCouponInput('');
    } else {
      setCouponMsg(result.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 text-accent hover:underline mb-8 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>

          {/* Empty Cart */}
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-foreground/70 mb-8">Add some courses to get started with your learning journey</p>
            <Button onClick={() => navigate('/courses')} className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 text-accent hover:underline mb-4 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </button>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-foreground/70">{getTotalItems()} course{getTotalItems() !== 1 ? 's' : ''} in cart</p>
          </div>
          <Button
            onClick={clearCart}
            variant="outline"
            className="gap-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="glass-card border border-white/10 rounded-2xl p-6 flex gap-6 hover:border-accent/30 transition-smooth"
              >
                {/* Course Image */}
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-2xl">
                  {item.title.charAt(0)}
                </div>

                {/* Course Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-foreground/70 text-sm mb-2">by {item.instructor}</p>
                  <div className="flex items-center gap-4">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                      {item.level}
                    </span>
                    <span className="text-lg font-bold text-accent">${item.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-smooth text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-white/20 rounded transition-smooth"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white/20 rounded transition-smooth"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Subtotal */}
              <div className="flex justify-between mb-4 pb-4 border-b border-white/10">
                <span className="text-foreground/70">Subtotal</span>
                <span className="font-semibold">${getSubtotal().toFixed(2)}</span>
              </div>

              {/* Discount */}
              {discountAmount > 0 && (
                <div className="flex justify-between mb-4 pb-4 border-b border-white/10 text-green-500">
                  <span>Discount ({couponCode})</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Tax */}
              <div className="flex justify-between mb-6 pb-6 border-b border-white/10">
                <span className="text-foreground/70">Tax (10%)</span>
                <span className="font-semibold">${getTax().toFixed(2)}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-8 text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-accent text-xl">${getTotalPrice().toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Promo Code</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    variant="outline"
                    className="px-4"
                    disabled={!couponInput.trim()}
                  >
                    Apply
                  </Button>
                </div>
                {couponMsg && (
                  <p className={`text-sm ${couponMsg.includes('Valid') || couponMsg.includes('Applied') ? 'text-green-500' : 'text-red-500'}`}>
                    {couponMsg}
                  </p>
                )}
                {couponCode && (
                  <div className="mt-2 flex items-center justify-between p-2 bg-green-500/10 border border-green-500/20 rounded text-sm">
                    <span className="text-green-500">Code <b>{couponCode}</b> applied</span>
                    <button onClick={removeCoupon} className="text-red-400 hover:text-red-300">Remove</button>
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full gradient-button py-3 font-semibold mb-3"
              >
                Proceed to Checkout
              </Button>

              {/* Continue Shopping */}
              <Button
                onClick={() => navigate('/courses')}
                variant="outline"
                className="w-full"
              >
                Continue Shopping
              </Button>

              {/* Security Info */}
              <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-foreground/70">
                <p className="mb-2">🔒 Secure checkout powered by Stripe & PayPal</p>
                <p>Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
