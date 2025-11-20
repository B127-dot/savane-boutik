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
      className={`grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Left Column: Number + Text */}
      <div className="space-y-6 md:space-y-8">
        {/* Giant Number */}
        <div
          className={`text-[120px] md:text-[140px] lg:text-[160px] font-bold leading-none bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} bg-clip-text text-transparent`}
        >
          {step.number}
        </div>

        {/* Text Content */}
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {step.title}
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>

      {/* Right Column: Image with Colored Frame */}
      <div className="relative">
        {/* Colored border frame effect */}
        <div className="relative group">
          {/* Gradient border with stronger colors on right/bottom */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} rounded-2xl md:rounded-3xl`}
            style={{
              padding: '3px',
            }}
          >
            <div className="w-full h-full bg-background rounded-2xl md:rounded-3xl" />
          </div>
          
          {/* Orange/colored accent on right edge */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b ${step.gradientFrom} ${step.gradientTo} rounded-r-2xl md:rounded-r-3xl`}
          />
          
          {/* Main image container */}
          <div className="relative bg-gradient-to-br from-muted/50 to-muted rounded-2xl md:rounded-3xl aspect-[3/4] md:aspect-[4/5] flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 border-2 border-transparent">
            {/* Icon in center */}
            <div
              className={`bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} rounded-full p-8 md:p-10 shadow-2xl`}
            >
              <step.icon className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
            </div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
