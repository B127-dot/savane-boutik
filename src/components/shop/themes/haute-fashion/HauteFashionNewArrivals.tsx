import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/contexts/AppContext';
import { useRef } from 'react';
import { HauteFashionProductCard } from './index';

interface HauteFashionNewArrivalsProps {
  products: Product[];
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
}

const HauteFashionNewArrivals = ({ 
  products, 
  shopUrl,
  onAddToCart, 
  onQuickView,
  onToggleWishlist,
  wishlist 
}: HauteFashionNewArrivalsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        {/* Section Header - Urban Wave Style */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Découvrez
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-white">PRODUITS </span>
              <span className="text-gradient">TENDANCE</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Une sélection pointue de pièces essentielles pour votre garde-robe urbaine
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="h-12 w-12 rounded-full border-white/20 bg-white/5 hover:bg-white/10 hover:border-primary/50"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="h-12 w-12 rounded-full border-white/20 bg-white/5 hover:bg-white/10 hover:border-primary/50"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Products Grid - 3 columns on desktop */}
        <div 
          ref={scrollContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {products.slice(0, 9).map((product) => (
            <HauteFashionProductCard
              key={product.id}
              product={product}
              shopUrl={shopUrl}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-2 group">
            Voir tous les produits
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HauteFashionNewArrivals;
