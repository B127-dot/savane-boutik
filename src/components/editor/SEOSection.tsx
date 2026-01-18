import { Search, Share2, Image } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ImageUploader } from '@/components/ImageUploader';
import { EditorSectionProps } from './types';

export function SEOSection({ formData, updateField, validationErrors }: EditorSectionProps) {
  return (
    <AccordionItem value="seo" className="border-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-amber-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-amber-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">SEO & Partage</span>
            <p className="text-xs text-muted-foreground">Référencement Google, aperçu social</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        {/* SEO Title */}
        <div className="space-y-2">
          <Label htmlFor="seoTitle" className="text-sm font-semibold flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-500" />
            Titre SEO
          </Label>
          <Input
            id="seoTitle"
            value={formData.seoTitle}
            onChange={(e) => updateField('seoTitle', e.target.value)}
            placeholder="Ma Boutique - Mode Tendance à Ouagadougou"
            className={`h-11 bg-background/50 border-border/50 ${validationErrors?.seoTitle ? 'border-destructive' : ''}`}
            maxLength={60}
          />
          <p className="text-xs text-muted-foreground flex justify-between">
            <span>Titre affiché sur Google</span>
            <span className={formData.seoTitle.length > 55 ? 'text-amber-500' : ''}>{formData.seoTitle.length}/60</span>
          </p>
        </div>

        {/* SEO Description */}
        <div className="space-y-2">
          <Label htmlFor="seoDescription" className="text-sm font-semibold">Description SEO</Label>
          <Textarea
            id="seoDescription"
            value={formData.seoDescription}
            onChange={(e) => updateField('seoDescription', e.target.value)}
            placeholder="Découvrez notre boutique en ligne. Livraison rapide à Ouagadougou, paiement Orange Money..."
            className={`bg-background/50 border-border/50 resize-none ${validationErrors?.seoDescription ? 'border-destructive' : ''}`}
            rows={3}
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground flex justify-between">
            <span>Description affichée sur Google</span>
            <span className={formData.seoDescription.length > 150 ? 'text-amber-500' : ''}>{formData.seoDescription.length}/160</span>
          </p>
        </div>

        <Separator />

        {/* Social Image */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-500" />
            Image de partage (Open Graph)
          </Label>
          <ImageUploader
            images={formData.socialImage ? [formData.socialImage] : []}
            onChange={(images) => updateField('socialImage', images[0] || '')}
            maxImages={1}
          />
          <p className="text-xs text-muted-foreground">
            Image affichée lors du partage sur WhatsApp, Facebook... (Recommandé : 1200×630px)
          </p>
        </div>

        {/* Preview Card */}
        <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-3">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Aperçu Google</p>
          <div className="space-y-1">
            <p className="text-blue-600 text-base font-medium truncate">
              {formData.seoTitle || formData.shopName || 'Titre de votre boutique'}
            </p>
            <p className="text-emerald-700 text-xs">
              burkeshop.bf/{formData.shopUrl || 'ma-boutique'}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {formData.seoDescription || 'Description de votre boutique qui apparaîtra dans les résultats de recherche Google...'}
            </p>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default SEOSection;
