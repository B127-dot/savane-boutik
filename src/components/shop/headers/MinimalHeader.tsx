import { ShoppingCart, Menu, X, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MinimalHeaderProps {
  logo?: string;
  shopName: string;
  cartItemsCount: number;
  onCartClick: () => void;
}

const MinimalHeader = ({ logo, shopName, cartItemsCount, onCartClick }: MinimalHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="mx-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#" className="inline-flex items-center gap-2">
            {logo ? (
              <img 
                src={logo} 
                alt={shopName} 
                className="w-9 h-9 rounded-full object-contain"
              />
            ) : (
              <span 
                className="inline-flex items-center justify-center w-9 h-9 rounded-full font-medium font-display text-lg"
                style={{ 
                  backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
                  color: 'white'
                }}
              >
                {shopName.charAt(0).toUpperCase()}
              </span>
            )}
            <span className={`text-sm font-medium font-display hidden sm:block transition-colors ${
              isScrolled ? 'text-foreground/90' : 'text-white'
            }`}>
              {shopName}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <div className={`flex items-center gap-1 rounded-full px-1 py-1 backdrop-blur transition-all ${
              isScrolled ? 'bg-muted/50 ring-1 ring-border' : 'bg-white/10 ring-1 ring-white/20'
            }`}>
              <a 
                href="#" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-foreground/90 hover:text-foreground' : 'text-white hover:text-white'
                }`}
              >
                Accueil
              </a>
              <a 
                href="#products" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-foreground/80 hover:text-foreground' : 'text-white/80 hover:text-white'
                }`}
              >
                Produits
              </a>
              <a 
                href="#categories"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-foreground/80 hover:text-foreground' : 'text-white/80 hover:text-white'
                }`}
              >
                Catégories
              </a>
              <a 
                href="#about" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-foreground/80 hover:text-foreground' : 'text-white/80 hover:text-white'
                }`}
              >
                À propos
              </a>
              <button
                onClick={onCartClick}
                className="ml-1 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
                  color: 'white'
                }}
              >
                Panier {cartItemsCount > 0 && `(${cartItemsCount})`}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onCartClick}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 ring-1 ring-border backdrop-blur"
            >
              <ShoppingCart className="h-5 w-5 text-foreground/90" />
              {cartItemsCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  style={{ 
                    backgroundColor: 'var(--shop-primary, hsl(var(--primary)))',
                    color: 'white'
                  }}
                >
                  {cartItemsCount}
                </Badge>
              )}
            </button>
            <button 
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 ring-1 ring-border backdrop-blur"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground/90" />
              ) : (
                <Menu className="h-5 w-5 text-foreground/90" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="px-6 py-4 space-y-2">
              <a 
                href="#"
                className="block rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </a>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MinimalHeader;
