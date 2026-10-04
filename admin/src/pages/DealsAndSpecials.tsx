import React from 'react';
import { Deal } from '../services/api';
import { DealManager } from '../components/DealManager';

interface DealsAndSpecialsProps {
  deals: Deal[];
  onToggleDeal: (id: string, isActive: boolean) => Promise<void> | void;
  onAddDeal?: (deal: Omit<Deal, 'id' | 'created_at'>) => Promise<void> | void;
  onUpdateDeal?: (id: string, deal: Partial<Omit<Deal, 'id' | 'created_at'>>) => Promise<void> | void;
  onDeleteDeal?: (id: string) => Promise<void> | void;
}

export const DealsAndSpecials: React.FC<DealsAndSpecialsProps> = ({
  deals,
  onToggleDeal,
  onAddDeal,
  onUpdateDeal,
  onDeleteDeal
}) => {
  return (
    <div className="space-y-6">
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
        onToggleDeal={onToggleDeal}
        onAddDeal={onAddDeal}
        onUpdateDeal={onUpdateDeal}
        onDeleteDeal={onDeleteDeal}
      />
    </div>
  );
};

export default DealsAndSpecials;
