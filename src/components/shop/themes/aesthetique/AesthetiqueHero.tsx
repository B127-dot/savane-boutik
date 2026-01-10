import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface AesthetiqueHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  collectionLabel?: string;
}

const AesthetiqueHero = ({
  heroImage = "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2727&auto=format&fit=crop",
  heroTitle = "Objects for the Soulful Home",
  heroSubtitle = "Collection 04 • Fall 2024",
  heroButtonText = "Voir la Collection",
  heroButtonLink = "#products",
  collectionLabel = "Collection 04 • Fall 2024"
}: AesthetiqueHeroProps) => {

  const handleButtonClick = () => {
    if (heroButtonLink?.startsWith('#')) {
      const element = document.querySelector(heroButtonLink);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (heroButtonLink) {
      window.location.href = heroButtonLink;
    }
  };

  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <img 
          src={heroImage} 
          className="w-full h-full object-cover" 
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl"
      >
        {/* Collection Label */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base uppercase tracking-[0.2em] text-zinc-300 mb-6 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md"
        >
          {collectionLabel}
        </motion.span>
        
        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-instrument-serif leading-[0.95] tracking-tight text-white mb-8"
        >
          {heroTitle.split(' ').slice(0, 3).join(' ')} <br />
          <span className="italic text-zinc-400">{heroTitle.split(' ').slice(3).join(' ')}</span>
        </motion.h1>
        
        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-6 mt-4"
        >
          <button
            onClick={handleButtonClick}
            className="bg-white text-zinc-950 px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors min-w-[180px]"
          >
            {heroButtonText}
          </button>
          <a 
            href="#about" 
            className="group flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-all"
          >
            <span>Notre Philosophie</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToProducts}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6 text-zinc-500" />
        </motion.div>
      </motion.div>
    </header>
  );
};

export default AesthetiqueHero;
