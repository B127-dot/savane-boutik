import { useEffect, useRef, useState } from 'react';

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      // Start when section enters viewport, complete when section is centered
      const start = windowHeight;
      const end = windowHeight / 2;
      const current = rect.top;
      
      let progress = 0;
      if (current <= start && current >= end) {
        progress = (start - current) / (start - end);
      } else if (current < end) {
        progress = 1;
      }
      
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Calculate transforms based on scroll progress
  const rotateX = 45 - (scrollProgress * 45); // From 45deg to 0deg
  const scale = 0.75 + (scrollProgress * 0.25); // From 0.75 to 1
  const translateY = scrollProgress * 0; // Keep at 0
  const opacity = 0.3 + (scrollProgress * 0.7); // From 0.3 to 1

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-background overflow-hidden"
      style={{
        perspective: '2000px',
        perspectiveOrigin: 'center top',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Découvrez BurkinaShop en action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Voyez comment notre plateforme transforme la façon dont les vendeurs burkinabè 
              gèrent leur commerce en ligne
            </p>
          </div>

          {/* Video Container with 3D Effect */}
          <div
            className="relative w-full transition-all duration-700 ease-out"
            style={{
              transform: `
                rotateX(${rotateX}deg)
                scale(${scale})
                translateY(${translateY}px)
              `,
              transformStyle: 'preserve-3d',
              opacity: opacity,
            }}
          >
            {/* Shadow/Reflection Effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent blur-3xl -z-10"
              style={{
                transform: 'translateZ(-50px)',
                opacity: scrollProgress * 0.5,
              }}
            />

            {/* Video Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary rounded-tl-2xl -z-10" />
              <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-primary rounded-tr-2xl -z-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-primary rounded-bl-2xl -z-10" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-primary rounded-br-2xl -z-10" />

              {/* Video */}
              <div className="relative aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/qC1xfIx-8aY?autoplay=1&mute=1&loop=1&playlist=qC1xfIx-8aY&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3"
                  title="BurkinaShop - Présentation de la plateforme"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>

              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
            </div>

            {/* Floating elements for depth */}
            <div 
              className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
              style={{
                transform: `translateZ(${scrollProgress * 30}px)`,
                opacity: scrollProgress * 0.6,
              }}
            />
            <div 
              className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
              style={{
                transform: `translateZ(${scrollProgress * 40}px)`,
                opacity: scrollProgress * 0.6,
              }}
            />
          </div>

          {/* Stats below video */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Vendeurs actifs</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Produits en ligne</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction client</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
