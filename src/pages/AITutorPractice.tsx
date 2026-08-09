// import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AILiveTutor from '@/components/AILiveTutor';
import { useState } from 'react';
import { BookOpen, Clock, Target, Zap, ArrowLeft } from 'lucide-react';

interface PracticeSession {
  id: string;
  topic: string;
  level: string;
  duration: number;
  focusArea: string;
  objectives: string[];
}

const practiceSessions: PracticeSession[] = [
  {
    id: '1',
    topic: 'IELTS Speaking Part 1',
    level: 'Intermediate',
    duration: 45,
    focusArea: 'Fluency & Pronunciation',
    objectives: [
      'Improve speaking fluency',
      'Practice common IELTS questions',
      'Correct pronunciation errors',
      'Build confidence',
    ],
  },
  {
    id: '2',
    topic: 'Business English',
    level: 'Advanced',
    duration: 60,
    focusArea: 'Professional Communication',
    objectives: [
      'Master business vocabulary',
      'Practice presentations',
      'Email writing skills',
      'Meeting discussions',
    ],
  },
  {
    id: '3',
    topic: 'Grammar Mastery',
    level: 'Beginner',
    duration: 30,
    focusArea: 'Tenses & Structures',
    objectives: [
      'Learn verb tenses',
      'Practice sentence construction',
      'Understand grammar rules',
      'Apply to real conversations',
    ],
  },
];

export default function AITutorPractice() {
  // const { t } = useLanguage();
  const [selectedSession, setSelectedSession] = useState<PracticeSession | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);

  if (isSessionActive && selectedSession) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Header />
        <div className="flex-1 p-6">
          <button
            onClick={() => {
              setIsSessionActive(false);
              setSelectedSession(null);
            }}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-smooth mb-4 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Sessions
          </button>
          <div className="h-[calc(100vh-200px)]">
            <AILiveTutor
              studentName="Ahmed"
              currentLevel={selectedSession.level}
              topicFocus={selectedSession.topic}
              onClose={() => {
                setIsSessionActive(false);
                setSelectedSession(null);
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold gradient-text mb-2">AI Live Tutor</h1>
          <p className="text-foreground/70">24/7 Interactive English Practice with Real-Time Feedback</p>
        </div>
      </section>

      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 border border-white/10">
              <Zap className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-bold mb-2">Real-Time Feedback</h3>
              <p className="text-sm text-foreground/70">Instant corrections and suggestions</p>
            </div>

            <div className="glass-card p-6 border border-white/10">
              <Clock className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-bold mb-2">24/7 Available</h3>
              <p className="text-sm text-foreground/70">Practice anytime, anywhere</p>
            </div>

            <div className="glass-card p-6 border border-white/10">
              <Target className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-bold mb-2">Personalized</h3>
              <p className="text-sm text-foreground/70">Tailored to your level</p>
            </div>

            <div className="glass-card p-6 border border-white/10">
              <BookOpen className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-bold mb-2">Comprehensive</h3>
              <p className="text-sm text-foreground/70">All language skills covered</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Choose Your Practice Session</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {practiceSessions.map((session) => (
                <div
                  key={session.id}
                  className="glass-card border border-white/10 hover:border-accent/50 transition-smooth overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setSelectedSession(session);
                    setIsSessionActive(true);
                  }}
                >
                  <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 p-6 border-b border-white/10">
                    <h3 className="text-lg font-bold mb-2">{session.topic}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold">
                        {session.level}
                      </span>
                      <span className="flex items-center gap-1 text-foreground/70">
                        <Clock className="w-4 h-4" />
                        {session.duration} min
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm font-semibold text-foreground/70 mb-4">Focus Area:</p>
                    <p className="text-lg font-bold mb-6 gradient-text">{session.focusArea}</p>

                    <p className="text-sm font-semibold text-foreground/70 mb-3">Learning Objectives:</p>
                    <ul className="space-y-2 mb-6">
                      {session.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-accent mt-1">✓</span>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-white/10">
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-smooth group-hover:scale-105 transform">
                      Start Practice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 glass-card p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-8">How AI Tutor Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Choose Topic',
                  description: 'Select your learning focus area',
                },
                {
                  step: '2',
                  title: 'Practice Speaking',
                  description: 'Chat with AI tutor in real-time',
                },
                {
                  step: '3',
                  title: 'Get Feedback',
                  description: 'Receive instant corrections',
                },
                {
                  step: '4',
                  title: 'Improve Skills',
                  description: 'Track progress over time',
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 border border-white/10 text-center">
              <p className="text-4xl font-bold gradient-text mb-2">1M+</p>
              <p className="text-foreground/70">Practice Sessions Completed</p>
            </div>

            <div className="glass-card p-6 border border-white/10 text-center">
              <p className="text-4xl font-bold gradient-text mb-2">95%</p>
              <p className="text-foreground/70">Student Satisfaction Rate</p>
            </div>

            <div className="glass-card p-6 border border-white/10 text-center">
              <p className="text-4xl font-bold gradient-text mb-2">24/7</p>
              <p className="text-foreground/70">Always Available</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
