import { Store, Globe, Image } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ImageUploader } from '@/components/ImageUploader';
import { EditorSectionProps } from './types';

export function IdentitySection({ formData, updateField, validationErrors }: EditorSectionProps) {
  return (
    <AccordionItem value="identity" className="border-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-emerald-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Identité</span>
            <p className="text-xs text-muted-foreground">Nom, logo, favicon, URL</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        {/* Shop Name */}
        <div className="space-y-2">
          <Label htmlFor="shopName" className="text-sm font-semibold flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-500" />
            Nom de la boutique
          </Label>
          <Input
            id="shopName"
            value={formData.shopName}
            onChange={(e) => updateField('shopName', e.target.value)}
            placeholder="Ma Boutique"
            className={`h-11 bg-background/50 border-border/50 focus:border-emerald-500/50 ${validationErrors?.shopName ? 'border-destructive' : ''}`}
          />
          {validationErrors?.shopName && (
            <p className="text-xs text-destructive">{validationErrors.shopName}</p>
          )}
        </div>

        {/* Shop URL */}
        <div className="space-y-2">
          <Label htmlFor="shopUrl" className="text-sm font-semibold flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-500" />
            URL de la boutique
          </Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border/50 bg-muted/50 text-muted-foreground text-sm">
              burkeshop.bf/
            </span>
            <Input
              id="shopUrl"
              value={formData.shopUrl}
              onChange={(e) => updateField('shopUrl', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              className={`h-11 rounded-l-none bg-background/50 border-border/50 ${validationErrors?.shopUrl ? 'border-destructive' : ''}`}
              placeholder="ma-boutique"
            />
          </div>
          {validationErrors?.shopUrl && (
            <p className="text-xs text-destructive">{validationErrors.shopUrl}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Décrivez votre boutique en quelques mots..."
            className="bg-background/50 border-border/50 resize-none"
            rows={2}
          />
        </div>

        <Separator />

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Image className="w-4 h-4 text-emerald-500" />
            Logo de la boutique
          </Label>
          <ImageUploader
            images={formData.logo ? [formData.logo] : []}
            onChange={(images) => updateField('logo', images[0] || '')}
            maxImages={1}
          />
          <p className="text-xs text-muted-foreground">Recommandé : 200×200px, PNG avec fond transparent</p>
        </div>

        {/* Favicon Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-500" />
            Favicon (icône navigateur)
          </Label>
          <ImageUploader
            images={formData.favicon ? [formData.favicon] : []}
            onChange={(images) => updateField('favicon', images[0] || '')}
            maxImages={1}
          />
          <p className="text-xs text-muted-foreground">Recommandé : 32×32px ou 64×64px, PNG/ICO</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default IdentitySection;
