import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Y2KHeaderProps {
  shopName: string;
  logo?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
  shopUrl?: string;
}

const Y2KHeader = ({ shopName, logo, cartItemCount = 0, onCartClick, shopUrl }: Y2KHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ['BOUTIQUE', 'NOUVEAU', 'VIBES', 'À PROPOS'];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-primary/20"
    >
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={shopUrl ? `/shop/${shopUrl}` : '/'} className="flex items-center gap-2">
          {logo ? (
            <img src={logo} alt={shopName} className="h-8 w-auto" />
          ) : (
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-black text-xl tracking-tight bg-gradient-primary bg-clip-text text-transparent">
                {shopName || 'GLOWUP'}
              </span>
            </motion.div>
          )}
        </Link>

        {/* Navigation Centre - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.button
              key={link}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-4 py-2 font-display font-semibold text-sm text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
            >
              {link}
            </motion.button>
          ))}
        </div>

        {/* Right - Cart & Menu */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onCartClick}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2.5 rounded-full bg-gradient-primary text-primary-foreground shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center"
              >
                {cartItemCount}
              </motion.span>
            )}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-background border-b-2 border-primary/20 py-4"
        >
          <div className="flex flex-col items-center gap-2 px-4">
            {navLinks.map((link) => (
              <button
                key={link}
                className="w-full py-3 font-display font-semibold text-center rounded-full hover:bg-primary/10 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Y2KHeader;
