import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingIconProps {
  icon: React.ElementType;
  className?: string;
  delay?: number;
}

const FloatingIcon = ({ icon: Icon, className, delay = 0 }: FloatingIconProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -20, 0]
    }}
    transition={{
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5, type: "spring" },
      y: { delay: delay + 0.5, duration: 6, repeat: Infinity, ease: "easeInOut" }
    }}
    className={className}
  >
    <Icon className="w-full h-full" />
  </motion.div>
);

interface Y2kHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  heroImage?: string;
}

export const Y2kHero = ({ 
  title = "GLOW UP SZN",
  subtitle = "Slay every day with our curated collection of Y2K-inspired fits that hit different ✨",
  ctaText = "SHOP NOW",
  onCtaClick,
  heroImage
}: Y2kHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 y2k-theme">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating Decorations */}
      <FloatingIcon 
        icon={Sparkles} 
        className="absolute top-32 left-[10%] w-8 h-8 text-primary" 
        delay={0.2}
      />
      <FloatingIcon 
        icon={Heart} 
        className="absolute top-48 right-[15%] w-10 h-10 text-secondary" 
        delay={0.4}
      />
      <FloatingIcon 
        icon={Zap} 
        className="absolute bottom-40 left-[20%] w-7 h-7 text-accent" 
        delay={0.6}
      />
      <FloatingIcon 
        icon={Star} 
        className="absolute bottom-32 right-[25%] w-9 h-9 text-primary" 
        delay={0.8}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-outfit text-sm font-medium text-primary">NEW DROP 2025</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-outfit font-black leading-none mb-6"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground font-outfit max-w-md mx-auto lg:mx-0 mb-8"
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={onCtaClick}
                className="group px-8 py-6 text-lg font-outfit font-bold rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all glow-pink"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 text-lg font-outfit font-bold rounded-full border-2 border-primary/50 hover:bg-primary/10 transition-all"
              >
                VIEW LOOKBOOK
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              <div className="text-center">
                <p className="text-3xl font-outfit font-black text-primary">50K+</p>
                <p className="text-sm text-muted-foreground font-outfit">Happy Babes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-outfit font-black text-secondary">4.9</p>
                <p className="text-sm text-muted-foreground font-outfit">Vibes Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-outfit font-black text-accent">100%</p>
                <p className="text-sm text-muted-foreground font-outfit">Slay Guarantee</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glow-purple">
              {heroImage ? (
                <img 
                  src={heroImage} 
                  alt="Hero" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                  <Sparkles className="w-24 h-24 text-primary/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-card px-6 py-4 rounded-2xl shadow-xl border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="font-outfit font-bold text-sm">Trending Now 🔥</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Y2kHero;
