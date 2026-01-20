import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AesthetiqueHeaderProps {
  logo?: string;
  shopName: string;
  cartItemsCount: number;
  onCartClick: () => void;
}

const AesthetiqueHeader = ({ logo, shopName, cartItemsCount, onCartClick }: AesthetiqueHeaderProps) => {
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
    { label: 'Collection', href: '#products' },
    { label: 'Atelier', href: '#about' },
    { label: 'Journal', href: '#journal' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6 md:px-12 md:py-8 ${
          isScrolled 
            ? 'bg-zinc-950/95 backdrop-blur-md' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <a 
            href="#" 
            className="flex items-center gap-1 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {logo ? (
              <img 
                src={logo} 
                alt={shopName} 
                className="h-8 md:h-10 w-auto object-contain" 
              />
            ) : (
              <>
                <span className="font-instrument-serif text-2xl md:text-3xl tracking-tight text-white">
                  {shopName.toLowerCase()}
                </span>
                <span 
                  className="w-1.5 h-1.5 rounded-full mb-1 ml-0.5 shop-primary-bg"
                  style={{ backgroundColor: 'var(--shop-primary)' }}
                ></span>
              </>
            )}
          </a>

          {/* Navigation - Desktop - Center */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-white transition-colors hover:opacity-80"
                style={{ '--hover-color': 'var(--shop-primary)' } as React.CSSProperties}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--shop-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button 
              className="text-sm font-medium uppercase tracking-wide text-white transition-colors hidden md:block hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--shop-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button
              onClick={onCartClick}
              className="relative group"
            >
              <span className="text-sm font-medium uppercase tracking-wide text-white group-hover:opacity-80 transition-colors">
                Panier (<span style={{ color: 'var(--shop-primary)' }}>{cartItemsCount}</span>)
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-zinc-950"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-16">
                <span className="font-instrument-serif text-2xl text-white flex items-center gap-1">
                  {shopName.toLowerCase()}
                  <span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--shop-primary)' }}
                  ></span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full border border-zinc-800 text-white hover:bg-white hover:text-zinc-950 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-instrument-serif text-white transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--shop-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onCartClick();
                  }}
                  className="w-full py-4 bg-white text-zinc-950 font-medium uppercase tracking-wide shop-btn-radius"
                  style={{ borderRadius: 'var(--shop-btn-radius, 9999px)' }}
                >
                  Voir le panier ({cartItemsCount})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AesthetiqueHeader;
