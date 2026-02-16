import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TrendingUp, ShoppingCart, Package, Percent, ExternalLink, Copy, CheckCircle2, Eye, AlertTriangle, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickActions from '@/components/dashboard/QuickActions';
import SmartInsights from '@/components/dashboard/SmartInsights';
import KPICard from '@/components/dashboard/KPICard';
import PeriodSelector, { Period } from '@/components/dashboard/PeriodSelector';
import RevenueChart from '@/components/RevenueChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import ShopQRCode from '@/components/ShopQRCode';
import NotificationCenter, { Notification } from '@/components/dashboard/NotificationCenter';

const Dashboard = () => {
  const { user, products, orders, categories, shopSettings, getAbandonedCarts } = useApp();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [period, setPeriod] = useState<Period>('today');
  const [showComparison, setShowComparison] = useState(() => {
    const saved = localStorage.getItem('dashboard-show-comparison');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);
  useEffect(() => {
    localStorage.setItem('dashboard-show-comparison', JSON.stringify(showComparison));
  }, [showComparison]);

  const shopUrl = shopSettings?.shopUrl || 'ma-boutique';
  const fullShopUrl = `${window.location.origin}/shop/${shopUrl}`;

  // Filter orders by period
  const filteredOrders = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      switch (period) {
        case 'today': return orderDate >= today;
        case 'week': return orderDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case 'month': return orderDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        default: return true;
      }
    });
  }, [orders, period]);

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = filteredOrders.filter(o => o.status === 'pending');
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5 && p.status === 'active');
  const outOfStockProducts = products.filter(p => p.stock === 0 && p.status === 'active');
  const totalOrders = filteredOrders.length;
  const deliveredOrders = filteredOrders.filter(o => o.status === 'delivered').length;
  const conversionRate = totalOrders > 0 ? ((deliveredOrders / totalOrders) * 100).toFixed(1) : '0';

  // Previous period comparison
  const previousPeriodOrders = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      switch (period) {
        case 'today': {
          const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
          return orderDate >= new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000) && orderDate < yesterday;
        }
        case 'week': {
          return orderDate >= new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) && orderDate < new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        }
        case 'month': {
          return orderDate >= new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000) && orderDate < new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }
        default: return false;
      }
    });
  }, [orders, period]);

  const previousRevenue = previousPeriodOrders.reduce((sum, order) => sum + order.total, 0);
  const previousOrdersCount = previousPeriodOrders.length;
  const revenueTrend = previousRevenue > 0 ? Math.round(((totalRevenue - previousRevenue) / previousRevenue) * 100) : totalRevenue > 0 ? 999 : 0;
  const ordersTrend = previousOrdersCount > 0 ? Math.round(((totalOrders - previousOrdersCount) / previousOrdersCount) * 100) : totalOrders > 0 ? 999 : 0;
  const previousDeliveredOrders = previousPeriodOrders.filter(o => o.status === 'delivered').length;
  const previousConversionRate = previousOrdersCount > 0 ? ((previousDeliveredOrders / previousOrdersCount) * 100) : 0;
  const currentConversionRate = parseFloat(conversionRate);
  const conversionTrend = previousConversionRate > 0 ? Math.round((currentConversionRate - previousConversionRate) / previousConversionRate * 100) : currentConversionRate > 0 ? 999 : 0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullShopUrl);
    setCopied(true);
    toast({ title: "Lien copié !", description: "Le lien de votre boutique a été copié dans le presse-papier" });
    setTimeout(() => setCopied(false), 2000);
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const popularProducts = useMemo(() => {
    const productSales = new Map<string, number>();
    filteredOrders.forEach(order => {
      order.products.forEach(item => {
        productSales.set(item.productId, (productSales.get(item.productId) || 0) + item.quantity);
      });
    });
    return products.map(p => ({ ...p, soldCount: productSales.get(p.id) || 0 })).filter(p => p.soldCount > 0).sort((a, b) => b.soldCount - a.soldCount).slice(0, 5);
  }, [products, filteredOrders]);

  const revenueSparklineData = useMemo(() => {
    const data: number[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      data.push(orders.filter(o => { const d = new Date(o.createdAt); return d >= dayStart && d < dayEnd; }).reduce((s, o) => s + o.total, 0));
    }
    return data;
  }, [orders]);

  const conversionSparklineData = useMemo(() => {
    const data: number[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      const dayOrders = orders.filter(o => { const d = new Date(o.createdAt); return d >= dayStart && d < dayEnd; }).length;
      data.push(dayOrders > 0 ? ((dayOrders / (dayOrders + 10)) * 100) : 0);
    }
    return data;
  }, [orders]);

  const notifications = useMemo(() => {
    const notifs: Notification[] = [];
    if (pendingOrders.length > 0) notifs.push({ id: 'pending-orders', type: 'order', title: `${pendingOrders.length} commande${pendingOrders.length > 1 ? 's' : ''} en attente`, message: 'Des commandes nécessitent votre attention', link: '/orders', icon: ShoppingCart });
    if (outOfStockProducts.length > 0) notifs.push({ id: 'out-of-stock', type: 'alert', title: `${outOfStockProducts.length} produit${outOfStockProducts.length > 1 ? 's' : ''} en rupture`, message: 'Produits ne pouvant plus être vendus', link: '/products', icon: AlertTriangle });
    if (lowStockProducts.length > 0) notifs.push({ id: 'low-stock', type: 'stock', title: `${lowStockProducts.length} produit${lowStockProducts.length > 1 ? 's' : ''} à réapprovisionner`, message: 'Stock faible détecté', link: '/products', icon: Package });
    if (!shopSettings?.socialLinks?.whatsapp) notifs.push({ id: 'whatsapp-config', type: 'config', title: 'WhatsApp non configuré', message: 'Activez WhatsApp pour booster vos ventes', link: '/shop-settings', icon: MessageCircle });
    return notifs;
  }, [pendingOrders, outOfStockProducts, lowStockProducts, shopSettings]);

  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      {/* Header Zone */}
      <div className="flex flex-col gap-3 pb-4 sm:pb-6 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm sm:text-base">
              {user?.name ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-display font-bold tracking-tight truncate">Bienvenue, {user?.name}</h1>
            <p className="text-xs sm:text-sm font-body text-muted-foreground truncate">
              Voici un aperçu de votre activité
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <NotificationCenter notifications={notifications} />
          <PeriodSelector value={period} onChange={setPeriod} />
          <Badge variant="secondary" className="text-xs px-2 py-0.5 sm:px-3 sm:py-1">
            {user?.role === 'admin' ? 'Admin' : 'User'}
          </Badge>
        </div>
      </div>

      {/* Quick Actions Zone */}
      <div className={`animate-fade-up ${isVisible ? 'visible' : ''}`}>
        <QuickActions />
      </div>

      {/* KPIs Zone */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-display font-bold">Indicateurs Clés</h2>
          <div className="flex items-center gap-2">
            <Switch id="comparison-mode" checked={showComparison} onCheckedChange={setShowComparison} />
            <Label htmlFor="comparison-mode" className="text-xs sm:text-sm cursor-pointer">
              <span className="hidden sm:inline">Comparer avec période précédente</span>
              <span className="sm:hidden">Comparer</span>
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className={`animate-stagger ${isVisible ? 'visible' : ''}`}>
            <KPICard title="Revenus" value={`${totalRevenue.toLocaleString('fr-FR')} F`} icon={TrendingUp} iconColor="#10B981"
              trend={period !== 'all' ? { value: Math.abs(revenueTrend), label: 'vs période précédente', isPositive: revenueTrend >= 0 } : undefined}
              sparklineData={revenueSparklineData} showTrend={showComparison} level={1} />
          </div>
          <div className={`animate-stagger delay-100 ${isVisible ? 'visible' : ''}`}>
            <KPICard title="En Attente" value={pendingOrders.length} icon={ShoppingCart} iconColor="#3B82F6"
              badge={pendingOrders.length > 0 ? { text: `${pendingOrders.length}`, variant: 'destructive' } : undefined}
              action={pendingOrders.length > 0 ? { label: 'Traiter', link: '/orders' } : undefined}
              showTrend={showComparison} level={pendingOrders.length > 0 ? 1 : 2} />
          </div>
          <div className={`animate-stagger delay-200 ${isVisible ? 'visible' : ''}`}>
            <KPICard title="Stock Faible" value={lowStockProducts.length + outOfStockProducts.length} icon={Package} iconColor="#F59E0B"
              badge={outOfStockProducts.length > 0 ? { text: `${outOfStockProducts.length} rupt.` , variant: 'warning' } : undefined}
              action={(lowStockProducts.length + outOfStockProducts.length) > 0 ? { label: 'Gérer', link: '/products' } : undefined}
              showTrend={showComparison} level={(lowStockProducts.length + outOfStockProducts.length) > 0 ? 2 : 3} />
          </div>
          <div className={`animate-stagger delay-300 ${isVisible ? 'visible' : ''}`}>
            <KPICard title="Conversion" value={`${conversionRate}%`} icon={Percent} iconColor="#8B5CF6"
              trend={period !== 'all' ? { value: Math.abs(conversionTrend), label: 'vs période précédente', isPositive: conversionTrend >= 0 } : undefined}
              sparklineData={conversionSparklineData} showTrend={showComparison} level={3} />
          </div>
        </div>
      </div>

      {/* Smart Insights Zone */}
      <div className={`animate-fade-up delay-100 ${isVisible ? 'visible' : ''}`}>
        <SmartInsights products={products} orders={orders} shopSettings={shopSettings} abandonedCarts={getAbandonedCarts()} />
      </div>

      {/* Performance Charts Zone - Hidden on small mobile */}
      <div className={`animate-fade-up delay-200 hidden sm:block ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-base sm:text-lg md:text-xl font-display font-bold mb-4">Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <RevenueChart orders={filteredOrders} period={7} />
          <CategoryPieChart orders={filteredOrders} products={products} categories={categories} />
        </div>
      </div>

      {/* Mobile: Link to Analytics instead of charts */}
      <div className="sm:hidden">
        <Link to="/analytics">
          <Button variant="outline" className="w-full">
            <TrendingUp className="h-4 w-4 mr-2" />
            Voir les statistiques détaillées
          </Button>
        </Link>
      </div>

      {/* Activity Zone */}
      <div className={`animate-fade-up delay-300 ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-base sm:text-lg md:text-xl font-display font-bold mb-3 sm:mb-4">Activité Récente</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Dernières Commandes</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Les 5 commandes les plus récentes</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="space-y-2 sm:space-y-3">
                {filteredOrders.slice(0, 5).length > 0 ? (
                  filteredOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-2 sm:p-3 rounded-lg border bg-card hover:bg-accent/50 transition-all group gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold truncate">#{order.id.slice(0, 8)}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                        <Badge variant={order.status === 'pending' ? 'default' : 'secondary'} className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                          {order.status === 'pending' ? 'Attente' : 
                           order.status === 'confirmed' ? 'OK' :
                           order.status === 'shipped' ? 'Expédiée' :
                           order.status === 'delivered' ? 'Livrée' :
                           order.status === 'cancelled' ? 'Annulée' : order.status}
                        </Badge>
                        <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
                          {order.total.toLocaleString('fr-FR')} F
                        </span>
                        <Link to="/orders" className="hidden sm:block">
                          <Button size="icon" variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-muted-foreground text-center py-6 sm:py-8">
                    Aucune commande pour cette période
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Popular Products */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base">Produits Populaires</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Les produits les plus vendus</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="space-y-2 sm:space-y-3">
                {popularProducts.length > 0 ? (
                  popularProducts.map((product) => (
                    <Link key={product.id} to="/products" className="block">
                      <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg border bg-card hover:bg-accent/50 hover:scale-[1.01] transition-all group gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold truncate">{product.name}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">
                            {product.soldCount} {product.soldCount > 1 ? 'vendus' : 'vendu'}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                          <Badge variant={product.stock === 0 ? 'destructive' : product.stock <= 5 ? 'secondary' : 'outline'} className="text-[10px] sm:text-xs px-1.5">
                            {product.stock}
                          </Badge>
                          <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
                            {product.price.toLocaleString('fr-FR')} F
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-muted-foreground text-center py-6 sm:py-8">
                    Aucune vente pour cette période
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Shop Link & QR Code Zone - Simplified on mobile */}
      <div className={`animate-fade-up delay-400 ${isVisible ? 'visible' : ''}`}>
        <Card className="bg-gradient-hero border-primary/20">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Partagez Votre Boutique</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Partagez ce lien avec vos clients</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 space-y-4">
            <div className="flex items-center gap-2 p-2 sm:p-3 bg-background rounded-lg border">
              <code className="flex-1 text-xs sm:text-sm text-muted-foreground truncate">
                {fullShopUrl}
              </code>
              <Button variant="ghost" size="sm" onClick={handleCopyLink} className="shrink-0 h-8 w-8 p-0">
                {copied ? <CheckCircle2 className="h-4 w-4 text-kpi-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button asChild className="flex-1 text-xs sm:text-sm h-9 sm:h-10">
                <a href={`/shop/${shopUrl}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Visiter ma boutique</span>
                  <span className="sm:hidden">Visiter</span>
                </a>
              </Button>
              <Button variant="outline" onClick={handleCopyLink} className="text-xs sm:text-sm h-9 sm:h-10">
                <Copy className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                Copier
              </Button>
            </div>
            {/* QR Code hidden on mobile */}
            <div className="hidden md:flex items-center justify-center pt-4">
              <ShopQRCode shopUrl={fullShopUrl} shopName={shopSettings?.shopName || 'Ma Boutique'} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
