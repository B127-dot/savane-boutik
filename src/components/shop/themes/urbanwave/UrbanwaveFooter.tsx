import { Instagram, Twitter, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UrbanwaveFooterProps {
  shopName?: string;
  logo?: string;
  aboutText?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  shopUrl?: string;
}

const footerLinks = {
  shop: [
    { name: 'Nouveautés', href: '#' },
    { name: 'Homme', href: '#' },
    { name: 'Femme', href: '#' },
    { name: 'Accessoires', href: '#' },
    { name: 'Promotions', href: '#' },
  ],
  help: [
    { name: 'FAQ', href: '#' },
    { name: 'Livraison', href: '#' },
    { name: 'Retours', href: '#' },
    { name: 'Suivi commande', href: '#' },
    { name: 'Guide des tailles', href: '#' },
  ],
  company: [
    { name: 'À propos', href: '#' },
    { name: 'Carrières', href: '#' },
    { name: 'Presse', href: '#' },
    { name: 'Durabilité', href: '#' },
    { name: 'Affiliés', href: '#' },
  ],
};

const UrbanwaveFooter = ({
  shopName = 'URBANWAVE',
  logo,
  aboutText = 'Votre destination streetwear premium. Des pièces uniques pour ceux qui osent se démarquer.',
  phone = '+33 1 23 45 67 89',
  email = 'contact@urbanwave.com',
  address = '123 Rue de la Mode, 75001 Paris',
  facebook,
  instagram,
  shopUrl = '',
}: UrbanwaveFooterProps) => {
  const socialLinks = [
    { icon: Instagram, href: instagram || '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: facebook || '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ].filter(link => link.href !== '#' || link.icon === Twitter || link.icon === Youtube);

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to={`/shop/${shopUrl}`} className="inline-block mb-4">
              {logo ? (
                <img src={logo} alt={shopName} className="h-10 object-contain" />
              ) : (
                <span className="font-display text-3xl text-gradient">{shopName}</span>
              )}
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">{aboutText}</p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              {address && (
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {address}
                </p>
              )}
              {phone && (
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  {phone}
                </p>
              )}
              {email && (
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {email}
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display text-lg mb-4 tracking-wide">BOUTIQUE</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 tracking-wide">AIDE</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 tracking-wide">ENTREPRISE</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {shopName}. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Conditions générales
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Confidentialité
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UrbanwaveFooter;
