import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ArtisanHeaderProps {
  logo?: string;
  shopName: string;
  cartItemsCount: number;
  onCartClick: () => void;
}

const ArtisanHeader = ({ logo, shopName, cartItemsCount, onCartClick }: ArtisanHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '#products' },
    { label: 'Collections', href: '#categories' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-artisan-cream/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Navigation - Desktop - Left */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium tracking-wide transition-all duration-300 relative group text-artisan-charcoal"
                >
                  {link.label}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full shop-primary-bg"
                    style={{ backgroundColor: 'var(--shop-primary)' }}
                  />
                </a>
              ))}
            </nav>

            {/* Logo - Center */}
            <a 
              href="#" 
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {logo ? (
                <div className="relative">
                  <img 
                    src={logo} 
                    alt={shopName} 
                    className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
              ) : (
                <span className="font-serif text-2xl md:text-3xl tracking-tight transition-colors duration-300 text-artisan-charcoal">
                  {shopName}
                </span>
              )}
            </a>

            {/* Navigation - Desktop - Right + Cart */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(2).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium tracking-wide transition-all duration-300 relative group text-artisan-charcoal"
                >
                  {link.label}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--shop-primary)' }}
                  />
                </a>
              ))}
              
              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative group p-2 rounded-full transition-all duration-300 hover:bg-artisan-sand/50"
              >
                <ShoppingBag className="h-5 w-5 text-artisan-charcoal transition-transform duration-300 group-hover:scale-110" />
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium text-white rounded-full shop-primary-bg"
                    style={{ backgroundColor: 'var(--shop-primary)' }}
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button + Cart */}
            <div className="flex lg:hidden items-center gap-4">
              <button
                onClick={onCartClick}
                className="relative p-2"
              >
                <ShoppingBag className="h-5 w-5 text-artisan-charcoal" />
                {cartItemsCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium text-white rounded-full"
                    style={{ backgroundColor: 'var(--shop-primary)' }}
                  >
                    {cartItemsCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-white shop-primary-bg"
                style={{ backgroundColor: 'var(--shop-primary)' }}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-artisan-cream"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-2xl text-artisan-charcoal">{shopName}</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-artisan-sand"
                >
                  <X className="h-6 w-6 text-artisan-charcoal" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-serif text-artisan-charcoal transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--shop-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#1c1917'}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArtisanHeader;
