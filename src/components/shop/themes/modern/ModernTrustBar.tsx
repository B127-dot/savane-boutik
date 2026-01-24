import { motion } from 'framer-motion';
import { Truck, Shield, Phone, CreditCard, Package, Clock, LucideIcon } from 'lucide-react';
import { DEFAULT_TEXTS } from '@/lib/defaultTexts';

const ICON_MAP: Record<string, LucideIcon> = {
  truck: Truck,
  shield: Shield,
  phone: Phone,
  creditCard: CreditCard,
  package: Package,
  clock: Clock,
};

interface TrustItem {
  icon: string;
  text: string;
}

interface ModernTrustBarProps {
  items?: TrustItem[];
  className?: string;
}

const defaultItems: TrustItem[] = DEFAULT_TEXTS.trustBar.map((item) => ({
  icon: item.icon,
  text: item.text,
}));

const ModernTrustBar = ({ items = defaultItems, className = '' }: ModernTrustBarProps) => {
  return (
    <section className={`py-6 md:py-8 border-y border-border bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-16">
          {items.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Shield;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 15%, transparent)',
                  }}
                >
                  <IconComponent
                    className="w-5 h-5 md:w-6 md:h-6"
                    style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }}
                  />
                </div>
                <span className="font-body text-sm md:text-base font-medium text-foreground">
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

export default ModernTrustBar;
