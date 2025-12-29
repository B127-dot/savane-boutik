import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/contexts/AppContext';

interface HauteFashionProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const HauteFashionProductCard = ({
  product,
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isInWishlist = false
}: HauteFashionProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/shop/${shopUrl}/product/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  // Check if product is new (less than 7 days old)
  const isNew = product.createdAt 
    ? (Date.now() - new Date(product.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000
    : false;

  // Calculate discount percentage
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="group relative haute-fashion-theme">
      {/* Card Container */}
      <div 
        className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/20 hover:shadow-lg"
        onClick={handleCardClick}
      >
        {/* Image Container - 3:4 Aspect Ratio */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[hsl(24,100%,50%)] text-white rounded-full shadow-glow-haute-sm">
                Nouveau
              </span>
            )}
            {hasDiscount && (
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-red-500 text-white rounded-full">
                -{discountPercent}%
              </span>
            )}
            {isLowStock && (
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-yellow-500/90 text-black rounded-full">
                Dernières pièces
              </span>
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
                className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
                  isInWishlist 
                    ? 'bg-[hsl(24,100%,50%)] text-white shadow-glow-haute-sm' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <h3 className="font-bebas text-lg text-white tracking-wide line-clamp-1 group-hover:text-gradient-haute transition-colors duration-300">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bebas text-xl text-[hsl(24,100%,50%)] tracking-wide">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-white/40 line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full h-11 rounded-full bg-white/10 border border-white/20 text-white font-semibold tracking-wider hover:bg-[hsl(24,100%,50%)] hover:border-[hsl(24,100%,50%)] hover:shadow-glow-haute-sm transition-all duration-300 group/btn"
          >
            <ShoppingBag className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110" />
            AJOUTER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HauteFashionProductCard;
