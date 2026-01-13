import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Plus, Trash2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';

export interface SectionConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  visible: boolean;
  description?: string;
  isCustomBlock?: boolean;
  blockType?: string;
}

interface SortableSectionItemProps {
  section: SectionConfig;
  onToggleVisibility: (sectionId: string, visible: boolean) => void;
  onRemove?: (sectionId: string) => void;
  onEdit?: (sectionId: string) => void;
}

const SortableSectionItem = ({ 
  section, 
  onToggleVisibility,
  onRemove,
  onEdit 
}: SortableSectionItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        isDragging 
          ? 'shadow-lg border-primary bg-card' 
          : section.visible 
            ? 'bg-background/50 border-border/50' 
            : 'bg-muted/30 border-border/30 opacity-60'
      }`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none p-1 rounded hover:bg-muted/50 transition-colors"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Section Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          section.visible ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {section.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`text-sm font-medium truncate ${!section.visible && 'text-muted-foreground'}`}>
              {section.name}
            </p>
            {section.isCustomBlock && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                Custom
              </span>
            )}
          </div>
          {section.description && (
            <p className="text-xs text-muted-foreground truncate">{section.description}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {section.isCustomBlock && onEdit && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onEdit(section.id)}
          >
            <Settings2 className="w-4 h-4" />
          </Button>
        )}
        
        {section.isCustomBlock && onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
            onClick={() => onRemove(section.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Visibility Toggle */}
      <div className="flex items-center gap-2">
        <Switch
          checked={section.visible}
          onCheckedChange={(checked) => onToggleVisibility(section.id, checked)}
        />
        {section.visible ? (
          <Eye className="w-4 h-4 text-primary" />
        ) : (
          <EyeOff className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </motion.div>
  );
};

interface DraggableSectionManagerProps {
  sections: SectionConfig[];
  onReorder: (newOrder: string[]) => void;
  onToggleVisibility: (sectionId: string, visible: boolean) => void;
  onAddBlock?: () => void;
  onRemoveBlock?: (sectionId: string) => void;
  onEditBlock?: (sectionId: string) => void;
}

const DraggableSectionManager = ({
  sections,
  onReorder,
  onToggleVisibility,
  onAddBlock,
  onRemoveBlock,
  onEditBlock,
}: DraggableSectionManagerProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      onReorder(newSections.map((s) => s.id));
    }
  };

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence>
            {sections.map((section) => (
              <SortableSectionItem
                key={section.id}
                section={section}
                onToggleVisibility={onToggleVisibility}
                onRemove={section.isCustomBlock ? onRemoveBlock : undefined}
                onEdit={section.isCustomBlock ? onEditBlock : undefined}
              />
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>

      {onAddBlock && (
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 border-dashed border-2 gap-2 hover:border-primary hover:bg-primary/5"
          onClick={onAddBlock}
        >
          <Plus className="w-4 h-4" />
          Ajouter un bloc
        </Button>
      )}
    </div>
  );
};

export default DraggableSectionManager;
