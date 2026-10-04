import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Sparkles, Instagram, Youtube } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Bridal Studio', id: 'bridal' },
    { name: 'Services & Pricing', id: 'services' },
    { name: 'Beautician Courses', id: 'academy', badge: '50% OFF' },
    { name: 'Transformations', id: 'transformations' },
    { name: 'Studio & Location', id: 'location' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-salon-950/90 backdrop-blur-md border-b border-gold-500/25 shadow-lg shadow-black/50 py-3'
          : 'bg-gradient-to-b from-salon-950/95 via-salon-950/80 to-transparent border-b border-gold-500/10 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Signature Header */}
          <a
            href="#"
            className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full p-0.5 bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-700 shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.svg"
                alt="Shine With Shiza Logo"
                className="w-full h-full rounded-full object-cover bg-salon-950"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-lg sm:text-xl font-bold tracking-wider text-gold-gradient group-hover:opacity-90 transition-opacity">
                SHINE WITH SHIZA
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-champagne-300 uppercase opacity-90">
                Beauty Salon
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="relative text-sm font-medium text-champagne-200 hover:text-gold-300 transition-colors duration-200 py-1 group flex items-center gap-1.5 focus:outline-none"
              >
                {link.name}
                {link.badge && (
                  <span className="bg-gold-500/20 text-gold-300 border border-gold-500/30 text-[10px] px-1.5 py-0.2 rounded-full font-semibold">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Social Icons */}
            <div className="flex items-center gap-1.5 pr-1 border-r border-zinc-800">
              <a
                href={SALON_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-salon-900/60 border border-zinc-800 hover:border-gold-500/40 flex items-center justify-center text-champagne-300 hover:text-gold-300 transition-all"
                title="Follow on Instagram"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={SALON_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 px-2 rounded-lg bg-salon-900/60 border border-zinc-800 hover:border-gold-500/40 flex items-center justify-center text-[11px] font-bold text-champagne-300 hover:text-cyan-400 transition-all"
                title="Follow on TikTok"
                aria-label="TikTok Profile"
              >
                TT
              </a>
              <a
                href={SALON_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-salon-900/60 border border-zinc-800 hover:border-gold-500/40 flex items-center justify-center text-champagne-300 hover:text-rose-400 transition-all"
                title="Watch on YouTube"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>

            <a
              href={`tel:${SALON_INFO.cleanPhone}`}
              className="flex items-center gap-2 text-xs font-medium text-champagne-300 hover:text-gold-300 px-3 py-2 rounded-lg border border-zinc-800 bg-salon-900/60 hover:border-gold-500/30 transition-all"
              title="Call Salon directly"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>{SALON_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="btn-gold px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 uppercase shadow-gold-glow"
            >
              <Calendar className="w-3.5 h-3.5 text-salon-950" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="btn-gold px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-salon-950" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-champagne-200 hover:text-gold-400 focus:outline-none bg-salon-900/80 border border-zinc-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-salon-950/98 border-b border-gold-500/25 px-5 pt-4 pb-6 space-y-3 backdrop-blur-xl animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-champagne-200 hover:text-gold-300 hover:bg-gold-500/10 transition-colors flex items-center justify-between"
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="bg-gold-500/20 text-gold-300 border border-gold-500/30 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
          
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-3">
            <a
              href={`tel:${SALON_INFO.cleanPhone}`}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-champagne-200 bg-salon-900 border border-zinc-800 rounded-lg"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call Us: {SALON_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-gold w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-salon-950" />
              <span>Book Salon Appointment</span>
            </button>
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href={SALON_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg bg-salon-900 border border-zinc-800 hover:border-gold-500/40 flex items-center justify-center gap-1.5 text-xs text-champagne-300"
              >
                <Instagram className="w-3.5 h-3.5 text-roseBlush-400" />
                <span>Instagram</span>
              </a>
              <a
                href={SALON_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg bg-salon-900 border border-zinc-800 hover:border-gold-500/40 flex items-center justify-center gap-1.5 text-xs text-champagne-300"
              >
                <span className="font-bold text-[11px] text-cyan-400">TT</span>
                <span>TikTok</span>
              </a>
              <a
                href={SALON_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg bg-salon-900 border border-zinc-800 hover:border-gold-500/40 flex items-center justify-center gap-1.5 text-xs text-champagne-300"
              >
                <Youtube className="w-3.5 h-3.5 text-rose-400" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
