import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
}

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
}: ModernProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  // Filter and sort products
  const filteredProducts = products
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

  return (
    <section id="products" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            {sectionTitle}
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={DEFAULT_TEXTS.productGrid.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={DEFAULT_TEXTS.productGrid.allCategories} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{DEFAULT_TEXTS.productGrid.allCategories}</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Sort */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full md:w-[180px]">
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
          </motion.div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
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
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground text-lg">
              {DEFAULT_TEXTS.productGrid.noProducts}
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                className="mt-4"
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
