import React from 'react';
import { BRIDAL_PACKAGES, BridalPackage, SALON_INFO } from '../data/salonData';
import { Crown, Sparkles, Check, HeartHandshake, ShieldCheck, Calendar, MessageCircle } from 'lucide-react';

interface BridalShowcaseProps {
  onSelectBridalPackage: (packageName: string) => void;
}

export const BridalShowcase: React.FC<BridalShowcaseProps> = ({ onSelectBridalPackage }) => {
  const handleBridalWhatsApp = (pkg: BridalPackage) => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Shine with Shiza! 👰✨\nI am planning my wedding in Lahore and would like to inquire about booking the *${pkg.name}* (${pkg.pricePKR}).\nCould you please share slot availability for upcoming wedding dates?`
    );
    window.open(`https://wa.me/${SALON_INFO.cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="bridal" className="py-24 bg-salon-950 relative overflow-hidden border-t border-zinc-900">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-gold opacity-15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-roseBlush-400/30 bg-roseBlush-500/10 text-roseBlush-300 text-xs font-semibold tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5 text-roseBlush-400" />
            The Couture Bridal Studio
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-champagne-100">
            Royal Baroque <span className="text-gold-gradient italic font-cormorant">Bridal Makeovers</span>
          </h2>

          <p className="text-sm sm:text-base text-champagne-300/80 font-light leading-relaxed">
            Every bride is a masterpiece. Master artist Shiza brings you iconic high-definition makeup, intricate royal dupatta draping, and jewelry setting engineered to stay pristine from morning rukhsati till night.
          </p>
        </div>

        {/* 3 Regal Bridal Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRIDAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-salon-800 via-salon-900 to-salon-950 border-2 border-gold-400 shadow-gold-glow scale-[1.02] z-10'
                  : 'luxury-card border border-zinc-800 hover:border-gold-500/40'
              }`}
            >
              {/* Most Popular Badge */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-salon-950 font-bold text-xs px-4 py-1 rounded-full tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Title & Subtitle */}
                <div className="text-center pb-6 border-b border-zinc-800/80">
                  <h3 className="font-playfair text-2xl font-bold text-champagne-100">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-gold-300/80 font-medium tracking-wide mt-1">
                    {pkg.subtitle}
                  </p>
                  <div className="mt-4">
                    <span className="font-playfair text-3xl sm:text-4xl font-bold text-gold-gradient">
                      {pkg.pricePKR}
                    </span>
                    <span className="block text-[11px] text-champagne-300/60 uppercase tracking-widest mt-0.5">
                      Per Signature Session
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-champagne-300/80 font-light py-4 italic text-center">
                  "{pkg.description}"
                </p>

                {/* Inclusions Checklist */}
                <div className="space-y-2.5 pt-2">
                  <p className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold">
                    Complete Royal Inclusions:
                  </p>
                  {pkg.includes.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-champagne-200">
                      <div className="w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5 border border-gold-500/40">
                        <Check className="w-2.5 h-2.5 text-gold-400" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 space-y-2.5">
                <button
                  onClick={() => onSelectBridalPackage(pkg.name)}
                  className={`w-full py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    pkg.isPopular
                      ? 'btn-gold shadow-gold-glow'
                      : 'btn-gold-outline'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Bridal Date</span>
                </button>

                <button
                  onClick={() => handleBridalWhatsApp(pkg)}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-emerald-300 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Bridal WhatsApp Inquiry</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bridal Salon Promises Callout */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-salon-900/90 via-salon-850 to-salon-900/90 border border-gold-500/30 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="font-playfair font-bold text-champagne-100 text-base">100% Original Products</h4>
              <p className="text-xs text-champagne-300/70 font-light">Only Charlotte Tilbury, Huda Beauty, NARS &amp; MAC.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-roseBlush-500/15 border border-roseBlush-400/30 flex items-center justify-center shrink-0">
              <Crown className="w-6 h-6 text-roseBlush-300" />
            </div>
            <div>
              <h4 className="font-playfair font-bold text-champagne-100 text-base">VIP Bridal Suite</h4>
              <p className="text-xs text-champagne-300/70 font-light">Private bridal lounge with refreshments &amp; dressing assistance.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h4 className="font-playfair font-bold text-champagne-100 text-base">Dupatta &amp; Jewelry Setting</h4>
              <p className="text-xs text-champagne-300/70 font-light">Weightless, pin-secured draping that stays all day.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
