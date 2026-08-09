// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Glassmorphic auth forms
 * - Smooth transitions between login and signup
 * - Form validation with visual feedback
 */

export default function StudentAuth() {
  // const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    proficiencyLevel: 'beginner',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Full name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (isLogin) {
          await login({ email: formData.email, password: formData.password });
        } else {
          await register({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            confirmPassword: formData.confirmPassword,
            role: 'student'
          });
        }
        setLocation('/student-learning-hub');
      } catch (err) {
        if (err instanceof Error) {
          setErrors({ form: err.message });
        } else {
          setErrors({ form: 'Authentication failed' });
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/logo.png" alt="Coursiator" className="w-48 h-48 object-contain" />
          </div>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? 'Student Login' : 'Create Student Account'}
          </h2>

          {errors.form && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-accent" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-smooth"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-accent" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-smooth"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-accent" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-smooth"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-foreground/60 hover:text-accent transition-smooth"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Field (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-accent" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-smooth"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Proficiency Level (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Current English Level</label>
                <select
                  name="proficiencyLevel"
                  value={formData.proficiencyLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-smooth"
                >
                  <option value="beginner">Beginner</option>
                  <option value="pre-intermediate">Pre-Intermediate</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="upper-intermediate">Upper Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <Button className="gradient-button w-full mt-6">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-foreground/70 text-sm">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    proficiencyLevel: 'beginner',
                  });
                  setErrors({});
                }}
                className="text-accent font-semibold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="glass-card p-6 text-center">
          <p className="text-sm text-foreground/70">
            {isLogin
              ? 'Access your learning dashboard and start your language journey'
              : 'Create an account to access courses and take the placement test'}
          </p>
        </div>
      </div>
    </div>
  );
}
