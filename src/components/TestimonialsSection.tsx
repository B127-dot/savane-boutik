import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    name: "Fatimata Ouédraogo",
    role: "Fondatrice",
    company: "Faso Wax",
    content: "J'ai créé ma boutique de pagnes en moins de 30 minutes. Avec Orange Money intégré, mes clientes paient facilement. Mon chiffre d'affaires a doublé en 2 mois !",
    rating: 5,
    avatar: "FO"
  },
  {
    name: "Issoufou Sawadogo",
    role: "Entrepreneur",
    company: "Tech BF",
    content: "Parfait pour vendre mes téléphones et accessoires. Le support via WhatsApp est rapide et efficace. Je recommande à tous les commerçants de Ouaga !",
    rating: 5,
    avatar: "IS"
  },
  {
    name: "Aminata Traoré",
    role: "Créatrice",
    company: "Bijoux Artisanaux",
    content: "Grâce à BurkE-Shop, je vends mes créations partout au Burkina. L'intégration WhatsApp Business me permet de communiquer directement avec mes clients.",
    rating: 5,
    avatar: "AT"
  },
  {
    name: "Moussa Kaboré",
    role: "Gérant",
    company: "Mode Africaine",
    content: "Interface simple, paiement Orange Money et Moov Money, livraison rapide. J'ai triplé mes ventes en 3 mois. C'est incroyable !",
    rating: 5,
    avatar: "MK"
  },
  {
    name: "Salimata Compaoré",
    role: "Commerçante",
    company: "Cosmétiques Naturels",
    content: "Solution complète et professionnelle adaptée au Burkina. Mes clientes adorent pouvoir payer avec leur mobile. Support 7j/7 en français, c'est top !",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Boureima Ouattara",
    role: "Fondateur",
    company: "Électronique Plus",
    content: "J'ai testé plusieurs plateformes avant BurkE-Shop. Aucune n'était adaptée au Burkina comme celle-ci. Orange Money, Moov Money, WhatsApp... tout est là !",
    rating: 5,
    avatar: "BO"
  }
];


const TestimonialsSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleGetStarted = () => {
    window.location.href = '/signup';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Header with Title and CTA */}
        <div 
          ref={titleRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 transform",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Ils l'adorent,{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              pourquoi pas vous ?
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Rejoignez plus de 300 entrepreneurs burkinabè qui développent leur commerce avec BurkinaShop
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={handleGetStarted}
            className="group"
          >
            Commencer gratuitement
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Button>
        </div>

        {/* Infinite Horizontal Scrolling Testimonials */}
        <div className="overflow-hidden space-y-6">
          {/* First Row - Scroll Left to Right */}
          <div className="flex gap-6 animate-scroll-left hover:pause">
            {testimonials.map((testimonial, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 w-[380px] md:w-96">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div key={`row1-dup-${index}`} className="flex-shrink-0 w-[380px] md:w-96">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Second Row - Scroll Right to Left */}
          <div className="flex gap-6 animate-scroll-right hover:pause">
            {testimonials.map((testimonial, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0 w-[380px] md:w-96">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div key={`row2-dup-${index}`} className="flex-shrink-0 w-[380px] md:w-96">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
