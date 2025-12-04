import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Comment fonctionnent les paiements mobiles ?",
    answer: "BurkinaShop s'intègre avec Orange Money et Moov Money pour vous permettre d'accepter les paiements mobiles directement. Vos clients peuvent payer en toute sécurité via leur téléphone, et vous recevez l'argent instantanément sur votre compte."
  },
  {
    question: "Dois-je payer des frais mensuels ?",
    answer: "Non ! BurkinaShop offre un plan gratuit pour toujours. Vous pouvez créer votre boutique, ajouter vos produits et commencer à vendre sans aucun frais d'abonnement. Nos plans payants offrent des fonctionnalités avancées uniquement si vous en avez besoin."
  },
  {
    question: "Comment mes clients passent-ils commande ?",
    answer: "Vos clients peuvent commander directement depuis votre boutique en ligne ou via WhatsApp. Ils ajoutent des produits au panier, remplissent leurs informations de livraison, et choisissent leur mode de paiement (Orange Money, Moov Money, ou paiement à la livraison)."
  },
  {
    question: "Puis-je gérer ma boutique depuis mon téléphone ?",
    answer: "Absolument ! BurkinaShop est 100% responsive. Vous pouvez gérer vos produits, consulter vos commandes, et répondre aux clients depuis votre smartphone, tablette ou ordinateur, où que vous soyez."
  },
  {
    question: "Comment fonctionne l'intégration WhatsApp ?",
    answer: "Connectez simplement votre numéro WhatsApp Business dans les paramètres. Vos clients pourront ensuite vous contacter directement via WhatsApp pour passer commande ou poser des questions. Tous les détails de la commande sont automatiquement formatés pour vous."
  },
  {
    question: "Que se passe-t-il si je dépasse mon quota de produits ?",
    answer: "Sur le plan gratuit, vous pouvez ajouter jusqu'à 50 produits. Si vous avez besoin de plus, passez simplement au plan Pro qui vous permet d'ajouter des produits illimités, sans interruption de service pour vos clients."
  },
  {
    question: "Est-ce que mes données sont sécurisées ?",
    answer: "Oui, totalement. Toutes vos données (produits, commandes, informations clients) sont stockées de manière sécurisée et cryptée. Nous ne partageons jamais vos données avec des tiers."
  },
  {
    question: "Puis-je personnaliser l'apparence de ma boutique ?",
    answer: "Oui ! BurkinaShop propose plusieurs thèmes professionnels que vous pouvez appliquer en un clic (Modern, Elegant, Minimal, Creative). Vous pouvez aussi personnaliser votre logo, les couleurs, et le contenu de votre boutique."
  }
];

const FAQSection = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="faq" ref={elementRef} className="py-24 px-4 bg-background relative overflow-hidden" aria-labelledby="faq-title">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 id="faq-title" className="text-3xl md:text-4xl font-display font-bold mb-4">
            Questions <span className="text-primary">Fréquentes</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur BurkinaShop. Vous avez d'autres questions ? Contactez-nous sur WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-display font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              D'autres questions ? Contactez-nous sur{" "}
              <a href="https://wa.me/22670000000" className="text-primary hover:underline font-semibold">
                WhatsApp
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
