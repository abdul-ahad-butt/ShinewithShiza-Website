import React from 'react';
import { Calendar, GraduationCap, MapPin, Star, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreAcademy: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreAcademy }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 lg:py-20">
      
      {/* Background Radial Glow & Dark Gradients */}
      <div className="absolute inset-0 bg-salon-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-gold opacity-60 blur-3xl pointer-events-none" />
      
      {/* Subtle Ornate Gold Pattern Mesh Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Copy & High-Converting CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Elite Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-salon-900/80 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs font-medium tracking-widest text-gold-300 uppercase">
                Premier Bridal Studio &amp; Beautician Courses
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-champagne-100">
              Redefine Your Elegance with Lahore's Premier{' '}
              <span className="text-gold-gradient block sm:inline italic font-normal font-cormorant">
                Bridal &amp; Beauty
              </span>{' '}
              Artists.
            </h1>

            {/* Subtitle with Exact Lahore Landmark */}
            <p className="text-base sm:text-lg text-champagne-300/85 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              From signature Barat &amp; Walima royal bridal makeovers to 9-step HydraFacials, hair keratin rebonding, and certified 2-month beautician masterclasses.
            </p>

            {/* Landmark Callout Pill */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-gold-300/90 font-medium pt-1">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Baby World Basement, Model Town Link Rd, Opp. Amanah Mall, near Jalal Sons, Lahore</span>
            </div>

            {/* Dual High-Conversion CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="btn-gold w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-gold-glow group"
              >
                <Calendar className="w-4 h-4 text-salon-950 transition-transform group-hover:scale-110" />
                <span>Book Salon Appointment</span>
              </button>

              <button
                onClick={onExploreAcademy}
                className="btn-gold-outline w-full sm:w-auto px-7 py-4 rounded-full text-sm font-medium tracking-wide flex items-center justify-center gap-2 group"
              >
                <GraduationCap className="w-4 h-4 text-gold-400 group-hover:text-gold-300" />
                <span>Explore Courses (50% Off)</span>
              </button>
            </div>

            {/* Luxury Google Rating Trust Badge below CTA */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2 text-xs sm:text-sm text-champagne-200">
              <div className="flex text-amber-400 text-sm tracking-tight">⭐⭐⭐⭐⭐</div>
              <span className="font-semibold text-gold-300">4.9 Rating</span>
              <span className="text-champagne-300/80">(127+ Verified Client Reviews on Google)</span>
            </div>

            {/* Trust Badges & Social Proof */}
            <div className="pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-800/80 text-left">
              <div>
                <p className="font-playfair text-xl sm:text-2xl font-bold text-gold-300">5,000+</p>
                <p className="text-[11px] text-champagne-300/70 font-light">Brides &amp; Clients Glown</p>
              </div>
              <div>
                <p className="font-playfair text-xl sm:text-2xl font-bold text-gold-300">10+ Yrs</p>
                <p className="text-[11px] text-champagne-300/70 font-light">Salon Mastery</p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-playfair text-xl sm:text-2xl font-bold text-gold-300">4.9</span>
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <p className="text-[11px] text-champagne-300/70 font-light">127+ Google Reviews</p>
              </div>
              <div>
                <p className="font-playfair text-xl sm:text-2xl font-bold text-gold-300">100%</p>
                <p className="text-[11px] text-champagne-300/70 font-light">Practical Courses</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Glowing Frame & Floating Perks */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glowing Backdrop Ring */}
            <div className="absolute inset-0 m-auto w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-gold-600/30 via-gold-400/20 to-transparent blur-2xl" />

            {/* Main Arch Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-t-[140px] rounded-b-3xl p-1.5 bg-gradient-to-b from-gold-400/80 via-gold-600/40 to-zinc-900 shadow-2xl shadow-black overflow-hidden border border-gold-500/40">
              
              <div className="w-full h-full rounded-t-[136px] rounded-b-[22px] overflow-hidden relative group">
                <img
                  src="/images/hero-bridal.jpg"
                  alt="Pakistani Royal Bride Makeover at Shine with Shiza"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-salon-950 via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-salon-950/80 backdrop-blur-md border border-gold-500/30 text-center">
                  <p className="font-playfair text-sm sm:text-base font-semibold text-gold-200">
                    Signature Barat Royal Bride
                  </p>
                  <p className="text-[10px] text-champagne-300 uppercase tracking-widest">
                    Crafted Exclusively at Shine with Shiza
                  </p>
                </div>
              </div>

            </div>

            {/* Floating Pill 1: 50% Course Discount */}
            <div className="absolute -top-4 -left-4 sm:left-0 p-3 sm:p-3.5 rounded-2xl bg-salon-900/90 backdrop-blur-md border border-gold-500/40 shadow-xl flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-gold-300" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold tracking-wider uppercase text-gold-400">
                  🎓 2-Month Beautician Masterclass
                </p>
                <p className="text-xs sm:text-sm font-bold text-champagne-100">
                  50% OFF • Limited Slots
                </p>
              </div>
            </div>

            {/* Floating Pill 2: 100% Bridal Satisfaction */}
            <div className="absolute -bottom-4 -right-4 sm:right-2 p-3 sm:p-3.5 rounded-2xl bg-salon-900/90 backdrop-blur-md border border-gold-500/40 shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
              <div className="w-10 h-10 rounded-xl bg-roseBlush-500/20 border border-roseBlush-400/40 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-roseBlush-300 fill-roseBlush-400/40" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold tracking-wider uppercase text-roseBlush-300">
                  Model Town Link Rd
                </p>
                <p className="text-xs sm:text-sm font-bold text-champagne-100">
                  Baby World Basement, Lahore
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
