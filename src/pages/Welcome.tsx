import { Button } from "@/components/ui/button";
import { Check, Star, Zap, TrendingUp, ShoppingBag } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import welcome3dIllustration from "@/assets/welcome-3d-illustration.png";

const Welcome = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const freePlan = {
    name: "Plan Gratuit",
    description: "Testez la plateforme sans risque pendant 1 mois",
    features: [
      "Jusqu'à 5 produits",
      "Paiements locaux (Orange Money, Moov)",
      "Boutique publique avec lien BurkinaShop",
      "Commandes illimitées",
      "Support WhatsApp basique"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Column - Content */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Header */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border">
              <span className="text-sm text-muted-foreground">
                🎉 Bienvenue dans BurkE-Shop !
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Félicitations
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                {user.name} !
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Votre compte a été créé avec succès. Commencez dès maintenant avec votre plan gratuit.
            </p>
          </div>

          {/* Free Plan Card */}
          <div className="bg-gradient-card border border-primary rounded-2xl p-6 shadow-glow">
            <div className="space-y-5">
              {/* Plan Header */}
              <div className="text-center lg:text-left space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-primary/20 border-primary/30 border">
                  <Zap className="w-7 h-7 text-primary-glow" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{freePlan.name}</h3>
                <p className="text-sm text-muted-foreground">{freePlan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center lg:text-left">
                <div className="flex items-baseline justify-center lg:justify-start space-x-2">
                  <span className="text-3xl font-bold text-foreground">0</span>
                  <span className="text-lg text-muted-foreground">FCFA</span>
                </div>
                <div className="text-sm text-muted-foreground">/ 1 mois d'essai</div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {freePlan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-primary/20 text-primary">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                variant="hero" 
                className="w-full"
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Accéder à mon tableau de bord
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center lg:text-left space-y-3">
            <p className="text-sm text-muted-foreground">
              🚀 <strong>Votre essai gratuit commence maintenant</strong>
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-success" />
                <span>Aucune carte requise</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-success" />
                <span>Support WhatsApp</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-success" />
                <span>Upgrade à tout moment</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Visual Panel (Hidden on mobile/tablet) */}
        <motion.div 
          className="hidden lg:block relative h-[600px] rounded-3xl overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* 3D Illustration */}
          <motion.img 
            src={welcome3dIllustration} 
            alt="Célébration de succès 3D" 
            className="absolute inset-0 w-full h-full object-cover cursor-pointer" 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Floating Stats Card */}
          <motion.div 
            className="absolute bottom-6 left-6 right-6 bg-card/80 backdrop-blur-xl rounded-2xl p-4 border border-border/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Prêt à vendre !</p>
                  <p className="text-xs text-muted-foreground">Votre boutique est configurée</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm font-bold">100%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
