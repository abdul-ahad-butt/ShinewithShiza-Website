import React, { useState } from 'react';
import { Deal } from '../services/api';
import {
  Tag,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  X,
  Layers,
  Copy,
  Check
} from 'lucide-react';

interface DealManagerProps {
  deals: Deal[];
  onToggleDeal: (id: string, isActive: boolean) => Promise<void> | void;
  onAddDeal?: (deal: Omit<Deal, 'id' | 'created_at'>) => Promise<void> | void;
  onUpdateDeal?: (id: string, deal: Partial<Omit<Deal, 'id' | 'created_at'>>) => Promise<void> | void;
  onDeleteDeal?: (id: string) => Promise<void> | void;
}

export const DealManager: React.FC<DealManagerProps> = ({
  deals,
  onToggleDeal,
  onAddDeal,
  onUpdateDeal,
  onDeleteDeal
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formBadge, setFormBadge] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formPromoCode, setFormPromoCode] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formValidUntil, setFormValidUntil] = useState('2026-12-31');
  const [formTargetSection, setFormTargetSection] = useState<'all' | 'banner' | 'hero' | 'services'>('all');
  const [formIsActive, setFormIsActive] = useState(true);

  const openAddModal = () => {
    setEditingDeal(null);
    setFormBadge('50% OFF LIMITED SEATS');
    setFormTitle('');
    setFormPromoCode('');
    setFormDescription('');
    setFormValidUntil('2026-12-31');
    setFormTargetSection('all');
    setFormIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (deal: Deal) => {
    setEditingDeal(deal);
    setFormBadge(deal.badge || deal.badge_text || '');
    setFormTitle(deal.title || '');
    setFormPromoCode(deal.promo_code || deal.code || '');
    setFormDescription(deal.description || '');
    setFormValidUntil(deal.valid_until || '2026-12-31');
    setFormTargetSection((deal.target_section as any) || 'all');
    setFormIsActive(deal.is_active === 1);
    setIsModalOpen(true);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) return;

    setSaving(true);
    try {
      const payload = {
        badge: formBadge.trim() || 'SPECIAL PROMOTION',
        title: formTitle.trim(),
        promo_code: formPromoCode.trim().toUpperCase() || undefined,
        description: formDescription.trim(),
        valid_until: formValidUntil || undefined,
        target_section: formTargetSection,
        is_active: formIsActive ? 1 : 0
      };

      if (editingDeal && onUpdateDeal) {
        await onUpdateDeal(editingDeal.id, payload);
      } else if (onAddDeal) {
        await onAddDeal(payload);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save promotion:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    if (onDeleteDeal) {
      await onDeleteDeal(id);
    }
    setDeleteConfirmId(null);
  };

  const filteredDeals = deals.filter((deal) => {
    if (filter === 'active') return deal.is_active === 1;
    if (filter === 'inactive') return deal.is_active === 0;
    return true;
  });

  const activeBanners = deals.filter((d) => d.is_active === 1);
  const primaryBanner = activeBanners[0];

  return (
    <div className="space-y-6">
      
      {/* Live Client Preview Banner */}
      <div className="luxury-card rounded-2xl border border-gold-500/30 p-5 bg-gradient-to-r from-salon-950 via-gold-950/20 to-salon-950">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-gold-300">
            <Eye className="w-4 h-4 text-gold-400" />
            <span>Client Website Live Banner Preview</span>
          </div>
          <span className="text-[11px] text-zinc-400">
            {activeBanners.length} active banner{activeBanners.length === 1 ? '' : 's'} broadcasted
          </span>
        </div>

        <div className="mt-3.5 p-3 rounded-xl bg-salon-900/90 border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {primaryBanner ? (
            <>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 bg-gold-500/20 text-gold-300 border border-gold-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase animate-pulse">
                  <Tag className="w-3 h-3 text-gold-400" />
                  {primaryBanner.badge || primaryBanner.badge_text}
                </span>
                <span className="text-xs sm:text-sm font-medium text-champagne-100">
                  {primaryBanner.title}
                </span>
                {primaryBanner.promo_code && (
                  <span className="text-[11px] font-mono bg-zinc-800 text-gold-300 px-2 py-0.5 rounded border border-zinc-700">
                    Code: {primaryBanner.promo_code}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live on Homepage
              </div>
            </>
          ) : (
            <div className="w-full text-center py-2 text-xs text-zinc-500 italic">
              All promotional banners are currently disabled. Announcement bar is cleanly hidden on the client website.
            </div>
          )}
        </div>
      </div>

      {/* Main Controller Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-playfair text-xl font-bold text-champagne-100 flex items-center gap-2">
            <Tag className="w-5 h-5 text-gold-400" />
            <span>Active Deals &amp; Seasonal Campaigns</span>
          </h3>
          <p className="text-xs text-champagne-300/70 font-light mt-0.5">
            Manage discounts, top announcement banners, and bridal packages with real-time sync.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Filter Pills */}
          <div className="flex items-center bg-salon-900 border border-zinc-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === 'all' ? 'bg-gold-500 text-salon-950 font-bold' : 'text-zinc-400 hover:text-champagne-200'
              }`}
            >
              All ({deals.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === 'active' ? 'bg-gold-500 text-salon-950 font-bold' : 'text-zinc-400 hover:text-champagne-200'
              }`}
            >
              Active ({activeBanners.length})
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === 'inactive' ? 'bg-gold-500 text-salon-950 font-bold' : 'text-zinc-400 hover:text-champagne-200'
              }`}
            >
              Disabled ({deals.length - activeBanners.length})
            </button>
          </div>

          {/* Add New Offer Button */}
          <button
            onClick={openAddModal}
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow shrink-0"
          >
            <Plus className="w-4 h-4 text-salon-950" />
            <span>Add Offer</span>
          </button>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {filteredDeals.length === 0 ? (
          <div className="luxury-card rounded-2xl border border-zinc-800/80 p-8 text-center text-zinc-500 text-sm">
            No deals found for the selected filter.
          </div>
        ) : (
          filteredDeals.map((deal) => {
            const isActive = deal.is_active === 1;
            const badge = deal.badge || deal.badge_text || 'PROMOTION';
            const promo = deal.promo_code || deal.code;

            return (
              <div
                key={deal.id}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
                  isActive
                    ? 'bg-salon-900/90 border-gold-500/40 shadow-sm'
                    : 'bg-salon-950/70 border-zinc-800/80 opacity-75'
                }`}
              >
                {/* Left Deal Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isActive
                          ? 'bg-gold-500 text-salon-950'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {badge}
                    </span>

                    {promo && (
                      <button
                        onClick={() => handleCopyCode(promo)}
                        className="font-mono text-xs text-gold-300 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20 flex items-center gap-1 hover:bg-gold-500/20 transition-colors"
                        title="Click to copy promo code"
                      >
                        <span>Code: {promo}</span>
                        {copiedCode === promo ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gold-400/70" />
                        )}
                      </button>
                    )}

                    <span className="text-[10px] text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded uppercase tracking-wider">
                      Section: {deal.target_section || 'all'}
                    </span>
                  </div>

                  <h4 className="font-playfair font-bold text-base sm:text-lg text-champagne-100">
                    {deal.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-champagne-300/80 font-light leading-relaxed">
                    {deal.description}
                  </p>

                  {deal.valid_until && (
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 pt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-400/80" />
                      <span>Valid Until: {deal.valid_until}</span>
                    </div>
                  )}
                </div>

                {/* Right Action Controls: Toggle, Edit, Delete */}
                <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-zinc-800/60 pt-3 md:pt-0">
                  
                  {/* Toggle Switch */}
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-semibold ${isActive ? 'text-gold-300' : 'text-zinc-500'}`}>
                      {isActive ? 'Banner Active' : 'Disabled'}
                    </span>
                    <button
                      onClick={() => onToggleDeal(deal.id, !isActive)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none ${
                        isActive ? 'bg-gradient-to-r from-gold-500 to-gold-600' : 'bg-zinc-800'
                      }`}
                      aria-label="Toggle deal active status"
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                          isActive ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Edit & Delete Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(deal)}
                      className="p-2 rounded-xl bg-salon-800 hover:bg-gold-500/20 border border-zinc-700 hover:border-gold-500/40 text-zinc-300 hover:text-gold-300 transition-colors"
                      title="Edit offer details"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(deal.id)}
                      className="p-2 rounded-xl bg-salon-800 hover:bg-red-500/20 border border-zinc-700 hover:border-red-500/40 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete offer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Deal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="luxury-card bg-salon-950 border border-gold-500/30 rounded-2xl w-full max-w-xl p-6 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-300">
                  {editingDeal ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-bold text-champagne-100">
                    {editingDeal ? 'Edit Promotion Deal' : 'Add New Promotional Offer'}
                  </h3>
                  <p className="text-xs text-champagne-300/70">
                    Changes broadcast dynamically to the website banner &amp; deals sections.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-salon-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {/* Badge & Promo Code row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-champagne-200 font-medium mb-1.5">
                    Badge Text <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50% OFF LIMITED SEATS"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full bg-salon-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-champagne-100 placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-champagne-200 font-medium mb-1.5">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ACADEMY50"
                    value={formPromoCode}
                    onChange={(e) => setFormPromoCode(e.target.value)}
                    className="w-full bg-salon-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-champagne-100 placeholder:text-zinc-600 font-mono uppercase focus:outline-none focus:border-gold-500/60"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-champagne-200 font-medium mb-1.5">
                  Offer Title <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Basic to Advance Beautician Masterclass"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-salon-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-champagne-100 placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/60"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-champagne-200 font-medium mb-1.5">
                  Offer Description <span className="text-gold-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed description of the services, terms, or course inclusions..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-salon-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-champagne-100 placeholder:text-zinc-600 focus:outline-none focus:border-gold-500/60 resize-none"
                />
              </div>

              {/* Valid Until & Target Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-champagne-200 font-medium mb-1.5">
                    Valid Until Date
                  </label>
                  <input
                    type="date"
                    value={formValidUntil}
                    onChange={(e) => setFormValidUntil(e.target.value)}
                    className="w-full bg-salon-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-champagne-100 focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                <div>
                  <label className="block text-champagne-200 font-medium mb-1.5">
                    Target Section
                  </label>
                  <select
                    value={formTargetSection}
                    onChange={(e) => setFormTargetSection(e.target.value as any)}
                    className="w-full bg-salon-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-champagne-100 focus:outline-none focus:border-gold-500/60"
                  >
                    <option value="all">All Pages &amp; Banners</option>
                    <option value="banner">Announcement Bar Only</option>
                    <option value="hero">Hero Showcase</option>
                    <option value="services">Services &amp; Pricing Menu</option>
                  </select>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="pt-2 flex items-center justify-between p-3.5 rounded-xl bg-salon-900/60 border border-zinc-800">
                <div>
                  <p className="text-champagne-100 font-semibold text-xs sm:text-sm">
                    Publish Deal Immediately
                  </p>
                  <p className="text-zinc-400 text-[11px]">
                    Active deals display live on the website announcement bar &amp; specials.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsActive(!formIsActive)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none ${
                    formIsActive ? 'bg-gradient-to-r from-gold-500 to-gold-600' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                      formIsActive ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-salon-950" />
                  <span>{saving ? 'Saving...' : editingDeal ? 'Save Changes' : 'Publish Offer'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="luxury-card bg-salon-950 border border-red-500/40 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-playfair text-lg font-bold text-champagne-100">
                Delete Promotion Deal?
              </h3>
            </div>
            <p className="text-xs text-champagne-300/80 leading-relaxed">
              Are you sure you want to permanently delete this offer? It will be removed from the salon client website immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(deleteConfirmId)}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-colors"
              >
                Delete Offer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
