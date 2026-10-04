import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, FileText, Sparkles, MessageCircle, CheckCircle, Send, Loader2 } from 'lucide-react';
import { SERVICES_CATALOG, SALON_INFO, ServiceItem } from '../data/salonData';
import { API_BASE_URL, buildApiUrl } from '../config/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  isAcademyInquiry?: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  isAcademyInquiry = false,
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(initialService || SERVICES_CATALOG[0].title);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('02:00 PM');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [notes, setNotes] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initial service when opened
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  // Set default date to tomorrow in YYYY-MM-DD format
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Keyboard Escape listener (light dismiss)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timeSlots = [
    '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'
  ];

  // Helper for generating sanitized WhatsApp message
  const handleWhatsAppInstantBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name and phone number to continue.');
      return;
    }

    let messageText = '';
    if (isAcademyInquiry) {
      messageText = [
        `🎓 *BEAUTICIAN COURSE INQUIRY (50% OFF)* 🎓`,
        `*Shine With Shiza (Baby World Basement, Lahore)*`,
        `----------------------------------------`,
        `👩‍🎓 *Student:* ${clientName.trim()}`,
        `📱 *Contact:* ${phone.trim()}`,
        `📚 *Course:* ${selectedService}`,
        `⭐ *Experience Level:* ${experienceLevel}`,
        notes.trim() ? `💬 *Notes:* ${notes.trim()}` : ``,
        `----------------------------------------`,
        `_Requesting admission confirmation & batch schedule._`
      ].filter(Boolean).join('\n');
    } else {
      messageText = [
        `✨ *SALON APPOINTMENT REQUEST* ✨`,
        `*Shine With Shiza (Baby World Basement, Lahore)*`,
        `----------------------------------------`,
        `👑 *Client:* ${clientName.trim()}`,
        `📞 *Phone:* ${phone.trim()}`,
        `💄 *Service:* ${selectedService}`,
        `📅 *Date:* ${date}`,
        `⏰ *Time Slot:* ${timeSlot}`,
        notes.trim() ? `📝 *Notes:* ${notes.trim()}` : ``,
        `----------------------------------------`,
        `_Booked via Shine With Shiza Web Engine_`
      ].filter(Boolean).join('\n');
    }

    const waUrl = `https://wa.me/${SALON_INFO.cleanPhone}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
    setSuccessMessage('WhatsApp opened! Our team will confirm your slot immediately.');
  };

  // Helper for online form submission to the backend API
  const handleOnlineFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      setErrorMessage('Please fill in your name and phone number.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const path = isAcademyInquiry ? '/api/courses' : '/api/bookings';
      const payload = isAcademyInquiry
        ? {
            student_name: clientName.trim(),
            studentName: clientName.trim(),
            phone: phone.trim(),
            course_name: selectedService,
            courseName: selectedService,
            experience_level: experienceLevel,
            experienceLevel,
            notes: notes.trim(),
          }
        : {
            client_name: clientName.trim(),
            clientName: clientName.trim(),
            phone: phone.trim(),
            service: selectedService,
            preferred_date: date,
            date,
            preferred_time: timeSlot,
            time: timeSlot,
            notes: notes.trim(),
          };

      let response: Response;
      const targetUrl = buildApiUrl(path);
      try {
        response = await fetch(targetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (proxyErr) {
        // Fallback to relative endpoint or local dev port
        try {
          response = await fetch(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } catch (relativeErr) {
          response = await fetch(`http://localhost:8787${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        }
      }

      if (response.ok) {
        setSuccessMessage(
          isAcademyInquiry
            ? 'Application submitted! Our admissions counselor will contact you via WhatsApp shortly.'
            : 'Appointment request received! You will receive an SMS & WhatsApp confirmation shortly.'
        );
      } else {
        const errData = await response.json().catch(() => ({}));
        setErrorMessage(errData.error || 'Failed to submit booking. Please try WhatsApp directly.');
      }
    } catch (err: any) {
      setErrorMessage('Unable to reach server. Please use WhatsApp booking button for instant confirmation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="luxury-card w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-salon-950/95 border-2 border-gold-500/40 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-champagne-300 hover:text-gold-300 hover:bg-zinc-800 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-6 border-b border-zinc-800/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            {isAcademyInquiry ? 'Beautician Course Admission' : 'VIP Salon Reservation'}
          </div>
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-champagne-100">
            {isAcademyInquiry ? 'Apply for Beautician Course' : 'Book Your Glam Session'}
          </h3>
          <p className="text-xs sm:text-sm text-champagne-300/70 mt-1 font-light">
            Baby World Basement, Model Town Link Rd, Opp. Amanah Mall, Lahore
          </p>
        </div>

        {/* Success Confirmation State */}
        {successMessage ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h4 className="font-playfair text-xl font-bold text-champagne-100">
              Reservation Submitted!
            </h4>
            <p className="text-sm text-champagne-300/80 max-w-md mx-auto">
              {successMessage}
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSuccessMessage(null);
                  onClose();
                }}
                className="btn-gold px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form className="space-y-4 pt-5">
            
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs text-center">
                {errorMessage}
              </div>
            )}

            {/* Service / Course Selector */}
            <div>
              <label className="block text-xs font-medium text-gold-300 uppercase tracking-wider mb-1.5">
                {isAcademyInquiry ? 'Select Course Masterclass' : 'Select Desired Service'}
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-salon-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-champagne-100 focus:outline-none focus:border-gold-400"
              >
                {isAcademyInquiry ? (
                  <>
                    <option value="Basic to Advance Beautician Masterclass (50% Off)">
                      Basic to Advance Beautician Masterclass (50% OFF - PKR 35,000)
                    </option>
                    <option value="Signature Bridal Eye & Hair Styling Masterclass">
                      Signature Bridal Eye &amp; Hair Styling Masterclass (2 Weeks)
                    </option>
                    <option value="Self-Grooming & Everyday Glam Workshop">
                      Self-Grooming &amp; Everyday Glam Workshop (Weekend)
                    </option>
                  </>
                ) : (
                  SERVICES_CATALOG.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title} ({srv.formattedPrice})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Name & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-champagne-300 mb-1">
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Ali"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-salon-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-champagne-100 placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-champagne-300 mb-1">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>WhatsApp Phone</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-salon-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-champagne-100 placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            {/* Date & Time (for Salon Appointments) or Experience Level (for Academy) */}
            {!isAcademyInquiry ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-champagne-300 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-salon-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-champagne-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-champagne-300 mb-1">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-salon-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-champagne-100 focus:outline-none focus:border-gold-400"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-champagne-300 mb-1">
                  Prior Experience in Makeup or Hair Styling
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full bg-salon-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-champagne-100 focus:outline-none focus:border-gold-400"
                >
                  <option value="Complete Beginner (No prior experience)">
                    Complete Beginner (Zero prior experience)
                  </option>
                  <option value="Self-Taught / Enthusiast">
                    Self-Taught / Makeup Enthusiast
                  </option>
                  <option value="Intermediate Working Beautician">
                    Working Beautician / Looking to upgrade to bridal HD skills
                  </option>
                </select>
              </div>
            )}

            {/* Special Instructions or Wedding Details */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-champagne-300 mb-1">
                <FileText className="w-3.5 h-3.5 text-gold-400" />
                <span>Special Requests / Outfit Color / Preferred Artist</span>
              </label>
              <textarea
                rows={2}
                placeholder="Mention your event date, jewelry draping needs, or batch preference..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-salon-900 border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-champagne-100 placeholder-zinc-500 focus:outline-none focus:border-gold-400 resize-none"
              />
            </div>

            {/* Dual Conversion Engine CTAs */}
            <div className="pt-3 space-y-2.5">
              {/* WhatsApp 1-Click Instant Action */}
              <button
                type="button"
                onClick={handleWhatsAppInstantBooking}
                className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 text-emerald-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-950" />
                <span>Instant 1-Click WhatsApp Booking ⚡</span>
              </button>

              {/* Online Form Submission Fallback */}
              <button
                type="button"
                onClick={handleOnlineFormSubmit}
                disabled={loading}
                className="w-full py-3 rounded-2xl text-xs font-semibold text-champagne-200 bg-salon-900 hover:bg-salon-800 border border-gold-500/30 hover:border-gold-500/60 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-400" />
                    <span>Recording Booking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-gold-400" />
                    <span>Submit Online (Receive Confirmation SMS/Call)</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-center text-champagne-300/50 pt-1">
              🔒 Your phone number is kept strictly confidential. No spam guaranteed.
            </p>

          </form>
        )}

      </div>
    </div>
  );
};
