import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Store, Smartphone, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    title: "Inscrivez-vous gratuitement",
    description: "Créez votre compte en 30 secondes. Aucune carte bancaire requise.",
    icon: UserPlus,
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-600",
  },
  {
    number: "02",
    title: "Configurez votre boutique",
    description: "Ajoutez vos produits, prix et photos. Personnalisez votre vitrine en quelques clics.",
    icon: Store,
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
  },
  {
    number: "03",
    title: "Activez les paiements mobiles",
    description: "Connectez Orange Money et Moov Money. Recevez vos paiements instantanément.",
    icon: Smartphone,
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-600",
  },
  {
    number: "04",
    title: "Partagez et vendez",
    description: "Partagez votre lien boutique via WhatsApp, Facebook, Instagram. Vos clients commandent 24h/24.",
    icon: Share2,
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-600",
  },
];

const HowItWorksSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-20 bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            Simple et Rapide
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Comment ça marche ?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Lancez votre boutique en ligne en quelques minutes, sans compétences techniques
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-4">
            Prêt à lancer votre boutique en ligne ?
          </p>
          <Button
            size="lg"
            variant="hero"
            onClick={() => navigate("/signup")}
            className="text-base px-6 py-5 h-auto"
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
      className={`flex flex-col md:flex-row items-start gap-6 md:gap-8 ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Step Number - Discrete on the left */}
      <div className="flex-shrink-0">
        <div
          className={`text-5xl md:text-6xl font-bold bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} bg-clip-text text-transparent leading-tight`}
        >
          {step.number}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {/* Text Content */}
        <div className="flex-1 space-y-2 md:space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {step.title}
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Image Container - Compact */}
        <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0">
          <div className="relative group">
            <div
              className={`absolute -inset-[2px] bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-all duration-300`}
            />
            <div className="relative bg-gradient-to-br from-muted/50 to-muted rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
              {/* Icon in center */}
              <div
                className={`bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} rounded-full p-6 shadow-2xl`}
              >
                <step.icon className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
              </div>
              
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
