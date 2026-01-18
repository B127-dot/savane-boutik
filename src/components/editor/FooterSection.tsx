import { Type, Zap } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { EditorSectionProps } from './types';

export function FooterSection({ formData, updateField }: EditorSectionProps) {
  return (
    <AccordionItem value="footer" className="border-0 rounded-2xl bg-gradient-to-br from-slate-500/5 to-slate-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-slate-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-500/25">
            <Type className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Pied de page</span>
            <p className="text-xs text-muted-foreground">À propos, newsletter</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="aboutText" className="text-sm font-semibold">Texte "À propos"</Label>
          <Textarea
            id="aboutText"
            value={formData.aboutText}
            onChange={(e) => updateField('aboutText', e.target.value)}
            placeholder="Décrivez votre boutique en quelques mots..."
            className="bg-background/50 border-border/50 resize-none"
            rows={3}
          />
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-slate-500" />
            <Label className="text-sm font-medium cursor-pointer">Afficher la newsletter</Label>
          </div>
          <Switch
            checked={formData.showNewsletter}
            onCheckedChange={(checked) => updateField('showNewsletter', checked)}
          />
        </div>

        {formData.showNewsletter && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="newsletterTitle" className="text-sm font-semibold">Titre newsletter</Label>
              <Input
                id="newsletterTitle"
                value={formData.newsletterTitle}
                onChange={(e) => updateField('newsletterTitle', e.target.value)}
                placeholder="Restez informé"
                className="h-11 bg-background/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newsletterSubtitle" className="text-sm font-semibold">Sous-titre</Label>
              <Input
                id="newsletterSubtitle"
                value={formData.newsletterSubtitle}
                onChange={(e) => updateField('newsletterSubtitle', e.target.value)}
                placeholder="Recevez nos offres exclusives"
                className="h-11 bg-background/50 border-border/50"
              />
            </div>
          </motion.div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default FooterSection;
