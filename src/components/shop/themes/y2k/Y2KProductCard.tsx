import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category?: string;
  stock?: number;
  createdAt?: string;
  originalPrice?: number;
}

interface Y2KProductCardProps {
  product: Product;
  shopUrl?: string;
  onAddToCart?: (product: Product) => void;
}

const Y2KProductCard = ({ product, shopUrl, onAddToCart }: Y2KProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  
  // Check if product is new (created within last 7 days)
  const isNew = () => {
    if (!product.createdAt) return false;
    const createdDate = new Date(product.createdAt);
    const daysSinceCreated = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceCreated <= 7;
  };

  // Check if product has discount
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const productUrl = shopUrl ? `/shop/${shopUrl}/product/${product.id}` : `/product/${product.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={productUrl} className="block">
        {/* Image Container */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border-2 border-border mb-4">
          <motion.img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* New Badge */}
          {isNew() && (
            <motion.span
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -12 }}
              className="absolute top-4 left-4 bg-gradient-primary text-primary-foreground font-display text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg"
            >
              HOT
            </motion.span>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-display text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg"
            >
              -{discountPercent}%
            </motion.span>
          )}

          {/* Like Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2.5 rounded-full shadow-lg"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? 'fill-primary text-primary' : 'text-muted-foreground'
              }`}
            />
          </motion.button>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-display font-bold text-sm py-3 rounded-full shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              QUICK ADD
            </motion.button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="space-y-1 text-center">
          <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="font-display font-black text-lg text-primary">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="font-body text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Y2KProductCard;
