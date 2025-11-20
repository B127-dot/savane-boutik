import { Product } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ShoppingCart } from 'lucide-react';

interface ElegantProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const ElegantProductCard = ({
  product,
  shopUrl,
  onAddToCart,
}: ElegantProductCardProps) => {
  return (
    <div className="group relative bg-card rounded-sm border border-border overflow-hidden transition-all duration-500 hover:shadow-lg">
      <AspectRatio ratio={1}>
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </AspectRatio>

      <div className="p-6 space-y-4 text-center">
        <h3 className="font-serif text-lg text-foreground">
          {product.name}
        </h3>
        <p className="text-2xl font-light text-foreground">
          {product.price} FCFA
        </p>
        <Button
          onClick={() => onAddToCart(product)}
          variant="outline"
          className="w-full"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
        <p className="text-xs text-muted-foreground">
          Thème "Élégant" - Prochainement
        </p>
      </div>
    </div>
  );
};

export default ElegantProductCard;
