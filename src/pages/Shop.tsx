import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp, Product, ShopSettings } from '@/contexts/AppContext';
import { CartSheet } from '@/components/CartSheet';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useAbandonedCartTracker } from '@/hooks/useAbandonedCartTracker';
import ShopHeader from '@/components/shop/ShopHeader';
import TrustBar from '@/components/shop/TrustBar';
import SkeletonProductCard from '@/components/shop/SkeletonProductCard';
import NewArrivalsCarousel from '@/components/shop/NewArrivalsCarousel';
import CategoryShowcase from '@/components/shop/CategoryShowcase';
import SocialProofSection from '@/components/shop/SocialProofSection';
import NewsletterSection from '@/components/shop/NewsletterSection';
import WhyBuySection from '@/components/shop/WhyBuySection';
import QuickViewModal from '@/components/shop/QuickViewModal';
import BottomNavMobile from '@/components/shop/BottomNavMobile';
import DynamicThemeStyles from '@/components/shop/DynamicThemeStyles';
import { getFontClass, getButtonClass } from '@/lib/shopTheme';

// Theme components - Modern
import ModernHero from '@/components/shop/themes/modern/ModernHero';
import ModernProductCard from '@/components/shop/themes/modern/ModernProductCard';
import ModernFooter from '@/components/shop/themes/modern/ModernFooter';

// Theme components - ARTISAN
import { 
  ArtisanHeader, 
  ArtisanHero,
  ArtisanTrustBar,
  ArtisanCollections,
  ArtisanWhyChoose,
  ArtisanProductCard,
  ArtisanPopularProducts,
  ArtisanFooter 
} from '@/components/shop/themes/artisan';

const Shop = () => {
  const { shopUrl } = useParams<{ shopUrl: string }>();
  const [searchParams] = useSearchParams();
  const { products, categories, addToCart, cart, user } = useApp();
  const { toast } = useToast();
  const [shopSettings, setShopSettings] = useState<ShopSettings | null>(null);
  
  // Track abandoned carts automatically
  useAbandonedCartTracker(cart, products, user?.id || 'guest');
  
  // Support preview theme from URL parameter
  const previewTheme = searchParams.get('previewTheme');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc' | 'name'>('recent');

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
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
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
  }, [products, searchQuery, selectedCategory, sortBy, categories]);

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

  // Currently only Modern and Artisan themes are available
  const currentTheme = previewTheme || shopSettings?.selectedTheme || 'modern';

  if (!shopSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Boutique non trouvée</p>
      </div>
    );
  }

  // Determine which theme to use
  const isArtisan = currentTheme === 'artisan';

  // ARTISAN THEME
  if (isArtisan) {
    return (
      <ThemeProvider themeId={currentTheme}>
        <div className="min-h-screen bg-artisan-cream pb-20 md:pb-0">
          <ArtisanHeader 
            logo={shopSettings.logo}
            shopName={shopSettings.shopName}
            cartItemsCount={cartItemsCount}
            onCartClick={() => setIsCartOpen(true)}
          />

          <ArtisanHero 
            heroImage={shopSettings.heroImage}
            heroTitle={shopSettings.heroTitle}
            heroSubtitle={shopSettings.heroSubtitle}
            heroButtonText={shopSettings.heroButtonText}
            heroButtonLink={shopSettings.heroButtonLink}
          />

          <div id="categories">
            <ArtisanCollections 
              onCategoryClick={(categoryName) => {
                setSelectedCategory(categoryName);
                scrollToProducts();
              }}
            />
          </div>

          <ArtisanWhyChoose shopName={shopSettings.shopName} />

          <ArtisanPopularProducts 
            shopUrl={shopUrl!}
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />

          <ArtisanFooter 
            logo={shopSettings.logo}
            shopName={shopSettings.shopName}
            aboutText={shopSettings.aboutText}
            phone={shopSettings.phone}
            whatsapp={shopSettings.socialLinks.whatsapp}
            facebookUrl={shopSettings.socialLinks.facebook}
            instagramUrl={shopSettings.socialLinks.instagram}
            tiktokUrl={shopSettings.socialLinks.tiktok}
          />

          {shopSettings.socialLinks.whatsapp && (
            <WhatsAppButton 
              phoneNumber={shopSettings.socialLinks.whatsapp}
              message="Bonjour, je visite votre boutique en ligne !"
            />
          )}

          <BottomNavMobile 
            cartItemsCount={cartItemsCount}
            onCartClick={() => setIsCartOpen(true)}
            onCategoriesClick={scrollToCategories}
            onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          <CartSheet
            open={isCartOpen}
            onOpenChange={setIsCartOpen}
            shopUrl={shopUrl || ''}
            shopSettings={shopSettings}
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
  }

  // Get dynamic styling props
  const fontClass = getFontClass(shopSettings?.fontFamily);
  const buttonClass = getButtonClass(shopSettings?.buttonStyle);

  // MODERN THEME (default)
  return (
    <ThemeProvider themeId={currentTheme}>
      <DynamicThemeStyles 
        colorPalette={shopSettings.colorPalette}
        buttonStyle={shopSettings.buttonStyle}
        fontFamily={shopSettings.fontFamily}
      />
      <div className={`min-h-screen pb-20 md:pb-0 bg-background ${fontClass}`}>
        <ShopHeader 
          logo={shopSettings.logo}
          shopName={shopSettings.shopName}
          cartItemsCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
        />

        <ModernHero 
          heroImage={shopSettings.heroImage}
          heroTitle={shopSettings.heroTitle}
          heroSubtitle={shopSettings.heroSubtitle}
          heroButtonText={shopSettings.heroButtonText}
          heroButtonLink={shopSettings.heroButtonLink}
          buttonStyle={shopSettings.buttonStyle}
        />

        <TrustBar trustItems={shopSettings.trustBar} />

        <NewArrivalsCarousel 
          products={getNewArrivals()}
          shopUrl={shopUrl!}
          onAddToCart={handleAddToCart}
          onQuickView={setQuickViewProduct}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          buttonStyle={shopSettings.buttonStyle}
        />

        <div id="categories">
          <CategoryShowcase 
            categories={categories}
            products={products}
            onCategoryClick={(categoryName) => {
              setSelectedCategory(categoryName);
              scrollToProducts();
            }}
          />
        </div>

        <section id="products" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display text-foreground">
                Tous Nos Produits
              </h2>
              <p className="text-lg font-body text-muted-foreground">
                Parcourez notre collection complète
              </p>
            </div>

            <div className="mb-8 space-y-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 focus:border-primary"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className="rounded-full"
                >
                  Tous ({products.filter(p => p.status === 'active' && p.stock > 0).length})
                </Button>
                {categories.map((category) => {
                  const count = products.filter(
                    p => p.categoryId === category.id && p.status === 'active' && p.stock > 0
                  ).length;
                  if (count === 0) return null;
                  
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.name ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category.name)}
                      className="rounded-full"
                    >
                      {category.name} ({count})
                    </Button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3 justify-center items-center">
                <span className="text-sm text-muted-foreground">Trier par:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                >
                  <option value="recent">Plus récent</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name">Nom A-Z</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <SkeletonProductCard key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ModernProductCard
                    key={product.id}
                    product={product}
                    shopUrl={shopUrl!}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    onToggleWishlist={handleToggleWishlist}
                    isInWishlist={wishlist.includes(product.id)}
                    buttonStyle={shopSettings.buttonStyle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 bg-muted">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-display text-foreground">
                  Aucun produit trouvé
                </h3>
                <p className="mb-6 font-body text-muted-foreground">
                  Essayez de modifier vos critères de recherche
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </section>

        <SocialProofSection />
        <WhyBuySection />
        <NewsletterSection buttonStyle={shopSettings.buttonStyle} />

        <ModernFooter 
          logo={shopSettings.logo}
          shopName={shopSettings.shopName}
          aboutText={shopSettings.aboutText}
          phone={shopSettings.phone}
          whatsapp={shopSettings.socialLinks.whatsapp}
          facebook={shopSettings.socialLinks.facebook}
          instagram={shopSettings.socialLinks.instagram}
          tiktok={shopSettings.socialLinks.tiktok}
        />

        {shopSettings.socialLinks.whatsapp && (
          <WhatsAppButton 
            phoneNumber={shopSettings.socialLinks.whatsapp}
            message="Bonjour, je visite votre boutique en ligne !"
          />
        )}

        <BottomNavMobile 
          cartItemsCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
          onCategoriesClick={scrollToCategories}
          onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        <CartSheet
          open={isCartOpen}
          onOpenChange={setIsCartOpen}
          shopUrl={shopUrl || ''}
          shopSettings={shopSettings}
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
