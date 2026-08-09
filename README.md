# Coursiator - Premium Language Learning Platform

A modern, responsive web platform for language learning combining live instructor sessions with 24/7 AI tutoring.

## 🌟 Features

### Core Features
- **Live Lectures** - Real-time Zoom integration for instructor-led sessions
- **AI Live Tutor** - 24/7 interactive AI tutor with chat and video avatar
- **Placement Test** - AI-powered assessment to determine student level
- **Course Catalog** - Multiple language courses (IELTS, SAT, Business English, Arabic)
- **Booking System** - Schedule 1-on-1 sessions with expert teachers
- **Video Management** - Teacher portal for uploading and managing course videos
- **Watermarking & Anti-Recording** - Content protection with dynamic watermarking
- **Assessment System** - Interactive quizzes after video content
- **Analytics Dashboard** - Comprehensive reporting and analytics

### User Portals
- **Student Portal** - Access courses, track progress, practice with AI tutor
- **Teacher Portal** - Upload videos, manage classes, view student reports
- **Admin Dashboard** - Platform management, user administration, financial tracking
- **Data Management** - View and manage all platform data

### Technical Features
- **Bilingual Interface** - Full English/Arabic support
- **Responsive Design** - Mobile-first, works on all devices
- **Modern UI** - Glassmorphic design with smooth animations
- **Real-time Charts** - Interactive analytics and visualizations
- **Protected Content** - Video watermarking and anti-recording features

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Mobile** (320px and up) - Touch-friendly interface
- **Tablet** (768px and up) - Optimized layout
- **Desktop** (1024px and up) - Full feature set
- **Large Screens** (1280px and up) - Enhanced experience

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with custom utilities
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Routing**: Wouter
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📂 Project Structure

```
coursiator/
├── client/
│   ├── src/
│   │   ├── pages/          # Page components (23 pages)
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Language, Theme)
│   │   ├── lib/            # Utility functions
│   │   ├── App.tsx         # Main app with routing
│   │   ├── main.tsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── public/
│   │   └── images/         # Static images
│   └── index.html          # HTML template
├── server/
│   └── index.ts            # Express server
└── package.json            # Dependencies
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development

The development server runs on `http://localhost:3000` with hot module replacement (HMR).

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
pnpm start
```

## 📄 Pages Overview

### Public Pages
- **Home** (`/`) - Landing page with hero section
- **Courses** (`/courses`) - Course catalog with pricing
- **Placement Test** (`/placement-test`) - AI assessment
- **Live Lectures** (`/live-lectures`) - View and join live sessions
- **Booking System** (`/booking-system`) - Schedule sessions
- **AI Tutor** (`/ai-tutor`) - Interactive AI practice

### Student Portal
- **Student Auth** (`/student-auth`) - Login/signup
- **Learning Hub** (`/student-learning-hub`) - Course access
- **Progress Dashboard** (`/student-progress`) - Analytics
- **Student Profile** (`/student-profile`) - Settings

### Teacher Portal
- **Teacher Auth** (`/teacher-auth`) - Login/signup
- **Teacher Dashboard** (`/teacher-dashboard`) - Video management
- **Teacher Live Class** (`/teacher-live-class`) - Host sessions
- **Video Assessment** (`/video-assessment`) - Create quizzes
- **Teacher Reports** (`/teacher-reports`) - Student analytics

### Admin Portal
- **Admin Auth** (`/admin-auth`) - Login
- **Admin Control Panel** (`/admin-control-panel`) - Management
- **Data Management** (`/data-management`) - View all data
- **Analytics Dashboard** (`/analytics-dashboard`) - Platform analytics

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#0EA5E9)
- **Secondary**: Purple (#8B5CF6)
- **Accent**: Cyan (#06B6D4)
- **Background**: Light gradient

### Typography
- **Headings**: Space Grotesk (700 weight)
- **Body**: Poppins (400-600 weight)

### Components
- Glassmorphic cards with backdrop blur
- Gradient text and buttons
- Smooth transitions (300ms)
- Responsive grid layouts

## 🔐 Security Features

- **Video Watermarking**: Dynamic watermarks with student email/IP
- **Anti-Recording**: Disabled context menu and developer tools
- **Account Locking**: Prevent concurrent logins
- **Rate Limiting**: API protection against brute-force
- **Content Encryption**: HLS streaming with signed URLs

## 📊 Analytics

The platform includes comprehensive analytics:
- Enrollment trends
- Course performance metrics
- Student progress tracking
- Video view statistics
- User engagement metrics
- Financial reporting

## 🌍 Internationalization

Full bilingual support:
- **English** - Default language
- **Arabic** - RTL support
- Language switcher in header
- All content translated

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Touch-friendly buttons (44px minimum)
- Reduced motion support

## 📱 Mobile Optimization

- Touch-friendly interface (44px+ buttons)
- Optimized images
- Responsive typography
- Mobile-first CSS
- Safe area support for notched devices

## 🔧 Configuration

### Environment Variables

```env
VITE_APP_TITLE=Coursiator
VITE_APP_LOGO=/logo.svg
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your_id
```

## 📈 Performance

- Optimized bundle size
- Code splitting by route
- Image optimization
- CSS-in-JS minimization
- Smooth animations with GPU acceleration

## 🧪 Testing

```bash
# Run type checking
pnpm check

# Format code
pnpm format
```

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Support

For support, contact: support@coursiator.com

## 🎯 Roadmap

### Phase 2 (Growth)
- Mobile app (iOS/Android)
- SMS/Email notifications
- Advanced AI features
- Corporate B2B portal

### Phase 3 (Scale)
- Machine learning for personalization
- Advanced score prediction
- Smart session summaries
- Native mobile apps with screen recording blocking

## 📞 Contact

- **Website**: https://coursiator.com
- **Email**: info@coursiator.com
- **Support**: support@coursiator.com

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Status**: Production Ready ✅
