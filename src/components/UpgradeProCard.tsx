import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface UpgradeProCardProps {
  isCollapsed?: boolean;
}

const UpgradeProCard = ({ isCollapsed }: UpgradeProCardProps) => {
  const navigate = useNavigate();

  if (isCollapsed) return null;

  return (
    <div className="mx-3 mb-3 p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border border-white/10 shadow-xl animate-fade-in">
      {/* Icône avec fond */}
      <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3">
        <Crown className="w-6 h-6 text-yellow-400" />
      </div>
      
      {/* Contenu */}
      <h3 className="font-bold text-white mb-1">Upgrade Pro</h3>
      <p className="text-xs text-white/60 mb-3 leading-relaxed">
        Découvrez les bonus et avantages du compte Pro
      </p>
      
      {/* Bouton CTA */}
      <Button 
        onClick={() => navigate('/subscription')}
        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
      >
        Upgrade $30
      </Button>
    </div>
  );
};

export default UpgradeProCard;
