import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ElegantHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
}

const ElegantHero = ({ 
  heroImage, 
  heroTitle = "Collection Raffinée",
  heroSubtitle = "L'excellence à votre portée",
  heroButtonText = "Découvrir",
  heroButtonLink = "#products"
}: ElegantHeroProps) => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">
      {/* Image de fond avec overlay élégant */}
      {heroImage && (
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/5 via-transparent to-stone-50/80" />
        </div>
      )}

      {/* Motif décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 border border-amber-600 rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-amber-600 rounded-full" />
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge élégant */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-100/80 backdrop-blur-sm border border-amber-200">
            <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-sm font-cormorant font-medium text-amber-900 tracking-wide">
              Nouvelle Collection
            </span>
          </div>

          {/* Titre principal avec typographie sophistiquée */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-playfair font-bold text-stone-900 leading-[0.95] tracking-tight">
            {heroTitle}
          </h1>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600" />
            <div className="w-2 h-2 rounded-full bg-amber-600" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600" />
          </div>

          {/* Sous-titre élégant */}
          <p className="text-xl md:text-2xl font-cormorant font-light text-stone-700 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>

          {/* Bouton CTA premium */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="group bg-stone-900 hover:bg-stone-800 text-white px-8 py-6 text-lg font-cormorant font-medium rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => window.location.href = heroButtonLink}
            >
              {heroButtonText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg font-cormorant font-medium border-2 border-stone-300 text-stone-800 hover:bg-stone-50 rounded-sm transition-all duration-300"
            >
              En savoir plus
            </Button>
          </div>

          {/* Stats élégantes */}
          <div className="pt-12 flex flex-wrap justify-center gap-12 text-center">
            <div className="space-y-1">
              <div className="text-3xl font-playfair font-bold text-stone-900">500+</div>
              <div className="text-sm font-cormorant text-stone-600 tracking-wide">Clients Satisfaits</div>
            </div>
            <div className="h-12 w-px bg-amber-300" />
            <div className="space-y-1">
              <div className="text-3xl font-playfair font-bold text-stone-900">100%</div>
              <div className="text-sm font-cormorant text-stone-600 tracking-wide">Qualité Garantie</div>
            </div>
            <div className="h-12 w-px bg-amber-300" />
            <div className="space-y-1">
              <div className="text-3xl font-playfair font-bold text-stone-900">24/7</div>
              <div className="text-sm font-cormorant text-stone-600 tracking-wide">Service Client</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default ElegantHero;
