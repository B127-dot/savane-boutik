import { useState, useEffect } from 'react';
import { useApp, TrustBarItem } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from '@/components/ImageUploader';
import Sidebar from '@/components/Sidebar';
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
  FootprintsIcon,
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
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const getIconComponent = (iconName: string) => {
    const iconOption = TRUST_BAR_ICONS.find(i => i.value === iconName);
    return iconOption?.icon || Check;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex">
        {/* Editor Sidebar */}
        <div className="w-[420px] border-r border-border bg-card overflow-y-auto">
          <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Éditeur de Boutique</h1>
                  <p className="text-xs text-muted-foreground">Personnalisez chaque section</p>
                </div>
              </div>
            </div>
            
            {/* Save Button */}
            <Button 
              onClick={handleSave} 
              className="w-full mt-3 gap-2"
              disabled={!hasChanges}
            >
              <Save className="w-4 h-4" />
              {hasChanges ? 'Publier les modifications' : 'Tout est à jour'}
              {hasChanges && <Badge variant="secondary" className="ml-2 bg-primary-foreground/20">Non publié</Badge>}
            </Button>
          </div>

          <div className="p-4">
            <Accordion type="multiple" defaultValue={['hero', 'trust', 'products']} className="space-y-3">
              {/* Hero Section Editor */}
              <AccordionItem value="hero" className="border rounded-xl px-4 bg-background/50">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Image className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold">Section Hero</span>
                      <p className="text-xs text-muted-foreground">Image, titre, bouton d'action</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-4">
                  {/* Hero Image */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Image de fond</Label>
                    <ImageUploader
                      images={formData.heroImage ? [formData.heroImage] : []}
                      onChange={(images) => updateField('heroImage', images[0] || '')}
                      maxImages={1}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Format recommandé : 1920x1080px</p>
                  </div>

                  {/* Hero Title */}
                  <div>
                    <Label htmlFor="heroTitle" className="text-sm font-medium">Titre principal</Label>
                    <Input
                      id="heroTitle"
                      value={formData.heroTitle}
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      placeholder="Bienvenue dans notre boutique"
                      className="mt-1"
                    />
                  </div>

                  {/* Hero Subtitle */}
                  <div>
                    <Label htmlFor="heroSubtitle" className="text-sm font-medium">Sous-titre</Label>
                    <Textarea
                      id="heroSubtitle"
                      value={formData.heroSubtitle}
                      onChange={(e) => updateField('heroSubtitle', e.target.value)}
                      placeholder="Découvrez notre collection unique"
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  {/* Hero Button */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="heroButtonText" className="text-sm font-medium">Texte du bouton</Label>
                      <Input
                        id="heroButtonText"
                        value={formData.heroButtonText}
                        onChange={(e) => updateField('heroButtonText', e.target.value)}
                        placeholder="Voir la Collection"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroButtonLink" className="text-sm font-medium">Lien du bouton</Label>
                      <Input
                        id="heroButtonLink"
                        value={formData.heroButtonLink}
                        onChange={(e) => updateField('heroButtonLink', e.target.value)}
                        placeholder="#products"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Hero Layout */}
                  <div>
                    <Label className="text-sm font-medium">Alignement du contenu</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {(['left', 'center', 'right'] as const).map((layout) => (
                        <Button
                          key={layout}
                          type="button"
                          variant={formData.heroLayout === layout ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateField('heroLayout', layout)}
                          className="capitalize"
                        >
                          {layout === 'left' ? 'Gauche' : layout === 'center' ? 'Centre' : 'Droite'}
                        </Button>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Trust Bar Editor */}
              <AccordionItem value="trust" className="border rounded-xl px-4 bg-background/50">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold">Barre de Réassurance</span>
                      <p className="text-xs text-muted-foreground">Points de confiance (max 4)</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-4">
                  <AnimatePresence>
                    {formData.trustBar.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border rounded-lg p-3 bg-card space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                            <span className="text-sm font-medium">Point {index + 1}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTrustBarItem(item.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Icon Selection */}
                        <div>
                          <Label className="text-xs">Icône</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {TRUST_BAR_ICONS.map((iconOption) => {
                              const IconComp = iconOption.icon;
                              return (
                                <Button
                                  key={iconOption.value}
                                  type="button"
                                  variant={item.icon === iconOption.value ? 'default' : 'outline'}
                                  size="icon"
                                  className="h-9 w-9"
                                  onClick={() => updateTrustBarItem(item.id, { icon: iconOption.value as TrustBarItem['icon'] })}
                                >
                                  <IconComp className="w-4 h-4" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs">Titre</Label>
                            <Input
                              value={item.title}
                              onChange={(e) => updateTrustBarItem(item.id, { title: e.target.value })}
                              placeholder="Livraison Rapide"
                              className="mt-1 h-9"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Sous-titre (optionnel)</Label>
                            <Input
                              value={item.subtitle || ''}
                              onChange={(e) => updateTrustBarItem(item.id, { subtitle: e.target.value })}
                              placeholder="Partout au Burkina"
                              className="mt-1 h-9"
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
                      className="w-full gap-2"
                      onClick={addTrustBarItem}
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter un point de confiance
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Products Section Editor */}
              <AccordionItem value="products" className="border rounded-xl px-4 bg-background/50">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold">Section Produits</span>
                      <p className="text-xs text-muted-foreground">Titre, disposition, nombre par ligne</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-4">
                  {/* Title & Subtitle */}
                  <div>
                    <Label htmlFor="productsTitle" className="text-sm font-medium">Titre de la section</Label>
                    <Input
                      id="productsTitle"
                      value={formData.productsTitle}
                      onChange={(e) => updateField('productsTitle', e.target.value)}
                      placeholder="Nos Produits"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="productsSubtitle" className="text-sm font-medium">Sous-titre</Label>
                    <Input
                      id="productsSubtitle"
                      value={formData.productsSubtitle}
                      onChange={(e) => updateField('productsSubtitle', e.target.value)}
                      placeholder="Une sélection choisie avec soin"
                      className="mt-1"
                    />
                  </div>

                  {/* Layout */}
                  <div>
                    <Label className="text-sm font-medium">Disposition</Label>
                    <Select
                      value={formData.productsLayout}
                      onValueChange={(value: 'grid' | 'list' | 'carousel') => updateField('productsLayout', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grille</SelectItem>
                        <SelectItem value="list">Liste</SelectItem>
                        <SelectItem value="carousel">Carrousel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Products per row */}
                  <div>
                    <Label className="text-sm font-medium">Produits par ligne (desktop)</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {([2, 3, 4] as const).map((num) => (
                        <Button
                          key={num}
                          type="button"
                          variant={formData.productsPerRow === num ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateField('productsPerRow', num)}
                        >
                          {num} colonnes
                        </Button>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Collections Section */}
              <AccordionItem value="collections" className="border rounded-xl px-4 bg-background/50">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Layout className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold">Collections</span>
                      <p className="text-xs text-muted-foreground">Afficher les catégories</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Afficher les collections</Label>
                    <Switch
                      checked={formData.showCollections}
                      onCheckedChange={(checked) => updateField('showCollections', checked)}
                    />
                  </div>

                  {formData.showCollections && (
                    <div>
                      <Label htmlFor="collectionsTitle" className="text-sm font-medium">Titre</Label>
                      <Input
                        id="collectionsTitle"
                        value={formData.collectionsTitle}
                        onChange={(e) => updateField('collectionsTitle', e.target.value)}
                        placeholder="Collections"
                        className="mt-1"
                      />
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Footer Section */}
              <AccordionItem value="footer" className="border rounded-xl px-4 bg-background/50">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-500/10 flex items-center justify-center">
                      <Type className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold">Pied de page</span>
                      <p className="text-xs text-muted-foreground">À propos, newsletter</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-4">
                  <div>
                    <Label htmlFor="aboutText" className="text-sm font-medium">Texte "À propos"</Label>
                    <Textarea
                      id="aboutText"
                      value={formData.aboutText}
                      onChange={(e) => updateField('aboutText', e.target.value)}
                      placeholder="Décrivez votre boutique en quelques mots..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Afficher la newsletter</Label>
                    <Switch
                      checked={formData.showNewsletter}
                      onCheckedChange={(checked) => updateField('showNewsletter', checked)}
                    />
                  </div>

                  {formData.showNewsletter && (
                    <>
                      <div>
                        <Label htmlFor="newsletterTitle" className="text-sm font-medium">Titre newsletter</Label>
                        <Input
                          id="newsletterTitle"
                          value={formData.newsletterTitle}
                          onChange={(e) => updateField('newsletterTitle', e.target.value)}
                          placeholder="Restez informé"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newsletterSubtitle" className="text-sm font-medium">Sous-titre newsletter</Label>
                        <Input
                          id="newsletterSubtitle"
                          value={formData.newsletterSubtitle}
                          onChange={(e) => updateField('newsletterSubtitle', e.target.value)}
                          placeholder="Recevez nos offres exclusives"
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-muted/30 flex flex-col">
          {/* Preview Toolbar */}
          <div className="bg-card border-b border-border p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
                className="gap-2"
              >
                <Monitor className="w-4 h-4" />
                Desktop
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
                className="gap-2"
              >
                <Smartphone className="w-4 h-4" />
                Mobile
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(`/shop/${shopSettings?.shopUrl || 'ma-boutique'}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              Ouvrir la boutique
            </Button>
          </div>

          {/* Preview Frame */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
            <div 
              className={`bg-background rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
                previewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full max-w-[1200px] h-full'
              }`}
            >
              <div className="h-full overflow-auto">
                {/* Live Preview */}
                <div className="min-h-full">
                  {/* Preview Hero */}
                  <div 
                    className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
                    style={{ 
                      backgroundImage: formData.heroImage 
                        ? `url(${formData.heroImage})` 
                        : 'linear-gradient(to br, hsl(var(--artisan-charcoal)), hsl(var(--artisan-olive)))'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className={`relative z-10 text-white p-8 ${
                      formData.heroLayout === 'left' ? 'text-left' : 
                      formData.heroLayout === 'right' ? 'text-right' : 'text-center'
                    }`}>
                      <h1 className="text-4xl font-serif font-bold mb-4">
                        {formData.heroTitle || 'Titre de votre boutique'}
                      </h1>
                      <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
                        {formData.heroSubtitle || 'Sous-titre accrocheur'}
                      </p>
                      <Button size="lg" className="bg-white text-black hover:bg-white/90">
                        {formData.heroButtonText || 'Voir la Collection'}
                      </Button>
                    </div>
                  </div>

                  {/* Preview Trust Bar */}
                  <div className="bg-artisan-sand py-6 px-4">
                    <div className={`grid gap-4 ${
                      previewMode === 'mobile' ? 'grid-cols-1' : `grid-cols-${Math.min(formData.trustBar.length, 3)}`
                    }`}>
                      {formData.trustBar.map((item) => {
                        const IconComp = getIconComponent(item.icon);
                        return (
                          <div key={item.id} className="flex items-center justify-center gap-3 text-artisan-charcoal">
                            <IconComp className="w-6 h-6 text-artisan-olive" />
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
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
                      <h2 className="text-2xl font-serif font-bold text-foreground">
                        {formData.productsTitle || 'Nos Produits'}
                      </h2>
                      {formData.productsSubtitle && (
                        <p className="text-muted-foreground mt-2">{formData.productsSubtitle}</p>
                      )}
                    </div>

                    <div className={`grid gap-4 ${
                      previewMode === 'mobile' ? 'grid-cols-2' : `grid-cols-${formData.productsPerRow}`
                    }`}>
                      {[1, 2, 3, 4, 5, 6].slice(0, formData.productsPerRow * 2).map((i) => (
                        <div key={i} className="bg-muted/30 rounded-lg overflow-hidden">
                          <div className="aspect-square bg-muted flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                          </div>
                          <div className="p-3">
                            <p className="font-medium text-sm">Produit exemple {i}</p>
                            <p className="text-primary font-bold">25 000 FCFA</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preview Footer hint */}
                  <div className="bg-muted p-8 text-center text-muted-foreground">
                    <p className="text-sm">Pied de page avec vos informations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopEditor;
