import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { RefreshCw, Menu } from 'lucide-react';

interface DashboardLayoutProps {
  activeTab: 'dashboard' | 'bookings' | 'courses' | 'deals';
  onSelectTab: (tab: 'dashboard' | 'bookings' | 'courses' | 'deals') => void;
  onOpenWalkInModal: () => void;
  onLogout: () => void;
  onRefresh: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeTab,
  onSelectTab,
  onOpenWalkInModal,
  onLogout,
  onRefresh,
  loading,
  children
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-salon-950 text-champagne-100 flex font-sans overflow-x-hidden">
      
      {/* Responsive Sidebar (Desktop Fixed + Mobile Slide-out Drawer) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onOpenWalkInModal={onOpenWalkInModal}
        onLogout={onLogout}
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-h-screen w-full min-w-0 overflow-x-hidden">
        
        {/* Top Navigation Bar with Mobile Hamburger */}
        <header className="h-16 sm:h-18 bg-salon-950/85 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile / Tablet */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-salon-900 border border-zinc-800 text-champagne-200 hover:text-gold-300 hover:border-gold-500/40 transition-colors"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="font-playfair text-base sm:text-lg lg:text-xl font-bold text-champagne-100 flex items-center gap-2">
                <span className="truncate max-w-[200px] sm:max-w-none">Shine with Shiza Reception</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              </h1>
              <p className="text-[11px] text-champagne-300/70 font-light hidden sm:block truncate">
                Model Town Link Road, Opposite Amanah Mall, Lahore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-salon-900 border border-zinc-800 text-zinc-400 hover:text-gold-300 hover:border-gold-500/30 transition-all flex items-center gap-1.5 text-xs"
              title="Refresh data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-gold-400' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-2.5 pl-2 sm:pl-3 border-l border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 p-0.5 flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-full bg-salon-950 flex items-center justify-center text-xs font-bold text-gold-300">
                  SS
                </div>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold text-champagne-100 leading-tight">Salon Desk</p>
                <p className="text-[10px] text-gold-400 leading-tight">Head Administrator</p>
              </div>
            </div>
          </div>

        </header>

        {/* Dynamic Body Content */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 flex-1 w-full max-w-full overflow-x-hidden">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;
