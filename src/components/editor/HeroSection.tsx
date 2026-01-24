import { Image, Plus, Trash2, Sparkles, BarChart3, CheckCircle2, ChevronDown } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ImageUploader } from '@/components/ImageUploader';
import { EditorSectionProps } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroStat, HeroFeature } from '@/contexts/AppContext';
import { HERO_BADGE_ICONS } from '@/lib/shopTheme';

export function HeroSection({ formData, updateField, validationErrors }: EditorSectionProps) {
  const addHeroStat = () => {
    const newStat: HeroStat = { id: Date.now().toString(), value: '100', suffix: '+', label: 'Nouvelle stat' };
    updateField('heroStats', [...formData.heroStats, newStat]);
  };

  const updateHeroStat = (id: string, updates: Partial<HeroStat>) => {
    updateField('heroStats', formData.heroStats.map(stat => stat.id === id ? { ...stat, ...updates } : stat));
  };

  const removeHeroStat = (id: string) => {
    updateField('heroStats', formData.heroStats.filter(stat => stat.id !== id));
  };

  const addHeroFeature = () => {
    const newFeature: HeroFeature = { id: Date.now().toString(), text: 'Nouvelle feature' };
    updateField('heroFeatures', [...formData.heroFeatures, newFeature]);
  };

  const updateHeroFeature = (id: string, text: string) => {
    updateField('heroFeatures', formData.heroFeatures.map(f => f.id === id ? { ...f, text } : f));
  };

  const removeHeroFeature = (id: string) => {
    updateField('heroFeatures', formData.heroFeatures.filter(f => f.id !== id));
  };

  return (
    <AccordionItem value="hero" className="border-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-blue-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Image className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Section Hero</span>
            <p className="text-xs text-muted-foreground">Image, titre, badge, stats</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Image className="w-4 h-4 text-blue-500" />
            Image de fond
          </Label>
          <ImageUploader
            images={formData.heroImage ? [formData.heroImage] : []}
            onChange={(images) => updateField('heroImage', images[0] || '')}
            maxImages={1}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroTitle" className="text-sm font-semibold">Titre principal</Label>
          <Input id="heroTitle" value={formData.heroTitle} onChange={(e) => updateField('heroTitle', e.target.value)} placeholder="Bienvenue" className={`h-11 bg-background/50 ${validationErrors?.heroTitle ? 'border-destructive' : ''}`} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroSubtitle" className="text-sm font-semibold">Sous-titre</Label>
          <Textarea id="heroSubtitle" value={formData.heroSubtitle} onChange={(e) => updateField('heroSubtitle', e.target.value)} className="bg-background/50 resize-none" rows={2} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Texte bouton</Label>
            <Input value={formData.heroButtonText} onChange={(e) => updateField('heroButtonText', e.target.value)} className="h-10" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Lien</Label>
            <Input value={formData.heroButtonLink} onChange={(e) => updateField('heroButtonLink', e.target.value)} className="h-10" />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Alignement</Label>
          <div className="grid grid-cols-3 gap-2">
            {(['left', 'center', 'right'] as const).map((layout) => (
              <Button key={layout} type="button" variant={formData.heroLayout === layout ? 'default' : 'outline'} size="sm" onClick={() => updateField('heroLayout', layout)} className="h-10">
                {layout === 'left' ? 'Gauche' : layout === 'center' ? 'Centre' : 'Droite'}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Badge */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /><Label className="text-sm font-semibold">Badge</Label></div>
            <Switch checked={formData.showHeroBadge} onCheckedChange={(checked) => updateField('showHeroBadge', checked)} />
          </div>
          {formData.showHeroBadge && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-3">
              <Input value={formData.heroBadgeText} onChange={(e) => updateField('heroBadgeText', e.target.value)} placeholder="Nouvelle Collection" className="h-9" />
              <Select value={formData.heroBadgeIcon} onValueChange={(v: any) => updateField('heroBadgeIcon', v)}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>{HERO_BADGE_ICONS.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
              </Select>
            </motion.div>
          )}
        </div>

        <Separator />

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-green-500" /><Label className="text-sm font-semibold">Statistiques</Label></div>
            <Switch checked={formData.showHeroStats} onCheckedChange={(checked) => updateField('showHeroStats', checked)} />
          </div>
          {formData.showHeroStats && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <AnimatePresence mode="popLayout">
                {formData.heroStats.map((stat) => (
                  <motion.div key={stat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 rounded-xl bg-background/50 border">
                    <Input value={stat.value} onChange={(e) => updateHeroStat(stat.id, { value: e.target.value })} className="w-16 h-8" />
                    <Input value={stat.suffix || ''} onChange={(e) => updateHeroStat(stat.id, { suffix: e.target.value })} className="w-12 h-8" />
                    <Input value={stat.label} onChange={(e) => updateHeroStat(stat.id, { label: e.target.value })} className="flex-1 h-8" />
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeHeroStat(stat.id)} disabled={formData.heroStats.length <= 1}><Trash2 className="w-4 h-4" /></Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {formData.heroStats.length < 5 && <Button type="button" variant="outline" size="sm" onClick={addHeroStat} className="w-full gap-2"><Plus className="w-4 h-4" />Ajouter</Button>}
            </motion.div>
          )}
        </div>

        <Separator />

        {/* Features */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /><Label className="text-sm font-semibold">Features</Label></div>
            <Switch checked={formData.showHeroFeatures} onCheckedChange={(checked) => updateField('showHeroFeatures', checked)} />
          </div>
          {formData.showHeroFeatures && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <AnimatePresence mode="popLayout">
                {formData.heroFeatures.map((f) => (
                  <motion.div key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <Input value={f.text} onChange={(e) => updateHeroFeature(f.id, e.target.value)} className="flex-1 h-9" />
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeHeroFeature(f.id)} disabled={formData.heroFeatures.length <= 1}><Trash2 className="w-4 h-4" /></Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {formData.heroFeatures.length < 5 && <Button type="button" variant="outline" size="sm" onClick={addHeroFeature} className="w-full gap-2"><Plus className="w-4 h-4" />Ajouter</Button>}
            </motion.div>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border">
          <div className="flex items-center gap-3"><ChevronDown className="w-5 h-5 text-muted-foreground" /><Label className="text-sm">Indicateur scroll</Label></div>
          <Switch checked={formData.showScrollIndicator} onCheckedChange={(checked) => updateField('showScrollIndicator', checked)} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default HeroSection;
