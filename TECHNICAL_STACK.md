# Coursiator - Technical Stack & Architecture

## 📋 Executive Summary

Coursiator is a premium language learning platform built with modern, scalable technologies. The system uses a **React-based frontend** with **TypeScript** for type safety, **Tailwind CSS** for responsive design, and is designed to integrate with **Node.js/Express backend** and **PostgreSQL/MySQL databases**.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Frontend)                  │
│  React 19 + TypeScript + Tailwind CSS 4 + Wouter Router     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     API LAYER (Backend)                       │
│  Node.js + Express + REST API + WebSocket (Real-time)       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   DATA LAYER (Database)                       │
│  PostgreSQL / MySQL + Drizzle ORM + Migrations              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                            │
│  Stripe | PayPal | Zoom API | AWS S3 | SendGrid             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 FRONTEND TECHNOLOGIES

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.1 | UI library for building interactive components |
| **TypeScript** | 5.6.3 | Type-safe JavaScript for better code quality |
| **Vite** | 7.1.7 | Lightning-fast build tool and dev server |

### Styling & UI
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | 4.1.14 | Utility-first CSS framework for responsive design |
| **shadcn/ui** | Latest | Pre-built accessible React components |
| **Framer Motion** | 12.23.22 | Animation library for smooth transitions |
| **Lucide React** | 0.453.0 | Icon library with 450+ icons |

### Routing & State Management
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Wouter** | 3.3.5 | Lightweight client-side router |
| **React Context API** | Built-in | Global state management (Language, Theme) |
| **React Hooks** | Built-in | useState, useEffect, useContext for state |

### Form & Validation
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React Hook Form** | 7.64.0 | Efficient form state management |
| **Zod** | 4.1.12 | TypeScript-first schema validation |

### Data Visualization
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Recharts** | 2.15.2 | React charting library for analytics |
| **Chart.js** | Via Recharts | Advanced charting capabilities |

### Utilities
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Axios** | 1.12.0 | HTTP client for API requests |
| **Sonner** | 2.0.7 | Toast notifications |
| **Nanoid** | 5.1.5 | Unique ID generation |
| **Clsx** | 2.1.1 | Conditional CSS class utility |
| **Tailwind Merge** | 3.3.1 | Merge Tailwind classes intelligently |

### Development Tools
| Tool | Version | Purpose |
|------|---------|---------|
| **TypeScript** | 5.6.3 | Static type checking |
| **ESLint** | Latest | Code quality linting |
| **Prettier** | 3.6.2 | Code formatting |
| **Vitest** | 2.1.4 | Unit testing framework |

---

## 🔧 BACKEND TECHNOLOGIES (Ready for Integration)

### Runtime & Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 22.13.0 | JavaScript runtime |
| **Express** | 4.21.2 | Web application framework |
| **TypeScript** | 5.6.3 | Type-safe backend code |

### Database & ORM
| Technology | Purpose |
|-----------|---------|
| **PostgreSQL** | Primary relational database (recommended) |
| **MySQL** | Alternative relational database |
| **Drizzle ORM** | Type-safe database queries |
| **Database Migrations** | Schema versioning and management |

### Authentication & Security
| Technology | Purpose |
|-----------|---------|
| **JWT (JSON Web Tokens)** | Secure user authentication |
| **bcrypt** | Password hashing |
| **CORS** | Cross-origin request handling |
| **Rate Limiting** | Prevent brute-force attacks |

### API & Real-time Communication
| Technology | Purpose |
|-----------|---------|
| **REST API** | Standard HTTP endpoints |
| **WebSocket** | Real-time messaging (future) |
| **Socket.io** | Real-time events (optional) |

### File Storage & CDN
| Technology | Purpose |
|-----------|---------|
| **AWS S3** | Video and file storage |
| **Cloudfront** | CDN for fast content delivery |
| **Signed URLs** | Secure temporary file access |

### Payment Processing
| Technology | Purpose |
|-----------|---------|
| **Stripe API** | Credit card payments |
| **PayPal API** | Alternative payment method |
| **Webhook Handlers** | Payment confirmation events |

### Email & Notifications
| Technology | Purpose |
|-----------|---------|
| **SendGrid** | Email delivery service |
| **Twilio** | SMS notifications |
| **Firebase Cloud Messaging** | Push notifications |

### Video & Streaming
| Technology | Purpose |
|-----------|---------|
| **Zoom API** | Live class integration |
| **HLS Streaming** | Encrypted video delivery |
| **Vimeo** | Video hosting (alternative) |

---

## 📦 PACKAGE MANAGER & BUILD

| Tool | Version | Purpose |
|------|---------|---------|
| **pnpm** | 10.4.1 | Fast, disk-space efficient package manager |
| **npm** | Via pnpm | Package registry |
| **Vite** | 7.1.7 | Build tool and dev server |
| **esbuild** | 0.25.0 | JavaScript bundler |

---

## 🗄️ DATABASE SCHEMA (Recommended)

### PostgreSQL/MySQL Tables

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student', 'teacher', 'admin'),
  profile_name VARCHAR(255),
  avatar_url TEXT,
  language ENUM('en', 'ar') DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES users(id),
  price DECIMAL(10, 2),
  level ENUM('beginner', 'intermediate', 'advanced'),
  language ENUM('en', 'ar'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Videos Table
CREATE TABLE videos (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  duration INTEGER,
  watermark_enabled BOOLEAN DEFAULT TRUE,
  anti_recording BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessments Table
CREATE TABLE assessments (
  id UUID PRIMARY KEY,
  video_id UUID REFERENCES videos(id),
  questions JSONB,
  passing_score INTEGER DEFAULT 70,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method ENUM('stripe', 'paypal', 'wallet'),
  status ENUM('pending', 'completed', 'failed', 'refunded'),
  stripe_payment_id VARCHAR(255),
  paypal_transaction_id VARCHAR(255),
  invoice_number VARCHAR(50) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coupons Table
CREATE TABLE coupons (
  id UUID PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  type ENUM('percentage', 'fixed', 'free-session'),
  value DECIMAL(10, 2),
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  expiry_date TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments Table
CREATE TABLE enrollments (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completion_date TIMESTAMP,
  progress_percentage INTEGER DEFAULT 0,
  status ENUM('active', 'completed', 'dropped')
);
```

---

## 🔐 Security Features

| Feature | Implementation |
|---------|-----------------|
| **HTTPS/TLS** | All communications encrypted |
| **JWT Authentication** | Secure token-based auth |
| **Password Hashing** | bcrypt with salt rounds |
| **Rate Limiting** | Prevent brute-force attacks |
| **CORS Protection** | Whitelist allowed origins |
| **SQL Injection Prevention** | Parameterized queries via ORM |
| **XSS Protection** | React auto-escaping + CSP headers |
| **Video Watermarking** | Dynamic overlay with user email/IP |
| **Anti-Recording** | Disabled context menu, developer tools |
| **Encrypted HLS** | Signed URLs for video streaming |

---

## 📊 Performance Optimization

| Optimization | Technology |
|--------------|-----------|
| **Code Splitting** | Vite dynamic imports |
| **Lazy Loading** | React.lazy() for routes |
| **Image Optimization** | WebP format + compression |
| **Caching Strategy** | Browser cache + CDN |
| **Database Indexing** | Optimized queries |
| **API Response Compression** | gzip/brotli |
| **Minification** | Vite production build |
| **Tree Shaking** | Remove unused code |

---

## 🚀 Deployment Stack

| Component | Technology |
|-----------|-----------|
| **Frontend Hosting** | Manus Platform / Vercel / Netlify |
| **Backend Hosting** | Manus Platform / Railway / Render |
| **Database Hosting** | Manus Platform / AWS RDS / DigitalOcean |
| **File Storage** | AWS S3 / Cloudinary |
| **CDN** | CloudFront / Cloudflare |
| **CI/CD** | GitHub Actions / GitLab CI |
| **Monitoring** | Sentry / LogRocket |
| **Analytics** | Umami / Google Analytics |

---

## 📱 Supported Platforms

| Platform | Support |
|----------|---------|
| **Desktop** | Chrome, Firefox, Safari, Edge (latest) |
| **Mobile** | iOS Safari, Android Chrome |
| **Tablets** | iPad, Android tablets |
| **Responsive** | Mobile-first design (320px+) |

---

## 🔄 Integration Points

### Third-Party APIs
1. **Stripe** - Payment processing
2. **PayPal** - Alternative payments
3. **Zoom** - Live class integration
4. **SendGrid** - Email notifications
5. **Twilio** - SMS alerts
6. **AWS S3** - File storage
7. **Google Maps** - Location services (optional)

### Webhooks
- Stripe payment confirmation
- PayPal transaction updates
- Zoom meeting events
- User activity logs

---

## 📈 Scalability Considerations

| Aspect | Solution |
|--------|----------|
| **Database** | Connection pooling, read replicas |
| **API** | Load balancing, horizontal scaling |
| **Frontend** | CDN distribution, edge caching |
| **Storage** | S3 with lifecycle policies |
| **Real-time** | WebSocket servers, message queues |
| **Caching** | Redis for session/data caching |

---

## 🛠️ Development Workflow

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Type checking
pnpm check

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Format code
pnpm format
```

---

## 📚 Technology Comparison

### Why React over Vue?
- **Ecosystem**: Larger community and library support
- **Job Market**: More React developers available
- **Flexibility**: Less opinionated, more customizable
- **Performance**: Excellent rendering optimization
- **TypeScript**: First-class TypeScript support

### Why TypeScript over JavaScript?
- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Better IDE support and autocomplete
- **Maintainability**: Self-documenting code
- **Scalability**: Easier to manage large codebases
- **Refactoring**: Safe code changes with type checking

### Why PostgreSQL over MySQL?
- **Advanced Features**: JSON, Arrays, Full-text search
- **ACID Compliance**: Stronger data integrity
- **Performance**: Better for complex queries
- **Scalability**: Better for large datasets
- **Open Source**: Active development and community

### Why Node.js/Express over PHP/Laravel?
- **Unified Language**: JavaScript across frontend and backend
- **Performance**: Non-blocking I/O, better for real-time
- **Scalability**: Horizontal scaling easier
- **Modern Tooling**: Better development experience
- **Async/Await**: Cleaner asynchronous code

---

## 🎯 Technology Recommendations for Presentation

### Slide 1: Architecture Overview
"Coursiator uses a modern, scalable architecture with React 19 for the frontend, Node.js/Express for the backend, and PostgreSQL for data persistence."

### Slide 2: Frontend Stack
"The frontend is built with React 19 and TypeScript for type safety, Tailwind CSS 4 for responsive design, and Recharts for data visualization. We use Vite for fast development and production builds."

### Slide 3: Backend Stack
"The backend runs on Node.js with Express framework, uses Drizzle ORM for type-safe database queries, JWT for authentication, and integrates with Stripe/PayPal for payments."

### Slide 4: Database
"We use PostgreSQL as our primary database with Drizzle ORM for migrations and queries. The schema includes tables for users, courses, videos, transactions, and assessments."

### Slide 5: Security
"Security is paramount with HTTPS/TLS encryption, JWT authentication, bcrypt password hashing, rate limiting, and video watermarking to prevent unauthorized distribution."

### Slide 6: Third-Party Integrations
"Coursiator integrates with Stripe/PayPal for payments, Zoom for live classes, SendGrid for emails, and AWS S3 for video storage."

### Slide 7: Deployment
"The platform is deployed on Manus Platform with automatic scaling, CDN distribution, and monitoring via Sentry for error tracking."

---

## 📞 Technical Support

For technical questions or integration support, refer to:
- React Documentation: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Express.js: https://expressjs.com
- PostgreSQL: https://www.postgresql.org/docs
- Stripe API: https://stripe.com/docs/api
- Zoom API: https://developers.zoom.us/docs/api

---

**Last Updated**: December 2025  
**Version**: 2.1 (English Version)  
**Status**: Production Ready
