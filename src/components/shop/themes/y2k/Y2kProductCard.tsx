import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star, ImageOff } from 'lucide-react';
import { Product } from '@/contexts/AppContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Y2kProductCardProps {
  product: Product;
  shopUrl: string;
  isNew?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const Y2kProductCard = ({ 
  product, 
  shopUrl, 
  isNew = false,
  onAddToCart,
  onQuickView
}: Y2kProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasValidImage = product.images?.[0] && !imageError;
  const isLowStock = product.stock <= 5 && product.stock > 0;
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isOnSale 
    ? Math.round((1 - product.price / product.originalPrice!) * 100) 
    : 0;

  // Mock rating (in real app, this would come from product data)
  const rating = 4.5;
  const reviewCount = 12;

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/40"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link to={`/shop/${shopUrl}/product/${product.id}`}>
          <AspectRatio ratio={1}>
            {hasValidImage ? (
              <motion.img
                src={product.images![0]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              /* Stylized placeholder for missing images */
              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-3 opacity-60">
                  <ImageOff className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-xs font-outfit text-muted-foreground uppercase tracking-wider">
                  Image bientôt
                </span>
              </div>
            )}
          </AspectRatio>
        </Link>

        {/* Badges Container - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isNew && (
            <span className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-outfit text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-lg">
              HOT 🔥
            </span>
          )}
          {isOnSale && (
            <span className="bg-accent text-accent-foreground font-outfit text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
              -{discountPercent}%
            </span>
          )}
          {isLowStock && (
            <span className="bg-destructive/90 text-destructive-foreground font-outfit text-[10px] font-bold px-2.5 py-1 rounded-full">
              Stock limité
            </span>
          )}
        </div>

        {/* Wishlist Button - Top Right */}
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-md z-10 border border-border/50"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? "text-primary fill-primary" : "text-muted-foreground"
            }`}
          />
        </motion.button>

        {/* Quick View - Desktop Hover Only */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickView?.(product);
          }}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/95 backdrop-blur-sm p-2.5 rounded-full shadow-lg z-10 hidden md:flex"
        >
          <Eye className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Rating */}
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(rating) 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : i < rating 
                    ? 'text-yellow-400 fill-yellow-400/50'
                    : 'text-muted-foreground/30'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({reviewCount})</span>
        </div>

        {/* Product Name */}
        <Link to={`/shop/${shopUrl}/product/${product.id}`}>
          <h3 className="font-outfit text-sm font-semibold text-center line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="text-center">
          <p className="font-outfit text-lg font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </p>
          {isOnSale && (
            <p className="font-outfit text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)}
            </p>
          )}
        </div>

        {/* Add to Cart Button - Always Visible */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-outfit text-sm font-bold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:opacity-90 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Ajouter</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Y2kProductCard;
