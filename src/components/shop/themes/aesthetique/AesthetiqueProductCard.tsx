import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '@/contexts/AppContext';

interface AesthetiqueProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
  buttonStyle?: 'rounded' | 'pill' | 'square';
}

const AesthetiqueProductCard = ({
  product,
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isInWishlist = false,
  buttonStyle = 'pill',
}: AesthetiqueProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  // Get button radius based on buttonStyle
  const getButtonRadius = () => {
    switch (buttonStyle) {
      case 'pill': return 'rounded-full';
      case 'square': return 'rounded-none';
      default: return 'rounded-xl';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800 mb-5">
        <Link to={`/shop/${shopUrl}/product/${product.id}`}>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0,0.2,1)] group-hover:scale-105"
          />
        </Link>

        {/* Add to Cart Button - Bottom (Hover reveal) */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.2,0,0.2,1)]">
          <button
            onClick={() => onAddToCart(product)}
            className={`w-full bg-white/90 backdrop-blur text-black py-3 font-medium text-sm uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 ${getButtonRadius()}`}
          >
            Ajouter <span className="text-xs text-zinc-500">•</span> {product.price.toLocaleString()} FCFA
          </button>
        </div>

        {/* Badges - Top Right */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {hasDiscount && (
            <div 
              className={`backdrop-blur px-3 py-1 text-xs uppercase tracking-wide text-white font-medium shop-primary-bg ${getButtonRadius()}`}
              style={{ backgroundColor: 'var(--shop-primary)' }}
            >
              -{discountPercentage}%
            </div>
          )}
          {product.stock <= 3 && product.stock > 0 && (
            <div className={`bg-zinc-950/80 backdrop-blur px-3 py-1 text-xs uppercase tracking-wide text-white border border-white/10 ${getButtonRadius()}`}>
              Dernières pièces
            </div>
          )}
        </div>

        {/* Wishlist Button - Top Left */}
        <button
          onClick={() => onToggleWishlist?.(product.id)}
          className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isInWishlist 
              ? 'text-white' 
              : 'bg-zinc-950/60 backdrop-blur text-white border border-white/10 opacity-0 group-hover:opacity-100'
          }`}
          style={{ 
            backgroundColor: isInWishlist ? 'var(--shop-primary)' : undefined 
          }}
          onMouseEnter={(e) => {
            if (!isInWishlist) {
              e.currentTarget.style.backgroundColor = 'var(--shop-primary)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isInWishlist) {
              e.currentTarget.style.backgroundColor = 'rgba(9, 9, 11, 0.6)';
            }
          }}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex justify-between items-start">
        <div>
          <Link to={`/shop/${shopUrl}/product/${product.id}`}>
            <h3 className="text-xl md:text-2xl font-instrument-serif text-white tracking-tight group-hover:text-zinc-300 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-zinc-500 font-light mt-1">
            Collection
          </p>
        </div>
        <div className="text-right">
          <span className="text-lg font-light text-white">
            {product.price.toLocaleString()} FCFA
          </span>
          {hasDiscount && (
            <span className="block text-sm text-zinc-600 line-through">
              {product.originalPrice?.toLocaleString()} FCFA
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AesthetiqueProductCard;
