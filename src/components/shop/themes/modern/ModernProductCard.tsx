import { Product } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Heart, Eye, ShoppingCart, Star, Zap, ImageOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ModernProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
  buttonStyle?: 'rounded' | 'pill' | 'square';
  variant?: 'grid' | 'feed';
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
  buttonStyle = 'rounded',
  variant = 'grid'
}: ModernProductCardProps) => {
  const navigate = useNavigate();
  const isFeed = variant === 'feed';

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
      className={cn(
        "group relative bg-card overflow-hidden transition-all duration-300 cursor-pointer",
        isFeed 
          ? "rounded-2xl shadow-lg border-0" 
          : "rounded-xl border border-border hover:shadow-2xl hover:-translate-y-2"
      )}
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

      {/* Action Buttons - Top Right - Always visible on mobile */}
      <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex flex-col gap-1.5 md:gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-x-2 md:group-hover:translate-x-0">
        {onToggleWishlist && (
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 md:h-9 md:w-9 rounded-full shadow-lg bg-white/90 hover:bg-white backdrop-blur-sm active:scale-95 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
          >
            <Heart className={`h-5 w-5 md:h-4 md:w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="h-10 w-10 md:h-9 md:w-9 rounded-full shadow-lg bg-white/90 hover:bg-white backdrop-blur-sm active:scale-95 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
        >
          <Eye className="h-5 w-5 md:h-4 md:w-4 text-gray-600" />
        </Button>
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <AspectRatio ratio={isFeed ? 4/5 : 1}>
          {product.images[0] && product.images[0] !== '/placeholder.svg' ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                isOutOfStock && "opacity-50 grayscale"
              )}
              loading="lazy"
            />
          ) : (
            <div className={cn(
              "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-primary/5",
              isOutOfStock && "opacity-50 grayscale"
            )}>
              <div 
                className={cn("rounded-full flex items-center justify-center mb-3", isFeed ? "w-20 h-20" : "w-16 h-16")}
                style={{ backgroundColor: 'color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 15%, transparent)' }}
              >
                <ImageOff 
                  className={isFeed ? "w-10 h-10" : "w-8 h-8"}
                  style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }}
                />
              </div>
              <span className={cn("text-muted-foreground font-medium", isFeed ? "text-sm" : "text-xs")}>Image à venir</span>
            </div>
          )}
        </AspectRatio>
        
        {/* Quick Add Overlay - Only on grid mode or desktop */}
        {!isOutOfStock && !isFeed && (
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
      <div className={cn(
        isFeed ? "p-4 space-y-3" : "p-3 md:p-4 space-y-2 md:space-y-3"
      )}>
        {/* Rating + Badge Row */}
        <div className={cn(
          "flex items-center gap-2",
          isFeed ? "justify-between" : "justify-center"
        )}>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "fill-yellow-400 text-yellow-400",
                  isFeed ? "h-4 w-4" : "h-3 w-3 md:h-3.5 md:w-3.5"
                )}
              />
            ))}
          </div>
          {isFeed && isNew && !hasDiscount && (
            <Badge 
              className="text-white text-xs font-semibold"
              style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
            >
              NOUVEAU
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-semibold text-foreground leading-tight",
          isFeed 
            ? "text-lg md:text-xl" 
            : "text-center line-clamp-2 min-h-[2.5rem] text-sm md:text-base"
        )}>
          {product.name}
        </h3>

        {/* Description - Only in feed mode */}
        {isFeed && product.description && (
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className={cn(
          "flex gap-2",
          isFeed ? "items-baseline" : "flex-col items-center gap-0.5"
        )}>
          <span className={cn(
            "font-bold text-foreground",
            isFeed ? "text-2xl" : "text-lg md:text-xl"
          )}>
            {formatPrice(product.price)} FCFA
          </span>
          {hasDiscount && (
            <span className={cn(
              "text-muted-foreground line-through",
              isFeed ? "text-base" : "text-xs md:text-sm"
            )}>
              {formatPrice(product.originalPrice!)} FCFA
            </span>
          )}
        </div>

        {/* Stock Urgency Indicator */}
        {isLowStock && (
          <div 
            className={cn(
              "flex items-center gap-1 font-medium rounded-full",
              isFeed 
                ? "text-xs py-2 px-4 w-fit" 
                : "justify-center text-[10px] md:text-xs py-1 md:py-1.5 px-2 md:px-3 mx-auto"
            )}
            style={{ 
              backgroundColor: 'color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 15%, transparent)',
              color: 'var(--shop-primary, hsl(var(--primary)))'
            }}
          >
            <Zap className="h-3 w-3" />
            <span>Plus que {product.stock} en stock !</span>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={isOutOfStock}
          className={cn(
            "w-full transition-all active:scale-95 shop-btn-primary",
            getButtonRadius(),
            isFeed ? "h-12 text-base" : "md:opacity-0 md:group-hover:opacity-100"
          )}
          size={isFeed ? "lg" : "default"}
          style={{ 
            backgroundColor: isOutOfStock ? undefined : 'var(--shop-primary, hsl(var(--primary)))',
          }}
        >
          <ShoppingCart className={isFeed ? "h-5 w-5 mr-2" : "h-4 w-4 mr-2"} />
          {isOutOfStock ? 'Indisponible' : 'Ajouter au panier'}
        </Button>
      </div>
    </div>
  );
};

export default ModernProductCard;
