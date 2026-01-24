import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Eye, Lock } from 'lucide-react';
import { getAvailableThemes, Theme } from '@/types/themes';
import { useToast } from '@/hooks/use-toast';
import ThemePreviewModal from './ThemePreviewModal';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  const { toast } = useToast();
  const { shopSettings } = useApp();
  const themes = getAvailableThemes();
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (e: React.MouseEvent, theme: Theme) => {
    e.stopPropagation();
    
    if (!theme.isAvailable) {
      toast({
        title: "Thème non disponible",
        description: "Ce thème sera bientôt disponible. Restez connecté !",
        variant: "destructive"
      });
      return;
    }
    
    if (!shopSettings) {
      toast({
        title: "Paramètres en cours de chargement",
        description: "Veuillez patienter quelques instants.",
        variant: "destructive"
      });
      return;
    }
    
    setPreviewTheme(theme);
    setIsPreviewOpen(true);
  };

  const handleApplyTheme = (theme: Theme) => {
    if (!theme.isAvailable) {
      toast({
        title: "Thème non disponible",
        description: "Ce thème sera bientôt disponible. Restez connecté !",
        variant: "destructive"
      });
      return;
    }

    onThemeChange(theme.id);
    
    toast({
      title: "Thème appliqué !",
      description: `Le thème "${theme.name}" a été activé pour votre boutique.`,
    });
  };

  // Sort themes: available first, then by new status
  const sortedThemes = [...themes].sort((a, b) => {
    if (a.isAvailable !== b.isAvailable) return a.isAvailable ? -1 : 1;
    if (a.isNew !== b.isNew) return a.isNew ? -1 : 1;
    return 0;
  });

  return (
    <div className="space-y-2">
      {sortedThemes.map((theme, index) => {
        const isActive = theme.id === currentTheme;

        return (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => theme.isAvailable && handleApplyTheme(theme)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
              "border",
              isActive 
                ? "bg-primary/5 border-primary/40 shadow-[0_0_12px_-3px_hsl(var(--primary)/0.3)]" 
                : "border-transparent hover:bg-muted/50 hover:border-border",
              !theme.isAvailable && "opacity-60 cursor-not-allowed"
            )}
          >
            {/* Preview Image - Square 1:1 */}
            <div className={cn(
              "w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative",
              "ring-2 transition-all duration-200",
              isActive ? "ring-primary" : "ring-border"
            )}>
              <img 
                src={theme.preview} 
                alt={`Aperçu ${theme.name}`}
                className="w-full h-full object-cover object-top"
              />
              
              {/* Lock overlay for unavailable */}
              {!theme.isAvailable && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <Lock className="h-5 w-5 text-white/80" />
                </div>
              )}
              
              {/* Subtle gradient overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            {/* Theme Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-semibold text-sm truncate",
                  isActive && "text-primary"
                )}>
                  {theme.name}
                </span>
                
                {theme.isNew && (
                  <Badge 
                    variant="secondary" 
                    className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-0 font-medium"
                  >
                    NOUVEAU
                  </Badge>
                )}
                
                {!theme.isAvailable && (
                  <Badge 
                    variant="secondary" 
                    className="text-[10px] px-1.5 py-0 h-4 font-medium"
                  >
                    Bientôt
                  </Badge>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {theme.description.slice(0, 60)}...
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </motion.div>
              )}
              
              {theme.isAvailable && !isActive && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary/10"
                  onClick={(e) => handlePreview(e, theme)}
                  title="Prévisualiser"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Preview Modal */}
      {previewTheme && (
        <ThemePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onApply={() => handleApplyTheme(previewTheme)}
          themeId={previewTheme.id}
          themeName={previewTheme.name}
          shopUrl={shopSettings?.shopUrl ?? 'ma-boutique'}
        />
      )}
    </div>
  );
};

export default ThemeSelector;
