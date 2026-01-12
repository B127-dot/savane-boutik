import { ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

export interface SectionConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  visible: boolean;
  description?: string;
}

interface SectionOrderManagerProps {
  sections: SectionConfig[];
  onToggleVisibility: (sectionId: string, visible: boolean) => void;
  onMoveUp: (sectionId: string) => void;
  onMoveDown: (sectionId: string) => void;
}

const SectionOrderManager = ({
  sections,
  onToggleVisibility,
  onMoveUp,
  onMoveDown
}: SectionOrderManagerProps) => {
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              section.visible 
                ? 'bg-background/50 border-border/50' 
                : 'bg-muted/30 border-border/30 opacity-60'
            }`}
          >
            {/* Section Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                section.visible ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {section.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${!section.visible && 'text-muted-foreground'}`}>
                  {section.name}
                </p>
                {section.description && (
                  <p className="text-xs text-muted-foreground truncate">{section.description}</p>
                )}
              </div>
            </div>

            {/* Order Controls */}
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onMoveUp(section.id)}
                disabled={index === 0}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onMoveDown(section.id)}
                disabled={index === sections.length - 1}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
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
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SectionOrderManager;
