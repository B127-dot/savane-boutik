import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/contexts/AppContext';
import { Link } from 'react-router-dom';

interface AesthetiqueBestSellersProps {
  products: Product[];
  shopUrl: string;
  onAddToCart: (product: Product) => void;
}

const AesthetiqueBestSellers = ({ products, shopUrl, onAddToCart }: AesthetiqueBestSellersProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Get best sellers (most popular or featured products)
  const bestSellers = products.filter(p => p.status === 'active').slice(0, 6);

  if (bestSellers.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-950 overflow-hidden relative">
      {/* Header */}
      <div className="px-6 md:px-12 mb-12 flex justify-between items-end">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-instrument-serif text-white tracking-tight"
        >
          Meilleures Ventes
        </motion.h2>
        
        <div className="flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className={`flex w-full overflow-x-auto pl-6 md:pl-12 pb-12 select-none scrollbar-hide ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-6 min-w-max pr-12">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative w-[300px] md:w-[400px] h-[500px] rounded-[2rem] overflow-hidden group"
            >
              <Link to={`/shop/${shopUrl}/product/${product.id}`} draggable={false}>
                <img 
                  src={product.images?.[0]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  draggable={false}
                  alt={product.name}
                />
              </Link>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Product Info */}
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
                  Collection
                </span>
                <h3 className="text-2xl md:text-3xl font-instrument-serif text-white">
                  {product.name}
                </h3>
                <p className="text-zinc-400 mt-2">
                  {product.price.toLocaleString()} FCFA
                </p>
              </div>

              {/* Add to Cart on Hover */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(product);
                }}
                className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-emerald-400 hover:text-white"
              >
                <span className="text-xl">+</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AesthetiqueBestSellers;
