import { useState } from 'react';
import { Check, Zap, Crown, Sparkles, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PricingModal = ({ open, onOpenChange }: PricingModalProps) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Gratuit',
      icon: Zap,
      price: isAnnual ? 0 : 0,
      originalPrice: null,
      period: '/mois',
      description: 'Pour démarrer votre boutique',
      features: [
        '10 produits maximum',
        '1 boutique en ligne',
        'Commandes WhatsApp',
        'Analytics basiques',
      ],
      buttonText: 'Plan actuel',
      buttonVariant: 'outline' as const,
      popular: false,
    },
    {
      name: 'Pro',
      icon: Crown,
      price: isAnnual ? 24 : 30,
      originalPrice: isAnnual ? 30 : null,
      period: '/mois',
      description: 'Pour les vendeurs sérieux',
      features: [
        'Produits illimités',
        'Multi-boutiques',
        'WhatsApp Business API',
        'Analytics avancées',
        'Support prioritaire',
        'QR codes personnalisés',
        'Thèmes premium',
      ],
      buttonText: 'Passer au Pro',
      buttonVariant: 'default' as const,
      popular: true,
      badge: '82% des vendeurs',
    },
    {
      name: 'Business',
      icon: Sparkles,
      price: isAnnual ? 79 : 99,
      originalPrice: isAnnual ? 99 : null,
      period: '/mois',
      description: 'Pour les entreprises',
      features: [
        'Tout du plan Pro',
        '5 boutiques',
        'API complète',
        'White-label',
        'Support dédié 24/7',
        'Formation personnalisée',
        'Intégrations avancées',
        'Rapports personnalisés',
      ],
      buttonText: 'Contactez-nous',
      buttonVariant: 'outline' as const,
      popular: false,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[96vw] max-h-[90vh] overflow-y-auto p-0 border-0 bg-background/95 backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-full p-2 bg-muted/50 hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <DialogHeader className="text-center pt-12 pb-8 px-6 space-y-4">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <DialogTitle className="text-4xl font-bold">
            Tarification simple et transparente
          </DialogTitle>
          <p className="text-muted-foreground text-lg">
            Choisissez le plan qui correspond à vos ambitions
          </p>

          {/* Annual toggle */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={`text-sm ${!isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Mensuel
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={`text-sm ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Annuel
            </span>
            {isAnnual && (
              <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20 ml-2">
                Économisez 20%
              </Badge>
            )}
          </div>
        </DialogHeader>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 px-6 pb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative p-6 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 ${
                  plan.popular
                    ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-transparent'
                    : 'border border-border hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg">
                      <Check className="w-3 h-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  plan.popular 
                    ? 'bg-emerald-500/20' 
                    : 'bg-muted'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    plan.popular ? 'text-emerald-500' : 'text-foreground'
                  }`} />
                </div>

                {/* Plan name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 h-10">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    {plan.originalPrice && (
                      <span className="text-2xl text-muted-foreground line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-5xl font-bold">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    facturé {isAnnual ? 'annuellement' : 'mensuellement'}
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full mb-6 h-11 font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40'
                      : ''
                  }`}
                  disabled={plan.name === 'Gratuit'}
                >
                  {plan.buttonText}
                </Button>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                        plan.popular ? 'text-emerald-500' : 'text-primary'
                      }`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center pb-8 px-6">
          <p className="text-sm text-muted-foreground">
            Tous les plans incluent 14 jours d'essai gratuit • Annulez à tout moment
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
