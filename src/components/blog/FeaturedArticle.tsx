import { motion } from 'framer-motion';
import { Clock, User, ArrowRight, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
}

const FeaturedArticle = ({ 
  title, 
  excerpt, 
  image, 
  category, 
  author, 
  date, 
  readTime,
}: FeaturedArticleProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative mb-16"
    >
      <div className="grid md:grid-cols-2 gap-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300">
        {/* Image */}
        <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent md:bg-gradient-to-t" />
          
          {/* Featured Badge */}
          <div className="absolute top-6 left-6">
            <Badge className="bg-primary text-primary-foreground border-0 px-4 py-2">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Article à la une
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:py-12 flex flex-col justify-center">
          {/* Category */}
          <Badge className="w-fit mb-4 bg-primary/10 text-primary border border-primary/20">
            {category}
          </Badge>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span>{author}</span>
            </div>
            <span className="text-border">•</span>
            <span>{date}</span>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* CTA */}
          <Button variant="hero" className="w-fit group/btn">
            Lire l'article complet
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default FeaturedArticle;
