// import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Users, BookOpen, Video, Award } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Advanced analytics dashboard
 * - Real-time performance metrics
 * - Data visualization
 */

const enrollmentData = [
  { month: 'يناير', students: 45, teachers: 5 },
  { month: 'فبراير', students: 62, teachers: 8 },
  { month: 'مارس', students: 58, teachers: 7 },
  { month: 'أبريل', students: 89, teachers: 12 },
  { month: 'مايو', students: 112, teachers: 15 },
  { month: 'يونيو', students: 145, teachers: 18 },
];

const coursePerformance = [
  { name: 'IELTS Mastery', students: 245, completion: 78, rating: 4.9 },
  { name: 'Business English', students: 189, completion: 82, rating: 4.8 },
  { name: 'SAT Preparation', students: 156, completion: 71, rating: 4.7 },
  { name: 'Arabic Basics', students: 98, completion: 85, rating: 4.6 },
];

const videoViewsData = [
  { name: 'IELTS Speaking', views: 1250 },
  { name: 'Business Email', views: 890 },
  { name: 'Grammar Tips', views: 650 },
  { name: 'SAT Math', views: 420 },
  { name: 'Listening Practice', views: 380 },
];

const studentProgressData = [
  { level: 'Beginner', count: 45 },
  { level: 'Intermediate', count: 78 },
  { level: 'Advanced', count: 22 },
];

const colors = ['#0EA5E9', '#06B6D4', '#8B5CF6'];

const engagementData = [
  { day: 'السبت', active: 120, inactive: 30 },
  { day: 'الأحد', active: 145, inactive: 25 },
  { day: 'الاثنين', active: 160, inactive: 20 },
  { day: 'الثلاثاء', active: 155, inactive: 25 },
  { day: 'الأربعاء', active: 170, inactive: 15 },
  { day: 'الخميس', active: 165, inactive: 20 },
  { day: 'الجمعة', active: 140, inactive: 35 },
];

export default function AnalyticsDashboard() {
  // const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('month');

  const metrics = [
    { label: 'إجمالي الطلاب', value: '645', change: '+12%', icon: Users, color: 'text-blue-500' },
    { label: 'إجمالي المدرسين', value: '18', change: '+3', icon: BookOpen, color: 'text-purple-500' },
    { label: 'إجمالي الفيديوهات', value: '156', change: '+24', icon: Video, color: 'text-cyan-500' },
    { label: 'متوسط التقييم', value: '4.75/5', change: '+0.1', icon: Award, color: 'text-yellow-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">لوحة التحليلات</h1>
              <p className="text-foreground/70">تحليل شامل لأداء المنصة</p>
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
            >
              <option value="week">هذا الأسبوع</option>
              <option value="month">هذا الشهر</option>
              <option value="year">هذه السنة</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => {
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

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enrollment Trend */}
            <div className="glass-card p-8 border border-white/10">
              <h2 className="text-xl font-bold mb-6">اتجاه التسجيل</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#0EA5E9"
                    fillOpacity={1}
                    fill="url(#colorStudents)"
                    name="الطلاب"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Student Level Distribution */}
            <div className="glass-card p-8 border border-white/10">
              <h2 className="text-xl font-bold mb-6">توزيع مستويات الطلاب</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentProgressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {studentProgressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
                {studentProgressData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[idx] }}
                      ></div>
                      <span>{item.level}</span>
                    </div>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Performance */}
            <div className="glass-card p-8 border border-white/10">
              <h2 className="text-xl font-bold mb-6">أداء الدورات</h2>
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
                  <Legend />
                  <Bar dataKey="completion" fill="#0EA5E9" name="نسبة الإكمال %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Video Views */}
            <div className="glass-card p-8 border border-white/10">
              <h2 className="text-xl font-bold mb-6">أكثر الفيديوهات مشاهدة</h2>
              <div className="space-y-4">
                {videoViewsData.map((video, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{idx + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{video.name}</p>
                        <p className="text-xs text-foreground/60">{video.views.toLocaleString()} مشاهدة</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold gradient-text">{video.views}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Engagement */}
          <div className="glass-card p-8 border border-white/10">
            <h2 className="text-xl font-bold mb-6">نشاط المستخدمين اليومي</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="active" fill="#0EA5E9" name="نشط" />
                <Bar dataKey="inactive" fill="rgba(255,255,255,0.2)" name="غير نشط" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Course Details Table */}
          <div className="glass-card p-8 border border-white/10">
            <h2 className="text-xl font-bold mb-6">تفاصيل الدورات</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-semibold">اسم الدورة</th>
                    <th className="text-left py-3 px-4 font-semibold">عدد الطلاب</th>
                    <th className="text-left py-3 px-4 font-semibold">نسبة الإكمال</th>
                    <th className="text-left py-3 px-4 font-semibold">التقييم</th>
                  </tr>
                </thead>
                <tbody>
                  {coursePerformance.map((course, idx) => (
                    <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                      <td className="py-3 px-4 font-semibold">{course.name}</td>
                      <td className="py-3 px-4">{course.students}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                              style={{ width: `${course.completion}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold">{course.completion}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span className="font-bold">{course.rating}</span>
                          <span className="text-yellow-400">★</span>
                        </div>
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
