import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';

interface ThemePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  themeId: string;
  themeName: string;
  shopUrl: string;
}

const ThemePreviewModal = ({ 
  isOpen, 
  onClose, 
  onApply, 
  themeId, 
  themeName,
  shopUrl 
}: ThemePreviewModalProps) => {
  const previewUrl = `/shop/${shopUrl}?previewTheme=${themeId}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full h-screen w-screen p-0 gap-0">
        {/* Header with controls */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur-sm border-b">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Aperçu : {themeName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Prévisualisation du thème avant application
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Annuler
            </Button>
            <Button
              onClick={() => {
                onApply();
                onClose();
              }}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Check className="h-4 w-4" />
              Appliquer ce thème
            </Button>
          </div>
        </div>

        {/* Preview iframe */}
        <div className="flex-1 relative bg-muted">
          <iframe
            src={previewUrl}
            className="w-full h-full border-0"
            title={`Aperçu du thème ${themeName}`}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemePreviewModal;
