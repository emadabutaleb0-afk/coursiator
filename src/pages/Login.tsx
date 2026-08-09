import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { DEMO_CREDENTIALS } from '@/lib/authService';

/**
 * Login Page
 * Role-based authentication for students, instructors, and admins
 */

export default function Login() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'instructor' | 'admin'>('student');

  const { login, isLoading } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t('login.error.fill'));
      return;
    }

    try {
      const { user } = await login({ email, password });

      // Redirect based on role
      setTimeout(() => {
        switch (user.role) {
          case 'student':
            navigate('/student-portal');
            break;
          case 'instructor':
            navigate('/teacher-dashboard');
            break;
          case 'admin':
            navigate('/dashboard'); // Points to AdminAnalyticsDashboard
            break;
          default:
            navigate('/dashboard');
        }
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('login.error.failed'));
    }
  };

  const fillDemoCredentials = (role: 'student' | 'instructor' | 'admin') => {
    const creds = DEMO_CREDENTIALS[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Coursiator" className="w-48 h-48 object-contain" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">{t('login.welcome')}</h1>
          <p className="text-foreground/70">{t('login.subtitle')}</p>
        </div>

        {/* Main Card */}
        <div className="glass-card border border-white/20 rounded-2xl p-8 bg-white/40 backdrop-blur-xl shadow-xl">
          {/* Role Selection */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-3 text-foreground/70 text-center">{t('login.role')}</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { role: 'student' as const, label: t('login.student'), icon: '👩‍🎓' },
                { role: 'instructor' as const, label: t('login.instructor'), icon: '👨‍🏫' },
                { role: 'admin' as const, label: t('login.admin'), icon: '👨‍💼' },
              ].map(({ role, label, icon }) => (
                <button
                  key={role}
                  onClick={() => fillDemoCredentials(role)}
                  className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all duration-300 flex flex-col items-center gap-2 border ${selectedRole === role
                    ? 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white border-transparent shadow-md transform scale-105'
                    : 'bg-white/50 text-foreground/70 border-white/20 hover:bg-white/80 hover:border-white/40 hover:shadow-sm'
                    }`}
                >
                  <span className="text-2xl filter drop-shadow-sm">{icon}</span>
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground/80">{t('login.email')}</Label>
              <div className="relative">
                <Mail className={`absolute top-3 w-5 h-5 text-accent/60 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('login.placeholder.email')}
                  className={`w-full h-12 bg-white/50 border-white/20 focus:bg-white focus:border-accent/50 transition-all duration-300 ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground/80">{t('login.password')}</Label>
              <div className="relative">
                <Lock className={`absolute top-3 w-5 h-5 text-accent/60 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.placeholder.password')}
                  className={`w-full h-12 bg-white/50 border-white/20 focus:bg-white focus:border-accent/50 transition-all duration-300 ${language === 'ar' ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-3 text-accent/60 hover:text-accent transition-colors ${language === 'ar' ? 'left-3' : 'right-3'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                <div className="w-1 h-8 bg-red-500 rounded-full" />
                {error}
              </div>
            )}

            {/* Demo Credentials Info */}
            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl text-blue-600/90 text-xs">
              <p className="font-semibold mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {t('login.demo')}
              </p>
              <p className="pl-3.5 opacity-80">{t('login.demo.desc')}</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 gradient-button font-semibold text-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {t('login.submitting')}
                </>
              ) : (
                t('login.submit')
              )}
            </Button>

            {/* Links */}
            <div className="space-y-4 pt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-foreground/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-foreground/40 font-medium">Or</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-center text-sm">
                <p className="text-foreground/60">
                  {t('login.noAccount')}{' '}
                  <a href="/register" className="text-accent font-semibold hover:text-accent/80 transition-colors">
                    {t('login.create')}
                  </a>
                </p>
                <a href="/" className="text-foreground/40 hover:text-foreground/60 text-xs transition-colors">
                  {t('login.back')}
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
