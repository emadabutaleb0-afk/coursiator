
export interface Course {
    id: string;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    price: number;
    sessions: number;
    instructor: string;
    rating: number;
    students: number;
    image: string;
    features: string[];
    featuresAr: string[];
}

const COURSES: Course[] = [
    {
        id: 'ielts-pro',
        name: 'IELTS Mastery',
        nameAr: 'إتقان IELTS',
        description: 'Complete IELTS preparation with live instructors and AI practice.',
        descriptionAr: 'تحضير شامل لـ IELTS مع مدرسين مباشرين وممارسة ذكية.',
        price: 299,
        sessions: 16,
        instructor: 'Dr. Sarah Mitchell',
        rating: 4.9,
        students: 2340,
        image: '/images/hero-live-classes.jpg',
        features: ['Live Classes', 'AI Tutor', 'Mock Tests', 'Certificate'],
        featuresAr: ['فصول مباشرة', 'معلم ذكي', 'اختبارات محاكاة', 'شهادة'],
    },
    {
        id: 'sat-elite',
        name: 'SAT Excellence',
        nameAr: 'تميز SAT',
        description: 'Master the SAT with personalized learning paths and expert guidance.',
        descriptionAr: 'أتقن SAT مع مسارات تعلم مخصصة وتوجيه خبير.',
        price: 349,
        sessions: 20,
        instructor: 'Prof. James Chen',
        rating: 4.8,
        students: 1890,
        image: '/images/hero-placement-test.jpg',
        features: ['Live Classes', 'AI Tutor', 'Score Prediction', 'Certificate'],
        featuresAr: ['فصول مباشرة', 'معلم ذكي', 'توقع النتيجة', 'شهادة'],
    },
    {
        id: 'business-pro',
        name: 'Business English Pro',
        nameAr: 'الإنجليزية للأعمال',
        description: 'Excel in corporate communication with real-world scenarios.',
        descriptionAr: 'تفوق في التواصل المؤسسي مع سيناريوهات واقعية.',
        price: 279,
        sessions: 16,
        instructor: 'Emma Richardson',
        rating: 4.7,
        students: 1560,
        image: '/images/hero-ai-tutor.jpg',
        features: ['Live Classes', 'AI Tutor', 'Business Cases', 'Certificate'],
        featuresAr: ['فصول مباشرة', 'معلم ذكي', 'حالات عملية', 'شهادة'],
    },
    {
        id: 'arabic-fluent',
        name: 'Arabic Fluency',
        nameAr: 'الطلاقة في العربية',
        description: 'Master Arabic communication with native speakers and AI.',
        descriptionAr: 'أتقن التواصل بالعربية مع متحدثين أصليين وذكاء اصطناعي.',
        price: 259,
        sessions: 16,
        instructor: 'Dr. Fatima Al-Rashid',
        rating: 4.9,
        students: 1340,
        image: '/images/dashboard-background.png',
        features: ['Live Classes', 'AI Tutor', 'Native Speakers', 'Certificate'],
        featuresAr: ['فصول مباشرة', 'معلم ذكي', 'متحدثون أصليون', 'شهادة'],
    },
];

export const MockCourseService = {
    getCourses: async (): Promise<Course[]> => {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => resolve([...COURSSES]), 500);
        });
    },

    getCourseById: async (id: string): Promise<Course | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(COURSSES.find(c => c.id === id)), 300);
        });
    }
};

// Internal fix for typo in variable name if I made one above
const COURSSES = COURSES;
