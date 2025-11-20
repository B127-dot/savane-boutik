import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

interface CreativeHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  heroImage?: string;
}

export const CreativeHero = ({
  title = "Libérez Votre Créativité",
  subtitle = "Découvrez notre collection unique d'art et de créations originales",
  ctaText = "Explorer",
  heroImage = "/hero-ecommerce.jpg"
}: CreativeHeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FF1B8D] via-[#9D4EDD] to-[#FF6B35]">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 -left-20 w-72 h-72 bg-[#00F5FF] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-[#FF6B35] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-[#9D4EDD] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="creative-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#creative-dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Badge */}
          <Badge className="mb-6 bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30 px-6 py-2 text-sm font-fredoka animate-bounce">
            <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
            Nouveau • Collection Exclusive
          </Badge>

          {/* Title with Creative Typography */}
          <h1 className="text-6xl md:text-8xl font-righteous text-white mb-6 animate-fade-in leading-tight">
            <span className="inline-block animate-bounce animation-delay-100">{title.split(' ')[0]}</span>{' '}
            <span className="inline-block animate-bounce animation-delay-200 text-[#00F5FF] drop-shadow-[0_0_20px_rgba(0,245,255,0.5)]">
              {title.split(' ')[1]}
            </span>{' '}
            <span className="inline-block animate-bounce animation-delay-300">{title.split(' ').slice(2).join(' ')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-fredoka font-medium max-w-3xl mx-auto animate-fade-in animation-delay-400">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-600">
            <Button 
              size="lg"
              className="bg-white text-[#FF1B8D] hover:bg-white/90 font-fredoka font-bold text-lg px-8 py-6 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#9D4EDD] font-fredoka font-bold text-lg px-8 py-6 rounded-full backdrop-blur-md shadow-2xl hover:scale-110 transition-all duration-300"
            >
              <Zap className="mr-2 h-5 w-5" />
              En savoir plus
            </Button>
          </div>

          {/* Floating Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in animation-delay-800">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-righteous text-white mb-2">500+</div>
              <div className="text-sm text-white/80 font-fredoka">Créations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-righteous text-white mb-2">50+</div>
              <div className="text-sm text-white/80 font-fredoka">Artistes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-righteous text-white mb-2">100%</div>
              <div className="text-sm text-white/80 font-fredoka">Original</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};
