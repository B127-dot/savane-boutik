import { Store, Smartphone, MessageCircle, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

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
      <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="hidden sm:block absolute bottom-20 right-10 w-48 h-48 sm:w-80 sm:h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight relative">
              <span className="relative inline-block">
                Et si on vous disait que vous pouviez
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent bg-[length:200%_100%] bg-clip-text animate-shimmer" />
              </span>
              <br />
              <span className="text-primary">lancer votre boutique en ligne aujourd'hui ?</span>
            </h2>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-xl shadow-black/5"
                style={{
                  animation: `fade-in 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Grid pattern background */}
                <div className="pointer-events-none absolute inset-0 opacity-20 rounded-2xl" style={{
                  backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 1px)',
                  backgroundSize: '48px 48px'
                }}></div>
                
                {/* Inner ring effect */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 ring-1 ring-primary/20">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
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
              aria-label="Créer ma boutique gratuitement - Inscription en 5 minutes"
            >
              Créer ma boutique gratuitement
              <span className="ml-2" aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
