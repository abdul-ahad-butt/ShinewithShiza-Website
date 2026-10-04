import React, { useState } from 'react';
import { Booking } from '../services/api';
import { Search, Filter, MessageCircle, Calendar, Clock, Trash2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface BookingTableProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: Booking['status']) => void;
  onDeleteBooking: (id: string) => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onUpdateStatus,
  onDeleteBooking
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtered Bookings
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Client WhatsApp Follow-up generator
  const handleOpenWhatsAppChat = (b: Booking) => {
    let cleanPhone = b.phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '92' + cleanPhone.substring(1);
    }
    const message = [
      `Hello ${b.client_name}! ✨`,
      `This is from *Shine With Shiza (Beauty Salon)* at Baby World Basement, Model Town Link Rd, Lahore.`,
      ``,
      `We are writing to follow up regarding your reservation for *${b.service}* on *${b.date}* at *${b.time}*.`,
      `Current Status: *${b.status.toUpperCase()}*`,
      ``,
      `📍 Location: Baby World Basement, Model Town Link Rd, Opp. Amanah Mall, near Jalal Sons, Lahore.`,
      `Please let us know if you need to adjust timings or have any questions!`,
      ``,
      `With warm regards,`,
      `*Shine With Shiza Management Team*`
    ].join('\n');

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="luxury-card rounded-2xl border border-zinc-800 p-5 space-y-4">
      
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, phone, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-salon-900 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-champagne-100 placeholder-zinc-500 focus:outline-none focus:border-gold-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                statusFilter === st
                  ? 'bg-gold-500 text-salon-950 font-bold shadow-xs'
                  : 'bg-salon-900 text-champagne-300 hover:text-gold-200 border border-zinc-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-[11px] font-semibold uppercase tracking-wider text-gold-300/80">
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Contact Phone</th>
              <th className="py-3 px-4">Selected Service</th>
              <th className="py-3 px-4">Date &amp; Time</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-400">
                  <p className="font-medium text-sm text-champagne-200">
                    {bookings.length === 0
                      ? "No appointments received yet. New bookings submitted on the website will appear here in real time."
                      : "No appointments match the selected filters."}
                  </p>
                  {bookings.length === 0 && (
                    <p className="text-xs text-zinc-500 mt-1">
                      New appointments submitted from the website booking modal will appear here dynamically.
                    </p>
                  )}
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} className="hover:bg-salon-900/40 transition-colors">
                  
                  {/* Client Info */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-champagne-100 text-sm">
                      {b.client_name}
                    </p>
                    <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      {b.phone}
                    </p>
                    {b.notes && (
                      <p className="text-[10px] text-zinc-500 italic mt-0.5 max-w-xs truncate" title={b.notes}>
                        Notes: {b.notes}
                      </p>
                    )}
                  </td>

                  {/* Service */}
                  <td className="py-3.5 px-4 font-medium text-gold-200">
                    {b.service}
                  </td>

                  {/* Date & Time */}
                  <td className="py-3.5 px-4 text-champagne-200">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      <span>{b.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{b.time}</span>
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4">
                    <select
                      value={b.status}
                      onChange={(e) => onUpdateStatus(b.id, e.target.value as Booking['status'])}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                          : b.status === 'pending'
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                          : b.status === 'completed'
                          ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* One-Click WhatsApp Action */}
                      <button
                        onClick={() => handleOpenWhatsAppChat(b)}
                        className="p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-950 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-1.5 text-xs"
                        title="Chat with client directly on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>

                      {/* Delete Action */}
                      <button
                        onClick={() => onDeleteBooking(b.id)}
                        className="p-2 rounded-xl bg-zinc-900 hover:bg-red-950/50 border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-300 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
