import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/urbanwave-hero.jpg';

interface UrbanwaveHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  shopUrl?: string;
}

const UrbanwaveHero = ({
  heroImage: customHeroImage,
  heroTitle = 'DÉFINISSEZ VOTRE STYLE',
  heroSubtitle = 'Découvrez notre collection streetwear exclusive. Des pièces uniques pour affirmer votre identité urbaine.',
  heroButtonText = 'Explorer la collection',
  heroButtonLink = '#products',
  shopUrl = '',
}: UrbanwaveHeroProps) => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={customHeroImage || heroImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-primary font-medium mb-4 tracking-widest text-sm"
          >
            Nouvelle Collection 2025
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6"
          >
            {heroTitle.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? 'text-gradient' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8 max-w-lg"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="xl"
              variant="hero"
              onClick={scrollToProducts}
              className="btn-glow"
            >
              {heroButtonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="xl" variant="outline">
              Voir le lookbook
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-8 mt-16"
          >
            {[
              { value: '500+', label: 'Produits exclusifs' },
              { value: '50K', label: 'Clients satisfaits' },
              { value: '24H', label: 'Livraison express' },
            ].map((stat, index) => (
              <div key={index}>
                <span className="block font-display text-3xl text-gradient">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UrbanwaveHero;
