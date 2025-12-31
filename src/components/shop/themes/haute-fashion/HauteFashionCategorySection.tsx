import { Category, Product } from '@/contexts/AppContext';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HauteFashionCategorySectionProps {
  categories: Category[];
  products: Product[];
  onCategoryClick: (categoryName: string) => void;
}

// Category metadata with descriptions
const categoryMeta: Record<string, { description: string; color: string }> = {
  'Hoodies & Sweats': { description: 'Confort et style urbain', color: 'from-emerald-900/80 to-emerald-950/60' },
  'T-Shirts': { description: 'Basics et graphiques', color: 'from-emerald-800/70 to-emerald-900/50' },
  'Pantalons': { description: 'Cargo, joggers, denim', color: 'from-emerald-900/80 to-emerald-950/60' },
  'Vestes': { description: 'Bombers, coaches, parkas', color: 'from-emerald-800/70 to-emerald-900/50' },
  // Fallback for other categories
  'default': { description: 'Découvrez notre collection', color: 'from-emerald-900/80 to-emerald-950/60' }
};

const HauteFashionCategorySection = ({ categories, products, onCategoryClick }: HauteFashionCategorySectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const getProductCountByCategory = (categoryId: string) => {
    return products.filter(p => p.categoryId === categoryId && p.status === 'active').length;
  };

  // Get first 4 categories with products
  const displayCategories = categories
    .filter(cat => getProductCountByCategory(cat.id) > 0)
    .slice(0, 4);

  if (displayCategories.length === 0) return null;

  // Get featured products for the left card stack
  const featuredProducts = products.filter(p => p.status === 'active' && p.images[0]).slice(0, 3);
  const currentProduct = featuredProducts[currentProductIndex] || featuredProducts[0];

  const getMeta = (name: string) => categoryMeta[name] || categoryMeta['default'];

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-white/80 bg-white/5 border border-white/10 rounded-full mb-4">
              Explorez par catégorie
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="text-white">NOS </span>
              <span className="text-gradient">CATÉGORIES</span>
            </h2>
          </div>
          <Button 
            variant="outline" 
            className="w-fit border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full px-6"
          >
            Toutes les catégories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Layout: Featured Card + Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Featured Product Card Stack */}
          {currentProduct && (
            <div className="relative group cursor-pointer" onClick={() => setCurrentProductIndex((prev) => (prev + 1) % featuredProducts.length)}>
              {/* Stacked cards effect - back cards */}
              <div className="absolute inset-x-4 top-2 bottom-0 bg-card/20 rounded-2xl transform scale-[0.92] border border-white/5" />
              <div className="absolute inset-x-2 top-1 bottom-0 bg-card/30 rounded-2xl transform scale-[0.96] border border-white/5" />
              
              {/* Main card */}
              <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-white/10">
                {/* Image container */}
                <div className="relative aspect-[4/5] overflow-hidden p-3">
                  <img 
                    src={currentProduct.images[0]} 
                    alt={currentProduct.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Price overlay on image */}
                  <div className="absolute top-6 right-6 text-right">
                    {currentProduct.originalPrice && currentProduct.originalPrice > currentProduct.price && (
                      <p className="text-sm text-white/50 line-through">
                        {currentProduct.originalPrice.toLocaleString()} €
                      </p>
                    )}
                    <p className="text-xl font-bold text-primary drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]">
                      {currentProduct.price.toLocaleString()} €
                    </p>
                  </div>
                </div>
                
                {/* Product info */}
                <div className="p-5 pt-0">
                  <span className="text-xs font-medium tracking-wider uppercase text-white/40">
                    {categories.find(c => c.id === currentProduct.categoryId)?.name || 'Collection'} • Style urbain
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{currentProduct.name}</h3>
                  <p className="text-sm text-white/50 mt-1">
                    Coton premium • Coupe décontractée
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="px-5 pb-5">
                  <p className="text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer">
                    Cliquez pour découvrir →
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Right: Categories Grid 2x2 */}
          <div className="grid grid-cols-2 gap-3">
            {displayCategories.map((category, index) => {
              const productCount = getProductCountByCategory(category.id);
              const isHovered = hoveredCard === index;
              const meta = getMeta(category.name);
              
              return (
                <div
                  key={category.id}
                  className={`group relative p-5 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-br ${meta.color} border ${
                    isHovered 
                      ? 'border-primary/40 -translate-y-1 shadow-[0_0_30px_rgba(255,107,0,0.2)]' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => onCategoryClick(category.name)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Content */}
                  <div className="flex flex-col h-full min-h-[140px]">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base md:text-lg font-bold text-white leading-tight">
                          {category.name}
                        </h3>
                        {/* Arrow button */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                          isHovered ? 'bg-primary text-white scale-110' : 'bg-white/10 text-white/60'
                        }`}>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="text-sm text-white/50">
                        {meta.description}
                      </p>
                    </div>
                    
                    {/* Product count badge */}
                    <div className="mt-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                        {productCount} <span className="text-primary/70 ml-1">produits</span>
                      </span>
                    </div>
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
