// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { BookOpen, Play, Clock, CheckCircle, AlertCircle, Award } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Student learning hub with course browsing
 * - Enrollment management
 * - Video library access
 * - Progress tracking
 */

interface EnrolledCourse {
  id: string;
  name: string;
  instructor: string;
  progress: number;
  videosCompleted: number;
  totalVideos: number;
  assessmentsPassed: number;
  totalAssessments: number;
  nextLesson: string;
  thumbnail: string;
  level: string;
}

interface Video {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  assessmentPassed: boolean;
  thumbnail: string;
}

// Link to specific videos for demo purposes - in a real app this comes from the backend
const courseVideos: Record<string, Video[]> = {
  '1': [
    { id: '1', title: 'Speaking Part 1 - Introduction', duration: '45:32', completed: true, assessmentPassed: true, thumbnail: '/images/hero-live-classes.jpg' },
    { id: '2', title: 'Speaking Part 1 - Common Topics', duration: '38:15', completed: true, assessmentPassed: true, thumbnail: '/images/hero-ai-tutor.jpg' },
    { id: '3', title: 'Speaking Part 2 - Long Turn', duration: '52:20', completed: false, assessmentPassed: false, thumbnail: '/images/hero-placement-test.jpg' },
    { id: '4', title: 'Speaking Part 3 - Discussion', duration: '41:10', completed: false, assessmentPassed: false, thumbnail: '/images/hero-live-classes.jpg' },
  ],
  '2': [
    { id: '1', title: 'Business Greetings & Introductions', duration: '28:45', completed: true, assessmentPassed: true, thumbnail: '/images/hero-ai-tutor.jpg' },
    { id: '2', title: 'Email Writing Essentials', duration: '35:20', completed: false, assessmentPassed: false, thumbnail: '/images/hero-placement-test.jpg' },
    { id: '3', title: 'Presentations & Meetings', duration: '48:30', completed: false, assessmentPassed: false, thumbnail: '/images/hero-live-classes.jpg' },
  ],
};

import CourseQA from '@/components/CourseQA';

export default function StudentLearningHub() {
  // const { t } = useLanguage();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'qa'>('overview');

  useEffect(() => {
    // Load from LocalStorage
    const stored = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');

    // Map stored simple items to rich EnrolledCourse objects
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedStored: EnrolledCourse[] = stored.map((item: any) => ({
      id: item.id || Date.now().toString(),
      name: item.title || item.name || 'New Course',
      instructor: item.instructor || 'Coursiator Instructor',
      progress: 0,
      videosCompleted: 0,
      totalVideos: 12,
      assessmentsPassed: 0,
      totalAssessments: 5,
      nextLesson: 'Introduction',
      thumbnail: item.image || item.thumbnail || '/images/hero-placement-test.jpg',
      level: item.level || 'All Levels',
    }));

    setCourses(mappedStored);
  }, []);

  const [, setLocation] = useLocation();

  const handleGetCertificate = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation(); // Prevent card click
    setLocation(`/certificate/${courseId}`);
  };

  const selectedCourseData = selectedCourse ? courses.find((c) => c.id === selectedCourse) : null;
  const courseVideoList = selectedCourse ? courseVideos[selectedCourse] || [] : [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">My Learning Hub</h1>
              <p className="text-foreground/70">Continue your language learning journey</p>
            </div>
            <Button className="gradient-button">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          {!showCourseDetail ? (
            <>
              {/* Enrolled Courses Overview */}
              <h2 className="text-2xl font-bold mb-6">Your Enrolled Courses</h2>

              {courses.length === 0 ? (
                <div className="text-center py-12 glass-card mb-12">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Courses Yet</h3>
                  <p className="text-foreground/60 mb-6">Start your learning journey by enrolling in a course.</p>
                  <Button className="gradient-button" onClick={() => setLocation('/courses')}>Browse Courses</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="glass-card overflow-hidden hover:shadow-xl transition-smooth cursor-pointer group"
                      onClick={() => {
                        setSelectedCourse(course.id);
                        setShowCourseDetail(true);
                      }}
                    >
                      {/* Course Thumbnail */}
                      <div className="relative overflow-hidden h-40">
                        <img
                          src={course.thumbnail}
                          alt={course.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-lg px-3 py-1">
                          <span className="text-xs font-bold text-accent">{course.level}</span>
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1">{course.name}</h3>
                        <p className="text-sm text-foreground/60 mb-4">Instructor: {course.instructor}</p>

                        {/* Certificate Button */}
                        {course.progress === 100 && (
                          <Button
                            className="w-full mb-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white border-0"
                            size="sm"
                            onClick={(e) => handleGetCertificate(e, course.id)}
                          >
                            <Award className="w-4 h-4 mr-2" />
                            Get Certificate
                          </Button>
                        )}

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold">Overall Progress</span>
                            <span className="text-xs font-bold gradient-text">{course.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4 text-accent" />
                            <span>
                              {course.videosCompleted}/{course.totalVideos} Videos
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>
                              {course.assessmentsPassed}/{course.totalAssessments} Tests
                            </span>
                          </div>
                        </div>

                        {/* Next Lesson */}
                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-4">
                          <p className="text-xs text-foreground/60 mb-1">Next Lesson</p>
                          <p className="text-sm font-semibold">{course.nextLesson}</p>
                        </div>

                        {/* Action Button */}
                        <Button className="gradient-button w-full">Continue Learning</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Learning Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6 text-center">
                  <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold gradient-text mb-1">2</p>
                  <p className="text-sm text-foreground/70">Active Courses</p>
                </div>

                <div className="glass-card p-6 text-center">
                  <Play className="w-8 h-8 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold gradient-text mb-1">20</p>
                  <p className="text-sm text-foreground/70">Videos Watched</p>
                </div>

                <div className="glass-card p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold gradient-text mb-1">17</p>
                  <p className="text-sm text-foreground/70">Assessments Passed</p>
                </div>

                <div className="glass-card p-6 text-center">
                  <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold gradient-text mb-1">42h</p>
                  <p className="text-sm text-foreground/70">Learning Time</p>
                </div>
              </div>
            </>
          ) : selectedCourseData ? (
            <>
              {/* Course Detail View */}
              <div className="mb-6">
                <button
                  onClick={() => setShowCourseDetail(false)}
                  className="text-accent hover:text-accent/80 font-semibold mb-4"
                >
                  ← Back to Courses
                </button>

                <div className="glass-card p-8 mb-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-3xl font-bold gradient-text mb-2">{selectedCourseData.name}</h1>
                      <p className="text-foreground/70">Instructor: {selectedCourseData.instructor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold gradient-text">{selectedCourseData.progress}%</p>
                      <p className="text-sm text-foreground/60">Complete</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${selectedCourseData.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Content Tabs */}
                <div className="flex gap-6 border-b border-white/10 mb-6">
                  {(['overview', 'qa'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 border-b-2 transition-all font-semibold ${activeTab === tab ? 'border-accent text-accent' : 'border-transparent text-foreground/60 hover:text-white'
                        }`}
                    >
                      {tab === 'overview' ? 'Course Content' : 'Q&A & Support'}
                    </button>
                  ))}
                </div>

                {activeTab === 'overview' ? (
                  <div className="space-y-4">
                    {courseVideoList.map((video, idx) => (
                      <div
                        key={video.id}
                        className="glass-card p-6 hover:shadow-lg transition-smooth cursor-pointer group"
                      >
                        <div className="flex gap-6">
                          {/* Video Thumbnail and existing content... */}
                          <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-smooth flex items-center justify-center">
                              {video.completed ? (
                                <CheckCircle className="w-8 h-8 text-green-400" />
                              ) : (
                                <Play className="w-8 h-8 text-white" />
                              )}
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          </div>

                          {/* Video Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-bold">{video.title}</h3>
                              {video.completed && (
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              )}
                            </div>

                            <p className="text-sm text-foreground/70 mb-4">Lesson {idx + 1}</p>

                            {/* Assessment Status */}
                            {video.completed && (
                              <div className="flex gap-2 mb-4">
                                {video.assessmentPassed ? (
                                  <div className="flex items-center gap-1 text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">
                                    <CheckCircle className="w-3 h-3" />
                                    Assessment Passed
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded-full">
                                    <AlertCircle className="w-3 h-3" />
                                    Assessment Pending
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              {video.completed ? (
                                <>
                                  <Button variant="outline" size="sm">
                                    Review Video
                                  </Button>
                                  {!video.assessmentPassed && (
                                    <Button className="gradient-button text-sm">
                                      Retake Assessment
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <Button className="gradient-button text-sm">
                                  <Play className="w-3 h-3 mr-1" />
                                  Watch Video
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-3">
                      <CourseQA courseId={selectedCourseData.id} />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <Footer />
    </div>
  );
}
