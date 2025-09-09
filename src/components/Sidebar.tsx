import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Palette, 
  BarChart3, 
  Megaphone, 
  Crown, 
  User, 
  HelpCircle,
  Menu,
  X,
  Globe,
  Plus,
  Grid,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { label: string; href: string; icon?: React.ComponentType<{ className?: string }> }[];
}

const sidebarItems: SidebarItem[] = [
  { label: 'Accueil', href: '/dashboard', icon: Home },
  {
    label: 'Produits',
    href: '/products',
    icon: Package,
    subItems: [
      { label: 'Liste des produits', href: '/products', icon: Grid },
      { label: 'Ajouter un produit', href: '/products/add', icon: Plus },
      { label: 'Catégories', href: '/categories', icon: Grid },
    ]
  },
  { label: 'Commandes', href: '/orders', icon: ShoppingCart },
  {
    label: 'Paiements',
    href: '/payments',
    icon: CreditCard,
    subItems: [
      { label: 'Transactions', href: '/payments', icon: CreditCard },
      { label: 'Historique', href: '/payments/history', icon: History },
    ]
  },
  { label: 'Ma boutique', href: '/shop-settings', icon: Palette },
  { label: 'Statistiques', href: '/analytics', icon: BarChart3 },
  { label: 'Marketing', href: '/marketing', icon: Megaphone },
  { label: 'Abonnement', href: '/subscription', icon: Crown },
  { label: 'Profil', href: '/profile', icon: User },
  { label: 'Support', href: '/support', icon: HelpCircle },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const { user, shopSettings } = useApp();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActiveItem = (href: string, subItems?: any[]) => {
    if (location.pathname === href) return true;
    if (subItems) {
      return subItems.some(subItem => location.pathname === subItem.href);
    }
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300 ease-out",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-foreground truncate">
                  {shopSettings?.shopName || user?.name}
                </h2>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {sidebarItems.map((item) => (
            <div key={item.href}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActiveItem(item.href, item.subItems) && "bg-accent text-accent-foreground",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium truncate">{item.label}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div className={cn(
                        "transition-transform",
                        expandedItems.includes(item.href) && "rotate-90"
                      )}>
                        ▶
                      </div>
                    )}
                  </button>
                  
                  {!isCollapsed && expandedItems.includes(item.href) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className={cn(
                            "flex items-center space-x-3 p-2 rounded-lg transition-colors text-sm",
                            "hover:bg-accent/50 hover:text-accent-foreground",
                            location.pathname === subItem.href && "bg-accent/80 text-accent-foreground"
                          )}
                        >
                          {subItem.icon && <subItem.icon className="w-4 h-4" />}
                          <span className="truncate">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.href && "bg-accent text-accent-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsCollapsed(false)}
        className={cn(
          "fixed top-4 left-4 z-40 lg:hidden",
          !isCollapsed && "hidden"
        )}
      >
        <Menu className="h-4 w-4" />
      </Button>
    </>
  );
};

export default Sidebar;