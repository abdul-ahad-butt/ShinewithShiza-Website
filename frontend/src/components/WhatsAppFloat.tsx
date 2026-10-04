import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Calendar, GraduationCap, ChevronRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickChat = (topic: string) => {
    let text = '';
    if (topic === 'bridal') {
      text = 'Hello Shine With Shiza! 👰 I would like to inquire about booking a bridal appointment.';
    } else if (topic === 'academy') {
      text = 'Hello Shine With Shiza! 🎓 I am interested in the 50% OFF Basic to Advance Beautician Course (2 Months) in Lahore.';
    } else {
      text = 'Hello Shine With Shiza, I would like to inquire about booking an appointment...';
    }

    const url = `https://wa.me/${SALON_INFO.cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Interactive Popup Card */}
      {isOpen && (
        <div className="mb-3.5 w-72 sm:w-80 luxury-card rounded-2xl p-4 border border-gold-500/40 shadow-2xl bg-salon-950/98 backdrop-blur-xl animate-fadeIn">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-champagne-100">Shiza's VIP Desk</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Online • Typically replies in 5m
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-champagne-300/80 py-2.5 font-light">
            Welcome to <strong className="text-gold-300">Shine with Shiza</strong>! Select an option below to start your WhatsApp chat:
          </p>

          {/* Quick Choice Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => handleQuickChat('bridal')}
              className="w-full p-2.5 rounded-xl bg-salon-900 hover:bg-gold-500/10 border border-zinc-800 hover:border-gold-500/40 text-left text-xs text-champagne-100 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>Book Bridal / Salon Slot</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-gold-400 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => handleQuickChat('academy')}
              className="w-full p-2.5 rounded-xl bg-salon-900 hover:bg-gold-500/10 border border-zinc-800 hover:border-gold-500/40 text-left text-xs text-champagne-100 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-gold-400" />
                <span>50% OFF Beautician Course</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-gold-400 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => handleQuickChat('general')}
              className="w-full p-2.5 rounded-xl bg-salon-900 hover:bg-gold-500/10 border border-zinc-800 hover:border-gold-500/40 text-left text-xs text-champagne-100 flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>General Salon Consultation</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-gold-400 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button with Pulsing Gold Glow */}
      <div className="relative group">
        
        {/* Tooltip on hover */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-salon-900/95 border border-gold-500/40 text-gold-300 text-xs font-medium whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with Shiza's Team 💬
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-2xl pulse-glow hover:scale-105 transition-transform duration-300 border-2 border-gold-400/70"
          aria-label="Chat on WhatsApp"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-salon-950" />
          ) : (
            <MessageCircle className="w-7 h-7 text-salon-950 fill-salon-950" />
          )}
        </button>

      </div>

    </div>
  );
};
