import { motion } from 'framer-motion';
import SavaneProductCard from './SavaneProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category?: string;
  stock?: number;
}

interface SavaneProductGridProps {
  products: Product[];
  shopUrl?: string;
  onAddToCart?: (product: Product) => void;
  sectionTitle?: string;
}

const SavaneProductGrid = ({ 
  products, 
  shopUrl, 
  onAddToCart,
  sectionTitle = "SHOP"
}: SavaneProductGridProps) => {
  return (
    <section id="shop" className="py-16 md:py-24 px-4 md:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 md:mb-16"
      >
        <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-[0.05em] text-foreground">
          {sectionTitle}
        </h2>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-foreground">
        {products.map((product, index) => (
          <div key={product.id} className="bg-background p-4 md:p-6">
            <SavaneProductCard
              product={product}
              shopUrl={shopUrl}
              onAddToCart={onAddToCart}
              index={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavaneProductGrid;
