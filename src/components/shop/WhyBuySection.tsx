import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

const WhyBuySection = () => {
  const benefits = [
    {
      icon: Truck,
      title: "Livraison 24h",
      description: "Dans tout Ouagadougou"
    },
    {
      icon: Shield,
      title: "Paiement Sécurisé",
      description: "100% garanti"
    },
    {
      icon: RotateCcw,
      title: "Retour 7 jours",
      description: "Sans frais"
    },
    {
      icon: Headphones,
      title: "Support 24/7",
      description: "Via WhatsApp"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Pourquoi Acheter Chez Nous ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Votre satisfaction est notre priorité
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group text-center p-8 bg-card rounded-xl border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuySection;
