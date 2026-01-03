import { motion } from 'framer-motion';
import { Gem, Leaf, Clock, Heart } from 'lucide-react';

const features = [
  {
    icon: Gem,
    title: 'Handcrafted Quality',
    description: 'Every product is a labor of love, ensuring you receive a product of exceptional quality and uniqueness.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Fashion',
    description: 'We are committed to using eco-friendly materials and sustainable practices in our production process.',
  },
  {
    icon: Clock,
    title: 'Timeless Design',
    description: 'Our designs are timeless, versatile, and perfect for any occasion.',
  },
  {
    icon: Heart,
    title: 'Support Artisans',
    description: 'By choosing our products, you support skilled artisans and contribute to preserving traditional crafts.',
  },
];

interface ArtisanWhyChooseProps {
  shopName?: string;
}

const ArtisanWhyChoose = ({ shopName = "notre boutique" }: ArtisanWhyChooseProps) => {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-artisan-charcoal mb-4"
          >
            Why Choose <span className="italic">{shopName}</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-artisan-charcoal/60 max-w-xl mx-auto"
          >
            Explore our diverse range of products, each thoughtfully designed to cater to your needs and style preferences.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              {/* Icon Container */}
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl border border-artisan-charcoal/10 bg-artisan-cream/50 group-hover:bg-artisan-olive/10 group-hover:border-artisan-olive/30 transition-all duration-300">
                <feature.icon className="h-7 w-7 text-artisan-charcoal/70 group-hover:text-artisan-olive transition-colors duration-300" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="font-serif text-xl text-artisan-charcoal mb-3">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-artisan-charcoal/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtisanWhyChoose;
