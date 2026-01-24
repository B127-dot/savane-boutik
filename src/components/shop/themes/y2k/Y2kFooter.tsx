import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Instagram, Heart, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Y2kFooterProps {
  shopUrl: string;
  shopName?: string;
  whatsappNumber?: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
}

export const Y2kFooter = ({ 
  shopUrl, 
  shopName = "GLOWUP",
  whatsappNumber,
  email,
  instagram,
  tiktok
}: Y2kFooterProps) => {
  return (
    <footer className="relative overflow-hidden y2k-theme">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      {/* Newsletter Section */}
      <div className="relative border-t border-border/50">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30 mb-6">
              <Heart className="w-4 h-4 text-primary" />
              <span className="font-outfit text-sm font-medium text-primary">JOIN THE GLOW GANG</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-outfit font-black mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Stay in the Loop ✨
              </span>
            </h3>
            
            <p className="text-muted-foreground font-outfit mb-8">
              Get exclusive drops, early access & main character energy delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your.email@vibes.com"
                className="flex-1 rounded-full border-2 border-border/50 focus:border-primary font-outfit py-6"
              />
              <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-primary to-secondary font-outfit font-bold glow-pink">
                SUBSCRIBE
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative border-t border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to={`/shop/${shopUrl}`} className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-outfit font-bold text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {shopName}
                </span>
              </Link>
              <p className="text-sm text-muted-foreground font-outfit mb-4">
                Serving main character energy since day one. Your go-to for all the Y2K vibes that hit different.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {instagram && (
                  <a 
                    href={`https://instagram.com/${instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center hover:from-primary hover:to-secondary transition-all group"
                  >
                    <Instagram className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </a>
                )}
                {tiktok && (
                  <a 
                    href={`https://tiktok.com/@${tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center hover:from-primary hover:to-secondary transition-all group"
                  >
                    <span className="font-bold text-sm text-primary group-hover:text-primary-foreground transition-colors">TT</span>
                  </a>
                )}
                {whatsappNumber && (
                  <a 
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center hover:from-primary hover:to-secondary transition-all group"
                  >
                    <span className="font-bold text-sm text-primary group-hover:text-primary-foreground transition-colors">WA</span>
                  </a>
                )}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-outfit font-bold text-sm uppercase tracking-wider mb-4">Shop</h4>
              <ul className="space-y-3">
                <li>
                  <Link to={`/shop/${shopUrl}`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to={`/shop/${shopUrl}#new`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to={`/shop/${shopUrl}#bestsellers`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link to={`/shop/${shopUrl}#sale`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="font-outfit font-bold text-sm uppercase tracking-wider mb-4">Help</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-outfit font-bold text-sm uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors font-outfit">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-outfit">
              © 2025 {shopName}. Made with 💖 and main character energy.
            </p>
            <p className="text-sm text-muted-foreground font-outfit flex items-center gap-1">
              Powered by <span className="text-primary font-bold">BurkE-Shop</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Y2kFooter;
