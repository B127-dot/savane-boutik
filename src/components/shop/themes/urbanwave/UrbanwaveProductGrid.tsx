import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/contexts/AppContext';
import UrbanwaveProductCard from './UrbanwaveProductCard';

interface UrbanwaveProductGridProps {
  products: Product[];
  shopUrl?: string;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

const UrbanwaveProductGrid = ({
  products,
  shopUrl = '',
  onAddToCart,
  onQuickView,
  sectionTitle = 'PRODUITS TENDANCE',
  sectionSubtitle = 'Une sélection pointue de pièces essentielles pour votre garde-robe streetwear.',
}: UrbanwaveProductGridProps) => {
  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm tracking-widest font-medium mb-2 block">
            Découvrez notre sélection
          </span>
          <h2 className="font-display text-4xl md:text-5xl mb-4">{sectionTitle}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{sectionSubtitle}</p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 8).map((product, index) => (
            <UrbanwaveProductCard
              key={product.id}
              product={product}
              shopUrl={shopUrl}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        {products.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" className="group">
              Voir tous les produits
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UrbanwaveProductGrid;
