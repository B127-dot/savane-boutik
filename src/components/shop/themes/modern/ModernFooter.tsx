import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { PaymentMethodsGrid } from '@/components/shop/PaymentMethodsIcons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

// TikTok Icon Component
const TikTokIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface ModernFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  paymentMethods?: string[];
  showNewsletter?: boolean;
  newsletterTitle?: string;
  showPoweredBy?: boolean;
}

const ModernFooter = ({
  logo,
  shopName,
  aboutText = "Votre boutique en ligne de confiance.",
  phone,
  whatsapp,
  email,
  address,
  facebook,
  instagram,
  tiktok,
  paymentMethods = ['orange-money', 'moov-money', 'wave', 'cash'],
  showNewsletter = true,
  newsletterTitle = "Restez informé",
  showPoweredBy = true,
}: ModernFooterProps) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const hasSocialLinks = facebook || instagram || tiktok;
  const hasContactInfo = phone || whatsapp || email || address;

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      {showNewsletter && (
        <div 
          className="py-12 border-b border-white/10"
          style={{ 
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--shop-primary, hsl(var(--primary))) 20%, #111827) 0%, #111827 100%)'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-2xl font-display font-bold mb-2">{newsletterTitle}</h3>
              <p className="text-white/70 mb-6">
                Recevez nos offres exclusives et nouveautés directement dans votre boîte mail.
              </p>
              
              {isSubscribed ? (
                <div 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium"
                  style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                >
                  <span>✓</span>
                  <span>Merci pour votre inscription !</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Votre email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                  <Button 
                    type="submit"
                    className="px-6"
                    style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {logo ? (
                <img src={logo} alt={shopName} className="h-12 w-auto object-contain" />
              ) : (
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: 'var(--shop-primary, hsl(var(--primary)))' }}
                >
                  {shopName.charAt(0)}
                </div>
              )}
              <span className="font-display font-bold text-xl">{shopName}</span>
            </div>
            <p className="text-white/70 font-body text-sm leading-relaxed">
              {aboutText}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#products" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  <span>Produits</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  <span>À propos</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a href="#cgv" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  <span>Conditions de vente</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          {hasContactInfo && (
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Contact</h4>
              <ul className="space-y-3">
                {phone && (
                  <li>
                    <a href={`tel:${phone}`} className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-3">
                      <Phone className="h-4 w-4" style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }} />
                      <span>{phone}</span>
                    </a>
                  </li>
                )}
                {whatsapp && (
                  <li>
                    <a 
                      href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-3"
                    >
                      <MessageCircle className="h-4 w-4" style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }} />
                      <span>WhatsApp</span>
                    </a>
                  </li>
                )}
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-3">
                      <Mail className="h-4 w-4" style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }} />
                      <span>{email}</span>
                    </a>
                  </li>
                )}
                {address && (
                  <li className="text-white/70 text-sm flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }} />
                    <span>{address}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Column 4: Social */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Suivez-nous</h4>
            {hasSocialLinks ? (
              <div className="flex items-center gap-3">
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {tiktok && (
                  <a
                    href={tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                    aria-label="TikTok"
                  >
                    <TikTokIcon />
                  </a>
                )}
              </div>
            ) : (
              <p className="text-white/50 text-sm">Bientôt disponible</p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/50 text-sm font-medium uppercase tracking-wide">
              Moyens de paiement acceptés
            </p>
            <PaymentMethodsGrid 
              methods={paymentMethods} 
              size={44}
              className="justify-center"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {shopName}. Tous droits réservés.
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              <a href="/privacy" className="text-white/50 hover:text-white transition-colors">
                Confidentialité
              </a>
              <span className="text-white/30">|</span>
              <a href="/terms" className="text-white/50 hover:text-white transition-colors">
                Conditions
              </a>
            </div>

            {showPoweredBy && (
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <span>Propulsé par</span>
                <a 
                  href="https://burkinashop.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-white transition-colors"
                  style={{ color: 'var(--shop-primary, hsl(var(--primary)))' }}
                >
                  BurkinaShop
                </a>
                <span>🇧🇫</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
