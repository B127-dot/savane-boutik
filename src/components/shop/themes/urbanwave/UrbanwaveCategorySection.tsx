import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    name: 'Hoodies & Sweats',
    description: 'Confort et style urbain',
    count: 45,
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    name: 'T-Shirts',
    description: 'Basics et graphiques',
    count: 78,
    gradient: 'from-accent/20 to-accent/5',
  },
  {
    name: 'Pantalons',
    description: 'Cargo, joggers, denim',
    count: 34,
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    name: 'Vestes',
    description: 'Bombers, coaches, parkas',
    count: 28,
    gradient: 'from-accent/20 to-accent/5',
  },
];

const UrbanwaveCategorySection = () => {
  return (
    <section id="categories" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm tracking-widest font-medium mb-2 block">
              Explorez par catégorie
            </span>
            <h2 className="font-display text-4xl md:text-5xl">NOS CATÉGORIES</h2>
          </motion.div>
          <Button variant="ghost" className="text-primary group self-start md:self-auto">
            Toutes les catégories
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${category.gradient} border border-border hover:border-primary/50 transition-all cursor-pointer card-hover`}
            >
              <div className="relative z-10">
                <h3 className="font-display text-2xl mb-1">{category.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                  {category.count} produits
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UrbanwaveCategorySection;
