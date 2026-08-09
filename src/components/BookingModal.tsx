import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { format, addDays, startOfToday } from 'date-fns';

interface Teacher {
    id: string;
    name: string;
    image: string;
    hourlyRate: number;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    teacher: Teacher | null;
}

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export function BookingModal({ isOpen, onClose, teacher }: BookingModalProps) {
    const [step, setStep] = useState<'date' | 'confirm' | 'success'>('date');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Generate next 5 days for availability
    const availableDates = Array.from({ length: 5 }, (_, i) => addDays(startOfToday(), i + 1));

    const handleBook = () => {
        // Simulate API call
        setTimeout(() => {
            setStep('success');
        }, 1000);
    };

    const reset = () => {
        setStep('date');
        setSelectedDate(null);
        setSelectedTime(null);
        onClose();
    };

    if (!teacher) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && reset()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Book a Session with {teacher.name}</DialogTitle>
                    <DialogDescription>
                        {step === 'date' && "Select a date and time for your lesson."}
                        {step === 'confirm' && "Review your booking details."}
                        {step === 'success' && "Booking confirmed!"}
                    </DialogDescription>
                </DialogHeader>

                {step === 'date' && (
                    <div className="space-y-4 py-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Select Date</label>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {availableDates.map((date) => (
                                    <button
                                        key={date.toISOString()}
                                        onClick={() => setSelectedDate(date)}
                                        className={`flex-shrink-0 w-16 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${selectedDate?.toDateString() === date.toDateString()
                                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                : 'border-slate-200 hover:border-slate-400'
                                            }`}
                                    >
                                        <span className="text-xs font-semibold">{format(date, 'EEE')}</span>
                                        <span className="text-xl font-bold">{format(date, 'd')}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Select Time</label>
                            <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`px-3 py-2 text-sm rounded-md border transition-all ${selectedTime === time
                                                ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                                                : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 'confirm' && selectedDate && selectedTime && (
                    <div className="py-6 space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                            <img src={teacher.image} alt={teacher.name} className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold">{teacher.name}</h3>
                                <p className="text-sm text-slate-500">${teacher.hourlyRate}/hour</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-slate-500">Date</span>
                                <span className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-slate-500">Time</span>
                                <span className="font-medium">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-slate-500">Duration</span>
                                <span className="font-medium">60 minutes</span>
                            </div>
                            <div className="flex justify-between py-2 pt-4">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-lg text-blue-600">${teacher.hourlyRate}</span>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="py-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Booking Confirmed!</h3>
                            <p className="text-slate-500 mt-2">
                                A confirmation email has been sent to you.
                            </p>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    {step === 'date' && (
                        <Button
                            className="w-full gradient-button"
                            disabled={!selectedDate || !selectedTime}
                            onClick={() => setStep('confirm')}
                        >
                            Continue
                        </Button>
                    )}

                    {step === 'confirm' && (
                        <div className="flex gap-3 w-full">
                            <Button variant="outline" className="flex-1" onClick={() => setStep('date')}>Back</Button>
                            <Button className="flex-1 gradient-button" onClick={handleBook}>Confirm Booking</Button>
                        </div>
                    )}

                    {step === 'success' && (
                        <Button className="w-full gradient-button" onClick={reset}>Close</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
