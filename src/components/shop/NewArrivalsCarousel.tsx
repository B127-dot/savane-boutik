import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/contexts/AppContext';
import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ModernProductCard from './themes/modern/ModernProductCard';
import ElegantProductCard from './themes/elegant/ElegantProductCard';

interface NewArrivalsCarouselProps {
  products: Product[];
  shopUrl: string;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
}

const NewArrivalsCarousel = ({ 
  products, 
  shopUrl,
  onAddToCart, 
  onQuickView,
  onToggleWishlist,
  wishlist 
}: NewArrivalsCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { themeId } = useTheme();
  const ProductCard = themeId === 'elegant' ? ElegantProductCard : ModernProductCard;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
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
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Nouveautés de la Semaine
            </h2>
            <p className="text-muted-foreground">
              Découvrez nos derniers produits ajoutés
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-72 snap-start"
            >
              <ProductCard
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

export default NewArrivalsCarousel;
