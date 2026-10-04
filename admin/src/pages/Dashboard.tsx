import React from 'react';
import { MetricCards } from '../components/MetricCards';
import { BookingTable } from '../components/BookingTable';
import { CourseInquiriesTable } from '../components/CourseInquiriesTable';
import { Booking, CourseInquiry } from '../services/api';
import { Sparkles, Calendar, GraduationCap, ArrowRight } from 'lucide-react';

interface DashboardProps {
  bookings: Booking[];
  inquiries: CourseInquiry[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  onDeleteBooking: (id: string) => void;
  onUpdateCourseStatus: (id: string, status: CourseInquiry['status']) => void;
  onNavigateTab: (tab: 'bookings' | 'courses' | 'deals') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  bookings,
  inquiries,
  onUpdateBookingStatus,
  onDeleteBooking,
  onUpdateCourseStatus,
  onNavigateTab
}) => {
  return (
    <div className="space-y-8">
      
      {/* Real-time KPI Cards */}
      <MetricCards bookings={bookings} inquiries={inquiries} />

      {/* Recent Bookings Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-champagne-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold-400" />
            <span>Latest Client Salon Reservations</span>
          </h2>
          <button
            onClick={() => onNavigateTab('bookings')}
            className="text-xs text-gold-300 hover:text-gold-200 flex items-center gap-1 font-semibold transition-colors"
          >
            <span>View All Bookings ({bookings.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <BookingTable
          bookings={bookings.slice(0, 8)}
          onUpdateStatus={onUpdateBookingStatus}
          onDeleteBooking={onDeleteBooking}
        />
      </div>

      {/* Academy Course Applicants */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-champagne-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-gold-400" />
            <span>50% OFF Beautician Academy Applicants</span>
          </h2>
          <button
            onClick={() => onNavigateTab('courses')}
            className="text-xs text-gold-300 hover:text-gold-200 flex items-center gap-1 font-semibold transition-colors"
          >
            <span>View All Applicants ({inquiries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <CourseInquiriesTable
          inquiries={inquiries.slice(0, 5)}
          onUpdateStatus={onUpdateCourseStatus}
        />
      </div>

    </div>
  );
};
