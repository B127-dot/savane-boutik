import { Home, Grid3x3, ShoppingCart, Heart, Menu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BottomNavMobileProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onCategoriesClick: () => void;
  onHomeClick: () => void;
}

const BottomNavMobile = ({ 
  cartItemsCount, 
  onCartClick,
  onCategoriesClick,
  onHomeClick
}: BottomNavMobileProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {/* Home */}
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center gap-1 h-full rounded-none"
          onClick={onHomeClick}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Accueil</span>
        </Button>

        {/* Categories */}
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center gap-1 h-full rounded-none"
          onClick={onCategoriesClick}
        >
          <Grid3x3 className="h-5 w-5" />
          <span className="text-xs">Catégories</span>
        </Button>

        {/* Cart */}
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center gap-1 h-full rounded-none relative"
          onClick={onCartClick}
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                {cartItemsCount}
              </Badge>
            )}
          </div>
          <span className="text-xs">Panier</span>
        </Button>

        {/* Favorites */}
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center gap-1 h-full rounded-none"
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs">Favoris</span>
        </Button>

        {/* Menu */}
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center gap-1 h-full rounded-none"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs">Menu</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavMobile;
