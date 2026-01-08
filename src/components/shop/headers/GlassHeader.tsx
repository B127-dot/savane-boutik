import { ShoppingCart, Menu, X, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlassHeaderProps {
  logo?: string;
  shopName: string;
  cartItemsCount: number;
  onCartClick: () => void;
}

const GlassHeader = ({ logo, shopName, cartItemsCount, onCartClick }: GlassHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get initials from shop name (max 2 chars)
  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 py-4 px-4 lg:px-8">
      <div className="relative max-w-7xl mx-auto ring-1 ring-border bg-background/60 border border-border rounded-2xl px-6 shadow-lg backdrop-blur-lg">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="group">
            <div className="flex items-center gap-3">
              {logo ? (
                <img 
                  src={logo} 
                  alt={shopName} 
                  className="h-10 w-10 rounded-xl object-contain"
                />
              ) : (
                <div 
                  className="group-hover:bg-primary/20 transition-colors bg-primary/10 border border-primary/30 rounded-xl py-2 px-3 backdrop-blur-md"
                >
                  <span className="block text-lg font-semibold tracking-tight font-display text-foreground">
                    {getInitials(shopName)}
                  </span>
                </div>
              )}
              <span className="text-sm font-medium text-foreground hidden lg:block font-display">
                {shopName}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#products"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Produits
            </a>
            <a 
              href="#categories"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Catégories
            </a>
            <a 
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              À propos
            </a>
            <a 
              href="#contact"
              className="hover:text-foreground transition-colors duration-200 text-sm font-medium text-muted-foreground"
            >
              Contact
            </a>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-105 backdrop-blur-md shadow-lg"
              style={{ 
                backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
                color: 'white'
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              Panier {cartItemsCount > 0 && `(${cartItemsCount})`}
            </button>

            {/* Mobile Cart */}
            <button
              onClick={onCartClick}
              className="md:hidden relative rounded-xl bg-primary/10 border border-primary/30 p-2.5 hover:bg-primary/20 backdrop-blur-md"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartItemsCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  style={{ 
                    backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
                    color: 'white'
                  }}
                >
                  {cartItemsCount}
                </Badge>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden rounded-xl bg-muted/50 border border-border p-2.5 hover:bg-muted backdrop-blur-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg ring-1 ring-border overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                <a 
                  href="#products"
                  className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produits
                </a>
                <a 
                  href="#categories"
                  className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Catégories
                </a>
                <a 
                  href="#about"
                  className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  À propos
                </a>
                <a 
                  href="#contact"
                  className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      onCartClick();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold backdrop-blur-md shadow-lg"
                    style={{ 
                      backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
                      color: 'white'
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Voir le panier
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default GlassHeader;
