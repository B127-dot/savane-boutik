import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { 
  Home, 
  BarChart3, 
  Package, 
  ShoppingCart, 
  CreditCard,
  Megaphone,
  LogOut,
  ChevronDown,
  ChevronRight,
  Store,
  Tags,
  Grid3x3,
  Menu,
  X,
  Star,
  Settings,
  Paintbrush
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  // Sliding indicator state
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });
  const [hoverStyle, setHoverStyle] = useState({ top: 0, height: 0, opacity: 0 });
  
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
        { 
          label: 'Ma boutique', 
          href: '/shop-editor', 
          icon: Paintbrush
        },
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
    },
    {
      label: "COMPTE",
      items: [
        { label: 'Paramètres', href: '/settings', icon: Settings },
      ]
    }
  ];

  // Calculate indicator position based on active element
  useLayoutEffect(() => {
    const updateIndicatorPosition = () => {
      const activeHref = location.pathname;
      const activeElement = itemRefs.current.get(activeHref);
      
      if (activeElement && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeElement.getBoundingClientRect();
        
        setIndicatorStyle({
          top: itemRect.top - navRect.top + navRef.current.scrollTop,
          height: itemRect.height,
          opacity: 1
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    // Small delay to ensure DOM is updated
    const timer = setTimeout(updateIndicatorPosition, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, expandedItems, isCollapsed]);

  // Hover handlers
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    
    setHoverStyle({
      top: rect.top - navRect.top + navRef.current.scrollTop,
      height: rect.height,
      opacity: 1
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverStyle(prev => ({ ...prev, opacity: 0 }));
  }, []);

  const handleLogout = () => {
    setShowLogoutDialog(false);
    logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
                  ref={(el) => {
                    if (el) itemRefs.current.set(item.href, el);
                    else itemRefs.current.delete(item.href);
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={`
                    flex items-center justify-center rounded-lg px-3 py-2.5 transition-colors duration-200 group relative z-10
                    ${isActive 
                      ? 'text-primary-foreground' 
                      : 'text-muted-foreground hover:text-accent-foreground'
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
            ref={(el) => {
              if (el) itemRefs.current.set(item.href, el);
              else itemRefs.current.delete(item.href);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`
              flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors duration-200 cursor-pointer group relative z-10
              ${isActive 
                ? 'text-primary-foreground' 
                : 'text-muted-foreground hover:text-accent-foreground'
              }
            `}
            onClick={() => hasSubItems ? toggleExpanded(item.href) : navigate(item.href)}
          >
            <div className="flex items-center gap-3 flex-1">
              <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
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
                  ref={(el) => {
                    if (el) itemRefs.current.set(subItem.href, el);
                    else itemRefs.current.delete(subItem.href);
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 relative z-10
                    ${isSubActive 
                      ? 'text-primary-foreground font-medium' 
                      : 'text-muted-foreground hover:text-accent-foreground'
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
      <nav ref={navRef} className="flex-1 overflow-y-auto p-3 space-y-6 sidebar-scroll relative">
        {/* Hover Indicator (subtle) */}
        <div
          className="absolute left-0 right-0 mx-2 pointer-events-none z-0 
                     bg-accent/50 rounded-lg
                     transition-all duration-200 ease-out"
          style={{
            top: `${hoverStyle.top}px`,
            height: `${hoverStyle.height}px`,
            opacity: hoverStyle.opacity
          }}
        />
        
        {/* Active Indicator (sliding) */}
        <div
          className="absolute left-0 right-0 mx-2 pointer-events-none z-[1] 
                     bg-gradient-to-r from-primary to-primary/85 
                     rounded-lg shadow-lg shadow-primary/30
                     transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{
            top: `${indicatorStyle.top}px`,
            height: `${indicatorStyle.height}px`,
            opacity: indicatorStyle.opacity
          }}
        />

        {sidebarSections.map((section, sectionIndex) => (
          <div key={section.label} className={sectionIndex > 0 ? 'mt-6' : ''}>
            {!isCollapsed && (
              <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/50 px-3 mb-2 relative z-10">
                {section.label}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map(item => renderNavItem(item))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer avec Upgrade Pro Card + ThemeToggle + User Profile */}
      <div className="border-t border-border/50 p-2 space-y-1">
        {/* Upgrade Pro Card */}
        <UpgradeProCard isCollapsed={isCollapsed} />
        
        {/* Theme Toggle (sans label) */}
        {!isCollapsed && (
          <div className="px-2 flex justify-center">
            <ThemeToggle />
          </div>
        )}
        
        {/* User Profile avec Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`w-full transition-all duration-200 hover:bg-accent ${
                isCollapsed 
                  ? 'h-10 justify-center px-0' 
                  : 'h-12 justify-start gap-3 px-2'
              }`}
            >
              <Avatar className="h-8 w-8 border-2 border-border">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold text-sm">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-medium truncate">{user?.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">Gratuit</p>
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-64 p-0" 
            side={isCollapsed ? "right" : "top"}
            align="start"
          >
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogoutDialog(true)}
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Alert Dialog de confirmation de déconnexion */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la déconnexion</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre tableau de bord.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Se déconnecter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
