import React, { useState } from 'react';
import { Tag, Sparkles, Calendar, ArrowRight, Copy, Check, Clock, ShieldCheck } from 'lucide-react';
import { Deal } from '../services/deals';

interface SpecialOffersProps {
  deals: Deal[];
  onClaimDeal: (dealTitle: string) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ deals, onClaimDeal }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeDeals = deals.filter((d) => d.is_active === 1);

  // Auto-hide cleanly if no active deals
  if (activeDeals.length === 0) {
    return null;
  }

  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="special-offers" className="py-12 sm:py-16 relative overflow-hidden bg-salon-950/70 border-y border-gold-500/15">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-radial-gold opacity-30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/30 bg-salon-900/80 text-xs font-semibold uppercase tracking-widest text-gold-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Limited-Time Seasonal Specials</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-champagne-100">
            Exclusive Salon <span className="text-gold-gradient italic font-cormorant font-normal">Promotions &amp; Bundles</span>
          </h2>

          <p className="text-sm sm:text-base text-champagne-300/80 font-light max-w-2xl mx-auto">
            Take advantage of seasonal masterclasses, bridal bundle packages, and aesthetic skincare packages at our Model Town studio.
          </p>
        </div>

        {/* Dynamic Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeDeals.map((deal) => {
            const badge = deal.badge || deal.badge_text || 'SPECIAL OFFER';
            const promo = deal.promo_code || deal.code;

            return (
              <div
                key={deal.id}
                className="luxury-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-gold-500/25 hover:border-gold-500/60 transition-all duration-300 relative group"
              >
                {/* Top Badge & Code */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-gold-500 to-gold-600 text-salon-950 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      <Tag className="w-3 h-3 text-salon-950" />
                      {badge}
                    </span>

                    {promo && (
                      <button
                        onClick={(e) => handleCopyCode(e, promo)}
                        className="inline-flex items-center gap-1 bg-salon-900 border border-gold-500/30 text-gold-300 px-2.5 py-1 rounded-lg text-xs font-mono hover:bg-gold-500/10 transition-colors"
                        title="Click to copy promo code"
                      >
                        <span>{promo}</span>
                        {copiedCode === promo ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-gold-400/80" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-champagne-100 group-hover:text-gold-200 transition-colors leading-snug">
                      {deal.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-champagne-300/80 font-light mt-2.5 leading-relaxed">
                      {deal.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Validity & Claim CTA */}
                <div className="pt-6 mt-6 border-t border-zinc-800/80 space-y-4">
                  {deal.valid_until && (
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5 text-gold-400/80">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Valid Until:</span>
                      </div>
                      <span className="font-medium text-champagne-200">{deal.valid_until}</span>
                    </div>
                  )}

                  <button
                    onClick={() => onClaimDeal(deal.title)}
                    className="btn-gold w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 group-hover:shadow-gold-glow transition-all"
                  >
                    <span>Claim Offer &amp; Reserve</span>
                    <ArrowRight className="w-4 h-4 text-salon-950 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SpecialOffers;
