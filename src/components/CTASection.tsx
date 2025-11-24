import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const navigate = useNavigate();

  return (
    <section 
      ref={elementRef} 
      className="py-24 px-4 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Ambient gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Main heading */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Créez votre boutique en ligne{" "}
              <span className="text-primary">gratuitement</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Rejoignez des centaines de vendeurs burkinabè qui font confiance à BurkinaShop 
              pour développer leur activité en ligne
            </p>
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Avatars */}
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center"
                >
                  <Users className="w-5 h-5 text-primary" />
                </div>
              ))}
            </div>
            
            {/* Rating */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">4.9/5</span> · Plus de 500+ vendeurs satisfaits
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              aria-label="Lancez votre boutique en ligne dès maintenant"
            >
              Lancez votre boutique maintenant
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Aucune carte bancaire requise · Configuration en 5 minutes
            </p>
          </motion.div>

          {/* Additional trust elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-8 border-t border-border/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Boutiques actives</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">10k+</div>
                <div className="text-sm text-muted-foreground">Commandes traitées</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
