import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Clock, Users, Award, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MockCourseService, Course } from '@/services/mockCourseService';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Course cards with glassmorphic design
 * - Gradient accents for pricing tiers
 * - Smooth interactions and hover effects
 */

// Interface moved to service
// courses array removed in favor of MockCourseService

export default function Courses() {
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await MockCourseService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to load courses", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleEnroll = (course: Course) => {
    // Check if already enrolled
    const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (enrolled.find((c: any) => c.id === course.id)) {
      toast.info(t('courses.toast.already'));
      setLocation('/student-learning-hub');
      return;
    }

    if (course.price === 0) {
      // Free Course - Instant Enrollment
      const newEnrollment = {
        id: course.id,
        title: course.name,
        instructor: course.instructor,
        image: course.image,
        level: 'Beginner', // Default or from course data
        progress: 0
      };

      enrolled.push(newEnrollment);
      localStorage.setItem('enrolled_courses', JSON.stringify(enrolled));

      toast.success(t('courses.toast.enrolled'));
      setLocation('/student-learning-hub');
    } else {
      // Paid Course - Add to Cart
      addItem({
        id: course.id,
        title: course.name,
        price: course.price,
        image: course.image,
        instructor: course.instructor,
        level: 'All Levels',
        quantity: 1
      });
      toast.success(t('courses.toast.cart'));
      setLocation('/shopping-cart');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Page Header */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            {t('courses.title')}
          </h1>
          <p className="text-xl text-foreground/70">
            {t('courses.subtitle')}
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="glass-card overflow-hidden hover:shadow-2xl transition-smooth group cursor-pointer"
                // onClick={() => setSelectedCourse(course.id)}
                >
                  {/* Course Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={course.image}
                      alt={language === 'en' ? course.name : course.nameAr}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-lg px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{course.rating}</span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {language === 'en' ? course.name : course.nameAr}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4">
                      {language === 'en' ? course.description : course.descriptionAr}
                    </p>

                    {/* Course Meta */}
                    <div className="space-y-3 mb-6 text-sm text-foreground/60">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>{course.sessions} Sessions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        <span>{course.students.toLocaleString()} Students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-accent" />
                        <span>{course.instructor}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(language === 'en' ? course.features : course.featuresAr).slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-semibold"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground/60">Starting at</p>
                        <p className="text-2xl font-bold gradient-text">${course.price}</p>
                      </div>
                      <Button
                        className="gradient-button text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnroll(course);
                        }}
                      >
                        {course.price === 0 ? "Enroll Now" : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 md:py-32 bg-white/40 backdrop-blur-md border-y border-white/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              What's Included in Every Course
            </h2>
            <p className="text-xl text-foreground/70">
              Premium features to accelerate your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Group Classes</h3>
              <p className="text-foreground/70">
                Interactive sessions with expert instructors and small class sizes for personalized attention.
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 AI Tutor</h3>
              <p className="text-foreground/70">
                Practice anytime with our AI-powered tutor offering real-time feedback and personalized guidance.
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lifetime Access</h3>
              <p className="text-foreground/70">
                Access all course materials, recordings, and resources forever after enrollment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Flexible Payment Plans
            </h2>
            <p className="text-xl text-foreground/70">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pay Per Session */}
            <div className="glass-card p-8 border-2 border-white/30">
              <h3 className="text-2xl font-bold mb-4">Pay Per Session</h3>
              <p className="text-4xl font-bold gradient-text mb-2">$29</p>
              <p className="text-foreground/60 mb-6">per session</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> One live class
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> AI tutor access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> Session recording
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </div>

            {/* Course Bundle (Most Popular) */}
            <div className="glass-card p-8 border-2 border-accent/50 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Course Bundle</h3>
              <p className="text-4xl font-bold gradient-text mb-2">$299</p>
              <p className="text-foreground/60 mb-6">16 sessions</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> 16 live classes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> Unlimited AI tutor
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> All recordings
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> Certificate
                </li>
              </ul>
              <Button className="gradient-button w-full">
                Enroll Now
              </Button>
            </div>

            {/* Corporate */}
            <div className="glass-card p-8 border-2 border-white/30">
              <h3 className="text-2xl font-bold mb-4">Corporate Plan</h3>
              <p className="text-4xl font-bold gradient-text mb-2">Custom</p>
              <p className="text-foreground/60 mb-6">for teams</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> Bulk discounts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> Team analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✓</span> Dedicated support
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
