// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Calendar, Clock, Star, CheckCircle, X, Video, Users, User } from 'lucide-react';
import { bookingStore } from '@/lib/mockBookingStore';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Session booking system
 * - Teacher availability calendar
 * - Booking confirmation
 */

interface Teacher {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  availability: string[];
  image: string;
  bio: string;
}

interface BookingSession {
  id: string;
  teacherId: string;
  teacherName: string;
  date: string;
  time: string;
  duration: number;
  type: 'speaking' | 'writing' | 'grammar' | 'general';
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'IELTS & Speaking',
    rating: 4.9,
    reviews: 156,
    hourlyRate: 45,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    image: '/images/hero-live-classes.jpg',
    bio: 'Experienced IELTS instructor with 10+ years of teaching experience. Specializes in speaking and listening skills.',
  },
  {
    id: '2',
    name: 'Emma Richardson',
    specialty: 'Business English',
    rating: 4.8,
    reviews: 124,
    hourlyRate: 50,
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    image: '/images/hero-ai-tutor.jpg',
    bio: 'Professional business English trainer. Helps professionals improve communication in corporate settings.',
  },
  {
    id: '3',
    name: 'Prof. Michael Chen',
    specialty: 'Grammar & Writing',
    rating: 4.7,
    reviews: 98,
    hourlyRate: 40,
    availability: ['Tue', 'Thu', 'Sat', 'Sun'],
    image: '/images/hero-placement-test.jpg',
    bio: 'Expert in English grammar and academic writing. Perfect for students preparing for exams.',
  },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM'
];

export default function BookingSystem() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [sessionType, setSessionType] = useState<'speaking' | 'writing' | 'grammar' | 'general'>('general');
  const [bookingStep, setBookingStep] = useState<'select-teacher' | 'select-time' | 'confirm' | 'success'>('select-teacher');
  const [myBookings, setMyBookings] = useState<BookingSession[]>([
    {
      id: '1',
      teacherId: '1',
      teacherName: 'Dr. Sarah Mitchell',
      date: '2025-01-28',
      time: '14:00',
      duration: 60,
      type: 'speaking',
      price: 45,
      status: 'confirmed',
    },
    {
      id: '2',
      teacherId: '2',
      teacherName: 'Emma Richardson',
      date: '2025-01-30',
      time: '10:00',
      duration: 60,
      type: 'writing',
      price: 50,
      status: 'pending',
    },
  ]);

  const handleBookSession = () => {
    if (selectedTeacher && selectedDate && selectedTime) {
      const isAvailable = bookingStore.bookSlot(selectedTeacher.id, selectedDate, selectedTime);

      if (isAvailable) {
        const newBooking: BookingSession = {
          id: String(myBookings.length + 1),
          teacherId: selectedTeacher.id,
          teacherName: selectedTeacher.name,
          date: selectedDate,
          time: selectedTime,
          duration: 60,
          type: sessionType,
          price: selectedTeacher.hourlyRate,
          status: 'confirmed',
        };
        setMyBookings([...myBookings, newBooking]);
        setBookingStep('success');
      } else {
        alert('Sorry, this slot is no longer available. Please choose another.');
        setBookingStep('select-time');
      }
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    setMyBookings(
      myBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      )
    );
  };

  const getSessionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      speaking: '🗣️ Speaking Practice',
      writing: '✍️ Writing Correction',
      grammar: '📚 Grammar Lesson',
      general: '💬 General Conversation',
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold gradient-text mb-2">Book a Session</h1>
          <p className="text-foreground/70">Schedule 1-on-1 lessons with expert instructors</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Booking Form */}
            <div className="lg:col-span-2">
              {bookingStep === 'select-teacher' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Select an Instructor</h2>

                  <div className="space-y-6">
                    {teachers.map((teacher) => (
                      <div
                        key={teacher.id}
                        className={`glass-card p-6 cursor-pointer transition-smooth border-2 ${selectedTeacher?.id === teacher.id
                          ? 'border-accent bg-accent/5'
                          : 'border-white/20 hover:border-accent/50'
                          }`}
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setBookingStep('select-time');
                        }}
                      >
                        <div className="flex gap-6">
                          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={teacher.image}
                              alt={teacher.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold">{teacher.name}</h3>
                                <p className="text-sm text-accent font-semibold">{teacher.specialty}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold gradient-text">${teacher.hourlyRate}</p>
                                <p className="text-xs text-foreground/60">/hour</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="font-semibold">{teacher.rating}</span>
                              <span className="text-foreground/60 text-sm">({teacher.reviews} reviews)</span>
                            </div>

                            <p className="text-sm text-foreground/70 mb-3">{teacher.bio}</p>

                            <div className="flex gap-2">
                              {teacher.availability.map((day) => (
                                <span
                                  key={day}
                                  className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full"
                                >
                                  {day}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {bookingStep === 'select-time' && selectedTeacher && (
                <div>
                  <button
                    onClick={() => setBookingStep('select-teacher')}
                    className="text-accent hover:text-accent/80 font-semibold mb-6"
                  >
                    ← Change Instructor
                  </button>

                  <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>

                  {/* Session Type */}
                  <div className="mb-8">
                    <h3 className="font-bold mb-4">Session Type</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {(['speaking', 'writing', 'grammar', 'general'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSessionType(type)}
                          className={`p-4 rounded-lg border-2 transition-smooth ${sessionType === type
                            ? 'border-accent bg-accent/10'
                            : 'border-white/20 hover:border-accent/50'
                            }`}
                        >
                          <p className="font-semibold">{getSessionTypeLabel(type)}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-8">
                    <h3 className="font-bold mb-4">Select Date</h3>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedTime(''); // Reset time when date changes
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Time Selection */}
                  <div className="mb-8">
                    <h3 className="font-bold mb-4">Select Time</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((time) => {
                        const isAvailable = selectedDate ? bookingStore.isSlotAvailable(selectedTeacher.id, selectedDate, time) : false;
                        const type = bookingStore.getSlotType(selectedTeacher.id, time);

                        return (
                          <button
                            key={time}
                            onClick={() => isAvailable && setSelectedTime(time)}
                            disabled={!selectedDate || !isAvailable}
                            className={`p-3 rounded-lg border-2 font-semibold transition-smooth flex items-center justify-between ${!isAvailable
                              ? 'border-white/10 bg-white/5 text-foreground/40 cursor-not-allowed'
                              : selectedTime === time
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'border-white/20 hover:border-accent/50'
                              }`}
                          >
                            <span>{time}</span>
                            {type === 'Group' ? <Users className="w-3 h-3 text-purple-500" /> : <User className="w-3 h-3 text-blue-500" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      className="gradient-button flex-1"
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setBookingStep('confirm')}
                    >
                      Continue to Confirmation
                    </Button>
                  </div>
                </div>
              )}

              {bookingStep === 'confirm' && selectedTeacher && (
                <div>
                  <button
                    onClick={() => setBookingStep('select-time')}
                    className="text-accent hover:text-accent/80 font-semibold mb-6"
                  >
                    ← Back
                  </button>

                  <h2 className="text-2xl font-bold mb-6">Confirm Your Booking</h2>

                  <div className="glass-card p-8 border border-white/10 mb-6">
                    <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Instructor</span>
                        <span className="font-bold">{selectedTeacher.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Session Type</span>
                        <span className="font-bold">{getSessionTypeLabel(sessionType)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Date</span>
                        <span className="font-bold">{new Date(selectedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Time</span>
                        <span className="font-bold">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Duration</span>
                        <span className="font-bold">60 minutes</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Price</span>
                      <span className="text-3xl font-bold gradient-text">${selectedTeacher.hourlyRate}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={() => setBookingStep('select-time')}>
                      Edit
                    </Button>
                    <Button className="gradient-button flex-1" onClick={handleBookSession}>
                      Confirm & Pay
                    </Button>
                  </div>
                </div>
              )}

              {bookingStep === 'success' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold gradient-text mb-4">Booking Confirmed!</h2>
                  <p className="text-foreground/70 mb-8">
                    Your session has been successfully booked. Check your email for confirmation details.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      className="gradient-button"
                      onClick={() => {
                        setBookingStep('select-teacher');
                        setSelectedTeacher(null);
                        setSelectedDate('');
                        setSelectedTime('');
                      }}
                    >
                      Book Another Session
                    </Button>
                    <Button variant="outline">View My Bookings</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - My Bookings */}
            <div>
              <h2 className="text-2xl font-bold mb-6">My Sessions</h2>

              <div className="space-y-4">
                {myBookings.filter((b) => b.status !== 'cancelled').length === 0 ? (
                  <div className="glass-card p-8 text-center border border-white/10">
                    <Video className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                    <p className="text-foreground/70">No upcoming sessions</p>
                    <p className="text-sm text-foreground/60">Book your first session to get started</p>
                  </div>
                ) : (
                  myBookings
                    .filter((b) => b.status !== 'cancelled')
                    .map((booking) => (
                      <div key={booking.id} className={`glass-card p-6 border-2 ${getStatusColor(booking.status)}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold">{booking.teacherName}</p>
                            <p className="text-sm text-foreground/70">{getSessionTypeLabel(booking.type)}</p>
                          </div>
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-current/20">
                            {booking.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                        </div>

                        <p className="text-lg font-bold gradient-text mb-4">${booking.price}</p>

                        {booking.status === 'confirmed' && (
                          <div className="flex gap-2">
                            <Button size="sm" className="gradient-button flex-1">
                              Join Session
                            </Button>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-smooth"
                            >
                              <X className="w-5 h-5 text-red-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
