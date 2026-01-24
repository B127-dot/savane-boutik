import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_TEXTS } from '@/lib/defaultTexts';

interface ModernHeaderProps {
  logo?: string;
  shopName: string;
  cartItemCount?: number;
  onCartClick?: () => void;
  shopUrl?: string;
}

const ModernHeader = ({
  logo,
  shopName,
  cartItemCount = 0,
  onCartClick,
  shopUrl,
}: ModernHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: DEFAULT_TEXTS.header.home, href: shopUrl ? `/shop/${shopUrl}` : '/' },
    { label: DEFAULT_TEXTS.header.products, href: '#products' },
    { label: DEFAULT_TEXTS.header.about, href: '#about' },
    { label: DEFAULT_TEXTS.header.contact, href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to={shopUrl ? `/shop/${shopUrl}` : '/'}
            className="flex items-center gap-3"
          >
            {logo ? (
              <img
                src={logo}
                alt={shopName}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
              >
                {shopName.charAt(0)}
              </div>
            )}
            <span
              className={`font-display font-bold text-lg transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              {shopName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`font-body text-sm font-medium transition-colors hover:opacity-80 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'hover:bg-muted text-foreground'
                  : 'hover:bg-white/20 text-white'
              }`}
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                >
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'hover:bg-muted text-foreground'
                  : 'hover:bg-white/20 text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left py-3 px-4 rounded-lg font-body text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onCartClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between py-3 px-4 rounded-lg font-body text-foreground hover:bg-muted transition-colors"
              >
                <span>{DEFAULT_TEXTS.header.cart}</span>
                {cartItemCount > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ModernHeader;
