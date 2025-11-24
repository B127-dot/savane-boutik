import { Shield, Database, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const SecuritySection = () => {
  const { elementRef: badgeRef, isVisible: badgeVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { elementRef: card1Ref, isVisible: card1Visible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { elementRef: card2Ref, isVisible: card2Visible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { elementRef: card3Ref, isVisible: card3Visible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  const trustPillars = [
    {
      icon: Shield,
      title: "Paiements Sécurisés",
      description:
        "Intégration certifiée avec Orange Money et Moov Money pour des transactions instantanées et sécurisées.",
      ref: card1Ref,
      visible: card1Visible,
      delay: "delay-0",
    },
    {
      icon: Database,
      title: "Données Protégées",
      description:
        "Vos informations clients et commerciales sont chiffrées et stockées en toute confidentialité.",
      ref: card2Ref,
      visible: card2Visible,
      delay: "delay-150",
    },
    {
      icon: MessageCircle,
      title: "Support Local 7j/7",
      description:
        "Assistance en français disponible tous les jours via WhatsApp pour répondre à vos besoins.",
      ref: card3Ref,
      visible: card3Visible,
      delay: "delay-300",
    },
  ];

  return (
    <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div
            ref={badgeRef}
            className={`flex justify-center mb-6 transition-all duration-700 ${
              badgeVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Sécurité & Fiabilité
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div
            ref={titleRef}
            className={`text-center mb-16 transition-all duration-700 delay-100 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
              BurkinaShop est{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Digne de Confiance
              </span>
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              La sécurité de vos transactions et la protection de vos données
              sont au cœur de notre mission. BurkinaShop vous offre une
              plateforme fiable et sécurisée pour développer votre commerce en
              toute sérénité.
            </p>
          </div>

          {/* Trust Pillars - Single Unified Card */}
          <div
            ref={card1Ref}
            className={`mb-12 transition-all duration-700 delay-200 ${
              card1Visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative p-8 sm:p-12 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 shadow-lg shadow-primary/5">
              {/* Subtle green glow gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
                {trustPillars.map((pillar, index) => (
                  <div
                    key={index}
                    className="group text-center md:text-left"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 mb-6 mx-auto md:mx-0 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <pillar.icon className="w-7 h-7 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div
            ref={ctaRef}
            className={`text-center transition-all duration-700 delay-500 ${
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-muted-foreground mb-6 text-lg">
              Découvrez notre engagement envers votre sécurité et votre réussite
            </p>
            <Button
              variant="hero"
              size="lg"
              className="group"
              onClick={() => {
                // TODO: Link to FAQ or dedicated security page
                const pricingSection = document.getElementById("pricing");
                pricingSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              En savoir plus
              <Shield className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
