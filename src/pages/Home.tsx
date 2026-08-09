import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, Users, Brain, TrendingUp } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech with Glassmorphism
 * - Teal-to-purple gradient backgrounds
 * - Frosted glass cards with backdrop blur
 * - Rounded corners (16px+) for approachability
 * - Smooth animations and hover effects
 * - Space Grotesk for headings, Poppins for body
 */

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-300 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">{t('home.hero.title')}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/placement-test" className="inline-block">
                  <Button className="gradient-button text-lg px-8 py-6">
                    {t('home.hero.cta')}
                  </Button>
                </a>
                <Button variant="outline" className="text-lg px-8 py-6 border-2">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8">
                <div className="glass-card p-3 sm:p-4">
                  <p className="text-xl sm:text-2xl font-bold gradient-text">10K+</p>
                  <p className="text-xs sm:text-sm text-foreground/60">{t('home.stats.students')}</p>
                </div>
                <div className="glass-card p-3 sm:p-4">
                  <p className="text-xl sm:text-2xl font-bold gradient-text">95%</p>
                  <p className="text-xs sm:text-sm text-foreground/60">{t('home.stats.success')}</p>
                </div>
                <div className="glass-card p-3 sm:p-4">
                  <p className="text-xl sm:text-2xl font-bold gradient-text">24/7</p>
                  <p className="text-xs sm:text-sm text-foreground/60">{t('home.stats.support')}</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src="/images/hero-ai-tutor.jpg"
                alt="AI Tutor"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white/40 backdrop-blur-md border-y border-white/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-foreground/70">
              Discover what makes Coursiator the premier choice for language learners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI Tutor Feature */}
            <div className="glass-card p-8 hover:shadow-xl transition-smooth group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.features.aiTutor')}</h3>
              <p className="text-foreground/70">{t('home.features.aiTutorDesc')}</p>
            </div>

            {/* Live Classes Feature */}
            <div className="glass-card p-8 hover:shadow-xl transition-smooth group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.features.liveClasses')}</h3>
              <p className="text-foreground/70">{t('home.features.liveClassesDesc')}</p>
            </div>

            {/* Placement Test Feature */}
            <div className="glass-card p-8 hover:shadow-xl transition-smooth group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.features.placement')}</h3>
              <p className="text-foreground/70">{t('home.features.placementDesc')}</p>
            </div>

            {/* Progress Tracking Feature */}
            <div className="glass-card p-8 hover:shadow-xl transition-smooth group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.features.progress')}</h3>
              <p className="text-foreground/70">{t('home.features.progressDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {t('courses.title')}
            </h2>
            <p className="text-xl text-foreground/70">
              Choose your learning path and start your journey today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* IELTS Course */}
            <div className="glass-card overflow-hidden hover:shadow-xl transition-smooth group">
              <img
                src="/images/hero-live-classes.jpg"
                alt="IELTS"
                className="w-full h-48 object-cover group-hover:scale-110 transition-smooth duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{t('courses.ielts')}</h3>
                <p className="text-foreground/70 mb-4 text-sm">Master IELTS with expert instructors and AI-powered practice.</p>
                <Button className="gradient-button w-full text-sm">Explore</Button>
              </div>
            </div>

            {/* SAT Course */}
            <div className="glass-card overflow-hidden hover:shadow-xl transition-smooth group">
              <img
                src="/images/hero-placement-test.jpg"
                alt="SAT"
                className="w-full h-48 object-cover group-hover:scale-110 transition-smooth duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{t('courses.sat')}</h3>
                <p className="text-foreground/70 mb-4 text-sm">Ace the SAT with comprehensive prep and personalized guidance.</p>
                <Button className="gradient-button w-full text-sm">Explore</Button>
              </div>
            </div>

            {/* Business English Course */}
            <div className="glass-card overflow-hidden hover:shadow-xl transition-smooth group">
              <img
                src="/images/hero-ai-tutor.jpg"
                alt="Business English"
                className="w-full h-48 object-cover group-hover:scale-110 transition-smooth duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{t('courses.business')}</h3>
                <p className="text-foreground/70 mb-4 text-sm">Excel in professional communication and corporate settings.</p>
                <Button className="gradient-button w-full text-sm">Explore</Button>
              </div>
            </div>

            {/* Arabic Course */}
            <div className="glass-card overflow-hidden hover:shadow-xl transition-smooth group">
              <img
                src="/images/dashboard-background.png"
                alt="Arabic"
                className="w-full h-48 object-cover group-hover:scale-110 transition-smooth duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{t('courses.arabic')}</h3>
                <p className="text-foreground/70 mb-4 text-sm">Learn Arabic communication with native speakers and AI.</p>
                <Button className="gradient-button w-full text-sm">Explore</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-cyan-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <a href="/placement-test" className="inline-block">
            <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 font-semibold">
              {t('home.hero.cta')}
            </Button>
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
