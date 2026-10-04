import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Tag, ChevronLeft, ChevronRight, X, Copy, Check } from 'lucide-react';
import { DealsClientAPI, Deal } from '../services/deals';

interface AnnouncementBarProps {
  onOpenAcademy: () => void;
  onOpenBooking: () => void;
  initialDeals?: Deal[];
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onOpenAcademy,
  onOpenBooking,
  initialDeals
}) => {
  const [deals, setDeals] = useState<Deal[]>(initialDeals || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Fetch active banners from live backend
  const fetchBanners = async () => {
    try {
      const active = await DealsClientAPI.getActiveDeals();
      // Filter deals targeted for banner or all
      const bannerDeals = active.filter(
        (d) => d.is_active === 1 && (!d.target_section || d.target_section === 'all' || d.target_section === 'banner')
      );
      setDeals(bannerDeals);
    } catch (err) {
      console.error('Failed to fetch announcement banners:', err);
    }
  };

  useEffect(() => {
    fetchBanners();

    // Poll periodically every 15 seconds to reflect real-time admin changes instantly
    const interval = setInterval(fetchBanners, 15000);
    const handleFocus = () => fetchBanners();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Auto-rotate if multiple banners
  useEffect(() => {
    if (deals.length <= 1) return;
    const rotateTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deals.length);
    }, 6000);
    return () => clearInterval(rotateTimer);
  }, [deals.length]);

  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // If dismissed or no active banners, smoothly auto-hide completely
  if (isDismissed || deals.length === 0) {
    return null;
  }

  const currentDeal = deals[currentIndex] || deals[0];
  const badgeText = currentDeal.badge || currentDeal.badge_text || 'LIMITED OFFER';
  const promoCode = currentDeal.promo_code || currentDeal.code;

  return (
    <aside
      aria-label="Promotional announcements"
      className="bg-gradient-to-r from-salon-950 via-gold-950/80 to-salon-950 border-b border-gold-500/30 text-xs sm:text-sm py-2 px-3 sm:px-4 relative z-50 transition-all duration-300 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Previous Button (if multiple banners) */}
        {deals.length > 1 && (
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + deals.length) % deals.length)}
            className="hidden md:flex p-1 text-zinc-400 hover:text-gold-300 rounded hover:bg-gold-500/10 transition-colors shrink-0"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Center Banner Content */}
        <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left min-w-0">
          
          {/* Badge Pill */}
          <span className="inline-flex items-center gap-1 bg-gold-500/20 text-gold-300 border border-gold-500/40 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase animate-pulse shrink-0">
            <Tag className="w-3 h-3 text-gold-400" />
            {badgeText}
          </span>

          {/* Deal Title */}
          <span className="text-champagne-100 font-medium truncate max-w-full sm:max-w-xl">
            {currentDeal.title}
          </span>

          {/* Promo Code Pill (if available) */}
          {promoCode && (
            <button
              onClick={(e) => handleCopyCode(e, promoCode)}
              className="inline-flex items-center gap-1 bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/30 px-2 py-0.5 rounded text-[11px] font-mono text-gold-300 transition-colors"
              title="Click to copy promo code"
            >
              <span>{promoCode}</span>
              {copiedCode === promoCode ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-gold-400/80" />
              )}
            </button>
          )}

          {/* Multi-banner Dots (on mobile) */}
          {deals.length > 1 && (
            <div className="flex md:hidden items-center gap-1 pl-1">
              {deals.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentIndex ? 'bg-gold-400 w-3' : 'bg-zinc-600'
                  }`}
                />
              ))}
            </div>
          )}

        </div>

        {/* Action CTAs & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Action Link: Curriculum or Inclusions */}
          <button
            onClick={() => {
              if (currentDeal.title.toLowerCase().includes('course') || currentDeal.title.toLowerCase().includes('beautician')) {
                onOpenAcademy();
              } else {
                onOpenBooking();
              }
            }}
            className="hidden sm:flex text-gold-300 hover:text-gold-200 font-semibold items-center gap-1 transition-colors text-xs underline-offset-4 hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Details</span>
          </button>

          <span className="hidden sm:inline text-zinc-700">|</span>

          {/* Reserve Slot Button */}
          <button
            onClick={onOpenBooking}
            className="text-champagne-100 hover:text-gold-300 font-medium flex items-center gap-1 transition-colors text-xs bg-gold-500/10 hover:bg-gold-500/20 px-2.5 py-1 rounded-full border border-gold-500/20"
          >
            <span>Reserve Slot</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
          </button>

          {/* Next Button (if multiple banners) */}
          {deals.length > 1 && (
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % deals.length)}
              className="hidden md:flex p-1 text-zinc-400 hover:text-gold-300 rounded hover:bg-gold-500/10 transition-colors"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-zinc-500 hover:text-zinc-300 rounded hover:bg-zinc-800/60 transition-colors ml-1"
            title="Dismiss announcement"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </aside>
  );
};

export default AnnouncementBar;
