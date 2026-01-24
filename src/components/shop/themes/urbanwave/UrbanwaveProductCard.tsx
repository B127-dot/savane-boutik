import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/contexts/AppContext';

interface UrbanwaveProductCardProps {
  product: Product;
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  index?: number;
}

const UrbanwaveProductCard = ({
  product,
  shopUrl,
  onAddToCart,
  onQuickView,
  index = 0,
}: UrbanwaveProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isNew = product.createdAt && 
    new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;
  const originalPrice = (product as any).compareAtPrice || (product as any).originalPrice;
  const isSale = originalPrice && originalPrice > product.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price) + ' FCFA';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/shop/${shopUrl}/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary mb-4">
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay on Hover */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase rounded-full"
              >
                Nouveau
              </motion.span>
            )}
            {isSale && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold uppercase rounded-full"
              >
                Promo
              </motion.span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isLiked 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
              onClick={(e) => {
                e.preventDefault();
                onQuickView?.(product);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              Aperçu
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </motion.div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        <p className="text-xs text-primary font-medium uppercase tracking-wide">
          {product.categoryId}
        </p>
        <Link to={`/shop/${shopUrl}/product/${product.id}`}>
          <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-gradient">
            {formatPrice(product.price)}
          </span>
          {isSale && originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UrbanwaveProductCard;
