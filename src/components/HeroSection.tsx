import { ArrowRight, Store, Smartphone, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-ecommerce.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.3 });
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.1 });

  const stats = [
    {
      icon: Store,
      value: "500+",
      label: "Boutiques créées",
    },
    {
      icon: Smartphone,
      value: "98%",
      label: "Mobile-friendly",
    },
    {
      icon: TrendingUp,
      value: "3x",
      label: "Augmentation des ventes",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary-glow))_0%,transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary))_0%,transparent_50%)] opacity-5" />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Left */}
          <div 
            ref={contentRef}
            className={`text-center lg:text-left space-y-8 animate-fade-left ${contentVisible ? 'visible' : ''}`}
          >
            <div className="space-y-6">
              <div 
                ref={headerRef}
                className={`inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border shadow-soft animate-fade-up ${headerVisible ? 'visible' : ''}`}
              >
                <span className="text-sm text-muted-foreground">
                  🚀 La solution e-commerce made in Burkina Faso
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
                Créez votre boutique en ligne en quelques minutes. Vendez sur WhatsApp, 
                Facebook et votre site web. Acceptez Orange Money et Moov Money.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="lg" 
                className="group" 
                onClick={() => navigate('/signup')}
              >
                Créer ma boutique gratuitement
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="premium" size="lg">
                Voir la démo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center border-2 border-background"
                    >
                      <span className="text-xs text-primary-foreground font-semibold">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">4.9/5</div>
                  <div className="text-muted-foreground">300+ commerçants</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Right */}
          <div 
            ref={imageRef}
            className={`relative animate-fade-right ${imageVisible ? 'visible' : ''}`}
          >
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Commerçants utilisant BurkE-Shop"
                className="rounded-2xl shadow-strong w-full"
              />
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-card p-4 rounded-xl shadow-medium border border-border backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-sm font-medium">En ligne</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-medium border border-border backdrop-blur-sm">
                <div className="text-sm">
                  <div className="font-bold text-success">+247%</div>
                  <div className="text-muted-foreground">Ventes ce mois</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border animate-fade-up ${statsVisible ? 'visible' : ''}`}
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center space-y-2 animate-stagger delay-${(index + 1) * 100} ${statsVisible ? 'visible' : ''}`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary/10 border border-primary/20">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;