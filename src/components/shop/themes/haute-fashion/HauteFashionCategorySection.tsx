import { Category, Product } from '@/contexts/AppContext';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HauteFashionCategorySectionProps {
  categories: Category[];
  products: Product[];
  onCategoryClick: (categoryName: string) => void;
}

const HauteFashionCategorySection = ({ categories, products, onCategoryClick }: HauteFashionCategorySectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getProductCountByCategory = (categoryId: string) => {
    return products.filter(p => p.categoryId === categoryId && p.status === 'active').length;
  };

  const getCategoryImage = (categoryId: string) => {
    const categoryProducts = products.filter(p => p.categoryId === categoryId && p.status === 'active');
    return categoryProducts[0]?.images[0] || '/placeholder.svg';
  };

  // Get first 4 categories with products
  const displayCategories = categories
    .filter(cat => getProductCountByCategory(cat.id) > 0)
    .slice(0, 4);

  if (displayCategories.length === 0) return null;

  // Get featured product for the left card stack
  const featuredProduct = products.find(p => p.status === 'active' && p.images[0]);

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Explorez par catégorie
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-white">NOS </span>
              <span className="text-gradient">CATÉGORIES</span>
            </h2>
          </div>
          <Button 
            variant="outline" 
            className="w-fit border-white/20 bg-transparent hover:bg-white/5 text-white rounded-full"
          >
            Toutes les catégories
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Layout: Featured Card + Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Featured Product Card Stack */}
          {featuredProduct && (
            <div className="relative group">
              {/* Stacked cards effect */}
              <div className="absolute inset-0 bg-card/30 rounded-2xl transform rotate-3 scale-95 border border-white/10" />
              <div className="absolute inset-0 bg-card/50 rounded-2xl transform -rotate-2 scale-97 border border-white/10" />
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 overflow-hidden">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4">
                  <img 
                    src={featuredProduct.images[0]} 
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                    {categories.find(c => c.id === featuredProduct.categoryId)?.name || 'Collection'}
                  </span>
                  <h3 className="text-xl font-bold text-white">{featuredProduct.name}</h3>
                  <p className="text-2xl font-bold text-gradient">
                    {featuredProduct.price.toLocaleString()} FCFA
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Cliquez et déplacez-vous →
                </p>
              </div>
            </div>
          )}

          {/* Right: Categories Grid 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            {displayCategories.map((category, index) => {
              const productCount = getProductCountByCategory(category.id);
              const isHovered = hoveredCard === index;
              
              return (
                <div
                  key={category.id}
                  className={`group relative p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                    isHovered 
                      ? 'bg-card/60 border-primary/30 -translate-y-1 shadow-[0_0_30px_rgba(255,107,0,0.15)]' 
                      : 'bg-card/30 border-white/10 hover:bg-card/40'
                  }`}
                  onClick={() => onCategoryClick(category.name)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Category Icon/Image */}
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary text-lg font-bold">
                      {category.name.charAt(0)}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {productCount} produit{productCount > 1 ? 's' : ''}
                  </p>

                  {/* Arrow */}
                  <div className={`absolute bottom-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'bg-primary text-white' : 'bg-white/10 text-white/60'
                  }`}>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HauteFashionCategorySection;
