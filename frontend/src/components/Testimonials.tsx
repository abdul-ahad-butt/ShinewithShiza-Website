import React from 'react';
import { TESTIMONIALS } from '../data/salonData';
import { Star, Quote, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-salon-950 relative overflow-hidden border-t border-zinc-900">
      
      {/* Background radial gold */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-radial-gold opacity-15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gold-500/30 bg-salon-900/60 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Client Love &amp; Reviews
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-champagne-100">
            Celebrated by <span className="text-gold-gradient italic font-cormorant">Lahore's Elite</span>
          </h2>

          <p className="text-sm sm:text-base text-champagne-300/80 font-light">
            Read authentic 4.9★ reviews from radiant brides, everyday glam clients, and beauticians trained by Shiza in Lahore.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="luxury-card rounded-3xl p-7 flex flex-col justify-between border border-zinc-800 hover:border-gold-500/40 transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-champagne-200/90 leading-relaxed font-light italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-playfair font-bold text-base text-champagne-100">
                    {item.client}
                  </h4>
                  <p className="text-xs text-gold-400 font-medium mt-0.5">
                    {item.role}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <Quote className="w-4 h-4 text-gold-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
