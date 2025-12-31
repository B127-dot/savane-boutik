import { Star, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Aminata K.",
    text: "Le hoodie oversized est devenu mon indispensable. Qualité incroyable, je ne porte plus que ça.",
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

const HauteFashionTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-card/30 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            Avis clients
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ce qu'ils pensent de nous
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative text-center py-12">
            {/* Large Quote Icon */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
              <Quote className="h-16 w-16 text-primary/30 rotate-180" />
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-5 w-5 ${
                    star <= testimonials[currentIndex].rating 
                      ? 'fill-primary text-primary' 
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>

            {/* Quote Text */}
            <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8 transition-all duration-500">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-sm font-bold text-primary">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              <p className="font-medium text-white">
                {testimonials[currentIndex].name}
              </p>
            </div>

            {/* Closing Quote */}
            <div className="absolute bottom-0 right-1/4 translate-y-4">
              <Quote className="h-12 w-12 text-primary/20" />
            </div>
          </div>

          {/* Avatars and Dots */}
          <div className="flex flex-col items-center gap-6">
            {/* Avatar Stack */}
            <div className="flex -space-x-3">
              {testimonials.map((t, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    index === currentIndex 
                      ? 'border-primary bg-primary/20 scale-110 z-10' 
                      : 'border-white/20 bg-card/50 hover:border-primary/50'
                  }`}
                >
                  <span className={`text-sm font-bold ${
                    index === currentIndex ? 'text-primary' : 'text-white/60'
                  }`}>
                    {t.name.charAt(0)}
                  </span>
                </button>
              ))}
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-primary' 
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { value: '2,500+', label: 'Clients Satisfaits' },
            { value: '5,000+', label: 'Commandes Livrées' },
            { value: '4.9/5', label: 'Note Moyenne' },
            { value: '24h', label: 'Livraison Rapide' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-card/30 border border-white/10 hover:border-primary/30 transition-colors"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HauteFashionTestimonials;
