import { Layers } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import DraggableSectionManager from '@/components/shop/DraggableSectionManager';
import { SectionsSectionProps } from './types';

export function SectionsSection({ 
  sectionConfigs, 
  updateField,
  handleToggleSectionVisibility,
  onAddBlock,
  onRemoveBlock,
  onEditBlock
}: SectionsSectionProps) {
  return (
    <AccordionItem value="sections" className="border-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-violet-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-violet-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Ordre des Sections</span>
            <p className="text-xs text-muted-foreground">Réorganisez et personnalisez</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        <p className="text-sm text-muted-foreground">
          Glissez-déposez les sections pour les réorganiser. Ajoutez des blocs personnalisés.
        </p>
        
        <DraggableSectionManager
          sections={sectionConfigs}
          onReorder={(newOrder) => updateField('sectionOrder', newOrder)}
          onToggleVisibility={handleToggleSectionVisibility}
          onAddBlock={onAddBlock}
          onRemoveBlock={onRemoveBlock}
          onEditBlock={onEditBlock}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

export default SectionsSection;
