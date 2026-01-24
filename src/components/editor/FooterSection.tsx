import { Type, Zap, Link2, Plus, Trash2 } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { EditorSectionProps } from './types';
import { FooterLink } from '@/contexts/AppContext';

export function FooterSection({ formData, updateField }: EditorSectionProps) {
  const addFooterLink = () => {
    const newLink: FooterLink = { id: Date.now().toString(), label: 'Nouveau lien', url: '#' };
    updateField('footerLinks', [...formData.footerLinks, newLink]);
  };

  const updateFooterLink = (id: string, updates: Partial<FooterLink>) => {
    updateField('footerLinks', formData.footerLinks.map(link => link.id === id ? { ...link, ...updates } : link));
  };

  const removeFooterLink = (id: string) => {
    updateField('footerLinks', formData.footerLinks.filter(link => link.id !== id));
  };

  return (
    <AccordionItem value="footer" className="border-0 rounded-2xl bg-gradient-to-br from-slate-500/5 to-slate-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-slate-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-500/25">
            <Type className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Pied de page</span>
            <p className="text-xs text-muted-foreground">À propos, liens, newsletter</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="aboutText" className="text-sm font-semibold">Texte "À propos"</Label>
          <Textarea id="aboutText" value={formData.aboutText} onChange={(e) => updateField('aboutText', e.target.value)} placeholder="Décrivez votre boutique..." className="bg-background/50 resize-none" rows={3} />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-2"><Link2 className="w-4 h-4 text-slate-500" /><Label className="text-sm font-semibold">Liens du footer</Label></div>
          <AnimatePresence mode="popLayout">
            {formData.footerLinks.map((link) => (
              <motion.div key={link.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 rounded-xl bg-background/50 border">
                <Input value={link.label} onChange={(e) => updateFooterLink(link.id, { label: e.target.value })} placeholder="Label" className="flex-1 h-9" />
                <Input value={link.url} onChange={(e) => updateFooterLink(link.id, { url: e.target.value })} placeholder="URL" className="flex-1 h-9" />
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFooterLink(link.id)} disabled={formData.footerLinks.length <= 1}><Trash2 className="w-4 h-4" /></Button>
              </motion.div>
            ))}
          </AnimatePresence>
          {formData.footerLinks.length < 6 && <Button type="button" variant="outline" size="sm" onClick={addFooterLink} className="w-full gap-2"><Plus className="w-4 h-4" />Ajouter un lien</Button>}
        </div>

        <Separator />

        <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border">
          <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-slate-500" /><Label className="text-sm">Afficher newsletter</Label></div>
          <Switch checked={formData.showNewsletter} onCheckedChange={(checked) => updateField('showNewsletter', checked)} />
        </div>

        {formData.showNewsletter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Titre newsletter</Label>
              <Input value={formData.newsletterTitle} onChange={(e) => updateField('newsletterTitle', e.target.value)} className="h-11 bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Sous-titre</Label>
              <Input value={formData.newsletterSubtitle} onChange={(e) => updateField('newsletterSubtitle', e.target.value)} className="h-11 bg-background/50" />
            </div>
          </motion.div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default FooterSection;
