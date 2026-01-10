import { useState } from 'react';
import { motion } from 'framer-motion';
import { Product, Category } from '@/contexts/AppContext';
import AesthetiqueProductCard from './AesthetiqueProductCard';

interface AesthetiqueProductsProps {
  products: Product[];
  categories: Category[];
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlist?: string[];
}

const AesthetiqueProducts = ({
  products,
  categories,
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlist = [],
}: AesthetiqueProductsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const activeCategories = categories;
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryId === selectedCategory);

  return (
    <section id="products" className="py-24 px-6 md:px-12 bg-zinc-950">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-instrument-serif text-white tracking-tight mb-4"
            >
              Objets Curés
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 font-light max-w-md text-lg"
            >
              Conçus pour transcender les tendances et le temps. Chaque pièce crée un dialogue entre l'espace et la forme.
            </motion.p>
          </div>
          
          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm uppercase tracking-wide transition-colors ${
                selectedCategory === 'all'
                  ? 'border border-white text-white'
                  : 'border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'
              }`}
            >
              Tous
            </button>
            {activeCategories.slice(0, 3).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm uppercase tracking-wide transition-colors ${
                  selectedCategory === category.id
                    ? 'border border-white text-white'
                    : 'border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <AesthetiqueProductCard
                product={product}
                shopUrl={shopUrl}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlist.includes(product.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        {filteredProducts.length > 8 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <button className="group text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-widest border-b border-zinc-800 pb-1 hover:border-white">
              Voir Tous les Produits
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AesthetiqueProducts;
