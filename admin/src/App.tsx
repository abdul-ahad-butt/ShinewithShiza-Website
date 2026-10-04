import React, { useState, useEffect } from 'react';
import { AuthGate } from './components/AuthGate';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MetricCards } from './components/MetricCards';
import { BookingTable } from './components/BookingTable';
import { CourseInquiriesTable } from './components/CourseInquiriesTable';
import { DealsAndSpecials } from './pages/DealsAndSpecials';
import { QuickWalkInModal } from './components/QuickWalkInModal';
import { AdminAPI, Booking, CourseInquiry, Deal } from './services/api';
import { AuthUtils } from './utils/auth';

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

  // --- Deals Management Handlers ---
  const handleToggleDeal = async (id: string, isActive: boolean) => {
    // Optimistic UI update
    setDeals((prev) =>
      prev.map((d) => (d.id === id ? { ...d, is_active: isActive ? 1 : 0 } : d))
    );
    try {
      await AdminAPI.toggleDeal(id, isActive);
    } catch (err) {
      console.error('Failed to toggle deal status:', err);
      // Reload on failure
      loadData();
    }
  };

  const handleAddDeal = async (dealData: Omit<Deal, 'id' | 'created_at'>) => {
    try {
      const created = await AdminAPI.createDeal(dealData);
      setDeals((prev) => [created, ...prev]);
    } catch (err) {
      console.error('Failed to create deal:', err);
    }
  };

  const handleUpdateDeal = async (id: string, dealData: Partial<Omit<Deal, 'id' | 'created_at'>>) => {
    try {
      const updated = await AdminAPI.updateDeal(id, dealData);
      if (updated) {
        setDeals((prev) => prev.map((d) => (d.id === id ? updated : d)));
      }
    } catch (err) {
      console.error('Failed to update deal:', err);
    }
  };

  const handleDeleteDeal = async (id: string) => {
    try {
      await AdminAPI.deleteDeal(id);
      setDeals((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error('Failed to delete deal:', err);
    }
  };

  if (!isAuthenticated) {
    return <AuthGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <DashboardLayout
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenWalkInModal={() => setIsWalkInModalOpen(true)}
        onLogout={() => {
          AuthUtils.clearSession();
          setIsAuthenticated(false);
        }}
        onRefresh={loadData}
        loading={loading}
      >
        {/* Top KPI Metric Cards */}
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
          <DealsAndSpecials
            deals={deals}
            onToggleDeal={handleToggleDeal}
            onAddDeal={handleAddDeal}
            onUpdateDeal={handleUpdateDeal}
            onDeleteDeal={handleDeleteDeal}
          />
        )}
      </DashboardLayout>

      {/* Quick Walk-in Entry Modal */}
      <QuickWalkInModal
        isOpen={isWalkInModalOpen}
        onClose={() => setIsWalkInModalOpen(false)}
        onAddBooking={handleAddWalkInBooking}
      />
    </>
  );
};

export default App;
