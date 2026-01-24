import { motion } from 'framer-motion';
import { ShopSettings } from '@/contexts/AppContext';

interface SavaneHeroProps {
  settings: ShopSettings;
}

const SavaneHero = ({ settings }: SavaneHeroProps) => {
  const heroImage = settings.heroImage || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&h=1080&fit=crop';
  const heroTitle = settings.heroTitle || 'DROP 001';
  const heroCta = settings.heroButtonText || 'ACHETER MAINTENANT';

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        src={heroImage}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-heading text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-[0.05em] text-background text-center mb-8"
        >
          {heroTitle}
        </motion.h1>
        
        <motion.a
          href="#shop"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="inline-block px-10 py-4 bg-background text-foreground font-heading text-sm uppercase tracking-[0.2em] border border-background hover:bg-transparent hover:text-background transition-colors"
        >
          {heroCta}
        </motion.a>
      </div>
    </section>
  );
};

export default SavaneHero;
