import { 
  Store, 
  Smartphone, 
  CreditCard, 
  BarChart3, 
  Users, 
  Shield,
  MessageCircle,
  Palette
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Store,
      title: "Boutique clé en main",
      description: "Créez votre boutique en ligne en 5 minutes. Templates adaptés au marché burkinabé.",
      color: "text-primary"
    },
    {
      icon: Smartphone,
      title: "100% Mobile",
      description: "Interface optimisée pour mobile. Vos clients commandent facilement depuis leur téléphone.",
      color: "text-success"
    },
    {
      icon: CreditCard,
      title: "Paiement local",
      description: "Orange Money, Moov Money et paiement à la livraison intégrés nativement.",
      color: "text-warning"
    },
    {
      icon: MessageCircle,
      title: "Vente WhatsApp",
      description: "Synchronisez vos produits avec WhatsApp Business. Vendez directement dans vos discussions.",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Tableau de bord",
      description: "Suivez vos ventes, stock et clients en temps réel. Analytics simples et efficaces.",
      color: "text-success"
    },
    {
      icon: Palette,
      title: "Personnalisation",
      description: "Couleurs, logo, thèmes. Votre boutique reflète votre marque et votre style.",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Gestion clients",
      description: "Base de données clients, historique des commandes, système de fidélité simple.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Données protégées, transactions sécurisées. Conforme aux standards internationaux.",
      color: "text-success"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-card rounded-full border border-border">
            <span className="text-sm text-muted-foreground">
              ✨ Fonctionnalités pensées pour vous
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            Tout ce dont vous avez besoin pour
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              vendre en ligne
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une solution complète adaptée aux réalités du commerce au Burkina Faso. 
            Simplicité, efficacité et résultats garantis.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-card rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-glow"
            >
              <div className="space-y-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Prêt à transformer votre commerce ?
          </p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-primary rounded-full text-primary-foreground font-medium shadow-glow hover:scale-105 transition-bounce cursor-pointer">
            <Store className="w-5 h-5" />
            <span>Créer ma boutique maintenant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;