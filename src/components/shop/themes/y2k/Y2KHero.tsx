import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/y2k-hero-model.jpg';

interface FloatingIconProps {
  children: React.ReactNode;
  delay: number;
  x: string;
  y: string;
}

const FloatingIcon = ({ children, delay, x, y }: FloatingIconProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 200 }}
    className="absolute z-10"
    style={{ left: x, top: y }}
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  </motion.div>
);

interface Y2KHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  shopUrl?: string;
  stats?: Array<{ value: string; label: string }>;
}

const defaultStats = [
  { value: '10K+', label: 'Happy Babes' },
  { value: '500+', label: 'Fresh Fits' },
  { value: '4.9', label: 'Vibes Rating' },
];

const Y2KHero = ({
  heroImage: customHeroImage,
  heroTitle = 'GLOW UP SZN',
  heroSubtitle = 'Streetwear qui a un impact différent. Couleurs audacieuses, coupes fraîches et énergie de personnage principal. Prêt à monter de niveau ?',
  heroButtonText = 'VOIR LA COLLECTION',
  heroButtonLink,
  shopUrl,
  stats = defaultStats,
}: Y2KHeroProps) => {
  const buttonHref = heroButtonLink || (shopUrl ? `/shop/${shopUrl}#products` : '#products');
  const displayImage = customHeroImage || heroImage;

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-background">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-gradient-primary p-1">
              <img
                src={displayImage}
                alt="Hero Model"
                className="w-full h-full object-cover rounded-[2.75rem]"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent rounded-[2.75rem]" />
            </div>

            {/* Floating Icons */}
            <FloatingIcon delay={0.5} x="5%" y="20%">
              <div className="w-14 h-14 rounded-2xl bg-primary/90 backdrop-blur flex items-center justify-center shadow-lg">
                <Star className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
              </div>
            </FloatingIcon>

            <FloatingIcon delay={0.7} x="85%" y="30%">
              <div className="w-12 h-12 rounded-xl bg-secondary/90 backdrop-blur flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-secondary-foreground fill-secondary-foreground" />
              </div>
            </FloatingIcon>

            <FloatingIcon delay={0.9} x="10%" y="70%">
              <div className="w-10 h-10 rounded-lg bg-accent/90 backdrop-blur flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-accent-foreground fill-accent-foreground" />
              </div>
            </FloatingIcon>
          </motion.div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 text-primary font-display font-bold text-sm px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                NEW COLLECTION
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight"
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {heroTitle.split(' ')[0]}
              </span>
              <br />
              <span className="text-foreground">
                {heroTitle.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-body text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              {heroSubtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to={buttonHref}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2 bg-gradient-primary text-primary-foreground font-display font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  {heroButtonText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-display font-bold text-sm px-8 py-4 rounded-full border-2 border-border hover:border-primary hover:text-primary transition-colors"
              >
                DÉCOUVRIR
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex gap-8 pt-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="block font-display font-black text-2xl lg:text-3xl bg-gradient-primary bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="font-body text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Y2KHero;
