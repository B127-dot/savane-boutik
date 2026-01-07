import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ShopHeaderProps {
  logo?: string;
  shopName: string;
  cartItemsCount: number;
  onCartClick: () => void;
}

const ShopHeader = ({ logo, shopName, cartItemsCount, onCartClick }: ShopHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {logo ? (
              <img 
                src={logo} 
                alt={shopName} 
                className="h-12 w-12 object-contain rounded-lg"
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xl">
                  {shopName.charAt(0)}
                </span>
              </div>
            )}
            <span className="text-xl font-display font-bold text-foreground hidden sm:block">
              {shopName}
            </span>
          </div>

          {/* Cart Icon */}
          <Button
            variant="outline"
            size="icon"
            className="relative h-12 w-12"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0"
                style={{ 
                  backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
                  color: 'white'
                }}
              >
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
