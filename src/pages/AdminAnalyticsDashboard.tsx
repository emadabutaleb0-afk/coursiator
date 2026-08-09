import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  Users, DollarSign, BookOpen, Award, Download,
  LogOut, Settings, Bell,
} from 'lucide-react';

/**
 * Admin Analytics Dashboard
 * Comprehensive metrics, charts, and exportable reports
 */

interface DashboardMetric {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
  revenue?: number;
  students?: number;
  instructors?: number;
}

export default function AdminAnalyticsDashboard() {
  const { user, logout, hasRole } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'revenue' | 'courses'>('overview');
  const [dateRange, setDateRange] = useState('30days');

  // Redirect if not admin
  if (!hasRole('admin')) {
    navigate('/login');
    return null;
  }

  // Mock data for charts
  const enrollmentTrend: ChartData[] = [
    { name: 'Week 1', value: 120, students: 45, instructors: 8 },
    { name: 'Week 2', value: 180, students: 62, instructors: 12 },
    { name: 'Week 3', value: 240, students: 85, instructors: 15 },
    { name: 'Week 4', value: 310, students: 110, instructors: 18 },
  ];

  const revenueTrend: ChartData[] = [
    { name: 'Jan', value: 4200, revenue: 4200 },
    { name: 'Feb', value: 5800, revenue: 5800 },
    { name: 'Mar', value: 7200, revenue: 7200 },
    { name: 'Apr', value: 9500, revenue: 9500 },
  ];

  const coursePerformance: ChartData[] = [
    { name: 'IELTS', value: 45 },
    { name: 'SAT', value: 28 },
    { name: 'Business English', value: 18 },
    { name: 'Arabic', value: 9 },
  ];

  const userDistribution = [
    { name: 'Students', value: 1245, color: '#06B6D4' },
    { name: 'Instructors', value: 85, color: '#8B5CF6' },
    { name: 'Admins', value: 5, color: '#EC4899' },
  ];

  const metrics: DashboardMetric[] = [
    {
      label: 'Total Users',
      value: '1,335',
      change: 12.5,
      icon: <Users className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      label: 'Total Revenue',
      value: '$26,700',
      change: 8.2,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
    },
    {
      label: 'Active Courses',
      value: '24',
      change: 3.1,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600',
    },
    {
      label: 'Avg Completion',
      value: '78%',
      change: 5.4,
      icon: <Award className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600',
    },
  ];

  const topInstructors = [
    { id: 1, name: 'Dr. Michael Chen', students: 156, rating: 4.9, revenue: 8400 },
    { id: 2, name: 'Sarah Williams', students: 142, rating: 4.8, revenue: 7600 },
    { id: 3, name: 'James Patterson', students: 128, rating: 4.7, revenue: 6800 },
    { id: 4, name: 'Emma Rodriguez', students: 115, rating: 4.6, revenue: 6100 },
  ];

  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented with a library like jsPDF or pdfkit');
  };

  const handleExportCSV = () => {
    alert('CSV export functionality would be implemented');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Coursiator" className="w-32 h-32 object-contain" />
            <div>
              <p className="text-sm text-foreground/70">Analytics & Reporting</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
              <Bell className="w-5 h-5 text-accent" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
              <Settings className="w-5 h-5 text-accent" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/20">
              <div className="text-right">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-foreground/70 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-smooth text-red-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Analytics Dashboard</h2>
            <p className="text-foreground/70">Track platform performance and user metrics</p>
          </div>

          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-accent/50"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-card border border-white/10 rounded-2xl p-6 hover:border-accent/30 transition-smooth"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} text-white`}>
                  {metric.icon}
                </div>
                <span className={`text-sm font-semibold ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <p className="text-foreground/70 text-sm mb-1">{metric.label}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'users', label: 'Users' },
            { id: 'revenue', label: 'Revenue' },
            { id: 'courses', label: 'Courses' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'users' | 'revenue' | 'courses')}
              className={`px-6 py-3 font-semibold transition-smooth whitespace-nowrap ${activeTab === tab.id
                ? 'text-accent border-b-2 border-accent'
                : 'text-foreground/60 hover:text-foreground'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Enrollment Trend */}
            <div className="glass-card border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Enrollment Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis stroke="rgba(0,0,0,0.5)" />
                  <YAxis stroke="rgba(0,0,0,0.5)" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={2} name="Total Enrollments" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* User Distribution */}
            <div className="glass-card border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">User Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={userDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div className="glass-card border border-white/10 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(0,0,0,0.5)" />
                <YAxis stroke="rgba(0,0,0,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="revenue" fill="#06B6D4" name="Monthly Revenue" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="glass-card border border-white/10 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">Course Performance</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(0,0,0,0.5)" dataKey="name" />
                <YAxis stroke="rgba(0,0,0,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="value" fill="#8B5CF6" name="Enrollments" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top Instructors */}
        <div className="glass-card border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Top Instructors</h3>
            <button className="text-accent hover:underline text-sm font-semibold">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Instructor</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Students</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topInstructors.map((instructor) => (
                  <tr key={instructor.id} className="border-b border-white/5 hover:bg-white/5 transition-smooth">
                    <td className="py-3 px-4">{instructor.name}</td>
                    <td className="py-3 px-4">{instructor.students}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1">
                        ⭐ {instructor.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">${instructor.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Section */}
        <div className="mt-8 glass-card border border-white/10 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold mb-4">Export Reports</h3>
          <p className="text-foreground/70 mb-6">Download detailed analytics reports in your preferred format</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={handleExportPDF} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export as PDF
            </Button>
            <Button onClick={handleExportCSV} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export as CSV
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
