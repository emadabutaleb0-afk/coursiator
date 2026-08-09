import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  MockAnalyticsService,
  TeacherProgressData,
  RevenueData,
  StudentReport,
  Payout,
  CourseDistribution
} from '@/services/mockAnalyticsService';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Comprehensive reporting dashboard
 * - Student progress analytics
 * - Financial tracking and payouts
 */

// Hardcoded data removed in favor of MockAnalyticsService

export default function TeacherReports() {
  const { t } = useLanguage();
  const [reportType, setReportType] = useState<'student' | 'financial'>('student');
  const [studentProgressData, setStudentProgressData] = useState<TeacherProgressData[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [studentReports, setStudentReports] = useState<StudentReport[]>([]);
  const [payoutHistory, setPayoutHistory] = useState<Payout[]>([]);
  const [courseDistribution, setCourseDistribution] = useState<CourseDistribution[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [exportingId, setExportingId] = useState<number | null>(null);

  useEffect(() => {
    const loadReportData = async () => {
      try {
        const [progress, revenue, reports, payouts, distribution] = await Promise.all([
          MockAnalyticsService.getTeacherProgress(),
          MockAnalyticsService.getRevenueData(),
          MockAnalyticsService.getStudentReports(),
          MockAnalyticsService.getPayoutHistory(),
          MockAnalyticsService.getCourseDistribution()
        ]);

        setStudentProgressData(progress);
        setRevenueData(revenue);
        setStudentReports(reports);
        setPayoutHistory(payouts);
        setCourseDistribution(distribution);
      } catch (error) {
        console.error("Failed to load report data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReportData();
  }, []);

  const handleExportInvoice = async (id: number) => {
    setExportingId(id);
    // Simulate generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setExportingId(null);
    alert(`Invoice #${id} exported successfully!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Header Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">{t('teacher.reports.title')}</h1>
              <p className="text-foreground/70">{t('teacher.reports.subtitle')}</p>
            </div>
            <Button className="gradient-button">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Report Type Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setReportType('student')}
              className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${reportType === 'student'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                : 'bg-white/20 text-foreground hover:bg-white/30'
                }`}
            >
              {t('teacher.reports.tab.student')}
            </button>
            <button
              onClick={() => setReportType('financial')}
              className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${reportType === 'financial'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                : 'bg-white/20 text-foreground hover:bg-white/30'
                }`}
            >
              {t('teacher.reports.tab.financial')}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          {reportType === 'student' ? (
            <>
              {/* Student Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">Total Students</h3>
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">26</p>
                  <p className="text-xs text-foreground/60 mt-2">Active enrollments</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">Avg. Completion</h3>
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">87%</p>
                  <p className="text-xs text-foreground/60 mt-2">Course completion rate</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">Avg. Score</h3>
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">82%</p>
                  <p className="text-xs text-foreground/60 mt-2">Assessment average</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">Completion Rate</h3>
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">95%</p>
                  <p className="text-xs text-foreground/60 mt-2">Video completion</p>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="glass-card p-8">
                  <h2 className="text-xl font-bold mb-6">Student Progress Trend</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={studentProgressData}>
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
                        dataKey="avgScore"
                        stroke="#0EA5E9"
                        strokeWidth={2}
                        dot={{ fill: '#0EA5E9', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass-card p-8">
                  <h2 className="text-xl font-bold mb-6">Course Distribution</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={courseDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {courseDistribution.map((entry, index) => (
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

              {/* Student Details Table */}
              <div className="glass-card p-8">
                <h2 className="text-xl font-bold mb-6">Student Details</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-4 font-semibold">{t('teacher.table.name')}</th>
                        <th className="text-left py-3 px-4 font-semibold">{t('teacher.table.course')}</th>
                        <th className="text-left py-3 px-4 font-semibold">{t('teacher.table.completion')}</th>
                        <th className="text-left py-3 px-4 font-semibold">{t('teacher.table.score')}</th>
                        <th className="text-left py-3 px-4 font-semibold">{t('teacher.table.videos')}</th>
                        <th className="text-left py-3 px-4 font-semibold">{t('teacher.table.status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentReports.map((student) => (
                        <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-xs text-foreground/60">{student.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">{student.course}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                                  style={{ width: `${student.completionRate}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold">{student.completionRate}%</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold gradient-text">{student.avgScore}%</span>
                          </td>
                          <td className="py-4 px-4">{student.videosWatched}/{student.videosWatched}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-semibold ${student.status === 'Active'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-blue-500/20 text-blue-500'
                                }`}
                            >
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Financial Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">{t('teacher.stat.earnings')}</h3>
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">$18,400</p>
                  <p className="text-xs text-foreground/60 mt-2">All time</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">{t('teacher.stat.month')}</h3>
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">$7,200</p>
                  <p className="text-xs text-foreground/60 mt-2">Current month</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">{t('teacher.stat.payout')}</h3>
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">$2,100</p>
                  <p className="text-xs text-foreground/60 mt-2">Next payout</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">Avg. Revenue/Student</h3>
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">$708</p>
                  <p className="text-xs text-foreground/60 mt-2">Per student</p>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="glass-card p-8 mb-8">
                <h2 className="text-xl font-bold mb-6">Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
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
                    <Bar dataKey="revenue" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Payout History */}
              <div className="glass-card p-8">
                <h2 className="text-xl font-bold mb-6">Payout History</h2>
                <div className="space-y-4">
                  {payoutHistory.map((payout) => (
                    <div
                      key={payout.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-white/20 hover:bg-white/5 transition-smooth"
                    >
                      <div>
                        <p className="font-semibold">{payout.date}</p>
                        <p className="text-sm text-foreground/60">{payout.method}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold gradient-text">${payout.amount}</p>
                        <p
                          className={`text-xs font-semibold ${payout.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                            }`}
                        >
                          {payout.status}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleExportInvoice(payout.id)}
                        disabled={exportingId === payout.id}
                      >
                        {exportingId === payout.id ? (
                          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Download className="w-4 h-4 text-foreground/50 hover:text-accent" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section >

      <Footer />
    </div >
  );
}
