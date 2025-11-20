import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Camera, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAvailableThemes } from '@/types/themes';
import { generateAllThemeScreenshots, clearThemeScreenshotCache } from '@/lib/themeScreenshot';
import { useApp } from '@/contexts/AppContext';

const ThemeScreenshotGenerator = () => {
  const { toast } = useToast();
  const { shopSettings } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<string>('');

  const availableThemes = getAvailableThemes().filter(t => t.isAvailable);

  const handleGenerateScreenshots = async () => {
    if (!shopSettings.shopUrl) {
      toast({
        title: "Erreur",
        description: "URL de boutique non configurée",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      const themeIds = availableThemes.map(t => t.id);
      
      await generateAllThemeScreenshots(
        shopSettings.shopUrl,
        themeIds,
        (themeId, index, total) => {
          setCurrentTheme(themeId);
          setProgress((index / total) * 100);
        }
      );

      toast({
        title: "Screenshots générés !",
        description: `${themeIds.length} aperçus de thèmes ont été créés avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "La génération des screenshots a échoué",
        variant: "destructive"
      });
      console.error('Screenshot generation error:', error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
      setCurrentTheme('');
    }
  };

  const handleClearCache = () => {
    clearThemeScreenshotCache();
    toast({
      title: "Cache effacé",
      description: "Tous les aperçus de thèmes ont été supprimés du cache",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Génération d'aperçus de thèmes
        </CardTitle>
        <CardDescription>
          Générez automatiquement des captures d'écran de votre boutique pour chaque thème disponible
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Génération en cours : <span className="font-medium text-foreground">{currentTheme}</span>
              </span>
              <span className="text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-medium text-foreground">
                  À propos de la génération
                </p>
                <p className="text-muted-foreground">
                  Cette fonctionnalité capture automatiquement des screenshots de votre boutique 
                  avec chaque thème. Le processus peut prendre quelques secondes par thème.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleGenerateScreenshots}
                disabled={isGenerating || !shopSettings.shopUrl}
                className="flex-1 gap-2"
              >
                <Camera className="h-4 w-4" />
                Générer les aperçus ({availableThemes.length} thèmes)
              </Button>
              
              <Button
                onClick={handleClearCache}
                variant="outline"
                size="icon"
                title="Effacer le cache"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {availableThemes.length > 0 && (
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              Thèmes disponibles :
            </p>
            <div className="flex flex-wrap gap-2">
              {availableThemes.map(theme => (
                <div
                  key={theme.id}
                  className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded-md text-xs"
                >
                  <Check className="h-3 w-3 text-primary" />
                  <span>{theme.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThemeScreenshotGenerator;
