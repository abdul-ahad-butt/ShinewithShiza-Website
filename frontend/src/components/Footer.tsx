import React from 'react';
import { SALON_INFO } from '../data/salonData';
import { Instagram, Youtube, Phone, MapPin, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-salon-950 border-t border-gold-500/20 pt-16 pb-12 relative overflow-hidden text-champagne-300">
      
      {/* Background radial gold */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-radial-gold opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-700 shadow-gold-glow">
                <img
                  src="/logo.svg"
                  alt="Shine With Shiza Logo"
                  className="w-full h-full rounded-full object-cover bg-salon-950"
                />
              </div>
              <div>
                <span className="font-playfair text-xl font-bold tracking-wider text-gold-gradient block">
                  SHINE WITH SHIZA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-champagne-300 uppercase block">
                  Beauty Salon
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-champagne-300/75 font-light leading-relaxed">
              Lahore’s premier beauty sanctuary for royal bridal transformations, party glam, advanced hair &amp; HydraFacial clinics, and certified beautician masterclasses under Master Artist Shiza.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SALON_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-salon-900 border border-zinc-800 hover:border-gold-500/50 flex items-center justify-center text-champagne-300 hover:text-gold-300 transition-colors"
                title="Follow on Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={SALON_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 h-9 rounded-xl bg-salon-900 border border-zinc-800 hover:border-gold-500/50 flex items-center justify-center text-xs font-semibold text-champagne-300 hover:text-cyan-400 transition-colors"
                title="Follow on TikTok"
                aria-label="TikTok"
              >
                TikTok
              </a>

              <a
                href={SALON_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-salon-900 border border-zinc-800 hover:border-gold-500/50 flex items-center justify-center text-champagne-300 hover:text-rose-400 transition-colors"
                title="Watch on YouTube"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={`tel:${SALON_INFO.cleanPhone}`}
                className="w-9 h-9 rounded-xl bg-salon-900 border border-zinc-800 hover:border-gold-500/50 flex items-center justify-center text-champagne-300 hover:text-gold-300 transition-colors"
                title="Call Salon"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-playfair font-bold text-sm text-gold-300 uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#bridal" className="hover:text-gold-300 transition-colors">
                  Bridal Studio
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold-300 transition-colors">
                  Services &amp; Pricing
                </a>
              </li>
              <li>
                <a href="#academy" className="hover:text-gold-300 transition-colors">
                  Beautician Courses (50% Off)
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-gold-300 transition-colors">
                  Before &amp; After Slider
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-gold-300 transition-colors">
                  Location &amp; Timings
                </a>
              </li>
            </ul>
          </div>

          {/* Salon Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-playfair font-bold text-sm text-gold-300 uppercase tracking-wider">
              Signature Treatments
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Barat &amp; Walima Royal Makeovers</li>
              <li>HD Soft Glam Party Makeup</li>
              <li>Brazilian Keratin &amp; Protein Rebonding</li>
              <li>9-Step 24K Gold HydraFacial</li>
              <li>Bridal Dupatta &amp; Jewelry Setting</li>
              <li>Basic to Advance Beautician Course</li>
            </ul>
          </div>

          {/* Location & Operating Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-playfair font-bold text-sm text-gold-300 uppercase tracking-wider">
              Studio Location
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Baby World Basement, Model Town Link Rd, Opp. Amanah Mall, near Jalal Sons, Lahore.
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Monday – Sunday: 11:00 AM – 08:30 PM</span>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <a href={`tel:${SALON_INFO.cleanPhone}`} className="hover:text-gold-300 transition-colors">
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Design Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-champagne-300/60 gap-4">
          <p>
            © {new Date().getFullYear()} Shine With Shiza (Beauty Salon). All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Crafted with royal elegance for Lahore's finest brides</span>
            <Heart className="w-3 h-3 text-roseBlush-400 fill-roseBlush-400 inline" />
          </p>
        </div>

      </div>
    </footer>
  );
};
