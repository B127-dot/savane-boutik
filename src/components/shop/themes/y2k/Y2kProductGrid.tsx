import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product, Category } from '@/contexts/AppContext';
import { Y2kProductCard } from './Y2kProductCard';

interface Y2kProductGridProps {
  products: Product[];
  categories: Category[];
  shopUrl: string;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const Y2kProductGrid = ({ 
  products, 
  categories, 
  shopUrl,
  onAddToCart,
  onQuickView
}: Y2kProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // Assuming newer products have higher IDs or we keep original order
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Determine card sizes for bento layout
  const getCardSize = (index: number): 'standard' | 'medium' | 'large' => {
    const pattern = index % 6;
    if (pattern === 0) return 'large';
    if (pattern === 3) return 'medium';
    return 'standard';
  };

  return (
    <section className="py-16 y2k-theme">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-outfit text-sm font-medium text-primary">THE COLLECTION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-outfit font-black">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              FRESH DROPS
            </span>
          </h2>
          <p className="text-muted-foreground font-outfit mt-4 max-w-md mx-auto">
            Main character energy only. Shop the vibes that hit different.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search the vibes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 rounded-full border-2 border-border/50 focus:border-primary font-outfit"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full font-outfit font-bold whitespace-nowrap ${
                selectedCategory === null 
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' 
                  : ''
              }`}
            >
              ALL
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full font-outfit font-bold whitespace-nowrap ${
                  selectedCategory === cat.id 
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' 
                    : ''
                }`}
              >
                {cat.name.toUpperCase()}
              </Button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Product Grid - Bento Style */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
            {filteredProducts.map((product, index) => {
              const size = getCardSize(index);
              const colSpan = size === 'large' ? 'md:col-span-2' : '';
              const rowSpan = size === 'large' ? 'md:row-span-2' : size === 'medium' ? 'md:row-span-1' : '';
              
              return (
                <div key={product.id} className={`${colSpan} ${rowSpan}`}>
                  <Y2kProductCard
                    product={product}
                    shopUrl={shopUrl}
                    isNew={index < 3}
                    size={size}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Sparkles className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-xl font-outfit font-bold text-muted-foreground">
              No vibes found 😢
            </p>
            <p className="text-muted-foreground font-outfit mt-2">
              Try adjusting your filters, bestie!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Y2kProductGrid;
