import React from 'react';
import { LayoutDashboard, CalendarDays, GraduationCap, Tag, PlusCircle, LogOut, ExternalLink, MapPin } from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'bookings' | 'courses' | 'deals';
  onSelectTab: (tab: 'dashboard' | 'bookings' | 'courses' | 'deals') => void;
  onOpenWalkInModal: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenWalkInModal,
  onLogout
}) => {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'bookings' as const, label: 'Bookings Manager', icon: CalendarDays },
    { id: 'courses' as const, label: 'Academy Inquiries', icon: GraduationCap },
    { id: 'deals' as const, label: 'Deals & Specials', icon: Tag },
  ];

  return (
    <aside className="w-64 bg-salon-950 border-r border-zinc-800/90 flex flex-col justify-between shrink-0 min-h-screen p-5">
      
      {/* Top Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-700 shadow-gold-glow">
            <img
              src="/logo.svg"
              alt="Shine with Shiza"
              className="w-full h-full rounded-full object-cover bg-salon-950"
            />
          </div>
          <div>
            <h2 className="font-playfair text-base font-bold text-gold-gradient tracking-wide">
              Shine with Shiza
            </h2>
            <p className="text-[10px] text-champagne-300/80 uppercase tracking-widest">
              Manager Portal
            </p>
          </div>
        </div>

        {/* Quick Action: Log Walk-in Booking */}
        <button
          onClick={onOpenWalkInModal}
          className="btn-gold w-full py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-salon-950" />
          <span>New Client Booking</span>
        </button>

        {/* Navigation Links */}
        <nav className="space-y-1.5 pt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-500/20 to-gold-600/10 text-gold-300 border border-gold-500/30'
                    : 'text-champagne-300/80 hover:text-gold-200 hover:bg-salon-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Info & Logout */}
      <div className="space-y-4 pt-6 border-t border-zinc-800/80">
        
        {/* Salon Branch Status */}
        <div className="p-3 rounded-xl bg-salon-900/60 border border-zinc-800 text-[11px] space-y-1">
          <div className="flex items-center gap-1.5 text-gold-300 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span>Lahore Branch</span>
          </div>
          <p className="text-champagne-300/60 leading-tight">
            Model Town Link Rd (Opp. Amanah Mall)
          </p>
          <p className="text-emerald-400 text-[10px] font-medium pt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Reception Desk Active
          </p>
        </div>

        {/* View Live Client Site */}
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between text-xs text-champagne-300/80 hover:text-gold-300 py-1.5 px-2 transition-colors"
        >
          <span>Open Client Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-300 py-2 px-2 rounded-lg hover:bg-red-950/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Lock / Sign Out</span>
        </button>

      </div>

    </aside>
  );
};
