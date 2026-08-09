import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, Users, Award, MessageSquare, Clock, DollarSign, MapPin, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';

/**
 * Teacher Profiles Page
 * Comprehensive display of teacher profiles with ratings and experience
 */

interface Teacher {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  specializations: string[];
  experience: number;
  qualifications: string[];
  bio: string;
  hourlyRate: number;
  totalStudents: number;
  responseTime: string;
  languages: string[];
  location: string;
  availability: boolean;
}

// Updated with real Unsplash images
const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Michael Chen',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 287,
    specializations: ['IELTS', 'Business English'],
    experience: 8,
    qualifications: ['CELTA', 'IELTS Examiner'],
    bio: 'Experienced English teacher specializing in IELTS preparation and international exam coaching with proven track record.',
    hourlyRate: 50,
    totalStudents: 150,
    responseTime: '1 hour',
    languages: ['English', 'Mandarin'],
    location: 'Singapore',
    availability: true,
  },
  {
    id: '2',
    name: 'Sarah Williams',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 245,
    specializations: ['SAT', 'Academic English'],
    experience: 6,
    qualifications: ['TESOL', 'SAT Instructor'],
    bio: 'Dedicated SAT and academic English instructor helping students achieve their college admission goals.',
    hourlyRate: 45,
    totalStudents: 120,
    responseTime: '30 minutes',
    languages: ['English', 'Spanish'],
    location: 'USA',
    availability: true,
  },
  {
    id: '3',
    name: 'James Patterson',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 198,
    specializations: ['Business English', 'Corporate Training'],
    experience: 10,
    qualifications: ['MBA', 'CELTA'],
    bio: 'Business English expert with corporate training experience helping professionals excel in international environments.',
    hourlyRate: 60,
    totalStudents: 95,
    responseTime: '2 hours',
    languages: ['English', 'French'],
    location: 'UK',
    availability: true,
  },
  {
    id: '4',
    name: 'Fatima Al-Rashid',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 312,
    specializations: ['Arabic', 'Conversational Arabic'],
    experience: 7,
    qualifications: ['Arabic Language Specialist', 'Native Speaker'],
    bio: 'Native Arabic speaker specializing in conversational Arabic and cultural immersion for international learners.',
    hourlyRate: 40,
    totalStudents: 180,
    responseTime: '45 minutes',
    languages: ['Arabic', 'English', 'French'],
    location: 'UAE',
    availability: true,
  },
  {
    id: '5',
    name: 'Emma Thompson',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 267,
    specializations: ['Grammar', 'Writing Skills'],
    experience: 9,
    qualifications: ['MA English', 'CELTA'],
    bio: 'Grammar and writing specialist helping students master English composition and professional communication.',
    hourlyRate: 55,
    totalStudents: 140,
    responseTime: '1 hour',
    languages: ['English', 'German'],
    location: 'Canada',
    availability: true,
  },
  {
    id: '6',
    name: 'David Kumar',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 203,
    specializations: ['IELTS', 'Listening Skills'],
    experience: 5,
    qualifications: ['CELTA', 'IELTS Trainer'],
    bio: 'Specialized in IELTS listening and speaking skills with innovative teaching methods and high success rates.',
    hourlyRate: 48,
    totalStudents: 110,
    responseTime: '1.5 hours',
    languages: ['English', 'Hindi'],
    location: 'India',
    availability: true,
  },
];

export default function TeacherProfiles() {
  const [, navigate] = useLocation();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTeachers = activeFilter === 'All'
    ? teachers
    : teachers.filter(t => t.specializations.some(s => s.includes(activeFilter)));

  const handleBookSession = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <main className="py-12 px-4">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Meet Our Expert Teachers
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Learn from certified, experienced instructors passionate about helping you achieve your language learning goals
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            {['All', 'IELTS', 'SAT', 'Business English', 'Arabic'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-smooth ${filter === activeFilter
                    ? 'bg-accent text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/50 text-foreground hover:bg-white/80 border border-white/20'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="glass-card border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-smooth group hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{teacher.name}</h3>
                    <p className="text-white/90 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {teacher.location}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Rating & Stats */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{teacher.rating}</span>
                      <span className="text-sm text-foreground/60">({teacher.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg text-accent">${teacher.hourlyRate}</span>
                      <span className="text-xs text-foreground/60">/hr</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-2 h-10">{teacher.bio}</p>

                  {/* Specializations */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {teacher.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="inline-block px-3 py-1 bg-accent/5 text-accent rounded-full text-xs font-semibold"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <Users className="w-4 h-4 text-accent" />
                      <span>{teacher.totalStudents} Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{teacher.responseTime} reply</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <Award className="w-4 h-4 text-accent" />
                      <span>{teacher.experience}y Exp.</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span>{teacher.languages[0]}</span>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <div className="mb-6">
                    {teacher.availability ? (
                      <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Available for new students
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        Fully booked
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleBookSession(teacher)}
                      className="flex-1 gradient-button gap-2 group-hover:shadow-lg transition-all"
                    >
                      <Clock className="w-4 h-4" />
                      Book Now
                    </Button>
                    <Button
                      onClick={() => navigate('/messaging')}
                      variant="outline"
                      className="px-3"
                      title="Message Teacher"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="glass-card border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-foreground/70 mb-6">
                Choose your teacher and schedule your first session today
              </p>
              <Button
                onClick={() => {
                  /* Scroll to top */
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="gap-2 px-8 py-3 gradient-button"
              >
                <Clock className="w-5 h-5" />
                Find Your Teacher
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        teacher={selectedTeacher}
      />

      <Footer />
    </div>
  );
}
