import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp, Product, Category } from '@/contexts/AppContext';

interface ArtisanCollectionsProps {
  onCategoryClick?: (categoryName: string) => void;
}

const ArtisanCollections = ({ onCategoryClick }: ArtisanCollectionsProps) => {
  const { categories, products } = useApp();

  // Get categories with products
  const categoriesWithProducts = categories
    .map(cat => ({
      ...cat,
      products: products.filter(p => p.categoryId === cat.id && p.status === 'active'),
      image: products.find(p => p.categoryId === cat.id && p.status === 'active')?.images?.[0]
    }))
    .filter(cat => cat.products.length > 0)
    .slice(0, 4);

  // Predefined colors for category badges
  const badgeColors = [
    'bg-artisan-olive text-white',
    'bg-artisan-terracotta text-white',
    'bg-artisan-sand text-artisan-charcoal',
    'bg-artisan-sage text-artisan-charcoal',
  ];

  if (categoriesWithProducts.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-artisan-cream">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-artisan-charcoal"
            >
              Our <span className="italic">Collections</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-artisan-charcoal/60 mt-4 max-w-md"
            >
              Explore our diverse range of handcrafted products, each thoughtfully designed to cater to your needs and style preferences.
            </motion.p>
          </div>
        </div>

        {/* Creative Asymmetric Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {categoriesWithProducts.map((category, index) => {
            // Define different grid positions for asymmetric layout
            const gridClasses = [
              'col-span-12 md:col-span-5 row-span-2', // Large left
              'col-span-12 md:col-span-7 row-span-1', // Wide top right
              'col-span-6 md:col-span-4 row-span-1',  // Small bottom left
              'col-span-6 md:col-span-3 row-span-1',  // Small bottom right
            ];

            const aspectClasses = [
              'aspect-[3/4]',
              'aspect-[16/10]',
              'aspect-square',
              'aspect-square',
            ];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${gridClasses[index] || 'col-span-6 md:col-span-3'} group cursor-pointer`}
                onClick={() => onCategoryClick?.(category.name)}
              >
                <div className={`relative ${aspectClasses[index] || 'aspect-square'} rounded-2xl lg:rounded-3xl overflow-hidden bg-artisan-sand`}>
                  {/* Image */}
                  {category.image && (
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium ${badgeColors[index] || badgeColors[0]}`}>
                    {category.name}
                  </div>

                  {/* Description - Only on larger cards */}
                  {index < 2 && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white/90 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {category.products.length} produit{category.products.length > 1 ? 's' : ''} disponible{category.products.length > 1 ? 's' : ''}
                      </p>
                      <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-artisan-olive text-white text-sm font-medium rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Discover More
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* Simple Arrow for smaller cards */}
                  {index >= 2 && (
                    <div className="absolute bottom-4 left-4">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-artisan-charcoal text-sm font-medium rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Discover More
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <button 
            onClick={() => onCategoryClick?.('all')}
            className="inline-flex items-center gap-2 px-6 py-3 border border-artisan-charcoal/20 text-artisan-charcoal rounded-full font-medium hover:bg-artisan-charcoal hover:text-white transition-all duration-300"
          >
            New collection
            <ArrowRight className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onCategoryClick?.('all')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-artisan-olive text-white rounded-full font-medium hover:bg-artisan-olive-dark transition-all duration-300"
          >
            Sale collection
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="w-full md:w-auto text-center md:text-left text-sm text-artisan-charcoal/60 md:ml-6 mt-4 md:mt-0 max-w-xs">
            Each of our products is meticulously crafted by skilled artisans using high-quality, eco-friendly materials.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ArtisanCollections;
