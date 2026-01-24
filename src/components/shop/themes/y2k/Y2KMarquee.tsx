import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Zap, Truck, Shield, Gift, Flame } from 'lucide-react';
import { MarqueeItem } from '@/contexts/AppContext';
import { DEFAULT_TEXTS } from '@/lib/defaultTexts';

interface Y2KMarqueeProps {
  items?: MarqueeItem[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
  zap: Zap,
  truck: Truck,
  shield: Shield,
  gift: Gift,
  flame: Flame,
};

const Y2KMarquee = ({ items }: Y2KMarqueeProps) => {
  // Use provided items or defaults from centralized texts
  const displayItems = items && items.length > 0 
    ? items 
    : DEFAULT_TEXTS.marquee.map((item, index) => ({
        id: `default-${index}`,
        text: item.text,
        icon: item.icon,
      }));

  const repeatedItems = [...displayItems, ...displayItems, ...displayItems, ...displayItems];

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
