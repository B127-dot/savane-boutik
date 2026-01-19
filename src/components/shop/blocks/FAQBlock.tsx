import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQBlockProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  animationsEnabled?: boolean;
  config?: {
    title?: string;
    subtitle?: string;
    faqs?: FAQItem[];
  };
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'Comment puis-je passer une commande ?',
    answer: 'Vous pouvez passer commande directement sur notre site en ajoutant des produits au panier, puis en complétant le processus de paiement. Vous pouvez aussi nous contacter sur WhatsApp pour commander.',
  },
  {
    id: '2',
    question: 'Quels sont les modes de paiement acceptés ?',
    answer: 'Nous acceptons Orange Money, Moov Money, Wave et le paiement à la livraison (COD) dans certaines zones.',
  },
  {
    id: '3',
    question: 'Combien coûte la livraison ?',
    answer: 'Les frais de livraison varient selon votre localisation. La livraison est gratuite à partir de 50 000 FCFA d\'achat à Ouagadougou.',
  },
  {
    id: '4',
    question: 'Quel est le délai de livraison ?',
    answer: 'À Ouagadougou, la livraison se fait généralement en 24-48h. Pour les autres villes du Burkina Faso, comptez 3-5 jours ouvrables.',
  },
  {
    id: '5',
    question: 'Puis-je retourner un produit ?',
    answer: 'Oui, vous avez 7 jours pour retourner un produit non utilisé dans son emballage d\'origine. Contactez-nous sur WhatsApp pour initier un retour.',
  },
];

const FAQBlock = ({
  title: propTitle,
  subtitle: propSubtitle,
  faqs: propFaqs,
  animationsEnabled = true,
  config
}: FAQBlockProps) => {
  // Prioritize config values over direct props
  const title = config?.title ?? propTitle ?? 'Questions fréquentes';
  const subtitle = config?.subtitle ?? propSubtitle ?? 'Tout ce que vous devez savoir';
  const faqs = config?.faqs ?? propFaqs ?? DEFAULT_FAQS;

  const MotionDiv = animationsEnabled ? motion.div : 'div' as any;

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          )}
        </div>

        <MotionDiv
          initial={animationsEnabled ? { opacity: 0, y: 20 } : undefined}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-border/50 rounded-xl bg-card px-4 overflow-hidden"
              >
                <AccordionTrigger className="text-left py-4 hover:no-underline">
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionDiv>
      </div>
    </section>
  );
};

export default FAQBlock;
