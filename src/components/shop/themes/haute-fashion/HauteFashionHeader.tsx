import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HauteFashionHeaderProps {
  shopName?: string;
  logoUrl?: string;
  cartItemsCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

const HauteFashionHeader: React.FC<HauteFashionHeaderProps> = ({
  shopName = 'URBANWAVE',
  logoUrl,
  cartItemsCount = 0,
  onCartClick,
  onSearchClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Nouveautés', href: '#nouveautes' },
    { label: 'Homme', href: '#homme' },
    { label: 'Femme', href: '#femme' },
    { label: 'Accessoires', href: '#accessoires' },
    { label: 'Collections', href: '#collections' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[hsl(0,0%,4%)]/90 backdrop-blur-xl border-b border-[hsl(0,0%,15%)]' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/shop" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(24,100%,50%)] to-[hsl(24,100%,40%)] flex items-center justify-center shadow-glow-haute-sm group-hover:shadow-glow-haute transition-shadow duration-300">
                {logoUrl ? (
                  <img src={logoUrl} alt={shopName} className="w-6 h-6 object-contain" />
                ) : (
                  <span className="text-white font-bold text-lg">UW</span>
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-[hsl(24,100%,50%)] blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <div className="hidden sm:flex items-baseline">
              <span className="text-white font-bold text-xl tracking-tight">URBAN</span>
              <span className="text-gradient-haute font-bold text-xl tracking-tight">WAVE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 bg-[hsl(0,0%,10%)]/60 backdrop-blur-md rounded-full px-2 py-1.5 border border-[hsl(0,0%,20%)]/50">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm text-[hsl(0,0%,70%)] hover:text-white transition-colors duration-200 rounded-full hover:bg-[hsl(0,0%,15%)]/50"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button 
              onClick={onSearchClick}
              className="w-10 h-10 rounded-full bg-[hsl(0,0%,10%)]/60 backdrop-blur-md border border-[hsl(0,0%,20%)]/50 flex items-center justify-center text-[hsl(0,0%,70%)] hover:text-white hover:bg-[hsl(0,0%,15%)] transition-all duration-200"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative w-10 h-10 rounded-full bg-[hsl(0,0%,10%)]/60 backdrop-blur-md border border-[hsl(0,0%,20%)]/50 flex items-center justify-center text-[hsl(0,0%,70%)] hover:text-white hover:bg-[hsl(0,0%,15%)] transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[hsl(24,100%,50%)] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-glow-haute-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Button 
              variant="cta" 
              size="sm"
              className="hidden sm:flex items-center gap-2"
              onClick={() => navigate('/shop#products')}
            >
              Acheter
              <ArrowRight className="w-4 h-4" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="w-10 h-10 rounded-full bg-[hsl(0,0%,10%)]/60 backdrop-blur-md border border-[hsl(0,0%,20%)]/50 flex items-center justify-center text-white">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-[hsl(0,0%,4%)] border-l border-[hsl(0,0%,15%)] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-[hsl(0,0%,15%)]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(24,100%,50%)] to-[hsl(24,100%,40%)] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">UW</span>
                      </div>
                      <span className="text-white font-bold">URBANWAVE</span>
                    </div>
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-2">
                      {navLinks.map((link, index) => (
                        <button
                          key={link.label}
                          onClick={() => handleNavClick(link.href)}
                          className="w-full text-left px-4 py-3 text-lg text-[hsl(0,0%,70%)] hover:text-white hover:bg-[hsl(0,0%,10%)] rounded-xl transition-colors duration-200"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="p-6 border-t border-[hsl(0,0%,15%)]">
                    <Button 
                      variant="cta" 
                      size="lg"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => {
                        navigate('/shop#products');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Acheter maintenant
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HauteFashionHeader;
