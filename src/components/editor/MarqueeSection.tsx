import { Sparkles, Plus, Trash2, GripVertical } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { MarqueeItem } from '@/contexts/AppContext';
import { ShopEditorFormData } from '@/hooks/useShopEditor';

const MARQUEE_ICONS = [
  { value: 'truck', label: 'Livraison' },
  { value: 'star', label: 'Étoile' },
  { value: 'zap', label: 'Éclair' },
  { value: 'heart', label: 'Cœur' },
  { value: 'sparkles', label: 'Étoiles' },
  { value: 'gift', label: 'Cadeau' },
  { value: 'shield', label: 'Bouclier' },
  { value: 'flame', label: 'Flamme' },
] as const;

interface MarqueeSectionProps {
  formData: ShopEditorFormData;
  updateField: <K extends keyof ShopEditorFormData>(field: K, value: ShopEditorFormData[K]) => void;
}

export function MarqueeSection({ formData, updateField }: MarqueeSectionProps) {
  const addMarqueeItem = () => {
    const newItem: MarqueeItem = {
      id: Date.now().toString(),
      text: 'Nouveau texte',
      icon: 'star',
    };
    updateField('marqueeItems', [...formData.marqueeItems, newItem]);
  };

  const updateMarqueeItem = (id: string, updates: Partial<MarqueeItem>) => {
    updateField('marqueeItems', formData.marqueeItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeMarqueeItem = (id: string) => {
    updateField('marqueeItems', formData.marqueeItems.filter(item => item.id !== id));
  };

  return (
    <AccordionItem value="marquee" className="border-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-pink-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-pink-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Marquee / Ticker</span>
            <p className="text-xs text-muted-foreground">Bandeau défilant animé</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        {/* Toggle visibility */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <Label className="text-sm font-medium cursor-pointer">Afficher le marquee</Label>
          </div>
          <Switch
            checked={formData.showMarquee}
            onCheckedChange={(checked) => updateField('showMarquee', checked)}
          />
        </div>

        {formData.showMarquee && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {/* Marquee items */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Items du marquee</Label>
              <AnimatePresence mode="popLayout">
                {formData.marqueeItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-background/50 border border-border/50"
                  >
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                    
                    <Select
                      value={item.icon}
                      onValueChange={(value) => updateMarqueeItem(item.id, { icon: value })}
                    >
                      <SelectTrigger className="w-28 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MARQUEE_ICONS.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value}>
                            {icon.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Input
                      value={item.text}
                      onChange={(e) => updateMarqueeItem(item.id, { text: e.target.value })}
                      placeholder="Texte"
                      className="flex-1 h-9"
                    />
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeMarqueeItem(item.id)}
                      disabled={formData.marqueeItems.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add button */}
            {formData.marqueeItems.length < 8 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMarqueeItem}
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter un item
              </Button>
            )}

            <p className="text-xs text-muted-foreground">
              Maximum 8 items. Le texte défile automatiquement de droite à gauche.
            </p>
          </motion.div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default MarqueeSection;
