
export interface ProgressData {
    week: string;
    score: number;
    completion: number;
}

export interface SkillData {
    skill: string;
    value: number;
}

export interface Recommendation {
    id: number;
    title: string;
    description: string;
    action: string;
    priority: 'high' | 'medium' | 'low';
}

export interface Achievement {
    id: number;
    title: string;
    description: string;
    unlocked: boolean;
    date: string | null;
}

export interface TeacherProgressData {
    week: string;
    avgScore: number;
    completionRate: number;
}

export interface RevenueData {
    month: string;
    revenue: number;
    students: number;
}

export interface StudentReport {
    id: number;
    name: string;
    email: string;
    course: string;
    enrollmentDate: string;
    completionRate: number;
    avgScore: number;
    videosWatched: number;
    assessmentsPassed: number;
    status: 'Active' | 'Completed' | 'Inactive';
}

export interface Payout {
    id: number;
    date: string;
    amount: number;
    status: 'Completed' | 'Pending';
    method: string;
}

export interface CourseDistribution {
    name: string;
    value: number;
    color: string;
}

const PROGRESS_DATA: ProgressData[] = [
    { week: 'Week 1', score: 65, completion: 40 },
    { week: 'Week 2', score: 72, completion: 50 },
    { week: 'Week 3', score: 78, completion: 60 },
    { week: 'Week 4', score: 82, completion: 70 },
    { week: 'Week 5', score: 85, completion: 80 },
    { week: 'Week 6', score: 88, completion: 90 },
];

const SKILLS_DATA: SkillData[] = [
    { skill: 'Grammar', value: 85 },
    { skill: 'Vocabulary', value: 78 },
    { skill: 'Listening', value: 82 },
    { skill: 'Speaking', value: 75 },
    { skill: 'Reading', value: 88 },
    { skill: 'Writing', value: 80 },
];

const RECOMMENDATIONS: Recommendation[] = [
    {
        id: 1,
        title: 'Focus on Speaking Skills',
        description: 'Your speaking score is 75%. Practice more speaking exercises to improve fluency.',
        action: 'Start Speaking Practice',
        priority: 'high',
    },
    {
        id: 2,
        title: 'Vocabulary Expansion',
        description: 'Learn 50 new words this week to boost your vocabulary score from 78%.',
        action: 'Learn New Words',
        priority: 'medium',
    },
    {
        id: 3,
        title: 'Complete IELTS Course',
        description: 'You are 65% through IELTS Mastery. Complete 7 more lessons to finish.',
        action: 'Continue Course',
        priority: 'medium',
    },
];

const ACHIEVEMENTS: Achievement[] = [
    { id: 1, title: 'First Steps', description: 'Complete your first video', unlocked: true, date: '2025-01-01' },
    { id: 2, title: 'Assessment Master', description: 'Pass 5 assessments', unlocked: true, date: '2025-01-05' },
    { id: 3, title: 'Consistency', description: 'Study 7 days in a row', unlocked: true, date: '2025-01-10' },
    { id: 4, title: 'Course Completion', description: 'Complete a full course', unlocked: false, date: null },
    { id: 5, title: 'Perfect Score', description: 'Get 100% on an assessment', unlocked: false, date: null },
    { id: 6, title: 'Language Expert', description: 'Reach Advanced level', unlocked: false, date: null },
];

const TEACHER_PROGRESS_DATA: TeacherProgressData[] = [
    { week: 'Week 1', avgScore: 65, completionRate: 85 },
    { week: 'Week 2', avgScore: 72, completionRate: 88 },
    { week: 'Week 3', avgScore: 78, completionRate: 90 },
    { week: 'Week 4', avgScore: 82, completionRate: 92 },
    { week: 'Week 5', avgScore: 85, completionRate: 94 },
    { week: 'Week 6', avgScore: 88, completionRate: 95 },
];

const REVENUE_DATA: RevenueData[] = [
    { month: 'Jan', revenue: 2500, students: 8 },
    { month: 'Feb', revenue: 3200, students: 10 },
    { month: 'Mar', revenue: 4100, students: 13 },
    { month: 'Apr', revenue: 5200, students: 16 },
    { month: 'May', revenue: 6100, students: 19 },
    { month: 'Jun', revenue: 7200, students: 22 },
];

const STUDENT_REPORTS: StudentReport[] = [
    {
        id: 1,
        name: 'Ahmed Hassan',
        email: 'ahmed@example.com',
        course: 'IELTS Mastery',
        enrollmentDate: '2025-01-01',
        completionRate: 95,
        avgScore: 88,
        videosWatched: 24,
        assessmentsPassed: 22,
        status: 'Active',
    },
    {
        id: 2,
        name: 'Fatima Al-Rashid',
        email: 'fatima@example.com',
        course: 'IELTS Mastery',
        enrollmentDate: '2025-01-05',
        completionRate: 85,
        avgScore: 78,
        videosWatched: 20,
        assessmentsPassed: 18,
        status: 'Active',
    },
    {
        id: 3,
        name: 'Mohammed Khan',
        email: 'mohammed@example.com',
        course: 'Business English Pro',
        enrollmentDate: '2024-12-15',
        completionRate: 100,
        avgScore: 92,
        videosWatched: 32,
        assessmentsPassed: 30,
        status: 'Completed',
    },
    {
        id: 4,
        name: 'Layla Ibrahim',
        email: 'layla@example.com',
        course: 'IELTS Mastery',
        enrollmentDate: '2025-01-10',
        completionRate: 60,
        avgScore: 72,
        videosWatched: 14,
        assessmentsPassed: 12,
        status: 'Active',
    },
];

const PAYOUT_HISTORY: Payout[] = [
    { id: 1, date: '2025-01-01', amount: 2500, status: 'Completed', method: 'Bank Transfer' },
    { id: 2, date: '2024-12-01', amount: 2200, status: 'Completed', method: 'Bank Transfer' },
    { id: 3, date: '2024-11-01', amount: 1800, status: 'Completed', method: 'Bank Transfer' },
    { id: 4, date: '2024-10-01', amount: 1600, status: 'Completed', method: 'Bank Transfer' },
];

const COURSE_DISTRIBUTION: CourseDistribution[] = [
    { name: 'IELTS Mastery', value: 16, color: '#0EA5E9' },
    { name: 'Business English', value: 6, color: '#8B5CF6' },
    { name: 'SAT Excellence', value: 4, color: '#06B6D4' },
];


export interface Video {
    id: string;
    title: string;
    course: string;
    duration: string;
    uploadDate: string;
    views: number;
    students: number;
    watermark: boolean;
    antiRecord: boolean;
    assessments: number;
    thumbnail: string;
    url?: string;
}

const VIDEOS_DATA: Video[] = [
  {
    id: '1',
    title: 'IELTS Speaking Part 1 - Introduction',
    course: 'IELTS Mastery',
    duration: '45:32',
    uploadDate: '2025-01-10',
    views: 234,
    students: 12,
    watermark: true,
    antiRecord: true,
    assessments: 3,
    thumbnail: '/images/hero-live-classes.jpg',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: '2',
    title: 'Business English - Email Writing',
    course: 'Business English Pro',
    duration: '38:15',
    uploadDate: '2025-01-08',
    views: 156,
    students: 8,
    watermark: true,
    antiRecord: true,
    assessments: 2,
    thumbnail: '/images/hero-ai-tutor.jpg',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: '3',
    title: 'SAT Math - Algebra Fundamentals',
    course: 'SAT Excellence',
    duration: '52:20',
    uploadDate: '2025-01-05',
    views: 189,
    students: 10,
    watermark: true,
    antiRecord: true,
    assessments: 4,
    thumbnail: '/images/hero-placement-test.jpg',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: '4',
    title: 'Arabic for Beginners - Lesson 1',
    course: 'Arabic Fluency',
    duration: '28:45',
    uploadDate: '2025-01-12',
    views: 312,
    students: 45,
    watermark: true,
    antiRecord: true,
    assessments: 1,
    thumbnail: '/images/hero-live-classes.jpg',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: '5',
    title: 'IELTS Writing Task 2 - Essay Structure',
    course: 'IELTS Mastery',
    duration: '65:10',
    uploadDate: '2025-01-14',
    views: 145,
    students: 15,
    watermark: true,
    antiRecord: true,
    assessments: 2,
    thumbnail: '/images/hero-ai-tutor.jpg',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: '6',
    title: 'Business English - Negotiation Skills',
    course: 'Business English Pro',
    duration: '42:30',
    uploadDate: '2025-01-16',
    views: 98,
    students: 6,
    watermark: true,
    antiRecord: true,
    assessments: 3,
    thumbnail: '/images/hero-placement-test.jpg',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  },
];

export const MockAnalyticsService = {
    getStudentProgress: async (): Promise<ProgressData[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...PROGRESS_DATA]), 600);
        });
    },

    getStudentSkills: async (): Promise<SkillData[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...SKILLS_DATA]), 500);
        });
    },

    getRecommendations: async (): Promise<Recommendation[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...RECOMMENDATIONS]), 400);
        });
    },

    getAchievements: async (): Promise<Achievement[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...ACHIEVEMENTS]), 300);
        });
    },

    getTeacherProgress: async (): Promise<TeacherProgressData[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...TEACHER_PROGRESS_DATA]), 600);
        });
    },

    getRevenueData: async (): Promise<RevenueData[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...REVENUE_DATA]), 500);
        });
    },

    getStudentReports: async (): Promise<StudentReport[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...STUDENT_REPORTS]), 450);
        });
    },

    getPayoutHistory: async (): Promise<Payout[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...PAYOUT_HISTORY]), 400);
        });
    },

    getCourseDistribution: async (): Promise<CourseDistribution[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...COURSE_DISTRIBUTION]), 300);
        });
    },

    // Video Management
    getVideos: async (): Promise<Video[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...VIDEOS_DATA]), 500);
        });
    },

    addVideo: async (video: Video): Promise<void> => {
        return new Promise((resolve) => {
            VIDEOS_DATA.unshift(video);
            setTimeout(() => resolve(), 500);
        });
    },

    updateVideo: async (video: Video): Promise<void> => {
        return new Promise((resolve) => {
            const index = VIDEOS_DATA.findIndex(v => v.id === video.id);
            if (index !== -1) {
                VIDEOS_DATA[index] = video;
            }
            setTimeout(() => resolve(), 500);
        });
    },

    deleteVideo: async (id: string): Promise<void> => {
        return new Promise((resolve) => {
            const index = VIDEOS_DATA.findIndex(v => v.id === id);
            if (index !== -1) {
                VIDEOS_DATA.splice(index, 1);
            }
            setTimeout(() => resolve(), 500);
        });
    }
};
