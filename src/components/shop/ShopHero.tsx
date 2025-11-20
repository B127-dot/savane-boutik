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
    <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: heroImage 
            ? `url(${heroImage})` 
            : 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {heroSubtitle}
        </p>
        <Button 
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 shadow-glow"
          onClick={handleButtonClick}
        >
          {heroButtonText}
        </Button>
      </div>
    </section>
  );
};

export default ShopHero;
