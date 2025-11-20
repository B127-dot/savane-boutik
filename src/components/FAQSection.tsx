import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import useScrollAnimation from "@/hooks/useScrollAnimation";

interface FAQ {
  question: string;
  answer: string;
  details?: string[];
}

const faqs: FAQ[] = [
  {
    question: "Comment commencer à vendre sur BurkinaShop ?",
    answer: "Créez votre compte gratuitement, configurez votre boutique en quelques minutes, ajoutez vos produits et commencez à vendre immédiatement.",
    details: [
      "Inscription gratuite en moins de 2 minutes",
      "Configuration guidée de votre boutique",
      "Ajout illimité de produits"
    ]
  },
  {
    question: "Puis-je personnaliser ma boutique ?",
    answer: "Oui, vous pouvez personnaliser votre boutique avec votre nom, description, logo et informations de contact. Partagez votre lien unique avec vos clients.",
  },
  {
    question: "Comment mes clients passent-ils commande ?",
    answer: "Vos clients peuvent commander directement via votre boutique en ligne et vous contacter via WhatsApp pour finaliser la commande. Simple et efficace !",
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer: "Non, aucun frais caché. Le plan gratuit vous permet de commencer sans engagement. Les plans payants offrent des fonctionnalités avancées avec tarification transparente.",
  },
  {
    question: "Comment recevoir mes paiements ?",
    answer: "Vous gérez vos paiements directement avec vos clients via vos méthodes préférées (Mobile Money, espèces, virement). Nous ne prenons aucune commission sur vos ventes.",
  },
  {
    question: "Puis-je suivre mes ventes et statistiques ?",
    answer: "Oui, vous disposez d'un tableau de bord complet avec statistiques en temps réel, suivi des commandes, analyse des ventes et graphiques de performance.",
  }
];

const FAQItem = ({ faq, index }: { faq: FAQ; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground pr-4">
            {faq.question}
          </h3>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>
      
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-muted-foreground leading-relaxed">
            {faq.answer}
          </p>
          {faq.details && (
            <ul className="mt-3 space-y-2">
              {faq.details.map((detail, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={elementRef} className="py-20 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "text-center mb-12 transition-all duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur BurkinaShop
          </p>
        </div>

        <div
          className={cn(
            "grid md:grid-cols-2 gap-6 max-w-6xl mx-auto transition-all duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
