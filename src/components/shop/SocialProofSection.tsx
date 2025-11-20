import { Star, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  avatar?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Aminata K.",
    text: "Service impeccable ! Livraison rapide et produits de qualité. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Ibrahim S.",
    text: "Très satisfait de mon achat. Le paiement mobile Orange Money est très pratique.",
    rating: 5,
  },
  {
    name: "Fatou D.",
    text: "Excellente boutique en ligne. Support client réactif via WhatsApp. Parfait !",
    rating: 5,
  }
];

const SocialProofSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % defaultTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-lg text-muted-foreground">
            Rejoignez des milliers de clients satisfaits
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-card rounded-2xl p-8 md:p-12 shadow-xl border border-border">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/20" />
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-6 w-6 ${
                      star <= defaultTestimonials[currentIndex].rating 
                        ? 'fill-warning text-warning' 
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl md:text-2xl text-foreground text-center mb-8 leading-relaxed">
                "{defaultTestimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {defaultTestimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <p className="font-semibold text-foreground">
                  {defaultTestimonials[currentIndex].name}
                </p>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {defaultTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-primary' 
                      : 'w-2 bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: '2,500+', label: 'Clients Satisfaits' },
            { value: '5,000+', label: 'Commandes Livrées' },
            { value: '4.9/5', label: 'Note Moyenne' },
            { value: '24h', label: 'Livraison Rapide' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
