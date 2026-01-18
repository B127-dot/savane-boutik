import { SlidersHorizontal, Layout, Circle, Sparkles } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { SECTION_SPACING_OPTIONS, CARD_BORDER_RADIUS_OPTIONS } from '@/lib/shopTheme';
import { EditorSectionProps } from './types';

export function AdvancedSection({ formData, updateField }: EditorSectionProps) {
  return (
    <AccordionItem value="advanced" className="border-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-indigo-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-indigo-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Personnalisation Fine</span>
            <p className="text-xs text-muted-foreground">Espacement, bordures, animations</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        {/* Section Spacing */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Layout className="w-4 h-4 text-indigo-500" />
            Espacement des sections
          </Label>
          <p className="text-xs text-muted-foreground">Contrôle l'espace entre les sections</p>
          <div className="grid grid-cols-3 gap-2">
            {SECTION_SPACING_OPTIONS.map((option) => (
              <Button
                key={option.id}
                type="button"
                variant={formData.sectionSpacing === option.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateField('sectionSpacing', option.id)}
                className={`h-12 flex-col gap-1 ${formData.sectionSpacing === option.id ? 'shadow-md' : ''}`}
              >
                <span className="text-lg">{option.icon}</span>
                <span className="text-xs">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Card Border Radius */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Circle className="w-4 h-4 text-indigo-500" />
            Rayon des bordures (cartes)
          </Label>
          <p className="text-xs text-muted-foreground">Arrondi des coins des cartes produits</p>
          <div className="grid grid-cols-4 gap-2">
            {CARD_BORDER_RADIUS_OPTIONS.map((option) => (
              <Button
                key={option.id}
                type="button"
                variant={formData.cardBorderRadius === option.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateField('cardBorderRadius', option.id)}
                className={`h-14 flex-col gap-1 ${formData.cardBorderRadius === option.id ? 'shadow-md' : ''}`}
              >
                <div 
                  className="w-6 h-6 border-2 border-current"
                  style={{ borderRadius: option.radius }}
                />
                <span className="text-xs">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Animations Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <Label className="text-sm font-medium cursor-pointer">Animations</Label>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-8">
              Désactiver pour améliorer l'accessibilité
            </p>
          </div>
          <Switch
            checked={formData.animationsEnabled}
            onCheckedChange={(checked) => updateField('animationsEnabled', checked)}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default AdvancedSection;
