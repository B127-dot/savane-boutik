import { Palette, Type, Layout, Check, Circle } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { COLOR_PALETTES, FONT_OPTIONS, BUTTON_STYLES, HEADER_STYLES } from '@/lib/shopTheme';
import { DesignSectionProps } from './types';

export function DesignSection({ formData, updateField, currentPalette }: DesignSectionProps) {
  return (
    <AccordionItem value="design" className="border-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-pink-500/0 overflow-hidden">
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-pink-500/5 transition-colors rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-base">Design</span>
            <p className="text-xs text-muted-foreground">Couleurs, polices, style</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 space-y-5">
        {/* Color Palettes */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4 text-pink-500" />
            Palette de couleurs
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {COLOR_PALETTES.map((palette) => (
              <motion.button
                key={palette.id}
                type="button"
                onClick={() => updateField('colorPalette', palette.id)}
                className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  formData.colorPalette === palette.id 
                    ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20' 
                    : 'border-border/50 hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex -space-x-1">
                  {palette.colors?.slice(0, 4).map((color, i) => (
                    <div 
                      key={i}
                      className="w-5 h-5 rounded-full border-2 border-background shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium">{palette.name}</span>
                {formData.colorPalette === palette.id && (
                  <motion.div 
                    className="absolute top-1.5 right-1.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-primary-foreground" />
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Font Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Type className="w-4 h-4 text-pink-500" />
            Police d'écriture
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {FONT_OPTIONS.map((font) => (
              <motion.button
                key={font.id}
                type="button"
                onClick={() => updateField('fontFamily', font.id as typeof formData.fontFamily)}
                className={`relative flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                  formData.fontFamily === font.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border/50 hover:border-primary/30'
                } ${font.style}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl font-bold">{font.preview}</span>
                <span className="text-xs">{font.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Button Styles */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Circle className="w-4 h-4 text-pink-500" />
            Style des boutons
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {BUTTON_STYLES.map((style) => (
              <motion.button
                key={style.id}
                type="button"
                onClick={() => updateField('buttonStyle', style.id as typeof formData.buttonStyle)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  formData.buttonStyle === style.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border/50 hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className={`w-12 h-6 flex items-center justify-center text-xs font-medium ${style.class}`}
                  style={{ backgroundColor: currentPalette.primary, color: '#fff' }}
                >
                  Btn
                </div>
                <span className="text-xs">{style.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Header Styles */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Layout className="w-4 h-4 text-pink-500" />
            Style du Header
          </Label>
          <p className="text-xs text-muted-foreground">Survolez pour prévisualiser</p>
          
          <div className="grid grid-cols-2 gap-3">
            {HEADER_STYLES.map((style) => (
              <motion.button
                key={style.id}
                type="button"
                onClick={() => updateField('headerStyle', style.id as typeof formData.headerStyle)}
                className={`group relative flex flex-col items-start gap-2 p-4 rounded-xl border transition-all text-left overflow-hidden ${
                  formData.headerStyle === style.id 
                    ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20' 
                    : 'border-border/50 hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Header Preview */}
                <div 
                  className={`w-full h-12 rounded-lg flex items-center px-2 gap-1.5 relative overflow-hidden transition-all duration-300 ${
                    style.id === 'classic' ? 'bg-zinc-900 border border-zinc-700' :
                    style.id === 'gradient' ? 'bg-zinc-900' :
                    style.id === 'minimal' ? 'bg-zinc-900' :
                    'bg-zinc-800/80 backdrop-blur-sm border border-zinc-600/50'
                  }`}
                >
                  <motion.div 
                    className="w-5 h-5 flex-shrink-0 rounded-md"
                    style={{ backgroundColor: currentPalette.primary }}
                  />
                  <div className="flex-1 flex items-center gap-2 justify-center">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="h-1 rounded-full bg-zinc-500"
                        style={{ width: `${10 + i * 3}px` }}
                      />
                    ))}
                  </div>
                  <div 
                    className="h-4 w-10 flex-shrink-0 rounded-md"
                    style={{ backgroundColor: currentPalette.primary }}
                  />
                </div>
                
                <div className="mt-1">
                  <span className="text-sm font-semibold block">{style.name}</span>
                  <span className="text-xs text-muted-foreground">{style.description}</span>
                </div>
                
                {formData.headerStyle === style.id && (
                  <motion.div 
                    className="absolute top-2 right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default DesignSection;
