import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

interface HauteFashionFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

const HauteFashionFooter = ({
  logo,
  shopName,
  aboutText = "Votre destination pour la mode streetwear premium. Des créations uniques qui redéfinissent les codes de la mode urbaine.",
  phone,
  whatsapp,
  facebook,
  instagram,
  tiktok
}: HauteFashionFooterProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );

  const socialLinks = [
    { icon: 'instagram' as const, href: instagram ? `https://instagram.com/${instagram.replace('@', '')}` : null, label: 'Instagram' },
    { icon: 'facebook' as const, href: facebook ? `https://facebook.com/${facebook}` : null, label: 'Facebook' },
    { icon: 'tiktok' as const, href: tiktok ? `https://tiktok.com/@${tiktok.replace('@', '')}` : null, label: 'TikTok' },
    { icon: 'whatsapp' as const, href: whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : null, label: 'WhatsApp' },
  ].filter(link => link.href);

  const renderSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'tiktok':
        return <TikTokIcon />;
      case 'whatsapp':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const navLinks = [
    { label: 'Produits', href: '#products' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Conditions', href: '/terms' },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative mt-24 pb-8 haute-fashion-theme"
      style={{ backgroundColor: 'hsl(0 0% 4%)' }}
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(24,100%,50%)] rounded-full blur-[200px] opacity-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[hsl(142,70%,45%)] rounded-full blur-[200px] opacity-5" />

      {/* Main Footer Container */}
      <div className="container mx-auto px-4">
        <div 
          className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
            {/* Brand Section - 2 columns */}
            <div 
              className={`md:col-span-2 space-y-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3">
                {logo ? (
                  <img src={logo} alt={shopName} className="h-12 w-auto" />
                ) : (
                  <span className="font-bebas text-3xl text-white tracking-wider">
                    {shopName}
                  </span>
                )}
              </div>
              
              {/* About Text */}
              <p className="text-white/60 font-inter text-sm leading-relaxed max-w-xs">
                {aboutText}
              </p>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-[hsl(24,100%,50%)] hover:border-[hsl(24,100%,50%)] hover:shadow-glow-haute-sm transition-all duration-300 hover:scale-110"
                    >
                      {renderSocialIcon(social.icon)}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div 
              className={`space-y-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h4 className="font-bebas text-lg text-white tracking-wider">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-white/60 hover:text-[hsl(24,100%,50%)] transition-colors duration-300 font-inter text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div 
              className={`space-y-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h4 className="font-bebas text-lg text-white tracking-wider">Contact</h4>
              <ul className="space-y-2">
                {phone && (
                  <li>
                    <a 
                      href={`tel:${phone}`}
                      className="text-white/60 hover:text-[hsl(24,100%,50%)] transition-colors duration-300 font-inter text-sm"
                    >
                      {phone}
                    </a>
                  </li>
                )}
                {whatsapp && (
                  <li>
                    <a 
                      href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[hsl(24,100%,50%)] transition-colors duration-300 font-inter text-sm"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Newsletter / CTA */}
            <div 
              className={`space-y-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <h4 className="font-bebas text-lg text-white tracking-wider">Restons Connectés</h4>
              <p className="text-white/60 font-inter text-sm">
                Suivez-nous pour les dernières nouveautés et offres exclusives.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div 
            className={`mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <p className="text-white/40 font-inter text-sm">
              © {new Date().getFullYear()} {shopName}. Tous droits réservés.
            </p>
            <p className="text-white/40 font-inter text-sm">
              Propulsé par <span className="text-gradient-haute font-semibold">BurkE-Shop</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HauteFashionFooter;
