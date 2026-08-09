# Coursiator - Premium Language Learning Platform

## Platform Overview

Coursiator is a comprehensive language learning platform combining live instructor sessions with 24/7 AI-powered tutoring. The MVP includes course management, AI placement testing, multi-role portals, and bilingual support (English/Arabic).

## Current Features (Phase 1 MVP)

### 1. Public Pages

#### Home Page (`/`)
- Hero section with animated gradient backgrounds and call-to-action
- Feature showcase highlighting core value propositions
- Course preview cards with quick access
- Statistics dashboard (10K+ students, 95% success rate, 24/7 support)
- Call-to-action section encouraging placement test enrollment
- Responsive design for mobile, tablet, and desktop

#### Courses Page (`/courses`)
- Complete course catalog with 4 language courses:
  - IELTS Mastery ($299, 16 sessions)
  - SAT Excellence ($349, 20 sessions)
  - Business English Pro ($279, 16 sessions)
  - Arabic Fluency ($259, 16 sessions)
- Course cards displaying ratings, instructor info, and features
- Pricing tiers: Pay Per Session, Course Bundle (Most Popular), Corporate Plan
- Course features and benefits section
- Enrollment interface with course details

#### Placement Test Page (`/placement-test`)
- Interactive AI-powered assessment with 5 questions
- Real-time progress tracking with visual progress bar
- Multiple-choice questions covering grammar, vocabulary, and comprehension
- Instant results with proficiency level determination
- Score calculation: Beginner, Pre-Intermediate, Intermediate, Upper Intermediate, Advanced
- Personalized course recommendations based on test results
- Retake functionality for assessment improvement

### 2. Role-Based Portals

#### Student Portal (`/student-portal`)
- **Dashboard Overview:**
  - Current language level badge
  - Study streak counter
  - Classes completed progress
  - AI tutor practice hours logged

- **Analytics & Progress:**
  - Line chart showing score progression over 6 weeks
  - Skill breakdown bar chart (Grammar, Vocabulary, Listening, Speaking, Reading)
  - Real-time performance metrics

- **Class Management:**
  - Upcoming classes calendar
  - Class details: course name, instructor, date, time, topic
  - Quick join functionality for live sessions

- **Learning Roadmap:**
  - Phase-based progression tracking
  - Foundation Phase (Completed)
  - Intermediate Phase (In Progress - 60%)
  - Advanced Phase (Upcoming)
  - Visual progress indicators

#### Instructor Portal (`/instructor-portal`)
- **Dashboard Metrics:**
  - Total students across all courses
  - Monthly class schedule
  - Average instructor rating (4.8/5.0)
  - Class average performance percentage

- **Class Management:**
  - Upcoming class schedule with student counts
  - Edit and start class functionality
  - Class date, time, and topic information

- **Student Roster:**
  - Student name and email
  - Current proficiency level
  - Attendance tracking
  - Performance progress bar
  - Feedback submission interface

- **Performance Analytics:**
  - Class average score trend over 6 weeks
  - Visual representation of student progress

#### Admin Dashboard (`/admin-dashboard`)
- **Financial Metrics:**
  - Total revenue tracking
  - Active subscription count
  - Average course value
  - Refund rate monitoring

- **Analytics:**
  - Revenue and user growth line chart
  - User distribution pie chart (Students, Instructors, Admins)
  - Course performance bar chart
  - Course revenue breakdown table

- **Course Management:**
  - Detailed course revenue metrics
  - Student enrollment numbers
  - Course ratings and status
  - Revenue per course

- **System Health:**
  - API response time monitoring
  - Database performance metrics
  - Server uptime percentage
  - Quick action buttons for management tasks

### 3. Core Features

#### Bilingual Support
- Language context provider for English/Arabic switching
- Translation system for all UI text
- Language switcher in header with globe icon
- Persistent language selection

#### Design System (Modern Gradient Tech)
- **Color Palette:**
  - Primary: Teal (#0EA5E9)
  - Secondary: Purple (#8B5CF6)
  - Accent: Cyan (#06B6D4)

- **Typography:**
  - Headings: Space Grotesk (bold, geometric)
  - Body: Poppins (warm, readable)

- **Components:**
  - Glassmorphic cards with backdrop blur
  - Gradient buttons and text
  - Smooth transitions (300ms)
  - Animated blob backgrounds
  - Progress bars with gradients

#### Navigation
- Sticky header with logo and navigation menu
- Mobile-responsive hamburger menu
- Language switcher with globe icon
- Login and Sign Up buttons
- Navigation links to all main pages

## Technical Architecture

### Frontend Stack
- **Framework:** React 19 with TypeScript
- **Routing:** Wouter for client-side navigation
- **Styling:** Tailwind CSS 4 with custom theme
- **UI Components:** shadcn/ui components
- **Charts:** Recharts for data visualization
- **Icons:** Lucide React

### Project Structure
```
client/
├── public/
│   └── images/
│       ├── hero-ai-tutor.jpg
│       ├── hero-live-classes.jpg
│       ├── hero-placement-test.jpg
│       └── dashboard-background.png
├── src/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Courses.tsx
│   │   ├── PlacementTest.tsx
│   │   ├── StudentPortal.tsx
│   │   ├── InstructorPortal.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── NotFound.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── ui/
│   │       └── [shadcn components]
│   ├── contexts/
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
└── index.html
```

## Data Models

### Course Model
```typescript
{
  id: string;
  name: string;
  nameAr: string;
  description: string;
  price: number;
  sessions: number;
  instructor: string;
  rating: number;
  students: number;
  image: string;
  features: string[];
}
```

### Student Model
```typescript
{
  id: string;
  name: string;
  email: string;
  level: string;
  enrolledCourses: string[];
  completedSessions: number;
  aiTutorHours: number;
  placementTestScore: number;
}
```

### Class Model
```typescript
{
  id: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  students: number;
  topic: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
}
```

## User Flows

### Student Journey
1. **Discovery:** Visit home page, explore courses
2. **Assessment:** Take placement test to determine level
3. **Enrollment:** Choose course and enroll
4. **Learning:** Access student portal, attend live classes, use AI tutor
5. **Progress:** Track performance through dashboard analytics

### Instructor Workflow
1. **Setup:** Access instructor portal
2. **Schedule:** Create and manage class schedules
3. **Teaching:** Start live classes and manage student roster
4. **Feedback:** Provide skill-based feedback to students
5. **Analytics:** Monitor class performance and student progress

### Admin Operations
1. **Monitoring:** Track platform metrics and analytics
2. **Financial:** Monitor revenue, subscriptions, and refunds
3. **Reporting:** Generate performance reports
4. **Management:** Manage users, courses, and system health

## Future Enhancements (Phase 2 & 3)

### Phase 2: Growth
- Full 1:1 AI Speaking & Writing Tutor implementation
- Automated notifications (SMS/Email/WhatsApp)
- Mobile app optimization
- Video streaming with encryption (HLS)
- Dynamic watermarking for anti-piracy

### Phase 3: Scale
- Native iOS/Android apps with screen-record blocking
- AI score prediction engine
- Automated session summaries
- Corporate/B2B portal
- Advanced analytics and reporting

## Security Features (Planned)

- Encrypted video streaming (HLS with signed URLs)
- Dynamic watermarking (email/IP overlay)
- Account locking to prevent sharing
- Rate limiting for API protection
- Secure payment processing (Stripe/PayPal)

## Deployment

The platform is built as a static frontend using Vite and can be deployed to any static hosting service. The current MVP focuses on UI/UX and client-side functionality.

## Getting Started

### Development
```bash
cd /home/ubuntu/coursiator
pnpm install
pnpm dev
```

### Build
```bash
pnpm build
```

### Preview
```bash
pnpm preview
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Design

- **Mobile:** 320px and up
- **Tablet:** 768px and up
- **Desktop:** 1024px and up
- **Large Desktop:** 1280px and up

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus ring visibility

## Performance Optimizations

- Lazy loading for images
- Code splitting with React Router
- CSS-in-JS optimization
- Recharts for efficient charting
- Tailwind CSS purging

## Next Steps

1. **Backend Integration:** Connect to API for real data
2. **Authentication:** Implement user login/signup
3. **Payment Processing:** Integrate Stripe/PayPal
4. **Video Streaming:** Implement encrypted HLS streaming
5. **AI Integration:** Connect to AI tutoring engine
6. **Zoom Integration:** Implement live class functionality
7. **Database:** Set up user and course data persistence
8. **Testing:** Comprehensive unit and integration tests

## Support & Maintenance

For issues, feature requests, or improvements, please refer to the development team. The platform is actively maintained and updated with new features regularly.

---

**Version:** 1.0.0 MVP  
**Last Updated:** January 2025  
**Platform:** Coursiator Premium Language Learning
