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
      originalPrice: isAnnual ? 5000 : null,
      period: '/mois',
      description: 'Pour les petits vendeurs',
      features: [
        '1 boutique en ligne',
        'Jusqu\'à 100 produits',
        'WhatsApp Business intégré',
        'Paiements Orange & Moov Money',
        '2 thèmes de boutique',
        'Support prioritaire',
      ],
      buttonText: 'Passer au Starter',
      buttonVariant: 'outline' as const,
      popular: false,
    },
    {
      name: 'Pro',
      icon: Crown,
      price: isAnnual ? 10000 : 12500,
      originalPrice: isAnnual ? 12500 : null,
      period: '/mois',
      description: 'Pour les vendeurs établis',
      features: [
        'Tout du plan Starter',
        'Produits illimités',
        '4 thèmes professionnels',
        'Analytics avancés',
        'Nom de domaine personnalisé',
        'Zéro commission sur ventes',
      ],
      buttonText: 'Passer au Pro',
      buttonVariant: 'default' as const,
      popular: true,
      badge: '82% des vendeurs',
    },
    {
      name: 'Business',
      icon: Sparkles,
      price: isAnnual ? 20000 : 25000,
      originalPrice: isAnnual ? 25000 : null,
      period: '/mois',
      description: 'Pour les PME e-commerce',
      features: [
        'Tout du plan Pro',
        'Boutiques multiples illimitées',
        'API développeur complète',
        'Account manager dédié',
        'Formation dédiée',
        'SLA garanti 99.9%',
      ],
      buttonText: 'Contactez-nous',
      buttonVariant: 'outline' as const,
      popular: false,
    },
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] bg-background border-t border-border">
        <ScrollArea className="h-[calc(92vh-24px)] overflow-y-auto">
          {/* Header */}
          <DrawerHeader className="text-center pt-6 pb-4 px-4 space-y-3">
            {/* Free Trial Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
                <Gift className="w-4 h-4" />
                <span className="font-semibold">30 jours d'essai gratuit</span>
              </div>
            </div>

            <DrawerTitle className="text-2xl font-bold">
              Choisissez votre plan
            </DrawerTitle>
            <p className="text-muted-foreground text-sm">
              Développez votre activité avec le plan adapté
            </p>

            {/* Zero Commission Badge */}
            <div className="flex justify-center pt-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground text-xs">Vos ventes = 100% pour vous</p>
                  <p className="text-[10px] text-primary font-medium">Aucune commission</p>
                </div>
              </div>
            </div>

            {/* Annual toggle */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className={`text-xs ${!isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
                Mensuel
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-xs ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
                Annuel
              </span>
              {isAnnual && (
                <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/20 text-[10px] px-2 py-0.5">
                  -20%
                </Badge>
              )}
            </div>
          </DrawerHeader>

          {/* Pricing cards */}
          <div className="px-4 pb-6 space-y-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={plan.name}
                  className={`relative p-4 transition-all duration-300 ${
                    plan.popular
                      ? 'border-2 border-primary shadow-lg shadow-primary/20 bg-gradient-to-b from-primary/5 to-transparent'
                      : 'border border-border'
                  }`}
                >
                  {/* Popular badge */}
                  {plan.badge && (
                    <div className="absolute -top-2.5 left-4">
                      <Badge className="bg-primary text-primary-foreground hover:bg-primary shadow-md text-[10px] px-2 py-0.5">
                        <Check className="w-2.5 h-2.5 mr-1" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      plan.popular 
                        ? 'bg-primary/20' 
                        : 'bg-muted'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        plan.popular ? 'text-primary' : 'text-foreground'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold">{plan.name}</h3>
                        <div className="text-right">
                          <div className="flex items-baseline gap-1">
                            {plan.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                {plan.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <span className="text-xl font-bold">
                              {plan.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">FCFA{plan.period}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {plan.description}
                      </p>

                      {/* Features - Horizontal compact display */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {plan.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground"
                          >
                            <Check className={`w-2.5 h-2.5 ${
                              plan.popular ? 'text-primary' : 'text-primary/70'
                            }`} />
                            {feature.replace('Tout du plan Starter', 'Starter+').replace('Tout du plan Pro', 'Pro+')}
                          </span>
                        ))}
                        {plan.features.length > 4 && (
                          <span className="text-[10px] px-2 py-0.5 text-muted-foreground">
                            +{plan.features.length - 4} autres
                          </span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Button
                        variant={plan.buttonVariant}
                        size="sm"
                        className={`w-full h-9 text-xs font-semibold ${
                          plan.popular
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
                            : ''
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center pb-6 px-4">
            <p className="text-[10px] text-muted-foreground">
              Essai gratuit • Annulez à tout moment • Paiement sécurisé
            </p>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default PricingDrawer;
