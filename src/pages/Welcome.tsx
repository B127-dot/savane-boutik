import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Welcome Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border">
            <span className="text-sm text-muted-foreground">
              🎉 Bienvenue dans BurkE-Shop !
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold">
            Félicitations
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              {user.name} !
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Votre compte a été créé avec succès. Commencez dès maintenant avec votre plan gratuit.
          </p>
        </div>

        {/* Free Plan Card */}
        <div className="bg-gradient-card border border-primary rounded-2xl p-8 shadow-glow">
          <div className="space-y-6">
            {/* Plan Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary/20 border-primary/30 border">
                <Zap className="w-8 h-8 text-primary-glow" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{freePlan.name}</h3>
              <p className="text-muted-foreground">{freePlan.description}</p>
            </div>

            {/* Price */}
            <div className="text-center">
              <div className="flex items-baseline justify-center space-x-2">
                <span className="text-4xl font-bold text-foreground">0</span>
                <span className="text-xl text-muted-foreground">FCFA</span>
              </div>
              <div className="text-muted-foreground">/ 1 mois d'essai</div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {freePlan.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-primary/20 text-primary">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-foreground leading-relaxed">{feature}</span>
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
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            🚀 <strong>Votre essai gratuit commence maintenant</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>Aucune carte bancaire requise</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>Assistance WhatsApp incluse</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-success" />
              <span>Upgrade à tout moment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;