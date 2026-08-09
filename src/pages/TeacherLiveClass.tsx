// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZoomMeetingManager from '@/components/ZoomMeetingManager';
import { useState } from 'react';
import { Video, Plus, Calendar, Users, Clock, Settings } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Teacher live class management
 * - Zoom session scheduling and control
 * - Student participation tracking
 */

interface LiveClass {
  id: string;
  meetingId: string;
  topic: string;
  course: string;
  startTime: string;
  duration: number;
  joinUrl: string;
  password: string;
  status: 'scheduled' | 'live' | 'ended';
  participants: number;
  maxParticipants: number;
  recordingUrl?: string;
}

const upcomingClasses: LiveClass[] = [
  {
    id: '1',
    meetingId: '89123456789',
    topic: 'IELTS Speaking Part 1 - Live Practice',
    course: 'IELTS Mastery',
    startTime: '2025-01-25T14:00:00',
    duration: 60,
    joinUrl: 'https://zoom.us/j/89123456789?pwd=example',
    password: 'Example123',
    status: 'live',
    participants: 23,
    maxParticipants: 50,
  },
  {
    id: '2',
    meetingId: '89987654321',
    topic: 'Grammar Workshop - Advanced Topics',
    course: 'IELTS Mastery',
    startTime: '2025-01-26T15:30:00',
    duration: 90,
    joinUrl: 'https://zoom.us/j/89987654321?pwd=example',
    password: 'Example456',
    status: 'scheduled',
    participants: 0,
    maxParticipants: 40,
  },
];

const pastClasses: LiveClass[] = [
  {
    id: '3',
    meetingId: '89555666777',
    topic: 'Listening Comprehension - News Articles',
    course: 'IELTS Mastery',
    startTime: '2025-01-24T14:00:00',
    duration: 60,
    joinUrl: 'https://zoom.us/j/89555666777?pwd=example',
    password: 'Example789',
    status: 'ended',
    participants: 18,
    maxParticipants: 50,
    recordingUrl: 'https://example.com/recording/class-3',
  },
];

export default function TeacherLiveClass() {
  // const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState<LiveClass | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newClass, setNewClass] = useState({
    topic: '',
    course: 'IELTS Mastery',
    startTime: '',
    duration: 60,
  });

  const handleScheduleClass = () => {
    if (newClass.topic && newClass.startTime) {
      // In a real app, this would call an API
      alert('Class scheduled successfully!');
      setShowScheduleModal(false);
      setNewClass({ topic: '', course: 'IELTS Mastery', startTime: '', duration: 60 });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Live Classes</h1>
              <p className="text-foreground/70">Manage and host your live sessions</p>
            </div>
            <Button className="gradient-button" onClick={() => setShowScheduleModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Class
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          {!selectedClass ? (
            <>
              {/* Upcoming Classes */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Video className="w-6 h-6 text-accent" />
                  Upcoming Classes
                </h2>

                {upcomingClasses.length === 0 ? (
                  <div className="glass-card p-12 text-center border border-white/10">
                    <Calendar className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                    <p className="text-foreground/70 mb-4">No upcoming classes scheduled</p>
                    <Button className="gradient-button" onClick={() => setShowScheduleModal(true)}>
                      Schedule Your First Class
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingClasses.map((liveClass) => (
                      <div
                        key={liveClass.id}
                        className="glass-card p-6 border border-white/10 hover:border-accent/50 transition-smooth cursor-pointer"
                        onClick={() => setSelectedClass(liveClass)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold">{liveClass.topic}</h3>
                            <p className="text-sm text-accent font-semibold">{liveClass.course}</p>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-bold ${liveClass.status === 'live'
                              ? 'bg-red-500/20 text-red-400 animate-pulse'
                              : 'bg-blue-500/20 text-blue-400'
                              }`}
                          >
                            {liveClass.status === 'live' ? '🔴 LIVE' : '📅 Scheduled'}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-accent" />
                            <span>{new Date(liveClass.startTime).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-accent" />
                            <span>
                              {liveClass.participants}/{liveClass.maxParticipants}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-accent" />
                            <span>{liveClass.duration} min</span>
                          </div>
                        </div>

                        <Button
                          className="gradient-button w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClass(liveClass);
                          }}
                        >
                          {liveClass.status === 'live' ? 'Manage Session' : 'View Details'}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Classes */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Past Classes</h2>

                <div className="space-y-4">
                  {pastClasses.map((liveClass) => (
                    <div key={liveClass.id} className="glass-card p-6 border border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{liveClass.topic}</h3>
                          <p className="text-sm text-foreground/70">{liveClass.course}</p>
                        </div>
                        <span className="text-xs bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full font-bold">
                          ✓ Completed
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-foreground/60" />
                          <span>{new Date(liveClass.startTime).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-foreground/60" />
                          <span>{liveClass.participants} attended</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-foreground/60" />
                          <span>{liveClass.duration} min</span>
                        </div>
                      </div>

                      {liveClass.recordingUrl && (
                        <Button variant="outline" className="w-full">
                          View Recording
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Class Detail View */}
              <button
                onClick={() => setSelectedClass(null)}
                className="text-accent hover:text-accent/80 font-semibold mb-6"
              >
                ← Back to Classes
              </button>

              <ZoomMeetingManager
                meeting={selectedClass}
                isTeacher={true}
                onStartMeeting={() => alert('Starting meeting...')}
                onEndMeeting={() => {
                  alert('Meeting ended');
                  setSelectedClass(null);
                }}
              />

              {/* Class Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="glass-card p-6 border border-white/10">
                  <p className="text-foreground/60 text-sm mb-2">Current Participants</p>
                  <p className="text-3xl font-bold gradient-text">{selectedClass.participants}</p>
                </div>

                <div className="glass-card p-6 border border-white/10">
                  <p className="text-foreground/60 text-sm mb-2">Capacity</p>
                  <p className="text-3xl font-bold gradient-text">{selectedClass.maxParticipants}</p>
                </div>

                <div className="glass-card p-6 border border-white/10">
                  <p className="text-foreground/60 text-sm mb-2">Duration</p>
                  <p className="text-3xl font-bold gradient-text">{selectedClass.duration} min</p>
                </div>
              </div>

              {/* Class Controls */}
              <div className="glass-card p-8 border border-white/10 mt-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-accent" />
                  Class Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                    <span className="font-semibold">Enable Recording</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                    <span className="font-semibold">Mute Participants on Entry</span>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                    <span className="font-semibold">Enable Chat</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                    <span className="font-semibold">Allow Screen Sharing</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-8 max-w-md w-full border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Schedule New Class</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Class Topic</label>
                <input
                  type="text"
                  value={newClass.topic}
                  onChange={(e) => setNewClass({ ...newClass, topic: e.target.value })}
                  placeholder="e.g., IELTS Speaking Practice"
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Course</label>
                <select
                  value={newClass.course}
                  onChange={(e) => setNewClass({ ...newClass, course: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
                >
                  <option>IELTS Mastery</option>
                  <option>Business English Pro</option>
                  <option>SAT Preparation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  value={newClass.startTime}
                  onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={newClass.duration}
                  onChange={(e) => setNewClass({ ...newClass, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowScheduleModal(false)}
              >
                Cancel
              </Button>
              <Button className="gradient-button flex-1" onClick={handleScheduleClass}>
                Schedule
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
