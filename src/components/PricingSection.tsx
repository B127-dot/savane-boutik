import { Check, Star, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "5,000",
      period: "/mois",
      description: "Parfait pour débuter votre boutique en ligne",
      icon: Zap,
      popular: false,
      features: [
        "Jusqu'à 50 produits",
        "Boutique personnalisée", 
        "Paiement Orange & Moov Money",
        "Support WhatsApp",
        "Analytics de base",
        "SSL sécurisé inclus"
      ]
    },
    {
      name: "Business", 
      price: "15,000",
      period: "/mois",
      description: "Idéal pour faire croître votre commerce",
      icon: Star,
      popular: true,
      features: [
        "Produits illimités",
        "Thèmes premium",
        "Intégration WhatsApp Business",
        "Codes promo & réductions", 
        "Analytics avancées",
        "Support prioritaire",
        "Multi-devises (CFA/EUR)",
        "Sauvegarde automatique"
      ]
    },
    {
      name: "Enterprise",
      price: "35,000", 
      period: "/mois",
      description: "Solution complète pour les grandes entreprises",
      icon: Crown,
      popular: false,
      features: [
        "Tout du plan Business",
        "Multi-boutiques",
        "API personnalisée",
        "Formation personnalisée", 
        "Gestionnaire de compte dédié",
        "Intégrations sur mesure",
        "Rapports personnalisés",
        "SLA 99.9% uptime"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border">
            <span className="text-sm text-muted-foreground">
              💰 Tarifs transparents, pas de frais cachés
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            Choisissez votre formule
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              simple et abordable
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Commencez gratuitement, puis choisissez le plan qui correspond à votre ambition. 
            Changez à tout moment selon vos besoins.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "bg-gradient-card border-primary shadow-glow scale-105"
                  : "bg-card/50 backdrop-blur-sm border-border hover:border-primary/30"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-medium">
                    ⭐ Le plus populaire
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div className="text-center space-y-2">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${
                    plan.popular 
                      ? "bg-gradient-primary/20 border-primary/30" 
                      : "bg-gradient-primary/10 border-primary/20"
                  } border`}>
                    <plan.icon className={`w-8 h-8 ${plan.popular ? "text-primary-glow" : "text-primary"}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-xl text-muted-foreground">FCFA</span>
                  </div>
                  <div className="text-muted-foreground">{plan.period}</div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular 
                          ? "bg-primary/20 text-primary" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  variant={plan.popular ? "hero" : "premium"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.popular ? "Commencer maintenant" : "Choisir ce plan"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-lg text-muted-foreground">
            🎯 <strong>Essai gratuit de 14 jours</strong> · Aucune carte bancaire requise
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>Résiliation à tout moment</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>Migration des données incluse</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>Support en français</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;