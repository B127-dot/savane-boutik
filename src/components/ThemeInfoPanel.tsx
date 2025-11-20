import { X, Palette, Type, Zap, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Theme } from '@/types/themes';

interface ThemeInfoPanelProps {
  theme: Theme;
  isOpen: boolean;
  onToggle: () => void;
}

const ThemeInfoPanel = ({ theme, isOpen, onToggle }: ThemeInfoPanelProps) => {
  const getThemeColors = (themeId: string) => {
    switch (themeId) {
      case 'modern':
        return ['#10B981', '#059669', '#047857', '#065F46'];
      case 'elegant':
        return ['#D4AF37', '#B8936B', '#A67C5B', '#8B7355'];
      case 'minimal':
        return ['#64748B', '#475569', '#334155', '#1E293B'];
      case 'creative':
        return ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6'];
      default:
        return ['#10B981', '#059669', '#047857', '#065F46'];
    }
  };

  const getThemeTypography = (themeId: string) => {
    switch (themeId) {
      case 'modern':
        return { primary: 'Inter', secondary: 'Inter', style: 'Sans-serif moderne' };
      case 'elegant':
        return { primary: 'Playfair Display', secondary: 'Cormorant Garamond', style: 'Serif sophistiqué' };
      case 'minimal':
        return { primary: 'Inter', secondary: 'DM Sans', style: 'Sans-serif épuré' };
      case 'creative':
        return { primary: 'Fredoka', secondary: 'Righteous', style: 'Arrondi & Audacieux' };
      default:
        return { primary: 'Inter', secondary: 'Inter', style: 'Sans-serif' };
    }
  };

  const getThemeFeatures = (themeId: string) => {
    switch (themeId) {
      case 'modern':
        return [
          'Design contemporain avec accents verts',
          'Animations fluides et professionnelles',
          'Optimisé pour la conversion',
          'Mobile-first responsive'
        ];
      case 'elegant':
        return [
          'Palette or et beige raffinée',
          'Typographie serif sophistiquée',
          'Animations douces et élégantes',
          'Parfait pour boutiques de luxe'
        ];
      case 'minimal':
        return [
          'Design épuré et minimaliste',
          'Focus sur le contenu',
          'Espaces blancs généreux',
          'Clarté maximale'
        ];
      case 'creative':
        return [
          'Animations audacieuses et dynamiques',
          'Couleurs vives et expressives',
          'Design non-conventionnel',
          'Idéal pour boutiques artistiques'
        ];
      default:
        return [];
    }
  };

  const getIdealFor = (themeId: string) => {
    switch (themeId) {
      case 'modern':
        return 'Mode, Tech, E-commerce général';
      case 'elegant':
        return 'Bijoux, Luxe, Cosmétiques haut de gamme';
      case 'minimal':
        return 'Art, Design, Produits minimalistes';
      case 'creative':
        return 'Art, Artisanat, Mode avant-gardiste';
      default:
        return 'Tous types de boutiques';
    }
  };

  const colors = getThemeColors(theme.id);
  const typography = getThemeTypography(theme.id);
  const features = getThemeFeatures(theme.id);
  const idealFor = getIdealFor(theme.id);

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col animate-fade-in h-full">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Détails du thème</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Color Palette */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Palette className="h-4 w-4 text-primary" />
            Palette de couleurs
          </div>
          <div className="flex gap-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-lg border-2 border-border shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Type className="h-4 w-4 text-primary" />
            Typographie
          </div>
          <div className="space-y-2">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Principale</p>
              <p className="font-semibold text-foreground">{typography.primary}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Secondaire</p>
              <p className="font-semibold text-foreground">{typography.secondary}</p>
            </div>
            <Badge variant="outline" className="w-full justify-center">
              {typography.style}
            </Badge>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Points forts
          </div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ideal For */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Tag className="h-4 w-4 text-primary" />
            Idéal pour
          </div>
          <Badge variant="secondary" className="w-full justify-center text-center py-2">
            {idealFor}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ThemeInfoPanel;
