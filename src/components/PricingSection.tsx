import { Pricing } from "@/components/ui/pricing";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "5000",
    yearlyPrice: "4000",
    period: "FCFA / Mois",
    features: [
      "1 boutique en ligne",
      "Jusqu'à 100 produits",
      "WhatsApp Business intégré",
      "Paiements Orange & Moov Money",
      "2 thèmes de boutique",
      "Support prioritaire",
      "0% commission sur ventes",
    ],
    description: "Pour les petits vendeurs (1-5M FCFA/mois)",
    buttonText: "Commencer",
    href: "/signup",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "12500",
    yearlyPrice: "10000",
    period: "FCFA / Mois",
    features: [
      "Tout du plan Starter",
      "Produits illimités",
      "4 thèmes professionnels",
      "Analytics avancés",
      "Nom de domaine personnalisé",
      "Code promo & réductions",
      "Support WhatsApp prioritaire",
      "Zéro commission sur ventes",
    ],
    description: "Pour les vendeurs établis (5-15M FCFA/mois)",
    buttonText: "Commencer",
    href: "/signup",
    isPopular: true,
  },
  {
    name: "Business",
    price: "25000",
    yearlyPrice: "20000",
    period: "FCFA / Mois",
    features: [
      "Tout du plan Pro",
      "Boutiques multiples illimitées",
      "API développeur complète",
      "Gestion d'équipe avancée",
      "Account manager dédié",
      "Formation dédiée",
      "SLA garanti 99.9%",
    ],
    description: "Pour les PME e-commerce (15M+ FCFA/mois)",
    buttonText: "Contactez-nous",
    href: "/signup",
    isPopular: false,
  },
];

export default function PricingSection() {
  const { elementRef: sectionRef, isVisible } = useScrollAnimation();

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
      >
        <Pricing
          plans={plans}
          title="Tarification simple et transparente"
          description="Choisissez le plan qui correspond à vos besoins et développez votre commerce en ligne au Burkina Faso"
        />

        {/* Footer Note */}
        <div className="text-center mt-12 container">
          <p className="text-sm text-muted-foreground">
            30 jours d'essai gratuit sur tous les plans • Pas de carte bancaire requise • Annulez à tout moment
          </p>
        </div>
      </motion.div>
    </section>
  );
}
