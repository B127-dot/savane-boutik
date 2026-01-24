import { useState } from 'react';
import { Check, Eye, Sparkles, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAvailableThemes } from '@/types/themes';
import ThemePreviewModal from '@/components/ThemePreviewModal';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ThemePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
  shopUrl?: string;
}

export function ThemePickerModal({ 
  isOpen, 
  onClose, 
  currentTheme, 
  onThemeChange,
  shopUrl = 'ma-boutique'
}: ThemePickerModalProps) {
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const themes = getAvailableThemes();

  // Sort themes: available first, then by isNew
  const sortedThemes = [...themes].sort((a, b) => {
    if (a.isAvailable !== b.isAvailable) {
      return a.isAvailable ? -1 : 1;
    }
    if (a.isNew !== b.isNew) {
      return a.isNew ? -1 : 1;
    }
    return 0;
  });

  const handleSelectTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme?.isAvailable) {
      toast.info(`Le thème ${theme?.name} sera bientôt disponible !`);
      return;
    }
    
    onThemeChange(themeId);
    toast.success(`Thème "${theme.name}" appliqué !`);
    onClose();
  };

  const handlePreview = (e: React.MouseEvent, themeId: string) => {
    e.stopPropagation();
    const theme = themes.find(t => t.id === themeId);
    if (!theme?.isAvailable) {
      toast.info(`Le thème ${theme?.name} sera bientôt disponible !`);
      return;
    }
    setPreviewTheme(themeId);
  };

  const previewThemeData = previewTheme ? themes.find(t => t.id === previewTheme) : null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-violet-500/10 to-purple-500/5 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg">Choisir un thème</DialogTitle>
                <DialogDescription className="text-sm">
                  Sélectionnez le design qui correspond à votre marque
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[400px]">
            <div className="p-4 space-y-2">
              {sortedThemes.map((theme, index) => {
                const isActive = theme.id === currentTheme;
                const isAvailable = theme.isAvailable;

                return (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectTheme(theme.id)}
                    className={`
                      flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200
                      ${isActive 
                        ? 'bg-primary/10 border-2 border-primary/40 shadow-[0_0_12px_-3px_hsl(var(--primary)/0.4)]' 
                        : 'border border-border hover:border-primary/30 hover:bg-muted/50'
                      }
                      ${!isAvailable ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                  >
                    {/* Theme Preview - Larger */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-border shadow-md">
                      <img 
                        src={theme.preview} 
                        alt={theme.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Preview overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                        <Eye className="w-5 h-5 text-white drop-shadow-lg" />
                      </div>
                    </div>

                    {/* Theme Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{theme.name}</span>
                        {theme.isNew && isAvailable && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] px-1.5 py-0 h-4 font-bold border-0">
                            NOUVEAU
                          </Badge>
                        )}
                        {!isAvailable && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            Bientôt
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {theme.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </motion.div>
                      )}
                      
                      {!isActive && isAvailable && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => handlePreview(e, theme.id)}
                          className="w-8 h-8 hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t bg-muted/30">
            <p className="text-xs text-center text-muted-foreground">
              Cliquez sur un thème pour l'appliquer • <Eye className="w-3 h-3 inline" /> pour prévisualiser
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Theme Preview Modal */}
      {previewThemeData && (
        <ThemePreviewModal
          isOpen={!!previewTheme}
          onClose={() => setPreviewTheme(null)}
          onApply={() => {
            handleSelectTheme(previewTheme!);
            setPreviewTheme(null);
          }}
          themeId={previewTheme!}
          themeName={previewThemeData.name}
          shopUrl={shopUrl}
        />
      )}
    </>
  );
}

export default ThemePickerModal;
