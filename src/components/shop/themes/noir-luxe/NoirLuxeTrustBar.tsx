import { Shield, Truck, MessageCircle, Award, Clock, CreditCard } from 'lucide-react';

interface NoirLuxeTrustBarProps {
  trustItems?: {
    icon: string;
    text: string;
    subtext?: string;
  }[];
}

const iconMap: { [key: string]: any } = {
  shield: Shield,
  truck: Truck,
  message: MessageCircle,
  award: Award,
  clock: Clock,
  card: CreditCard,
};

const defaultTrustItems = [
  { icon: 'card', text: 'Paiement Sécurisé', subtext: 'Orange & Moov Money' },
  { icon: 'truck', text: 'Livraison Premium', subtext: 'Rapide & Soignée' },
  { icon: 'message', text: 'Service Client VIP', subtext: 'Disponible 7j/7' }
];

const NoirLuxeTrustBar = ({ trustItems = defaultTrustItems }: NoirLuxeTrustBarProps) => {
  return (
    <section className="relative w-full py-12 md:py-16 bg-noir-light overflow-hidden">
      {/* Top & Bottom Gold Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              hsl(43 74% 49% / 0.1) 10px,
              hsl(43 74% 49% / 0.1) 11px
            )`
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {trustItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Shield;
            return (
              <div 
                key={index}
                className="group flex flex-col items-center text-center gap-4 p-6 rounded-none border border-transparent hover:border-gold/30 transition-all duration-500"
              >
                {/* Icon with Gold Border */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 rounded-full border border-gold/50 group-hover:border-gold flex items-center justify-center transition-all duration-300 group-hover:shadow-gold-sm">
                    <IconComponent className="h-7 w-7 text-gold" />
                  </div>
                </div>
                
                {/* Text Content */}
                <div>
                  <h3 className="font-cinzel text-lg font-semibold text-white tracking-wide mb-1 group-hover:text-gold transition-colors duration-300">
                    {item.text}
                  </h3>
                  {item.subtext && (
                    <p className="font-inter text-sm text-white/50">
                      {item.subtext}
                    </p>
                  )}
                </div>

                {/* Decorative Line */}
                <div className="w-12 h-[1px] bg-gold/30 group-hover:bg-gold group-hover:w-20 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NoirLuxeTrustBar;
