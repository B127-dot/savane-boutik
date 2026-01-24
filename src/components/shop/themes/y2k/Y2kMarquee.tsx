import { motion } from 'framer-motion';
import { Sparkles, Star, Zap, Heart, Truck, Gift } from 'lucide-react';

interface MarqueeItem {
  text: string;
  icon: React.ElementType;
}

interface Y2kMarqueeProps {
  items?: MarqueeItem[];
  className?: string;
}

const defaultItems: MarqueeItem[] = [
  { text: "FREE SHIPPING", icon: Truck },
  { text: "NEW DROPS WEEKLY", icon: Star },
  { text: "MAIN CHARACTER ENERGY", icon: Zap },
  { text: "SLAY ALL DAY", icon: Heart },
  { text: "Y2K VIBES", icon: Sparkles },
  { text: "LIMITED EDITION", icon: Gift },
];

export const Y2kMarquee = ({ items = defaultItems, className = "" }: Y2kMarqueeProps) => {
  // Repeat items 4 times for seamless loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`bg-gradient-to-r from-primary via-secondary to-primary overflow-hidden py-3 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 mx-6">
            <item.icon className="w-4 h-4 text-primary-foreground" />
            <span className="font-outfit text-sm font-bold text-primary-foreground uppercase tracking-wide">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Y2kMarquee;
