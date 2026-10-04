import React, { useState, useEffect } from 'react';
import { AuthGate } from './components/AuthGate';
import { Sidebar } from './components/Sidebar';
import { MetricCards } from './components/MetricCards';
import { BookingTable } from './components/BookingTable';
import { CourseInquiriesTable } from './components/CourseInquiriesTable';
import { DealManager } from './components/DealManager';
import { QuickWalkInModal } from './components/QuickWalkInModal';
import { AdminAPI, Booking, CourseInquiry, Deal } from './services/api';
import { AuthUtils } from './utils/auth';
import { RefreshCw, Bell, User, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => AuthUtils.isAuthenticated());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'courses' | 'deals'>('dashboard');
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<CourseInquiry[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bData, iData, dData] = await Promise.all([
        AdminAPI.getBookings(),
        AdminAPI.getCourseInquiries(),
        AdminAPI.getDeals()
      ]);
      setBookings(bData);
      setInquiries(iData);
      setDeals(dData);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    await AdminAPI.updateBookingStatus(id, status);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this booking?')) {
      await AdminAPI.deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleAddWalkInBooking = async (data: Omit<Booking, 'id' | 'created_at'>) => {
    const created = await AdminAPI.createBooking(data);
    setBookings((prev) => [created, ...prev]);
  };

  const handleUpdateCourseStatus = async (id: string, status: CourseInquiry['status']) => {
    await AdminAPI.updateCourseInquiryStatus(id, status);
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  const handleToggleDeal = async (id: string, isActive: boolean) => {
    await AdminAPI.toggleDeal(id, isActive);
    setDeals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, is_active: isActive ? 1 : 0 } : d))
    );
  };

  if (!isAuthenticated) {
    return <AuthGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-salon-950 text-champagne-100 flex font-sans">
      
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenWalkInModal={() => setIsWalkInModalOpen(true)}
        onLogout={() => {
          AuthUtils.clearSession();
          setIsAuthenticated(false);
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Bar */}
        <header className="h-18 bg-salon-950/80 backdrop-blur-md border-b border-zinc-800/80 px-8 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-playfair text-xl font-bold text-champagne-100 flex items-center gap-2">
              <span>Shine with Shiza Reception &amp; Manager Control</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h1>
            <p className="text-xs text-champagne-300/70 font-light">
              Model Town Link Road, Opposite Amanah Mall, Lahore
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-xl bg-salon-900 border border-zinc-800 text-zinc-400 hover:text-gold-300 hover:border-gold-500/30 transition-all flex items-center gap-1.5 text-xs"
              title="Refresh data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-gold-400' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-salon-950 flex items-center justify-center text-xs font-bold text-gold-300">
                  SS
                </div>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-champagne-100">Salon Desk</p>
                <p className="text-[10px] text-gold-400">Head Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <main className="p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Top KPI Cards (Always visible on Dashboard, or toggled) */}
          <MetricCards bookings={bookings} inquiries={inquiries} />

          {/* Tab 1: Dashboard Overview (Shows both Bookings & Academy) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="font-playfair text-xl font-bold text-champagne-100">
                  Recent Salon Appointments
                </h3>
                <BookingTable
                  bookings={bookings}
                  onUpdateStatus={handleUpdateBookingStatus}
                  onDeleteBooking={handleDeleteBooking}
                />
              </div>

              <div className="space-y-3">
                <CourseInquiriesTable
                  inquiries={inquiries}
                  onUpdateStatus={handleUpdateCourseStatus}
                />
              </div>
            </div>
          )}

          {/* Tab 2: Bookings Manager Only */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-champagne-100">
                  Salon Client Bookings
                </h2>
                <p className="text-xs text-champagne-300/70 font-light mt-0.5">
                  Confirm bridal dates, send WhatsApp confirmations, and update booking status.
                </p>
              </div>

              <BookingTable
                bookings={bookings}
                onUpdateStatus={handleUpdateBookingStatus}
                onDeleteBooking={handleDeleteBooking}
              />
            </div>
          )}

          {/* Tab 3: Academy Course Inquiries */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-champagne-100">
                  Shine Academy Admissions
                </h2>
                <p className="text-xs text-champagne-300/70 font-light mt-0.5">
                  Applicants for the 50% OFF Basic to Advance Beautician Course.
                </p>
              </div>

              <CourseInquiriesTable
                inquiries={inquiries}
                onUpdateStatus={handleUpdateCourseStatus}
              />
            </div>
          )}

          {/* Tab 4: Deals & Announcement Controller */}
          {activeTab === 'deals' && (
            <div className="space-y-4">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-champagne-100">
                  Salon Promotions &amp; Banners
                </h2>
                <p className="text-xs text-champagne-300/70 font-light mt-0.5">
                  Control active discount percentages and highlight banners on the client site.
                </p>
              </div>

              <DealManager
                deals={deals}
                onToggleDeal={handleToggleDeal}
              />
            </div>
          )}

        </main>

      </div>

      {/* Quick Walk-in Entry Modal */}
      <QuickWalkInModal
        isOpen={isWalkInModalOpen}
        onClose={() => setIsWalkInModalOpen(false)}
        onAddBooking={handleAddWalkInBooking}
      />

    </div>
  );
};

export default App;
