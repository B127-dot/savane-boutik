import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Check, Info } from 'lucide-react';
import { Theme } from '@/types/themes';
import DevicePreviewFrame from './DevicePreviewFrame';
import ThemeInfoPanel from './ThemeInfoPanel';
import ThemeNavigationControls from './ThemeNavigationControls';

interface ThemePreviewModalEnhancedProps {
  isOpen: boolean;
  onClose: () => void;
  themes: Theme[];
  themeId: string;
  themeName: string;
  currentThemeId: string;
  shopUrl: string;
  onApply: (theme: Theme) => void;
}

const ThemePreviewModalEnhanced = ({
  isOpen,
  onClose,
  themes,
  themeId,
  currentThemeId,
  shopUrl,
  onApply
}: ThemePreviewModalEnhancedProps) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Find current theme index
  useEffect(() => {
    const index = themes.findIndex(t => t.id === themeId);
    if (index !== -1) {
      setCurrentThemeIndex(index);
    }
  }, [themeId, themes]);

  const currentTheme = themes[currentThemeIndex];
  const previewUrl = `/shop/${shopUrl}?previewTheme=${currentTheme?.id}`;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentThemeIndex > 0) {
            handlePrevious();
          }
          break;
        case 'ArrowRight':
          if (currentThemeIndex < themes.length - 1) {
            handleNext();
          }
          break;
        case 'Enter':
          if (e.ctrlKey || e.metaKey) {
            handleApply();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentThemeIndex, themes.length, onClose]);

  const handlePrevious = useCallback(() => {
    if (currentThemeIndex > 0) {
      setIsLoading(true);
      setCurrentThemeIndex(prev => prev - 1);
    }
  }, [currentThemeIndex]);

  const handleNext = useCallback(() => {
    if (currentThemeIndex < themes.length - 1) {
      setIsLoading(true);
      setCurrentThemeIndex(prev => prev + 1);
    }
  }, [currentThemeIndex, themes.length]);

  const handleApply = () => {
    onApply(currentTheme);
    onClose();
  };

  if (!currentTheme) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 gap-0 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/98 backdrop-blur-sm border-b border-border px-6 py-4 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {currentTheme.name}
                {currentTheme.id === currentThemeId && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full animate-pulse">
                    Thème actuel
                  </span>
                )}
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentTheme.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInfoPanel(!showInfoPanel)}
                className="gap-2"
              >
                <Info className="h-4 w-4" />
                {showInfoPanel ? 'Masquer' : 'Détails'}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ThemeNavigationControls
            currentIndex={currentThemeIndex}
            totalThemes={themes.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            themes={themes}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <DevicePreviewFrame
            iframeUrl={previewUrl}
            isLoading={isLoading}
            onLoadComplete={() => setIsLoading(false)}
          />

          <ThemeInfoPanel
            theme={currentTheme}
            isOpen={showInfoPanel}
            onToggle={() => setShowInfoPanel(!showInfoPanel)}
          />
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-50 bg-background/98 backdrop-blur-sm border-t border-border px-6 py-4 animate-fade-in">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Vos produits et données restent intacts lors du changement de thème
            </p>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button
                onClick={handleApply}
                className="gap-2 shadow-glow"
                disabled={currentTheme.id === currentThemeId}
              >
                <Check className="h-4 w-4" />
                {currentTheme.id === currentThemeId ? 'Thème actuel' : 'Appliquer ce thème'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemePreviewModalEnhanced;
