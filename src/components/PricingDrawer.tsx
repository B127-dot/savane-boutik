import { Pricing } from "@/components/ui/pricing";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    name: "Fatimata Ouédraogo",
    role: "Fondatrice, Faso Wax",
    initials: "FO",
    text: "J'ai créé ma boutique de pagnes en moins de 30 minutes. Mon chiffre d'affaires a doublé en 2 mois !",
    rating: 5,
  },
  {
    name: "Issoufou Sawadogo",
    role: "Entrepreneur, Tech BF",
    initials: "IS",
    text: "Parfait pour vendre mes téléphones. Le support WhatsApp est rapide et efficace !",
    rating: 5,
  },
  {
    name: "Aminata Traoré",
    role: "Créatrice, Bijoux Artisanaux",
    initials: "AT",
    text: "Je vends mes créations partout au Burkina grâce à BurkE-Shop.",
    rating: 5,
  },
  {
    name: "Moussa Kaboré",
    role: "Gérant, Mode Africaine",
    initials: "MK",
    text: "Interface simple, paiements mobiles. J'ai triplé mes ventes en 3 mois !",
    rating: 5,
  },
  {
    name: "Salimata Compaoré",
    role: "Commerçante",
    initials: "SC",
    text: "Solution complète adaptée au Burkina. Support 7j/7 en français, c'est top !",
    rating: 5,
  },
  {
    name: "Boureima Ouattara",
    role: "Fondateur, Électronique Plus",
    initials: "BO",
    text: "Orange Money, Moov Money, WhatsApp... tout est là pour le Burkina !",
    rating: 5,
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
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-4 bg-card hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 text-sm">
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <div className="border-t border-border" />

          {/* Témoignages - Carousel horizontal */}
          <section className="py-8" aria-label="Témoignages">
            <h3 className="text-lg font-bold text-center mb-1 px-4">
              Ils l'adorent,{" "}
              <span className="text-primary">pourquoi pas vous ?</span>
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6 px-4">
              Rejoignez 300+ entrepreneurs burkinabè
            </p>

            {/* Horizontal scrolling carousel */}
            <div className="overflow-hidden">
              <div className="flex gap-4 animate-scroll-left hover:pause">
                {testimonials.map((t, index) => (
                  <div key={`t1-${index}`} className="flex-shrink-0 w-[280px]">
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                      <CardContent className="p-4">
                        <div className="flex gap-0.5 mb-3">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                          ))}
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          "{t.text}"
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                            {t.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-xs">{t.name}</p>
                            <p className="text-[10px] text-muted-foreground">{t.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {testimonials.map((t, index) => (
                  <div key={`t2-${index}`} className="flex-shrink-0 w-[280px]">
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                      <CardContent className="p-4">
                        <div className="flex gap-0.5 mb-3">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                          ))}
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          "{t.text}"
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                            {t.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-xs">{t.name}</p>
                            <p className="text-[10px] text-muted-foreground">{t.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="h-4" />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
