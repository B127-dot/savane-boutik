import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

interface ArtisanHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
}

const ArtisanHero = ({
  heroImage,
  heroTitle = "Discover the perfect blend of style",
  heroSubtitle = "Handcrafted with love, designed for everyday elegance",
  heroButtonText = "Discover More",
  heroButtonLink = "#products"
}: ArtisanHeroProps) => {
  const { products } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get featured product for the mini card
  const featuredProduct = products.find(p => p.status === 'active' && p.stock > 0);

  const handleButtonClick = () => {
    if (heroButtonLink?.startsWith('#')) {
      const element = document.querySelector(heroButtonLink);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (heroButtonLink) {
      window.location.href = heroButtonLink;
    }
  };

  return (
    <section className="relative min-h-screen bg-artisan-cream overflow-hidden">
      {/* Main Content Grid */}
      <div className="container mx-auto px-6 pt-32 pb-16 lg:pt-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-artisan-charcoal leading-[1.1] tracking-tight"
            >
              {heroTitle}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-artisan-charcoal/70 text-base md:text-lg max-w-md leading-relaxed"
            >
              {heroSubtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                onClick={handleButtonClick}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-artisan-olive text-white rounded-full font-medium transition-all duration-300 hover:bg-artisan-olive-dark hover:shadow-lg hover:shadow-artisan-olive/20"
              >
                {heroButtonText}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Featured Product Mini Card */}
            {featuredProduct && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="inline-flex items-center gap-4 p-3 pr-6 bg-white rounded-2xl shadow-lg shadow-artisan-charcoal/5 max-w-xs"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-artisan-sand flex-shrink-0">
                  <img 
                    src={featuredProduct.images?.[0]} 
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-artisan-charcoal/50 mb-0.5">Featured</p>
                  <p className="font-medium text-artisan-charcoal text-sm truncate">{featuredProduct.name}</p>
                  <p className="text-artisan-olive font-semibold text-sm">{featuredProduct.price.toLocaleString()} FCFA</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-artisan-charcoal flex items-center justify-center flex-shrink-0 hover:bg-artisan-olive transition-colors">
                  <ArrowRight className="h-4 w-4 text-white" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Right - Hero Image with Organic Shape */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] lg:aspect-[3/4] rounded-[3rem] overflow-hidden"
            >
              {/* Background organic shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-artisan-sand via-artisan-cream to-artisan-sage/20 rounded-[3rem]" />
              
              {/* Hero Image */}
              {heroImage ? (
                <img 
                  src={heroImage} 
                  alt="Hero"
                  className="absolute inset-0 w-full h-full object-cover rounded-[3rem]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-artisan-sage/30 to-artisan-olive/20 rounded-[3rem]" />
              )}

              {/* Floating Controls */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4 text-artisan-charcoal" /> : <Play className="h-4 w-4 text-artisan-charcoal" />}
                </button>
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                  <ChevronLeft className="h-4 w-4 text-artisan-charcoal" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                  <ChevronRight className="h-4 w-4 text-artisan-charcoal" />
                </button>
              </div>

              {/* Chat Bubble */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-6 left-6 w-12 h-12 rounded-full bg-artisan-olive flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l4.93-1.38C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanHero;
