// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZoomMeetingManager from '@/components/ZoomMeetingManager';
import { useState } from 'react';
import { Video, Calendar, Users, Clock, CheckCircle } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Live lectures interface
 * - Zoom meeting integration
 * - Session scheduling and joining
 */

interface LiveSession {
  id: string;
  meetingId: string;
  topic: string;
  course: string;
  instructor: string;
  startTime: string;
  duration: number;
  joinUrl: string;
  password: string;
  status: 'scheduled' | 'live' | 'ended';
  participants: number;
  maxParticipants: number;
  description: string;
  thumbnail: string;
}

const liveSessions: LiveSession[] = [
  {
    id: '1',
    meetingId: '89123456789',
    topic: 'IELTS Speaking Part 1 - Live Practice',
    course: 'IELTS Mastery',
    instructor: 'Dr. Sarah Mitchell',
    startTime: '2025-01-25T14:00:00',
    duration: 60,
    joinUrl: 'https://zoom.us/j/89123456789?pwd=example',
    password: 'Example123',
    status: 'live',
    participants: 23,
    maxParticipants: 50,
    description: 'Interactive speaking practice session focusing on Part 1 of the IELTS exam. We will practice common topics and improve fluency.',
    thumbnail: '/images/hero-live-classes.jpg',
  },
  {
    id: '2',
    meetingId: '89987654321',
    topic: 'Business English - Email Writing Workshop',
    course: 'Business English Pro',
    instructor: 'Emma Richardson',
    startTime: '2025-01-25T16:00:00',
    duration: 90,
    joinUrl: 'https://zoom.us/j/89987654321?pwd=example',
    password: 'Example456',
    status: 'scheduled',
    participants: 15,
    maxParticipants: 40,
    description: 'Learn professional email writing techniques and best practices for business communication.',
    thumbnail: '/images/hero-ai-tutor.jpg',
  },
  {
    id: '3',
    meetingId: '89555666777',
    topic: 'SAT Prep - Math Strategies',
    course: 'SAT Preparation',
    instructor: 'Prof. Michael Chen',
    startTime: '2025-01-26T10:00:00',
    duration: 120,
    joinUrl: 'https://zoom.us/j/89555666777?pwd=example',
    password: 'Example789',
    status: 'scheduled',
    participants: 8,
    maxParticipants: 30,
    description: 'Advanced math strategies and problem-solving techniques for the SAT exam.',
    thumbnail: '/images/hero-placement-test.jpg',
  },
];

export default function LiveLectures() {
  // const { t } = useLanguage();
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'live' | 'scheduled'>('all');

  const filteredSessions = liveSessions.filter((session) => {
    if (filterStatus === 'all') return true;
    return session.status === filterStatus;
  });

  const liveSessCount = liveSessions.filter((s) => s.status === 'live').length;
  const upcomingSessCount = liveSessions.filter((s) => s.status === 'scheduled').length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Live Lectures</h1>
              <p className="text-foreground/70">Join live sessions with your instructors</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold gradient-text">{liveSessCount}</p>
              <p className="text-sm text-foreground/60">Live Now</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          {!selectedSession ? (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">Live Sessions</h3>
                    <Video className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">{liveSessCount}</p>
                  <p className="text-xs text-foreground/60 mt-2">Happening now</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">Upcoming</h3>
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">{upcomingSessCount}</p>
                  <p className="text-xs text-foreground/60 mt-2">Scheduled sessions</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">Total Participants</h3>
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">
                    {liveSessions.reduce((sum, s) => sum + s.participants, 0)}
                  </p>
                  <p className="text-xs text-foreground/60 mt-2">Across all sessions</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${filterStatus === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'glass-card border border-white/20 hover:border-accent/50'
                    }`}
                >
                  All Sessions
                </button>
                <button
                  onClick={() => setFilterStatus('live')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${filterStatus === 'live'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'glass-card border border-white/20 hover:border-accent/50'
                    }`}
                >
                  🔴 Live Now
                </button>
                <button
                  onClick={() => setFilterStatus('scheduled')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${filterStatus === 'scheduled'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'glass-card border border-white/20 hover:border-accent/50'
                    }`}
                >
                  📅 Scheduled
                </button>
              </div>

              {/* Sessions Grid */}
              <div className="space-y-6">
                {filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    className="glass-card overflow-hidden hover:shadow-lg transition-smooth cursor-pointer group"
                    onClick={() => setSelectedSession(session)}
                  >
                    <div className="flex gap-6">
                      {/* Thumbnail */}
                      <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
                        <img
                          src={session.thumbnail}
                          alt={session.topic}
                          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          {session.status === 'live' ? (
                            <div className="flex items-center gap-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                              <span className="w-2 h-2 bg-white rounded-full"></span>
                              LIVE
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                              <Calendar className="w-3 h-3" />
                              SCHEDULED
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{session.topic}</h3>
                          <p className="text-sm text-foreground/70 mb-4">{session.description}</p>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-accent" />
                              <span>{new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-accent" />
                              <span>
                                {session.participants}/{session.maxParticipants} participants
                              </span>
                            </div>
                            <div className="text-foreground/70">
                              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                                {session.course}
                              </span>
                            </div>
                            <div className="text-foreground/70 text-right">
                              <span className="text-xs">Instructor: {session.instructor}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4">
                          {session.status === 'live' ? (
                            <Button className="gradient-button">
                              <Video className="w-4 h-4 mr-2" />
                              Join Now
                            </Button>
                          ) : (
                            <Button variant="outline">
                              <Calendar className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Session Detail View */}
              <button
                onClick={() => setSelectedSession(null)}
                className="text-accent hover:text-accent/80 font-semibold mb-6"
              >
                ← Back to Sessions
              </button>

              <ZoomMeetingManager meeting={selectedSession} isTeacher={false} />

              {/* Session Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2 glass-card p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4">About This Session</h2>
                  <p className="text-foreground/70 mb-6">{selectedSession.description}</p>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-white/10">
                      <p className="text-xs text-foreground/60 mb-1">Course</p>
                      <p className="font-semibold">{selectedSession.course}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10">
                      <p className="text-xs text-foreground/60 mb-1">Instructor</p>
                      <p className="font-semibold">{selectedSession.instructor}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10">
                      <p className="text-xs text-foreground/60 mb-1">Duration</p>
                      <p className="font-semibold">{selectedSession.duration} minutes</p>
                    </div>
                  </div>
                </div>

                {/* Participants */}
                <div className="glass-card p-8 border border-white/10">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Participants
                  </h3>

                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                      <p className="text-xs text-foreground/60">Current</p>
                      <p className="text-3xl font-bold gradient-text">{selectedSession.participants}</p>
                    </div>

                    <div className="p-4 rounded-lg border border-white/10">
                      <p className="text-xs text-foreground/60">Capacity</p>
                      <p className="text-2xl font-bold">{selectedSession.maxParticipants}</p>
                    </div>

                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                        style={{
                          width: `${(selectedSession.participants / selectedSession.maxParticipants) * 100}%`,
                        }}
                      ></div>
                    </div>

                    <p className="text-xs text-foreground/60 text-center">
                      {Math.round((selectedSession.participants / selectedSession.maxParticipants) * 100)}% capacity
                    </p>
                  </div>

                  {selectedSession.status === 'live' && (
                    <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-400 text-sm">Session is Live</p>
                        <p className="text-xs text-foreground/70">Join now to participate</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
