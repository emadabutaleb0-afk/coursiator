# Coursiator Authentication System Guide

## 🔐 Overview

Coursiator implements a role-based authentication system with three user types:
- **Students** - Access learning content and progress tracking
- **Instructors** - Manage courses and student feedback
- **Admins** - Access analytics and platform management

---

## 📋 Demo Credentials

### Student Account
```
Email: student@coursiator.com
Password: Student@123
Role: Student
```

### Instructor Account
```
Email: instructor@coursiator.com
Password: Instructor@123
Role: Instructor
```

### Admin Account
```
Email: admin@coursiator.com
Password: Admin@123
Role: Admin
```

---

## 🚀 How to Login

1. **Navigate to Login Page**
   - Go to `/login` or click "Sign In" button in header

2. **Select User Role**
   - Click on Student, Instructor, or Admin button
   - Demo credentials will auto-fill

3. **Enter Credentials**
   - Email and password auto-filled (or enter manually)
   - Click "Sign In" button

4. **Access Dashboard**
   - Redirected to `/dashboard` (Admin Analytics Dashboard)
   - Role-based content displayed

---

## 🔑 Authentication Flow

```
Login Page (/login)
    ↓
Enter Credentials
    ↓
Validate Email & Password
    ↓
Generate JWT Token
    ↓
Store in localStorage
    ↓
Redirect to Dashboard
    ↓
Display Role-Specific Content
```

---

## 💾 Authentication Service

### Location
`client/src/lib/authService.ts`

### Key Methods

#### Login
```typescript
const { user, token } = await authService.login({
  email: 'student@coursiator.com',
  password: 'Student@123'
});
```

#### Register
```typescript
const { user, token } = await authService.register({
  email: 'newuser@example.com',
  password: 'Password@123',
  confirmPassword: 'Password@123',
  name: 'John Doe',
  role: 'student'
});
```

#### Logout
```typescript
authService.logout();
```

#### Check Authentication
```typescript
const isAuthenticated = authService.isAuthenticated();
const hasRole = authService.hasRole('admin');
```

---

## 🎯 Auth Context Hook

### Location
`client/src/contexts/AuthContext.tsx`

### Usage
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      {hasRole('admin') && <AdminPanel />}
    </div>
  );
}
```

---

## 🛡️ Security Features

### Current Implementation
- ✅ Password validation (minimum 8 characters)
- ✅ Email format validation
- ✅ JWT token generation
- ✅ localStorage token storage
- ✅ Role-based access control

### Production Recommendations
- 🔒 Use HTTPS/TLS encryption
- 🔒 Implement bcrypt password hashing on backend
- 🔒 Use secure, httpOnly cookies for tokens
- 🔒 Implement refresh token rotation
- 🔒 Add rate limiting on login attempts
- 🔒 Enable two-factor authentication (2FA)
- 🔒 Add CSRF protection
- 🔒 Implement session timeout

---

## 📊 Role-Based Dashboards

### Admin Dashboard (`/dashboard`)
- Analytics and metrics
- User management
- Revenue tracking
- Course performance
- Instructor analytics

### Student Dashboard
- Enrolled courses
- Learning progress
- AI tutor access
- Certificates
- Performance tracking

### Instructor Dashboard
- Course management
- Student roster
- Video uploads
- Assessment creation
- Revenue tracking

---

## 🔄 Protected Routes

To protect routes based on authentication:

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

function ProtectedPage() {
  const { user, hasRole } = useAuth();
  const [, navigate] = useLocation();

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!hasRole('admin')) {
    navigate('/404');
    return null;
  }

  return <AdminContent />;
}
```

---

## 🧪 Testing Authentication

### Test Login
1. Go to `/login`
2. Click "Student" button
3. Credentials auto-fill
4. Click "Sign In"
5. Should redirect to `/dashboard`

### Test Role-Based Access
1. Login as Student
2. Try accessing `/dashboard` (Admin only)
3. Should redirect or show error
4. Login as Admin
5. Should have full access

### Test Logout
1. Click logout button in dashboard
2. Should redirect to `/login`
3. localStorage should be cleared

---

## 📝 User Data Structure

```typescript
interface User {
  id: string;              // Unique user ID
  email: string;           // Email address
  name: string;            // Full name
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;         // Avatar emoji or URL
  joinDate: string;        // YYYY-MM-DD format
  verified: boolean;       // Email verification status
}
```

---

## 🔧 Configuration

### Environment Variables (Future)
```
VITE_API_URL=https://api.coursiator.com
VITE_JWT_SECRET=your-secret-key
VITE_TOKEN_EXPIRY=24h
```

### localStorage Keys
- `auth_token` - JWT token
- `current_user` - User object (JSON)

---

## 🚨 Troubleshooting

### Issue: Login fails with "Invalid email or password"
**Solution**: Check demo credentials above, ensure correct spelling

### Issue: Token expires after page refresh
**Solution**: Implement token refresh endpoint in backend

### Issue: User data not persisting
**Solution**: Check browser localStorage is enabled

### Issue: Role-based redirect not working
**Solution**: Ensure `hasRole()` is called within `useAuth()` hook

---

## 🔄 Next Steps: Backend Integration

To connect with a real backend:

1. **Replace Mock Users**
   ```typescript
   // In authService.ts
   const response = await fetch('/api/auth/login', {
     method: 'POST',
     body: JSON.stringify(credentials)
   });
   ```

2. **Implement Token Refresh**
   ```typescript
   async refreshToken() {
     const response = await fetch('/api/auth/refresh', {
       method: 'POST',
       headers: { 'Authorization': `Bearer ${this.token}` }
     });
     // Update token
   }
   ```

3. **Add User Registration**
   ```typescript
   async register(data: RegisterData) {
     const response = await fetch('/api/auth/register', {
       method: 'POST',
       body: JSON.stringify(data)
     });
     // Handle response
   }
   ```

4. **Implement Logout**
   ```typescript
   async logout() {
     await fetch('/api/auth/logout', {
       method: 'POST',
       headers: { 'Authorization': `Bearer ${this.token}` }
     });
     // Clear local state
   }
   ```

---

## 📚 Related Files

- Login Page: `client/src/pages/Login.tsx`
- Auth Service: `client/src/lib/authService.ts`
- Auth Context: `client/src/contexts/AuthContext.tsx`
- Admin Dashboard: `client/src/pages/AdminAnalyticsDashboard.tsx`

---

**Last Updated**: December 2025  
**Version**: 2.3  
**Status**: Ready for Testing
