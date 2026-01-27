import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GradientHeaderProps {
  logo?: string;
  shopName: string;
  cartItemsCount: number;
  onCartClick: () => void;
}

const GradientHeader = ({ logo, shopName, cartItemsCount, onCartClick }: GradientHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={`flex md:px-12 md:py-6 px-3 sm:px-6 py-4 relative items-center justify-between transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
      }`}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          {logo ? (
            <img 
              src={logo} 
              alt={shopName} 
              className="h-10 w-10 object-contain rounded-full shadow-[0_0_15px_rgba(var(--shop-primary-rgb,16,185,129),0.4)]"
            />
          ) : (
            <div 
              className="flex text-white w-10 h-10 rounded-full shadow-[0_0_15px_rgba(var(--shop-primary-rgb,16,185,129),0.4)] items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, var(--shop-primary, hsl(var(--primary))), var(--shop-primary-dark, hsl(var(--primary))))` 
              }}
            >
              <span className="font-bold text-lg">
                {shopName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className={`text-lg font-display font-bold hidden sm:block transition-colors ${
            isScrolled ? 'text-foreground' : 'text-white'
          }`}>
            {shopName}
          </span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex rounded-full p-1 shadow-lg backdrop-blur-md border gap-1 items-center transition-all ${
          isScrolled 
            ? 'bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/0 border-white/10' 
            : 'bg-white/10 border-white/20'
        }`}>
          <a 
            href="#products"
            className={`transition-all text-sm font-medium rounded-full py-1.5 px-4 shadow-sm ${
              isScrolled ? 'text-foreground bg-foreground/10' : 'text-white bg-white/20'
            }`}
          >
            Produits
          </a>
          <a 
            href="#categories"
            className={`transition-colors text-sm font-medium py-1.5 px-4 ${
              isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
            }`}
          >
            Catégories
          </a>
          <a 
            href="#about"
            className={`transition-colors text-sm font-medium py-1.5 px-4 ${
              isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
            }`}
          >
            À propos
          </a>
        </div>

        {/* Cart CTA */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onCartClick}
            className="hidden sm:flex cursor-pointer text-sm font-medium text-white rounded-full py-2.5 px-5 gap-2 items-center transition-all hover:shadow-[0_0_30px_rgba(var(--shop-primary-rgb,16,185,129),0.5)]"
            style={{ 
              background: `linear-gradient(180deg, var(--shop-primary, hsl(var(--primary))), var(--shop-primary-dark, hsl(var(--primary))))`,
              boxShadow: '0px 0px 0px 1px var(--shop-primary, hsl(var(--primary))), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="tracking-tight">
              Panier {cartItemsCount > 0 && `(${cartItemsCount})`}
            </span>
          </Button>

          {/* Mobile Cart Icon */}
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden relative h-10 w-10 rounded-full"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
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
          </Button>

          {/* Mobile Menu Icon */}
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
          >
            <div className="px-6 py-4 space-y-2">
              <a 
                href="#products"
                className="block rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted transition-colors"
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

export default GradientHeader;
