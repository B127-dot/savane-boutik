import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SavaneHeaderProps {
  shopName: string;
  logo?: string;
  cartItemsCount: number;
  onCartClick: () => void;
}

const SavaneHeader = ({ shopName, logo, cartItemsCount, onCartClick }: SavaneHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Navigation */}
          <nav className="hidden md:flex items-center gap-8 pl-8">
            <a href="#shop" className="font-heading text-sm uppercase tracking-[0.15em] text-foreground hover:opacity-60 transition-opacity">
              Shop
            </a>
            <a href="#lookbook" className="font-heading text-sm uppercase tracking-[0.15em] text-foreground hover:opacity-60 transition-opacity">
              Lookbook
            </a>
            <a href="#about" className="font-heading text-sm uppercase tracking-[0.15em] text-foreground hover:opacity-60 transition-opacity">
              À Propos
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-4 text-foreground hover:opacity-60 transition-opacity"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            {logo ? (
              <img src={logo} alt={shopName} className="h-8 md:h-10 object-contain" />
            ) : (
              <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-foreground">
                {shopName}
              </h1>
            )}
          </div>

          {/* Cart */}
          <button 
            onClick={onCartClick}
            className="flex items-center gap-2 pr-4 md:pr-8 text-foreground hover:opacity-60 transition-opacity"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="font-heading text-sm uppercase tracking-[0.1em]">
              ({cartItemsCount})
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-40 bg-background border-b border-foreground md:hidden"
          >
            <nav className="flex flex-col">
              <a 
                href="#shop" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-6 px-8 font-heading text-lg uppercase tracking-[0.15em] text-foreground border-b border-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Shop
              </a>
              <a 
                href="#lookbook" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-6 px-8 font-heading text-lg uppercase tracking-[0.15em] text-foreground border-b border-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Lookbook
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-6 px-8 font-heading text-lg uppercase tracking-[0.15em] text-foreground border-b border-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                À Propos
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default SavaneHeader;
