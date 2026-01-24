import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Instagram, Facebook, Send, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DEFAULT_TEXTS } from '@/lib/defaultTexts';

interface Y2KFooterProps {
  shopName: string;
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

const Y2KFooter = ({
  shopName,
  logo,
  aboutText = DEFAULT_TEXTS.footer.aboutDefault,
  phone,
  email,
  address,
  whatsapp,
  facebook,
  instagram,
  tiktok,
  shopUrl,
}: Y2KFooterProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navigation = [
    DEFAULT_TEXTS.footer.links.products.toUpperCase(),
    DEFAULT_TEXTS.productCard.newBadge,
    DEFAULT_TEXTS.header.about.toUpperCase(),
    DEFAULT_TEXTS.header.contact.toUpperCase()
  ];
  const help = [
    DEFAULT_TEXTS.footer.help.faq,
    DEFAULT_TEXTS.footer.help.shipping,
    DEFAULT_TEXTS.footer.help.returns,
    DEFAULT_TEXTS.footer.help.sizeGuide
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setIsSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h3 className="font-display font-black text-2xl lg:text-3xl mb-2">
                {DEFAULT_TEXTS.newsletter.y2kTitle.split(' ')[0].toUpperCase()}{' '}
                <span className="text-primary">{DEFAULT_TEXTS.newsletter.y2kTitle.split(' ').slice(1).join(' ').toUpperCase()}</span>
              </h3>
              <p className="font-body text-background/70 max-w-md">
                {DEFAULT_TEXTS.newsletter.y2kSubtitle}
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubscribe}
              className="flex gap-3 w-full lg:w-auto"
            >
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-primary font-display font-bold">
                  <Sparkles className="w-5 h-5" />
                  {DEFAULT_TEXTS.newsletter.y2kSuccess}
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={DEFAULT_TEXTS.newsletter.placeholder}
                    className="flex-1 lg:w-72 px-5 py-3 rounded-full bg-background/10 border-2 border-background/20 text-background placeholder:text-background/50 font-body focus:outline-none focus:border-primary transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-primary text-primary-foreground font-display font-bold rounded-full flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">{DEFAULT_TEXTS.newsletter.buttonText.toUpperCase()}</span>
                  </motion.button>
                </>
              )}
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to={shopUrl ? `/shop/${shopUrl}` : '/'} className="flex items-center gap-2 mb-4">
              {logo ? (
                <img src={logo} alt={shopName} className="h-8 w-auto" />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-display font-black text-xl">{shopName || 'GLOWUP'}</span>
                </div>
              )}
            </Link>
            <p className="font-body text-sm text-background/70 mb-4 leading-relaxed">
              {aboutText}
            </p>
            <div className="flex gap-3">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {tiktok && (
                <a href={tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Sparkles className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4 text-background/50">{DEFAULT_TEXTS.footer.navigation.toUpperCase()}</h4>
            <ul className="space-y-2">
              {navigation.map((link) => (
                <li key={link}>
                  <button className="font-body text-sm text-background/70 hover:text-primary transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4 text-background/50">AIDE</h4>
            <ul className="space-y-2">
              {help.map((link) => (
                <li key={link}>
                  <button className="font-body text-sm text-background/70 hover:text-primary transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4 text-background/50">{DEFAULT_TEXTS.footer.contact.toUpperCase()}</h4>
            <ul className="space-y-3">
              {phone && (
                <li className="flex items-center gap-2 text-sm text-background/70">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{phone}</span>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2 text-sm text-background/70">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{email}</span>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-2 text-sm text-background/70">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{address}</span>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary/20 text-primary font-display font-bold text-xs px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-background/50">
            © {new Date().getFullYear()} {shopName}. {DEFAULT_TEXTS.footer.poweredBy}{' '}
            <Heart className="w-3 h-3 inline text-primary fill-primary" /> BurkinaShop
          </p>
          <div className="flex gap-4 text-xs text-background/50">
            <Link to="/privacy" className="hover:text-primary transition-colors">{DEFAULT_TEXTS.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">{DEFAULT_TEXTS.footer.terms}</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">{DEFAULT_TEXTS.footer.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Y2KFooter;
