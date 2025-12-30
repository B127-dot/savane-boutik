import React from 'react';
import { Truck, RotateCcw, Shield, Clock } from 'lucide-react';

const HauteFashionTrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: Truck,
      title: 'Livraison Express',
      description: 'Livré en 24-48h',
    },
    {
      icon: RotateCcw,
      title: 'Retours Faciles',
      description: 'Sous 30 jours',
    },
    {
      icon: Shield,
      title: 'Paiement Sécurisé',
      description: '100% protégé',
    },
    {
      icon: Clock,
      title: 'Disponibilité',
      description: '7j/7 pour vous',
    },
  ];

  return (
    <section className="bg-[hsl(0,0%,4%)] border-y border-[hsl(0,0%,12%)]">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {trustItems.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center gap-3 animate-haute-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,20%)] flex items-center justify-center group-hover:border-[hsl(24,100%,50%)]/30 transition-colors">
                <item.icon className="w-5 h-5 text-[hsl(24,100%,50%)]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[hsl(0,0%,50%)]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HauteFashionTrustBar;
