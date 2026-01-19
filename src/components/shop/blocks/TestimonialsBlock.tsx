import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  avatar?: string;
}

interface TestimonialsBlockProps {
  title?: string;
  testimonials?: Testimonial[];
  animationsEnabled?: boolean;
  config?: {
    title?: string;
    testimonials?: Testimonial[];
  };
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Fatou Traoré',
    location: 'Ouagadougou',
    rating: 5,
    text: 'Livraison rapide et produits de qualité ! Je recommande vivement cette boutique.',
  },
  {
    id: '2',
    name: 'Ibrahim Kaboré',
    location: 'Bobo-Dioulasso',
    rating: 5,
    text: 'Service client exceptionnel. Ils ont répondu à toutes mes questions sur WhatsApp.',
  },
  {
    id: '3',
    name: 'Aminata Ouédraogo',
    location: 'Koudougou',
    rating: 4,
    text: 'Très satisfaite de mes achats. Les prix sont raisonnables et la livraison fiable.',
  },
];

const TestimonialsBlock = ({ 
  title: propTitle,
  testimonials: propTestimonials,
  animationsEnabled = true,
  config
}: TestimonialsBlockProps) => {
  // Prioritize config values over direct props
  const title = config?.title ?? propTitle ?? 'Ce que nos clients disent';
  const testimonials = config?.testimonials ?? propTestimonials ?? DEFAULT_TESTIMONIALS;

  const MotionDiv = animationsEnabled ? motion.div : 'div' as any;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <MotionDiv
              key={testimonial.id}
              initial={animationsEnabled ? { opacity: 0, y: 20 } : undefined}
              whileInView={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-2xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    testimonial.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  {testimonial.location && (
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'}`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsBlock;
