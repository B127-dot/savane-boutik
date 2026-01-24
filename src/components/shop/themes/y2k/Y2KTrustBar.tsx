import { motion } from 'framer-motion';
import { Truck, Shield, Clock, Headphones, Star, Heart, Phone, Check, Wallet, Gift, Zap, Package } from 'lucide-react';
import { TrustBarItem } from '@/contexts/AppContext';
import { DEFAULT_TEXTS } from '@/lib/defaultTexts';

interface Y2KTrustBarProps {
  items?: TrustBarItem[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: Truck,
  shield: Shield,
  clock: Clock,
  headphones: Headphones,
  star: Star,
  heart: Heart,
  phone: Phone,
  check: Check,
  wallet: Wallet,
  gift: Gift,
  zap: Zap,
  package: Package,
};

const Y2KTrustBar = ({ items }: Y2KTrustBarProps) => {
  // Use provided items or defaults
  const displayItems: TrustBarItem[] = items && items.length > 0 
    ? items 
    : DEFAULT_TEXTS.trustBar.map((item, index) => ({
        id: `default-${index}`,
        icon: item.icon as TrustBarItem['icon'],
        title: item.text,
        subtitle: undefined,
      }));

  return (
    <section className="py-8 bg-card border-y-2 border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayItems.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Shield;
            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                  <IconComponent className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-semibold text-sm text-foreground">
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span className="font-body text-xs text-muted-foreground">
                      {item.subtitle}
                    </span>
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

export default Y2KTrustBar;
