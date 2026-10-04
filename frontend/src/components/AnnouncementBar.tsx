import React from 'react';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenAcademy: () => void;
  onOpenBooking: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenAcademy, onOpenBooking }) => {
  return (
    <div className="bg-gradient-to-r from-salon-950 via-gold-900/60 to-salon-950 border-b border-gold-500/30 text-xs sm:text-sm py-2.5 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Deal Announcement Text */}
        <div className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto font-medium">
          <span className="inline-flex items-center gap-1 bg-gold-500/20 text-gold-300 border border-gold-500/40 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase animate-pulse">
            <Tag className="w-3 h-3 text-gold-400" />
            Limited Offer
          </span>
          <span className="text-champagne-100">
            💄 <strong className="text-gold-300 font-semibold">50% OFF</strong> on Basic to Advance Beautician Course (2 Months) | Limited Seats Available
          </span>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center justify-center gap-4 text-xs">
          <button
            onClick={onOpenAcademy}
            className="text-gold-300 hover:text-gold-200 font-semibold flex items-center gap-1 transition-colors underline-offset-4 hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Course Curriculum
          </button>
          <span className="text-zinc-600">|</span>
          <button
            onClick={onOpenBooking}
            className="text-champagne-100 hover:text-gold-300 font-medium flex items-center gap-1 transition-colors"
          >
            Reserve Slot
            <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
