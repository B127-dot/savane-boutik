import { ShoppingBag, Layout } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { EditorSectionProps } from './types';

export function ProductsSection({ formData, updateField }: EditorSectionProps) {
  return (
    <>
      {/* Products Section */}
      <AccordionItem value="products" className="border-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-purple-500/0 overflow-hidden">
        <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-purple-500/5 transition-colors rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="font-semibold text-base">Section Produits</span>
              <p className="text-xs text-muted-foreground">Titre, disposition, colonnes</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 space-y-5">
          {/* Title & Subtitle */}
          <div className="space-y-2">
            <Label htmlFor="productsTitle" className="text-sm font-semibold">Titre de la section</Label>
            <Input
              id="productsTitle"
              value={formData.productsTitle}
              onChange={(e) => updateField('productsTitle', e.target.value)}
              placeholder="Nos Produits"
              className="h-11 bg-background/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productsSubtitle" className="text-sm font-semibold">Sous-titre</Label>
            <Input
              id="productsSubtitle"
              value={formData.productsSubtitle}
              onChange={(e) => updateField('productsSubtitle', e.target.value)}
              placeholder="Une sélection choisie avec soin"
              className="h-11 bg-background/50 border-border/50"
            />
          </div>

          {/* Layout */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Disposition</Label>
            <Select
              value={formData.productsLayout}
              onValueChange={(value: 'grid' | 'list' | 'carousel') => updateField('productsLayout', value)}
            >
              <SelectTrigger className="h-11 bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="grid">Grille</SelectItem>
                <SelectItem value="list">Liste</SelectItem>
                <SelectItem value="carousel">Carrousel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products per row */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Produits par ligne (desktop)</Label>
            <div className="grid grid-cols-3 gap-2">
              {([2, 3, 4] as const).map((num) => (
                <Button
                  key={num}
                  type="button"
                  variant={formData.productsPerRow === num ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateField('productsPerRow', num)}
                  className={`h-10 ${formData.productsPerRow === num ? 'bg-purple-500 hover:bg-purple-600 shadow-md' : ''}`}
                >
                  {num} colonnes
                </Button>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Collections Section */}
      <AccordionItem value="collections" className="border-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-500/0 overflow-hidden">
        <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-orange-500/5 transition-colors rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="font-semibold text-base">Collections</span>
              <p className="text-xs text-muted-foreground">Afficher les catégories</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
            <div className="flex items-center gap-3">
              <Layout className="w-5 h-5 text-orange-500" />
              <Label className="text-sm font-medium cursor-pointer">Afficher les collections</Label>
            </div>
            <Switch
              checked={formData.showCollections}
              onCheckedChange={(checked) => updateField('showCollections', checked)}
            />
          </div>

          {formData.showCollections && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <Label htmlFor="collectionsTitle" className="text-sm font-semibold">Titre</Label>
              <Input
                id="collectionsTitle"
                value={formData.collectionsTitle}
                onChange={(e) => updateField('collectionsTitle', e.target.value)}
                placeholder="Collections"
                className="h-11 bg-background/50 border-border/50"
              />
            </motion.div>
          )}
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

export default ProductsSection;
