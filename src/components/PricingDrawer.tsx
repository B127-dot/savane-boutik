import { Pricing } from "@/components/ui/pricing";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface PricingDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

const faqs = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer:
      "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les changements prennent effet immédiatement.",
  },
  {
    question: "Comment fonctionne l'essai gratuit ?",
    answer:
      "Profitez de 30 jours d'essai gratuit sur tous les plans. Aucune carte bancaire requise pour commencer.",
  },
  {
    question: "Le paiement est-il sécurisé ?",
    answer:
      "Absolument. Nous utilisons les meilleurs standards de sécurité pour protéger vos données et transactions.",
  },
  {
    question: "Puis-je annuler mon abonnement ?",
    answer:
      "Oui, vous pouvez annuler à tout moment. Votre accès restera actif jusqu'à la fin de votre période de facturation.",
  },
];

const testimonials = [
  {
    name: "Aminata Diallo",
    role: "Créatrice de mode",
    initials: "AD",
    text: "J'ai créé ma boutique en moins de 30 minutes. Les ventes ont dépassé mes attentes dès le premier mois !",
  },
  {
    name: "Ibrahim Koné",
    role: "Vendeur électronique",
    initials: "IK",
    text: "Le système WhatsApp intégré a révolutionné ma façon de gérer les commandes.",
  },
  {
    name: "Fatoumata Ouédraogo",
    role: "Artisane bijoutière",
    initials: "FO",
    text: "Analytics super détaillées. J'ai augmenté mon CA de 40% en 2 mois !",
  },
];

export default function PricingDrawer({ open, onOpenChange }: PricingDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] bg-background border-t border-border">
        <ScrollArea className="h-[calc(92vh-24px)]">
          <div className="bg-gradient-to-b from-background via-background/95 to-background">
            <Pricing
              plans={plans}
              title="Tarification simple et transparente"
              description="Choisissez le plan qui correspond à vos besoins et développez votre commerce en ligne au Burkina Faso"
              containerClassName="py-12"
              onPlanClick={() => {}}
            />
          </div>

          {/* Footer note (comme sur la landing page) */}
          <div className="text-center -mt-6 pb-6 px-4">
            <p className="text-sm text-muted-foreground">
              30 jours d'essai gratuit sur tous les plans • Pas de carte bancaire
              requise • Annulez à tout moment
            </p>
          </div>

          <div className="border-t border-border" />

          {/* FAQ */}
          <section className="px-4 py-8" aria-label="Questions fréquentes">
            <h3 className="text-lg font-bold text-center mb-4">
              Questions fréquentes
            </h3>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <Card key={faq.question} className="p-4 bg-muted/20">
                  <h4 className="font-semibold text-sm mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Témoignages */}
          <section className="px-4 py-8" aria-label="Témoignages">
            <h3 className="text-lg font-bold text-center mb-1">Ils l'adorent</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Rejoignez 300+ entrepreneurs
            </p>

            <div className="space-y-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="p-4 bg-muted/20">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-primary text-sm">
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-sm mb-4 leading-relaxed">“{t.text}”</p>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {t.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <div className="h-4" />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
