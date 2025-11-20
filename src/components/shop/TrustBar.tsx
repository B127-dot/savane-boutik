import { Smartphone, Truck, MessageCircle, Shield } from 'lucide-react';

interface TrustBarProps {
  trustItems?: {
    icon: string;
    text: string;
  }[];
}

const iconMap: { [key: string]: any } = {
  smartphone: Smartphone,
  truck: Truck,
  message: MessageCircle,
  shield: Shield,
};

const defaultTrustItems = [
  { icon: 'smartphone', text: 'Paiement Mobile Sécurisé' },
  { icon: 'truck', text: 'Livraison Rapide' },
  { icon: 'message', text: 'Support 7j/7' }
];

const TrustBar = ({ trustItems = defaultTrustItems }: TrustBarProps) => {
  return (
    <section className="w-full py-8 md:py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {trustItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Shield;
            return (
              <div 
                key={index}
                className="flex items-center justify-center gap-4 text-center md:text-left"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-base md:text-lg font-medium text-foreground">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
