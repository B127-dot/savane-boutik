import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Search, ArrowUpDown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ModernProductCard from '@/components/shop/themes/modern/ModernProductCard';
import ViewModeToggle from '@/components/shop/ViewModeToggle';
import BottomNavMobile from '@/components/shop/BottomNavMobile';
import { CartSheet } from '@/components/CartSheet';
import { slugify, cn } from '@/lib/utils';
import { DEFAULT_TEXTS } from '@/lib/defaultTexts';

const CategoryPage = () => {
  const { shopUrl, categorySlug } = useParams<{ shopUrl: string; categorySlug: string }>();
  const navigate = useNavigate();
  const { products, categories, shopSettings, cart, addToCart } = useApp();
  const shouldReduceMotion = useReducedMotion();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shop-view-mode');
      return (saved === 'grid' || saved === 'feed') ? saved : 'feed';
    }
    return 'feed';
  });

  // Save view mode to localStorage
  useEffect(() => {
    localStorage.setItem('shop-view-mode', viewMode);
  }, [viewMode]);

  // Find category by slug
  const category = useMemo(() => {
    return categories.find(cat => slugify(cat.name) === categorySlug);
  }, [categories, categorySlug]);

  // Get category image from first product
  const categoryImage = useMemo(() => {
    if (!category) return '/placeholder.svg';
    const categoryProducts = products.filter(p => p.categoryId === category.id && p.status === 'active');
    return categoryProducts[0]?.images?.[0] || '/placeholder.svg';
  }, [category, products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!category) return [];
    
    return products
      .filter((product) => {
        const matchesCategory = product.categoryId === category.id;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const isActive = product.status === 'active';
        return matchesCategory && matchesSearch && isActive;
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'newest':
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [products, category, searchQuery, sortOrder]);

  // Animation settings
  const cardAnimation = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const cardAnimationDelay = shouldReduceMotion ? 0 : 0.03;

  // Handle add to cart
  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      productId: product.id,
      quantity: 1,
    });
  };

  // Scroll to products section
  const scrollToProducts = () => {
    document.getElementById('category-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Catégorie introuvable
          </h1>
          <Button onClick={() => navigate(`/shop/${shopUrl}`)}>
            Retour à la boutique
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/shop/${shopUrl}`)}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            {/* Logo/Shop Name */}
            <Link
              to={`/shop/${shopUrl}`}
              className="flex items-center gap-2"
            >
              {shopSettings.logo ? (
                <img
                  src={shopSettings.logo}
                  alt={shopSettings.shopName}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="font-display font-bold text-lg text-foreground">
                  {shopSettings.shopName}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                >
                  {cart.length > 9 ? '9+' : cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Category Hero */}
      <section className="relative overflow-hidden">
        <AspectRatio ratio={21/9} className="md:hidden">
          <img
            src={categoryImage}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-display font-bold text-white mb-2"
            >
              {category.name}
            </motion.h1>
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/90 font-body"
            >
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
            </motion.p>
          </div>
        </AspectRatio>

        {/* Desktop Hero */}
        <div className="hidden md:block relative h-64 lg:h-80">
          <img
            src={categoryImage}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.h1
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl lg:text-6xl font-display font-bold text-white mb-4"
              >
                {category.name}
              </motion.h1>
              <motion.p
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-white/90 font-body"
              >
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-4 md:py-6 border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={DEFAULT_TEXTS.productGrid.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Sort + View Mode */}
            <div className="flex items-center gap-3">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px] h-11">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={DEFAULT_TEXTS.productGrid.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{DEFAULT_TEXTS.productGrid.sortOptions.default}</SelectItem>
                  <SelectItem value="price-asc">{DEFAULT_TEXTS.productGrid.sortOptions.priceAsc}</SelectItem>
                  <SelectItem value="price-desc">{DEFAULT_TEXTS.productGrid.sortOptions.priceDesc}</SelectItem>
                  <SelectItem value="newest">{DEFAULT_TEXTS.productGrid.sortOptions.newest}</SelectItem>
                  <SelectItem value="name">{DEFAULT_TEXTS.productGrid.sortOptions.name}</SelectItem>
                </SelectContent>
              </Select>

              <ViewModeToggle
                mode={viewMode}
                onChange={setViewMode}
                className="md:hidden"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="category-products" className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className={cn(
              viewMode === 'feed'
                ? "flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6"
                : "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
            )}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={cardAnimation}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : Math.min(index * cardAnimationDelay, 0.3),
                    duration: shouldReduceMotion ? 0 : 0.4
                  }}
                >
                  <ModernProductCard
                    product={product}
                    shopUrl={shopUrl || ''}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    buttonStyle={shopSettings.buttonStyle || 'rounded'}
                    variant={viewMode}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 bg-muted">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-display text-foreground">
                {DEFAULT_TEXTS.productGrid.noProducts}
              </h3>
              <p className="font-body text-muted-foreground mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setSearchQuery('')}
                >
                  Réinitialiser la recherche
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Cart Sheet */}
      <CartSheet
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        shopUrl={shopUrl || ''}
        shopSettings={shopSettings}
      />

      {/* Bottom Navigation Mobile */}
      <BottomNavMobile
        cartItemsCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        onCategoriesClick={scrollToProducts}
        onHomeClick={() => navigate(`/shop/${shopUrl}`)}
        categories={categories}
        shopName={shopSettings.shopName}
        socialLinks={shopSettings.socialLinks}
      />
    </div>
  );
};

export default CategoryPage;
