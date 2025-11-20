import { useEffect, useState } from 'react';

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('how-it-works-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on scroll position
      const scrolled = Math.max(0, windowHeight - rect.top);
      const total = sectionHeight + windowHeight;
      const percent = Math.min(100, Math.max(0, (scrolled / total) * 100));
      
      setProgress(percent);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mt-12 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progression</span>
        <span className="font-medium text-primary">{Math.round(progress)}%</span>
      </div>
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-300 ease-out shadow-glow"
          style={{ width: `${progress}%` }}
        />
        {/* Shimmer effect */}
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
