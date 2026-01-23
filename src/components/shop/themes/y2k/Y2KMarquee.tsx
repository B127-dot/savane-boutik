import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Zap, Truck, Shield } from 'lucide-react';

interface Y2KMarqueeProps {
  items?: Array<{ text: string; icon?: string }>;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
  zap: Zap,
  truck: Truck,
  shield: Shield,
};

const defaultItems = [
  { text: 'LIVRAISON GRATUITE', icon: 'truck' },
  { text: 'NOUVELLES SORTIES', icon: 'star' },
  { text: 'ÉNERGIE PRINCIPALE', icon: 'zap' },
  { text: 'SLAY ALL DAY', icon: 'heart' },
  { text: 'Y2K VIBES', icon: 'sparkles' },
  { text: 'ÉDITION LIMITÉE', icon: 'star' },
];

const Y2KMarquee = ({ items = defaultItems }: Y2KMarqueeProps) => {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-gradient-primary py-2.5 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
        className="flex whitespace-nowrap"
      >
        {repeatedItems.map((item, index) => {
          const IconComponent = ICON_MAP[item.icon || 'sparkles'] || Sparkles;
          return (
            <div key={index} className="flex items-center gap-3 mx-6">
              <IconComponent className="w-4 h-4 text-primary-foreground" />
              <span className="font-display font-bold text-sm text-primary-foreground tracking-wide">
                {item.text}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Y2KMarquee;
