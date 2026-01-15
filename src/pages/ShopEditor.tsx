import { useState, useEffect, useMemo } from 'react';
import { useApp, TrustBarItem, PromoBanner, CustomBlock } from '@/contexts/AppContext';
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
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from '@/components/ImageUploader';
import DraggableSectionManager, { SectionConfig } from '@/components/shop/DraggableSectionManager';
import BlockLibraryModal from '@/components/shop/BlockLibraryModal';
import ThemeSelector from '@/components/ThemeSelector';

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
  Circle,
  Globe,
  Search,
  Share2,
  MessageCircle,
  Copy,
  CheckCircle2,
  Store,
  MapPin,
  Layers,
  Settings2,
  Megaphone,
  Tag,
  Sparkle,
  LayoutGrid,
  SlidersHorizontal,
  Loader2
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
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  
  // Phase 4: Custom blocks state
  const [customBlocks, setCustomBlocks] = useState<CustomBlock[]>([]);
  const [blockLibraryOpen, setBlockLibraryOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<CustomBlock | undefined>(undefined);

  // Form state
  const [formData, setFormData] = useState({
    // Thème de boutique
    selectedTheme: 'modern',
    // Identité
    shopName: '',
    logo: '',
    favicon: '',
    description: '',
    shopUrl: '',
    // Contact & Réseaux
    phone: '',
    address: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    // SEO
    seoTitle: '',
    seoDescription: '',
    socialImage: '',
    // Design
    colorPalette: 'default',
    fontFamily: 'inter' as 'inter' | 'lora' | 'poppins' | 'switzer' | 'playfair',
    buttonStyle: 'rounded' as 'rounded' | 'pill' | 'square',
    headerStyle: 'classic' as 'classic' | 'gradient' | 'minimal' | 'glass',
    // Phase 3: Personnalisation Fine
    sectionSpacing: 'normal' as 'compact' | 'normal' | 'airy',
    cardBorderRadius: 'medium' as 'none' | 'light' | 'medium' | 'strong',
    animationsEnabled: true,
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
    // Phase 2: Section Visibility
    showHero: true,
    showTrustBar: true,
    showProducts: true,
    showMarquee: true,
    showNewArrivals: true,
    // Phase 2: Section Order
    sectionOrder: ['hero', 'trustBar', 'newArrivals', 'categories', 'products', 'newsletter'] as string[],
    // Phase 2: Promo Banner
    promoBanner: {
      enabled: false,
      text: '',
      backgroundColor: '#10B981',
      textColor: '#FFFFFF',
      link: '',
      position: 'top' as 'top' | 'below-hero',
    } as PromoBanner,
  });

  // Load settings
  useEffect(() => {
    if (shopSettings) {
      setFormData({
        // Thème de boutique
        selectedTheme: shopSettings.selectedTheme || 'modern',
        // Identité
        shopName: shopSettings.shopName || '',
        logo: shopSettings.logo || '',
        favicon: shopSettings.favicon || '',
        description: shopSettings.description || '',
        shopUrl: shopSettings.shopUrl || '',
        // Contact & Réseaux
        phone: shopSettings.phone || '',
        address: shopSettings.address || '',
        whatsapp: shopSettings.socialLinks?.whatsapp || '',
        facebook: shopSettings.socialLinks?.facebook || '',
        instagram: shopSettings.socialLinks?.instagram || '',
        tiktok: shopSettings.socialLinks?.tiktok || '',
        // SEO
        seoTitle: shopSettings.seoTitle || '',
        seoDescription: shopSettings.seoDescription || '',
        socialImage: shopSettings.socialImage || '',
        // Design
        colorPalette: shopSettings.colorPalette || 'default',
        fontFamily: shopSettings.fontFamily || 'inter',
        buttonStyle: shopSettings.buttonStyle || 'rounded',
        headerStyle: shopSettings.headerStyle || 'classic',
        // Phase 3: Personnalisation Fine
        sectionSpacing: shopSettings.sectionSpacing || 'normal',
        cardBorderRadius: shopSettings.cardBorderRadius || 'medium',
        animationsEnabled: shopSettings.animationsEnabled ?? true,
        // Hero
        heroImage: shopSettings.heroImage || '',
        heroTitle: shopSettings.heroTitle || 'Bienvenue dans notre boutique',
        heroSubtitle: shopSettings.heroSubtitle || 'Découvrez notre collection unique',
        heroButtonText: shopSettings.heroButtonText || 'Voir la Collection',
        heroButtonLink: shopSettings.heroButtonLink || '#products',
        heroLayout: shopSettings.heroLayout || 'center',
        // Trust Bar
        trustBar: shopSettings.trustBar || DEFAULT_TRUST_BAR,
        // Products
        productsTitle: shopSettings.productsTitle || 'Nos Produits',
        productsSubtitle: shopSettings.productsSubtitle || 'Une sélection choisie avec soin',
        productsLayout: shopSettings.productsLayout || 'grid',
        productsPerRow: shopSettings.productsPerRow || 3,
        // Collections
        showCollections: shopSettings.showCollections ?? true,
        collectionsTitle: shopSettings.collectionsTitle || 'Collections',
        // Footer
        aboutText: shopSettings.aboutText || '',
        showNewsletter: shopSettings.showNewsletter ?? true,
        newsletterTitle: shopSettings.newsletterTitle || 'Restez informé',
        newsletterSubtitle: shopSettings.newsletterSubtitle || 'Recevez nos offres exclusives',
        // Phase 2: Section Visibility
        showHero: shopSettings.showHero ?? true,
        showTrustBar: shopSettings.showTrustBar ?? true,
        showProducts: shopSettings.showProducts ?? true,
        showMarquee: shopSettings.showMarquee ?? true,
        showNewArrivals: shopSettings.showNewArrivals ?? true,
        // Phase 2: Section Order
        sectionOrder: shopSettings.sectionOrder || ['hero', 'trustBar', 'newArrivals', 'categories', 'products', 'newsletter'],
        // Phase 2: Promo Banner
        promoBanner: shopSettings.promoBanner || {
          enabled: false,
          text: '',
          backgroundColor: '#10B981',
          textColor: '#FFFFFF',
          link: '',
          position: 'top',
        },
      });
      // Load custom blocks
      setCustomBlocks(shopSettings.customBlocks || []);
    }
  }, [shopSettings]);

  const updateField = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  // Preview URL for live iframe
  const previewUrl = useMemo(() => {
    const baseUrl = `/shop/${shopSettings?.shopUrl || 'ma-boutique'}`;
    const params = new URLSearchParams();
    params.set('previewTheme', formData.selectedTheme);
    params.set('previewMode', 'editor');
    return `${baseUrl}?${params.toString()}`;
  }, [shopSettings?.shopUrl, formData.selectedTheme]);

  // Reload preview when theme changes
  useEffect(() => {
    setIsPreviewLoading(true);
    setPreviewKey(prev => prev + 1);
  }, [formData.selectedTheme]);

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

  // Section order management
  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const currentOrder = [...formData.sectionOrder];
    const index = currentOrder.indexOf(sectionId);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= currentOrder.length) return;
    
    [currentOrder[index], currentOrder[newIndex]] = [currentOrder[newIndex], currentOrder[index]];
    updateField('sectionOrder', currentOrder);
  };

  const handleToggleSectionVisibility = (sectionId: string, visible: boolean) => {
    switch (sectionId) {
      case 'hero':
        updateField('showHero', visible);
        break;
      case 'trustBar':
        updateField('showTrustBar', visible);
        break;
      case 'newArrivals':
        updateField('showNewArrivals', visible);
        break;
      case 'categories':
        updateField('showCollections', visible);
        break;
      case 'products':
        updateField('showProducts', visible);
        break;
      case 'newsletter':
        updateField('showNewsletter', visible);
        break;
      case 'marquee':
        updateField('showMarquee', visible);
        break;
    }
  };

  const getSectionVisibility = (sectionId: string): boolean => {
    switch (sectionId) {
      case 'hero': return formData.showHero;
      case 'trustBar': return formData.showTrustBar;
      case 'newArrivals': return formData.showNewArrivals;
      case 'categories': return formData.showCollections;
      case 'products': return formData.showProducts;
      case 'newsletter': return formData.showNewsletter;
      case 'marquee': return formData.showMarquee;
      default: return true;
    }
  };

  // Block type icons mapping
  const getBlockIcon = (blockType: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      testimonials: <Star className="w-4 h-4" />,
      instagram: <Image className="w-4 h-4" />,
      faq: <MessageCircle className="w-4 h-4" />,
      youtube: <Zap className="w-4 h-4" />,
      textImage: <Layout className="w-4 h-4" />,
    };
    return icons[blockType] || <Layers className="w-4 h-4" />;
  };

  const sectionConfigs: SectionConfig[] = formData.sectionOrder.map(id => {
    // Check if it's a custom block
    const customBlock = customBlocks.find(b => b.id === id);
    if (customBlock) {
      return {
        id: customBlock.id,
        name: customBlock.title,
        icon: getBlockIcon(customBlock.type),
        visible: true,
        description: `Bloc ${customBlock.type}`,
        isCustomBlock: true,
        blockType: customBlock.type,
      };
    }

    // Built-in section configs
    const configs: Record<string, { name: string; icon: React.ReactNode; description?: string }> = {
      hero: { name: 'Hero', icon: <Image className="w-4 h-4" />, description: 'Bannière principale' },
      trustBar: { name: 'Barre de Réassurance', icon: <Shield className="w-4 h-4" />, description: 'Points de confiance' },
      newArrivals: { name: 'Nouveautés', icon: <Sparkle className="w-4 h-4" />, description: 'Carrousel produits récents' },
      categories: { name: 'Collections', icon: <LayoutGrid className="w-4 h-4" />, description: 'Catégories de produits' },
      products: { name: 'Tous les Produits', icon: <ShoppingBag className="w-4 h-4" />, description: 'Grille de produits' },
      newsletter: { name: 'Newsletter', icon: <MessageCircle className="w-4 h-4" />, description: 'Inscription email' },
      marquee: { name: 'Marquee', icon: <Zap className="w-4 h-4" />, description: 'Défilement texte (Aesthetique)' },
    };
    return {
      id,
      ...configs[id],
      visible: getSectionVisibility(id),
    };
  });

  // Custom block management
  const handleAddBlock = (block: CustomBlock) => {
    setCustomBlocks(prev => [...prev, block]);
    updateField('sectionOrder', [...formData.sectionOrder, block.id]);
    setBlockLibraryOpen(false);
    setEditingBlock(undefined);
    toast({
      title: "✅ Bloc ajouté",
      description: `Le bloc "${block.title}" a été ajouté à votre page`,
    });
  };

  const handleUpdateBlock = (updatedBlock: CustomBlock) => {
    setCustomBlocks(prev => prev.map(b => b.id === updatedBlock.id ? updatedBlock : b));
    setBlockLibraryOpen(false);
    setEditingBlock(undefined);
    setHasChanges(true);
    toast({
      title: "✅ Bloc mis à jour",
      description: `Le bloc "${updatedBlock.title}" a été modifié`,
    });
  };

  const handleRemoveBlock = (blockId: string) => {
    const block = customBlocks.find(b => b.id === blockId);
    setCustomBlocks(prev => prev.filter(b => b.id !== blockId));
    updateField('sectionOrder', formData.sectionOrder.filter(id => id !== blockId));
    toast({
      title: "🗑️ Bloc supprimé",
      description: block ? `Le bloc "${block.title}" a été supprimé` : "Bloc supprimé",
    });
  };

  const handleEditBlock = (blockId: string) => {
    const block = customBlocks.find(b => b.id === blockId);
    if (block) {
      setEditingBlock(block);
      setBlockLibraryOpen(true);
    }
  };

  const handleBlockModalSave = (block: CustomBlock) => {
    if (editingBlock) {
      handleUpdateBlock(block);
    } else {
      handleAddBlock(block);
    }
  };

  const handleSave = () => {
    updateShopSettings({
      // Thème de boutique
      selectedTheme: formData.selectedTheme,
      // Identité
      shopName: formData.shopName,
      logo: formData.logo,
      favicon: formData.favicon,
      description: formData.description,
      shopUrl: formData.shopUrl,
      // Contact & Réseaux
      phone: formData.phone,
      address: formData.address,
      socialLinks: {
        whatsapp: formData.whatsapp,
        facebook: formData.facebook,
        instagram: formData.instagram,
        tiktok: formData.tiktok,
      },
      // SEO
      seoTitle: formData.seoTitle,
      seoDescription: formData.seoDescription,
      socialImage: formData.socialImage,
      // Design
      colorPalette: formData.colorPalette,
      fontFamily: formData.fontFamily,
      buttonStyle: formData.buttonStyle,
      headerStyle: formData.headerStyle,
      // Phase 3: Personnalisation Fine
      sectionSpacing: formData.sectionSpacing,
      cardBorderRadius: formData.cardBorderRadius,
      animationsEnabled: formData.animationsEnabled,
      // Hero
      heroImage: formData.heroImage,
      heroTitle: formData.heroTitle,
      heroSubtitle: formData.heroSubtitle,
      heroButtonText: formData.heroButtonText,
      heroButtonLink: formData.heroButtonLink,
      heroLayout: formData.heroLayout,
      // Trust Bar
      trustBar: formData.trustBar,
      // Products
      productsTitle: formData.productsTitle,
      productsSubtitle: formData.productsSubtitle,
      productsLayout: formData.productsLayout,
      productsPerRow: formData.productsPerRow,
      // Collections
      showCollections: formData.showCollections,
      collectionsTitle: formData.collectionsTitle,
      // Footer
      aboutText: formData.aboutText,
      showNewsletter: formData.showNewsletter,
      newsletterTitle: formData.newsletterTitle,
      newsletterSubtitle: formData.newsletterSubtitle,
      // Phase 2: Section Visibility
      showHero: formData.showHero,
      showTrustBar: formData.showTrustBar,
      showProducts: formData.showProducts,
      showMarquee: formData.showMarquee,
      showNewArrivals: formData.showNewArrivals,
      // Phase 2: Section Order
      sectionOrder: formData.sectionOrder,
      // Phase 2: Promo Banner
      promoBanner: formData.promoBanner,
      // Phase 4: Custom Blocks
      customBlocks: customBlocks,
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
              <Accordion type="multiple" defaultValue={['identity', 'design', 'hero', 'trust', 'products']} className="space-y-3">
                
                {/* IDENTITÉ Section - NEW */}
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
                        className="h-11 bg-background/50 border-border/50 focus:border-emerald-500/50"
                      />
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
                          className="h-11 rounded-l-none bg-background/50 border-border/50"
                          placeholder="ma-boutique"
                        />
                      </div>
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

                {/* THÈME DE BOUTIQUE Section */}
                <AccordionItem value="theme" className="border-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-violet-500/0 overflow-hidden">
                  <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-violet-500/5 transition-colors rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <span className="font-semibold text-base">Thème de Boutique</span>
                        <p className="text-xs text-muted-foreground">Modern, Artisan, Aesthetique</p>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {formData.selectedTheme}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <ThemeSelector
                      currentTheme={formData.selectedTheme}
                      onThemeChange={(themeId) => {
                        updateField('selectedTheme', themeId);
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>

                {/* CONTACT & RÉSEAUX Section - NEW */}
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
                            className="h-10 bg-background/50 border-border/50"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="instagram" className="text-xs text-muted-foreground">Instagram</Label>
                          <Input
                            id="instagram"
                            value={formData.instagram}
                            onChange={(e) => updateField('instagram', e.target.value)}
                            placeholder="https://instagram.com/maboutique"
                            className="h-10 bg-background/50 border-border/50"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="tiktok" className="text-xs text-muted-foreground">TikTok</Label>
                          <Input
                            id="tiktok"
                            value={formData.tiktok}
                            onChange={(e) => updateField('tiktok', e.target.value)}
                            placeholder="https://tiktok.com/@maboutique"
                            className="h-10 bg-background/50 border-border/50"
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* SEO Section - NEW */}
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
                        className="h-11 bg-background/50 border-border/50"
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
                        className="bg-background/50 border-border/50 resize-none"
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
                        Image de partage social
                      </Label>
                      <ImageUploader
                        images={formData.socialImage ? [formData.socialImage] : []}
                        onChange={(images) => updateField('socialImage', images[0] || '')}
                        maxImages={1}
                      />
                      <p className="text-xs text-muted-foreground">Image affichée lors du partage sur Facebook, WhatsApp, etc. Recommandé : 1200×630px</p>
                    </div>

                    {/* SEO Preview */}
                    <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-2">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Aperçu Google</p>
                      <div className="space-y-1">
                        <p className="text-blue-500 text-base font-medium truncate">
                          {formData.seoTitle || formData.shopName || 'Titre de votre boutique'}
                        </p>
                        <p className="text-xs text-emerald-600">burkeshop.bf/shop/{formData.shopUrl || 'ma-boutique'}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {formData.seoDescription || formData.description || 'Description de votre boutique...'}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Design Section */}
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

                    <Separator />

                    {/* Header Styles */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Layout className="w-4 h-4 text-pink-500" />
                        Style du Header
                      </Label>
                      <p className="text-xs text-muted-foreground">Survolez pour prévisualiser l'animation</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'classic', name: 'Classique', description: 'Simple et efficace' },
                          { id: 'gradient', name: 'Gradient Glow', description: 'Moderne avec effets' },
                          { id: 'minimal', name: 'Minimal Clean', description: 'Épuré et élégant' },
                          { id: 'glass', name: 'Glass Premium', description: 'Glassmorphism chic' },
                        ].map((style) => (
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
                            {/* Animated Header Preview */}
                            <div 
                              className={`w-full h-12 rounded-lg flex items-center px-2 gap-1.5 relative overflow-hidden transition-all duration-300 ${
                                style.id === 'classic' ? 'bg-zinc-900 border border-zinc-700' :
                                style.id === 'gradient' ? 'bg-zinc-900' :
                                style.id === 'minimal' ? 'bg-zinc-900' :
                                'bg-zinc-800/80 backdrop-blur-sm border border-zinc-600/50 ring-1 ring-zinc-500/20'
                              }`}
                            >
                              {/* Logo animation */}
                              <motion.div 
                                className={`w-5 h-5 flex-shrink-0 ${
                                  style.id === 'gradient' ? 'rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]' :
                                  style.id === 'glass' ? 'rounded-md border border-white/20' : 
                                  style.id === 'minimal' ? 'rounded-full border-2 border-white' :
                                  'rounded-md'
                                }`}
                                style={{ 
                                  backgroundColor: style.id === 'gradient' 
                                    ? `linear-gradient(135deg, ${currentPalette.primary}, #3b82f6)` 
                                    : style.id === 'minimal' ? 'transparent' : currentPalette.primary,
                                  background: style.id === 'gradient' 
                                    ? `linear-gradient(135deg, #0ea5e9, #3b82f6)` 
                                    : style.id === 'minimal' ? 'white' : currentPalette.primary
                                }}
                                initial={false}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              />
                              
                              {/* Nav links animation - centered pill for gradient/minimal */}
                              {(style.id === 'gradient' || style.id === 'minimal') && (
                                <motion.div 
                                  className={`flex-1 flex items-center justify-center gap-1 mx-1 py-0.5 px-1.5 rounded-full ${
                                    style.id === 'gradient' ? 'bg-white/10 backdrop-blur-sm' : 'bg-zinc-800 ring-1 ring-zinc-700'
                                  }`}
                                  initial={{ opacity: 0.6 }}
                                  whileHover={{ opacity: 1 }}
                                >
                                  {[...Array(3)].map((_, i) => (
                                    <motion.div 
                                      key={i}
                                      className="h-1 rounded-full bg-zinc-400 group-hover:bg-white transition-colors"
                                      style={{ width: `${12 + i * 4}px` }}
                                      initial={{ scaleX: 0.8 }}
                                      whileHover={{ scaleX: 1, backgroundColor: '#fff' }}
                                      transition={{ delay: i * 0.05 }}
                                    />
                                  ))}
                                </motion.div>
                              )}
                              
                              {/* Nav links for classic/glass - spread */}
                              {(style.id === 'classic' || style.id === 'glass') && (
                                <div className="flex-1 flex items-center gap-2 justify-center">
                                  {[...Array(3)].map((_, i) => (
                                    <motion.div 
                                      key={i}
                                      className="h-1 rounded-full bg-zinc-500 group-hover:bg-zinc-300 transition-colors duration-300"
                                      style={{ width: `${10 + i * 3}px` }}
                                      initial={{ opacity: 0.5 }}
                                      whileHover={{ opacity: 1 }}
                                      transition={{ delay: i * 0.1 }}
                                    />
                                  ))}
                                </div>
                              )}
                              
                              {/* CTA Button animation */}
                              <motion.div 
                                className={`h-4 w-10 flex-shrink-0 ${
                                  style.id === 'gradient' ? 'rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]' :
                                  style.id === 'minimal' ? 'rounded-full' :
                                  style.id === 'glass' ? 'rounded-lg' :
                                  'rounded-md'
                                }`}
                                style={{ 
                                  backgroundColor: style.id === 'minimal' ? '#fff' : currentPalette.primary,
                                  background: style.id === 'gradient' 
                                    ? 'linear-gradient(180deg, #3b82f6, #2563eb)' 
                                    : style.id === 'minimal' ? '#fff' : currentPalette.primary
                                }}
                                whileHover={{ 
                                  scale: 1.1,
                                  boxShadow: style.id === 'gradient' 
                                    ? '0 0 20px rgba(59,130,246,0.6)' 
                                    : style.id === 'glass' 
                                    ? '0 4px 12px rgba(0,0,0,0.3)' 
                                    : 'none'
                                }}
                                transition={{ duration: 0.2 }}
                              />
                              
                              {/* Gradient glow effect on hover */}
                              {style.id === 'gradient' && (
                                <motion.div 
                                  className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 pointer-events-none"
                                  initial={{ x: '-100%', opacity: 0 }}
                                  whileHover={{ x: '100%', opacity: 1 }}
                                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                                />
                              )}
                              
                              {/* Glass reflection effect */}
                              {style.id === 'glass' && (
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-lg" />
                              )}
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

                {/* PHASE 2: Contrôle des Sections */}
                <AccordionItem value="sections" className="border-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-violet-500/0 overflow-hidden">
                  <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-violet-500/5 transition-colors rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                        <Layers className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-base">Sections</span>
                        <p className="text-xs text-muted-foreground">Ordre et visibilité des sections</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-5">
                    <p className="text-sm text-muted-foreground">
                      Glissez-déposez les sections pour les réorganiser. Ajoutez des blocs personnalisés.
                    </p>
                    
                    <DraggableSectionManager
                      sections={sectionConfigs}
                      onReorder={(newOrder) => updateField('sectionOrder', newOrder)}
                      onToggleVisibility={handleToggleSectionVisibility}
                      onAddBlock={() => {
                        setEditingBlock(undefined);
                        setBlockLibraryOpen(true);
                      }}
                      onRemoveBlock={handleRemoveBlock}
                      onEditBlock={handleEditBlock}
                    />
                  </AccordionContent>
                </AccordionItem>

                {/* PHASE 2: Bannière Promotionnelle */}
                <AccordionItem value="promo" className="border-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-orange-500/0 overflow-hidden">
                  <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-orange-500/5 transition-colors rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                        <Megaphone className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-base">Bannière Promo</span>
                        <p className="text-xs text-muted-foreground">Annonces et promotions</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-5">
                    {/* Enable Toggle */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50">
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-orange-500" />
                        <Label className="text-sm font-medium cursor-pointer">Activer la bannière</Label>
                      </div>
                      <Switch
                        checked={formData.promoBanner.enabled}
                        onCheckedChange={(checked) => updateField('promoBanner', { ...formData.promoBanner, enabled: checked })}
                      />
                    </div>

                    {formData.promoBanner.enabled && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4"
                      >
                        {/* Promo Text */}
                        <div className="space-y-2">
                          <Label htmlFor="promoText" className="text-sm font-semibold">Texte de la bannière</Label>
                          <Input
                            id="promoText"
                            value={formData.promoBanner.text}
                            onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, text: e.target.value })}
                            placeholder="🎉 -20% sur tout le site avec le code PROMO20"
                            className="h-11 bg-background/50 border-border/50"
                          />
                        </div>

                        {/* Colors */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">Couleur de fond</Label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={formData.promoBanner.backgroundColor}
                                onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, backgroundColor: e.target.value })}
                                className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                              />
                              <Input
                                value={formData.promoBanner.backgroundColor}
                                onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, backgroundColor: e.target.value })}
                                className="h-10 bg-background/50 border-border/50 font-mono text-sm"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">Couleur du texte</Label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={formData.promoBanner.textColor}
                                onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, textColor: e.target.value })}
                                className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                              />
                              <Input
                                value={formData.promoBanner.textColor}
                                onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, textColor: e.target.value })}
                                className="h-10 bg-background/50 border-border/50 font-mono text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Link */}
                        <div className="space-y-2">
                          <Label htmlFor="promoLink" className="text-sm font-semibold">Lien (optionnel)</Label>
                          <Input
                            id="promoLink"
                            value={formData.promoBanner.link || ''}
                            onChange={(e) => updateField('promoBanner', { ...formData.promoBanner, link: e.target.value })}
                            placeholder="https://..."
                            className="h-11 bg-background/50 border-border/50"
                          />
                        </div>

                        {/* Position */}
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">Position</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['top', 'below-hero'] as const).map((pos) => (
                              <Button
                                key={pos}
                                type="button"
                                variant={formData.promoBanner.position === pos ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateField('promoBanner', { ...formData.promoBanner, position: pos })}
                                className={`h-10 ${formData.promoBanner.position === pos ? 'shadow-md' : ''}`}
                              >
                                {pos === 'top' ? 'Haut de page' : 'Sous le Hero'}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Preview */}
                        <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-2">
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Aperçu</p>
                          <div 
                            className="py-2.5 px-4 text-center text-sm font-medium rounded-lg"
                            style={{ 
                              backgroundColor: formData.promoBanner.backgroundColor, 
                              color: formData.promoBanner.textColor 
                            }}
                          >
                            {formData.promoBanner.text || 'Votre message promo...'}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                {/* PHASE 3: Personnalisation Fine */}
                <AccordionItem value="advanced" className="border-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-indigo-500/0 overflow-hidden">
                  <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-indigo-500/5 transition-colors rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                        <SlidersHorizontal className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-base">Personnalisation Fine</span>
                        <p className="text-xs text-muted-foreground">Espacement, bordures, animations</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-5">
                    {/* Section Spacing */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Layout className="w-4 h-4 text-indigo-500" />
                        Espacement des sections
                      </Label>
                      <p className="text-xs text-muted-foreground">Contrôle l'espace entre les sections</p>
                      <div className="grid grid-cols-3 gap-2">
                        {([
                          { id: 'compact', label: 'Compact', icon: '⊟' },
                          { id: 'normal', label: 'Normal', icon: '⊞' },
                          { id: 'airy', label: 'Aéré', icon: '⬜' },
                        ] as const).map((option) => (
                          <Button
                            key={option.id}
                            type="button"
                            variant={formData.sectionSpacing === option.id ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateField('sectionSpacing', option.id)}
                            className={`h-12 flex-col gap-1 ${formData.sectionSpacing === option.id ? 'shadow-md' : ''}`}
                          >
                            <span className="text-lg">{option.icon}</span>
                            <span className="text-xs">{option.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Card Border Radius */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Circle className="w-4 h-4 text-indigo-500" />
                        Rayon des bordures (cartes)
                      </Label>
                      <p className="text-xs text-muted-foreground">Arrondi des coins des cartes produits</p>
                      <div className="grid grid-cols-4 gap-2">
                        {([
                          { id: 'none', label: 'Aucun', radius: '0' },
                          { id: 'light', label: 'Léger', radius: '4px' },
                          { id: 'medium', label: 'Moyen', radius: '8px' },
                          { id: 'strong', label: 'Fort', radius: '16px' },
                        ] as const).map((option) => (
                          <Button
                            key={option.id}
                            type="button"
                            variant={formData.cardBorderRadius === option.id ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateField('cardBorderRadius', option.id)}
                            className={`h-14 flex-col gap-1 ${formData.cardBorderRadius === option.id ? 'shadow-md' : ''}`}
                          >
                            <div 
                              className="w-6 h-6 border-2 border-current"
                              style={{ borderRadius: option.radius }}
                            />
                            <span className="text-xs">{option.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Animations Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-indigo-500" />
                          <Label className="text-sm font-medium cursor-pointer">Animations</Label>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 ml-8">
                          Désactiver pour améliorer l'accessibilité (respecte prefers-reduced-motion)
                        </p>
                      </div>
                      <Switch
                        checked={formData.animationsEnabled}
                        onCheckedChange={(checked) => updateField('animationsEnabled', checked)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

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

          {/* Preview Frame - Live iframe */}
          <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
            <motion.div 
              layout
              className={`rounded-2xl shadow-2xl shadow-black/10 overflow-hidden border border-border/50 transition-all duration-500 relative ${
                previewMode === 'mobile' ? 'w-[390px]' : 'w-full max-w-[1100px]'
              }`}
              style={{ 
                height: previewMode === 'mobile' ? '750px' : '650px',
              }}
            >
              {/* Loading Overlay */}
              <AnimatePresence>
                {isPreviewLoading && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-background"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Chargement de l'aperçu...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Live Shop Preview iframe */}
              <iframe
                key={previewKey}
                src={previewUrl}
                className="w-full h-full border-0"
                title="Aperçu de la boutique"
                onLoad={() => setIsPreviewLoading(false)}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Block Library Modal */}
      <BlockLibraryModal
        isOpen={blockLibraryOpen}
        onClose={() => {
          setBlockLibraryOpen(false);
          setEditingBlock(undefined);
        }}
        onAddBlock={handleBlockModalSave}
        editingBlock={editingBlock}
      />
    </div>
  );
};

export default ShopEditor;
