import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreativeFooterProps {
  shopName?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export const CreativeFooter = ({
  shopName = "Ma Boutique",
  description = "Votre destination pour des créations uniques et originales",
  phone = "+226 XX XX XX XX",
  email = "contact@example.com",
  address = "Ouagadougou, Burkina Faso",
  facebook,
  instagram,
  twitter,
}: CreativeFooterProps) => {
  return (
    <footer className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#FF1B8D] rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-[#00F5FF] rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#9D4EDD] rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-righteous bg-gradient-to-r from-[#FF1B8D] to-[#00F5FF] bg-clip-text text-transparent">
              {shopName}
            </h3>
            <p className="text-white/70 font-fredoka leading-relaxed">
              {description}
            </p>
            <div className="flex gap-3">
              {facebook && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/10 hover:bg-gradient-to-r hover:from-[#FF1B8D] hover:to-[#9D4EDD] rounded-full w-11 h-11 hover:scale-110 transition-all duration-300"
                  asChild
                >
                  <a href={facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {instagram && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/10 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F7931E] rounded-full w-11 h-11 hover:scale-110 transition-all duration-300"
                  asChild
                >
                  <a href={instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {twitter && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/10 hover:bg-gradient-to-r hover:from-[#00F5FF] hover:to-[#9D4EDD] rounded-full w-11 h-11 hover:scale-110 transition-all duration-300"
                  asChild
                >
                  <a href={twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-5 h-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-fredoka font-bold text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-3 font-fredoka">
              <li>
                <a href="#products" className="text-white/70 hover:text-[#FF1B8D] transition-colors hover:translate-x-2 inline-block">
                  Nos Produits
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-[#00F5FF] transition-colors hover:translate-x-2 inline-block">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-[#9D4EDD] transition-colors hover:translate-x-2 inline-block">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/70 hover:text-[#FF6B35] transition-colors hover:translate-x-2 inline-block">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-fredoka font-bold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-4 font-fredoka">
              <li className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FF1B8D] group-hover:scale-110 transition-transform" />
                <span>{phone}</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#00F5FF] group-hover:scale-110 transition-transform" />
                <span className="break-all">{email}</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#9D4EDD] group-hover:scale-110 transition-transform" />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xl font-fredoka font-bold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-white/70 font-fredoka text-sm">
              Restez connecté aux dernières créations et offres exclusives
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 font-fredoka backdrop-blur-md focus:bg-white/20 focus:border-[#FF1B8D]"
              />
              <Button className="bg-gradient-to-r from-[#FF1B8D] to-[#9D4EDD] hover:from-[#FF1B8D] hover:to-[#FF6B35] font-fredoka font-bold shrink-0 hover:scale-105 transition-transform">
                OK
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF1B8D] via-[#9D4EDD] via-[#00F5FF] to-[#FF6B35] rounded-full mb-8 animate-pulse"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 font-fredoka">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} {shopName}. Fait avec <Heart className="w-4 h-4 text-[#FF1B8D] fill-[#FF1B8D] animate-pulse" /> au Burkina Faso
          </p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-[#FF1B8D] transition-colors">
              Confidentialité
            </a>
            <a href="#terms" className="hover:text-[#00F5FF] transition-colors">
              Conditions
            </a>
            <a href="#cookies" className="hover:text-[#9D4EDD] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
