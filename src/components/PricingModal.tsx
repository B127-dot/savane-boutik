import { useState } from 'react';
import { Check, Crown, Sparkles, X, Star } from 'lucide-react';
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
        'Notifications automatiques',
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
        'Code promo & réductions',
        'Support WhatsApp prioritaire',
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
        'Gestion d\'équipe avancée',
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-12">
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
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.originalPrice.toLocaleString()} FCFA
                      </span>
                    )}
                    <span className="text-3xl font-bold">
                      {plan.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">FCFA</span>
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

        {/* Questions Fréquentes Section */}
        <div className="px-6 py-16 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-muted-foreground">
                Trouvez les réponses aux questions les plus courantes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-lg mb-3">
                  Puis-je changer de plan à tout moment ?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. 
                  Les changements sont appliqués immédiatement.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-lg mb-3">
                  Comment fonctionne l'essai gratuit ?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Profitez de 14 jours d'essai gratuit sur tous les plans premium. 
                  Aucune carte bancaire requise pour commencer.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-lg mb-3">
                  Que se passe-t-il si je dépasse mes limites ?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Vous recevrez une notification avant d'atteindre vos limites. 
                  Vous pourrez alors mettre à niveau votre plan facilement.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-lg mb-3">
                  Le paiement est-il sécurisé ?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Absolument. Nous utilisons les meilleurs standards de sécurité 
                  pour protéger vos données et transactions.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-lg mb-3">
                  Puis-je annuler mon abonnement ?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Oui, vous pouvez annuler à tout moment. Votre accès restera 
                  actif jusqu'à la fin de votre période de facturation.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-lg mb-3">
                  Offrez-vous du support technique ?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tous nos plans incluent un support par email. Les plans Pro et 
                  Business bénéficient d'un support prioritaire et dédié.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Ils l'adorent, pourquoi pas vous ?
              </h2>
              <p className="text-muted-foreground">
                Rejoignez plus de 300 entrepreneurs qui développent déjà leur activité avec BurkinaShop
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                  "J'ai créé ma boutique en moins de 30 minutes. Les ventes ont dépassé 
                  mes attentes dès le premier mois !"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">AM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Aminata Diallo</p>
                    <p className="text-xs text-muted-foreground">Créatrice de mode</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                  "Le système WhatsApp intégré a révolutionné ma façon de gérer les commandes. 
                  Mes clients adorent la simplicité !"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">IK</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Ibrahim Koné</p>
                    <p className="text-xs text-muted-foreground">Vendeur électronique</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                  "Analytics super détaillées qui m'aident à comprendre mes ventes. 
                  J'ai augmenté mon CA de 40% en 2 mois !"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">FO</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Fatoumata Ouédraogo</p>
                    <p className="text-xs text-muted-foreground">Artisane bijoutière</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                  "Interface très intuitive. Même sans connaissances techniques, 
                  j'ai pu créer une boutique professionnelle."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">MS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Moussa Sawadogo</p>
                    <p className="text-xs text-muted-foreground">Vendeur d'artisanat</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                  "Le QR code pour partager ma boutique est génial ! 
                  Mes clients scannent et commandent en quelques secondes."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">ST</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Salif Traoré</p>
                    <p className="text-xs text-muted-foreground">Vendeur de produits bio</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">
                  "Support client réactif et compétent. Ils m'ont aidé à configurer 
                  ma boutique en un temps record."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">MK</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Mariam Kaboré</p>
                    <p className="text-xs text-muted-foreground">Boutique cosmétiques</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
