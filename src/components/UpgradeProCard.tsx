import { useState } from 'react';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PricingModal from '@/components/PricingModal';

interface UpgradeProCardProps {
  isCollapsed?: boolean;
}

const UpgradeProCard = ({ isCollapsed }: UpgradeProCardProps) => {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  if (isCollapsed) return null;

  return (
    <>
      <div className="mx-3 mb-2 p-3 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border border-white/10 shadow-lg animate-fade-in">
        {/* Icône avec fond */}
        <div className="w-8 h-8 rounded-md bg-white/10 backdrop-blur-sm flex items-center justify-center mb-2">
          <Crown className="w-4 h-4 text-yellow-400" />
        </div>
        
        {/* Contenu */}
        <h3 className="font-semibold text-sm text-white mb-0.5">Upgrade Pro</h3>
        <p className="text-[11px] text-white/60 mb-2 leading-tight">
          Découvrez les avantages Pro
        </p>
        
        {/* Bouton CTA */}
        <Button 
          onClick={() => setIsPricingOpen(true)}
          className="w-full h-8 text-xs bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
        >
          Passer au Pro
        </Button>
      </div>

      {/* Pricing Modal */}
      <PricingModal open={isPricingOpen} onOpenChange={setIsPricingOpen} />
    </>
  );
};

export default UpgradeProCard;
