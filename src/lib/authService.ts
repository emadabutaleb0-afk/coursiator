/**
 * Authentication Service
 * Handles user login, registration, and role-based access control
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  joinDate: string;
  verified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: 'student' | 'instructor' | 'admin';
  confirmPassword: string;
}


// Removed MOCK_USERS

class AuthService {
  private currentUser: User | null = null;
  private token: string | null = null;

  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    const { user, token } = data;

    this.currentUser = user;
    this.token = token;

    // Store in localStorage
    localStorage.setItem('auth_token', token);
    localStorage.setItem('current_user', JSON.stringify(user));

    return { user, token };
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    // For registration, we might log them in immediately or require separate login.
    // Assuming API returns success but usage flow requires login, or API logs them in.
    // Based on our API, register returns { message, user }.
    // Modified to auto-login for smoother UX or adjusted based on API.
    // Let's assume we call register then login (or register API should return token - update API if needed, 
    // currently API register just creates user).

    // Update: API register.js returns { message, user }. It does NOT return a token.
    // So we must login after register or update API.
    // Let's update API to return token in next step if needed, or just login here.
    // For now, let's just do the register call.

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || 'Registration failed');
    }

    // Auto-login after successful registration
    return this.login({ email: data.email, password: data.password });
  }

  /**
   * Logout user
   */
  logout(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to restore from localStorage
    const stored = localStorage.getItem('current_user');
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      } catch {
        return null;
      }
    }

    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: 'student' | 'instructor' | 'admin'): boolean {
    return this.getCurrentUser()?.role === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: Array<'student' | 'instructor' | 'admin'>): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return this.token || localStorage.getItem('auth_token');
  }

  /**
   * Verify token (server-side verification is real source of truth)
   */
  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch('/api/auth/me', {
        headers: { token }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    // This needs a real endpoint in the future
    const user = this.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const updated = { ...user, ...updates };
    this.currentUser = updated;
    localStorage.setItem('current_user', JSON.stringify(updated));

    return updated;
  }
}

// Export singleton instance
export const authService = new AuthService();

// Demo credentials for easy testing
export const DEMO_CREDENTIALS = {
  student: {
    email: 'student@coursiator.com',
    password: 'Student@123',
  },
  instructor: {
    email: 'instructor@coursiator.com',
    password: 'Instructor@123',
  },
  admin: {
    email: 'admin@coursiator.com',
    password: 'Admin@123',
  },
};

