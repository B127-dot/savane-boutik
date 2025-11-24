import { Facebook, Instagram, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ModernFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

const ModernFooter = ({ 
  logo, 
  shopName, 
  aboutText = "Votre boutique en ligne de confiance",
  phone,
  whatsapp,
  facebook,
  instagram,
  tiktok
}: ModernFooterProps) => {
  return (
    <footer className="w-full bg-[#111827] text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: Logo + About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {logo ? (
                <img 
                  src={logo} 
                  alt={shopName} 
                  className="h-12 w-12 object-contain rounded-lg"
                />
              ) : (
                <div className="h-12 w-12 rounded-lg bg-[#10B981] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {shopName.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-xl font-display font-bold">{shopName}</span>
            </div>
            <p className="font-body text-white/70 leading-relaxed">
              {aboutText}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold">Navigation</h3>
            <ul className="space-y-3 font-body">
              <li>
                <Link to="#products" className="text-white/70 hover:text-[#10B981] transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="#contact" className="text-white/70 hover:text-[#10B981] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#faq" className="text-white/70 hover:text-[#10B981] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#conditions" className="text-white/70 hover:text-[#10B981] transition-colors">
                  Conditions de Vente
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact + Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold">Contact</h3>
            <div className="space-y-3 font-body">
              {phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#10B981]" />
                  <a 
                    href={`tel:${phone}`}
                    className="text-white/70 hover:text-[#10B981] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              )}
              {whatsapp && (
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[#10B981]" />
                  <a 
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#10B981] transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 pt-4">
              {facebook && (
                <a 
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {instagram && (
                <a 
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {tiktok && (
                <a 
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-colors"
                >
                  <span className="text-sm font-bold">TT</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © 2025 {shopName}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link to="#privacy" className="text-white/50 hover:text-white text-sm transition-colors">
                Confidentialité
              </Link>
              <Link to="#terms" className="text-white/50 hover:text-white text-sm transition-colors">
                Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
