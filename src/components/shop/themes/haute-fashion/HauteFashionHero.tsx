import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HauteFashionHeroProps {
  heroImage?: string;
  heroVideo?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
}

const CountUpStat: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ 
  end, suffix = '', duration = 2000 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(end * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const HauteFashionHero: React.FC<HauteFashionHeroProps> = ({
  heroImage = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80',
  heroVideo,
  heroTitle,
  heroSubtitle = 'Découvrez notre collection exclusive de vêtements streetwear. Style urbain, qualité premium.',
  heroButtonText = 'Explorer la collection',
  heroButtonLink = '#products'
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current?.getBoundingClientRect().bottom > 0) setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    setIsLoaded(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleButtonClick = (link: string) => {
    if (link.startsWith('#')) document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
    else if (link.startsWith('/')) navigate(link);
    else window.location.href = link;
  };

  const parallaxY = scrollY * 0.5;
  const scale = 1 + scrollY * 0.0003;
  const blur = Math.min(scrollY * 0.02, 10);
  const contentOpacity = Math.max(1 - scrollY * 0.002, 0);

  const stats = [
    { value: 500, suffix: '+', label: 'Produits exclusifs' },
    { value: 50, suffix: 'K', label: 'Clients satisfaits' },
    { value: 24, suffix: 'H', label: 'Livraison express' },
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(0,0%,4%)]">
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${parallaxY}px) scale(${scale})`, filter: `blur(${blur}px)` }}>
        {heroVideo ? (
          <video autoPlay muted loop playsInline className="w-full h-full object-cover"><source src={heroVideo} type="video/mp4" /></video>
        ) : (
          <img src={heroImage} alt="Hero background" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0,0%,4%)]/95 via-[hsl(0,0%,4%)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%)] via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-32 pb-20" style={{ opacity: contentOpacity }}>
        <div className="max-w-3xl">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(24,100%,50%)]/30 bg-[hsl(24,100%,50%)]/10 mb-8 ${isLoaded ? 'animate-haute-fade-in' : 'opacity-0'}`}>
            <div className="w-2 h-2 rounded-full bg-[hsl(24,100%,50%)] animate-pulse" />
            <span className="text-sm text-[hsl(24,100%,50%)] font-medium">Nouvelle Collection 2025</span>
          </div>

          <h1 className="mb-6">
            <span className={`block text-5xl sm:text-6xl lg:text-7xl font-light italic text-white mb-2 ${isLoaded ? 'animate-haute-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              {heroTitle?.split(' ')[0] || 'DÉFINISSEZ'}
            </span>
            <span className={`block text-5xl sm:text-6xl lg:text-7xl font-bold ${isLoaded ? 'animate-haute-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <span className="text-white">{heroTitle?.split(' ')[1] || 'VOTRE'} </span>
              <span className="text-gradient-haute">{heroTitle?.split(' ')[2] || 'STYLE'}</span>
            </span>
          </h1>

          <p className={`text-lg text-[hsl(0,0%,60%)] max-w-xl mb-10 leading-relaxed ${isLoaded ? 'animate-haute-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>{heroSubtitle}</p>

          <div className={`flex flex-wrap gap-4 mb-16 ${isLoaded ? 'animate-haute-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <Button variant="cta" size="xl" onClick={() => handleButtonClick(heroButtonLink)} className="group">
              {heroButtonText}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="cta-outline" size="xl" onClick={() => handleButtonClick('#lookbook')} className="group">
              <Play className="w-4 h-4" />
              Voir le lookbook
            </Button>
          </div>

          <div className={`grid grid-cols-3 gap-8 max-w-md ${isLoaded ? 'animate-haute-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-gradient-haute"><CountUpStat end={stat.value} suffix={stat.suffix} /></div>
                <div className="text-xs sm:text-sm text-[hsl(0,0%,50%)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 ${isLoaded ? 'animate-haute-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s', opacity: contentOpacity }}>
        <span className="text-xs uppercase tracking-[0.3em] text-[hsl(0,0%,50%)]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[hsl(24,100%,50%)] to-transparent animate-haute-pulse-line" />
      </div>

      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[hsl(24,100%,50%)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-[hsl(24,100%,50%)]/3 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default HauteFashionHero;
