import { TrustBarItem } from '@/contexts/AppContext';
import { Truck, Shield, Phone, Star, Heart, Clock, Check, Wallet, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

interface AesthetiqueTrustBarProps {
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

const AesthetiqueTrustBar = ({ items = DEFAULT_ITEMS }: AesthetiqueTrustBarProps) => {
  return (
    <section className="bg-zinc-900/50 backdrop-blur-sm py-8 md:py-10 border-y border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className={`grid gap-6 md:gap-8 ${
          items.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          items.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {items.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Check;
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center gap-4 text-white group"
              >
                {/* Icon Container - Uses CSS variable for primary color */}
                <div className="w-12 h-12 rounded-full shop-primary-bg/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110" 
                     style={{ backgroundColor: 'hsl(var(--shop-primary-hsl) / 0.15)' }}>
                  <IconComponent 
                    className="w-5 h-5 shop-primary-text" 
                    style={{ color: 'var(--shop-primary)' }}
                  />
                </div>
                
                {/* Text */}
                <div className="text-left">
                  <p className="font-medium text-sm md:text-base text-white leading-tight">
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="text-xs md:text-sm text-zinc-400 mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AesthetiqueTrustBar;
