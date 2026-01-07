import { Product } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModernProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
  buttonStyle?: 'rounded' | 'pill' | 'square';
}

const ModernProductCard = ({
  product,
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isInWishlist = false,
  buttonStyle = 'rounded'
}: ModernProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/shop/${shopUrl}/product/${product.id}`);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  // Get button radius class based on style
  const getButtonRadius = () => {
    switch(buttonStyle) {
      case 'pill': return 'rounded-full';
      case 'square': return 'rounded-none';
      default: return 'rounded-lg';
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {hasDiscount && (
          <Badge className="bg-red-500 text-white">-{discountPercent}%</Badge>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="bg-orange-500 text-white">Stock limité</Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onToggleWishlist && (
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="h-9 w-9 rounded-full shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>

      {/* Image */}
      <AspectRatio ratio={1}>
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </AspectRatio>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-3 w-3 fill-yellow-400 text-yellow-400"
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(24)</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-center text-foreground line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-center gap-2">
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice} FCFA
            </span>
          )}
          <span className="text-xl font-bold text-foreground">
            {product.price} FCFA
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className={`w-full group/btn shop-btn-primary ${getButtonRadius()}`}
          size="lg"
          style={{ 
            backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover/btn:scale-110" />
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default ModernProductCard;
