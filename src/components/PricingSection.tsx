import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import useScrollAnimation from "@/hooks/useScrollAnimation";

interface PricingPlan {
  name: string;
  price: number;
  yearlyPrice: number;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  popularBadge?: string;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: 0,
    yearlyPrice: 0,
    period: "Mois",
    features: [
      "1 boutique en ligne",
      "Jusqu'à 50 produits",
      "Paiements Orange & Moov Money",
      "Intégration WhatsApp Business",
      "Support par email",
    ],
    description: "Parfait pour démarrer",
    buttonText: "Commencer gratuitement",
    href: "/signup",
    isPopular: false,
  },
  {
    name: "Pro",
    price: 15000,
    yearlyPrice: 12000,
    period: "Mois",
    features: [
      "Produits illimités",
      "Design premium personnalisable",
      "4 thèmes professionnels",
      "Analytics avancés",
      "Nom de domaine personnalisé",
      "Code QR personnalisé",
      "Support prioritaire WhatsApp",
      "Zéro commission sur ventes",
    ],
    description: "Pour les professionnels",
    buttonText: "Commencer",
    href: "/signup",
    isPopular: true,
    popularBadge: "82% Choisissent ce plan",
  },
  {
    name: "Business",
    price: 35000,
    yearlyPrice: 28000,
    period: "Mois",
    features: [
      "Tout dans Pro",
      "Boutiques multiples illimitées",
      "API développeur complète",
      "Gestion d'équipe avancée",
      "Rapports personnalisés",
      "Formation dédiée",
      "Account manager dédié",
      "SLA garanti 99.9%",
    ],
    description: "Pour les équipes",
    buttonText: "Commencer",
    href: "/signup",
    isPopular: false,
  },
];

export default function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true);
  const switchRef = useRef<HTMLButtonElement>(null);
  const { elementRef: sectionRef, isVisible } = useScrollAnimation();

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 30,
        spread: 50,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#10B981", "#34D399", "#6EE7B7"],
        ticks: 150,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 25,
        shapes: ["circle"],
        scalar: 0.8,
      });
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="container"
      >
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Tarification simple et{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              transparente
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Automatisez vos conversations WhatsApp et générez plus de ventes sans effort
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="text-sm font-medium text-muted-foreground">
            Facturation mensuelle
          </span>
          <div className="relative">
            <Label>
              <Switch
                ref={switchRef as any}
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="relative"
              />
            </Label>
            {!isMonthly && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold whitespace-nowrap"
              >
                ⭐ Économisez 20%!
              </motion.div>
            )}
          </div>
          <span className="text-sm font-medium">
            Facturation annuelle
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
              }}
              whileHover={{
                y: plan.isPopular ? -10 : -5,
                transition: { duration: 0.2 },
              }}
              className={cn(
                "relative rounded-2xl border-2 p-8 bg-card text-center flex flex-col",
                plan.isPopular
                  ? "border-primary shadow-[0_0_40px_-10px_hsl(var(--primary))] scale-105"
                  : "border-border hover:border-primary/50 transition-colors"
              )}
            >
              {/* Popular Badge */}
              {plan.isPopular && plan.popularBadge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
                  <Star className="h-4 w-4 fill-current" />
                  {plan.popularBadge}
                </div>
              )}

              {/* Plan Name */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-muted-foreground uppercase tracking-wide">
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-4">
                {!isMonthly && plan.yearlyPrice > 0 && (
                  <div className="text-2xl line-through text-muted-foreground/50 mb-1">
                    {plan.price.toLocaleString()} FCFA
                  </div>
                )}
                <div className="flex items-baseline justify-center gap-2">
                  <NumberFlow
                    value={isMonthly ? plan.price : plan.yearlyPrice}
                    format={{
                      style: "decimal",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{
                      duration: 400,
                      easing: "ease-out",
                    }}
                    willChange
                    className="text-5xl md:text-6xl font-bold"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-bold">FCFA</span>
                    <span className="text-sm text-muted-foreground">/ {plan.period}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {isMonthly ? "facturé mensuellement" : "facturé annuellement"}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={cn(
                      "h-5 w-5 flex-shrink-0 mt-0.5",
                      plan.isPopular ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to={plan.href}>
                <Button
                  variant={plan.isPopular ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground mt-4">
                {plan.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            Tous les plans incluent un essai gratuit de 14 jours • Pas de carte bancaire requise
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}