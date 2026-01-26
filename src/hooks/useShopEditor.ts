import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useApp, TrustBarItem, PromoBanner, CustomBlock, MarqueeItem, HeroStat, HeroFeature, FooterLink, TestimonialItem } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_TRUST_BAR, DEFAULT_HERO_STATS, DEFAULT_HERO_FEATURES, DEFAULT_MARQUEE_ITEMS, DEFAULT_FOOTER_LINKS, DEFAULT_TESTIMONIALS } from '@/lib/shopTheme';

// ============= ZOD VALIDATION SCHEMA =============
const trustBarItemSchema = z.object({
  id: z.string(),
  icon: z.string(),
  title: z.string().min(1, "Le titre est requis").max(50, "Max 50 caractères"),
  subtitle: z.string().max(100, "Max 100 caractères").optional(),
});

const promoBannerSchema = z.object({
  enabled: z.boolean(),
  text: z.string().max(200, "Max 200 caractères"),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Format couleur invalide"),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Format couleur invalide"),
  link: z.string().url("URL invalide").or(z.literal('')),
  position: z.enum(['top', 'below-hero']),
});

export const shopEditorSchema = z.object({
  shopName: z.string().min(1, "Le nom de la boutique est requis").max(100, "Max 100 caractères"),
  shopUrl: z.string().min(1, "L'URL est requise").max(50, "Max 50 caractères")
    .regex(/^[a-z0-9-]+$/, "Uniquement lettres minuscules, chiffres et tirets"),
  description: z.string().max(500, "Max 500 caractères"),
  logo: z.string(),
  favicon: z.string(),
  phone: z.string().max(20, "Max 20 caractères"),
  address: z.string().max(200, "Max 200 caractères"),
  whatsapp: z.string().max(20, "Max 20 caractères"),
  facebook: z.string().url("URL Facebook invalide").or(z.literal('')),
  instagram: z.string().url("URL Instagram invalide").or(z.literal('')),
  tiktok: z.string().url("URL TikTok invalide").or(z.literal('')),
  seoTitle: z.string().max(60, "Max 60 caractères pour le SEO"),
  seoDescription: z.string().max(160, "Max 160 caractères pour le SEO"),
  socialImage: z.string(),
  heroTitle: z.string().max(100, "Max 100 caractères"),
  heroSubtitle: z.string().max(200, "Max 200 caractères"),
  heroButtonText: z.string().max(30, "Max 30 caractères"),
  heroButtonLink: z.string(),
  productsTitle: z.string().max(100, "Max 100 caractères"),
  productsSubtitle: z.string().max(200, "Max 200 caractères"),
  collectionsTitle: z.string().max(100, "Max 100 caractères"),
  aboutText: z.string().max(500, "Max 500 caractères"),
  newsletterTitle: z.string().max(100, "Max 100 caractères"),
  newsletterSubtitle: z.string().max(200, "Max 200 caractères"),
  trustBar: z.array(trustBarItemSchema).max(5, "Maximum 5 éléments"),
  promoBanner: promoBannerSchema,
});

export type ValidationErrors = Partial<Record<keyof z.infer<typeof shopEditorSchema>, string>>;

const DRAFT_STORAGE_KEY = 'shopEditor_draft';
const DRAFT_TIMESTAMP_KEY = 'shopEditor_draft_timestamp';

export interface ShopEditorFormData {
  selectedTheme: string;
  shopName: string;
  logo: string;
  favicon: string;
  description: string;
  shopUrl: string;
  phone: string;
  address: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  seoTitle: string;
  seoDescription: string;
  socialImage: string;
  colorPalette: string;
  fontFamily: 'inter' | 'lora' | 'poppins' | 'switzer' | 'playfair';
  buttonStyle: 'rounded' | 'pill' | 'square';
  headerStyle: 'classic' | 'gradient' | 'minimal' | 'glass';
  sectionSpacing: 'compact' | 'normal' | 'airy';
  cardBorderRadius: 'none' | 'light' | 'medium' | 'strong';
  animationsEnabled: boolean;
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroLayout: 'left' | 'center' | 'right';
  // Premium Hero
  heroBadgeText: string;
  heroBadgeIcon: 'sparkles' | 'flame' | 'star' | 'zap' | 'gift' | 'trending' | 'none';
  showHeroBadge: boolean;
  heroStats: HeroStat[];
  showHeroStats: boolean;
  heroFeatures: HeroFeature[];
  showHeroFeatures: boolean;
  showScrollIndicator: boolean;
  // Trust Bar
  trustBar: TrustBarItem[];
  // Marquee
  marqueeItems: MarqueeItem[];
  showMarquee: boolean;
  // Products
  productsTitle: string;
  productsSubtitle: string;
  productsLayout: 'grid' | 'list' | 'carousel';
  productsPerRow: 2 | 3 | 4;
  showCollections: boolean;
  collectionsTitle: string;
  // Footer
  aboutText: string;
  footerLinks: FooterLink[];
  showNewsletter: boolean;
  newsletterTitle: string;
  newsletterSubtitle: string;
  // Section visibility
  showHero: boolean;
  showTrustBar: boolean;
  showProducts: boolean;
  showNewArrivals: boolean;
  // Testimonials
  showTestimonials: boolean;
  testimonialsTitle: string;
  testimonialsDescription: string;
  testimonials: TestimonialItem[];
  // Other
  sectionOrder: string[];
  promoBanner: PromoBanner;
}

const getDefaultFormData = (): ShopEditorFormData => ({
  selectedTheme: 'modern',
  shopName: '',
  logo: '',
  favicon: '',
  description: '',
  shopUrl: '',
  phone: '',
  address: '',
  whatsapp: '',
  facebook: '',
  instagram: '',
  tiktok: '',
  seoTitle: '',
  seoDescription: '',
  socialImage: '',
  colorPalette: 'default',
  fontFamily: 'inter',
  buttonStyle: 'rounded',
  headerStyle: 'classic',
  sectionSpacing: 'normal',
  cardBorderRadius: 'medium',
  animationsEnabled: true,
  heroImage: '',
  heroTitle: 'Bienvenue dans notre boutique',
  heroSubtitle: 'Découvrez notre collection unique',
  heroButtonText: 'Voir la Collection',
  heroButtonLink: '#products',
  heroLayout: 'center',
  // Premium Hero defaults
  heroBadgeText: 'Nouvelle Collection',
  heroBadgeIcon: 'sparkles',
  showHeroBadge: true,
  heroStats: DEFAULT_HERO_STATS,
  showHeroStats: true,
  heroFeatures: DEFAULT_HERO_FEATURES,
  showHeroFeatures: true,
  showScrollIndicator: true,
  // Trust Bar
  trustBar: DEFAULT_TRUST_BAR,
  // Marquee
  marqueeItems: DEFAULT_MARQUEE_ITEMS,
  showMarquee: true,
  // Products
  productsTitle: 'Nos Produits',
  productsSubtitle: 'Une sélection choisie avec soin',
  productsLayout: 'grid',
  productsPerRow: 3,
  showCollections: true,
  collectionsTitle: 'Collections',
  // Footer
  aboutText: '',
  footerLinks: DEFAULT_FOOTER_LINKS,
  showNewsletter: true,
  newsletterTitle: 'Restez informé',
  newsletterSubtitle: 'Recevez nos offres exclusives',
  // Visibility
  showHero: true,
  showTrustBar: true,
  showProducts: true,
  showNewArrivals: true,
  // Testimonials
  showTestimonials: true,
  testimonialsTitle: 'Ce que nos clients disent',
  testimonialsDescription: 'Rejoignez des milliers de clients satisfaits à travers le Burkina Faso',
  testimonials: DEFAULT_TESTIMONIALS,
  // Section order - include testimonials
  sectionOrder: ['hero', 'trustBar', 'newArrivals', 'categories', 'products', 'testimonials', 'newsletter'],
  promoBanner: {
    enabled: false,
    text: '',
    backgroundColor: '#10B981',
    textColor: '#FFFFFF',
    link: '',
    position: 'top',
  },
});

export function useShopEditor() {
  const { shopSettings, updateShopSettings, products } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [hasChanges, setHasChanges] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Validation & Draft states
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [hasDraft, setHasDraft] = useState(false);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  
  // Custom blocks state
  const [customBlocks, setCustomBlocks] = useState<CustomBlock[]>([]);
  const [blockLibraryOpen, setBlockLibraryOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<CustomBlock | undefined>(undefined);

  // Form state
  const [formData, setFormData] = useState<ShopEditorFormData>(getDefaultFormData());

  // Load settings from shopSettings
  useEffect(() => {
    if (shopSettings) {
      setFormData({
        selectedTheme: shopSettings.selectedTheme || 'modern',
        shopName: shopSettings.shopName || '',
        logo: shopSettings.logo || '',
        favicon: shopSettings.favicon || '',
        description: shopSettings.description || '',
        shopUrl: shopSettings.shopUrl || '',
        phone: shopSettings.phone || '',
        address: shopSettings.address || '',
        whatsapp: shopSettings.socialLinks?.whatsapp || '',
        facebook: shopSettings.socialLinks?.facebook || '',
        instagram: shopSettings.socialLinks?.instagram || '',
        tiktok: shopSettings.socialLinks?.tiktok || '',
        seoTitle: shopSettings.seoTitle || '',
        seoDescription: shopSettings.seoDescription || '',
        socialImage: shopSettings.socialImage || '',
        colorPalette: shopSettings.colorPalette || 'default',
        fontFamily: shopSettings.fontFamily || 'inter',
        buttonStyle: shopSettings.buttonStyle || 'rounded',
        headerStyle: shopSettings.headerStyle || 'classic',
        sectionSpacing: shopSettings.sectionSpacing || 'normal',
        cardBorderRadius: shopSettings.cardBorderRadius || 'medium',
        animationsEnabled: shopSettings.animationsEnabled ?? true,
        heroImage: shopSettings.heroImage || '',
        heroTitle: shopSettings.heroTitle || 'Bienvenue dans notre boutique',
        heroSubtitle: shopSettings.heroSubtitle || 'Découvrez notre collection unique',
        heroButtonText: shopSettings.heroButtonText || 'Voir la Collection',
        heroButtonLink: shopSettings.heroButtonLink || '#products',
        heroLayout: shopSettings.heroLayout || 'center',
        // Premium Hero
        heroBadgeText: shopSettings.heroBadgeText || 'Nouvelle Collection',
        heroBadgeIcon: shopSettings.heroBadgeIcon || 'sparkles',
        showHeroBadge: shopSettings.showHeroBadge ?? true,
        heroStats: shopSettings.heroStats || DEFAULT_HERO_STATS,
        showHeroStats: shopSettings.showHeroStats ?? true,
        heroFeatures: shopSettings.heroFeatures || DEFAULT_HERO_FEATURES,
        showHeroFeatures: shopSettings.showHeroFeatures ?? true,
        showScrollIndicator: shopSettings.showScrollIndicator ?? true,
        // Trust Bar
        trustBar: shopSettings.trustBar || DEFAULT_TRUST_BAR,
        // Marquee
        marqueeItems: shopSettings.marqueeItems || DEFAULT_MARQUEE_ITEMS,
        showMarquee: shopSettings.showMarquee ?? true,
        // Products
        productsTitle: shopSettings.productsTitle || 'Nos Produits',
        productsSubtitle: shopSettings.productsSubtitle || 'Une sélection choisie avec soin',
        productsLayout: shopSettings.productsLayout || 'grid',
        productsPerRow: shopSettings.productsPerRow || 3,
        showCollections: shopSettings.showCollections ?? true,
        collectionsTitle: shopSettings.collectionsTitle || 'Collections',
        // Footer
        aboutText: shopSettings.aboutText || '',
        footerLinks: shopSettings.footerLinks || DEFAULT_FOOTER_LINKS,
        showNewsletter: shopSettings.showNewsletter ?? true,
        newsletterTitle: shopSettings.newsletterTitle || 'Restez informé',
        newsletterSubtitle: shopSettings.newsletterSubtitle || 'Recevez nos offres exclusives',
        // Visibility
        showHero: shopSettings.showHero ?? true,
        showTrustBar: shopSettings.showTrustBar ?? true,
        showProducts: shopSettings.showProducts ?? true,
        showNewArrivals: shopSettings.showNewArrivals ?? true,
        // Testimonials
        showTestimonials: shopSettings.showTestimonials ?? true,
        testimonialsTitle: shopSettings.testimonialsTitle || 'Ce que nos clients disent',
        testimonialsDescription: shopSettings.testimonialsDescription || 'Rejoignez des milliers de clients satisfaits à travers le Burkina Faso',
        testimonials: shopSettings.testimonials || DEFAULT_TESTIMONIALS,
        // Section order
        sectionOrder: shopSettings.sectionOrder || ['hero', 'trustBar', 'newArrivals', 'categories', 'products', 'testimonials', 'newsletter'],
        promoBanner: shopSettings.promoBanner || getDefaultFormData().promoBanner,
      });
      setCustomBlocks(shopSettings.customBlocks || []);
    }
  }, [shopSettings]);

  // Check for existing draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    const savedTimestamp = localStorage.getItem(DRAFT_TIMESTAMP_KEY);
    
    if (savedDraft && savedTimestamp) {
      const draftTime = new Date(savedTimestamp);
      const now = new Date();
      const hoursDiff = (now.getTime() - draftTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setHasDraft(true);
        setShowDraftDialog(true);
      } else {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
      }
    }
  }, []);

  // Restore draft
  const restoreDraft = useCallback(() => {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(prev => ({ ...prev, ...parsed.formData }));
        if (parsed.customBlocks) {
          setCustomBlocks(parsed.customBlocks);
        }
        setHasChanges(true);
        toast({
          title: "📝 Brouillon restauré",
          description: "Vos modifications précédentes ont été récupérées",
        });
      } catch (e) {
        console.error('Error restoring draft:', e);
      }
    }
    setShowDraftDialog(false);
    setHasDraft(false);
  }, [toast]);

  // Discard draft
  const discardDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
    setShowDraftDialog(false);
    setHasDraft(false);
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!hasChanges) return;

    const saveDraft = () => {
      setIsDraftSaving(true);
      const draftData = {
        formData,
        customBlocks,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftData));
      localStorage.setItem(DRAFT_TIMESTAMP_KEY, new Date().toISOString());
      setLastSavedAt(new Date());
      setTimeout(() => setIsDraftSaving(false), 500);
    };

    const timer = setInterval(saveDraft, 30000);
    return () => clearInterval(timer);
  }, [hasChanges, formData, customBlocks]);

  // Validation
  const validateForm = useCallback((): boolean => {
    const result = shopEditorSchema.safeParse(formData);
    
    if (!result.success) {
      const errors: ValidationErrors = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof ValidationErrors;
        if (path && !errors[path]) {
          errors[path] = err.message;
        }
      });
      setValidationErrors(errors);
      return false;
    }
    
    setValidationErrors({});
    return true;
  }, [formData]);

  // Update field with validation
  const updateField = useCallback(<K extends keyof ShopEditorFormData>(field: K, value: ShopEditorFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof ValidationErrors];
        return newErrors;
      });
    }
  }, [validationErrors]);

  // Browser beforeunload event
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = 'Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter ?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  // Handle internal navigation with confirmation
  const handleNavigateAway = useCallback((path: string) => {
    if (hasChanges) {
      setPendingNavigation(path);
      setShowExitDialog(true);
    } else {
      navigate(path);
    }
  }, [hasChanges, navigate]);

  const confirmNavigation = useCallback(() => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
    setShowExitDialog(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
    }
  }, [navigate, pendingNavigation]);

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

  // Send live preview updates to iframe via postMessage
  const sendPreviewUpdate = useCallback(() => {
    if (!iframeRef.current?.contentWindow) return;
    
    const previewSettings = {
      shopName: formData.shopName,
      logo: formData.logo,
      description: formData.description,
      favicon: formData.favicon,
      colorPalette: formData.colorPalette,
      fontFamily: formData.fontFamily,
      buttonStyle: formData.buttonStyle,
      headerStyle: formData.headerStyle,
      sectionSpacing: formData.sectionSpacing,
      cardBorderRadius: formData.cardBorderRadius,
      heroImage: formData.heroImage,
      heroTitle: formData.heroTitle,
      heroSubtitle: formData.heroSubtitle,
      heroButtonText: formData.heroButtonText,
      heroButtonLink: formData.heroButtonLink,
      heroLayout: formData.heroLayout,
      // Premium Hero
      heroBadgeText: formData.heroBadgeText,
      heroBadgeIcon: formData.heroBadgeIcon,
      showHeroBadge: formData.showHeroBadge,
      heroStats: formData.heroStats,
      showHeroStats: formData.showHeroStats,
      heroFeatures: formData.heroFeatures,
      showHeroFeatures: formData.showHeroFeatures,
      showScrollIndicator: formData.showScrollIndicator,
      // Trust Bar
      trustBar: formData.trustBar,
      // Marquee
      marqueeItems: formData.marqueeItems,
      showMarquee: formData.showMarquee,
      // Products
      productsTitle: formData.productsTitle,
      productsSubtitle: formData.productsSubtitle,
      productsPerRow: formData.productsPerRow,
      productsLayout: formData.productsLayout,
      showCollections: formData.showCollections,
      collectionsTitle: formData.collectionsTitle,
      showHero: formData.showHero,
      showTrustBar: formData.showTrustBar,
      showNewArrivals: formData.showNewArrivals,
      showProducts: formData.showProducts,
      showNewsletter: formData.showNewsletter,
      // Testimonials
      showTestimonials: formData.showTestimonials,
      testimonialsTitle: formData.testimonialsTitle,
      testimonialsDescription: formData.testimonialsDescription,
      testimonials: formData.testimonials,
      sectionOrder: formData.sectionOrder,
      promoBanner: formData.promoBanner,
      socialLinks: {
        whatsapp: formData.whatsapp,
        facebook: formData.facebook,
        instagram: formData.instagram,
        tiktok: formData.tiktok,
      },
      aboutText: formData.aboutText,
      footerLinks: formData.footerLinks,
      phone: formData.phone,
      newsletterTitle: formData.newsletterTitle,
      newsletterSubtitle: formData.newsletterSubtitle,
      animationsEnabled: formData.animationsEnabled,
      customBlocks: customBlocks,
    };
    
    iframeRef.current.contentWindow.postMessage({
      type: 'SHOP_PREVIEW_UPDATE',
      settings: previewSettings,
    }, window.location.origin);
  }, [formData, customBlocks]);

  // Send updates when formData changes
  useEffect(() => {
    const timer = setTimeout(() => {
      sendPreviewUpdate();
    }, 100);
    return () => clearTimeout(timer);
  }, [sendPreviewUpdate]);

  // Trust bar management
  const addTrustBarItem = useCallback(() => {
    const newItem: TrustBarItem = {
      id: Date.now().toString(),
      icon: 'check',
      title: 'Nouveau point',
      subtitle: '',
    };
    updateField('trustBar', [...formData.trustBar, newItem]);
  }, [formData.trustBar, updateField]);

  const updateTrustBarItem = useCallback((id: string, updates: Partial<TrustBarItem>) => {
    updateField('trustBar', formData.trustBar.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, [formData.trustBar, updateField]);

  const removeTrustBarItem = useCallback((id: string) => {
    updateField('trustBar', formData.trustBar.filter(item => item.id !== id));
  }, [formData.trustBar, updateField]);

  // Testimonial management
  const addTestimonial = useCallback(() => {
    const newItem: TestimonialItem = {
      id: Date.now().toString(),
      name: '',
      handle: '',
      avatar: '',
      text: '',
    };
    updateField('testimonials', [...formData.testimonials, newItem]);
  }, [formData.testimonials, updateField]);

  const updateTestimonial = useCallback((id: string, updates: Partial<TestimonialItem>) => {
    updateField('testimonials', formData.testimonials.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, [formData.testimonials, updateField]);

  const removeTestimonial = useCallback((id: string) => {
    updateField('testimonials', formData.testimonials.filter(item => item.id !== id));
  }, [formData.testimonials, updateField]);

  // Section visibility management
  const handleToggleSectionVisibility = useCallback((sectionId: string, visible: boolean) => {
    switch (sectionId) {
      case 'hero': updateField('showHero', visible); break;
      case 'trustBar': updateField('showTrustBar', visible); break;
      case 'newArrivals': updateField('showNewArrivals', visible); break;
      case 'categories': updateField('showCollections', visible); break;
      case 'products': updateField('showProducts', visible); break;
      case 'newsletter': updateField('showNewsletter', visible); break;
      case 'marquee': updateField('showMarquee', visible); break;
      case 'testimonials': updateField('showTestimonials', visible); break;
    }
  }, [updateField]);

  const getSectionVisibility = useCallback((sectionId: string): boolean => {
    switch (sectionId) {
      case 'hero': return formData.showHero;
      case 'trustBar': return formData.showTrustBar;
      case 'newArrivals': return formData.showNewArrivals;
      case 'categories': return formData.showCollections;
      case 'products': return formData.showProducts;
      case 'newsletter': return formData.showNewsletter;
      case 'marquee': return formData.showMarquee;
      case 'testimonials': return formData.showTestimonials;
      default: return true;
    }
  }, [formData]);

  // Custom block management
  const handleAddBlock = useCallback((block: CustomBlock) => {
    setCustomBlocks(prev => [...prev, block]);
    updateField('sectionOrder', [...formData.sectionOrder, block.id]);
    setBlockLibraryOpen(false);
    setEditingBlock(undefined);
    toast({
      title: "✅ Bloc ajouté",
      description: `Le bloc "${block.title}" a été ajouté à votre page`,
    });
  }, [formData.sectionOrder, updateField, toast]);

  const handleUpdateBlock = useCallback((updatedBlock: CustomBlock) => {
    setCustomBlocks(prev => prev.map(b => b.id === updatedBlock.id ? updatedBlock : b));
    setBlockLibraryOpen(false);
    setEditingBlock(undefined);
    setHasChanges(true);
    toast({
      title: "✅ Bloc mis à jour",
      description: `Le bloc "${updatedBlock.title}" a été modifié`,
    });
  }, [toast]);

  const handleRemoveBlock = useCallback((blockId: string) => {
    const block = customBlocks.find(b => b.id === blockId);
    setCustomBlocks(prev => prev.filter(b => b.id !== blockId));
    updateField('sectionOrder', formData.sectionOrder.filter(id => id !== blockId));
    toast({
      title: "🗑️ Bloc supprimé",
      description: block ? `Le bloc "${block.title}" a été supprimé` : "Bloc supprimé",
    });
  }, [customBlocks, formData.sectionOrder, updateField, toast]);

  const handleEditBlock = useCallback((blockId: string) => {
    const block = customBlocks.find(b => b.id === blockId);
    if (block) {
      setEditingBlock(block);
      setBlockLibraryOpen(true);
    }
  }, [customBlocks]);

  const handleBlockModalSave = useCallback((block: CustomBlock) => {
    if (editingBlock) {
      handleUpdateBlock(block);
    } else {
      handleAddBlock(block);
    }
  }, [editingBlock, handleAddBlock, handleUpdateBlock]);

  // Save handler
  const handleSave = useCallback(() => {
    if (!validateForm()) {
      toast({
        title: "⚠️ Erreurs de validation",
        description: "Veuillez corriger les erreurs avant de sauvegarder",
        variant: "destructive",
      });
      return;
    }

    updateShopSettings({
      selectedTheme: formData.selectedTheme,
      shopName: formData.shopName,
      logo: formData.logo,
      favicon: formData.favicon,
      description: formData.description,
      shopUrl: formData.shopUrl,
      phone: formData.phone,
      address: formData.address,
      socialLinks: {
        whatsapp: formData.whatsapp,
        facebook: formData.facebook,
        instagram: formData.instagram,
        tiktok: formData.tiktok,
      },
      seoTitle: formData.seoTitle,
      seoDescription: formData.seoDescription,
      socialImage: formData.socialImage,
      colorPalette: formData.colorPalette,
      fontFamily: formData.fontFamily,
      buttonStyle: formData.buttonStyle,
      headerStyle: formData.headerStyle,
      sectionSpacing: formData.sectionSpacing,
      cardBorderRadius: formData.cardBorderRadius,
      animationsEnabled: formData.animationsEnabled,
      heroImage: formData.heroImage,
      heroTitle: formData.heroTitle,
      heroSubtitle: formData.heroSubtitle,
      heroButtonText: formData.heroButtonText,
      heroButtonLink: formData.heroButtonLink,
      heroLayout: formData.heroLayout,
      // Premium Hero
      heroBadgeText: formData.heroBadgeText,
      heroBadgeIcon: formData.heroBadgeIcon,
      showHeroBadge: formData.showHeroBadge,
      heroStats: formData.heroStats,
      showHeroStats: formData.showHeroStats,
      heroFeatures: formData.heroFeatures,
      showHeroFeatures: formData.showHeroFeatures,
      showScrollIndicator: formData.showScrollIndicator,
      // Trust Bar
      trustBar: formData.trustBar,
      // Marquee
      marqueeItems: formData.marqueeItems,
      showMarquee: formData.showMarquee,
      // Products
      productsTitle: formData.productsTitle,
      productsSubtitle: formData.productsSubtitle,
      productsLayout: formData.productsLayout,
      productsPerRow: formData.productsPerRow,
      showCollections: formData.showCollections,
      collectionsTitle: formData.collectionsTitle,
      // Footer
      aboutText: formData.aboutText,
      footerLinks: formData.footerLinks,
      showNewsletter: formData.showNewsletter,
      newsletterTitle: formData.newsletterTitle,
      newsletterSubtitle: formData.newsletterSubtitle,
      // Visibility
      showHero: formData.showHero,
      showTrustBar: formData.showTrustBar,
      showProducts: formData.showProducts,
      showNewArrivals: formData.showNewArrivals,
      // Testimonials
      showTestimonials: formData.showTestimonials,
      testimonialsTitle: formData.testimonialsTitle,
      testimonialsDescription: formData.testimonialsDescription,
      testimonials: formData.testimonials,
      sectionOrder: formData.sectionOrder,
      promoBanner: formData.promoBanner,
      customBlocks: customBlocks,
    });

    localStorage.removeItem(DRAFT_STORAGE_KEY);
    localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
    
    setHasChanges(false);
    setValidationErrors({});
    toast({
      title: "✨ Modifications enregistrées",
      description: "Votre boutique a été mise à jour avec succès",
    });
  }, [formData, customBlocks, validateForm, updateShopSettings, toast]);

  return {
    // State
    formData,
    customBlocks,
    hasChanges,
    validationErrors,
    previewMode,
    isPreviewLoading,
    previewKey,
    previewUrl,
    iframeRef,
    hasDraft,
    showDraftDialog,
    showExitDialog,
    lastSavedAt,
    isDraftSaving,
    blockLibraryOpen,
    editingBlock,
    products,
    shopSettings,
    
    // Setters
    setPreviewMode,
    setIsPreviewLoading,
    setShowDraftDialog,
    setShowExitDialog,
    setBlockLibraryOpen,
    setEditingBlock,
    setHasChanges,
    
    // Actions
    updateField,
    handleSave,
    validateForm,
    restoreDraft,
    discardDraft,
    handleNavigateAway,
    confirmNavigation,
    sendPreviewUpdate,
    
    // Trust bar
    addTrustBarItem,
    updateTrustBarItem,
    removeTrustBarItem,
    
    // Testimonials
    addTestimonial,
    updateTestimonial,
    removeTestimonial,
    
    // Sections
    handleToggleSectionVisibility,
    getSectionVisibility,
    
    // Blocks
    handleAddBlock,
    handleUpdateBlock,
    handleRemoveBlock,
    handleEditBlock,
    handleBlockModalSave,
  };
}
