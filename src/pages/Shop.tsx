import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp, Product, ShopSettings } from '@/contexts/AppContext';
import { CartSheet } from '@/components/CartSheet';
import ThemeToggle from '@/components/ThemeToggle';
import { useToast } from '@/hooks/use-toast';

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
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{shopSettings.shopName}</h1>
              {shopSettings.description && (
                <p className="text-sm text-muted-foreground">{shopSettings.description}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              Tous les produits
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun produit trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all"
              >
                <Link to={`/shop/${shopUrl}/product/${product.id}`}>
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground">Pas d'image</span>
                      </div>
                    )}
                  </div>
                </Link>
                
                <div className="p-4 space-y-3">
                  <Link to={`/shop/${shopUrl}/product/${product.id}`}>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold text-primary">{product.price.toLocaleString()} FCFA</p>
                      <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full"
                    size="sm"
                  >
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Sheet */}
      <CartSheet 
        open={isCartOpen} 
        onOpenChange={setIsCartOpen}
        shopUrl={shopUrl || ''}
      />
    </div>
  );
};

export default Shop;
