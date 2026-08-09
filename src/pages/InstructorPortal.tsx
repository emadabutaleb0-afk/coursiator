// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar, Star, TrendingUp, Plus, Edit2 } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Instructor dashboard with class management
 * - Student roster and performance analytics
 * - Grade and feedback submission interface
 */

const classSchedule = [
  {
    id: 1,
    course: 'IELTS Mastery',
    date: '2025-01-15',
    time: '10:00 AM',
    students: 12,
    status: 'Scheduled',
  },
  {
    id: 2,
    course: 'IELTS Mastery',
    date: '2025-01-17',
    time: '10:00 AM',
    students: 12,
    status: 'Scheduled',
  },
  {
    id: 3,
    course: 'IELTS Mastery',
    date: '2025-01-22',
    time: '10:00 AM',
    students: 12,
    status: 'Scheduled',
  },
];

const studentRoster = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    level: 'Upper Intermediate',
    attendance: 24,
    performance: 85,
  },
  {
    id: 2,
    name: 'Fatima Al-Rashid',
    email: 'fatima@example.com',
    level: 'Intermediate',
    attendance: 22,
    performance: 78,
  },
  {
    id: 3,
    name: 'Mohammed Khan',
    email: 'mohammed@example.com',
    level: 'Upper Intermediate',
    attendance: 24,
    performance: 88,
  },
  {
    id: 4,
    name: 'Layla Ibrahim',
    email: 'layla@example.com',
    level: 'Intermediate',
    attendance: 20,
    performance: 75,
  },
];

const performanceData = [
  { week: 'Week 1', avgScore: 72 },
  { week: 'Week 2', avgScore: 75 },
  { week: 'Week 3', avgScore: 78 },
  { week: 'Week 4', avgScore: 82 },
  { week: 'Week 5', avgScore: 85 },
  { week: 'Week 6', avgScore: 87 },
];

export default function InstructorPortal() {
  // const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Instructor Dashboard</h1>
              <p className="text-foreground/70">Manage your classes and track student progress</p>
            </div>
            <Button className="gradient-button">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Class
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
                <h3 className="text-sm font-semibold text-foreground/60">Total Students</h3>
                <Users className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">48</p>
              <p className="text-xs text-foreground/60 mt-2">Across all courses</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Classes This Month</h3>
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">12</p>
              <p className="text-xs text-foreground/60 mt-2">8 completed, 4 upcoming</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Avg. Rating</h3>
                <Star className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">4.8</p>
              <p className="text-xs text-foreground/60 mt-2">Out of 5.0</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Avg. Performance</h3>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">82%</p>
              <p className="text-xs text-foreground/60 mt-2">Class average</p>
            </div>
          </div>

          {/* Class Schedule */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Upcoming Classes
            </h2>

            <div className="space-y-4">
              {classSchedule.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-white/20 hover:bg-white/5 transition-smooth"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{cls.course}</h3>
                    <p className="text-sm text-foreground/60">
                      {cls.date} at {cls.time} • {cls.students} students
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button className="gradient-button text-sm">Start Class</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-bold mb-6">Class Performance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
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
                <Bar dataKey="avgScore" fill="#06B6D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Student Roster */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Student Roster
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 font-semibold">Student Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Level</th>
                    <th className="text-left py-3 px-4 font-semibold">Attendance</th>
                    <th className="text-left py-3 px-4 font-semibold">Performance</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentRoster.map((student) => (
                    <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-foreground/60">{student.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                          {student.level}
                        </span>
                      </td>
                      <td className="py-4 px-4">{student.attendance} sessions</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                              style={{ width: `${student.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold">{student.performance}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="outline" size="sm">
                          Give Feedback
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
