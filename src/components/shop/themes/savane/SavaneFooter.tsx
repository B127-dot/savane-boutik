import { useState } from 'react';
import { Instagram } from 'lucide-react';
import { ShopSettings } from '@/contexts/AppContext';

interface SavaneFooterProps {
  settings: ShopSettings;
}

const SavaneFooter = ({ settings }: SavaneFooterProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const whatsappNumber = settings.socialLinks?.whatsapp || settings.phone || '+226 00 00 00 00';
  const shopName = settings.shopName || 'SAVANE';

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="py-16 md:py-24 px-4 md:px-8 border-b border-background/20">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-center">
          <h3 className="font-heading text-2xl md:text-4xl font-bold uppercase tracking-[0.1em] mb-8">
            NE RATEZ PAS LE PROCHAIN DROP
          </h3>
          
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="VOTRE EMAIL"
              className="flex-1 px-6 py-4 bg-transparent border border-background font-body text-sm uppercase tracking-widest placeholder:text-background/60 focus:outline-none text-background"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-background text-foreground font-heading text-sm uppercase tracking-[0.2em] border border-background hover:bg-transparent hover:text-background transition-colors"
            >
              S'INSCRIRE
            </button>
          </div>
        </form>
      </div>

      {/* Contact & Social */}
      <div className="py-8 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-background/20">
        <a 
          href={`https://wa.me/${whatsappNumber.replace(/\s/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
        >
          WHATSAPP: {whatsappNumber}
        </a>
        
        <div className="flex items-center gap-8">
          {settings.socialLinks?.instagram && (
            <a 
              href={settings.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity flex items-center gap-2"
            >
              <Instagram size={16} />
              Instagram
            </a>
          )}
          {settings.socialLinks?.tiktok && (
            <a 
              href={settings.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
            >
              TikTok
            </a>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 px-4 md:px-8 text-center">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-background/60">
          © {new Date().getFullYear()} {shopName}. TOUS DROITS RÉSERVÉS.
        </p>
      </div>
    </footer>
  );
};

export default SavaneFooter;
