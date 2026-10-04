import React from 'react';
import { Deal } from '../services/api';
import { Tag, Sparkles, Check, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';

interface DealManagerProps {
  deals: Deal[];
  onToggleDeal: (id: string, isActive: boolean) => void;
}

export const DealManager: React.FC<DealManagerProps> = ({ deals, onToggleDeal }) => {
  return (
    <div className="luxury-card rounded-2xl border border-zinc-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <h3 className="font-playfair text-xl font-bold text-champagne-100 flex items-center gap-2">
            <Tag className="w-5 h-5 text-gold-400" />
            <span>Deals &amp; Announcement Controller</span>
          </h3>
          <p className="text-xs text-champagne-300/70 font-light mt-0.5">
            Toggle promotional banners shown on the client website announcement bar &amp; courses section.
          </p>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {deals.map((deal) => {
          const isActive = deal.is_active === 1;
          return (
            <div
              key={deal.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isActive
                  ? 'bg-salon-900/80 border-gold-500/40 shadow-sm'
                  : 'bg-salon-950/60 border-zinc-800 opacity-60'
              }`}
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive
                        ? 'bg-gold-500 text-salon-950'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {deal.badge_text || `${deal.discount_pct}% OFF`}
                  </span>
                  {deal.code && (
                    <span className="font-mono text-xs text-gold-300 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                      Promo Code: {deal.code}
                    </span>
                  )}
                </div>

                <h4 className="font-playfair font-bold text-base text-champagne-100">
                  {deal.title}
                </h4>

                <p className="text-xs text-champagne-300/80 font-light">
                  {deal.description}
                </p>

                {deal.valid_until && (
                  <p className="text-[11px] text-zinc-400">
                    Valid Until: {deal.valid_until}
                  </p>
                )}
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className={`text-xs font-semibold ${isActive ? 'text-gold-300' : 'text-zinc-500'}`}>
                  {isActive ? 'Banner Active' : 'Disabled'}
                </span>
                <button
                  onClick={() => onToggleDeal(deal.id, !isActive)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none ${
                    isActive ? 'bg-gradient-to-r from-gold-500 to-gold-600' : 'bg-zinc-800'
                  }`}
                  aria-label="Toggle deal active status"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                      isActive ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
