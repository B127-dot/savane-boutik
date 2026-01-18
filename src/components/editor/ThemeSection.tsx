import { Sparkles } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import ThemeSelector from '@/components/ThemeSelector';
import { EditorSectionProps } from './types';

export function ThemeSection({ formData, updateField }: EditorSectionProps) {
  return (
    <AccordionItem value="theme" className="border-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-violet-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-violet-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-left flex-1">
            <span className="font-semibold text-base">Thème de Boutique</span>
            <p className="text-xs text-muted-foreground">Modern, Artisan, Aesthetique</p>
          </div>
          <Badge variant="secondary" className="capitalize">
            {formData.selectedTheme}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <ThemeSelector
          currentTheme={formData.selectedTheme}
          onThemeChange={(themeId) => updateField('selectedTheme', themeId)}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

export default ThemeSection;
