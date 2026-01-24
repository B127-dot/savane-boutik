import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [sortBy, setSortBy] = useState<string>('newest');

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
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        // Assuming newer products have higher IDs or we keep original order
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <section className="py-12 md:py-16 y2k-theme">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-outfit text-xs font-medium text-primary uppercase tracking-wider">
              Notre Collection
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-outfit font-black">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Nos Produits
            </span>
          </h2>
        </motion.div>

        {/* Filters Row */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-5 rounded-xl border-2 border-border/50 focus:border-primary font-outfit bg-background/80"
            />
          </div>

          {/* Category Pills + Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category Pills - Horizontally Scrollable */}
            <div className="flex-1 overflow-x-auto pb-1 scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full font-outfit font-semibold text-xs whitespace-nowrap ${
                    selectedCategory === null 
                      ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0' 
                      : 'hover:border-primary/50'
                  }`}
                >
                  Tous
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-full font-outfit font-semibold text-xs whitespace-nowrap ${
                      selectedCategory === cat.id 
                        ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0' 
                        : 'hover:border-primary/50'
                    }`}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl font-outfit border-2 border-border/50 focus:border-primary">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent className="font-outfit">
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name-asc">Nom A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid - Uniform Layout */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <Y2kProductCard
                key={product.id}
                product={product}
                shopUrl={shopUrl}
                isNew={index < 3}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary/50" />
            </div>
            <p className="text-xl font-outfit font-bold text-foreground mb-2">
              Aucun produit trouvé
            </p>
            <p className="text-muted-foreground font-outfit mb-4">
              Essayez de modifier vos filtres
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="rounded-full font-outfit"
            >
              Réinitialiser les filtres
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Y2kProductGrid;
