// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, BookOpen, MessageSquare, Award, TrendingUp, Clock } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Dashboard layout with glassmorphic cards
 * - Progress visualization with charts
 * - Quick access to AI tutor and live classes
 */

const progressData = [
  { week: 'Week 1', score: 65 },
  { week: 'Week 2', score: 72 },
  { week: 'Week 3', score: 78 },
  { week: 'Week 4', score: 85 },
  { week: 'Week 5', score: 88 },
  { week: 'Week 6', score: 92 },
];

const skillsData = [
  { skill: 'Grammar', value: 85 },
  { skill: 'Vocabulary', value: 78 },
  { skill: 'Listening', value: 82 },
  { skill: 'Speaking', value: 75 },
  { skill: 'Reading', value: 88 },
];

const upcomingClasses = [
  {
    id: 1,
    course: 'IELTS Mastery',
    instructor: 'Dr. Sarah Mitchell',
    date: '2025-01-15',
    time: '10:00 AM',
    topic: 'Speaking Part 1 & 2',
  },
  {
    id: 2,
    course: 'Business English Pro',
    instructor: 'Emma Richardson',
    date: '2025-01-16',
    time: '2:00 PM',
    topic: 'Presentations & Negotiations',
  },
  {
    id: 3,
    course: 'IELTS Mastery',
    instructor: 'Dr. Sarah Mitchell',
    date: '2025-01-17',
    time: '10:00 AM',
    topic: 'Writing Task 1 & 2',
  },
];

export default function StudentPortal() {
  // const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back, Student!</h1>
              <p className="text-foreground/70">Your personalized learning dashboard</p>
            </div>
            <Button className="gradient-button">
              <MessageSquare className="w-4 h-4 mr-2" />
              Open AI Tutor
            </Button>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Current Level</h3>
                <Award className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">Upper Int.</p>
              <p className="text-xs text-foreground/60 mt-2">Based on latest test</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Study Streak</h3>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">12 Days</p>
              <p className="text-xs text-foreground/60 mt-2">Keep it up!</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Classes Completed</h3>
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">24</p>
              <p className="text-xs text-foreground/600 mt-2">Out of 32 sessions</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">AI Tutor Hours</h3>
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">18.5</p>
              <p className="text-xs text-foreground/60 mt-2">Practice sessions</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Progress Chart */}
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold mb-6">Your Progress</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="url(#colorGradient)"
                    strokeWidth={3}
                    dot={{ fill: '#06B6D4', r: 5 }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" />
                      <stop offset="95%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Skills Chart */}
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold mb-6">Skill Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="skill" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Upcoming Classes
            </h2>

            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-white/20 hover:bg-white/5 transition-smooth"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{cls.course}</h3>
                    <p className="text-sm text-foreground/60 mb-2">{cls.topic}</p>
                    <p className="text-xs text-foreground/50">
                      {cls.instructor} • {cls.date} at {cls.time}
                    </p>
                  </div>
                  <Button className="gradient-button text-sm">Join Class</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Roadmap */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6">Your Personalized Roadmap</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Foundation Phase (Completed)</h3>
                  <p className="text-sm text-foreground/70">
                    Mastered basic grammar, vocabulary, and listening comprehension.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Intermediate Phase (In Progress - 60%)</h3>
                  <p className="text-sm text-foreground/70">
                    Focus on advanced grammar, speaking fluency, and exam techniques.
                  </p>
                  <div className="w-full h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-600" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-foreground/60 text-sm font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Advanced Phase (Upcoming)</h3>
                  <p className="text-sm text-foreground/70">
                    Master advanced topics, prepare for certification exams, and business communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
