import { LayoutGrid, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ViewModeToggleProps {
  mode: 'grid' | 'feed';
  onChange: (mode: 'grid' | 'feed') => void;
  className?: string;
}

const ViewModeToggle = ({ mode, onChange, className }: ViewModeToggleProps) => {
  return (
    <div className={cn("flex bg-muted rounded-lg p-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('feed')}
        className={cn(
          "h-9 w-9 p-0 rounded-md transition-all duration-200",
          mode === 'feed' 
            ? "bg-background shadow-sm text-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Mode liste"
      >
        <LayoutList className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange('grid')}
        className={cn(
          "h-9 w-9 p-0 rounded-md transition-all duration-200",
          mode === 'grid' 
            ? "bg-background shadow-sm text-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Mode grille"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewModeToggle;
