import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, LogOut } from "lucide-react";
import { useApp } from '@/contexts/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = user ? [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Produits", href: "/products" },
    { label: "Commandes", href: "/orders" },
  ] : [
    { label: "Accueil", href: "/" },
    { label: "Fonctionnalités", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav 
      data-state={isMenuOpen ? 'active' : 'inactive'}
      className="fixed top-0 w-full z-50 px-2 group"
    >
      <div className={cn(
        'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
        isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
      )}>
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
            <Link to="/" className="text-xl font-bold text-foreground">
              BurkE-Shop
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              user && item.href.startsWith('/') ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-sm text-foreground/80">
                  Bienvenue, {user.name}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Se déconnecter
                </Button>
              </>
            ) : (
              <>
                <div className={cn(
                  "flex items-center space-x-3 transition-all duration-300",
                  isScrolled && "md:hidden"
                )}>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">Connexion</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Commencer</Link>
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  asChild
                  className={cn(
                    "transition-all duration-300",
                    isScrolled ? "md:inline-flex" : "hidden"
                  )}
                >
                  <Link to="/signup">Commencer</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="relative -m-2.5 -mr-4 p-2.5 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            >
              <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 w-6 h-6 transition-all duration-200" />
              <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto w-6 h-6 -rotate-180 scale-0 opacity-0 transition-all duration-200" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-background rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none mb-6" role="navigation" aria-label="Menu mobile">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                user && item.href.startsWith('/') ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-muted-foreground hover:text-accent-foreground transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-accent-foreground transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <ThemeToggle />
                </div>
                {user ? (
                  <Button variant="outline" size="sm" onClick={handleLogout} className="justify-start">
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="justify-start" asChild>
                      <Link to="/login">Connexion</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/signup">Commencer gratuitement</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;