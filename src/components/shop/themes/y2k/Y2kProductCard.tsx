import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/contexts/AppContext';

interface Y2kProductCardProps {
  product: Product;
  shopUrl: string;
  isNew?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  size?: 'standard' | 'medium' | 'large';
}

export const Y2kProductCard = ({ 
  product, 
  shopUrl, 
  isNew = false,
  onAddToCart,
  onQuickView,
  size = 'standard'
}: Y2kProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const heightClasses = {
    standard: 'h-[380px]',
    medium: 'h-[450px]',
    large: 'h-[520px]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={`group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/30 ${heightClasses[size]}`}
    >
      <Link to={`/shop/${shopUrl}/product/${product.id}`} className="block h-full">
        {/* Image Container */}
        <div className="relative h-[75%] overflow-hidden">
          <motion.img
            src={product.images?.[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

          {/* New Badge */}
          {isNew && (
            <motion.span
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -12 }}
              className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-outfit text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg"
            >
              HOT
            </motion.span>
          )}

          {/* Stock Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-4 right-14 bg-accent text-accent-foreground font-outfit text-xs font-bold px-3 py-1.5 rounded-full">
              {product.stock} LEFT
            </span>
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
                isLiked ? "text-primary fill-primary" : "text-muted-foreground"
              }`}
            />
          </motion.button>

          {/* Hover Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2"
          >
            {/* Quick Add */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-outfit text-sm font-bold py-3 rounded-2xl shadow-lg glow-pink hover:opacity-90 transition-opacity"
            >
              <ShoppingBag className="w-4 h-4" />
              QUICK ADD
            </button>
            
            {/* Quick View */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView?.(product);
              }}
              className="flex items-center justify-center bg-background/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg hover:bg-background transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="h-[25%] flex flex-col justify-center px-5 py-4">
          <p className="font-outfit text-base font-bold truncate">{product.name}</p>
          <p className="font-outfit text-lg font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {product.price.toLocaleString()} FCFA
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default Y2kProductCard;
