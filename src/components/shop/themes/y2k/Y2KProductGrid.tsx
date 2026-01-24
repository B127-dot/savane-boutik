import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Y2KProductCard from './Y2KProductCard';
import { DEFAULT_TEXTS } from '@/lib/defaultTexts';

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

interface Y2KProductGridProps {
  products: Product[];
  shopUrl?: string;
  onAddToCart?: (product: Product) => void;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

const Y2KProductGrid = ({ 
  products, 
  shopUrl, 
  onAddToCart,
  sectionTitle = DEFAULT_TEXTS.productGrid.sectionBadge,
  sectionSubtitle = DEFAULT_TEXTS.productGrid.subtitle
}: Y2KProductGridProps) => {
  return (
    <section id="products" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-accent/20 text-foreground font-display text-sm font-bold px-5 py-2 rounded-full border-2 border-accent mb-4"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            {sectionTitle}
          </motion.div>

          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
            {DEFAULT_TEXTS.productGrid.title.split(' ')[0].toUpperCase()}{' '}
            <span className="text-primary">
              {DEFAULT_TEXTS.productGrid.title.split(' ').slice(1).join(' ').toUpperCase()}
            </span>
          </h2>

          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Y2KProductCard
                product={product}
                shopUrl={shopUrl}
                onAddToCart={onAddToCart}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to={shopUrl ? `/shop/${shopUrl}` : '/'}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-bold text-sm px-8 py-4 rounded-full shadow-lg"
            >
              {DEFAULT_TEXTS.productGrid.viewAll.toUpperCase()}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Y2KProductGrid;
