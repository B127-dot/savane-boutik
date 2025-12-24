import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  TrendingUp, 
  BookOpen, 
  Trophy,
  LayoutGrid 
} from 'lucide-react';

interface BlogCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'Tous', icon: LayoutGrid },
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingBag },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp },
  { id: 'tutoriels', label: 'Tutoriels', icon: BookOpen },
  { id: 'success', label: 'Success Stories', icon: Trophy },
];

const BlogCategories = ({ activeCategory, onCategoryChange }: BlogCategoriesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {categories.map((category, index) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant={isActive ? "default" : "outline"}
              className={`
                gap-2 rounded-full px-5 py-2 transition-all duration-300
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                  : 'bg-card/50 border-border/50 hover:border-primary/30 hover:bg-primary/5'
                }
              `}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default BlogCategories;
