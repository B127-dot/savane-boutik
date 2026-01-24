import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface UrbanwaveHeaderProps {
  logo?: string;
  shopName: string;
  cartItemCount: number;
  onCartClick: () => void;
  shopUrl?: string;
}

const navLinks = [
  { name: 'Nouveautés', href: '#nouveautes' },
  { name: 'Produits', href: '#products' },
  { name: 'Catégories', href: '#categories' },
  { name: 'À propos', href: '#about' },
];

const UrbanwaveHeader = ({
  logo,
  shopName,
  cartItemCount,
  onCartClick,
  shopUrl = '',
}: UrbanwaveHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={`/shop/${shopUrl}`} className="flex items-center gap-2">
            {logo ? (
              <img src={logo} alt={shopName} className="h-8 object-contain" />
            ) : (
              <span className="font-display text-2xl tracking-wider text-gradient">
                {shopName || 'URBANWAVE'}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <nav className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block py-3 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex gap-4 pt-4 border-t border-border mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Search className="h-4 w-4 mr-2" /> Rechercher
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <User className="h-4 w-4 mr-2" /> Compte
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default UrbanwaveHeader;
