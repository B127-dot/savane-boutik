import { useState, useEffect } from 'react';
import { useApp, TrustBarItem } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from '@/components/ImageUploader';

import { 
  Save, 
  Eye, 
  Smartphone, 
  Monitor, 
  Palette, 
  Image, 
  Type, 
  Layout, 
  Shield, 
  ShoppingBag, 
  Truck,
  Phone,
  Star,
  Heart,
  Clock,
  Check,
  Wallet,
  Headphones,
  Plus,
  Trash2,
  GripVertical,
  ExternalLink,
  Sparkles,
  Zap,
  ArrowRight,
  Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Color Palettes - Inspired by Lovable's design tool
const COLOR_PALETTES = [
  { 
    id: 'default', 
    name: 'Défaut', 
    colors: ['#111827', '#6366f1', '#22c55e', '#f59e0b'],
    primary: '#6366f1',
    secondary: '#22c55e',
    accent: '#f59e0b',
    background: '#111827'
  },
  { 
    id: 'glacier', 
    name: 'Glacier', 
    colors: ['#0f172a', '#06b6d4', '#3b82f6', '#8b5cf6'],
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accent: '#8b5cf6',
    background: '#0f172a'
  },
  { 
    id: 'harvest', 
    name: 'Harvest', 
    colors: ['#1c1917', '#f59e0b', '#ea580c', '#dc2626'],
    primary: '#f59e0b',
    secondary: '#ea580c',
    accent: '#dc2626',
    background: '#1c1917'
  },
  { 
    id: 'lavender', 
    name: 'Lavender', 
    colors: ['#1e1b4b', '#a855f7', '#ec4899', '#f43f5e'],
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#f43f5e',
    background: '#1e1b4b'
  },
  { 
    id: 'brutalist', 
    name: 'Brutalist', 
    colors: ['#000000', '#ffffff', '#ff0000', '#ffff00'],
    primary: '#ffffff',
    secondary: '#ff0000',
    accent: '#ffff00',
    background: '#000000'
  },
  { 
    id: 'obsidian', 
    name: 'Obsidian', 
    colors: ['#09090b', '#71717a', '#a1a1aa', '#e4e4e7'],
    primary: '#71717a',
    secondary: '#a1a1aa',
    accent: '#e4e4e7',
    background: '#09090b'
  },
  { 
    id: 'orchid', 
    name: 'Orchid', 
    colors: ['#14040d', '#db2777', '#f472b6', '#fce7f3'],
    primary: '#db2777',
    secondary: '#f472b6',
    accent: '#fce7f3',
    background: '#14040d'
  },
  { 
    id: 'solar', 
    name: 'Solar', 
    colors: ['#1a1302', '#fbbf24', '#f59e0b', '#d97706'],
    primary: '#fbbf24',
    secondary: '#f59e0b',
    accent: '#d97706',
    background: '#1a1302'
  },
  { 
    id: 'tide', 
    name: 'Tide', 
    colors: ['#042f2e', '#14b8a6', '#2dd4bf', '#5eead4'],
    primary: '#14b8a6',
    secondary: '#2dd4bf',
    accent: '#5eead4',
    background: '#042f2e'
  },
  { 
    id: 'verdant', 
    name: 'Verdant', 
    colors: ['#052e16', '#22c55e', '#4ade80', '#86efac'],
    primary: '#22c55e',
    secondary: '#4ade80',
    accent: '#86efac',
    background: '#052e16'
  },
];

// Font options
const FONT_OPTIONS = [
  { id: 'inter', name: 'Inter', preview: 'Aa', style: 'font-sans' },
  { id: 'switzer', name: 'Switzer', preview: 'Aa', style: 'font-switzer' },
  { id: 'lora', name: 'Lora', preview: 'Aa', style: 'font-serif' },
  { id: 'poppins', name: 'Poppins', preview: 'Aa', style: 'font-poppins' },
  { id: 'playfair', name: 'Playfair', preview: 'Aa', style: 'font-playfair' },
];

// Button styles
const BUTTON_STYLES = [
  { id: 'rounded', name: 'Arrondi', class: 'rounded-lg' },
  { id: 'pill', name: 'Pilule', class: 'rounded-full' },
  { id: 'square', name: 'Carré', class: 'rounded-none' },
];

// Icon options for trust bar
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

const DEFAULT_TRUST_BAR: TrustBarItem[] = [
  { id: '1', icon: 'wallet', title: 'Paiement Mobile Sécurisé', subtitle: 'Orange Money, Wave, Moov' },
  { id: '2', icon: 'truck', title: 'Livraison Rapide', subtitle: 'Partout au Burkina' },
  { id: '3', icon: 'headphones', title: 'Support 7j/7', subtitle: 'WhatsApp & Appel' },
];

const ShopEditor = () => {
  const { shopSettings, updateShopSettings, products } = useApp();
  const { toast } = useToast();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [hasChanges, setHasChanges] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Design
    colorPalette: 'default',
    fontFamily: 'inter' as 'inter' | 'lora' | 'poppins' | 'switzer' | 'playfair',
    buttonStyle: 'rounded' as 'rounded' | 'pill' | 'square',
    // Hero
    heroImage: '',
    heroTitle: '',
    heroSubtitle: '',
    heroButtonText: '',
    heroButtonLink: '',
    heroLayout: 'center' as 'left' | 'center' | 'right',
    // Trust Bar
    trustBar: DEFAULT_TRUST_BAR,
    // Products
    productsTitle: '',
    productsSubtitle: '',
    productsLayout: 'grid' as 'grid' | 'list' | 'carousel',
    productsPerRow: 3 as 2 | 3 | 4,
    // Collections
    showCollections: true,
    collectionsTitle: '',
    // Footer
    aboutText: '',
    showNewsletter: true,
    newsletterTitle: '',
    newsletterSubtitle: '',
  });

  // Load settings
  useEffect(() => {
    if (shopSettings) {
      setFormData({
        colorPalette: shopSettings.colorPalette || 'default',
        fontFamily: shopSettings.fontFamily || 'inter',
        buttonStyle: shopSettings.buttonStyle || 'rounded',
        heroImage: shopSettings.heroImage || '',
        heroTitle: shopSettings.heroTitle || 'Bienvenue dans notre boutique',
        heroSubtitle: shopSettings.heroSubtitle || 'Découvrez notre collection unique',
        heroButtonText: shopSettings.heroButtonText || 'Voir la Collection',
        heroButtonLink: shopSettings.heroButtonLink || '#products',
        heroLayout: shopSettings.heroLayout || 'center',
        trustBar: shopSettings.trustBar || DEFAULT_TRUST_BAR,
        productsTitle: shopSettings.productsTitle || 'Nos Produits',
        productsSubtitle: shopSettings.productsSubtitle || 'Une sélection choisie avec soin',
        productsLayout: shopSettings.productsLayout || 'grid',
        productsPerRow: shopSettings.productsPerRow || 3,
        showCollections: shopSettings.showCollections ?? true,
        collectionsTitle: shopSettings.collectionsTitle || 'Collections',
        aboutText: shopSettings.aboutText || '',
        showNewsletter: shopSettings.showNewsletter ?? true,
        newsletterTitle: shopSettings.newsletterTitle || 'Restez informé',
        newsletterSubtitle: shopSettings.newsletterSubtitle || 'Recevez nos offres exclusives',
      });
    }
  }, [shopSettings]);

  const updateField = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  // Trust bar management
  const addTrustBarItem = () => {
    const newItem: TrustBarItem = {
      id: Date.now().toString(),
      icon: 'check',
      title: 'Nouveau point',
      subtitle: '',
    };
    updateField('trustBar', [...formData.trustBar, newItem]);
  };

  const updateTrustBarItem = (id: string, updates: Partial<TrustBarItem>) => {
    updateField('trustBar', formData.trustBar.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeTrustBarItem = (id: string) => {
    updateField('trustBar', formData.trustBar.filter(item => item.id !== id));
  };

  const handleSave = () => {
    updateShopSettings({
      colorPalette: formData.colorPalette,
      fontFamily: formData.fontFamily,
      buttonStyle: formData.buttonStyle,
      heroImage: formData.heroImage,
      heroTitle: formData.heroTitle,
      heroSubtitle: formData.heroSubtitle,
      heroButtonText: formData.heroButtonText,
      heroButtonLink: formData.heroButtonLink,
      heroLayout: formData.heroLayout,
      trustBar: formData.trustBar,
      productsTitle: formData.productsTitle,
      productsSubtitle: formData.productsSubtitle,
      productsLayout: formData.productsLayout,
      productsPerRow: formData.productsPerRow,
      showCollections: formData.showCollections,
      collectionsTitle: formData.collectionsTitle,
      aboutText: formData.aboutText,
      showNewsletter: formData.showNewsletter,
      newsletterTitle: formData.newsletterTitle,
      newsletterSubtitle: formData.newsletterSubtitle,
    });

    setHasChanges(false);
    toast({
      title: "✨ Modifications enregistrées",
      description: "Votre boutique a été mise à jour avec succès",
    });
  };

  // Get current palette colors for preview
  const currentPalette = COLOR_PALETTES.find(p => p.id === formData.colorPalette) || COLOR_PALETTES[0];
  const currentButtonStyle = BUTTON_STYLES.find(s => s.id === formData.buttonStyle) || BUTTON_STYLES[0];

  const getIconComponent = (iconName: string) => {
    const iconOption = TRUST_BAR_ICONS.find(i => i.value === iconName);
    return iconOption?.icon || Check;
  };

  return (
    <div className="flex min-h-screen bg-background w-full -m-6">
      <main className="flex-1 flex min-h-screen">
        {/* Editor Sidebar - Premium Design */}
        <div className="w-[400px] border-r border-border bg-gradient-to-b from-card to-card/95 flex flex-col">
          {/* Header with gradient accent */}
          <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-border">
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25">
                  <Palette className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Éditeur Visuel</h1>
                  <p className="text-sm text-muted-foreground">Personnalisez votre boutique</p>
                </div>
              </div>
              
              {/* Save Button - Premium style */}
              <motion.div
                animate={hasChanges ? { scale: [1, 1.02, 1] } : {}}
                transition={{ repeat: hasChanges ? Infinity : 0, duration: 2 }}
              >
                <Button 
                  onClick={handleSave} 
                  className={`w-full h-12 text-base font-semibold gap-2 transition-all duration-300 ${
                    hasChanges 
                      ? 'bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                  disabled={!hasChanges}
                >
                  {hasChanges ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Publier les modifications
                      <Badge variant="secondary" className="ml-2 bg-primary-foreground/20 text-primary-foreground text-xs">
                        Non publié
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Tout est à jour
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Scrollable Editor Content */}
          <ScrollArea className="flex-1">
            <div className="p-5 space-y-4">
              <Accordion type="multiple" defaultValue={['design', 'hero', 'trust', 'products']} className="space-y-3">
                {/* Design Section - NEW */}
                <AccordionItem value="design" className="border-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-pink-500/0 overflow-hidden">
                  <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-pink-500/5 transition-colors rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
                        <Palette className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-base">Design Global</span>
                        <p className="text-xs text-muted-foreground">Couleurs, typographie, boutons</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-6">
                    {/* Color Palettes */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Palette className="w-4 h-4 text-pink-500" />
                        Palette de couleurs
                      </Label>
                      <p className="text-xs text-muted-foreground">Choisissez un thème de couleurs pour votre boutique</p>
                      
                      {/* Current Theme Indicator */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex gap-1">
                          {currentPalette.colors.map((color, i) => (
                            <div 
                              key={i} 
                              className="w-5 h-5 rounded-full border-2 border-background shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">Thème actuel</span>
                      </div>

                      {/* Palette Grid */}
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Thèmes disponibles</p>
                        <div className="grid gap-2">
                          {COLOR_PALETTES.map((palette) => (
                            <motion.button
                              key={palette.id}
                              type="button"
                              onClick={() => updateField('colorPalette', palette.id)}
                              className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left w-full ${
                                formData.colorPalette === palette.id 
                                  ? 'border-primary bg-primary/5 shadow-md' 
                                  : 'border-border/50 hover:border-primary/30 hover:bg-muted/30'
                              }`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className="flex gap-0.5">
                                {palette.colors.map((color, i) => (
                                  <div 
                                    key={i} 
                                    className="w-4 h-4 rounded-full first:rounded-l-full last:rounded-r-full border border-white/20"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium flex-1">{palette.name}</span>
                              {formData.colorPalette === palette.id && (
                                <Check className="w-4 h-4 text-primary" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Typography */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Type className="w-4 h-4 text-pink-500" />
                        Typographie
                      </Label>
                      <p className="text-xs text-muted-foreground">Police de caractères principale</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {FONT_OPTIONS.map((font) => (
                          <motion.button
                            key={font.id}
                            type="button"
                            onClick={() => updateField('fontFamily', font.id as typeof formData.fontFamily)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                              formData.fontFamily === font.id 
                                ? 'border-primary bg-primary/5 shadow-md' 
                                : 'border-border/50 hover:border-primary/30'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className={`text-2xl font-bold ${font.style}`}>{font.preview}</span>
                            <span className="text-xs font-medium">{font.name}</span>
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
                      <p className="text-xs text-muted-foreground">Apparence des boutons d'action</p>
                      
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
                              className={`w-full h-8 ${style.class}`}
                              style={{ backgroundColor: currentPalette.primary }}
                            />
                            <span className="text-xs font-medium">{style.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Hero Section Editor */}
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
                        className="h-11 bg-background/50 border-border/50 focus:border-blue-500/50"
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

                {/* Trust Bar Editor */}
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

                          {/* Icon Selection - Compact grid */}
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

                {/* Products Section Editor */}
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

                {/* Footer Section */}
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
              </Accordion>
            </div>
          </ScrollArea>
        </div>

        {/* Preview Area - Enhanced */}
        <div className="flex-1 bg-muted/20 flex flex-col">
          {/* Preview Toolbar */}
          <div className="bg-card/80 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
                className={`gap-2 rounded-lg ${previewMode === 'desktop' ? 'shadow-md' : ''}`}
              >
                <Monitor className="w-4 h-4" />
                Desktop
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
                className={`gap-2 rounded-lg ${previewMode === 'mobile' ? 'shadow-md' : ''}`}
              >
                <Smartphone className="w-4 h-4" />
                Mobile
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-primary/5 hover:border-primary/30"
              onClick={() => window.open(`/shop/${shopSettings?.shopUrl || 'ma-boutique'}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              Ouvrir la boutique
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>

          {/* Preview Frame */}
          <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
            <motion.div 
              layout
              className={`rounded-2xl shadow-2xl shadow-black/10 overflow-hidden border border-border/50 transition-all duration-500 ${
                previewMode === 'mobile' ? 'w-[390px]' : 'w-full max-w-[1100px]'
              }`}
              style={{ 
                minHeight: previewMode === 'mobile' ? '700px' : '600px',
                backgroundColor: currentPalette.background,
                color: currentPalette.primary
              }}
            >
              <div className="h-full overflow-auto">
                {/* Live Preview */}
                <div className="min-h-full">
                  {/* Preview Hero */}
                  <div 
                    className="relative h-[380px] bg-cover bg-center flex items-center justify-center"
                    style={{ 
                      backgroundImage: formData.heroImage 
                        ? `url(${formData.heroImage})` 
                        : `linear-gradient(135deg, ${currentPalette.background} 0%, ${currentPalette.primary}20 100%)`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
                    <div className={`relative z-10 text-white px-8 py-12 ${
                      formData.heroLayout === 'left' ? 'text-left self-start' : 
                      formData.heroLayout === 'right' ? 'text-right self-end' : 'text-center'
                    }`}>
                      <motion.h1 
                        key={formData.heroTitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold mb-4 drop-shadow-lg"
                        style={{ fontFamily: formData.fontFamily === 'playfair' ? 'Playfair Display, serif' : formData.fontFamily === 'lora' ? 'Lora, serif' : 'inherit' }}
                      >
                        {formData.heroTitle || 'Titre de votre boutique'}
                      </motion.h1>
                      <motion.p 
                        key={formData.heroSubtitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg opacity-95 mb-6 max-w-xl mx-auto drop-shadow"
                      >
                        {formData.heroSubtitle || 'Sous-titre accrocheur'}
                      </motion.p>
                      <Button 
                        size="lg" 
                        className={`shadow-lg font-semibold ${currentButtonStyle.class}`}
                        style={{ 
                          backgroundColor: currentPalette.primary,
                          color: currentPalette.background
                        }}
                      >
                        {formData.heroButtonText || 'Voir la Collection'}
                      </Button>
                    </div>
                  </div>

                  {/* Preview Trust Bar */}
                  <div 
                    className="py-5 px-6 border-y"
                    style={{ 
                      backgroundColor: `${currentPalette.primary}10`,
                      borderColor: `${currentPalette.primary}20`
                    }}
                  >
                    <div className={`grid gap-6 ${
                      previewMode === 'mobile' ? 'grid-cols-1' : 
                      formData.trustBar.length === 1 ? 'grid-cols-1' :
                      formData.trustBar.length === 2 ? 'grid-cols-2' :
                      formData.trustBar.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
                    }`}>
                      {formData.trustBar.map((item) => {
                        const IconComp = getIconComponent(item.icon);
                        return (
                          <div key={item.id} className="flex items-center justify-center gap-3" style={{ color: '#fff' }}>
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${currentPalette.primary}20` }}
                            >
                              <IconComp className="w-5 h-5" style={{ color: currentPalette.primary }} />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{item.title}</p>
                              {item.subtitle && (
                                <p className="text-xs opacity-70">{item.subtitle}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preview Products Section */}
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <motion.h2 
                        key={formData.productsTitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl font-bold"
                        style={{ 
                          color: '#fff',
                          fontFamily: formData.fontFamily === 'playfair' ? 'Playfair Display, serif' : formData.fontFamily === 'lora' ? 'Lora, serif' : 'inherit'
                        }}
                      >
                        {formData.productsTitle || 'Nos Produits'}
                      </motion.h2>
                      {formData.productsSubtitle && (
                        <p className="mt-2" style={{ color: `${currentPalette.primary}` }}>{formData.productsSubtitle}</p>
                      )}
                    </div>

                    <div className={`grid gap-4 ${
                      previewMode === 'mobile' ? 'grid-cols-2' : `grid-cols-${formData.productsPerRow}`
                    }`}>
                      {[1, 2, 3, 4, 5, 6].slice(0, formData.productsPerRow * 2).map((i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className={`${currentButtonStyle.class} overflow-hidden border hover:shadow-lg transition-shadow group`}
                          style={{ 
                            backgroundColor: `${currentPalette.primary}08`,
                            borderColor: `${currentPalette.primary}20`
                          }}
                        >
                          <div 
                            className="aspect-square flex items-center justify-center relative overflow-hidden"
                            style={{ backgroundColor: `${currentPalette.primary}10` }}
                          >
                            <ShoppingBag className="w-12 h-12" style={{ color: `${currentPalette.primary}30` }} />
                          </div>
                          <div className="p-4">
                            <p className="font-medium text-sm truncate" style={{ color: '#fff' }}>Produit exemple {i}</p>
                            <p className="font-bold mt-1" style={{ color: currentPalette.primary }}>25 000 FCFA</p>
                            <Button 
                              size="sm" 
                              className={`w-full mt-3 ${currentButtonStyle.class}`}
                              style={{ 
                                backgroundColor: currentPalette.primary,
                                color: currentPalette.background
                              }}
                            >
                              Ajouter
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Preview Footer hint */}
                  <div 
                    className="p-8 text-center border-t"
                    style={{ 
                      backgroundColor: `${currentPalette.primary}05`,
                      borderColor: `${currentPalette.primary}20`
                    }}
                  >
                    <p className="text-sm" style={{ color: `${currentPalette.primary}80` }}>
                      Pied de page • Vos informations de contact
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopEditor;
