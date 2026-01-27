import { Home, Grid3x3, ShoppingCart, Heart, Menu, X, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface BottomNavMobileProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onCategoriesClick: () => void;
  onHomeClick: () => void;
  wishlistProducts?: { id: string; name: string; price: number; image?: string }[];
  onWishlistProductClick?: (productId: string) => void;
  categories?: { id: string; name: string }[];
  shopName?: string;
  socialLinks?: {
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
  };
}

// Nav Item Component with ripple effect
const NavItem = ({ 
  icon: Icon, 
  label, 
  onClick, 
  badge,
  isActive = false,
  badgeAnimating = false
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void;
  badge?: number;
  isActive?: boolean;
  badgeAnimating?: boolean;
}) => {
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 400);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-center gap-0.5 h-full w-full overflow-hidden transition-colors duration-200 active:scale-95 ${
        isActive ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      {/* Ripple Effect */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 bg-primary/20 rounded-full"
            style={{ transformOrigin: 'center' }}
          />
        )}
      </AnimatePresence>

      {/* Icon Container */}
      <div className="relative">
        <Icon 
          className={`h-5 w-5 transition-all duration-200 ${isActive ? 'scale-110' : ''}`}
          style={isActive ? { 
            color: 'var(--shop-primary, hsl(var(--primary)))',
            filter: 'drop-shadow(0 0 4px var(--shop-primary, hsl(var(--primary))))'
          } : undefined}
        />
        {badge !== undefined && badge > 0 && (
          <motion.div
            initial={badgeAnimating ? { scale: 0.5 } : { scale: 1 }}
            animate={{ scale: badgeAnimating ? [1.3, 1] : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Badge 
              className="absolute -top-2 -right-3 h-5 min-w-[20px] flex items-center justify-center p-0 px-1 text-[10px] font-bold shadow-lg"
              style={{ 
                backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
                color: 'white'
              }}
            >
              {badge > 99 ? '99+' : badge}
            </Badge>
          </motion.div>
        )}
      </div>
      
      {/* Label */}
      <span 
        className={`text-[10px] font-medium transition-colors duration-200`}
        style={isActive ? { color: 'var(--shop-primary, hsl(var(--primary)))' } : undefined}
      >
        {label}
      </span>
    </button>
  );
};

// Wishlist Sheet Content
const WishlistContent = ({ 
  products = [],
  onProductClick 
}: { 
  products: { id: string; name: string; price: number; image?: string }[];
  onProductClick?: (productId: string) => void;
}) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: 'color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 15%, transparent)' }}
        >
          <Heart 
            className="h-8 w-8" 
            style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }}
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucun favori</h3>
        <p className="text-sm text-muted-foreground">
          Ajoutez des produits à vos favoris pour les retrouver ici
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {products.map((product) => (
        <motion.button
          key={product.id}
          onClick={() => onProductClick?.(product.id)}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
            <p 
              className="text-sm font-bold mt-1"
              style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }}
            >
              {new Intl.NumberFormat('fr-FR').format(product.price)} FCFA
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </motion.button>
      ))}
    </div>
  );
};

// Menu Sheet Content
const MenuContent = ({ 
  categories = [],
  shopName = "Ma Boutique",
  socialLinks,
  onCategoryClick,
  onClose
}: { 
  categories: { id: string; name: string }[];
  shopName?: string;
  socialLinks?: {
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
  };
  onCategoryClick?: (categoryId: string) => void;
  onClose: () => void;
}) => {
  const menuItems = [
    { label: 'Accueil', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Nos Produits', action: () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Nouveautés', action: () => document.getElementById('newArrivals')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <div className="space-y-6 mt-4">
      {/* Quick Navigation */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Navigation
        </h3>
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => {
                item.action();
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">{item.label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Catégories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  onCategoryClick?.(cat.id);
                  onClose();
                }}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Contact via WhatsApp */}
      {socialLinks?.whatsapp && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Besoin d'aide ?
          </h3>
          <a
            href={`https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="font-medium">Contactez-nous</p>
              <p className="text-xs text-green-600/80">Réponse rapide via WhatsApp</p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

const BottomNavMobile = ({ 
  cartItemsCount, 
  onCartClick,
  onCategoriesClick,
  onHomeClick,
  wishlistProducts = [],
  onWishlistProductClick,
  categories = [],
  shopName,
  socialLinks
}: BottomNavMobileProps) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartBadgeAnimating, setCartBadgeAnimating] = useState(false);
  const prevCartCount = useRef(cartItemsCount);

  // Animate cart badge when count changes
  useEffect(() => {
    if (cartItemsCount > prevCartCount.current) {
      setCartBadgeAnimating(true);
      const timer = setTimeout(() => setCartBadgeAnimating(false), 300);
      return () => clearTimeout(timer);
    }
    prevCartCount.current = cartItemsCount;
  }, [cartItemsCount]);

  const handleHomeClick = () => {
    setActiveTab('home');
    onHomeClick();
  };

  const handleCategoriesClick = () => {
    setActiveTab('categories');
    onCategoriesClick();
  };

  const handleCartClick = () => {
    setActiveTab('cart');
    onCartClick();
  };

  return (
    <>
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="grid grid-cols-5 h-16 safe-area-pb min-w-0 w-full">
          {/* Home */}
          <NavItem
            icon={Home}
            label="Accueil"
            onClick={handleHomeClick}
            isActive={activeTab === 'home'}
          />

          {/* Categories */}
          <NavItem
            icon={Grid3x3}
            label="Catégories"
            onClick={handleCategoriesClick}
            isActive={activeTab === 'categories'}
          />

          {/* Cart */}
          <NavItem
            icon={ShoppingCart}
            label="Panier"
            onClick={handleCartClick}
            badge={cartItemsCount}
            isActive={activeTab === 'cart'}
            badgeAnimating={cartBadgeAnimating}
          />

          {/* Favorites */}
          <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
            <SheetTrigger asChild>
              <div className="h-full">
                <NavItem
                  icon={Heart}
                  label="Favoris"
                  onClick={() => setIsWishlistOpen(true)}
                  badge={wishlistProducts.length > 0 ? wishlistProducts.length : undefined}
                  isActive={isWishlistOpen}
                />
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }} />
                  Mes Favoris
                </SheetTitle>
              </SheetHeader>
              <WishlistContent 
                products={wishlistProducts}
                onProductClick={(id) => {
                  onWishlistProductClick?.(id);
                  setIsWishlistOpen(false);
                }}
              />
            </SheetContent>
          </Sheet>

          {/* Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <div className="h-full">
                <NavItem
                  icon={Menu}
                  label="Menu"
                  onClick={() => setIsMenuOpen(true)}
                  isActive={isMenuOpen}
                />
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>{shopName || "Menu"}</SheetTitle>
              </SheetHeader>
              <MenuContent 
                categories={categories}
                shopName={shopName}
                socialLinks={socialLinks}
                onCategoryClick={(catId) => {
                  const cat = categories.find(c => c.id === catId);
                  if (cat) {
                    // Scroll to products section with category filter
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onClose={() => setIsMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>

      {/* Safe area spacer for iOS */}
      <div className="md:hidden h-16" />
    </>
  );
};

export default BottomNavMobile;
