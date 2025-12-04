import { Store, Smartphone, TrendingUp, Clock, Zap, Layers, BarChart3 } from 'lucide-react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
const ThreePillarsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    elementRef: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation({
    threshold: 0.2
  });
  const {
    elementRef: cardsRef,
    isVisible: cardsVisible
  } = useScrollAnimation({
    threshold: 0.1
  });
  const {
    elementRef: bulletsRef,
    isVisible: bulletsVisible
  } = useScrollAnimation({
    threshold: 0.2
  });

  // Parallax effect for the section
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Animation variants
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };
  const bulletVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0
    }
  };
  return <section ref={sectionRef} className="relative py-20 sm:py-24 md:py-28 max-w-7xl mx-auto px-4 sm:px-6" aria-labelledby="pillars-title">
      {/* Ambient gradient with parallax */}
      <motion.div style={{
      y
    }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -top-16 w-[42rem] h-[42rem] rounded-full bg-gradient-to-b from-primary/15 via-primary/10 to-transparent blur-3xl"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div ref={headerRef} initial={{
        opacity: 0,
        y: 30
      }} animate={headerVisible ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 30
      }} transition={{
        duration: 0.6,
        ease: "easeOut"
      }} className="text-center mb-12">
          <h2 id="pillars-title" className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Nos 3 Piliers
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            Une solution complète pour transformer votre commerce en Afrique
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Commerce Simplifié */}
          <motion.div initial="hidden" animate={cardsVisible ? "visible" : "hidden"} variants={cardVariants} transition={{
          delay: 0,
          duration: 0.6,
          ease: [0.21, 0.45, 0.27, 0.9]
        }} whileHover={{
          y: -8,
          scale: 1.02
        }} className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md p-6 sm:p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 shadow-xl shadow-black/5">
            {/* Grid pattern background */}
            <div className="pointer-events-none absolute inset-0 opacity-20 rounded-3xl" style={{
            backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px)',
            backgroundSize: '48px 48px'
          }}></div>
            
            {/* Inner ring effect */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />
            
            <div className="relative flex w-10 h-10 ring-1 ring-primary/20 bg-primary/10 rounded-full shadow-lg items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            
            <h3 className="relative mt-5 text-2xl sm:text-3xl font-display font-semibold tracking-tight text-center">
              Lancez en 5 minutes
            </h3>
            <p className="relative mt-2 font-body text-muted-foreground text-sm sm:text-base">
              Gérez vos produits, stock et commandes depuis un seul tableau de bord intuitif.
            </p>

            {/* Illustration: Product icons converging */}
            <div className="relative mt-6 rounded-2xl p-4 ring-1 ring-border bg-gradient-to-b from-card to-transparent">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none"></div>

              {/* Icon row */}
              <div className="relative flex items-center justify-between gap-2">
                <div className="w-8 h-8 rounded-full bg-card ring-1 ring-border flex items-center justify-center text-foreground">
                  <Store className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-card ring-1 ring-border flex items-center justify-center text-foreground">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-card ring-1 ring-border flex items-center justify-center text-foreground">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-card ring-1 ring-border flex items-center justify-center text-foreground">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-card ring-1 ring-border flex items-center justify-center text-foreground">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>

              {/* Curves to center */}
              <svg viewBox="0 0 320 100" fill="none" strokeWidth="2" className="relative max-w-[320px] mt-6 mx-auto w-full h-[24px] opacity-95">
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path d="M20 5 C60 40, 120 40, 160 85" stroke="url(#g1)" strokeWidth="1.2" opacity="0.7" />
                <path d="M85 5 C110 40, 140 40, 160 85" stroke="url(#g1)" strokeWidth="1.2" opacity="0.7" />
                <path d="M150 5 C155 40, 160 40, 160 85" stroke="url(#g1)" strokeWidth="1.2" opacity="0.7" />
                <path d="M235 5 C210 40, 180 40, 160 85" stroke="url(#g1)" strokeWidth="1.2" opacity="0.7" />
                <path d="M300 5 C260 40, 200 40, 160 85" stroke="url(#g1)" strokeWidth="1.2" opacity="0.7" />
              </svg>

              <div className="relative mx-auto mt-2 w-10 h-10 rounded-full bg-gradient-to-b from-primary to-primary/80 ring-1 ring-primary/20 shadow-xl flex items-center justify-center">
                <Store className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Paiements Locaux */}
          <motion.div initial="hidden" animate={cardsVisible ? "visible" : "hidden"} variants={cardVariants} transition={{
          delay: 0.15,
          duration: 0.6,
          ease: [0.21, 0.45, 0.27, 0.9]
        }} whileHover={{
          y: -8,
          scale: 1.02
        }} className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md p-6 sm:p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 shadow-xl shadow-black/5">
            {/* Grid pattern background */}
            <div className="pointer-events-none absolute inset-0 opacity-20 rounded-3xl" style={{
            backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px)',
            backgroundSize: '48px 48px'
          }}></div>
            
            {/* Inner ring effect */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />
            
            <div className="relative flex w-10 h-10 ring-1 ring-primary/20 bg-primary/10 rounded-full shadow-lg items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            
            <h3 className="relative mt-5 text-2xl sm:text-3xl font-display font-semibold tracking-tight text-center">
              ​Paiements Locaux
            </h3>
            <p className="relative mt-2 font-body text-muted-foreground text-sm sm:text-base">
              Tous les moyens de paiement que vos clients utilisent déjà au Burkina Faso.
            </p>

            {/* Illustration: Payment methods cloud */}
            <div className="relative mt-6 rounded-2xl p-4 ring-1 ring-border bg-gradient-to-b from-card to-transparent overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none"></div>

              <div className="relative grid grid-cols-3 gap-2 text-[11px] sm:text-xs">
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground/80">Orange Money</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground/70">Moov Money</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground/70">Carte Bancaire</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground/60">Espèces</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground/70">CynetPay</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground/60">Instantané</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground/70">100% Sécurisé</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground/70">24/7</span>
                <span className="px-2.5 py-1 rounded-full bg-card border border-border text-foreground/70">0% Frais</span>
              </div>

              {/* Verified badge */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="hidden sm:inline-flex gap-2 hover:from-primary hover:to-primary/80 transition-colors shadow-primary/25 text-sm font-medium text-primary-foreground bg-gradient-to-l from-primary to-primary/90 border-primary/50 border rounded-full p-4 shadow-md items-center">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Croissance Garantie */}
          <motion.div initial="hidden" animate={cardsVisible ? "visible" : "hidden"} variants={cardVariants} transition={{
          delay: 0.3,
          duration: 0.6,
          ease: [0.21, 0.45, 0.27, 0.9]
        }} whileHover={{
          y: -8,
          scale: 1.02
        }} className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md p-6 sm:p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 shadow-xl shadow-black/5">
            {/* Grid pattern background */}
            <div className="pointer-events-none absolute inset-0 opacity-20 rounded-3xl" style={{
            backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px)',
            backgroundSize: '48px 48px'
          }}></div>
            
            {/* Inner ring effect */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />
            
            <div className="relative flex w-10 h-10 ring-1 ring-primary/20 bg-primary/10 rounded-full shadow-lg items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            
            <h3 className="relative mt-5 text-2xl sm:text-3xl font-display font-semibold tracking-tight text-center">
              Vendez 3x plus
            </h3>
            <p className="relative mt-2 font-body text-muted-foreground text-sm sm:text-base">
              Analytics en temps réel pour piloter votre business et maximiser vos ventes.
            </p>

            {/* Illustration: Bar chart */}
            <div className="relative mt-6 rounded-2xl p-4 ring-1 ring-border bg-gradient-to-b from-card to-transparent">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none"></div>

              <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/30 to-primary/20 border border-primary/20 text-xs sm:text-sm text-foreground shadow-md">
                <span className="w-2 h-2 rounded-full bg-primary ring-1 ring-primary/40"></span>
                Analytics en direct
              </div>

              {/* Control panel with chart */}
              <div className="relative mt-4 rounded-xl bg-card/40 ring-1 ring-border px-3 py-3 flex items-center gap-3">
                <button className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-b from-primary to-primary/80 ring-1 ring-primary/20 flex items-center justify-center text-primary-foreground shadow-md">
                  <TrendingUp className="w-[18px] h-[18px]" />
                </button>
                {/* Chart visualization */}
                <div className="flex-1 flex items-end gap-1">
                  <div className="w-1 bg-primary/60 rounded-full h-3"></div>
                  <div className="w-1 bg-primary/70 rounded-full h-6"></div>
                  <div className="w-1 bg-primary/60 rounded-full h-4"></div>
                  <div className="w-1 bg-primary/80 rounded-full h-8"></div>
                  <div className="w-1 bg-primary/50 rounded-full h-3"></div>
                  <div className="w-1 bg-primary/70 rounded-full h-6"></div>
                  <div className="w-1 bg-primary/60 rounded-full h-4"></div>
                  <div className="w-1 bg-primary/80 rounded-full h-7"></div>
                  <div className="w-1 bg-primary/50 rounded-full h-3"></div>
                  <div className="w-1 bg-primary/70 rounded-full h-5"></div>
                  <div className="w-1 bg-primary/60 rounded-full h-4"></div>
                  <div className="w-1 bg-primary/80 rounded-full h-7"></div>
                  <div className="w-1 bg-primary/50 rounded-full h-3"></div>
                  <div className="w-1 bg-primary/70 rounded-full h-6"></div>
                  <div className="w-1 bg-primary/60 rounded-full h-4"></div>
                </div>
                <div className="shrink-0 w-2.5 h-6 rounded-full bg-gradient-to-b from-primary to-primary/80"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature bullets */}
        <div ref={bulletsRef} className="mt-10 sm:mt-12 border-t border-border pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial="hidden" animate={bulletsVisible ? "visible" : "hidden"} variants={bulletVariants} transition={{
            delay: 0,
            duration: 0.5,
            ease: "easeOut"
          }} className="flex items-start gap-3">
              <span className="inline-flex w-9 h-9 ring-1 ring-border items-center justify-center bg-card rounded-full">
                <Clock className="w-[18px] h-[18px] text-primary" />
              </span>
              <div>
                <p className="text-sm font-display font-medium text-foreground">Temps Réel</p>
                <p className="text-sm font-body text-muted-foreground mt-1">Gestion instantanée de vos commandes.</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" animate={bulletsVisible ? "visible" : "hidden"} variants={bulletVariants} transition={{
            delay: 0.1,
            duration: 0.5,
            ease: "easeOut"
          }} className="flex items-start gap-3">
              <span className="inline-flex w-9 h-9 ring-1 ring-border items-center justify-center bg-card rounded-full">
                <Zap className="w-[18px] h-[18px] text-primary" />
              </span>
              <div>
                <p className="text-sm font-display font-medium text-foreground">Automatisation Intelligente</p>
                <p className="text-sm font-body text-muted-foreground mt-1">Workflows qui s'adaptent à votre business.</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" animate={bulletsVisible ? "visible" : "hidden"} variants={bulletVariants} transition={{
            delay: 0.2,
            duration: 0.5,
            ease: "easeOut"
          }} className="flex items-start gap-3">
              <span className="inline-flex w-9 h-9 ring-1 ring-border items-center justify-center bg-card rounded-full">
                <Layers className="w-[18px] h-[18px] text-primary" />
              </span>
              <div>
                <p className="text-sm font-display font-medium text-foreground">Architecture Évolutive</p>
                <p className="text-sm font-body text-muted-foreground mt-1">Grandit avec votre entreprise.</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" animate={bulletsVisible ? "visible" : "hidden"} variants={bulletVariants} transition={{
            delay: 0.3,
            duration: 0.5,
            ease: "easeOut"
          }} className="flex items-start gap-3">
              <span className="inline-flex w-9 h-9 ring-1 ring-border items-center justify-center bg-card rounded-full">
                <TrendingUp className="w-[18px] h-[18px] text-primary" />
              </span>
              <div>
                <p className="text-sm font-display font-medium text-foreground">Analytics Avancés</p>
                <p className="text-sm font-body text-muted-foreground mt-1">Insights précis pour décider mieux.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
};
export default ThreePillarsSection;