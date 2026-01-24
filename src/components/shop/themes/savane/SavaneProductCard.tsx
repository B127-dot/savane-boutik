import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category?: string;
  stock?: number;
}

interface SavaneProductCardProps {
  product: Product;
  shopUrl?: string;
  onAddToCart?: (product: Product) => void;
  index?: number;
}

const SavaneProductCard = ({ product, shopUrl, onAddToCart, index = 0 }: SavaneProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  const primaryImage = product.images?.[0] || '/placeholder.svg';
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/shop/${shopUrl}/product/${product.id}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container - 3:4 aspect ratio */}
        <div className="relative aspect-[3/4] overflow-hidden border border-foreground bg-muted">
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          />
          
          {/* Quick Add on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className="w-full py-3 bg-foreground text-background font-heading text-xs uppercase tracking-[0.2em] hover:bg-background hover:text-foreground border border-foreground transition-colors"
            >
              Ajouter au Panier
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="mt-4 flex justify-between items-start">
          <h3 className="font-heading text-sm uppercase tracking-[0.1em] text-foreground">
            {product.name}
          </h3>
          <span className="font-body text-sm text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default SavaneProductCard;
