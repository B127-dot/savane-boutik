import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Product } from '@/contexts/AppContext';
import ProductBadge from './ProductBadge';

interface ProductCardPremiumProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const ProductCardPremium = ({ 
  product, 
  onAddToCart, 
  onQuickView,
  onToggleWishlist,
  isInWishlist = false
}: ProductCardPremiumProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const isNew = () => {
    const createdDate = new Date(product.createdAt || Date.now());
    const daysSinceCreated = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceCreated <= 7;
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="group relative bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew() && <ProductBadge variant="new" />}
        {hasDiscount && <ProductBadge variant="discount" value={discountPercent} />}
        {product.stock <= 5 && product.stock > 0 && <ProductBadge variant="limited" />}
        {product.featured && <ProductBadge variant="bestseller" />}
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted">
        <AspectRatio ratio={1}>
          <img 
            src={product.images[0] || '/placeholder.svg'} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
          />
        </AspectRatio>
        
        {/* Quick Actions - Appear on hover */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {onToggleWishlist && (
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-primary text-primary' : ''}`} />
            </Button>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-4 w-4 fill-warning text-warning" 
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(12)</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-foreground text-center line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
          </div>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default ProductCardPremium;
