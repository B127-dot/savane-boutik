import { Button } from '@/components/ui/button';

interface ModernHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  buttonStyle?: 'rounded' | 'pill' | 'square';
}

const ModernHero = ({ 
  heroImage, 
  heroTitle = "Bienvenue dans notre boutique",
  heroSubtitle = "Découvrez nos produits de qualité",
  heroButtonText = "Voir la Collection",
  heroButtonLink = "#products",
  buttonStyle = 'rounded'
}: ModernHeroProps) => {
  const handleButtonClick = () => {
    if (heroButtonLink?.startsWith('#')) {
      const element = document.querySelector(heroButtonLink);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = heroButtonLink || '#products';
    }
  };

  // Get button radius class based on style
  const getButtonRadius = () => {
    switch(buttonStyle) {
      case 'pill': return 'rounded-full';
      case 'square': return 'rounded-none';
      default: return 'rounded-lg';
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
            : 'linear-gradient(135deg, var(--shop-primary, hsl(var(--primary))) 0%, var(--shop-secondary, hsl(142 76% 30%)) 100%)'
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
            <div 
              className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-2"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 20%, transparent)',
                borderColor: 'color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 30%, transparent)'
              }}
            >
              <span className="text-2xl">🔥</span>
              <span className="text-white font-display font-semibold">Nouvelle Collection 2025</span>
            </div>
          </div>

          {/* Title with gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-center mb-6 animate-fade-in" 
              style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {heroTitle}
            </span>
          </h1>

          {/* Subtitle with icons */}
          <div className="flex flex-col items-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg md:text-xl lg:text-2xl font-body text-white/90 text-center max-w-2xl">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/80 text-sm md:text-base font-body">
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                >
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Livraison 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                >
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Retour gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                >
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
              onClick={handleButtonClick}
              className={`text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 ${getButtonRadius()}`}
              style={{ 
                backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
                color: 'white'
              }}
            >
              {heroButtonText}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById('categories');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm ${getButtonRadius()}`}
            >
              Nos Catégories
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">500+</div>
              <div className="font-body text-white/70 text-sm">Produits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">1000+</div>
              <div className="font-body text-white/70 text-sm">Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">4.9★</div>
              <div className="font-body text-white/70 text-sm">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
