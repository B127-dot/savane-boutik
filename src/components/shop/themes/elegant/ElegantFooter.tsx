import { Mail, Phone, MapPin, Facebook, Instagram, Send } from 'lucide-react';

interface ElegantFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

const ElegantFooter = ({ 
  logo,
  shopName,
  aboutText = "Excellence et raffinement dans chaque produit. Votre satisfaction est notre priorité.",
  phone,
  whatsapp,
  facebook,
  instagram,
}: ElegantFooterProps) => {
  return (
    <footer className="w-full bg-gradient-to-b from-stone-50 to-stone-100 border-t-2 border-amber-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Colonne 1 - À propos */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {logo ? (
                <img src={logo} alt={shopName} className="h-12 w-12 object-contain" />
              ) : (
                <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-playfair font-bold text-xl">
                    {shopName.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="font-playfair text-2xl font-bold text-stone-900">{shopName}</h3>
            </div>

            {/* Ligne décorative */}
            <div className="flex items-center gap-2">
              <div className="h-px w-12 bg-amber-300" />
              <div className="w-1 h-1 rounded-full bg-amber-600" />
              <div className="h-px flex-1 bg-amber-300" />
            </div>

            {/* Description */}
            <p className="font-cormorant text-stone-700 leading-relaxed text-lg">
              {aboutText}
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              {facebook && (
                <a 
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-stone-200 rounded-full hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="h-5 w-5 text-stone-700" />
                </a>
              )}
              {instagram && (
                <a 
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-stone-200 rounded-full hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="h-5 w-5 text-stone-700" />
                </a>
              )}
              {whatsapp && (
                <a 
                  href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-stone-200 rounded-full hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 hover:scale-110"
                >
                  <Send className="h-5 w-5 text-stone-700" />
                </a>
              )}
            </div>
          </div>

          {/* Colonne 2 - Navigation */}
          <div className="space-y-6">
            <h4 className="font-playfair text-xl font-bold text-stone-900 tracking-wide">
              Navigation
            </h4>
            <div className="h-px w-16 bg-amber-300" />
            <nav className="space-y-3">
              <a href="#products" className="block font-cormorant text-lg text-stone-700 hover:text-amber-700 transition-colors duration-300 hover:translate-x-2 transform">
                Nos Produits
              </a>
              <a href="#about" className="block font-cormorant text-lg text-stone-700 hover:text-amber-700 transition-colors duration-300 hover:translate-x-2 transform">
                À Propos
              </a>
              <a href="#contact" className="block font-cormorant text-lg text-stone-700 hover:text-amber-700 transition-colors duration-300 hover:translate-x-2 transform">
                Contact
              </a>
              <a href="#faq" className="block font-cormorant text-lg text-stone-700 hover:text-amber-700 transition-colors duration-300 hover:translate-x-2 transform">
                FAQ
              </a>
              <a href="#terms" className="block font-cormorant text-lg text-stone-700 hover:text-amber-700 transition-colors duration-300 hover:translate-x-2 transform">
                Conditions de Vente
              </a>
            </nav>
          </div>

          {/* Colonne 3 - Contact */}
          <div className="space-y-6">
            <h4 className="font-playfair text-xl font-bold text-stone-900 tracking-wide">
              Nous Contacter
            </h4>
            <div className="h-px w-16 bg-amber-300" />
            <div className="space-y-4">
              {phone && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Phone className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs font-cormorant text-stone-600 tracking-wide uppercase">Téléphone</div>
                    <a href={`tel:${phone}`} className="font-cormorant text-lg text-stone-900 hover:text-amber-700 transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
              )}
              {whatsapp && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Send className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs font-cormorant text-stone-600 tracking-wide uppercase">WhatsApp</div>
                    <a 
                      href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-cormorant text-lg text-stone-900 hover:text-amber-700 transition-colors"
                    >
                      {whatsapp}
                    </a>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-full">
                  <MapPin className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-xs font-cormorant text-stone-600 tracking-wide uppercase">Adresse</div>
                  <p className="font-cormorant text-lg text-stone-900">
                    Ouagadougou, Burkina Faso
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <div className="bg-white border border-stone-200 rounded-sm p-4 hover:border-amber-300 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-amber-600" />
                  <span className="font-cormorant text-sm text-stone-900 font-medium">Newsletter</span>
                </div>
                <p className="text-xs font-cormorant text-stone-600 mb-3">
                  Restez informé de nos nouveautés
                </p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Votre email"
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-sm text-sm font-cormorant focus:outline-none focus:border-amber-400"
                  />
                  <button className="px-4 py-2 bg-stone-900 hover:bg-amber-700 text-white rounded-sm transition-colors">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation élégante */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-amber-600" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="font-cormorant text-stone-600">
            © {new Date().getFullYear()} <span className="font-semibold text-stone-900">{shopName}</span>. Tous droits réservés.
          </p>
          <div className="flex gap-6 font-cormorant text-sm text-stone-600">
            <a href="#privacy" className="hover:text-amber-700 transition-colors">
              Politique de confidentialité
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-amber-700 transition-colors">
              Mentions légales
            </a>
          </div>
        </div>
      </div>

      {/* Motif décoratif en bas */}
      <div className="h-1 bg-gradient-to-r from-stone-300 via-amber-400 to-stone-300" />
    </footer>
  );
};

export default ElegantFooter;
