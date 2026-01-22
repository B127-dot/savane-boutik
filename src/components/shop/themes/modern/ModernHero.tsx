import { Button } from '@/components/ui/button';
import { Sparkles, Flame, Star, Zap, Gift, TrendingUp, ChevronDown } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { useEffect, useState, useRef } from 'react';

// Badge icon mapping
const BADGE_ICONS = {
  sparkles: Sparkles,
  flame: Flame,
  star: Star,
  zap: Zap,
  gift: Gift,
  trending: TrendingUp,
  none: null,
};

// Default stats
const DEFAULT_STATS = [
  { id: 'products', value: '500', suffix: '+', label: 'Produits' },
  { id: 'clients', value: '1000', suffix: '+', label: 'Clients' },
  { id: 'rating', value: '4.9', suffix: '★', label: 'Note moyenne' },
];

// Default features
const DEFAULT_FEATURES = [
  { text: 'Livraison 24h' },
  { text: 'Retour gratuit' },
  { text: 'Paiement sécurisé' },
];

interface HeroStat {
  id: string;
  value: string;
  suffix?: string;
  label: string;
}

interface HeroFeature {
  text: string;
}

interface ModernHeroProps {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  buttonStyle?: 'rounded' | 'pill' | 'square';
  // New premium props
  badgeText?: string;
  badgeIcon?: keyof typeof BADGE_ICONS;
  showBadge?: boolean;
  showStats?: boolean;
  stats?: HeroStat[];
  features?: HeroFeature[];
  showFeatures?: boolean;
  showScrollIndicator?: boolean;
}

// Animated Stat Counter Component
const AnimatedStat = ({ value, suffix = '', label }: { value: string; suffix?: string; label: string }) => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const hasDecimals = value.includes('.');
  
  const count = useCountUp({ 
    end: numericValue, 
    duration: 2000,
    decimals: hasDecimals ? 1 : 0
  });

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="font-body text-white/70 text-sm">{label}</div>
    </div>
  );
};

const ModernHero = ({ 
  heroImage, 
  heroTitle = "Bienvenue dans notre boutique",
  heroSubtitle = "Découvrez nos produits de qualité",
  heroButtonText = "Voir la Collection",
  heroButtonLink = "#products",
  buttonStyle = 'rounded',
  // New premium props with defaults
  badgeText = "Nouvelle Collection",
  badgeIcon = 'sparkles',
  showBadge = true,
  showStats = true,
  stats = DEFAULT_STATS,
  features = DEFAULT_FEATURES,
  showFeatures = true,
  showScrollIndicator = true,
}: ModernHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleButtonClick = () => {
    if (heroButtonLink?.startsWith('#')) {
      const element = document.querySelector(heroButtonLink);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = heroButtonLink || '#products';
    }
  };

  const handleScrollClick = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get button radius class based on style
  const getButtonRadius = () => {
    switch(buttonStyle) {
      case 'pill': return 'rounded-full';
      case 'square': return 'rounded-none';
      default: return 'rounded-lg';
    }
  };

  // Get the badge icon component
  const BadgeIcon = badgeIcon !== 'none' ? BADGE_ICONS[badgeIcon] : null;

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{
          backgroundImage: heroImage 
            ? `url(${heroImage})` 
            : 'linear-gradient(135deg, var(--shop-primary, hsl(var(--primary))) 0%, var(--shop-secondary, hsl(142 76% 30%)) 100%)',
          transform: isVisible ? 'scale(1)' : 'scale(1.1)',
        }}
      />
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      
      {/* Animated dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          {showBadge && (
            <div 
              className={`flex justify-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div 
                className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-2"
                style={{ 
                  backgroundColor: 'color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 20%, transparent)',
                  borderColor: 'color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 30%, transparent)'
                }}
              >
                {BadgeIcon && (
                  <BadgeIcon 
                    className="w-5 h-5 text-white animate-pulse" 
                    style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }}
                  />
                )}
                <span className="text-white font-display font-semibold">{badgeText}</span>
              </div>
            </div>
          )}

          {/* Title with gradient */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-7xl font-display font-bold text-center mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {heroTitle}
            </span>
          </h1>

          {/* Subtitle with features */}
          <div 
            className={`flex flex-col items-center gap-4 mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <p className="text-lg md:text-xl lg:text-2xl font-body text-white/90 text-center max-w-2xl">
              {heroSubtitle}
            </p>
            
            {showFeatures && features.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/80 text-sm md:text-base font-body">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
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

          {/* Stats with animated counters */}
          {showStats && stats.length > 0 && (
            <div 
              className={`grid grid-cols-3 gap-6 mt-16 transition-all duration-700 delay-[400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {stats.map((stat) => (
                <AnimatedStat 
                  key={stat.id}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <button
          onClick={handleScrollClick}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-all duration-700 delay-500 cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </button>
      )}
    </section>
  );
};

export default ModernHero;
