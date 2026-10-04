import React, { useState, useRef, useCallback } from 'react';
import { BEFORE_AFTER_LOOKS } from '../data/salonData';
import { Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLook = BEFORE_AFTER_LOOKS[activeLookIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="transformations" className="py-20 bg-salon-950 relative overflow-hidden border-t border-zinc-900">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-radial-gold opacity-30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/30 bg-salon-900/60 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Real Transformations
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-champagne-100">
            Witness the <span className="text-gold-gradient italic font-cormorant">Art of Beauty</span>
          </h2>

          <p className="text-sm sm:text-base text-champagne-300/80 font-light">
            Slide the golden divider left and right to inspect the dramatic precision and skin-first artistry crafted by our expert team.
          </p>

          {/* Transformation Look Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {BEFORE_AFTER_LOOKS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                  activeLookIndex === idx
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-salon-950 border-gold-400 shadow-gold-glow'
                    : 'bg-salon-900/80 text-champagne-300 border-zinc-800 hover:border-gold-500/40 hover:text-gold-200'
                }`}
              >
                {look.title}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Showcase Container */}
        <div className="max-w-4xl mx-auto">
          
          <div className="luxury-card rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl relative">
            
            {/* Interactive Draggable Box */}
            <div
              ref={containerRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden select-none cursor-ew-resize border border-gold-500/25 bg-salon-900"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onClick={(e) => handleMove(e.clientX)}
            >
              {/* "After" Image (Full Width Base Layer) */}
              <img
                src={activeLook.afterImage}
                alt={`${activeLook.title} After`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />

              {/* "Before" Image (Clipped Layer controlled by sliderPosition) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeLook.beforeImage}
                  alt={`${activeLook.title} Before`}
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
                  }}
                />
              </div>

              {/* Draggable Divider Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 shadow-[0_0_15px_rgba(212,175,55,0.8)] pointer-events-none z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Central Handle Circular Button */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-salon-950 border-2 border-gold-400 flex items-center justify-center shadow-gold-glow">
                  <MoveHorizontal className="w-5 h-5 text-gold-300 animate-pulse" />
                </div>
              </div>

              {/* Top Floating Badge Labels */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="bg-salon-950/80 backdrop-blur-md text-champagne-200 border border-zinc-700/60 text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeLook.beforeLabel}
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <span className="bg-gold-500/90 text-salon-950 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {activeLook.afterLabel}
                </span>
              </div>

              {/* Bottom Instructions Helper */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-salon-950/70 backdrop-blur-sm px-4 py-1 rounded-full border border-gold-500/20 text-[11px] text-gold-300/80 hidden sm:flex items-center gap-1.5 pointer-events-none">
                <span>◀ Drag or click anywhere to compare ▶</span>
              </div>

            </div>

            {/* Look Details Footer */}
            <div className="mt-5 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-champagne-100">
                  {activeLook.title}
                </h3>
                <p className="text-xs sm:text-sm text-champagne-300/70 font-light">
                  {activeLook.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gold-400 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>100% Authentic In-Salon Results</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
