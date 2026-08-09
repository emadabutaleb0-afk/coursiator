// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Users,
  BookOpen,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { useLocation } from 'wouter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Professional admin control panel
 * - Comprehensive dashboard with key metrics
 * - Multi-section navigation
 * - Real-time analytics
 */

const revenueData = [
  { month: 'Jan', revenue: 12000, students: 45 },
  { month: 'Feb', revenue: 19000, students: 62 },
  { month: 'Mar', revenue: 15000, students: 58 },
  { month: 'Apr', revenue: 25000, students: 89 },
  { month: 'May', revenue: 32000, students: 112 },
  { month: 'Jun', revenue: 28000, students: 98 },
];

const userDistribution = [
  { name: 'Students', value: 1250, color: '#0EA5E9' },
  { name: 'Teachers', value: 85, color: '#06B6D4' },
  { name: 'Admins', value: 12, color: '#8B5CF6' },
];

const systemMetrics = [
  { label: 'Active Users', value: '1,347', change: '+12%', icon: Users, color: 'text-blue-500' },
  { label: 'Total Revenue', value: '$131,000', change: '+8%', icon: DollarSign, color: 'text-green-500' },
  { label: 'Courses', value: '24', change: '+3', icon: BookOpen, color: 'text-purple-500' },
  { label: 'Avg. Rating', value: '4.8/5', change: '+0.2', icon: TrendingUp, color: 'text-yellow-500' },
];

export default function AdminControlPanel() {
  // const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses' | 'finances' | 'settings'>('overview');

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setLocation('/admin-auth');
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'finances', label: 'Finances', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-20'
          } glass-card border-r border-white/10 transition-all duration-300 flex flex-col fixed h-screen z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold gradient-text">Coursiator</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as 'overview' | 'users' | 'courses' | 'settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${activeTab === item.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'text-foreground/70 hover:bg-white/10'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-semibold">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Quick Links */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => handleNavigate('/data-management')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-accent hover:bg-accent/10 transition-smooth text-sm font-semibold"
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Data Mgmt</span>}
          </button>
          <button
            onClick={() => handleNavigate('/analytics-dashboard')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-accent hover:bg-accent/10 transition-smooth text-sm font-semibold"
          >
            <BarChart3 className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Analytics</span>}
          </button>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-smooth"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-semibold">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        {/* Header */}
        <div className="glass-card border-b border-white/10 p-6 flex justify-between items-center sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Admin Control Panel</h1>
            <p className="text-foreground/60 text-sm">Manage your Coursiator platform</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-foreground/60">admin@coursiator.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemMetrics.map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <div key={idx} className="glass-card p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 ${metric.color}`} />
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-semibold">
                          {metric.change}
                        </span>
                      </div>
                      <p className="text-foreground/60 text-sm mb-1">{metric.label}</p>
                      <p className="text-3xl font-bold gradient-text">{metric.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 glass-card p-8 border border-white/10">
                  <h2 className="text-xl font-bold mb-6">Revenue & Growth</h2>
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
                        strokeWidth={3}
                        dot={{ fill: '#0EA5E9', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* User Distribution */}
                <div className="glass-card p-8 border border-white/10">
                  <h2 className="text-xl font-bold mb-6">User Distribution</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
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
                  <div className="mt-6 space-y-2">
                    {userDistribution.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="glass-card p-8 border border-white/10">
                <h2 className="text-xl font-bold mb-6">System Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-semibold">All Services Online</p>
                        <p className="text-sm text-foreground/60">Platform running smoothly</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-semibold">
                      Operational
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border border-white/10">
                      <p className="text-xs text-foreground/60 mb-1">API Response Time</p>
                      <p className="text-2xl font-bold gradient-text">45ms</p>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10">
                      <p className="text-xs text-foreground/60 mb-1">Database Health</p>
                      <p className="text-2xl font-bold gradient-text">99.9%</p>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10">
                      <p className="text-xs text-foreground/60 mb-1">Server Uptime</p>
                      <p className="text-2xl font-bold gradient-text">99.95%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="glass-card p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Management</h2>
                <Button className="gradient-button">Add New User</Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Role</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Ahmed Hassan', email: 'ahmed@example.com', role: 'Student', status: 'Active' },
                      { name: 'Dr. Sarah Mitchell', email: 'sarah@example.com', role: 'Teacher', status: 'Active' },
                      { name: 'Emma Richardson', email: 'emma@example.com', role: 'Teacher', status: 'Active' },
                      { name: 'John Smith', email: 'john@example.com', role: 'Student', status: 'Inactive' },
                    ].map((user, idx) => (
                      <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4 text-foreground/70">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-semibold">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-semibold ${user.status === 'Active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                              }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="glass-card p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Course Management</h2>
                <Button className="gradient-button">Create New Course</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'IELTS Mastery', students: 245, revenue: '$24,500', status: 'Active' },
                  { name: 'SAT Preparation', students: 189, revenue: '$18,900', status: 'Active' },
                  { name: 'Business English', students: 156, revenue: '$15,600', status: 'Active' },
                ].map((course, idx) => (
                  <div key={idx} className="p-6 rounded-lg border border-white/10 hover:border-accent/50 transition-smooth">
                    <h3 className="font-bold mb-4">{course.name}</h3>
                    <div className="space-y-2 mb-4 text-sm">
                      <p className="text-foreground/70">Students: <span className="font-semibold text-accent">{course.students}</span></p>
                      <p className="text-foreground/70">Revenue: <span className="font-semibold text-green-400">{course.revenue}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'finances' && (
            <div className="space-y-8">
              <div className="glass-card p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 rounded-lg border border-white/10">
                    <p className="text-foreground/60 text-sm mb-2">Total Revenue</p>
                    <p className="text-3xl font-bold gradient-text">$131,000</p>
                    <p className="text-xs text-green-400 mt-2">↑ 12% from last month</p>
                  </div>
                  <div className="p-6 rounded-lg border border-white/10">
                    <p className="text-foreground/60 text-sm mb-2">Pending Payouts</p>
                    <p className="text-3xl font-bold gradient-text">$18,500</p>
                    <p className="text-xs text-foreground/60 mt-2">To be processed</p>
                  </div>
                  <div className="p-6 rounded-lg border border-white/10">
                    <p className="text-foreground/60 text-sm mb-2">Refunds (7-day)</p>
                    <p className="text-3xl font-bold gradient-text">$2,300</p>
                    <p className="text-xs text-foreground/60 mt-2">This month</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'Enrollment', amount: '+$500', date: '2025-01-20', status: 'Completed' },
                      { type: 'Refund', amount: '-$150', date: '2025-01-19', status: 'Completed' },
                      { type: 'Payout', amount: '-$5,000', date: '2025-01-18', status: 'Pending' },
                    ].map((tx, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                        <div>
                          <p className="font-semibold">{tx.type}</p>
                          <p className="text-xs text-foreground/60">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{tx.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${tx.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-card p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>

              <div className="space-y-6">
                <div className="p-6 rounded-lg border border-white/10">
                  <h3 className="font-bold mb-4">Platform Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Platform Name</label>
                      <input
                        type="text"
                        defaultValue="Coursiator"
                        className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Support Email</label>
                      <input
                        type="email"
                        defaultValue="support@coursiator.com"
                        className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg border border-white/10">
                  <h3 className="font-bold mb-4">Security Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Two-Factor Authentication</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>IP Whitelist</span>
                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <Button className="gradient-button">Save Settings</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
