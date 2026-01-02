import { useEffect, useState } from 'react';
import { ChevronDown, Sparkles, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoirLuxeHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
}

const NoirLuxeHero = ({
  heroImage,
  heroTitle = 'L\'Excellence au Service du Style',
  heroSubtitle = 'Découvrez une collection exclusive où chaque pièce raconte une histoire de raffinement et d\'élégance intemporelle.',
  heroButtonText = 'Explorer la Collection',
  heroButtonLink = '#produits'
}: NoirLuxeHeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleButtonClick = () => {
    if (heroButtonLink?.startsWith('#')) {
      const element = document.querySelector(heroButtonLink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (heroButtonLink) {
      window.location.href = heroButtonLink;
    }
  };

  const scrollToProducts = () => {
    const element = document.querySelector('#produits');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noir">
      {/* Background Image with Overlay */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-noir via-transparent to-noir" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-noir/80 via-transparent to-noir/80" />
      
      {/* Radial Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-5">
        <div className="absolute inset-0 bg-gradient-gold-radial opacity-30" />
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-[1px] h-32 bg-gradient-to-b from-transparent via-gold to-transparent opacity-40" />
      <div className="absolute top-0 right-1/4 w-[1px] h-48 bg-gradient-to-b from-transparent via-gold to-transparent opacity-30" />
      <div className="absolute bottom-32 left-16 w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
      <div className="absolute bottom-48 right-16 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        {/* Crown Badge */}
        <div 
          className={`inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-gold/40 bg-noir-light/50 backdrop-blur-sm opacity-0 ${
            isLoaded ? 'animate-noir-reveal noir-delay-100' : ''
          }`}
        >
          <Crown className="w-4 h-4 text-gold" />
          <span className="font-inter text-sm tracking-widest uppercase text-gold">
            Collection Exclusive
          </span>
          <Crown className="w-4 h-4 text-gold" />
        </div>

        {/* Main Title */}
        <h1 
          className={`font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight opacity-0 ${
            isLoaded ? 'animate-noir-reveal noir-delay-200' : ''
          }`}
        >
          <span className="block text-white mb-2">
            {heroTitle.split(' ').slice(0, Math.ceil(heroTitle.split(' ').length / 2)).join(' ')}
          </span>
          <span className="animate-gold-shimmer">
            {heroTitle.split(' ').slice(Math.ceil(heroTitle.split(' ').length / 2)).join(' ')}
          </span>
        </h1>

        {/* Decorative Line */}
        <div 
          className={`flex items-center justify-center gap-4 mb-8 opacity-0 ${
            isLoaded ? 'animate-noir-reveal noir-delay-300' : ''
          }`}
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold" />
          <Sparkles className="w-5 h-5 text-gold" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Subtitle */}
        <p 
          className={`font-inter text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 ${
            isLoaded ? 'animate-noir-reveal noir-delay-400' : ''
          }`}
        >
          {heroSubtitle}
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 ${
            isLoaded ? 'animate-noir-reveal noir-delay-500' : ''
          }`}
        >
          {/* Primary Button */}
          <Button
            onClick={handleButtonClick}
            className="group relative px-10 py-6 text-lg font-inter font-semibold tracking-wide bg-gold hover:bg-gold-light text-noir rounded-none border-0 overflow-hidden transition-all duration-300 hover:shadow-gold-glow"
          >
            <span className="relative z-10">{heroButtonText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          {/* Secondary Button */}
          <Button
            variant="ghost"
            onClick={scrollToProducts}
            className="px-10 py-6 text-lg font-inter tracking-wide text-gold border border-gold/50 rounded-none hover:bg-gold/10 hover:border-gold transition-all duration-300"
          >
            Voir Tous les Produits
          </Button>
        </div>

        {/* Stats Section */}
        <div 
          className={`flex flex-wrap justify-center gap-8 md:gap-16 mt-20 opacity-0 ${
            isLoaded ? 'animate-noir-reveal noir-delay-600' : ''
          }`}
        >
          {[
            { value: '200+', label: 'Produits Premium' },
            { value: '5000+', label: 'Clients Satisfaits' },
            { value: '4.9', label: 'Note Moyenne', icon: Star }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex items-center justify-center gap-1">
                <span className="font-cinzel text-3xl md:text-4xl font-bold text-gold group-hover:animate-gold-shimmer transition-all duration-300">
                  {stat.value}
                </span>
                {stat.icon && <Star className="w-5 h-5 text-gold fill-gold" />}
              </div>
              <p className="font-inter text-sm text-white/50 mt-2 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 ${
          isLoaded ? 'animate-noir-reveal noir-delay-800' : ''
        }`}
      >
        <button 
          onClick={scrollToProducts}
          className="flex flex-col items-center gap-2 text-gold/60 hover:text-gold transition-colors duration-300 group"
        >
          <span className="font-inter text-xs tracking-widest uppercase">Défiler</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-20 left-8 w-16 h-16 border-l border-t border-gold/20" />
      <div className="absolute top-20 right-8 w-16 h-16 border-r border-t border-gold/20" />
      <div className="absolute bottom-20 left-8 w-16 h-16 border-l border-b border-gold/20" />
      <div className="absolute bottom-20 right-8 w-16 h-16 border-r border-b border-gold/20" />
    </section>
  );
};

export default NoirLuxeHero;
