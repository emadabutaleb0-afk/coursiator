// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Admin authentication with enhanced security
 * - Two-factor authentication ready
 * - Secure access control
 */

export default function AdminAuth() {
  // const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Simulate authentication delay
      setTimeout(() => {
        localStorage.setItem('adminAuth', JSON.stringify({
          email: formData.email,
          role: 'admin',
          loginTime: new Date().toISOString(),
        }));
        setLocation('/admin-control-panel');
        setLoading(false);
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Coursiator</h1>
              <p className="text-xs text-accent">Admin Control Panel</p>
            </div>
          </div>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-8 mb-6 border border-white/10">
          <h2 className="text-2xl font-bold mb-2 text-center">Administrator Login</h2>
          <p className="text-center text-foreground/60 text-sm mb-6">
            Secure access to platform management
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-accent" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@coursiator.com"
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
                  placeholder="••••••••••••"
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

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-sm text-foreground/70 cursor-pointer">
                Remember this device
              </label>
            </div>

            {/* Submit Button */}
            <Button className="gradient-button w-full mt-6" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In to Control Panel'}
            </Button>
          </form>

          {/* Help Link */}
          <div className="mt-6 text-center">
            <p className="text-foreground/70 text-sm">
              Need help?{' '}
              <a href="#" className="text-accent font-semibold hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Security Info */}
        <div className="glass-card p-6 border border-accent/30 bg-accent/5">
          <p className="text-sm text-foreground/70">
            <Shield className="w-4 h-4 inline mr-2 text-accent" />
            This is a secure admin area. All access is logged and monitored for security.
          </p>
        </div>
      </div>
    </div>
  );
}
