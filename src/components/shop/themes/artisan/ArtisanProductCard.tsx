import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '@/contexts/AppContext';

interface ArtisanProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const ArtisanProductCard = ({
  product,
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isInWishlist = false,
}: ArtisanProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      {/* Image Container */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-artisan-sand mb-4">
        <Link to={`/shop/${shopUrl}/product/${product.id}`}>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-artisan-terracotta text-white text-xs font-semibold rounded-full">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onToggleWishlist?.(product.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isInWishlist 
                ? 'bg-artisan-terracotta text-white' 
                : 'bg-white/90 backdrop-blur-sm text-artisan-charcoal hover:bg-artisan-terracotta hover:text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onQuickView?.(product)}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-artisan-charcoal hover:bg-artisan-olive hover:text-white flex items-center justify-center transition-all duration-300"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart Button - Bottom */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-3 bg-white/95 backdrop-blur-sm text-artisan-charcoal font-medium rounded-xl hover:bg-artisan-olive hover:text-white flex items-center justify-center gap-2 transition-all duration-300"
          >
            <ShoppingCart className="h-4 w-4" />
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <Link 
            to={`/shop/${shopUrl}/product/${product.id}`}
            className="block"
          >
            <h3 className="font-medium text-artisan-charcoal text-sm md:text-base truncate hover:text-artisan-olive transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-2 mt-1">
            {hasDiscount && (
              <span className="text-artisan-charcoal/40 text-sm line-through">
                {product.originalPrice?.toLocaleString()}
              </span>
            )}
            <span className="text-artisan-charcoal font-semibold">
              {product.price.toLocaleString()} FCFA
            </span>
          </div>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-artisan-charcoal/20 flex items-center justify-center text-artisan-charcoal hover:bg-artisan-olive hover:border-artisan-olive hover:text-white transition-all duration-300"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ArtisanProductCard;
