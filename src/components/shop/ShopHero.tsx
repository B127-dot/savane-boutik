import { Button } from '@/components/ui/button';

interface ShopHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
}

const ShopHero = ({ 
  heroImage, 
  heroTitle = "Bienvenue dans notre boutique",
  heroSubtitle = "Découvrez nos produits de qualité",
  heroButtonText = "Voir la Collection",
  heroButtonLink = "#products"
}: ShopHeroProps) => {
  const handleButtonClick = () => {
    if (heroButtonLink?.startsWith('#')) {
      const element = document.querySelector(heroButtonLink);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = heroButtonLink || '#products';
    }
  };

  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: heroImage 
            ? `url(${heroImage})` 
            : 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(142 76% 30%) 100%)'
        }}
      />
      
      {/* Overlay with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2">
              <span className="text-2xl">🔥</span>
              <span className="text-white font-semibold">Nouvelle Collection 2025</span>
            </div>
          </div>

          {/* Title with gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center mb-6 animate-fade-in" 
              style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {heroTitle}
            </span>
          </h1>

          {/* Subtitle with icons */}
          <div className="flex flex-col items-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 text-center max-w-2xl">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/80 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Livraison 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Retour gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 h-auto shadow-glow hover:scale-105 transition-transform"
              onClick={handleButtonClick}
            >
              {heroButtonText}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 h-auto backdrop-blur-sm bg-white/10"
              onClick={() => {
                const element = document.querySelector('#categories');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Voir les Catégories
            </Button>
          </div>

          {/* Stats - Real-time feel */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/90 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">2,500+</div>
              <div className="text-sm md:text-base text-white/70">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">5,000+</div>
              <div className="text-sm md:text-base text-white/70">Commandes livrées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-sm md:text-base text-white/70">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;
