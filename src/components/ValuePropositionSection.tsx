import { Store, Smartphone, MessageCircle, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import ShimmerText from '@/components/ui/shimmer-text';

const ValuePropositionSection = () => {
  const benefits = [
    {
      icon: Store,
      title: "Créez votre boutique en 5 minutes",
      description: "Pas besoin de compétences techniques. Notre plateforme intuitive vous permet de lancer votre boutique en ligne rapidement et facilement."
    },
    {
      icon: Smartphone,
      title: "Paiements mobiles intégrés",
      description: "Acceptez Orange Money et Moov Money directement. Vos clients paient comme ils en ont l'habitude, simplement et en toute sécurité."
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Business connecté",
      description: "Recevez les commandes directement sur WhatsApp. Communiquez avec vos clients là où ils sont déjà présents, sans friction."
    },
    {
      icon: TrendingUp,
      title: "Augmentez vos ventes",
      description: "Touchez plus de clients en ligne. Analytics intégré, promotions automatiques, et outils marketing pour booster votre chiffre d'affaires."
    }
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      {/* Organic blob background shape */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 1200 800"
          className="absolute w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>
          <path
            d="M 100 400 Q 200 100, 500 200 T 1100 400 Q 1000 700, 700 650 T 100 400 Z"
            fill="url(#blobGradient)"
            className="animate-pulse"
            style={{ animationDuration: '8s' }}
          />
        </svg>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <ShimmerText 
              text="Et si on vous disait que vous pouviez lancer votre boutique en ligne aujourd'hui ?"
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
            />
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  animation: `fade-in 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-lg md:text-xl text-primary/80 mb-6 font-medium">
              ...tout cela pour que vous puissiez vous concentrer sur ce que vous faites de mieux : vendre
            </p>
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg hover:scale-105 transition-transform duration-300"
              onClick={() => window.location.href = '/signup'}
            >
              Créer ma boutique gratuitement
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
