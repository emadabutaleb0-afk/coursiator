// Simple in-memory store for demo purposes
// In a real app, this would be a backend database

export interface BookedSlot {
    teacherId: string;
    date: string; // ISO date string (YYYY-MM-DD)
    time: string;
}

export interface SessionConfig {
    teacherId: string;
    time: string;
    type: '1-on-1' | 'Group';
    capacity: number; // 1 for 1-on-1, >1 for Group
    bookedCount: number;
}

// Initial mock data
const initialBookedSlots: BookedSlot[] = [
    { teacherId: '1', date: '2025-01-02', time: '10:00 AM' }
];

// Mock schedule configuration (defining which slots are group vs 1-on-1)
// Defaulting others to 1-on-1
const sessionConfigs: SessionConfig[] = [
    { teacherId: '1', time: '02:00 PM', type: 'Group', capacity: 5, bookedCount: 1 },
    { teacherId: '1', time: '04:00 PM', type: 'Group', capacity: 3, bookedCount: 3 }, // Full
];

class MockBookingStore {
    private bookedSlots: BookedSlot[] = [...initialBookedSlots];
    private configs: SessionConfig[] = [...sessionConfigs];

    isSlotAvailable(teacherId: string, date: string, time: string): boolean {
        const config = this.configs.find(c => c.teacherId === teacherId && c.time === time);

        // Check strict 1-on-1 collisions
        const exactBooking = this.bookedSlots.find(
            s => s.teacherId === teacherId && s.date === date && s.time === time
        );

        if (config) {
            // Dynamic capacity check
            // Count bookings for this specific slot
            const currentBookings = this.bookedSlots.filter(
                s => s.teacherId === teacherId && s.date === date && s.time === time
            ).length + config.bookedCount; // add initial mock count

            return currentBookings < config.capacity;
        }

        // Default 1-on-1 behavior: if it's booked, it's unavailable
        return !exactBooking;
    }

    getSlotType(teacherId: string, time: string): '1-on-1' | 'Group' {
        const config = this.configs.find(c => c.teacherId === teacherId && c.time === time);
        return config ? config.type : '1-on-1';
    }

    bookSlot(teacherId: string, date: string, time: string): boolean {
        if (this.isSlotAvailable(teacherId, date, time)) {
            this.bookedSlots.push({ teacherId, date, time });
            return true;
        }
        return false;
    }

    getBookedSlots(teacherId: string) {
        return this.bookedSlots.filter(s => s.teacherId === teacherId);
    }
}

export const bookingStore = new MockBookingStore();
