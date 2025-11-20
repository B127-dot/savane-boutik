import { Pricing } from "@/components/ui/pricing";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "0",
    yearlyPrice: "0",
    period: "FCFA / Mois",
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
    price: "15000",
    yearlyPrice: "12000",
    period: "FCFA / Mois",
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
  },
  {
    name: "Business",
    price: "35000",
    yearlyPrice: "28000",
    period: "FCFA / Mois",
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
          description="Automatisez vos conversations WhatsApp et générez plus de ventes sans effort"
        />

        {/* Footer Note */}
        <div className="text-center mt-12 container">
          <p className="text-sm text-muted-foreground">
            Tous les plans incluent un essai gratuit de 14 jours • Pas de carte bancaire requise
          </p>
        </div>
      </motion.div>
    </section>
  );
}
