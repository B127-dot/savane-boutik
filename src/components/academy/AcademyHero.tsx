import { motion } from 'framer-motion';
import { GraduationCap, PlayCircle, BookOpen } from 'lucide-react';

const AcademyHero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-medium">Formation E-commerce</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6"
          >
            Academy{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              BurkinaShop
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto"
          >
            Apprenez à créer et développer votre boutique en ligne avec nos tutoriels 
            gratuits. Du débutant à l'expert, devenez un pro du e-commerce.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground font-body">
                <span className="font-bold text-foreground">+30</span> Tutoriels
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground font-body">
                <span className="font-bold text-foreground">100%</span> Gratuit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground font-body">
                Tous niveaux
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademyHero;
