import React from 'react';
import { SALON_INFO } from '../data/salonData';
import { MapPin, Clock, Phone, Navigation, Instagram, Youtube, ExternalLink, Sparkles } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-salon-950 relative overflow-hidden border-t border-zinc-900">
      
      {/* Background Sheen */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-radial-gold opacity-15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gold-500/30 bg-salon-900/60 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            Visit Our Lahore Sanctuary
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-champagne-100">
            Conveniently Located in <span className="text-gold-gradient italic font-cormorant">Model Town</span>
          </h2>

          <p className="text-sm sm:text-base text-champagne-300/80 font-light">
            Situated right in the heart of Lahore's premium shopping district on Model Town Link Road, with ample secure parking and a private bridal studio.
          </p>
        </div>

        {/* Studio Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Salon Interior Photo & Atmosphere */}
          <div className="lg:col-span-6 luxury-card rounded-3xl overflow-hidden p-3 sm:p-4 flex flex-col justify-between border border-gold-500/30">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden group">
              <img
                src="/images/salon-interior.jpg"
                alt="Shine with Shiza Luxury Salon Interior Lahore"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-salon-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-4 right-4">
                <span className="bg-gold-500/90 text-salon-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Inside the Salon
                </span>
                <p className="font-playfair text-base sm:text-lg font-bold text-champagne-100 mt-1">
                  Private VIP Dressing Suites &amp; Golden Arches
                </p>
              </div>
            </div>

            <div className="p-4 grid grid-cols-2 gap-4 mt-2">
              <div className="p-3 rounded-xl bg-salon-900/60 border border-zinc-800 text-center sm:text-left">
                <p className="text-xs text-gold-300 font-semibold">Valet &amp; Parking</p>
                <p className="text-[11px] text-champagne-300/70 mt-0.5">Complimentary, hassle-free parking on Link Road</p>
              </div>
              <div className="p-3 rounded-xl bg-salon-900/60 border border-zinc-800 text-center sm:text-left">
                <p className="text-xs text-gold-300 font-semibold">Tea &amp; Hospitality</p>
                <p className="text-[11px] text-champagne-300/70 mt-0.5">Special gourmet tea &amp; refreshments for all brides</p>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Landmark Details, Timings & Actions */}
          <div className="lg:col-span-6 luxury-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-gold-500/30 space-y-6">
            
            {/* Landmark Callouts */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-playfair text-xl font-bold text-champagne-100">
                    Exact Address &amp; Landmarks
                  </h4>
                  <div className="my-1.5 p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs sm:text-sm text-gold-300 font-medium">
                    📍 Located in Baby World Basement — directly opposite Amanah Mall and adjacent to Jalal Sons.
                  </div>
                  <p className="text-xs sm:text-sm text-champagne-300/80 leading-relaxed font-light">
                    Baby World Basement, Model Town Link Rd, Opp. Amanah Mall, near Jalal Sons, Phase 3 GECH Society, Lahore, 54600, Pakistan.
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-3 border-t border-zinc-800/80">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-playfair text-xl font-bold text-champagne-100">
                    Studio Timings
                  </h4>
                  <p className="text-sm text-gold-300 font-semibold mt-1">
                    {SALON_INFO.hours}
                  </p>
                  <p className="text-xs text-champagne-300/70 font-light">
                    Open 7 days a week for bridal trials, salon treatments &amp; beautician classes.
                  </p>
                </div>
              </div>

              {/* Direct Contact Phone */}
              <div className="flex items-start gap-4 pt-3 border-t border-zinc-800/80">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-playfair text-xl font-bold text-champagne-100">
                    Direct Salon Desk &amp; WhatsApp
                  </h4>
                  <a
                    href={`tel:${SALON_INFO.cleanPhone}`}
                    className="text-base text-gold-300 hover:text-gold-200 font-bold block mt-1 transition-colors"
                  >
                    {SALON_INFO.phone}
                  </a>
                  <p className="text-xs text-champagne-300/70 font-light">
                    Direct call or WhatsApp booking assistance from 11:00 AM to 08:30 PM.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links & Google Maps Buttons */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={SALON_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-salon-950" />
                  <span>Get Directions on Map</span>
                </a>

                <a
                  href={`tel:${SALON_INFO.cleanPhone}`}
                  className="btn-gold-outline py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call Reception Now</span>
                </a>
              </div>

              {/* Official Social Handles */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
                <a
                  href={SALON_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-champagne-300 hover:text-gold-300 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-roseBlush-400" />
                  <span>{SALON_INFO.instagramHandle}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href={SALON_INFO.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-champagne-300 hover:text-gold-300 transition-colors"
                >
                  <span className="font-bold text-xs text-cyan-400">TikTok</span>
                  <span>{SALON_INFO.tiktokHandle}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href={SALON_INFO.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-champagne-300 hover:text-rose-400 transition-colors"
                >
                  <Youtube className="w-4 h-4 text-rose-400" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
