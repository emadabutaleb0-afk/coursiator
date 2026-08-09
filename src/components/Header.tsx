import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Coursiator" className="h-32 w-auto object-contain" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-foreground hover:text-accent transition-smooth font-medium">
            Home
          </a>
          <a href="/courses" className="text-foreground hover:text-accent transition-smooth font-medium">
            Courses
          </a>
          <a href="/live-lectures" className="text-foreground hover:text-accent transition-smooth font-medium">
            Live Lectures
          </a>
          <a href="/booking-system" className="text-foreground hover:text-accent transition-smooth font-medium">
            Book Session
          </a>
          <a href="/ai-tutor" className="text-foreground hover:text-accent transition-smooth font-medium">
            AI Tutor
          </a>
          <a href="/teacher-profiles" className="text-foreground hover:text-accent transition-smooth font-medium">
            Teachers
          </a>
          <a href="/messaging" className="text-foreground hover:text-accent transition-smooth font-medium">
            Messages
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-smooth font-medium">
            About
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-smooth font-medium">
            Contact
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/10 transition-smooth"
            aria-label="Toggle language"
          >
            <Globe className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold">{language.toUpperCase()}</span>
          </button>

          {/* Auth Buttons */}
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="hidden sm:inline-flex"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate('/placement-test')}
            className="gradient-button hidden sm:inline-flex"
          >
            Take Free Test
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-white/50 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a href="/" className="text-foreground hover:text-accent transition-smooth font-medium">
              Home
            </a>
            <a href="/courses" className="text-foreground hover:text-accent transition-smooth font-medium">
              Courses
            </a>
            <a href="/live-lectures" className="text-foreground hover:text-accent transition-smooth font-medium">
              Live Lectures
            </a>
            <a href="/booking-system" className="text-foreground hover:text-accent transition-smooth font-medium">
              Book Session
            </a>
            <a href="/ai-tutor" className="text-foreground hover:text-accent transition-smooth font-medium">
              AI Tutor
            </a>
            <a href="/teacher-profiles" className="text-foreground hover:text-accent transition-smooth font-medium">
              Teachers
            </a>
            <a href="/messaging" className="text-foreground hover:text-accent transition-smooth font-medium">
              Messages
            </a>
            <a href="#" className="text-foreground hover:text-accent transition-smooth font-medium">
              About
            </a>
            <a href="#" className="text-foreground hover:text-accent transition-smooth font-medium">
              Contact
            </a>
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
            <Button className="gradient-button w-full">
              Take Free Test
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
