import React, { useState } from 'react';
import { ACADEMY_FLAGSHIP_COURSE, SALON_INFO } from '../data/salonData';
import { GraduationCap, Sparkles, ChevronDown, CheckCircle, Gift, Award, Users, MessageCircle, Calendar } from 'lucide-react';

interface AcademySectionProps {
  onOpenAcademyInquiryModal: (courseName: string) => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({ onOpenAcademyInquiryModal }) => {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const course = ACADEMY_FLAGSHIP_COURSE;

  const handleWhatsAppCourseEnroll = () => {
    const text = encodeURIComponent(
      `Hello Shine With Shiza! 🎓✨\nI saw your 50% OFF special batch offer for the *${course.title} (2 Months Hands-on Training)* at your Baby World Basement studio, Model Town Link Rd, Lahore.\nCould you please share upcoming batch start dates, timings, and admission registration details?`
    );
    window.open(`https://wa.me/${SALON_INFO.cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="academy" className="py-24 bg-salon-950 relative overflow-hidden border-t border-zinc-900">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-radial-gold opacity-20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 text-xs font-semibold tracking-widest uppercase animate-pulse">
            <GraduationCap className="w-3.5 h-3.5 text-gold-400" />
            Beautician Courses • 2-Month Hands-on Training
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-champagne-100">
            Professional Beautician Courses by <span className="text-gold-gradient italic font-cormorant">Shiza</span>
          </h2>

          <p className="text-sm sm:text-base text-champagne-300/80 font-light">
            Master professional skin prep, signature bridal &amp; party glam, eye artistry, hair rebonding, and client consultation with 100% practical training on live models at Baby World Basement, Model Town Link Rd, Lahore.
          </p>
        </div>

        {/* Course Main Feature Box */}
        <div className="luxury-card rounded-3xl p-6 sm:p-10 border-2 border-gold-500/30 shadow-2xl relative">
          
          {/* Top 50% OFF Banner */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-zinc-800/90">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-salon-950 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase shadow-md mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {course.badge}
              </div>
              <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-champagne-100">
                {course.title}
              </h3>
              <p className="text-xs sm:text-sm text-gold-300/90 mt-1 font-medium">
                {course.tagline} • {course.durationWeeks}
              </p>
            </div>

            {/* Price Card */}
            <div className="bg-salon-900/90 border border-gold-500/40 rounded-2xl p-5 sm:px-8 text-center sm:text-right shrink-0 w-full sm:w-auto">
              <span className="text-xs text-zinc-400 line-through block">
                Standard Fee: PKR {course.originalPricePKR.toLocaleString()}
              </span>
              <div className="flex items-baseline justify-center sm:justify-end gap-2 mt-1">
                <span className="font-playfair text-3xl sm:text-4xl font-black text-gold-gradient">
                  PKR {course.discountedPricePKR.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Save 50%
                </span>
              </div>
              <p className="text-[11px] text-champagne-300/60 mt-1">
                *Includes Complete Starter Practice Kit &amp; Live Models
              </p>
            </div>
          </div>

          {/* Course Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            
            {/* Left Column: Curriculum Modules Accordion */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-playfair text-xl font-bold text-gold-200">
                  Comprehensive 2-Month Practical Curriculum
                </h4>
                <span className="text-xs text-champagne-300/60 font-light">
                  Click module to view topics
                </span>
              </div>

              <div className="space-y-3">
                {course.modules.map((mod, index) => {
                  const isExpanded = expandedModule === index;
                  return (
                    <div
                      key={mod.number}
                      className="border border-zinc-800 rounded-2xl overflow-hidden bg-salon-900/40 hover:border-gold-500/30 transition-all"
                    >
                      <button
                        onClick={() => setExpandedModule(isExpanded ? null : index)}
                        className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold flex items-center justify-center shrink-0">
                            {mod.number}
                          </span>
                          <div>
                            <p className="font-medium text-sm text-champagne-100">
                              {mod.title}
                            </p>
                            <p className="text-[11px] text-champagne-300/60">{mod.duration}</p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gold-400 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-4 pt-1 border-t border-zinc-800/80 bg-salon-950/60">
                          <ul className="space-y-2 text-xs text-champagne-200/90 pt-2">
                            {mod.topics.map((topic, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Schedule Details */}
              <div className="p-4 rounded-xl bg-salon-900/60 border border-zinc-800 text-xs text-champagne-300/80">
                <span className="font-semibold text-gold-300">Class Timings &amp; Batches: </span>
                {course.classSchedule}
              </div>
            </div>

            {/* Right Column: Key Perks, Certification & Enrollment Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <h4 className="font-playfair text-xl font-bold text-gold-200">
                  What's Included in Your Training
                </h4>

                <div className="space-y-3">
                  {course.perks.map((perk, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-salon-900/50 border border-gold-500/20 flex items-center gap-3 text-xs sm:text-sm text-champagne-100"
                    >
                      <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Certification Preview Badge */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-gold-500/10 via-salon-900 to-gold-500/10 border border-gold-500/40 text-center space-y-1.5">
                  <Award className="w-8 h-8 text-gold-400 mx-auto" />
                  <p className="font-playfair text-sm font-bold text-champagne-100">
                    Professional Beautician Certification by Shiza
                  </p>
                  <p className="text-[11px] text-champagne-300/70">
                    Official salon certificate recognized for professional salon careers and freelance bridal artistry.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onOpenAcademyInquiryModal(course.title)}
                  className="btn-gold w-full py-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <Calendar className="w-4 h-4 text-salon-950" />
                  <span>Apply for 50% Off Batch</span>
                </button>

                <button
                  onClick={handleWhatsAppCourseEnroll}
                  className="w-full py-3 rounded-2xl text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Instant WhatsApp Admission Desk</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
