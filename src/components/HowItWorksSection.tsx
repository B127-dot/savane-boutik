import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Store, Smartphone, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    badge: "Étape 1",
    title: "Inscrivez-vous gratuitement",
    description: "Créez votre compte en 30 secondes. Aucune carte bancaire requise.",
    icon: UserPlus,
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-600",
    position: "left" as const,
  },
  {
    number: "02",
    badge: "Étape 2",
    title: "Configurez votre boutique",
    description: "Ajoutez vos produits, prix et photos. Personnalisez votre vitrine en quelques clics.",
    icon: Store,
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
    position: "right" as const,
  },
  {
    number: "03",
    badge: "Étape 3",
    title: "Activez les paiements mobiles",
    description: "Connectez Orange Money et Moov Money. Recevez vos paiements instantanément.",
    icon: Smartphone,
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-600",
    position: "left" as const,
  },
  {
    number: "04",
    badge: "Étape 4",
    title: "Partagez et vendez",
    description: "Partagez votre lien boutique via WhatsApp, Facebook, Instagram. Vos clients commandent 24h/24.",
    icon: Share2,
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-600",
    position: "right" as const,
  },
];

const HowItWorksSection = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            Simple et Rapide
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Comment ça marche ?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Lancez votre boutique en ligne en quelques minutes, sans compétences techniques
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-24 md:mt-32">
          <p className="text-xl md:text-2xl font-semibold text-foreground mb-6">
            Prêt à lancer votre boutique en ligne ?
          </p>
          <Button
            size="lg"
            variant="hero"
            onClick={() => navigate("/signup")}
            className="text-lg px-8 py-6 h-auto"
          >
            Commencer gratuitement
          </Button>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={elementRef}
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container - Order changes based on position */}
      <div
        className={`relative ${
          step.position === "right" ? "md:order-2" : "md:order-1"
        }`}
      >
        {/* Giant Number Background */}
        <div
          className={`absolute -top-12 -left-8 md:-top-16 md:-left-12 text-[120px] md:text-[180px] font-bold opacity-[0.03] select-none pointer-events-none bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} bg-clip-text text-transparent`}
        >
          {step.number}
        </div>

        {/* Placeholder Image with Gradient Border */}
        <div className="relative group">
          <div
            className={`absolute -inset-[2px] bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} rounded-3xl opacity-60 blur-sm group-hover:opacity-100 transition-all duration-300`}
          />
          <div className="relative bg-gradient-to-br from-muted/50 to-muted rounded-3xl aspect-[16/10] flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            {/* Icon in center */}
            <div
              className={`bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} rounded-full p-8 shadow-2xl`}
            >
              <step.icon className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
            </div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div
        className={`space-y-4 ${
          step.position === "right" ? "md:order-1" : "md:order-2"
        }`}
      >
        <Badge
          variant="outline"
          className={`bg-gradient-to-r ${step.gradientFrom} ${step.gradientTo} text-white border-0 px-4 py-1`}
        >
          {step.badge}
        </Badge>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground">
          {step.title}
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksSection;
