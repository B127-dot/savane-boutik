import { Button } from '@/components/ui/button';

interface ElegantHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
}

const ElegantHero = ({ 
  heroImage, 
  heroTitle = "Bienvenue dans notre boutique",
  heroSubtitle = "Découvrez nos produits de qualité",
  heroButtonText = "Voir la Collection",
  heroButtonLink = "#products"
}: ElegantHeroProps) => {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-foreground">
            {heroTitle}
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            {heroSubtitle}
          </p>
          <div className="pt-4">
            <Button size="lg" variant="outline" className="text-lg">
              {heroButtonText}
            </Button>
          </div>
          <div className="pt-8 text-sm text-muted-foreground">
            Thème "Élégant" - Bientôt disponible
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElegantHero;
