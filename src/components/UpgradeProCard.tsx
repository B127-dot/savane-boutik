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
    <div className="mx-3 mb-3 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-border/30 shadow-sm animate-fade-in">
      {/* Icône avec fond */}
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
        <Crown className="w-4 h-4 text-primary" />
      </div>
      
      {/* Contenu */}
      <h3 className="font-semibold text-sm text-foreground mb-1">Upgrade Pro</h3>
      <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">
        Débloquez toutes les fonctionnalités
      </p>
      
      {/* Bouton CTA */}
      <Button 
        onClick={() => navigate('/subscription')}
        size="sm"
        className="w-full h-8 text-xs font-medium"
      >
        Découvrir
      </Button>
    </div>
  );
};

export default UpgradeProCard;
