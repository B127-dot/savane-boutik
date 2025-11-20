import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Eye, Sparkles, Lock } from 'lucide-react';
import { getAvailableThemes, Theme } from '@/types/themes';
import { useToast } from '@/hooks/use-toast';
import ThemePreviewModalEnhanced from './ThemePreviewModalEnhanced';
import { useApp } from '@/contexts/AppContext';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  const { toast } = useToast();
  const { shopSettings } = useApp();
  const themes = getAvailableThemes();
  const [selectedTheme, setSelectedTheme] = useState<string>(currentTheme);
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (theme: Theme) => {
    if (!theme.isAvailable) {
      toast({
        title: "Thème non disponible",
        description: "Ce thème sera bientôt disponible. Restez connecté !",
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

    setSelectedTheme(theme.id);
    onThemeChange(theme.id);
    
    toast({
      title: "Thème appliqué !",
      description: `Le thème "${theme.name}" a été activé pour votre boutique.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Choisir un thème pour votre boutique
        </h2>
        <p className="text-muted-foreground">
          Personnalisez l'apparence de votre boutique en un clic. Tous vos produits et paramètres restent intacts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => {
          const isActive = theme.id === currentTheme;
          const isSelected = theme.id === selectedTheme;

          return (
            <Card 
              key={theme.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary shadow-xl' : ''
              } ${!theme.isAvailable ? 'opacity-75' : ''}`}
            >
              {/* Theme Preview */}
              <div className="relative h-48 bg-gradient-to-br from-muted to-muted-foreground/10 overflow-hidden">
                <img 
                  src={theme.preview} 
                  alt={`Aperçu ${theme.name}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                {!theme.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <Lock className="h-12 w-12 text-white" />
                  </div>
                )}

                {/* Active Badge */}
                {isActive && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    <Check className="h-3 w-3 mr-1" />
                    Actuel
                  </Badge>
                )}
              </div>

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{theme.name}</span>
                  {!theme.isAvailable && (
                    <Badge variant="secondary" className="ml-2">
                      Bientôt
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{theme.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApplyTheme(theme)}
                    disabled={!theme.isAvailable || isActive}
                    className="flex-1"
                    variant={isActive ? "outline" : "default"}
                  >
                    {isActive ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Activé
                      </>
                    ) : theme.isAvailable ? (
                      'Appliquer'
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Verrouillé
                      </>
                    )}
                  </Button>
                  
                  {theme.isAvailable && !isActive && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePreview(theme)}
                      title="Prévisualiser"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="bg-muted/50 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Nouveau thème en préparation
              </p>
              <p className="text-sm text-muted-foreground">
                Le thème "Élégant" sera disponible prochainement avec un design sophistiqué et des animations raffinées.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      {previewTheme && (
        <ThemePreviewModalEnhanced
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          themes={themes}
          themeId={previewTheme.id}
          themeName={previewTheme.name}
          currentThemeId={currentTheme}
          shopUrl={shopSettings?.shopUrl || 'ma-boutique'}
          onApply={(theme) => {
            handleApplyTheme(theme);
            setIsPreviewOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ThemeSelector;
