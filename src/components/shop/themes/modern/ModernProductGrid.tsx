import { motion, useReducedMotion } from 'framer-motion';
import { Search, ArrowUpDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import ModernProductCard from './ModernProductCard';
import { DEFAULT_TEXTS } from '@/lib/defaultTexts';
import { Product } from '@/contexts/AppContext';

interface Category {
  id: string;
  name: string;
}

interface ModernProductGridProps {
  products: Product[];
  categories?: Category[];
  shopUrl?: string;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlist?: string[];
  sectionTitle?: string;
  sectionSubtitle?: string;
  showFilters?: boolean;
  buttonStyle?: 'rounded' | 'pill' | 'square';
  isLoading?: boolean;
}

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="bg-card rounded-xl border border-border overflow-hidden">
    <Skeleton className="aspect-square w-full" />
    <div className="p-3 md:p-4 space-y-3">
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-3.5 w-3.5 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-5 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  </div>
);

// Category Pill Component
const CategoryPill = ({ 
  name, 
  count, 
  isSelected, 
  onClick 
}: { 
  name: string; 
  count: number; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <Button
    variant={isSelected ? 'default' : 'outline'}
    onClick={onClick}
    className="flex-shrink-0 rounded-full h-10 px-4 text-sm font-medium transition-all duration-200 active:scale-95"
    style={isSelected ? { 
      backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
      borderColor: 'var(--shop-primary, hsl(var(--primary)))'
    } : undefined}
  >
    {name} ({count})
  </Button>
);

const ModernProductGrid = ({
  products,
  categories = [],
  shopUrl,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlist = [],
  sectionTitle = DEFAULT_TEXTS.productGrid.title,
  sectionSubtitle = DEFAULT_TEXTS.productGrid.subtitle,
  showFilters = true,
  buttonStyle = 'rounded',
  isLoading = false,
}: ModernProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  
  // Respect user's motion preferences
  const shouldReduceMotion = useReducedMotion();

  // Count products per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    categories.forEach(cat => {
      counts[cat.id] = products.filter(p => p.categoryId === cat.id).length;
    });
    return counts;
  }, [products, categories]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' || product.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'newest':
            return (
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
            );
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [products, searchQuery, selectedCategory, sortOrder]);

  // Animation variants
  const cardAnimation = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };
  
  const cardAnimationDelay = shouldReduceMotion ? 0 : 0.03; // Faster on mobile

  return (
    <section id="products" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 text-foreground">
            {sectionTitle}
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={DEFAULT_TEXTS.productGrid.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 md:h-14 text-base md:text-lg border-2 focus:border-primary rounded-xl"
              />
            </div>

            {/* Scrollable Category Pills */}
            {categories.length > 0 && (
              <div className="relative">
                {/* Gradient fade edges for scroll indication */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />
                
                <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide md:flex-wrap md:justify-center md:overflow-visible">
                  <CategoryPill
                    name={DEFAULT_TEXTS.productGrid.allCategories}
                    count={categoryCounts.all}
                    isSelected={selectedCategory === 'all'}
                    onClick={() => setSelectedCategory('all')}
                  />
                  {categories.map((cat) => {
                    const count = categoryCounts[cat.id] || 0;
                    if (count === 0) return null;
                    return (
                      <CategoryPill
                        key={cat.id}
                        name={cat.name}
                        count={count}
                        isSelected={selectedCategory === cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sort Dropdown */}
            <div className="flex justify-center">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full max-w-[200px] h-11">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={DEFAULT_TEXTS.productGrid.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{DEFAULT_TEXTS.productGrid.sortOptions.default}</SelectItem>
                  <SelectItem value="price-asc">{DEFAULT_TEXTS.productGrid.sortOptions.priceAsc}</SelectItem>
                  <SelectItem value="price-desc">{DEFAULT_TEXTS.productGrid.sortOptions.priceDesc}</SelectItem>
                  <SelectItem value="newest">{DEFAULT_TEXTS.productGrid.sortOptions.newest}</SelectItem>
                  <SelectItem value="name">{DEFAULT_TEXTS.productGrid.sortOptions.name}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          /* Products Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={cardAnimation}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: shouldReduceMotion ? 0 : Math.min(index * cardAnimationDelay, 0.3), 
                  duration: shouldReduceMotion ? 0 : 0.4 
                }}
              >
                <ModernProductCard
                  product={product}
                  shopUrl={shopUrl}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  onToggleWishlist={onToggleWishlist}
                  isInWishlist={wishlist.includes(product.id)}
                  buttonStyle={buttonStyle}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 bg-muted">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-display text-foreground">
              {DEFAULT_TEXTS.productGrid.noProducts}
            </h3>
            <p className="font-body text-muted-foreground mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ModernProductGrid;
