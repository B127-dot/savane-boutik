import { Shield, Truck, Phone, Star, Heart, Clock, Check, Wallet, Headphones, Plus, Trash2 } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { TrustBarItem } from '@/contexts/AppContext';
import { TrustBarSectionProps } from './types';

const TRUST_BAR_ICONS = [
  { value: 'truck', label: 'Livraison', icon: Truck },
  { value: 'shield', label: 'Sécurité', icon: Shield },
  { value: 'phone', label: 'Téléphone', icon: Phone },
  { value: 'star', label: 'Étoile', icon: Star },
  { value: 'heart', label: 'Cœur', icon: Heart },
  { value: 'clock', label: 'Horloge', icon: Clock },
  { value: 'check', label: 'Validé', icon: Check },
  { value: 'wallet', label: 'Paiement', icon: Wallet },
  { value: 'headphones', label: 'Support', icon: Headphones },
] as const;

export function TrustBarSection({ 
  formData, 
  addTrustBarItem, 
  updateTrustBarItem, 
  removeTrustBarItem 
}: TrustBarSectionProps) {
  return (
    <AccordionItem value="trust" className="border-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-green-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-green-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Barre de Réassurance</span>
            <p className="text-xs text-muted-foreground">Points de confiance ({formData.trustBar.length}/4)</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-4">
        <AnimatePresence>
          {formData.trustBar.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-border/50 rounded-xl p-4 bg-background/50 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-green-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-green-600">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium">Point de confiance</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTrustBarItem(item.id)}
                  className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Icon Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Icône</Label>
                <div className="flex flex-wrap gap-1.5">
                  {TRUST_BAR_ICONS.map((iconOption) => {
                    const IconComp = iconOption.icon;
                    return (
                      <Button
                        key={iconOption.value}
                        type="button"
                        variant={item.icon === iconOption.value ? 'default' : 'outline'}
                        size="icon"
                        className={`h-9 w-9 ${item.icon === iconOption.value ? 'shadow-md bg-green-500 hover:bg-green-600' : 'hover:border-green-500/50'}`}
                        onClick={() => updateTrustBarItem(item.id, { icon: iconOption.value as TrustBarItem['icon'] })}
                      >
                        <IconComp className="w-4 h-4" />
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Titre</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateTrustBarItem(item.id, { title: e.target.value })}
                    placeholder="Livraison Rapide"
                    className="h-9 text-sm bg-background border-border/50"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Sous-titre</Label>
                  <Input
                    value={item.subtitle || ''}
                    onChange={(e) => updateTrustBarItem(item.id, { subtitle: e.target.value })}
                    placeholder="Partout au Burkina"
                    className="h-9 text-sm bg-background border-border/50"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {formData.trustBar.length < 4 && (
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 gap-2 border-dashed border-green-500/30 text-green-600 hover:bg-green-500/5 hover:border-green-500/50"
            onClick={addTrustBarItem}
          >
            <Plus className="w-4 h-4" />
            Ajouter un point de confiance
          </Button>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default TrustBarSection;
