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
    <section className="w-full py-10 md:py-14 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {trustItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Shield;
            return (
              <div 
                key={index}
                className="group flex flex-col items-center text-center gap-4 p-6 rounded-xl hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <p className="text-lg md:text-xl font-bold text-foreground mb-1">
                    {item.text}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {index === 0 && "Orange Money • Moov Money"}
                    {index === 1 && "Livraison dans tout Ouaga"}
                    {index === 2 && "Réponse en moins d'1h"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
