import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BlogHero = () => {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border border-primary/20 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Articles & Conseils E-commerce
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6"
          >
            Notre{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Blog
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Découvrez nos conseils, tutoriels et success stories pour développer 
            votre business e-commerce au Burkina Faso et en Afrique de l'Ouest.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 text-center"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">+50 Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-muted-foreground">Nouveaux articles chaque semaine</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
