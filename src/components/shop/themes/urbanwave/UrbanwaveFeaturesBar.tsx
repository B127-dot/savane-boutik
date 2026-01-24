import { motion } from 'framer-motion';
import { Truck, RefreshCw, Shield, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Livraison Express',
    description: 'Livraison gratuite dès 100€ d\'achat',
  },
  {
    icon: RefreshCw,
    title: 'Retours Faciles',
    description: '30 jours pour changer d\'avis',
  },
  {
    icon: Shield,
    title: 'Paiement Sécurisé',
    description: 'Transactions 100% sécurisées',
  },
  {
    icon: CreditCard,
    title: 'Paiement en 3x',
    description: 'Sans frais dès 150€',
  },
];

const UrbanwaveFeaturesBar = () => {
  return (
    <section className="py-8 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UrbanwaveFeaturesBar;
