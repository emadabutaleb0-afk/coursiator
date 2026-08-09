import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import CertificateTemplate from '@/components/CertificateTemplate';
import { Download, ArrowLeft, Printer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Logic to parse URL params since we don't have a robust router hook for params in this setup yet
const useRouteParams = () => {
    const [location] = useLocation();
    const parts = location.split('/');
    // Expected: /certificate/:courseId
    return { courseId: parts[2] };
};

export default function CertificatePage() {
    const { user } = useAuth();
    const { courseId } = useRouteParams();
    const [, setLocation] = useLocation();
    const [isValid, setIsValid] = useState(false);
    const [courseData, setCourseData] = useState<{ name: string, instructor: string } | null>(null);

    useEffect(() => {
        // 1. Verify User
        if (!user) {
            setLocation('/auth');
            return;
        }

        // 2. Verify Course Progress (Mock Logic)
        // In a real app, we check the backend. Here we check local storage mock data.
        const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const course = enrolled.find((c: any) => c.id === courseId);

        // MOCK: For demo, if course is found, we assume 100% or allow generation for testing
        // To strictly enforce 100%, we would check course.progress === 100
        if (course) {
            setCourseData({
                name: course.name || course.title || 'Course Title',
                instructor: course.instructor || 'Coursiator Instructor'
            });
            setIsValid(true);
        } else {
            // Fallback for demo if not found in local storage (e.g. direct link test)
            // In prod, redirect to dashboard
            // setLocation('/dashboard');

            // FOR DEMO: Allow viewing standard demo courses
            if (courseId === '1') {
                setCourseData({ name: 'IELTS Mastery', instructor: 'Dr. Sarah Mitchell' });
                setIsValid(true);
            } else if (courseId === '2') {
                setCourseData({ name: 'Business English Pro', instructor: 'Emma Richardson' });
                setIsValid(true);
            }
        }
    }, [courseId, user, setLocation]);

    const handlePrint = () => {
        window.print();
    };

    if (!isValid || !courseData) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading certificate...</div>;
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
            {/* Navbar for Non-Print View */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center print:hidden">
                <Button variant="ghost" onClick={() => setLocation('/student-hub')} className="text-white/70 hover:text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Button>
                <div className="flex gap-3">
                    <Button onClick={handlePrint} variant="outline" className="border-white/20 hover:bg-white/10">
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                    </Button>
                    <Button onClick={handlePrint} className="gradient-button">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                    </Button>
                </div>
            </div>

            {/* Certificate Preview */}
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-neutral-900 print:bg-white print:p-0">
                <div className="scale-75 md:scale-100 print:scale-100 print:w-full">
                    <CertificateTemplate
                        studentName={user?.name || 'Student Name'}
                        courseName={courseData.name}
                        instructorName={courseData.instructor}
                        completionDate={new Date().toLocaleDateString()}
                        certificateId={`CRT-${courseId}-${Date.now().toString().slice(-6)}`}
                    />
                </div>
            </div>
        </div>
    );
}
