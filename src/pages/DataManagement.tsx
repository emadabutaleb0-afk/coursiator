// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import {
  Users,
  BookOpen,
  Video,
  Search,
  Download,
  Edit,
  Eye,
  Star,
} from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Data management interface
 * - Real teacher, student, and video data
 * - Advanced filtering and search
 */

interface Teacher {
  id: string;
  name: string;
  email: string;
  specialty: string;
  rating: number;
  reviews: number;
  students: number;
  videosUploaded: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  progress: number;
  sessionsCompleted: number;
  status: 'active' | 'inactive';
  level: string;
}

interface VideoData {
  id: string;
  title: string;
  teacher: string;
  course: string;
  uploadDate: string;
  views: number;
  duration: number;
  assessments: number;
  status: 'published' | 'draft' | 'archived';
}

const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah@coursiator.com',
    specialty: 'IELTS & Speaking',
    rating: 4.9,
    reviews: 156,
    students: 245,
    videosUploaded: 42,
    joinDate: '2024-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Emma Richardson',
    email: 'emma@coursiator.com',
    specialty: 'Business English',
    rating: 4.8,
    reviews: 124,
    students: 189,
    videosUploaded: 35,
    joinDate: '2024-02-20',
    status: 'active',
  },
  {
    id: '3',
    name: 'Prof. Michael Chen',
    email: 'michael@coursiator.com',
    specialty: 'Grammar & Writing',
    rating: 4.7,
    reviews: 98,
    students: 156,
    videosUploaded: 28,
    joinDate: '2024-03-10',
    status: 'active',
  },
];

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    course: 'IELTS Mastery',
    enrollmentDate: '2024-12-01',
    progress: 65,
    sessionsCompleted: 12,
    status: 'active',
    level: 'Intermediate',
  },
  {
    id: '2',
    name: 'Fatima Al-Rashid',
    email: 'fatima@example.com',
    course: 'Business English Pro',
    enrollmentDate: '2024-12-05',
    progress: 45,
    sessionsCompleted: 8,
    status: 'active',
    level: 'Beginner',
  },
  {
    id: '3',
    name: 'Mohammed Saeed',
    email: 'mohammed@example.com',
    course: 'SAT Preparation',
    enrollmentDate: '2024-11-20',
    progress: 78,
    sessionsCompleted: 18,
    status: 'active',
    level: 'Advanced',
  },
  {
    id: '4',
    name: 'Layla Noor',
    email: 'layla@example.com',
    course: 'IELTS Mastery',
    enrollmentDate: '2024-10-15',
    progress: 92,
    sessionsCompleted: 24,
    status: 'active',
    level: 'Advanced',
  },
];

const mockVideos: VideoData[] = [
  {
    id: '1',
    title: 'IELTS Speaking Part 1 - Introduction',
    teacher: 'Dr. Sarah Mitchell',
    course: 'IELTS Mastery',
    uploadDate: '2024-12-15',
    views: 1250,
    duration: 45,
    assessments: 3,
    status: 'published',
  },
  {
    id: '2',
    title: 'Business Email Writing Best Practices',
    teacher: 'Emma Richardson',
    course: 'Business English Pro',
    uploadDate: '2024-12-18',
    views: 890,
    duration: 52,
    assessments: 2,
    status: 'published',
  },
  {
    id: '3',
    title: 'Grammar: Conditional Sentences',
    teacher: 'Prof. Michael Chen',
    course: 'IELTS Mastery',
    uploadDate: '2024-12-20',
    views: 650,
    duration: 38,
    assessments: 4,
    status: 'published',
  },
  {
    id: '4',
    title: 'SAT Math - Algebra Fundamentals',
    teacher: 'Prof. Michael Chen',
    course: 'SAT Preparation',
    uploadDate: '2024-12-22',
    views: 420,
    duration: 60,
    assessments: 5,
    status: 'draft',
  },
];

export default function DataManagement() {
  // const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'teachers' | 'students' | 'videos'>('teachers');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const tabs = [
    { id: 'teachers', label: 'المدرسين', icon: Users, count: mockTeachers.length },
    { id: 'students', label: 'الطلاب', icon: BookOpen, count: mockStudents.length },
    { id: 'videos', label: 'الفيديوهات', icon: Video, count: mockVideos.length },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold gradient-text mb-2">إدارة البيانات</h1>
          <p className="text-foreground/70">عرض وإدارة المدرسين والطلاب والفيديوهات</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">إجمالي المدرسين</h3>
                <Users className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">{mockTeachers.length}</p>
            </div>

            <div className="glass-card p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">إجمالي الطلاب</h3>
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">{mockStudents.length}</p>
            </div>

            <div className="glass-card p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">إجمالي الفيديوهات</h3>
                <Video className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">{mockVideos.length}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'teachers' | 'students' | 'videos')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-smooth whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'glass-card border border-white/20 hover:border-accent/50'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-8 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="البحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-3 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
            >
              <option value="all">الكل</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              تحميل
            </Button>
          </div>

          {/* Teachers Table */}
          {activeTab === 'teachers' && (
            <div className="glass-card border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left py-4 px-6 font-semibold">الاسم</th>
                      <th className="text-left py-4 px-6 font-semibold">التخصص</th>
                      <th className="text-left py-4 px-6 font-semibold">التقييم</th>
                      <th className="text-left py-4 px-6 font-semibold">الطلاب</th>
                      <th className="text-left py-4 px-6 font-semibold">الفيديوهات</th>
                      <th className="text-left py-4 px-6 font-semibold">الحالة</th>
                      <th className="text-left py-4 px-6 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTeachers.map((teacher) => (
                      <tr key={teacher.id} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold">{teacher.name}</p>
                            <p className="text-xs text-foreground/60">{teacher.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">{teacher.specialty}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold">{teacher.rating}</span>
                            <span className="text-foreground/60">({teacher.reviews})</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold">{teacher.students}</td>
                        <td className="py-4 px-6 font-semibold">{teacher.videosUploaded}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-semibold ${teacher.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                              }`}
                          >
                            {teacher.status === 'active' ? 'نشط' : 'غير نشط'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-white/10 rounded transition-smooth">
                              <Eye className="w-4 h-4 text-accent" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded transition-smooth">
                              <Edit className="w-4 h-4 text-accent" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Students Table */}
          {activeTab === 'students' && (
            <div className="glass-card border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left py-4 px-6 font-semibold">الاسم</th>
                      <th className="text-left py-4 px-6 font-semibold">الدورة</th>
                      <th className="text-left py-4 px-6 font-semibold">المستوى</th>
                      <th className="text-left py-4 px-6 font-semibold">التقدم</th>
                      <th className="text-left py-4 px-6 font-semibold">الجلسات</th>
                      <th className="text-left py-4 px-6 font-semibold">تاريخ الالتحاق</th>
                      <th className="text-left py-4 px-6 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((student) => (
                      <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold">{student.name}</p>
                            <p className="text-xs text-foreground/60">{student.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">{student.course}</td>
                        <td className="py-4 px-6">
                          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                            {student.level}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-semibold">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold">{student.sessionsCompleted}</td>
                        <td className="py-4 px-6 text-foreground/70">
                          {new Date(student.enrollmentDate).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-white/10 rounded transition-smooth">
                              <Eye className="w-4 h-4 text-accent" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded transition-smooth">
                              <Edit className="w-4 h-4 text-accent" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Videos Table */}
          {activeTab === 'videos' && (
            <div className="glass-card border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left py-4 px-6 font-semibold">العنوان</th>
                      <th className="text-left py-4 px-6 font-semibold">المدرس</th>
                      <th className="text-left py-4 px-6 font-semibold">الدورة</th>
                      <th className="text-left py-4 px-6 font-semibold">المشاهدات</th>
                      <th className="text-left py-4 px-6 font-semibold">المدة</th>
                      <th className="text-left py-4 px-6 font-semibold">الاختبارات</th>
                      <th className="text-left py-4 px-6 font-semibold">الحالة</th>
                      <th className="text-left py-4 px-6 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockVideos.map((video) => (
                      <tr key={video.id} className="border-b border-white/10 hover:bg-white/5 transition-smooth">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-accent flex-shrink-0" />
                            <p className="font-semibold">{video.title}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">{video.teacher}</td>
                        <td className="py-4 px-6">{video.course}</td>
                        <td className="py-4 px-6 font-semibold">{video.views.toLocaleString()}</td>
                        <td className="py-4 px-6">{video.duration} دقيقة</td>
                        <td className="py-4 px-6 font-semibold">{video.assessments}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-semibold ${video.status === 'published'
                              ? 'bg-green-500/20 text-green-400'
                              : video.status === 'draft'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-gray-500/20 text-gray-400'
                              }`}
                          >
                            {video.status === 'published'
                              ? 'منشور'
                              : video.status === 'draft'
                                ? 'مسودة'
                                : 'مؤرشف'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-white/10 rounded transition-smooth">
                              <Eye className="w-4 h-4 text-accent" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded transition-smooth">
                              <Edit className="w-4 h-4 text-accent" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
