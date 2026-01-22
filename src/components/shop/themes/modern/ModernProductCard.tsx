import { Product } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Heart, Eye, ShoppingCart, Star, Zap } from 'lucide-react';
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

// Helper to check if product is new (created within last 7 days)
const isNewProduct = (product: Product): boolean => {
  const createdAt = (product as any).createdAt;
  if (!createdAt) return false;
  const createdDate = new Date(createdAt);
  const daysSinceCreated = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceCreated <= 7;
};

// Format price with thousands separator
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR').format(price);
};

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

  const isNew = isNewProduct(product);
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

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
      className="group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
    >
      {/* Badges Stack */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {isNew && !hasDiscount && (
          <Badge 
            className="text-white text-xs font-semibold shadow-lg"
            style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
          >
            NOUVEAU
          </Badge>
        )}
        {hasDiscount && (
          <Badge 
            className="text-white text-xs font-semibold shadow-lg"
            style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
          >
            -{discountPercent}%
          </Badge>
        )}
        {isOutOfStock && (
          <Badge className="bg-gray-500 text-white text-xs font-semibold shadow-lg">
            RUPTURE
          </Badge>
        )}
      </div>

      {/* Action Buttons - Top Right */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        {onToggleWishlist && (
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full shadow-lg bg-white/90 hover:bg-white backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="h-9 w-9 rounded-full shadow-lg bg-white/90 hover:bg-white backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <AspectRatio ratio={1}>
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
          />
        </AspectRatio>
        
        {/* Quick Add Overlay */}
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className={`text-white shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300 ${getButtonRadius()}`}
              style={{ 
                backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center justify-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-center text-foreground line-clamp-2 min-h-[2.5rem] text-sm md:text-base">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex flex-col items-center gap-1">
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)} FCFA
            </span>
          )}
          <span className="text-xl font-bold text-foreground">
            {formatPrice(product.price)} FCFA
          </span>
        </div>

        {/* Stock Urgency Indicator */}
        {isLowStock && (
          <div 
            className="flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-3 rounded-full mx-auto"
            style={{ 
              backgroundColor: 'color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 15%, transparent)',
              color: 'var(--shop-primary, hsl(var(--primary)))'
            }}
          >
            <Zap className="h-3 w-3" />
            <span>Plus que {product.stock} en stock !</span>
          </div>
        )}

        {/* Add to Cart Button - Mobile visible, desktop hidden (overlay takes over) */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={isOutOfStock}
          className={`w-full md:opacity-0 md:group-hover:opacity-100 transition-opacity shop-btn-primary ${getButtonRadius()}`}
          size="lg"
          style={{ 
            backgroundColor: isOutOfStock ? undefined : 'var(--shop-primary, hsl(var(--primary)))',
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isOutOfStock ? 'Indisponible' : 'Ajouter au panier'}
        </Button>
      </div>
    </div>
  );
};

export default ModernProductCard;
