import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Sparkles, PlusCircle } from 'lucide-react';
import { Booking } from '../services/api';

interface QuickWalkInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooking: (booking: Omit<Booking, 'id' | 'created_at'>) => void;
}

export const QuickWalkInModal: React.FC<QuickWalkInModalProps> = ({
  isOpen,
  onClose,
  onAddBooking
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [service, setService] = useState('Barat Signature Royal Bridal Glam');
  const [category, setCategory] = useState('bridal');
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('02:00 PM');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) return;

    onAddBooking({
      client_name: clientName.trim(),
      phone: phone.trim(),
      service,
      category,
      date,
      time,
      status: 'confirmed',
      notes: notes.trim()
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="luxury-card w-full max-w-lg rounded-3xl p-6 bg-salon-950 border-2 border-gold-500/40 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-zinc-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-playfair text-xl font-bold text-champagne-100 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-gold-400" />
          <span>Quick Client Booking Entry</span>
        </h3>
        <p className="text-xs text-champagne-300/70 mt-0.5 font-light">
          Log an in-salon walk-in or telephone reservation
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
          <div>
            <label className="block text-champagne-300 font-medium mb-1">
              Client Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maham Noor"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-salon-900 border border-zinc-700 rounded-xl px-3 py-2 text-champagne-100 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-champagne-300 font-medium mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-salon-900 border border-zinc-700 rounded-xl px-3 py-2 text-champagne-100 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-champagne-300 font-medium mb-1">
              Service
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-salon-900 border border-zinc-700 rounded-xl px-3 py-2 text-champagne-100 focus:outline-none focus:border-gold-400"
            >
              <option value="Barat Signature Royal Bridal Glam">Barat Signature Royal Bridal Glam (PKR 65,000)</option>
              <option value="Walima Soft Glam & Crystal Finish">Walima Soft Glam &amp; Crystal Finish (PKR 50,000)</option>
              <option value="Nikkah / Engagement Radiant Glow">Nikkah / Engagement Radiant Glow (PKR 38,000)</option>
              <option value="Signature HD Party Makeup">Signature HD Party Makeup (PKR 12,000)</option>
              <option value="Brazilian Keratin Hair Rebonding">Brazilian Keratin Hair Rebonding (PKR 28,000)</option>
              <option value="9-Step 24K Gold HydraFacial Rejuvenation">9-Step 24K Gold HydraFacial (PKR 14,500)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-champagne-300 font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-salon-900 border border-zinc-700 rounded-xl px-3 py-2 text-champagne-100 focus:outline-none focus:border-gold-400"
              />
            </div>
            <div>
              <label className="block text-champagne-300 font-medium mb-1">
                Time
              </label>
              <input
                type="text"
                placeholder="e.g. 02:00 PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-salon-900 border border-zinc-700 rounded-xl px-3 py-2 text-champagne-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-champagne-300 font-medium mb-1">
              Notes / Special Requests
            </label>
            <input
              type="text"
              placeholder="e.g. Advance paid PKR 10,000"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-salon-900 border border-zinc-700 rounded-xl px-3 py-2 text-champagne-100 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="btn-gold w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Confirm &amp; Add to Salon Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
