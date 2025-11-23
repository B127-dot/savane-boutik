import { ArrowRight, Store, Smartphone, TrendingUp, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import heroImage from "@/assets/hero-ecommerce.jpg";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  const stats = [{
    icon: Store,
    value: "500+",
    label: "Boutiques créées"
  }, {
    icon: Smartphone,
    value: "98%",
    label: "Mobile-friendly"
  }, {
    icon: TrendingUp,
    value: "3x",
    label: "Augmentation des ventes"
  }];
  return <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary-glow))_0%,transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary))_0%,transparent_50%)] opacity-5" />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <AnimatedGroup className="grid lg:grid-cols-2 gap-12 items-center" preset="scale">
          {/* Content Left */}
          <div className="text-center lg:text-left space-y-8">
            <AnimatedGroup className="space-y-6" preset="blur-slide">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border shadow-soft">
                <Rocket className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  La solution e-commerce made in Burkina Faso
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Transformez votre
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  commerce local
                </span>
                en boutique digitale
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Créez votre boutique en 5 minutes. 
Vendez sur WhatsApp et acceptez Orange Money..
              </p>
            </AnimatedGroup>

            {/* CTA Buttons */}
            <AnimatedGroup className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" preset="scale">
              <Button variant="hero" size="lg" className="group" onClick={() => navigate('/signup')}>
                Créer ma boutique gratuitement
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="premium" size="lg">
                Voir la démo
              </Button>
            </AnimatedGroup>

            {/* Social Proof */}
            <AnimatedGroup className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8" preset="fade">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center border-2 border-background">
                      <span className="text-xs text-primary-foreground font-semibold">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>)}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">4.9/5</div>
                  <div className="text-muted-foreground">300+ commerçants</div>
                </div>
              </div>
            </AnimatedGroup>
          </div>

          {/* Hero Image Right */}
          <div className="relative">
            <div className="relative z-10">
              <img src={heroImage} alt="Commerçants utilisant BurkE-Shop" className="rounded-2xl shadow-strong w-full" />
              {/* Floating Cards */}
              <AnimatedGroup preset="scale">
                <div className="absolute -top-4 -left-4 bg-card p-4 rounded-xl shadow-medium border border-border backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                    <span className="text-sm font-medium">En ligne</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-medium border border-border backdrop-blur-sm">
                  <div className="text-sm">
                    <div className="font-bold text-success">+247%</div>
                    <div className="text-muted-foreground">Ventes ce mois</div>
                  </div>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </AnimatedGroup>

        {/* Stats */}
        <AnimatedGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border" preset="slide">
          {stats.map((stat, index) => <div key={index} className="text-center space-y-2 group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary/10 border border-primary/20 group-hover:bg-gradient-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>)}
        </AnimatedGroup>
      </div>
    </section>;
};
export default HeroSection;