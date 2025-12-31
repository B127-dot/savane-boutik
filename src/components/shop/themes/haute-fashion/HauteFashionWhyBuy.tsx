import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

const HauteFashionWhyBuy = () => {
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
    <section className="py-16 md:py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            Nos engagements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Pourquoi Acheter Chez Nous ?
          </h2>
          <p className="text-muted-foreground">
            Votre satisfaction est notre priorité
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group text-center p-6 md:p-8 rounded-2xl bg-card/30 border border-white/10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,107,0,0.1)] transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="h-7 w-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-1">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HauteFashionWhyBuy;
