import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Save, 
  Eye, 
  Smartphone, 
  Monitor, 
  Palette, 
  Image, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  Check,
  Loader2,
  AlertTriangle,
  CloudOff,
  Cloud,
  Star,
  MessageCircle,
  Zap,
  Layout,
  Layers,
  LayoutGrid,
  Sparkle,
  ShoppingBag,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useShopEditor } from '@/hooks/useShopEditor';
import { COLOR_PALETTES } from '@/lib/shopTheme';
import { SectionConfig } from '@/components/shop/DraggableSectionManager';
import BlockLibraryModal from '@/components/shop/BlockLibraryModal';

// Editor Section Components
import {
  IdentitySection,
  ContactSection,
  SEOSection,
  DesignSection,
  HeroSection,
  TrustBarSection,
  MarqueeSection,
  ProductsSection,
  SectionsSection,
  PromoSection,
  AdvancedSection,
  FooterSection,
  TestimonialsSection,
  ActiveThemeCard,
  ThemePickerModal,
} from '@/components/editor';

const ShopEditor = () => {
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  
  const {
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
    showDraftDialog,
    showExitDialog,
    lastSavedAt,
    isDraftSaving,
    blockLibraryOpen,
    editingBlock,
    shopSettings,
    
    // Setters
    setPreviewMode,
    setShowDraftDialog,
    setShowExitDialog,
    setBlockLibraryOpen,
    setEditingBlock,
    setIsPreviewLoading,
    
    // Actions
    updateField,
    handleSave,
    restoreDraft,
    discardDraft,
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
    handleRemoveBlock,
    handleEditBlock,
    handleBlockModalSave,
  } = useShopEditor();

  // Get current palette for design preview
  const currentPalette = useMemo(() => 
    COLOR_PALETTES.find(p => p.id === formData.colorPalette) || COLOR_PALETTES[0],
    [formData.colorPalette]
  );

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

  // Build section configs for DraggableSectionManager
  const sectionConfigs: SectionConfig[] = useMemo(() => {
    return formData.sectionOrder.map(id => {
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
  }, [formData.sectionOrder, customBlocks, getSectionVisibility]);

  return (
    <div className="flex h-screen bg-background w-full -m-6 overflow-hidden">
      <main className="flex-1 flex h-screen overflow-hidden">
        {/* Editor Sidebar */}
        <div className="w-[400px] border-r border-border bg-gradient-to-b from-card to-card/95 flex flex-col h-screen overflow-hidden">
          {/* Header */}
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
              
              {/* Draft Status */}
              {hasChanges && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 px-1">
                  {isDraftSaving ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Sauvegarde du brouillon...</span>
                    </>
                  ) : lastSavedAt ? (
                    <>
                      <Cloud className="w-3 h-3 text-emerald-500" />
                      <span>Brouillon sauvegardé à {lastSavedAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </>
                  ) : (
                    <>
                      <CloudOff className="w-3 h-3 text-amber-500" />
                      <span>Modifications non sauvegardées</span>
                    </>
                  )}
                </div>
              )}

              {/* Validation Errors */}
              {Object.keys(validationErrors).length > 0 && (
                <div className="mb-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 text-destructive text-sm font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{Object.keys(validationErrors).length} erreur(s)</span>
                  </div>
                </div>
              )}
              
              {/* Save Button */}
              <motion.div
                animate={hasChanges ? { scale: [1, 1.02, 1] } : {}}
                transition={{ repeat: hasChanges ? Infinity : 0, duration: 2 }}
              >
                <Button 
                  onClick={handleSave} 
                  className={`w-full h-12 text-base font-semibold gap-2 transition-all duration-300 ${
                    hasChanges 
                      ? Object.keys(validationErrors).length > 0
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30'
                        : 'bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/30' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                  disabled={!hasChanges}
                >
                  {hasChanges ? (
                    Object.keys(validationErrors).length > 0 ? (
                      <>
                        <AlertTriangle className="w-5 h-5" />
                        Corriger les erreurs
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Publier les modifications
                        <Badge variant="secondary" className="ml-2 bg-primary-foreground/20 text-primary-foreground text-xs">
                          Non publié
                        </Badge>
                      </>
                    )
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Tout est à jour
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Active Theme Card */}
              <ActiveThemeCard 
                currentTheme={formData.selectedTheme}
                onChangeClick={() => setThemePickerOpen(true)}
              />
            </div>
          </div>

          {/* Scrollable Editor Content */}
          <ScrollArea className="flex-1">
            <div className="p-5 space-y-4">
              <Accordion type="multiple" defaultValue={['identity', 'design', 'hero']} className="space-y-3">
                <IdentitySection formData={formData} updateField={updateField} validationErrors={validationErrors} />
                <ContactSection formData={formData} updateField={updateField} validationErrors={validationErrors} />
                <SEOSection formData={formData} updateField={updateField} validationErrors={validationErrors} />
                <DesignSection formData={formData} updateField={updateField} currentPalette={currentPalette} />
                <HeroSection formData={formData} updateField={updateField} validationErrors={validationErrors} />
                <TrustBarSection 
                  formData={formData} 
                  updateField={updateField}
                  addTrustBarItem={addTrustBarItem}
                  updateTrustBarItem={updateTrustBarItem}
                  removeTrustBarItem={removeTrustBarItem}
                />
                <MarqueeSection formData={formData} updateField={updateField} />
                <ProductsSection formData={formData} updateField={updateField} />
                <TestimonialsSection 
                  formData={formData} 
                  updateField={updateField}
                  addTestimonial={addTestimonial}
                  updateTestimonial={updateTestimonial}
                  removeTestimonial={removeTestimonial}
                />
                <SectionsSection 
                  formData={formData}
                  updateField={updateField}
                  sectionConfigs={sectionConfigs}
                  handleToggleSectionVisibility={handleToggleSectionVisibility}
                  onAddBlock={() => {
                    setEditingBlock(undefined);
                    setBlockLibraryOpen(true);
                  }}
                  onRemoveBlock={handleRemoveBlock}
                  onEditBlock={handleEditBlock}
                />
                <PromoSection formData={formData} updateField={updateField} />
                <AdvancedSection formData={formData} updateField={updateField} />
                <FooterSection formData={formData} updateField={updateField} />
              </Accordion>
            </div>
          </ScrollArea>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-muted/20 flex flex-col h-screen overflow-hidden">
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
              className="gap-2"
              onClick={() => window.open(`/shop/${shopSettings?.shopUrl || 'ma-boutique'}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              Ouvrir la boutique
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>

          {/* Preview Frame */}
          <div className="flex-1 flex items-start justify-center p-8 overflow-y-auto overflow-x-hidden">
            <motion.div 
              layout
              className={`rounded-2xl shadow-2xl shadow-black/10 overflow-hidden border border-border/50 transition-all duration-500 relative ${
                previewMode === 'mobile' ? 'w-[390px]' : 'w-full max-w-[1100px]'
              }`}
              style={{ height: previewMode === 'mobile' ? '750px' : '650px' }}
            >
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

              <iframe
                ref={iframeRef}
                key={previewKey}
                src={previewUrl}
                className="w-full h-full border-0"
                title="Aperçu de la boutique"
                onLoad={() => {
                  setIsPreviewLoading(false);
                  sendPreviewUpdate();
                }}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Theme Picker Modal */}
      <ThemePickerModal
        isOpen={themePickerOpen}
        onClose={() => setThemePickerOpen(false)}
        currentTheme={formData.selectedTheme}
        onThemeChange={(themeId) => updateField('selectedTheme', themeId)}
        shopUrl={shopSettings?.shopUrl}
      />

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

      {/* Draft Restore Dialog */}
      <AlertDialog open={showDraftDialog} onOpenChange={setShowDraftDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CloudOff className="w-5 h-5 text-amber-500" />
              Brouillon détecté
            </AlertDialogTitle>
            <AlertDialogDescription>
              Vous avez des modifications non sauvegardées de votre dernière session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={discardDraft}>Ignorer</AlertDialogCancel>
            <AlertDialogAction onClick={restoreDraft}>Restaurer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Modifications non sauvegardées
            </AlertDialogTitle>
            <AlertDialogDescription>
              Vos changements seront perdus si vous quittez maintenant.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowExitDialog(false)}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmNavigation} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Quitter sans sauvegarder
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ShopEditor;
