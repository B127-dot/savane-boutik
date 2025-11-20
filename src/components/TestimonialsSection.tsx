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
    <section ref={elementRef} className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className={cn(
          "text-center mb-12 transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Ils l'adorent, pourquoi pas vous ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Rejoignez plus de 300 entrepreneurs qui ont déjà transformé leur activité avec BurkinaShop
          </p>
        </div>

        <div className={cn(
          "grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role} - {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
