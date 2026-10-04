import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { BridalShowcase } from './components/BridalShowcase';
import { ServicesSection } from './components/ServicesSection';
import { AcademySection } from './components/AcademySection';
import { LocationSection } from './components/LocationSection';
import { Testimonials } from './components/Testimonials';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceItem } from './data/salonData';

export const App: React.FC = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState<string | undefined>(undefined);
  const [isAcademyInquiry, setIsAcademyInquiry] = useState(false);

  // Open booking modal for standard salon appointment
  const handleOpenSalonBooking = (serviceTitle?: string) => {
    setIsAcademyInquiry(false);
    setSelectedServiceName(serviceTitle);
    setBookingModalOpen(true);
  };

  // Open booking modal for Academy course application
  const handleOpenAcademyInquiry = (courseTitle?: string) => {
    setIsAcademyInquiry(true);
    setSelectedServiceName(courseTitle || 'Basic to Advance Beautician Course (50% Off)');
    setBookingModalOpen(true);
  };

  // Smooth scroll helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-salon-950 text-champagne-100 selection:bg-gold-500 selection:text-salon-950 font-sans relative">
      
      {/* 50% Off Course Announcement Bar */}
      <AnnouncementBar
        onOpenAcademy={() => handleNavigateSection('academy')}
        onOpenBooking={() => handleOpenSalonBooking()}
      />

      {/* Main Luxury Sticky Header */}
      <Navbar
        onOpenBooking={() => handleOpenSalonBooking()}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Section */}
      <main>
        <Hero
          onOpenBooking={() => handleOpenSalonBooking()}
          onExploreAcademy={() => handleNavigateSection('academy')}
        />

        {/* Draggable Before & After Transformation Slider */}
        <BeforeAfterSlider />

        {/* Regal Baroque Bridal Studio Showcase */}
        <BridalShowcase
          onSelectBridalPackage={(pkgName) => handleOpenSalonBooking(pkgName)}
        />

        {/* Full Filterable Services & Pricing Menu */}
        <ServicesSection
          onSelectServiceForBooking={(service: ServiceItem) => handleOpenSalonBooking(service.title)}
        />

        {/* Shine Academy (50% Off Beautician Masterclasses) */}
        <AcademySection
          onOpenAcademyInquiryModal={(courseName) => handleOpenAcademyInquiry(courseName)}
        />

        {/* Real Bride & Academy Alumni Testimonials */}
        <Testimonials />

        {/* Model Town Link Road Lahore Studio & Landmarks */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating 1-Click WhatsApp Button */}
      <WhatsAppFloat />

      {/* Interactive Booking & Course Admission Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={selectedServiceName}
        isAcademyInquiry={isAcademyInquiry}
      />

    </div>
  );
};

export default App;
