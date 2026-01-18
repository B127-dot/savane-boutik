import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { EditorSectionProps } from './types';

export function ContactSection({ formData, updateField, validationErrors }: EditorSectionProps) {
  return (
    <AccordionItem value="contact" className="border-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-cyan-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-cyan-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Contact & Réseaux</span>
            <p className="text-xs text-muted-foreground">Téléphone, WhatsApp, réseaux sociaux</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
            <Phone className="w-4 h-4 text-cyan-500" />
            Téléphone
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+226 70 12 34 56"
            className="h-11 bg-background/50 border-border/50"
          />
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-sm font-semibold flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            WhatsApp Business
          </Label>
          <Input
            id="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => updateField('whatsapp', e.target.value)}
            placeholder="+226 70 12 34 56"
            className="h-11 bg-background/50 border-border/50"
          />
          <p className="text-xs text-muted-foreground">Format international : +226 70 12 34 56</p>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-500" />
            Adresse
          </Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Secteur 15, Ouagadougou, Burkina Faso"
            className="bg-background/50 border-border/50 resize-none"
            rows={2}
          />
        </div>

        <Separator />

        {/* Social Links */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Réseaux sociaux</Label>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="facebook" className="text-xs text-muted-foreground">Facebook</Label>
              <Input
                id="facebook"
                value={formData.facebook}
                onChange={(e) => updateField('facebook', e.target.value)}
                placeholder="https://facebook.com/maboutique"
                className={`h-10 bg-background/50 border-border/50 ${validationErrors?.facebook ? 'border-destructive' : ''}`}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="instagram" className="text-xs text-muted-foreground">Instagram</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) => updateField('instagram', e.target.value)}
                placeholder="https://instagram.com/maboutique"
                className={`h-10 bg-background/50 border-border/50 ${validationErrors?.instagram ? 'border-destructive' : ''}`}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="tiktok" className="text-xs text-muted-foreground">TikTok</Label>
              <Input
                id="tiktok"
                value={formData.tiktok}
                onChange={(e) => updateField('tiktok', e.target.value)}
                placeholder="https://tiktok.com/@maboutique"
                className={`h-10 bg-background/50 border-border/50 ${validationErrors?.tiktok ? 'border-destructive' : ''}`}
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default ContactSection;
