import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, ShoppingCart, Package, Percent, ExternalLink, Copy, CheckCircle2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import QuickActions from '@/components/dashboard/QuickActions';
import SmartInsights from '@/components/dashboard/SmartInsights';
import KPICard from '@/components/dashboard/KPICard';
import PeriodSelector, { Period } from '@/components/dashboard/PeriodSelector';
import RevenueChart from '@/components/RevenueChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import ShopQRCode from '@/components/ShopQRCode';

const Dashboard = () => {
  const { user, products, orders, categories, shopSettings } = useApp();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [period, setPeriod] = useState<Period>('today');

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

  // Calculate metrics
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = filteredOrders.filter(o => o.status === 'pending');
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5 && p.status === 'active');
  const outOfStockProducts = products.filter(p => p.stock === 0 && p.status === 'active');
  const totalOrders = filteredOrders.length;
  const conversionRate = totalOrders > 0 ? ((totalOrders / (totalOrders + 10)) * 100).toFixed(1) : '0';

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

  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      {/* Header Zone */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {user?.name ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bienvenue, {user?.name}</h1>
            <p className="text-sm text-muted-foreground">
              Voici un aperçu de votre activité
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PeriodSelector value={period} onChange={setPeriod} />
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
          </Badge>
        </div>
      </div>

      {/* Quick Actions Zone */}
      <QuickActions />

      {/* KPIs Zone */}
      <div>
        <h2 className="text-xl font-bold mb-4">Indicateurs Clés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Revenus"
            value={`${totalRevenue.toLocaleString('fr-FR')} FCFA`}
            icon={TrendingUp}
            trend={{
              value: 12,
              label: 'vs période précédente',
              isPositive: true
            }}
            level={1}
          />
          <KPICard
            title="Commandes en Attente"
            value={pendingOrders.length}
            icon={ShoppingCart}
            badge={pendingOrders.length > 0 ? {
              text: `${pendingOrders.length} à traiter`,
              variant: 'destructive'
            } : undefined}
            action={pendingOrders.length > 0 ? {
              label: 'Traiter',
              link: '/orders'
            } : undefined}
            level={pendingOrders.length > 0 ? 1 : 2}
          />
          <KPICard
            title="Stock à Réapprovisionner"
            value={lowStockProducts.length + outOfStockProducts.length}
            icon={Package}
            badge={outOfStockProducts.length > 0 ? {
              text: `${outOfStockProducts.length} rupture`,
              variant: 'warning'
            } : undefined}
            action={(lowStockProducts.length + outOfStockProducts.length) > 0 ? {
              label: 'Gérer stock',
              link: '/products'
            } : undefined}
            level={(lowStockProducts.length + outOfStockProducts.length) > 0 ? 2 : 3}
          />
          <KPICard
            title="Taux de Conversion"
            value={`${conversionRate}%`}
            icon={Percent}
            trend={{
              value: 5,
              label: 'vs période précédente',
              isPositive: true
            }}
            level={3}
          />
        </div>
      </div>

      {/* Smart Insights Zone */}
      <SmartInsights 
        products={products} 
        orders={orders} 
        shopSettings={shopSettings}
      />

      {/* Performance Charts Zone */}
      <div>
        <h2 className="text-xl font-bold mb-4">Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart orders={filteredOrders} period={7} />
          <CategoryPieChart 
            orders={filteredOrders} 
            products={products} 
            categories={categories}
          />
        </div>
      </div>

      {/* Activity Zone */}
      <div>
        <h2 className="text-xl font-bold mb-4">Activité Récente</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <p className="text-sm font-semibold">#{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.customerEmail}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={order.status === 'pending' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                        <span className="text-sm font-bold">
                          {order.total.toLocaleString('fr-FR')} F
                        </span>
                        <Link to="/orders">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
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
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.soldCount} vendus
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Stock: {product.stock}
                        </Badge>
                        <span className="text-sm font-bold">
                          {product.price.toLocaleString('fr-FR')} F
                        </span>
                      </div>
                    </div>
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
  );
};

export default Dashboard;
