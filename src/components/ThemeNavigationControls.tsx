import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Theme } from '@/types/themes';

interface ThemeNavigationControlsProps {
  currentIndex: number;
  totalThemes: number;
  onPrevious: () => void;
  onNext: () => void;
  themes: Theme[];
}

const ThemeNavigationControls = ({
  currentIndex,
  totalThemes,
  onPrevious,
  onNext,
  themes
}: ThemeNavigationControlsProps) => {
  const currentTheme = themes[currentIndex];
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Moderne': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Sophistiqué': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Épuré': return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      case 'Audacieux': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left: Previous Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="group hover:bg-accent transition-smooth"
      >
        <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Précédent
      </Button>

      {/* Center: Theme Info */}
      <div className="flex items-center gap-3">
        <Badge 
          variant="outline" 
          className={`${getCategoryColor(currentTheme.category)} animate-fade-in`}
        >
          {currentTheme.category}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {totalThemes}
        </span>
      </div>

      {/* Right: Next Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={currentIndex === totalThemes - 1}
        className="group hover:bg-accent transition-smooth"
      >
        Suivant
        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default ThemeNavigationControls;
