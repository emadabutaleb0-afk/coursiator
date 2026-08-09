/**
 * نظام جمع البيانات المحسّن
 * يوفر واجهات موحدة لجمع ومعالجة البيانات من جميع أنحاء التطبيق
 */

export interface StudentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolledCourses: string[];
  completedVideos: string[];
  assessmentScores: Record<string, number>;
  joinDate: Date;
  lastActive: Date;
  profileImage?: string;
  bio?: string;
}

export interface TeacherData {
  id: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
  experience: number; // سنوات الخبرة
  qualifications: string[];
  rating: number;
  totalStudents: number;
  uploadedVideos: string[];
  schedule: TeacherSchedule[];
  bio: string;
  profileImage?: string;
  socialLinks?: SocialLinks;
  hourlyRate: number;
  availability: boolean;
}

export interface TeacherSchedule {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  courseId: string;
  duration: number; // بالدقائق
  uploadDate: Date;
  views: number;
  rating: number;
  url: string;
  thumbnail?: string;
  transcription?: string;
  assessmentQuestions?: AssessmentQuestion[];
  tags: string[];
  language: 'en' | 'ar';
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  points: number;
}

export interface StudentProgress {
  studentId: string;
  videoId: string;
  watchedDuration: number;
  totalDuration: number;
  completionPercentage: number;
  assessmentScore?: number;
  completedAt?: Date;
  notes?: string;
}

export interface Communication {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: string[];
  type: 'text' | 'file' | 'image';
}

export interface Review {
  id: string;
  authorId: string;
  targetId: string; // المدرس أو الدورة
  rating: number; // 1-5
  comment: string;
  date: Date;
  helpful: number;
  verified: boolean;
}

// نظام جمع البيانات
export class DataCollectionService {
  private static instance: DataCollectionService;
  private studentData: Map<string, StudentData> = new Map();
  private teacherData: Map<string, TeacherData> = new Map();
  private videoData: Map<string, VideoData> = new Map();
  private progressData: StudentProgress[] = [];
  private communications: Communication[] = [];
  private reviews: Review[] = [];

  private constructor() {
    this.initializeDefaultData();
  }

  public static getInstance(): DataCollectionService {
    if (!DataCollectionService.instance) {
      DataCollectionService.instance = new DataCollectionService();
    }
    return DataCollectionService.instance;
  }

  // طرق إدارة بيانات الطلاب
  public addStudent(student: StudentData): void {
    this.studentData.set(student.id, student);
    this.logAction('ADD_STUDENT', student.id);
  }

  public getStudent(id: string): StudentData | undefined {
    return this.studentData.get(id);
  }

  public getAllStudents(): StudentData[] {
    return Array.from(this.studentData.values());
  }

  public updateStudent(id: string, updates: Partial<StudentData>): void {
    const student = this.studentData.get(id);
    if (student) {
      this.studentData.set(id, { ...student, ...updates });
      this.logAction('UPDATE_STUDENT', id);
    }
  }

  public deleteStudent(id: string): void {
    this.studentData.delete(id);
    this.logAction('DELETE_STUDENT', id);
  }

  // طرق إدارة بيانات المدرسين
  public addTeacher(teacher: TeacherData): void {
    this.teacherData.set(teacher.id, teacher);
    this.logAction('ADD_TEACHER', teacher.id);
  }

  public getTeacher(id: string): TeacherData | undefined {
    return this.teacherData.get(id);
  }

  public getAllTeachers(): TeacherData[] {
    return Array.from(this.teacherData.values());
  }

  public getTeachersBySpecialization(spec: string): TeacherData[] {
    return this.getAllTeachers().filter(t =>
      t.specializations.includes(spec)
    );
  }

  public updateTeacher(id: string, updates: Partial<TeacherData>): void {
    const teacher = this.teacherData.get(id);
    if (teacher) {
      this.teacherData.set(id, { ...teacher, ...updates });
      this.logAction('UPDATE_TEACHER', id);
    }
  }

  public deleteTeacher(id: string): void {
    this.teacherData.delete(id);
    this.logAction('DELETE_TEACHER', id);
  }

  // طرق إدارة الفيديوهات
  public addVideo(video: VideoData): void {
    this.videoData.set(video.id, video);
    this.logAction('ADD_VIDEO', video.id);
  }

  public getVideo(id: string): VideoData | undefined {
    return this.videoData.get(id);
  }

  public getAllVideos(): VideoData[] {
    return Array.from(this.videoData.values());
  }

  public getVideosByTeacher(teacherId: string): VideoData[] {
    return this.getAllVideos().filter(v => v.teacherId === teacherId);
  }

  public updateVideo(id: string, updates: Partial<VideoData>): void {
    const video = this.videoData.get(id);
    if (video) {
      this.videoData.set(id, { ...video, ...updates });
      this.logAction('UPDATE_VIDEO', id);
    }
  }

  // طرق إدارة التقدم
  public recordProgress(progress: StudentProgress): void {
    this.progressData.push(progress);
    this.logAction('RECORD_PROGRESS', progress.studentId);
  }

  public getStudentProgress(studentId: string): StudentProgress[] {
    return this.progressData.filter(p => p.studentId === studentId);
  }

  public getVideoProgress(videoId: string): StudentProgress[] {
    return this.progressData.filter(p => p.videoId === videoId);
  }

  // طرق إدارة التواصل
  public sendMessage(communication: Communication): void {
    this.communications.push(communication);
    this.logAction('SEND_MESSAGE', communication.senderId);
  }

  public getMessages(userId: string): Communication[] {
    return this.communications.filter(c =>
      c.senderId === userId || c.receiverId === userId
    );
  }

  public getUnreadMessages(userId: string): Communication[] {
    return this.getMessages(userId).filter(m =>
      !m.isRead && m.receiverId === userId
    );
  }

  public markAsRead(messageId: string): void {
    const message = this.communications.find(m => m.id === messageId);
    if (message) {
      message.isRead = true;
      this.logAction('MARK_READ', messageId);
    }
  }

  // طرق إدارة التقييمات
  public addReview(review: Review): void {
    this.reviews.push(review);
    this.logAction('ADD_REVIEW', review.id);
  }

  public getReviews(targetId: string): Review[] {
    return this.reviews.filter(r => r.targetId === targetId);
  }

  public getAverageRating(targetId: string): number {
    const reviews = this.getReviews(targetId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }

  // إحصائيات عامة
  public getStatistics() {
    return {
      totalStudents: this.studentData.size,
      totalTeachers: this.teacherData.size,
      totalVideos: this.videoData.size,
      totalMessages: this.communications.length,
      totalReviews: this.reviews.length,
      averageTeacherRating: this.getAverageTeacherRating(),
      studentEngagement: this.calculateEngagement(),
    };
  }

  private getAverageTeacherRating(): number {
    const teachers = this.getAllTeachers();
    if (teachers.length === 0) return 0;
    const sum = teachers.reduce((acc, t) => acc + t.rating, 0);
    return sum / teachers.length;
  }

  private calculateEngagement(): number {
    const students = this.getAllStudents();
    if (students.length === 0) return 0;

    const activeStudents = students.filter(s => {
      const now = new Date();
      const daysSinceActive = (now.getTime() - s.lastActive.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceActive < 7;
    }).length;

    return (activeStudents / students.length) * 100;
  }

  // تسجيل الإجراءات
  private logAction(action: string, userId: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${action} - User: ${userId}`);
  }

  // تهيئة البيانات الافتراضية
  private initializeDefaultData(): void {
    // إضافة بيانات افتراضية للاختبار
    const defaultTeacher: TeacherData = {
      id: 'teacher_1',
      name: 'أحمد محمد',
      email: 'ahmed@coursiator.com',
      phone: '+966501234567',
      specializations: ['IELTS', 'Business English'],
      experience: 8,
      qualifications: ['CELTA', 'IELTS Examiner'],
      rating: 4.8,
      totalStudents: 150,
      uploadedVideos: [],
      schedule: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      ],
      bio: 'معلم اللغة الإنجليزية ذو خبرة طويلة',
      hourlyRate: 50,
      availability: true,
    };

    this.addTeacher(defaultTeacher);
  }

  // تصدير البيانات
  public exportData() {
    return {
      students: Array.from(this.studentData.values()),
      teachers: Array.from(this.teacherData.values()),
      videos: Array.from(this.videoData.values()),
      progress: this.progressData,
      communications: this.communications,
      reviews: this.reviews,
    };
  }

  // استيراد البيانات
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public importData(data: any): void {
    if (data.students) {
      data.students.forEach((s: StudentData) => this.addStudent(s));
    }
    if (data.teachers) {
      data.teachers.forEach((t: TeacherData) => this.addTeacher(t));
    }
    if (data.videos) {
      data.videos.forEach((v: VideoData) => this.addVideo(v));
    }
    this.logAction('IMPORT_DATA', 'system');
  }
}

// تصدير الخدمة الواحدة
export const dataService = DataCollectionService.getInstance();
