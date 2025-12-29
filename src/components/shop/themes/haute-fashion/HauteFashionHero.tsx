import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HauteFashionHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
}

const HauteFashionHero = ({
  heroImage,
  heroTitle = "HAUTE COUTURE",
  heroSubtitle = "Découvrez la nouvelle collection streetwear premium qui redéfinit les codes de la mode urbaine",
  heroButtonText = "DÉCOUVRIR LA COLLECTION",
  heroButtonLink = "#products"
}: HauteFashionHeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    setIsLoaded(true);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleButtonClick = () => {
    if (heroButtonLink?.startsWith('#')) {
      const element = document.querySelector(heroButtonLink);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (heroButtonLink) {
      window.location.href = heroButtonLink;
    }
  };

  // Parallax calculations
  const parallaxY = scrollY * 0.5;
  const scale = 1 + scrollY * 0.0005;
  const blur = Math.min(scrollY * 0.02, 10);
  const opacity = Math.max(1 - scrollY * 0.002, 0);

  const defaultImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80";

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden haute-fashion-theme"
      style={{ backgroundColor: 'hsl(0 0% 4%)' }}
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-100"
        style={{ 
          transform: `translateY(${parallaxY}px) scale(${scale})`,
          filter: `blur(${blur}px)`
        }}
      >
        <img
          src={heroImage || defaultImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title with staggered animation */}
          <h1 
            className={`font-bebas text-6xl md:text-8xl lg:text-9xl tracking-wider text-white transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {heroTitle}
          </h1>
          
          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-inter transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {heroSubtitle}
          </p>
          
          {/* CTA Button */}
          <div 
            className={`transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button
              onClick={handleButtonClick}
              size="lg"
              className="px-8 py-6 text-base font-semibold tracking-wider rounded-full bg-gradient-to-b from-[hsl(24,100%,50%)] to-[hsl(24,100%,40%)] text-white shadow-[0_0_0_1px_hsl(24,100%,50%),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-glow-haute transition-all duration-300 hover:scale-105"
            >
              {heroButtonText}
            </Button>
          </div>

          {/* Stats */}
          <div 
            className={`flex items-center justify-center gap-12 mt-16 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            {[
              { value: '500+', label: 'Produits' },
              { value: '50K+', label: 'Clients' },
              { value: '4.9', label: 'Note' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-bebas text-4xl md:text-5xl text-gradient-haute">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 font-inter uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="flex flex-col items-center gap-2 text-white/60 animate-float">
          <span className="text-xs font-inter uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[hsl(24,100%,50%)] rounded-full blur-[150px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[hsl(142,70%,45%)] rounded-full blur-[200px] opacity-10 translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default HauteFashionHero;
