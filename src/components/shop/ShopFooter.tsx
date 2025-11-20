import { Facebook, Instagram, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ShopFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

const ShopFooter = ({ 
  logo, 
  shopName, 
  aboutText = "Votre boutique en ligne de confiance",
  phone,
  whatsapp,
  facebook,
  instagram,
  tiktok
}: ShopFooterProps) => {
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
              <span className="text-xl font-bold">{shopName}</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              {aboutText}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-3">
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
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
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
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {instagram && (
                <a 
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {tiktok && (
                <a 
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#10B981] flex items-center justify-center transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {shopName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
