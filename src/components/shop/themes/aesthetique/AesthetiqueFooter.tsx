import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AesthetiqueFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

const AesthetiqueFooter = ({
  logo,
  shopName,
  aboutText,
  phone,
  whatsapp,
  facebookUrl,
  instagramUrl,
  tiktokUrl,
}: AesthetiqueFooterProps) => {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950">
      {/* Newsletter Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {/* Newsletter */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-instrument-serif text-white tracking-tight mb-6"
            >
              Rejoignez la liste.
            </motion.h2>
            <p className="text-zinc-400 mb-8 font-light max-w-sm">
              Recevez un accès anticipé aux nouvelles collections, aux journaux de design et aux événements exclusifs.
            </p>
            
            <form className="relative max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Adresse Email" 
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-sm uppercase tracking-widest font-medium text-white hover:text-emerald-400 transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            {/* Shop Links */}
            <div className="flex flex-col gap-4">
              <span className="text-white font-medium uppercase tracking-wider mb-2">Boutique</span>
              <a href="#products" className="text-zinc-500 hover:text-white transition-colors">Produits</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Collections</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Nouveautés</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Promotions</a>
            </div>
            
            {/* Company Links */}
            <div className="flex flex-col gap-4">
              <span className="text-white font-medium uppercase tracking-wider mb-2">Info</span>
              <a href="#about" className="text-zinc-500 hover:text-white transition-colors">À propos</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Contact</a>
              <Link to="/faq" className="text-zinc-500 hover:text-white transition-colors">FAQ</Link>
              <Link to="/terms" className="text-zinc-500 hover:text-white transition-colors">CGV</Link>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <span className="text-white font-medium uppercase tracking-wider mb-2">Social</span>
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  Instagram
                </a>
              )}
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  Facebook
                </a>
              )}
              {tiktokUrl && (
                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  TikTok
                </a>
              )}
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  WhatsApp
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="text-zinc-500 hover:text-white transition-colors">
                  {phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Big Marquee Footer */}
      <div className="mt-12 border-t border-zinc-900 pt-12 overflow-hidden">
        <motion.div
          className="flex items-center whitespace-nowrap opacity-30 select-none"
          animate={{ x: [0, -500] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[1, 2, 3, 4].map((_, i) => (
            <span key={i} className="text-[10vw] leading-none font-instrument-serif text-zinc-700 px-4">
              {shopName.toUpperCase()}
            </span>
          ))}
        </motion.div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 mt-8 pb-8 text-xs text-zinc-600 uppercase tracking-wider gap-4">
          <span>© {new Date().getFullYear()} {shopName}. Tous droits réservés.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AesthetiqueFooter;
