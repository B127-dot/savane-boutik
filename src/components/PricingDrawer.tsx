import { useState } from 'react';
import { Check, Crown, Sparkles, Star, Gift } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PricingDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PricingDrawer = ({ open, onOpenChange }: PricingDrawerProps) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      icon: Star,
      price: isAnnual ? 4000 : 5000,
      period: '/mois',
      description: 'Pour les petits vendeurs',
      features: [
        '1 boutique en ligne',
        'Jusqu\'à 100 produits',
        'WhatsApp Business intégré',
        'Paiements Orange & Moov Money',
      ],
      moreFeatures: 2,
      buttonText: 'Passer au Starter',
      popular: false,
    },
    {
      name: 'Pro',
      icon: Crown,
      price: isAnnual ? 10000 : 12500,
      period: '/mois',
      description: 'Pour les vendeurs établis',
      features: [
        'Starter+',
        'Produits illimités',
        '4 thèmes professionnels',
        'Analytics avancés',
      ],
      moreFeatures: 2,
      buttonText: 'Passer au Pro',
      popular: true,
      badge: '82% des vendeurs',
    },
    {
      name: 'Business',
      icon: Sparkles,
      price: isAnnual ? 20000 : 25000,
      period: '/mois',
      description: 'Pour les PME e-commerce',
      features: [
        'Pro+',
        'Boutiques multiples illimitées',
        'API développeur complète',
        'Account manager dédié',
      ],
      moreFeatures: 2,
      buttonText: 'Contactez-nous',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'Puis-je changer de plan à tout moment ?',
      answer: 'Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les changements sont appliqués immédiatement.',
    },
    {
      question: 'Comment fonctionne l\'essai gratuit ?',
      answer: 'Profitez de 30 jours d\'essai gratuit sur tous les plans. Aucune carte bancaire requise pour commencer.',
    },
    {
      question: 'Le paiement est-il sécurisé ?',
      answer: 'Absolument. Nous utilisons les meilleurs standards de sécurité pour protéger vos données et transactions.',
    },
    {
      question: 'Puis-je annuler mon abonnement ?',
      answer: 'Oui, vous pouvez annuler à tout moment. Votre accès restera actif jusqu\'à la fin de votre période de facturation.',
    },
  ];

  const testimonials = [
    {
      name: 'Aminata Diallo',
      role: 'Créatrice de mode',
      initials: 'AD',
      text: 'J\'ai créé ma boutique en moins de 30 minutes. Les ventes ont dépassé mes attentes dès le premier mois !',
    },
    {
      name: 'Ibrahim Koné',
      role: 'Vendeur électronique',
      initials: 'IK',
      text: 'Le système WhatsApp intégré a révolutionné ma façon de gérer les commandes.',
    },
    {
      name: 'Fatoumata Ouédraogo',
      role: 'Artisane bijoutière',
      initials: 'FO',
      text: 'Analytics super détaillées. J\'ai augmenté mon CA de 40% en 2 mois !',
    },
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] bg-background border-t border-border">
        <ScrollArea className="h-[calc(92vh-24px)] overflow-y-auto">
          {/* Header */}
          <DrawerHeader className="text-center pt-4 pb-3 px-4 space-y-2">
            <DrawerTitle className="text-xl font-bold">
              Choisissez votre plan
            </DrawerTitle>

            {/* Zero Commission Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                <Check className="w-4 h-4" />
                Aucune commission
              </div>
            </div>

            {/* Annual toggle */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className={`text-sm ${!isAnnual ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                Mensuel
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${isAnnual ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                Annuel
              </span>
            </div>
          </DrawerHeader>

          {/* Pricing cards - Horizontal layout */}
          <div className="px-4 pb-4 space-y-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={plan.name}
                  className={`relative p-4 transition-all duration-300 ${
                    plan.popular
                      ? 'border-2 border-primary bg-card'
                      : 'border border-border bg-card'
                  }`}
                >
                  {/* Popular badge */}
                  {plan.badge && (
                    <div className="absolute -top-2.5 left-4">
                      <Badge className="bg-primary text-primary-foreground hover:bg-primary text-xs px-2 py-0.5">
                        <Check className="w-3 h-3 mr-1" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Row 1: Icon + Name + Description + Price */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        plan.popular 
                          ? 'bg-primary/20' 
                          : 'bg-muted'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          plan.popular ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-2xl font-bold">
                        {plan.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">FCFA{plan.period}</span>
                    </div>
                  </div>

                  {/* Row 2: Features as chips */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {plan.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground"
                      >
                        <Check className={`w-3 h-3 ${
                          plan.popular ? 'text-primary' : 'text-primary/70'
                        }`} />
                        {feature}
                      </span>
                    ))}
                    {plan.moreFeatures > 0 && (
                      <span className="text-xs px-2.5 py-1 text-muted-foreground">
                        +{plan.moreFeatures} autres
                      </span>
                    )}
                  </div>

                  {/* Row 3: CTA Button - Full width */}
                  <Button
                    variant={plan.popular ? 'default' : 'outline'}
                    className={`w-full h-10 font-semibold ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="text-center pb-4 px-4">
            <p className="text-xs text-muted-foreground">
              Essai gratuit • Annulez à tout moment • Paiement sécurisé
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* FAQ Section */}
          <div className="px-4 py-6">
            <h3 className="text-lg font-bold text-center mb-4">Questions fréquentes</h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-3 bg-muted/30 border-border/50">
                  <h4 className="font-semibold text-sm mb-1">{faq.question}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Testimonials Section */}
          <div className="px-4 py-6">
            <h3 className="text-lg font-bold text-center mb-1">Ils l'adorent</h3>
            <p className="text-xs text-muted-foreground text-center mb-4">
              Rejoignez 300+ entrepreneurs
            </p>
            <div className="space-y-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-3 bg-muted/30 border-border/50">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-xs mb-3 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-primary">{testimonial.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-xs">{testimonial.name}</p>
                      <p className="text-[10px] text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom padding for safe area */}
          <div className="h-4" />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default PricingDrawer;
