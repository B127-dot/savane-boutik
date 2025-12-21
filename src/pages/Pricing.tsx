import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Gift, Star, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";

const plans = [
  {
    name: "Starter",
    price: { monthly: 5000, annual: 4000 },
    description: "Pour les petits vendeurs (1-5M FCFA/mois)",
    cta: "Commencer",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 12500, annual: 10000 },
    description: "Pour les vendeurs établis (5-15M FCFA/mois)",
    cta: "Commencer",
    popular: true,
    badge: "Le plus populaire",
  },
  {
    name: "Business",
    price: { monthly: 25000, annual: 20000 },
    description: "Pour les PME e-commerce (15M+ FCFA/mois)",
    cta: "Contactez-nous",
    popular: false,
  },
];

const featureCategories = [
  {
    name: "Boutique en ligne",
    features: [
      { name: "Nombre de boutiques", starter: "1", pro: "1", business: "Illimité" },
      { name: "Nombre de produits", starter: "100", pro: "Illimité", business: "Illimité" },
      { name: "Thèmes de boutique", starter: "2", pro: "4", business: "Tous + personnalisés" },
      { name: "Nom de domaine personnalisé", starter: false, pro: true, business: true },
      { name: "Suppression du branding BurkE-Shop", starter: false, pro: false, business: true },
    ],
  },
  {
    name: "Ventes & Paiements",
    features: [
      { name: "Paiements Orange Money", starter: true, pro: true, business: true },
      { name: "Paiements Moov Money", starter: true, pro: true, business: true },
      { name: "Codes promo & réductions", starter: false, pro: true, business: true },
      { name: "Commission sur ventes", starter: "2%", pro: "0%", business: "0%" },
      { name: "Gestion multi-devises", starter: false, pro: false, business: true },
    ],
  },
  {
    name: "Communication",
    features: [
      { name: "Commandes WhatsApp", starter: "Basique", pro: "Business intégré", business: "Business + API" },
      { name: "Notifications automatiques", starter: true, pro: true, business: true },
      { name: "Email marketing", starter: false, pro: true, business: true },
      { name: "SMS marketing", starter: false, pro: false, business: true },
    ],
  },
  {
    name: "Analytics & Rapports",
    features: [
      { name: "Statistiques de base", starter: true, pro: true, business: true },
      { name: "Analytics avancés", starter: false, pro: true, business: true },
      { name: "Rapports personnalisés", starter: false, pro: false, business: true },
      { name: "Export des données", starter: false, pro: true, business: true },
      { name: "API développeur", starter: false, pro: false, business: true },
    ],
  },
  {
    name: "Support",
    features: [
      { name: "Support par email", starter: true, pro: true, business: true },
      { name: "Support WhatsApp prioritaire", starter: false, pro: true, business: true },
      { name: "Account manager dédié", starter: false, pro: false, business: true },
      { name: "Formation dédiée", starter: false, pro: false, business: true },
      { name: "SLA garanti", starter: false, pro: false, business: "99.9%" },
    ],
  },
];

const faqs = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les changements prennent effet immédiatement et la facturation est ajustée au prorata.",
  },
  {
    question: "Comment fonctionne l'essai gratuit de 30 jours ?",
    answer: "Vous avez accès à toutes les fonctionnalités du plan choisi pendant 30 jours sans engagement. Aucune carte bancaire n'est requise pour commencer.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Nous acceptons Orange Money, Moov Money, et les virements bancaires pour les abonnements. Les paiements par carte arrivent bientôt.",
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer: "Non, le prix affiché est le prix final. Seul le plan Starter a une commission de 2% sur les ventes, les plans Pro et Business sont à 0% de commission.",
  },
  {
    question: "Puis-je annuler mon abonnement ?",
    answer: "Oui, vous pouvez annuler à tout moment. Votre accès reste actif jusqu'à la fin de votre période de facturation en cours.",
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleToggle = (checked: boolean) => {
    setIsAnnual(checked);
    if (checked) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { x: 0.5, y: 0.3 },
        colors: ["#10B981", "#34D399", "#059669", "#6EE7B7"],
      });
    }
  };

  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-primary mx-auto" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Free Trial Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
              <Gift className="w-5 h-5" />
              <span className="font-semibold">Essai gratuit de 30 jours</span>
              <span className="text-primary/70">• Sans engagement</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Tarification simple et{" "}
              <span className="text-primary">transparente</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Choisissez le plan adapté à votre activité. Pas de frais cachés, pas de surprise.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                Mensuel
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                Annuel
              </span>
              {isAnnual && (
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  -20%
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`relative p-6 h-full flex flex-col ${
                    plan.popular
                      ? "border-2 border-primary shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] scale-105"
                      : "border-border hover:border-primary/50 transition-colors"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground shadow-lg">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold">
                        {(isAnnual ? plan.price.annual : plan.price.monthly).toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">FCFA/mois</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-muted-foreground">
                        Facturé {(plan.price.annual * 12).toLocaleString()} FCFA/an
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>

                  <Button
                    className={`w-full mt-auto ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/signup">
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Comparaison détaillée des plans</h2>
            <p className="text-muted-foreground">
              Découvrez toutes les fonctionnalités incluses dans chaque plan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full border-collapse">
              {/* Header */}
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-lg w-1/3">
                    Fonctionnalités
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`text-center py-4 px-4 font-semibold text-lg ${
                        plan.popular ? "text-primary" : ""
                      }`}
                    >
                      {plan.name}
                      {plan.popular && (
                        <Badge className="ml-2 bg-primary/20 text-primary text-xs">
                          Populaire
                        </Badge>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {featureCategories.map((category, catIndex) => (
                  <>
                    {/* Category Header */}
                    <tr key={`cat-${catIndex}`} className="bg-muted/50">
                      <td
                        colSpan={4}
                        className="py-3 px-4 font-semibold text-foreground"
                      >
                        {category.name}
                      </td>
                    </tr>

                    {/* Features */}
                    {category.features.map((feature, featureIndex) => (
                      <tr
                        key={`${catIndex}-${featureIndex}`}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm">{feature.name}</td>
                        <td className="py-3 px-4 text-center">
                          {renderValue(feature.starter)}
                        </td>
                        <td className="py-3 px-4 text-center bg-primary/5">
                          {renderValue(feature.pro)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {renderValue(feature.business)}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* CTA under table */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button size="lg" asChild>
              <Link to="/signup">
                Commencer l'essai gratuit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://wa.me/22670000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Discuter avec un conseiller
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-muted-foreground">
              Tout ce que vous devez savoir sur nos tarifs
            </p>
          </motion.div>

          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Prêt à développer votre commerce ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Rejoignez plus de 300 entrepreneurs qui font confiance à BurkE-Shop pour leur boutique en ligne.
            </p>
            <Button size="lg" className="shadow-lg shadow-primary/30" asChild>
              <Link to="/signup">
                Commencer gratuitement pendant 30 jours
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Aucune carte bancaire requise • Annulez à tout moment
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;