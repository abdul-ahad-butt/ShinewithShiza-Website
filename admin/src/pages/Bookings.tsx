import React from 'react';
import { BookingTable } from '../components/BookingTable';
import { Booking } from '../services/api';
import { Calendar, UserPlus } from 'lucide-react';

interface BookingsPageProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: Booking['status']) => void;
  onDeleteBooking: (id: string) => void;
  onOpenWalkInModal: () => void;
}

export const Bookings: React.FC<BookingsPageProps> = ({
  bookings,
  onUpdateStatus,
  onDeleteBooking,
  onOpenWalkInModal
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-playfair text-2xl font-bold text-champagne-100 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-gold-400" />
            <span>Salon Bookings &amp; Bridal Appointments</span>
          </h2>
          <p className="text-xs text-champagne-300/70 font-light mt-0.5">
            Manage incoming live website submissions, schedule trials, and contact clients directly on WhatsApp.
          </p>
        </div>

        <button
          onClick={onOpenWalkInModal}
          className="btn-gold py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow shrink-0"
        >
          <UserPlus className="w-4 h-4 text-salon-950" />
          <span>+ Add Walk-In</span>
        </button>
      </div>

      {/* Bookings Table */}
      <BookingTable
        bookings={bookings}
        onUpdateStatus={onUpdateStatus}
        onDeleteBooking={onDeleteBooking}
      />

    </div>
  );
};
