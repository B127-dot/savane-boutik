import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useApp, Product, ShopSettings, CustomBlock } from '@/contexts/AppContext';
import { CartSheet } from '@/components/CartSheet';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useAbandonedCartTracker } from '@/hooks/useAbandonedCartTracker';
import { useDynamicSEO } from '@/hooks/useDynamicSEO';
import { GradientHeader, MinimalHeader, GlassHeader } from '@/components/shop/headers';
import NewArrivalsCarousel from '@/components/shop/NewArrivalsCarousel';
import CategoryShowcase from '@/components/shop/CategoryShowcase';
import QuickViewModal from '@/components/shop/QuickViewModal';
import BottomNavMobile from '@/components/shop/BottomNavMobile';
import DynamicThemeStyles from '@/components/shop/DynamicThemeStyles';
import PromoBanner from '@/components/shop/PromoBanner';
import { getFontClass } from '@/lib/shopTheme';

// Custom Blocks
import {
  TestimonialsBlock,
  InstagramGalleryBlock,
  FAQBlock,
  YouTubeBlock,
  TextImageBlock,
} from '@/components/shop/blocks';

// Testimonials with Marquee for Modern Theme
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';

// Theme components - Modern
import {
  ModernHeader,
  ModernHero,
  ModernTrustBar,
  ModernProductGrid,
  ModernFooter
} from '@/components/shop/themes/modern';

const Shop = () => {
  const { shopUrl } = useParams<{ shopUrl: string }>();
  const [searchParams] = useSearchParams();
  const { products, categories, addToCart, cart, user } = useApp();
  const { toast } = useToast();
  const [shopSettings, setShopSettings] = useState<ShopSettings | null>(null);
  
  // Preview overrides from editor (via postMessage)
  const [previewOverrides, setPreviewOverrides] = useState<Partial<ShopSettings> | null>(null);
  
  // Track abandoned carts automatically
  useAbandonedCartTracker(cart, products, user?.id || 'guest');
  
  // Support preview theme from URL parameter
  const isEditorPreview = searchParams.get('previewMode') === 'editor';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc' | 'name'>('recent');

  // Add shop-page class to #root for full-width layout
  useEffect(() => {
    document.getElementById('root')?.classList.add('shop-page');
    return () => {
      document.getElementById('root')?.classList.remove('shop-page');
    };
  }, []);

  // Listen for preview updates from ShopEditor via postMessage
  useEffect(() => {
    if (!isEditorPreview) return;
    
    const handleMessage = (event: MessageEvent) => {
      // Validate origin for security
      if (event.origin !== window.location.origin) return;
      
      if (event.data?.type === 'SHOP_PREVIEW_UPDATE') {
        setPreviewOverrides(event.data.settings);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isEditorPreview]);

  // Merge shop settings with preview overrides
  const effectiveSettings = useMemo(() => {
    if (!shopSettings) return null;
    if (!previewOverrides) return shopSettings;
    
    return {
      ...shopSettings,
      ...previewOverrides,
      // Deep merge for nested objects
      socialLinks: {
        ...shopSettings.socialLinks,
        ...(previewOverrides.socialLinks || {}),
      },
      promoBanner: {
        ...shopSettings.promoBanner,
        ...(previewOverrides.promoBanner || {}),
      },
    } as ShopSettings;
  }, [shopSettings, previewOverrides]);

  useEffect(() => {
    // Load shop settings from localStorage
    setIsLoading(true);
    let settings = null;
    
    // Try generic key first
    const savedSettings = localStorage.getItem('shopSettings');
    if (savedSettings) {
      settings = JSON.parse(savedSettings);
    } else {
      // Fallback: search for user-specific keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('shopSettings_')) {
          const userSettings = localStorage.getItem(key);
          if (userSettings) {
            settings = JSON.parse(userSettings);
            break;
          }
        }
      }
    }
    
    setShopSettings(settings);
    
    // Load wishlist
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    
    setTimeout(() => setIsLoading(false), 500);
  }, [shopUrl]);

  useEffect(() => {
    // Filter and sort products
    let filtered = products.filter(p => p.status === 'active' && p.stock > 0);
    
    if (selectedCategory !== 'all') {
      const category = categories.find(c => c.name === selectedCategory);
      if (category) {
        filtered = filtered.filter(p => p.categoryId === category.id);
      }
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, categories]);

  const handleAddToCart = (product: Product) => {
    addToCart({ productId: product.id, quantity: 1 });
    toast({
      title: "Produit ajouté !",
      description: `${product.name} a été ajouté au panier`,
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (productId: string) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    
    toast({
      title: wishlist.includes(productId) ? "Retiré des favoris" : "Ajouté aux favoris",
      description: wishlist.includes(productId) 
        ? "Le produit a été retiré de vos favoris"
        : "Le produit a été ajouté à vos favoris"
    });
  };

  const getNewArrivals = () => {
    return products
      .filter(p => p.status === 'active' && p.stock > 0)
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 8);
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    const element = document.getElementById('categories');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Apply dynamic SEO (favicon, title, meta tags)
  useDynamicSEO(effectiveSettings ? {
    title: effectiveSettings.seoTitle || effectiveSettings.shopName,
    description: effectiveSettings.seoDescription,
    image: effectiveSettings.socialImage || effectiveSettings.heroImage,
    favicon: effectiveSettings.favicon,
    shopName: effectiveSettings.shopName,
  } : null);

  if (!effectiveSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Boutique non trouvée</p>
      </div>
    );
  }

  // Get font class for theming
  const fontClass = getFontClass(effectiveSettings?.fontFamily);

  // MODERN THEME (only theme available)
  return (
    <ThemeProvider themeId="modern">
      <DynamicThemeStyles 
        colorPalette={effectiveSettings.colorPalette}
        buttonStyle={effectiveSettings.buttonStyle}
        fontFamily={effectiveSettings.fontFamily}
      />
      <div className={`min-h-screen pb-20 md:pb-0 bg-background overflow-x-hidden ${fontClass}`}>
        {/* Promo Banner - Top Position */}
        {effectiveSettings.promoBanner?.enabled && effectiveSettings.promoBanner.position === 'top' && (
          <PromoBanner
            text={effectiveSettings.promoBanner.text}
            backgroundColor={effectiveSettings.promoBanner.backgroundColor}
            textColor={effectiveSettings.promoBanner.textColor}
            link={effectiveSettings.promoBanner.link}
            animationsEnabled={effectiveSettings.animationsEnabled}
          />
        )}

        {/* Dynamic Header based on headerStyle setting */}
        {(() => {
          const headerProps = {
            logo: effectiveSettings.logo,
            shopName: effectiveSettings.shopName,
            cartItemsCount,
            onCartClick: () => setIsCartOpen(true),
          };

          switch (effectiveSettings.headerStyle) {
            case 'gradient':
              return <GradientHeader {...headerProps} />;
            case 'minimal':
              return <MinimalHeader {...headerProps} />;
            case 'glass':
              return <GlassHeader {...headerProps} />;
            default:
              return (
                <ModernHeader
                  logo={headerProps.logo}
                  shopName={headerProps.shopName}
                  cartItemCount={headerProps.cartItemsCount}
                  onCartClick={headerProps.onCartClick}
                  shopUrl={shopUrl}
                />
              );
          }
        })()}

        {/* Dynamic Sections based on sectionOrder */}
        {(() => {
          const sectionOrder = effectiveSettings.sectionOrder || ['hero', 'trustBar', 'newArrivals', 'categories', 'products', 'testimonials', 'newsletter'];
          const customBlocks = effectiveSettings.customBlocks || [];
          const animationsEnabled = effectiveSettings.animationsEnabled ?? true;

          // Helper function to render custom blocks
          const renderCustomBlock = (block: CustomBlock) => {
            switch (block.type) {
              case 'testimonials':
                return (
                  <TestimonialsBlock
                    key={block.id}
                    title={block.config.title}
                    testimonials={block.config.testimonials}
                    animationsEnabled={animationsEnabled}
                  />
                );
              case 'instagram':
                return (
                  <InstagramGalleryBlock
                    key={block.id}
                    title={block.config.title}
                    instagramHandle={block.config.instagramHandle}
                    posts={block.config.posts}
                    animationsEnabled={animationsEnabled}
                  />
                );
              case 'faq':
                return (
                  <FAQBlock
                    key={block.id}
                    title={block.config.title}
                    subtitle={block.config.subtitle}
                    faqs={block.config.faqs}
                    animationsEnabled={animationsEnabled}
                  />
                );
              case 'youtube':
                return (
                  <YouTubeBlock
                    key={block.id}
                    title={block.config.title}
                    subtitle={block.config.subtitle}
                    videoUrl={block.config.videoUrl}
                    thumbnailUrl={block.config.thumbnailUrl}
                    animationsEnabled={animationsEnabled}
                  />
                );
              case 'text-image':
                return (
                  <TextImageBlock
                    key={block.id}
                    title={block.config.title}
                    text={block.config.text}
                    imageUrl={block.config.imageUrl}
                    imagePosition={block.config.imagePosition}
                    buttonText={block.config.buttonText}
                    buttonLink={block.config.buttonLink}
                    animationsEnabled={animationsEnabled}
                  />
                );
              default:
                return null;
            }
          };

          // Helper function to check if a section is visible
          const isSectionVisible = (sectionId: string): boolean => {
            switch (sectionId) {
              case 'hero': return effectiveSettings.showHero ?? true;
              case 'trustBar': return effectiveSettings.showTrustBar ?? true;
              case 'newArrivals': return effectiveSettings.showNewArrivals ?? true;
              case 'categories': return effectiveSettings.showCollections ?? true;
              case 'products': return effectiveSettings.showProducts ?? true;
              case 'newsletter': return effectiveSettings.showNewsletter ?? true;
              case 'marquee': return effectiveSettings.showMarquee ?? true;
              default: return true; // Custom blocks are always visible if in order
            }
          };

          return sectionOrder.map((sectionId) => {
            // Check if it's a custom block
            if (sectionId.startsWith('custom_')) {
              const block = customBlocks.find(b => b.id === sectionId);
              return block ? renderCustomBlock(block) : null;
            }

            // Skip hidden sections
            if (!isSectionVisible(sectionId)) return null;

            // Render built-in sections
            switch (sectionId) {
              case 'hero':
                return (
                  <div key="hero">
                    <ModernHero 
                      heroImage={effectiveSettings.heroImage}
                      heroTitle={effectiveSettings.heroTitle}
                      heroSubtitle={effectiveSettings.heroSubtitle}
                      heroButtonText={effectiveSettings.heroButtonText}
                      heroButtonLink={effectiveSettings.heroButtonLink}
                      buttonStyle={effectiveSettings.buttonStyle}
                      // Premium props
                      badgeText={effectiveSettings.heroBadgeText}
                      badgeIcon={effectiveSettings.heroBadgeIcon || 'sparkles'}
                      showBadge={effectiveSettings.showHeroBadge !== false}
                      showStats={effectiveSettings.showHeroStats !== false}
                      stats={effectiveSettings.heroStats}
                      features={effectiveSettings.heroFeatures}
                      showFeatures={effectiveSettings.showHeroFeatures !== false}
                      showScrollIndicator={effectiveSettings.showScrollIndicator !== false}
                    />
                    {/* Promo Banner - Below Hero Position */}
                    {effectiveSettings.promoBanner?.enabled && effectiveSettings.promoBanner.position === 'below-hero' && (
                      <PromoBanner
                        text={effectiveSettings.promoBanner.text}
                        backgroundColor={effectiveSettings.promoBanner.backgroundColor}
                        textColor={effectiveSettings.promoBanner.textColor}
                        link={effectiveSettings.promoBanner.link}
                        animationsEnabled={animationsEnabled}
                      />
                    )}
                  </div>
                );

              case 'trustBar':
                return <ModernTrustBar key="trustBar" items={effectiveSettings.trustBar?.map(item => ({ icon: item.icon, text: item.title }))} />;

              case 'newArrivals':
                return (
                  <NewArrivalsCarousel
                    key="newArrivals"
                    products={getNewArrivals()}
                    shopUrl={shopUrl!}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    onToggleWishlist={handleToggleWishlist}
                    wishlist={wishlist}
                    buttonStyle={effectiveSettings.buttonStyle}
                  />
                );

              case 'categories':
                return (
                  <div key="categories" id="categories">
                    <CategoryShowcase 
                      categories={categories}
                      products={products}
                      shopUrl={shopUrl || ''}
                      onCategoryClick={(categoryName) => {
                        setSelectedCategory(categoryName);
                        scrollToProducts();
                      }}
                    />
                  </div>
                );

              case 'products':
                return (
                  <ModernProductGrid
                    key="products"
                    products={filteredProducts}
                    categories={categories}
                    shopUrl={shopUrl}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    onToggleWishlist={handleToggleWishlist}
                    wishlist={wishlist}
                    sectionTitle={effectiveSettings.productsTitle || "Nos Produits"}
                    sectionSubtitle={effectiveSettings.productsSubtitle || "Parcourez notre collection complète"}
                    buttonStyle={effectiveSettings.buttonStyle}
                    isLoading={isLoading}
                  />
                );

              case 'testimonials':
                // Convert TestimonialItem[] to the format expected by TestimonialsSection
                const testimonialsData = (effectiveSettings.testimonials || []).map(item => ({
                  author: {
                    name: item.name,
                    handle: item.handle || '',
                    avatar: item.avatar || '',
                  },
                  text: item.text,
                }));
                
                return (
                  <TestimonialsSection
                    key="testimonials"
                    title={effectiveSettings.testimonialsTitle || "Ce que nos clients disent"}
                    description={effectiveSettings.testimonialsDescription || "Rejoignez des milliers de clients satisfaits à travers le Burkina Faso"}
                    testimonials={testimonialsData}
                  />
                );

              case 'newsletter':
                return null; // Newsletter intégrée dans ModernFooter

              default:
                return null;
            }
          });
        })()}


        <ModernFooter 
          logo={effectiveSettings.logo}
          shopName={effectiveSettings.shopName}
          aboutText={effectiveSettings.aboutText}
          phone={effectiveSettings.phone}
          whatsapp={effectiveSettings.socialLinks.whatsapp}
          facebook={effectiveSettings.socialLinks.facebook}
          instagram={effectiveSettings.socialLinks.instagram}
          tiktok={effectiveSettings.socialLinks.tiktok}
          email={effectiveSettings.email}
          address={effectiveSettings.address}
          paymentMethods={effectiveSettings.paymentMethods || ['orange-money', 'moov-money', 'wave', 'cash']}
          showNewsletter={effectiveSettings.showNewsletter !== false}
          newsletterTitle={effectiveSettings.newsletterTitle}
          showPoweredBy={effectiveSettings.showPoweredBy !== false}
          footerLinks={effectiveSettings.footerLinks}
        />

        {effectiveSettings.socialLinks.whatsapp && (
          <WhatsAppButton 
            phoneNumber={effectiveSettings.socialLinks.whatsapp}
            message="Bonjour, je visite votre boutique en ligne !"
          />
        )}

        <BottomNavMobile 
          cartItemsCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
          onCategoriesClick={scrollToCategories}
          onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          wishlistProducts={wishlist.map(id => {
            const product = products.find(p => p.id === id);
            return product ? { 
              id: product.id, 
              name: product.name, 
              price: product.price, 
              image: product.images[0] 
            } : null;
          }).filter(Boolean) as { id: string; name: string; price: number; image?: string }[]}
          onWishlistProductClick={(productId) => {
            const product = products.find(p => p.id === productId);
            if (product) setQuickViewProduct(product);
          }}
          categories={categories}
          shopName={effectiveSettings.shopName}
          socialLinks={effectiveSettings.socialLinks}
        />

        <CartSheet
          open={isCartOpen}
          onOpenChange={setIsCartOpen}
          shopUrl={shopUrl || ''}
          shopSettings={effectiveSettings}
        />

        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      </div>
    </ThemeProvider>
  );
};

export default Shop;
