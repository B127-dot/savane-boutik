import { motion } from 'framer-motion';
import { Truck, Shield, Clock, Headphones } from 'lucide-react';

interface TrustItem {
  icon: string;
  text: string;
}

interface Y2KTrustBarProps {
  items?: TrustItem[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: Truck,
  shield: Shield,
  clock: Clock,
  headphones: Headphones,
};

const defaultItems: TrustItem[] = [
  { icon: 'truck', text: 'Livraison Gratuite' },
  { icon: 'shield', text: 'Paiement Sécurisé' },
  { icon: 'clock', text: 'Livraison 24-48h' },
  { icon: 'headphones', text: 'Support 7j/7' },
];

const Y2KTrustBar = ({ items = defaultItems }: Y2KTrustBarProps) => {
  return (
    <section className="py-8 bg-card border-y-2 border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Shield;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                  <IconComponent className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display font-semibold text-sm text-foreground">
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Y2KTrustBar;
