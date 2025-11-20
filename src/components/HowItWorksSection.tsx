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

  const features = [
    step.number === "01" ? ["Inscription rapide", "Sans carte bancaire"] :
    step.number === "02" ? ["Interface intuitive", "Upload illimité"] :
    step.number === "03" ? ["Paiements instantanés", "Zéro commission"] :
    ["Partage facile", "Ventes 24h/24"]
  ];

  return (
    <div
      ref={elementRef}
      className={`max-w-6xl mx-auto ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Premium Card Container */}
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/10 hover:shadow-black/20 transition-all duration-500">
        {/* Grid background pattern */}
        <div 
          className="absolute inset-0 opacity-20 rounded-3xl pointer-events-none" 
          style={{
            backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px)',
            backgroundSize: '48px 48px'
          }}
        />

        {/* Inner ring effect */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />

        {/* Content Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Giant Number - Left side */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <span 
              className={`text-[140px] sm:text-[180px] leading-none font-semibold tracking-tight select-none bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} bg-clip-text text-transparent opacity-10`}
            >
              {step.number.replace('0', '')}
            </span>
          </div>

          {/* Text Content - Middle */}
          <div className="lg:col-span-5 space-y-6">
            {/* Badge */}
            <Badge
              variant="outline"
              className={`bg-gradient-to-r ${step.gradientFrom} ${step.gradientTo} text-white border-0 px-4 py-1.5 text-sm font-medium`}
            >
              {step.badge}
            </Badge>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {step.description}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-col gap-4 pt-2">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-3 w-full max-w-full text-sm text-foreground/90 border border-border/50 rounded-2xl px-4 py-3 shadow-sm backdrop-blur-sm"
                  style={{
                    boxShadow: 'inset 0 -12px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)'
                  }}
                >
                  <span className="inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-xl ring-1 ring-border/50 bg-card/50">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo}`} />
                  </span>
                  <span className="font-medium tracking-[-0.01em]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Container - Right side */}
          <div className="lg:col-span-5 relative">
            {/* Gradient blur effect behind */}
            <div 
              className="absolute -inset-1 rounded-2xl opacity-60 blur-xl pointer-events-none"
              style={{
                background: `radial-gradient(60% 60% at 50% 50%, ${step.gradientFrom.replace('from-', 'rgb(var(--')})/.22, rgba(217,70,239,0) 70%)`
              }}
            />

            {/* Main visual card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 shadow-lg aspect-[4/3] backdrop-blur-sm">
              {/* Grid pattern background */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px)',
                  backgroundSize: '48px 48px'
                }}
              />

              {/* Inner ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />

              {/* Icon Container - Centered */}
              <div className="absolute inset-8 flex items-center justify-center">
                <div 
                  className={`rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 via-card/50 to-card/80 backdrop-blur-md px-8 py-12 shadow-lg shadow-black/30 w-full max-w-sm transform hover:scale-105 transition-transform duration-500`}
                >
                  <div className="flex flex-col items-center gap-6">
                    {/* Animated Icon */}
                    <div className="relative">
                      <div 
                        className={`h-16 w-16 rounded-full ring-2 ring-border/50 flex items-center justify-center animate-pulse bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} shadow-lg`}
                      >
                        <step.icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                    </div>

                    {/* Status text */}
                    <div className="text-center">
                      <p className="text-foreground/90 text-lg font-medium">{step.badge}</p>
                      <p className="text-muted-foreground text-sm mt-2">En cours...</p>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${step.gradientFrom} ${step.gradientTo} h-full rounded-full animate-progressGrow`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient overlay effect */}
              <div 
                className="absolute -inset-1 rounded-2xl opacity-40 blur-xl pointer-events-none"
                style={{
                  background: `radial-gradient(60% 60% at 50% 50%, ${step.gradientFrom.replace('from-', 'rgba(')}0.22), rgba(217,70,239,0) 70%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
