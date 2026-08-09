// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, TrendingUp, Award } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Admin dashboard with comprehensive analytics
 * - Financial tracking and revenue metrics
 * - User and course performance analytics
 */

const revenueData = [
  { month: 'Jan', revenue: 12000, users: 45 },
  { month: 'Feb', revenue: 15000, users: 58 },
  { month: 'Mar', revenue: 18000, users: 72 },
  { month: 'Apr', revenue: 22000, users: 95 },
  { month: 'May', revenue: 25000, users: 120 },
  { month: 'Jun', revenue: 28000, users: 145 },
];

const coursePerformance = [
  { name: 'IELTS Mastery', students: 245, revenue: 73350 },
  { name: 'SAT Excellence', students: 189, revenue: 65961 },
  { name: 'Business English', students: 156, revenue: 43524 },
  { name: 'Arabic Fluency', students: 134, revenue: 34706 },
];

const userDistribution = [
  { name: 'Students', value: 724, color: '#0EA5E9' },
  { name: 'Instructors', value: 24, color: '#8B5CF6' },
  { name: 'Admins', value: 5, color: '#06B6D4' },
];

const financialMetrics = [
  { label: 'Total Revenue', value: '$186,541', change: '+12.5%' },
  { label: 'Active Subscriptions', value: '724', change: '+8.3%' },
  { label: 'Avg. Course Value', value: '$299', change: '+2.1%' },
  { label: 'Refund Rate', value: '2.3%', change: '-0.5%' },
];

export default function AdminDashboard() {
  // const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
            <p className="text-foreground/70">Platform analytics, financials, and user management</p>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          {/* Financial Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {financialMetrics.map((metric, idx) => (
              <div key={idx} className="glass-card p-6">
                <h3 className="text-sm font-semibold text-foreground/60 mb-2">{metric.label}</h3>
                <p className="text-3xl font-bold gradient-text mb-2">{metric.value}</p>
                <p className="text-xs text-green-500 font-semibold">{metric.change} from last month</p>
              </div>
            ))}
          </div>

          {/* Revenue & User Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold mb-6">Revenue & User Growth</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
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
                    dataKey="revenue"
                    stroke="#0EA5E9"
                    strokeWidth={2}
                    dot={{ fill: '#0EA5E9', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold mb-6">User Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Performance */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-bold mb-6">Course Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="students" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Course Details Table */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6">Course Revenue Breakdown</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 font-semibold">Course</th>
                    <th className="text-left py-3 px-4 font-semibold">Enrolled Students</th>
                    <th className="text-left py-3 px-4 font-semibold">Total Revenue</th>
                    <th className="text-left py-3 px-4 font-semibold">Avg. Rating</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {coursePerformance.map((course, idx) => (
                    <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                      <td className="py-4 px-4 font-medium">{course.name}</td>
                      <td className="py-4 px-4">{course.students}</td>
                      <td className="py-4 px-4">
                        <span className="font-semibold gradient-text">${course.revenue.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-semibold">4.8</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold mb-6">System Health</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">API Response Time</span>
                    <span className="text-sm text-green-500">45ms</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Database Performance</span>
                    <span className="text-sm text-green-500">98%</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Server Uptime</span>
                    <span className="text-sm text-green-500">99.9%</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="gradient-button w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  View Transactions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Generate Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Review Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
