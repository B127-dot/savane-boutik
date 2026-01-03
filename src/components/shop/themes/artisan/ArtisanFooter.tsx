import { Facebook, Instagram, Twitter, Youtube, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArtisanFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

const ArtisanFooter = ({
  logo,
  shopName,
  aboutText,
  phone,
  whatsapp,
  facebookUrl,
  instagramUrl,
  tiktokUrl,
}: ArtisanFooterProps) => {
  const socialLinks = [
    { icon: Facebook, url: facebookUrl, label: 'Facebook' },
    { icon: Instagram, url: instagramUrl, label: 'Instagram' },
    { icon: Twitter, url: tiktokUrl, label: 'TikTok' },
    { icon: Youtube, url: '#', label: 'YouTube' },
  ].filter(link => link.url);

  return (
    <footer className="bg-artisan-cream border-t border-artisan-charcoal/10">
      {/* Newsletter Section */}
      <div className="border-b border-artisan-charcoal/10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-artisan-charcoal mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-artisan-charcoal/60">
                Subscribe to our newsletter to be the first to know about news and offers.
              </p>
            </div>
            
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-5 py-4 rounded-xl border border-artisan-charcoal/10 bg-white text-artisan-charcoal placeholder:text-artisan-charcoal/40 focus:outline-none focus:border-artisan-olive"
              />
              <button className="px-6 py-4 bg-artisan-olive text-white rounded-xl font-medium hover:bg-artisan-olive-dark transition-all duration-300 flex items-center gap-2">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            {logo ? (
              <img src={logo} alt={shopName} className="h-10 mb-4" />
            ) : (
              <h4 className="font-serif text-2xl text-artisan-charcoal mb-4">{shopName}</h4>
            )}
            <p className="text-sm text-artisan-charcoal/60 leading-relaxed mb-4">
              {aboutText || "Découvrez des produits artisanaux uniques, fabriqués avec passion et savoir-faire."}
            </p>
            {phone && (
              <div className="flex items-center gap-2 text-sm text-artisan-charcoal/60">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </div>
            )}
          </div>

          {/* Menu Column */}
          <div>
            <h5 className="font-medium text-artisan-charcoal mb-4">Menu</h5>
            <ul className="space-y-3">
              {['Accueil', 'Boutique', 'Collections', 'À propos', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-artisan-charcoal/60 hover:text-artisan-olive transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Operational Column */}
          <div>
            <h5 className="font-medium text-artisan-charcoal mb-4">Horaires</h5>
            <ul className="space-y-3 text-sm text-artisan-charcoal/60">
              <li>Lun - Ven: 9h00 - 19h00</li>
              <li>Sam - Dim: 8h30 - 21h00</li>
            </ul>
            
            {whatsapp && (
              <div className="mt-6">
                <p className="text-sm text-artisan-charcoal/60 mb-2">Besoin d'aide?</p>
                <a 
                  href={`https://wa.me/${whatsapp}`}
                  className="inline-flex items-center gap-2 text-artisan-olive font-medium text-sm hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  +{whatsapp}
                </a>
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div>
            <h5 className="font-medium text-artisan-charcoal mb-4">Paiement accepté</h5>
            <div className="flex flex-wrap gap-2">
              {['Orange Money', 'MTN MoMo', 'Wave', 'Visa', 'Cash'].map((method) => (
                <span 
                  key={method}
                  className="px-3 py-1.5 bg-white border border-artisan-charcoal/10 rounded text-xs text-artisan-charcoal/70"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-artisan-charcoal/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-artisan-charcoal/50">
              Copyright © {shopName}. All Rights Reserved.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url || '#'}
                  className="w-9 h-9 rounded-full border border-artisan-charcoal/10 flex items-center justify-center text-artisan-charcoal/50 hover:bg-artisan-olive hover:border-artisan-olive hover:text-white transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {['Login', 'Register', 'Contact Us', 'Privacy Policy'].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-sm text-artisan-charcoal/50 hover:text-artisan-olive transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ArtisanFooter;
