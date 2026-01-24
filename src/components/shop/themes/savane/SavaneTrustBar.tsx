import { Truck, Shield, Headphones, CreditCard, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrustBarItem } from '@/contexts/AppContext';

interface SavaneTrustBarProps {
  items?: TrustBarItem[];
}

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  shield: Shield,
  headphones: Headphones,
  wallet: CreditCard,
};

const SavaneTrustBar = ({ items }: SavaneTrustBarProps) => {
  const defaultItems: TrustBarItem[] = [
    { id: '1', icon: 'wallet', title: 'PAIEMENT SÉCURISÉ', subtitle: '' },
    { id: '2', icon: 'truck', title: 'LIVRAISON EXPRESS', subtitle: '' },
    { id: '3', icon: 'headphones', title: 'SUPPORT 24/7', subtitle: '' },
  ];

  const trustItems = items?.length ? items : defaultItems;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-y border-foreground">
      {trustItems.map((item, index) => {
        const IconComponent = iconMap[item.icon] || Shield;
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-center gap-4 py-6 px-4 border-b md:border-b-0 md:border-r border-foreground last:border-0"
          >
            <IconComponent size={20} strokeWidth={1.5} />
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-foreground">
              {item.title}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SavaneTrustBar;
