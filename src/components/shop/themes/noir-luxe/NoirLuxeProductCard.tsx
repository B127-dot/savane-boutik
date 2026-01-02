import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/contexts/AppContext';

interface NoirLuxeProductCardProps {
  product: Product;
  shopUrl?: string;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const NoirLuxeProductCard = ({
  product,
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isInWishlist = false
}: NoirLuxeProductCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/shop/${shopUrl || 'demo'}/product/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  // Check if product is new (within last 7 days)
  const isNew = product.createdAt 
    ? (new Date().getTime() - new Date(product.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000 
    : false;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.price / product.originalPrice!) * 100) 
    : 0;

  const isLowStock = product.stock <= 5 && product.stock > 0;

  return (
    <div className="group relative bg-noir-card border border-transparent hover:border-gold/40 transition-all duration-500 overflow-hidden">
      {/* Image Container */}
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer bg-noir-light"
        onClick={handleCardClick}
      >
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-gold text-noir font-inter text-xs font-semibold px-3 py-1 rounded-none border-0">
              NOUVEAU
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-white text-noir font-inter text-xs font-bold px-3 py-1 rounded-none border-0">
              -{discountPercent}%
            </Badge>
          )}
          {isLowStock && (
            <Badge className="bg-noir border border-gold/50 text-gold font-inter text-xs px-3 py-1 rounded-none">
              Stock Limité
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          {onToggleWishlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                isInWishlist 
                  ? 'bg-gold border-gold text-noir' 
                  : 'bg-noir/80 border-gold/50 text-gold hover:bg-gold hover:text-noir'
              }`}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          )}
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-10 h-10 flex items-center justify-center bg-noir/80 border border-gold/50 text-gold hover:bg-gold hover:text-noir transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Add to Cart Button - Appears on Hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full bg-gold hover:bg-gold-light text-noir font-inter font-semibold py-3 rounded-none border-0 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-gold-md"
          >
            <ShoppingBag className="w-4 h-4" />
            Ajouter au Panier
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Product Name */}
        <h3 
          className="font-cinzel text-base font-medium text-white line-clamp-2 cursor-pointer hover:text-gold transition-colors duration-300"
          onClick={handleCardClick}
        >
          {product.name}
        </h3>

        {/* Rating - Static display since Product doesn't have rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < 4 ? 'text-gold fill-gold' : 'text-white/20'}`}
            />
          ))}
          <span className="font-inter text-xs text-white/50 ml-1">
            (4.8)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 pt-2">
          <span className="font-cinzel text-xl font-bold text-gold">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="font-inter text-sm text-white/40 line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>
      </div>

      {/* Gold border animation on hover */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-500" />
        <div className="absolute top-0 right-0 w-[1px] h-0 bg-gold group-hover:h-full transition-all duration-500 delay-100" />
        <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-500 delay-200" />
        <div className="absolute bottom-0 left-0 w-[1px] h-0 bg-gold group-hover:h-full transition-all duration-500 delay-300" />
      </div>
    </div>
  );
};

export default NoirLuxeProductCard;
