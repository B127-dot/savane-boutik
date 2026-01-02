import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NoirLuxeHeaderProps {
  logo?: string;
  shopName: string;
  cartItemsCount: number;
  onCartClick: () => void;
}

const NoirLuxeHeader = ({ logo, shopName, cartItemsCount, onCartClick }: NoirLuxeHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-noir/95 backdrop-blur-md border-b border-gold-light' 
          : 'bg-transparent'
      }`}
    >
      {/* Golden line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-gold opacity-60" />
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            {logo ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-gold rounded-lg opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                <img 
                  src={logo} 
                  alt={shopName} 
                  className="relative h-12 w-12 object-contain rounded-lg border border-gold-light"
                />
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-gold rounded-lg opacity-20 blur group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative h-12 w-12 rounded-lg bg-noir-card border border-gold flex items-center justify-center">
                  <span className="font-cinzel text-gold text-xl font-bold">
                    {shopName.charAt(0)}
                  </span>
                </div>
              </div>
            )}
            <span className="font-cinzel text-xl font-semibold tracking-wider text-white hidden sm:block">
              {shopName}
            </span>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {['Accueil', 'Produits', 'Catégories', 'Contact'].map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative font-inter text-sm tracking-wide text-white/80 hover-gold-text transition-colors duration-300 group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Section: Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-12 w-12 rounded-lg border border-gold-light hover:border-gold hover:bg-gold/10 transition-all duration-300 group"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5 text-white group-hover:text-gold transition-colors duration-300" />
              {cartItemsCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-gold text-noir font-bold text-xs border-0 animate-noir-scale-in"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-12 w-12 rounded-lg border border-gold-light hover:border-gold hover:bg-gold/10 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gold" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-noir-light/95 backdrop-blur-md border-t border-gold-light px-4 py-6">
          <div className="flex flex-col gap-4">
            {['Accueil', 'Produits', 'Catégories', 'Contact'].map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-inter text-base text-white/80 hover:text-gold py-2 border-b border-white/10 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Bottom golden line when scrolled */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-gold opacity-40" />
      )}
    </header>
  );
};

export default NoirLuxeHeader;
