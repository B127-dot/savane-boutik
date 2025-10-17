import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sophie Martin",
    role: "Fondatrice",
    company: "Belle & Chic",
    content: "J'ai créé ma boutique en ligne en moins de 30 minutes. Les ventes ont dépassé mes attentes dès le premier mois !",
    rating: 5,
    avatar: "SM"
  },
  {
    name: "Ahmed Benali",
    role: "Entrepreneur",
    company: "TechStore",
    content: "Interface intuitive et support client exceptionnel. Je recommande à tous les entrepreneurs qui veulent se lancer rapidement.",
    rating: 5,
    avatar: "AB"
  },
  {
    name: "Marie Dubois",
    role: "Créatrice",
    company: "Artisan Créatif",
    content: "Parfait pour vendre mes créations artisanales. Le système est simple et les clients adorent l'expérience d'achat.",
    rating: 5,
    avatar: "MD"
  },
  {
    name: "Lucas Bernard",
    role: "Gérant",
    company: "Mode & Style",
    content: "Les outils marketing intégrés m'ont permis de doubler mon chiffre d'affaires en 3 mois. Incroyable !",
    rating: 5,
    avatar: "LB"
  },
  {
    name: "Fatima El Amrani",
    role: "Directrice",
    company: "Beauté Bio",
    content: "Solution complète et professionnelle. Mes clients apprécient la fluidité de la navigation et du paiement.",
    rating: 5,
    avatar: "FE"
  },
  {
    name: "Pierre Lefebvre",
    role: "Fondateur",
    company: "Sport Plus",
    content: "J'ai testé plusieurs plateformes avant de trouver celle-ci. C'est de loin la meilleure pour les débutants.",
    rating: 5,
    avatar: "PL"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card className="flex-shrink-0 w-[350px] mx-3 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} - {testimonial.company}
          </p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      
      <p className="text-muted-foreground leading-relaxed">
        "{testimonial.content}"
      </p>
    </CardContent>
  </Card>
);

const TestimonialsSection = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={elementRef} className="py-20 bg-gradient-to-b from-background to-accent/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center mb-12 transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ils nous font confiance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits qui ont transformé leur activité avec notre plateforme
          </p>
        </div>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div className="animate-scroll-infinite hover:pause-animation flex">
              {/* First set */}
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
              ))}
              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
