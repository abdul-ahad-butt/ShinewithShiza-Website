import React from 'react';
import { CalendarCheck, Sparkles, GraduationCap, AlertCircle, TrendingUp } from 'lucide-react';
import { Booking, CourseInquiry } from '../services/api';

interface MetricCardsProps {
  bookings: Booking[];
  inquiries: CourseInquiry[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ bookings, inquiries }) => {
  const totalBookings = bookings.length;
  const pendingFollowups = bookings.filter((b) => b.status === 'pending').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const academyInquiriesCount = inquiries.length;

  // Calculate top requested service
  const serviceCounts: Record<string, number> = {};
  for (const b of bookings) {
    serviceCounts[b.service] = (serviceCounts[b.service] || 0) + 1;
  }
  let topService = 'Barat Signature Royal Bridal Glam';
  let maxCount = 0;
  for (const [srv, count] of Object.entries(serviceCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topService = srv;
    }
  }

  const cards = [
    {
      title: 'Total Bookings This Month',
      value: totalBookings.toString(),
      subtext: `${confirmedBookings} confirmed slots`,
      icon: CalendarCheck,
      color: 'text-gold-400',
      bg: 'bg-gold-500/10 border-gold-500/30'
    },
    {
      title: 'Top Requested Service',
      value: topService.split(' ').slice(0, 3).join(' ') + '...',
      subtext: 'Leading bridal booking demand',
      icon: Sparkles,
      color: 'text-amber-300',
      bg: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      title: 'Academy 50% Off Applicants',
      value: academyInquiriesCount.toString(),
      subtext: 'Student admissions registered',
      icon: GraduationCap,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      title: 'Pending Follow-Ups',
      value: pendingFollowups.toString(),
      subtext: 'Requires WhatsApp confirmation',
      icon: AlertCircle,
      color: pendingFollowups > 0 ? 'text-rose-400' : 'text-emerald-400',
      bg: pendingFollowups > 0 ? 'bg-rose-500/10 border-rose-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="luxury-card rounded-2xl p-5 border flex flex-col justify-between space-y-3 relative group hover:border-gold-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-champagne-300/80">
                {card.title}
              </span>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${card.bg}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>

            <div>
              <p className="font-playfair text-2xl font-bold text-champagne-100 tracking-tight">
                {card.value}
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-champagne-300/60 font-light">
                <TrendingUp className="w-3 h-3 text-gold-400" />
                <span>{card.subtext}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
