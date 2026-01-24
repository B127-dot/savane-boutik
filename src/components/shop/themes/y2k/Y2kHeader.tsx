import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

interface Y2kHeaderProps {
  shopUrl: string;
  shopName?: string;
  logoUrl?: string;
  onCartClick?: () => void;
}

export const Y2kHeader = ({ shopUrl, shopName, logoUrl, onCartClick }: Y2kHeaderProps) => {
  const { cart } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-card/80 backdrop-blur-xl rounded-full px-6 py-3 border border-border/50 shadow-lg"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={`/shop/${shopUrl}`} className="flex items-center gap-2">
              {logoUrl ? (
                <img src={logoUrl} alt={shopName} className="h-8 w-auto" />
              ) : (
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-outfit font-bold text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {shopName || 'GLOWUP'}
                  </span>
                </motion.div>
              )}
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                to={`/shop/${shopUrl}`} 
                className="text-sm font-outfit font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                SHOP
              </Link>
              <Link 
                to={`/shop/${shopUrl}#categories`} 
                className="text-sm font-outfit font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                CATEGORIES
              </Link>
              <Link 
                to={`/shop/${shopUrl}#new`} 
                className="text-sm font-outfit font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                NEW IN
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <Heart className="w-5 h-5 text-muted-foreground" />
              </motion.button>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCartClick}
                className="flex items-center gap-2 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] text-primary-foreground px-4 py-2 rounded-full font-outfit font-bold text-sm shadow-lg transition-all duration-300"
                style={{ boxShadow: '0 0 20px hsl(330 90% 60% / 0.3)' }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>BAG</span>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-accent text-accent-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-4 right-4 bg-card/95 backdrop-blur-xl rounded-3xl p-6 border border-border/50 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              <Link 
                to={`/shop/${shopUrl}`} 
                className="text-lg font-outfit font-medium text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link 
                to={`/shop/${shopUrl}#categories`} 
                className="text-lg font-outfit font-medium text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                CATEGORIES
              </Link>
              <Link 
                to={`/shop/${shopUrl}#new`} 
                className="text-lg font-outfit font-medium text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                NEW IN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Y2kHeader;
