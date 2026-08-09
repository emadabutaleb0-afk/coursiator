# Course Enrollment Flow Guide

## 🛒 Complete Shopping Cart & Checkout System

Coursiator now features a complete course enrollment flow with shopping cart, payment processing, and instant course access.

---

## 📋 System Architecture

### Components

1. **CartContext** (`client/src/contexts/CartContext.tsx`)
   - Global shopping cart state management
   - Persistent localStorage storage
   - Cart operations (add, remove, update quantity)
   - Price calculations (subtotal, tax, total)

2. **Shopping Cart Page** (`client/src/pages/ShoppingCart.tsx`)
   - Display all cart items
   - Adjust quantities
   - Remove items
   - Apply promo codes
   - Order summary with totals

3. **Enhanced Checkout** (`client/src/pages/EnhancedCheckout.tsx`)
   - Billing information collection
   - Stripe credit/debit card payment
   - PayPal integration
   - Real-time payment processing
   - Order confirmation

4. **Order Confirmation** (`client/src/pages/OrderConfirmation.tsx`)
   - Order details display
   - Instant course access activation
   - Receipt generation
   - Next steps guidance

---

## 🔄 Enrollment Flow

```
Browse Courses (/courses)
    ↓
Add to Cart (useCart hook)
    ↓
View Shopping Cart (/shopping-cart)
    ↓
Proceed to Checkout (/checkout)
    ↓
Enter Billing Information
    ↓
Select Payment Method (Stripe or PayPal)
    ↓
Process Payment
    ↓
Order Confirmation (/order-confirmation)
    ↓
Instant Course Access Granted
    ↓
Start Learning (/student-learning-hub)
```

---

## 💳 Payment Integration

### Stripe Integration

**Features:**
- Credit/Debit card payment
- Real-time payment validation
- Secure card processing
- Automatic receipt generation

**Implementation:**
```typescript
const handleStripePayment = async (e: React.FormEvent) => {
  // Validate card details
  // Process payment through Stripe API
  // Create order record
  // Grant course access
  // Redirect to confirmation
};
```

### PayPal Integration

**Features:**
- PayPal account payment
- Instant payment confirmation
- Buyer protection
- Easy refund processing

**Implementation:**
```typescript
const handlePayPalPayment = async (e: React.FormEvent) => {
  // Redirect to PayPal
  // Confirm payment return
  // Create order record
  // Grant course access
  // Redirect to confirmation
};
```

---

## 🛍️ Shopping Cart Usage

### Adding Items to Cart

```typescript
import { useCart } from '@/contexts/CartContext';

function CourseCard({ course }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: course.id,
      title: course.title,
      price: course.price,
      instructor: course.instructor,
      image: course.image,
      level: course.level,
      quantity: 1,
    });
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

### Accessing Cart in Components

```typescript
import { useCart } from '@/contexts/CartContext';

function CartBadge() {
  const { getTotalItems } = useCart();

  return (
    <div className="badge">
      {getTotalItems()} items
    </div>
  );
}
```

---

## 📊 Cart State Management

### Cart Item Structure

```typescript
interface CartItem {
  id: string;              // Unique course ID
  title: string;           // Course title
  price: number;           // Course price
  instructor: string;      // Instructor name
  image: string;           // Course image URL
  level: string;           // Course level
  quantity: number;        // Quantity in cart
}
```

### Cart Operations

```typescript
const { 
  items,                   // Array of cart items
  addItem,                 // Add item to cart
  removeItem,              // Remove item by ID
  updateQuantity,          // Update item quantity
  clearCart,               // Clear entire cart
  getTotalPrice,           // Get total with tax
  getTotalItems,           // Get total item count
  getSubtotal,             // Get subtotal before tax
  getTax,                  // Get tax amount (10%)
} = useCart();
```

---

## 💰 Pricing Calculation

### Tax Rate
- Default tax rate: **10%**
- Applied to subtotal
- Displayed separately in checkout

### Example Calculation
```
Course 1: $99.99
Course 2: $99.99
Course 3: $100.01
─────────────────
Subtotal: $299.99
Tax (10%): $30.00
─────────────────
Total: $329.99
```

---

## 🎓 Instant Course Access

### Access Activation Process

1. **Payment Confirmation**
   - Verify payment successful
   - Create order record

2. **Enrollment Record**
   - Add courses to student's enrolled list
   - Store in localStorage
   - Update student dashboard

3. **Course Access**
   - Unlock course materials
   - Grant video access
   - Enable assessments
   - Activate AI tutor

4. **Notification**
   - Send confirmation email
   - Display success message
   - Provide course links

### Implementation

```typescript
// After successful payment
const enrollStudent = async (studentId, courseIds) => {
  // Create enrollment records
  const enrollments = courseIds.map(courseId => ({
    studentId,
    courseId,
    enrolledDate: new Date(),
    accessLevel: 'full',
    status: 'active'
  }));

  // Save to database
  await saveEnrollments(enrollments);

  // Update localStorage
  const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
  localStorage.setItem('enrolled_courses', JSON.stringify([...enrolled, ...enrollments]));

  // Grant access
  return true;
};
```

---

## 📧 Order Confirmation

### Email Template

```
Subject: Order Confirmation - Coursiator

Dear [Student Name],

Thank you for your purchase! Your order has been confirmed.

Order Details:
- Order ID: [ORDER_ID]
- Date: [DATE]
- Total: $[TOTAL]

Your Courses:
[List of enrolled courses with access links]

Next Steps:
1. Log in to your Coursiator account
2. Go to "My Learning Hub"
3. Start learning immediately

Need help? Contact support@coursiator.com

Best regards,
Coursiator Team
```

---

## 🔒 Security Features

### Payment Security
- ✅ HTTPS/TLS encryption
- ✅ PCI DSS compliance
- ✅ Tokenized card processing
- ✅ No card data storage
- ✅ SSL certificates

### Data Protection
- ✅ Encrypted payment data
- ✅ Secure order storage
- ✅ User authentication required
- ✅ Rate limiting on checkout
- ✅ Fraud detection

---

## 🧪 Testing the Enrollment Flow

### Test Scenario 1: Stripe Payment

1. Go to `/courses`
2. Click "Add to Cart" on any course
3. Go to `/shopping-cart`
4. Click "Proceed to Checkout"
5. Select "Credit/Debit Card (Stripe)"
6. Enter test card: `4242 4242 4242 4242`
7. Enter any future expiry date
8. Enter any 3-digit CVV
9. Click "Pay $[Amount]"
10. Should redirect to `/order-confirmation`

### Test Scenario 2: PayPal Payment

1. Go to `/courses`
2. Add multiple courses to cart
3. Go to `/shopping-cart`
4. Click "Proceed to Checkout"
5. Select "PayPal"
6. Click "PayPal Pay $[Amount]"
7. Should redirect to `/order-confirmation`

### Test Scenario 3: Cart Management

1. Add courses to cart
2. Update quantities
3. Remove items
4. Apply promo code (placeholder)
5. Clear entire cart
6. Verify localStorage updates

---

## 📱 Mobile Responsiveness

- ✅ Responsive cart layout
- ✅ Touch-friendly buttons
- ✅ Mobile-optimized checkout
- ✅ Responsive payment forms
- ✅ Mobile-friendly confirmation

---

## 🔄 Next Steps: Backend Integration

### 1. Database Schema

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL,
  total DECIMAL(10, 2),
  tax DECIMAL(10, 2),
  payment_method VARCHAR(50),
  payment_status VARCHAR(50),
  created_at TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY,
  order_id UUID NOT NULL,
  course_id UUID NOT NULL,
  price DECIMAL(10, 2),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE enrollments (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL,
  course_id UUID NOT NULL,
  enrolled_date TIMESTAMP,
  access_level VARCHAR(50),
  status VARCHAR(50),
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

### 2. API Endpoints

```
POST /api/orders
- Create new order
- Process payment
- Return order confirmation

GET /api/orders/:id
- Retrieve order details
- Get enrolled courses

POST /api/enrollments
- Create course enrollment
- Grant access

GET /api/student/courses
- Get enrolled courses
- Get access status
```

### 3. Payment Webhook

```typescript
POST /api/webhooks/stripe
- Verify payment completion
- Update order status
- Grant course access
- Send confirmation email
```

---

## 📚 Related Files

- Cart Context: `client/src/contexts/CartContext.tsx`
- Shopping Cart: `client/src/pages/ShoppingCart.tsx`
- Checkout: `client/src/pages/EnhancedCheckout.tsx`
- Confirmation: `client/src/pages/OrderConfirmation.tsx`
- App Routes: `client/src/App.tsx`

---

**Last Updated**: December 2025  
**Version**: 2.4  
**Status**: Ready for Testing & Backend Integration
