import { useState } from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp, Product } from '@/contexts/AppContext';
import ArtisanProductCard from './ArtisanProductCard';

interface ArtisanPopularProductsProps {
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlist?: string[];
}

const ArtisanPopularProducts = ({
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlist = [],
}: ArtisanPopularProductsProps) => {
  const { products, categories } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Get active products
  const activeProducts = products.filter(p => p.status === 'active' && p.stock > 0);

  // Get categories with products
  const categoriesWithProducts = categories.filter(cat =>
    activeProducts.some(p => p.categoryId === cat.id)
  );

  // Filter products by category
  const filteredProducts = activeCategory === 'all'
    ? activeProducts
    : activeProducts.filter(p => {
        const cat = categories.find(c => c.id === p.categoryId);
        return cat?.name === activeCategory;
      });

  // Get featured product for the promo card
  const featuredProduct = activeProducts[0];

  if (activeProducts.length === 0) return null;

  return (
    <section id="products" className="py-20 lg:py-32 bg-artisan-cream">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-artisan-charcoal"
            >
              Our <span className="italic">Popular</span> Collection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-artisan-charcoal/60 mt-4 max-w-md"
            >
              Explore our diverse range of products, each thoughtfully designed to cater to your needs and style preferences.
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-artisan-olive text-white rounded-full font-medium hover:bg-artisan-olive-dark transition-all duration-300 self-start lg:self-auto"
          >
            Open Store
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-10"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-artisan-charcoal text-white'
                : 'bg-white text-artisan-charcoal border border-artisan-charcoal/10 hover:border-artisan-charcoal/30'
            }`}
          >
            Tous
          </button>
          {categoriesWithProducts.slice(0, 4).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.name
                  ? 'bg-artisan-charcoal text-white'
                  : 'bg-white text-artisan-charcoal border border-artisan-charcoal/10 hover:border-artisan-charcoal/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid with Featured */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Featured Promo Card */}
          {featuredProduct && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2"
            >
              <div className="relative h-full min-h-[400px] rounded-2xl lg:rounded-3xl overflow-hidden bg-artisan-terracotta">
                <img
                  src={featuredProduct.images?.[0]}
                  alt={featuredProduct.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-artisan-terracotta via-artisan-terracotta/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="inline-flex self-start px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-2xl font-bold">
                    50% OFF
                  </div>
                  
                  <div>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-artisan-olive text-white rounded-full text-sm font-medium hover:bg-artisan-olive-dark transition-all">
                      Discover More
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Product Cards */}
          {filteredProducts.slice(0, 6).map((product, index) => (
            <div
              key={product.id}
              className="col-span-6 md:col-span-6 lg:col-span-4"
            >
              <ArtisanProductCard
                product={product}
                shopUrl={shopUrl}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlist.includes(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtisanPopularProducts;
