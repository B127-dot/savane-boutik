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

  // Trigger staggered animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Save comparison mode preference
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
        case 'today':
          return orderDate >= today;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= monthAgo;
        default:
          return true;
      }
    });
  }, [orders, period]);

  // Calculate metrics for current period
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = filteredOrders.filter(o => o.status === 'pending');
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5 && p.status === 'active');
  const outOfStockProducts = products.filter(p => p.stock === 0 && p.status === 'active');
  const totalOrders = filteredOrders.length;
  const deliveredOrders = filteredOrders.filter(o => o.status === 'delivered').length;
  const conversionRate = totalOrders > 0 ? ((deliveredOrders / totalOrders) * 100).toFixed(1) : '0';

  // Calculate comparison with previous period
  const previousPeriodOrders = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      
      switch (period) {
        case 'today': {
          const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
          const dayBeforeYesterday = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);
          return orderDate >= dayBeforeYesterday && orderDate < yesterday;
        }
        case 'week': {
          const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= twoWeeksAgo && orderDate < oneWeekAgo;
        }
        case 'month': {
          const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= twoMonthsAgo && orderDate < oneMonthAgo;
        }
        default:
          return false;
      }
    });
  }, [orders, period]);

  const previousRevenue = previousPeriodOrders.reduce((sum, order) => sum + order.total, 0);
  const previousOrdersCount = previousPeriodOrders.length;

  // Calculate trends with proper edge case handling
  const revenueTrend = previousRevenue > 0 
    ? Math.round(((totalRevenue - previousRevenue) / previousRevenue) * 100)
    : totalRevenue > 0 ? 999 : 0;
  
  const ordersTrend = previousOrdersCount > 0
    ? Math.round(((totalOrders - previousOrdersCount) / previousOrdersCount) * 100)
    : totalOrders > 0 ? 999 : 0;

  const previousDeliveredOrders = previousPeriodOrders.filter(o => o.status === 'delivered').length;
  const previousConversionRate = previousOrdersCount > 0 ? ((previousDeliveredOrders / previousOrdersCount) * 100) : 0;
  const currentConversionRate = parseFloat(conversionRate);
  const conversionTrend = previousConversionRate > 0
    ? Math.round((currentConversionRate - previousConversionRate) / previousConversionRate * 100)
    : currentConversionRate > 0 ? 999 : 0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullShopUrl);
    setCopied(true);
    toast({
      title: "Lien copié !",
      description: "Le lien de votre boutique a été copié dans le presse-papier",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get popular products (most in orders)
  const popularProducts = useMemo(() => {
    const productSales = new Map<string, number>();
    
    filteredOrders.forEach(order => {
      order.products.forEach(item => {
        const current = productSales.get(item.productId) || 0;
        productSales.set(item.productId, current + item.quantity);
      });
    });

    return products
      .map(product => ({
        ...product,
        soldCount: productSales.get(product.id) || 0
      }))
      .filter(p => p.soldCount > 0)
      .sort((a, b) => b.soldCount - a.soldCount)
      .slice(0, 5);
  }, [products, filteredOrders]);

  // Generate sparkline data for last 7 days
  const revenueSparklineData = useMemo(() => {
    const data: number[] = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      
      const dayRevenue = orders
        .filter(o => {
          const orderDate = new Date(o.createdAt);
          return orderDate >= dayStart && orderDate < dayEnd;
        })
        .reduce((sum, o) => sum + o.total, 0);
      
      data.push(dayRevenue);
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
      
      const dayOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= dayStart && orderDate < dayEnd;
      }).length;
      
      const rate = dayOrders > 0 ? ((dayOrders / (dayOrders + 10)) * 100) : 0;
      data.push(rate);
    }
    
    return data;
  }, [orders]);

  // Generate notifications
  const notifications = useMemo(() => {
    const notifs: Notification[] = [];
    
    if (pendingOrders.length > 0) {
      notifs.push({
        id: 'pending-orders',
        type: 'order',
        title: `${pendingOrders.length} commande${pendingOrders.length > 1 ? 's' : ''} en attente`,
        message: 'Des commandes nécessitent votre attention',
        link: '/orders',
        icon: ShoppingCart
      });
    }
    
    if (outOfStockProducts.length > 0) {
      notifs.push({
        id: 'out-of-stock',
        type: 'alert',
        title: `${outOfStockProducts.length} produit${outOfStockProducts.length > 1 ? 's' : ''} en rupture`,
        message: 'Produits ne pouvant plus être vendus',
        link: '/products',
        icon: AlertTriangle
      });
    }
    
    if (lowStockProducts.length > 0) {
      notifs.push({
        id: 'low-stock',
        type: 'stock',
        title: `${lowStockProducts.length} produit${lowStockProducts.length > 1 ? 's' : ''} à réapprovisionner`,
        message: 'Stock faible détecté',
        link: '/products',
        icon: Package
      });
    }
    
    if (!shopSettings?.socialLinks?.whatsapp) {
      notifs.push({
        id: 'whatsapp-config',
        type: 'config',
        title: 'WhatsApp non configuré',
        message: 'Activez WhatsApp pour booster vos ventes',
        link: '/shop-settings',
        icon: MessageCircle
      });
    }
    
    return notifs;
  }, [pendingOrders, outOfStockProducts, lowStockProducts, shopSettings]);

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      {/* Header Zone */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {user?.name ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight">Bienvenue, {user?.name}</h1>
            <p className="text-xs md:text-sm font-body text-muted-foreground">
              Voici un aperçu de votre activité
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <NotificationCenter notifications={notifications} />
          <PeriodSelector value={period} onChange={setPeriod} />
          <Badge variant="secondary" className="text-xs md:text-sm px-3 py-1">
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg md:text-xl font-display font-bold">Indicateurs Clés</h2>
          <div className="flex items-center gap-2">
            <Switch 
              id="comparison-mode" 
              checked={showComparison}
              onCheckedChange={setShowComparison}
            />
            <Label htmlFor="comparison-mode" className="text-xs md:text-sm cursor-pointer">
              Comparer avec période précédente
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className={`animate-stagger ${isVisible ? 'visible' : ''}`}>
            <KPICard
              title="Revenus"
              value={`${totalRevenue.toLocaleString('fr-FR')} FCFA`}
              icon={TrendingUp}
              iconColor="#10B981"
              trend={period !== 'all' ? {
                value: Math.abs(revenueTrend),
                label: 'vs période précédente',
                isPositive: revenueTrend >= 0
              } : undefined}
              sparklineData={revenueSparklineData}
              showTrend={showComparison}
              level={1}
            />
          </div>
          <div className={`animate-stagger delay-100 ${isVisible ? 'visible' : ''}`}>
            <KPICard
              title="Commandes en Attente"
              value={pendingOrders.length}
              icon={ShoppingCart}
              iconColor="#3B82F6"
              badge={pendingOrders.length > 0 ? {
                text: `${pendingOrders.length} à traiter`,
                variant: 'destructive'
              } : undefined}
              action={pendingOrders.length > 0 ? {
                label: 'Traiter',
                link: '/orders'
              } : undefined}
              showTrend={showComparison}
              level={pendingOrders.length > 0 ? 1 : 2}
            />
          </div>
          <div className={`animate-stagger delay-200 ${isVisible ? 'visible' : ''}`}>
            <KPICard
              title="Stock à Réapprovisionner"
              value={lowStockProducts.length + outOfStockProducts.length}
              icon={Package}
              iconColor="#F59E0B"
              badge={outOfStockProducts.length > 0 ? {
                text: `${outOfStockProducts.length} rupture`,
                variant: 'warning'
              } : undefined}
              action={(lowStockProducts.length + outOfStockProducts.length) > 0 ? {
                label: 'Gérer stock',
                link: '/products'
              } : undefined}
              showTrend={showComparison}
              level={(lowStockProducts.length + outOfStockProducts.length) > 0 ? 2 : 3}
            />
          </div>
          <div className={`animate-stagger delay-300 ${isVisible ? 'visible' : ''}`}>
            <KPICard
              title="Taux de Conversion"
              value={`${conversionRate}%`}
              icon={Percent}
              iconColor="#8B5CF6"
              trend={period !== 'all' ? {
                value: Math.abs(conversionTrend),
                label: 'vs période précédente',
                isPositive: conversionTrend >= 0
              } : undefined}
              sparklineData={conversionSparklineData}
              showTrend={showComparison}
              level={3}
            />
          </div>
        </div>
      </div>

      {/* Smart Insights Zone */}
      <div className={`animate-fade-up delay-100 ${isVisible ? 'visible' : ''}`}>
        <SmartInsights 
          products={products} 
          orders={orders} 
          shopSettings={shopSettings}
          abandonedCarts={getAbandonedCarts()}
        />
      </div>

      {/* Performance Charts Zone */}
      <div className={`animate-fade-up delay-200 ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-lg md:text-xl font-display font-bold mb-4">Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <RevenueChart orders={filteredOrders} period={7} />
          <CategoryPieChart 
            orders={filteredOrders} 
            products={products} 
            categories={categories}
          />
        </div>
      </div>

      {/* Activity Zone */}
      <div className={`animate-fade-up delay-300 ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-lg md:text-xl font-display font-bold mb-4">Activité Récente</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Dernières Commandes</CardTitle>
              <CardDescription>
                Les 5 commandes les plus récentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredOrders.slice(0, 5).length > 0 ? (
                  filteredOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-all group gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">#{order.id}</p>
                        <p className="text-xs text-muted-foreground truncate hidden sm:block">
                          {order.customerEmail}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR', { 
                            day: 'numeric', 
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <Badge 
                          variant={order.status === 'pending' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {order.status === 'pending' ? 'En attente' : 
                           order.status === 'confirmed' ? 'Confirmée' :
                           order.status === 'shipped' ? 'Expédiée' :
                           order.status === 'delivered' ? 'Livrée' :
                           order.status === 'cancelled' ? 'Annulée' : order.status}
                        </Badge>
                        <span className="text-sm font-bold whitespace-nowrap">
                          {order.total.toLocaleString('fr-FR')} F
                        </span>
                        <Link to="/orders">
                          <Button size="icon" variant="ghost" className="h-8 w-8 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucune commande pour cette période
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Popular Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produits Populaires</CardTitle>
              <CardDescription>
                Les produits les plus vendus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularProducts.length > 0 ? (
                  popularProducts.map((product) => (
                    <Link key={product.id} to="/products" className="block">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 hover:scale-[1.01] transition-all group gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.soldCount} {product.soldCount > 1 ? 'vendus' : 'vendu'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                          <Badge 
                            variant={product.stock === 0 ? 'destructive' : product.stock <= 5 ? 'secondary' : 'outline'} 
                            className="text-xs"
                          >
                            Stock: {product.stock}
                          </Badge>
                          <span className="text-sm font-bold whitespace-nowrap">
                            {product.price.toLocaleString('fr-FR')} F
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucune vente pour cette période
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Shop Link & QR Code Zone */}
      <div className={`animate-fade-up delay-400 ${isVisible ? 'visible' : ''}`}>
        <Card className="bg-gradient-hero border-primary/20">
        <CardHeader>
          <CardTitle>Partagez Votre Boutique</CardTitle>
          <CardDescription>
            Partagez ce lien avec vos clients ou utilisez le QR Code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
                <code className="flex-1 text-sm text-muted-foreground truncate">
                  {fullShopUrl}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-kpi-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <a href={`/shop/${shopUrl}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visiter ma boutique
                  </a>
                </Button>
                <Button variant="outline" onClick={handleCopyLink}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copier
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ShopQRCode shopUrl={fullShopUrl} shopName={shopSettings?.shopName || 'Ma Boutique'} />
            </div>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
