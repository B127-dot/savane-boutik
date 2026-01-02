import { Facebook, Instagram, Phone, MessageCircle, MapPin, Mail, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NoirLuxeFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

const NoirLuxeFooter = ({
  logo,
  shopName,
  aboutText = 'Une boutique d\'excellence dédiée à ceux qui recherchent le raffinement et la qualité dans chaque détail.',
  phone,
  whatsapp,
  email,
  address,
  facebookUrl,
  instagramUrl,
  tiktokUrl
}: NoirLuxeFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-noir pt-20 pb-8 overflow-hidden">
      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(43 74% 49%) 1px, transparent 1px),
                              radial-gradient(circle at 80% 50%, hsl(43 74% 49%) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {logo ? (
                <img 
                  src={logo} 
                  alt={shopName}
                  className="h-14 w-14 object-contain rounded-none border border-gold/30"
                />
              ) : (
                <div className="h-14 w-14 bg-noir-card border border-gold flex items-center justify-center">
                  <Crown className="w-6 h-6 text-gold" />
                </div>
              )}
              <span className="font-cinzel text-xl font-bold text-white tracking-wider">
                {shopName}
              </span>
            </div>
            
            {/* About Text */}
            <p className="font-inter text-sm text-white/60 leading-relaxed">
              {aboutText}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {facebookUrl && (
                <a 
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {instagramUrl && (
                <a 
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {whatsapp && (
                <a 
                  href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="font-cinzel text-sm font-semibold text-gold tracking-widest uppercase">
              Navigation
            </h4>
            <ul className="space-y-3">
              {['Accueil', 'Produits', 'Nouveautés', 'Catégories', 'À Propos'].map((link) => (
                <li key={link}>
                  <Link 
                    to="#"
                    className="font-inter text-sm text-white/60 hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-gold group-hover:w-3 transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="font-cinzel text-sm font-semibold text-gold tracking-widest uppercase">
              Service Client
            </h4>
            <ul className="space-y-3">
              {['Contact', 'FAQ', 'Livraison', 'Retours', 'Conditions de Vente'].map((link) => (
                <li key={link}>
                  <Link 
                    to="#"
                    className="font-inter text-sm text-white/60 hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-gold group-hover:w-3 transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-cinzel text-sm font-semibold text-gold tracking-widest uppercase">
              Contact
            </h4>
            <div className="space-y-4">
              {phone && (
                <a 
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 font-inter text-sm text-white/60 hover:text-gold transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  {phone}
                </a>
              )}
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 font-inter text-sm text-white/60 hover:text-gold transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  {email}
                </a>
              )}
              {address && (
                <div className="flex items-start gap-3 font-inter text-sm text-white/60">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  {address}
                </div>
              )}
            </div>

            {/* WhatsApp CTA */}
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold text-gold font-inter text-sm hover:bg-gold hover:text-noir transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Discuter sur WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-inter text-xs text-white/40">
            © {currentYear} {shopName}. Tous droits réservés.
          </p>
          <p className="font-inter text-xs text-white/40">
            Créé avec <span className="text-gold">♦</span> sur BurkE-Shop
          </p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-gold/10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-gold/10" />
    </footer>
  );
};

export default NoirLuxeFooter;
