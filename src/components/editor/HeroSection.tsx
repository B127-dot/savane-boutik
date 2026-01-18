import { Image } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/ImageUploader';
import { EditorSectionProps } from './types';

export function HeroSection({ formData, updateField, validationErrors }: EditorSectionProps) {
  return (
    <AccordionItem value="hero" className="border-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-blue-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Image className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Section Hero</span>
            <p className="text-xs text-muted-foreground">Image, titre, bouton d'action</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        {/* Hero Image */}
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
          <p className="text-xs text-muted-foreground">Recommandé : 1920×1080px, JPG/PNG</p>
        </div>

        {/* Hero Title */}
        <div className="space-y-2">
          <Label htmlFor="heroTitle" className="text-sm font-semibold">Titre principal</Label>
          <Input
            id="heroTitle"
            value={formData.heroTitle}
            onChange={(e) => updateField('heroTitle', e.target.value)}
            placeholder="Bienvenue dans notre boutique"
            className={`h-11 bg-background/50 border-border/50 focus:border-blue-500/50 ${validationErrors?.heroTitle ? 'border-destructive' : ''}`}
          />
        </div>

        {/* Hero Subtitle */}
        <div className="space-y-2">
          <Label htmlFor="heroSubtitle" className="text-sm font-semibold">Sous-titre</Label>
          <Textarea
            id="heroSubtitle"
            value={formData.heroSubtitle}
            onChange={(e) => updateField('heroSubtitle', e.target.value)}
            placeholder="Découvrez notre collection unique"
            className="bg-background/50 border-border/50 focus:border-blue-500/50 resize-none"
            rows={2}
          />
        </div>

        {/* Hero Button */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="heroButtonText" className="text-sm font-semibold">Texte du bouton</Label>
            <Input
              id="heroButtonText"
              value={formData.heroButtonText}
              onChange={(e) => updateField('heroButtonText', e.target.value)}
              placeholder="Voir la Collection"
              className="h-10 bg-background/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroButtonLink" className="text-sm font-semibold">Lien</Label>
            <Input
              id="heroButtonLink"
              value={formData.heroButtonLink}
              onChange={(e) => updateField('heroButtonLink', e.target.value)}
              placeholder="#products"
              className="h-10 bg-background/50 border-border/50"
            />
          </div>
        </div>

        {/* Hero Layout */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Alignement du contenu</Label>
          <div className="grid grid-cols-3 gap-2">
            {(['left', 'center', 'right'] as const).map((layout) => (
              <Button
                key={layout}
                type="button"
                variant={formData.heroLayout === layout ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateField('heroLayout', layout)}
                className={`h-10 ${formData.heroLayout === layout ? 'shadow-md' : ''}`}
              >
                {layout === 'left' ? 'Gauche' : layout === 'center' ? 'Centre' : 'Droite'}
              </Button>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default HeroSection;
