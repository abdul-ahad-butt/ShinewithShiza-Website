import React, { useState } from 'react';
import { SERVICES_CATALOG, ServiceItem, SALON_INFO } from '../data/salonData';
import { Clock, Check, Sparkles, MessageCircle, Calendar } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'bridal', label: 'Bridal & Nikkah' },
    { id: 'party', label: 'Party Makeup' },
    { id: 'hair', label: 'Hair & Keratin' },
    { id: 'skin', label: 'Skin & HydraFacials' },
    { id: 'nails', label: 'Nails & Lash' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES_CATALOG
    : SERVICES_CATALOG.filter(s => s.category === selectedCategory);

  const handleWhatsAppQuickBooking = (service: ServiceItem) => {
    const message = encodeURIComponent(
      `Hello Shine with Shiza! ✨\nI am interested in booking *${service.title}* (${service.formattedPrice}) at your Model Town Link Road studio in Lahore.\nCould you please let me know the available time slots?`
    );
    window.open(`https://wa.me/${SALON_INFO.cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <section id="services" className="py-20 bg-salon-950 relative overflow-hidden">
      
      {/* Background radial gold sheen */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-radial-gold opacity-20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gold-500/30 bg-salon-900/60 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Curated Salon Menu
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-champagne-100">
            Luxury Salon <span className="text-gold-gradient italic font-cormorant">Offerings &amp; Pricing</span>
          </h2>

          <p className="text-sm sm:text-base text-champagne-300/80 font-light">
            Indulge in couture bridal artistry, medical-grade skin rejuvenation, and transformative hair therapy performed with world-class products.
          </p>

          {/* Filter Categories Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-salon-950 border-gold-400 shadow-gold-glow'
                    : 'bg-salon-900/70 text-champagne-300 border-zinc-800 hover:border-gold-500/40 hover:text-gold-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="luxury-card rounded-2xl overflow-hidden flex flex-col group border border-zinc-800/80 hover:border-gold-500/40 transition-all duration-300"
            >
              {/* Card Image Header */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-salon-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-salon-950 via-salon-950/40 to-transparent" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-salon-950/80 backdrop-blur-md text-champagne-200 border border-gold-500/30 text-[10px] font-medium tracking-wider px-2.5 py-1 rounded-full uppercase">
                    {service.categoryLabel}
                  </span>
                </div>

                {/* Popular or Signature Badge */}
                {service.tag && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-gold-500 to-gold-600 text-salon-950 text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase shadow-md">
                      {service.tag}
                    </span>
                  </div>
                )}

                {/* Price Display */}
                <div className="absolute bottom-3 left-4">
                  <p className="text-[11px] text-gold-300/80 uppercase tracking-widest font-medium">Starts From</p>
                  <p className="font-playfair text-xl sm:text-2xl font-bold text-gold-200">
                    {service.formattedPrice}
                  </p>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[11px] text-champagne-300/80 bg-salon-950/70 px-2 py-0.5 rounded-md backdrop-blur-xs border border-zinc-800">
                  <Clock className="w-3 h-3 text-gold-400" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-champagne-100 group-hover:text-gold-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-champagne-300/70 font-light mt-1.5 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2 border-t border-zinc-800/60">
                  {service.highlights.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-champagne-200/90">
                      <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons: Modal Booking + Direct WhatsApp */}
                <div className="pt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectServiceForBooking(service)}
                    className="btn-gold py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-salon-950" />
                    <span>Reserve</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppQuickBooking(service)}
                    className="py-2.5 px-3 rounded-xl text-xs font-medium text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center justify-center gap-1.5"
                    title="Inquire directly on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
