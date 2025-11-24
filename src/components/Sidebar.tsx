import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { 
  Home, 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Palette,
  CreditCard,
  Megaphone,
  HelpCircle,
  User,
  Crown,
  LogOut,
  ChevronDown,
  ChevronRight,
  Store,
  Tags,
  Grid3x3,
  Menu,
  X,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import UpgradeProCard from '@/components/UpgradeProCard';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  subItems?: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['/products']);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, shopSettings, logout, orders } = useApp();

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  const sidebarSections: SidebarSection[] = [
    {
      label: "MENU PRINCIPAL",
      items: [
        { label: 'Accueil', href: '/dashboard', icon: Home },
        { label: 'Statistiques', href: '/analytics', icon: BarChart3 },
      ]
    },
    {
      label: "COMMERCE",
      items: [
        { 
          label: 'Produits', 
          href: '/products', 
          icon: Package,
          subItems: [
            { label: 'Tous les produits', href: '/products', icon: Grid3x3 },
            { label: 'Catégories', href: '/categories', icon: Tags },
          ]
        },
        { 
          label: 'Commandes', 
          href: '/orders', 
          icon: ShoppingCart,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined
        },
        { 
          label: 'Avis clients', 
          href: '/reviews', 
          icon: Star
        },
        { label: 'Ma boutique', href: '/shop-settings', icon: Palette },
      ]
    },
    {
      label: "OUTILS",
      items: [
        { label: 'Marketing', href: '/marketing', icon: Megaphone },
      ]
    },
    {
      label: "INTÉGRATION",
      items: [
        { label: 'Moyen de paiement', href: '/payment-integration', icon: CreditCard },
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleExpanded = (href: string) => {
    if (expandedItems.includes(href)) {
      setExpandedItems(expandedItems.filter(item => item !== href));
    } else {
      setExpandedItems([...expandedItems, href]);
    }
  };

  const isActiveItem = (href: string, subItems?: any[]) => {
    if (location.pathname === href) return true;
    if (subItems) {
      return subItems.some(sub => location.pathname === sub.href);
    }
    return false;
  };

  const renderNavItem = (item: SidebarItem) => {
    const isActive = isActiveItem(item.href, item.subItems);
    const isExpanded = expandedItems.includes(item.href);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <div key={item.href}>
        {/* Main Item */}
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={`
                    flex items-center justify-center rounded-lg px-3 py-2.5 transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary to-primary/85 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]' 
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground hover:translate-x-1'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div
            className={`
              flex items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-200 cursor-pointer group
              ${isActive 
                ? 'bg-gradient-to-r from-primary to-primary/85 text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02] border-l-4 border-primary-foreground/50' 
                : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground hover:translate-x-1'
              }
            `}
            onClick={() => hasSubItems ? toggleExpanded(item.href) : navigate(item.href)}
          >
            <div className="flex items-center gap-3 flex-1">
              <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110 group-hover:rotate-6'}`} />
              <span className={`text-sm tracking-tight ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {item.badge !== undefined && item.badge > 0 && (
                <Badge 
                  variant="destructive" 
                  className="h-5 min-w-[20px] flex items-center justify-center rounded-full text-[10px] font-bold px-1.5 animate-pulse"
                >
                  {item.badge}
                </Badge>
              )}
              {hasSubItems && (
                isExpanded ? (
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                )
              )}
            </div>
          </div>
        )}

        {/* Sub Items */}
        {hasSubItems && isExpanded && !isCollapsed && (
          <div className="ml-8 mt-1 space-y-1 animate-in slide-in-from-left-1 duration-200">
            {item.subItems?.map(subItem => {
              const isSubActive = location.pathname === subItem.href;
              return (
                <Link
                  key={subItem.href}
                  to={subItem.href}
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200
                    ${isSubActive 
                      ? 'bg-accent text-accent-foreground font-medium' 
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground hover:translate-x-1'
                    }
                  `}
                >
                  <subItem.icon className="w-4 h-4" />
                  <span>{subItem.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          {!isCollapsed && (
            <>
              {shopSettings?.logo ? (
                <img 
                  src={shopSettings.logo} 
                  alt="Logo" 
                  className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-primary/20"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Store className="w-5 h-5 text-primary-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-base leading-tight truncate">
                  {shopSettings?.shopName || user?.name || 'Ma Boutique'}
                </h2>
                <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {user?.email}
                </p>
              </div>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="shrink-0 hover:bg-accent"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-6 sidebar-scroll">
        {sidebarSections.map((section, sectionIndex) => (
          <div key={section.label} className={sectionIndex > 0 ? 'mt-6' : ''}>
            {!isCollapsed && (
              <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/50 px-3 mb-2">
                {section.label}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map(item => renderNavItem(item))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer avec Upgrade Pro Card + ThemeToggle + Logout */}
      <div className="border-t border-border/50 p-2 space-y-1">
        {/* Upgrade Pro Card */}
        <UpgradeProCard isCollapsed={isCollapsed} />
        
        {/* Theme Toggle (sans label) */}
        {!isCollapsed && (
          <div className="px-2 flex justify-center">
            <ThemeToggle />
          </div>
        )}
        
        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={`w-full h-8 transition-all duration-200 ${
            isCollapsed 
              ? 'justify-center px-0' 
              : 'justify-start text-destructive hover:text-destructive hover:bg-destructive/10'
          }`}
        >
          <LogOut className={`w-3.5 h-3.5 ${isCollapsed ? '' : 'mr-2'}`} />
          {!isCollapsed && <span className="text-xs">Déconnexion</span>}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm shadow-lg"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm animate-in fade-in duration-200"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen bg-background border-r border-border/50 flex flex-col
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <SidebarContent />
      </aside>

      {/* Spacer for desktop */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-72'}`} />
    </>
  );
};

export default Sidebar;
