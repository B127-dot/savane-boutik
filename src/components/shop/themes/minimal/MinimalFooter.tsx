import { Mail, Phone, MapPin, Facebook, Instagram, Send } from 'lucide-react';

interface MinimalFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

const MinimalFooter = ({ 
  logo,
  shopName,
  aboutText = "Moins, c'est plus. Qualité et simplicité dans chaque détail.",
  phone,
  whatsapp,
  facebook,
  instagram,
}: MinimalFooterProps) => {
  return (
    <footer className="w-full bg-white border-t border-neutral-100">
      <div className="container mx-auto px-8 md:px-16 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Colonne 1 - À propos (plus large) */}
          <div className="md:col-span-5 space-y-8">
            {/* Logo minimaliste */}
            <div className="flex items-center gap-4">
              {logo ? (
                <img src={logo} alt={shopName} className="h-10 w-10 object-contain" />
              ) : (
                <div className="h-10 w-10 bg-black flex items-center justify-center">
                  <span className="text-white font-inter font-bold text-lg">
                    {shopName.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="font-inter text-xl font-medium text-black tracking-wide">{shopName}</h3>
            </div>

            {/* Description */}
            <p className="font-inter text-base font-light text-neutral-600 leading-relaxed max-w-md">
              {aboutText}
            </p>

            {/* Réseaux sociaux minimalistes */}
            <div className="flex gap-4 pt-4">
              {facebook && (
                <a 
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {instagram && (
                <a 
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {whatsapp && (
                <a 
                  href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <Send className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Colonne 2 - Navigation */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="font-inter text-xs font-medium text-neutral-400 tracking-widest uppercase">
              Navigation
            </h4>
            <nav className="space-y-4">
              <a href="#products" className="block font-inter text-base font-light text-black hover:translate-x-2 transition-transform duration-300">
                Produits
              </a>
              <a href="#about" className="block font-inter text-base font-light text-black hover:translate-x-2 transition-transform duration-300">
                À Propos
              </a>
              <a href="#contact" className="block font-inter text-base font-light text-black hover:translate-x-2 transition-transform duration-300">
                Contact
              </a>
              <a href="#faq" className="block font-inter text-base font-light text-black hover:translate-x-2 transition-transform duration-300">
                FAQ
              </a>
            </nav>
          </div>

          {/* Colonne 3 - Contact */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-inter text-xs font-medium text-neutral-400 tracking-widest uppercase">
              Contact
            </h4>
            <div className="space-y-5">
              {phone && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-neutral-400" />
                    <span className="text-xs font-inter text-neutral-400 tracking-wider uppercase">Téléphone</span>
                  </div>
                  <a href={`tel:${phone}`} className="block font-inter text-base font-light text-black hover:text-neutral-600 transition-colors">
                    {phone}
                  </a>
                </div>
              )}
              {whatsapp && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-neutral-400" />
                    <span className="text-xs font-inter text-neutral-400 tracking-wider uppercase">WhatsApp</span>
                  </div>
                  <a 
                    href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-inter text-base font-light text-black hover:text-neutral-600 transition-colors"
                  >
                    {whatsapp}
                  </a>
                </div>
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-neutral-400" />
                  <span className="text-xs font-inter text-neutral-400 tracking-wider uppercase">Localisation</span>
                </div>
                <p className="font-inter text-base font-light text-black">
                  Ouagadougou, Burkina Faso
                </p>
              </div>
            </div>

            {/* Newsletter épurée */}
            <div className="pt-6 space-y-4">
              <h5 className="font-inter text-xs font-medium text-neutral-400 tracking-widest uppercase">
                Newsletter
              </h5>
              <div className="flex gap-0 border-b-2 border-black pb-1">
                <input 
                  type="email" 
                  placeholder="Votre email"
                  className="flex-1 bg-transparent text-base font-inter font-light text-black placeholder:text-neutral-400 focus:outline-none"
                />
                <button className="p-2 hover:bg-black hover:text-white transition-colors">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="h-px bg-neutral-100 mb-8" />

        {/* Copyright minimaliste */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-inter text-sm font-light text-neutral-500">
            © {new Date().getFullYear()} {shopName}
          </p>
          <div className="flex gap-8 font-inter text-sm font-light text-neutral-500">
            <a href="#privacy" className="hover:text-black transition-colors">
              Confidentialité
            </a>
            <a href="#terms" className="hover:text-black transition-colors">
              Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;
