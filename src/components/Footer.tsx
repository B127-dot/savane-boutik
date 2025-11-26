import { Globe, ArrowRight } from "lucide-react";

const Footer = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const footerSections = [
    {
      title: "Produit",
      links: [
        { label: "Fonctionnalités", href: "#features" },
        { label: "Tarifs", href: "#pricing" },
        { label: "Comment ça marche", href: "#how-it-works" },
        { label: "Sécurité", href: "#security" },
      ]
    },
    {
      title: "Ressources", 
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Témoignages", href: "#testimonials" },
        { label: "Documentation", href: "/docs" },
        { label: "Blog", href: "/blog" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Centre d'aide", href: "/help" },
        { label: "Contact", href: "/contact" },
        { label: "Formation", href: "/training" },
        { label: "WhatsApp", href: "https://wa.me/22670000000" },
      ]
    }
  ];

  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 mb-12">
      <div className="relative sm:mt-12 overflow-hidden shadow-[0px_0px_0px_1px_rgba(16,185,129,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.3),0px_12px_24px_-12px_rgba(16,185,129,0.3)] bg-gray-900/90 border border-primary/10 rounded-[40px] backdrop-blur">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent"></div>
        </div>

        <div className="relative pt-6 px-6 pb-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-display font-bold text-foreground">
                  BurkE-Shop
                </span>
              </div>
              
              <p className="text-sm font-body leading-relaxed text-muted-foreground">
                La première plateforme e-commerce pensée pour les commerçants du Burkina Faso. Vendez en ligne facilement.
              </p>

              <a 
                href="/signup"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-tight bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-3 py-1.5 transition-all hover:scale-105"
              >
                <span>Commencer Gratuitement</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </a>

              <div className="text-xs text-muted-foreground">
                contact@burkeshop.bf
              </div>
            </div>

            {/* Footer Links Columns */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-xs font-display tracking-wider text-foreground/90 uppercase">
                  {section.title}
                </h4>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-6 pt-6 border-t border-border/50 flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
              <a href="/privacy" className="hover:text-primary transition-colors">
                Politique de Confidentialité
              </a>
              <span className="text-border">|</span>
              <a href="/terms" className="hover:text-primary transition-colors">
                CGU
              </a>
              <span className="text-border">|</span>
              <a href="/cookies" className="hover:text-primary transition-colors">
                Cookies
              </a>
              <span className="text-border">|</span>
              <a href="/accessibility" className="hover:text-primary transition-colors">
                Accessibilité
              </a>
            </nav>
            
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span>Copyright 2025, propulsé par{" "}
                <a 
                  href="https://warm-digital-flow.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline"
                >
                  Openweb
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;