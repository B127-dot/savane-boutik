import { Megaphone, Tag } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { EditorSectionProps } from './types';

export function PromoSection({ formData, updateField }: EditorSectionProps) {
  return (
    <AccordionItem value="promo" className="border-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-orange-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Megaphone className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Bannière Promo</span>
            <p className="text-xs text-muted-foreground">Annonces et promotions</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        {/* Enable Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-orange-500" />
            <Label className="text-sm font-medium cursor-pointer">Activer la bannière</Label>
          </div>
          <Switch
            checked={formData.promoBanner.enabled}
            onCheckedChange={(checked) => updateField('promoBanner', { ...formData.promoBanner, enabled: checked })}
          />
        </div>

        {formData.promoBanner.enabled && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {/* Promo Text */}
            <div className="space-y-2">
              <Label htmlFor="promoText" className="text-sm font-semibold">Texte de la bannière</Label>
              <Input
                id="promoText"
                value={formData.promoBanner.text}
                onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, text: e.target.value })}
                placeholder="🎉 -20% sur tout le site avec le code PROMO20"
                className="h-11 bg-background/50 border-border/50"
              />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Couleur de fond</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.promoBanner.backgroundColor}
                    onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, backgroundColor: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                  />
                  <Input
                    value={formData.promoBanner.backgroundColor}
                    onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, backgroundColor: e.target.value })}
                    className="h-10 bg-background/50 border-border/50 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Couleur du texte</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.promoBanner.textColor}
                    onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, textColor: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                  />
                  <Input
                    value={formData.promoBanner.textColor}
                    onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, textColor: e.target.value })}
                    className="h-10 bg-background/50 border-border/50 font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Link */}
            <div className="space-y-2">
              <Label htmlFor="promoLink" className="text-sm font-semibold">Lien (optionnel)</Label>
              <Input
                id="promoLink"
                value={formData.promoBanner.link || ''}
                onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, link: e.target.value })}
                placeholder="https://..."
                className="h-11 bg-background/50 border-border/50"
              />
            </div>

            {/* Position */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Position</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['top', 'below-hero'] as const).map((pos) => (
                  <Button
                    key={pos}
                    type="button"
                    variant={formData.promoBanner.position === pos ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateField('promoBanner', { ...formData.promoBanner, position: pos })}
                    className={`h-10 ${formData.promoBanner.position === pos ? 'shadow-md' : ''}`}
                  >
                    {pos === 'top' ? 'Haut de page' : 'Sous le Hero'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Aperçu</p>
              <div 
                className="py-2.5 px-4 text-center text-sm font-medium rounded-lg"
                style={{ 
                  backgroundColor: formData.promoBanner.backgroundColor, 
                  color: formData.promoBanner.textColor 
                }}
              >
                {formData.promoBanner.text || 'Votre message promo...'}
              </div>
            </div>
          </motion.div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default PromoSection;
