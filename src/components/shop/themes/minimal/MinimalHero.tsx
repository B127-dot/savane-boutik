import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface MinimalHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
}

const MinimalHero = ({ 
  heroImage, 
  heroTitle = "Simplicité & Élégance",
  heroSubtitle = "Découvrez notre sélection soigneusement choisie",
  heroButtonText = "Explorer",
  heroButtonLink = "#products"
}: MinimalHeroProps) => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-white">
      {/* Image de fond avec opacité très basse */}
      {heroImage && (
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-5"
          />
        </div>
      )}

      {/* Contenu principal */}
      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-4xl space-y-12 animate-fade-in">
          {/* Badge minimaliste */}
          <div className="inline-flex items-center gap-3 pb-8">
            <div className="w-12 h-px bg-black" />
            <span className="text-xs font-inter font-medium text-black tracking-[0.2em] uppercase">
              Nouvelle Collection
            </span>
          </div>

          {/* Titre principal épuré */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-inter font-light text-black leading-[1.1] tracking-tight">
            {heroTitle}
          </h1>

          {/* Sous-titre avec espacement généreux */}
          <p className="text-xl md:text-2xl font-inter font-light text-neutral-600 max-w-2xl leading-relaxed">
            {heroSubtitle}
          </p>

          {/* CTA minimaliste */}
          <div className="pt-8 flex flex-col sm:flex-row items-start gap-6">
            <Button 
              size="lg" 
              className="group bg-black hover:bg-neutral-800 text-white px-10 py-7 text-base font-inter font-medium tracking-wide rounded-none transition-all duration-300 border-2 border-black"
              onClick={() => window.location.href = heroButtonLink}
            >
              {heroButtonText}
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              className="px-10 py-7 text-base font-inter font-medium text-black hover:bg-neutral-50 rounded-none border-b-2 border-transparent hover:border-black transition-all duration-300"
            >
              Voir tout
            </Button>
          </div>

          {/* Stats minimalistes */}
          <div className="pt-16 flex flex-wrap gap-16">
            <div className="space-y-2">
              <div className="text-sm font-inter font-medium text-neutral-400 tracking-widest uppercase">
                Produits
              </div>
              <div className="text-4xl font-inter font-light text-black">500+</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-inter font-medium text-neutral-400 tracking-widest uppercase">
                Clients
              </div>
              <div className="text-4xl font-inter font-light text-black">2000+</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-inter font-medium text-neutral-400 tracking-widest uppercase">
                Satisfaction
              </div>
              <div className="text-4xl font-inter font-light text-black">98%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll minimaliste */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-xs font-inter text-neutral-400 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-neutral-300" />
      </div>
    </section>
  );
};

export default MinimalHero;
