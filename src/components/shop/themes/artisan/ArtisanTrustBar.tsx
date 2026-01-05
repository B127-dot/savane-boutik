import { TrustBarItem } from '@/contexts/AppContext';
import { Truck, Shield, Phone, Star, Heart, Clock, Check, Wallet, Headphones } from 'lucide-react';

interface ArtisanTrustBarProps {
  items?: TrustBarItem[];
}

const DEFAULT_ITEMS: TrustBarItem[] = [
  { id: '1', icon: 'wallet', title: 'Paiement Mobile Sécurisé', subtitle: 'Orange Money, Wave, Moov' },
  { id: '2', icon: 'truck', title: 'Livraison Rapide', subtitle: 'Partout au Burkina' },
  { id: '3', icon: 'headphones', title: 'Support 7j/7', subtitle: 'WhatsApp & Appel' },
];

const ICON_MAP = {
  truck: Truck,
  shield: Shield,
  phone: Phone,
  star: Star,
  heart: Heart,
  clock: Clock,
  check: Check,
  wallet: Wallet,
  headphones: Headphones,
} as const;

const ArtisanTrustBar = ({ items = DEFAULT_ITEMS }: ArtisanTrustBarProps) => {
  return (
    <section className="bg-artisan-sand/50 py-8 md:py-10 border-y border-artisan-sand">
      <div className="container mx-auto px-4">
        <div className={`grid gap-6 md:gap-8 ${
          items.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          items.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {items.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Check;
            
            return (
              <div 
                key={item.id}
                className="flex items-center justify-center gap-4 text-artisan-charcoal group"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-full bg-artisan-olive/10 flex items-center justify-center transition-all duration-300 group-hover:bg-artisan-olive/20 group-hover:scale-110">
                  <IconComponent className="w-6 h-6 text-artisan-olive" />
                </div>
                
                {/* Text */}
                <div className="text-left">
                  <p className="font-medium text-sm md:text-base leading-tight">
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="text-xs md:text-sm text-artisan-charcoal/60 mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArtisanTrustBar;
