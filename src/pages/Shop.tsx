import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useApp, Product, ShopSettings } from '@/contexts/AppContext';
import { CartSheet } from '@/components/CartSheet';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopHero from '@/components/shop/ShopHero';
import TrustBar from '@/components/shop/TrustBar';
import ShopFooter from '@/components/shop/ShopFooter';

const Shop = () => {
  const { shopUrl } = useParams<{ shopUrl: string }>();
  const { products, categories, addToCart, cart } = useApp();
  const { toast } = useToast();
  const [shopSettings, setShopSettings] = useState<ShopSettings | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Load shop settings from localStorage
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
  }, [shopUrl]);

  useEffect(() => {
    // Filter products
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
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart({ productId: product.id, quantity: 1 });
    toast({
      title: "Produit ajouté !",
      description: `${product.name} a été ajouté au panier`,
    });
    setIsCartOpen(true);
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!shopSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Boutique non trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ShopHeader 
        logo={shopSettings.logo}
        shopName={shopSettings.shopName}
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <ShopHero 
        heroImage={shopSettings.heroImage}
        heroTitle={shopSettings.heroTitle}
        heroSubtitle={shopSettings.heroSubtitle}
        heroButtonText={shopSettings.heroButtonText}
        heroButtonLink={shopSettings.heroButtonLink}
      />

      {/* Trust Bar */}
      <TrustBar trustItems={shopSettings.trustBar} />

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Produits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection de produits de qualité
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                Tous
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.name)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <Link to={`/product/${product.id}`}>
                  <AspectRatio ratio={1}>
                    <img
                      src={product.images[0] || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </Link>

                <div className="p-6 space-y-4 text-center">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString()} FCFA
                  </p>

                  {product.stock > 0 ? (
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      size="lg"
                    >
                      Ajouter au panier
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="w-full py-3">
                      Rupture de stock
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Aucun produit trouvé
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <ShopFooter 
        logo={shopSettings.logo}
        shopName={shopSettings.shopName}
        aboutText={shopSettings.aboutText}
        phone={shopSettings.phone}
        whatsapp={shopSettings.socialLinks?.whatsapp}
        facebook={shopSettings.socialLinks?.facebook}
        instagram={shopSettings.socialLinks?.instagram}
        tiktok={shopSettings.socialLinks?.tiktok}
      />

      {/* WhatsApp Button */}
      {shopSettings.socialLinks?.whatsapp && (
        <WhatsAppButton 
          phoneNumber={shopSettings.socialLinks.whatsapp}
          message={`Bonjour ${shopSettings.shopName}, j'aimerais en savoir plus sur vos produits.`}
        />
      )}

      {/* Cart Sheet */}
      <CartSheet 
        open={isCartOpen} 
        onOpenChange={setIsCartOpen} 
        shopUrl={shopUrl || ''} 
        shopSettings={shopSettings} 
      />
    </div>
  );
};

export default Shop;
