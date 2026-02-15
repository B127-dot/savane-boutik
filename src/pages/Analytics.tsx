import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RevenueChart from '@/components/RevenueChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import OrdersBarChart from '@/components/OrdersBarChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Award,
  Download
} from 'lucide-react';

const Analytics = () => {
  const { products, orders, categories } = useApp();
  const { toast } = useToast();
  const [period, setPeriod] = useState<number>(30);

  // Calculs des statistiques
  const totalRevenue = orders
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;
  const activeProducts = products.filter(product => product.status === 'active').length;
  
  // Produits les plus vendus
  const productSales: { [key: string]: number } = {};
  orders.forEach(order => {
    order.products.forEach(item => {
      productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
    });
  });

  const topProducts = Object.entries(productSales)
    .map(([productId, quantity]) => ({
      product: products.find(p => p.id === productId),
      quantity
    }))
    .filter(item => item.product)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  // Ventes par catégorie
  const categorySales: { [key: string]: number } = {};
  orders.forEach(order => {
    order.products.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const category = categories.find(c => c.id === product.categoryId);
        const categoryName = category?.name || 'Sans catégorie';
        categorySales[categoryName] = (categorySales[categoryName] || 0) + (item.price * item.quantity);
      }
    });
  });

  // Commandes récentes
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Calculer les tendances dynamiques basées sur les données réelles
  const now = new Date();
  const periodStart = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);
  const previousPeriodStart = new Date(periodStart.getTime() - period * 24 * 60 * 60 * 1000);

  // Filtrer les commandes par période
  const currentPeriodOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= periodStart && orderDate <= now;
  });

  const previousPeriodOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= previousPeriodStart && orderDate < periodStart;
  });

  // Calculer les revenus par période
  const currentRevenue = currentPeriodOrders
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  const previousRevenue = previousPeriodOrders
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  // Calculer les tendances
  const calculateTrend = (current: number, previous: number): string => {
    if (previous === 0) return current > 0 ? "+100%" : "0%";
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`;
  };

  const revenueTrend = calculateTrend(currentRevenue, previousRevenue);
  const ordersTrend = calculateTrend(currentPeriodOrders.length, previousPeriodOrders.length);
  
  // Tendance des produits actifs (comparaison avec le nombre total de produits)
  const productsTrend = products.length > 0 
    ? `${((activeProducts / products.length) * 100).toFixed(0)}%` 
    : "0%";

  // Tendance du taux de conversion
  const currentConversion = currentPeriodOrders.length > 0 
    ? (currentPeriodOrders.filter(o => o.status === 'delivered').length / currentPeriodOrders.length) * 100 
    : 0;
  const previousConversion = previousPeriodOrders.length > 0 
    ? (previousPeriodOrders.filter(o => o.status === 'delivered').length / previousPeriodOrders.length) * 100 
    : 0;
  const conversionTrend = calculateTrend(currentConversion, previousConversion);

  const stats = [
    {
      title: "Chiffre d'affaires total",
      value: `${totalRevenue.toLocaleString()} XOF`,
      description: "Revenus générés",
      icon: DollarSign,
      trend: revenueTrend,
      color: revenueTrend.startsWith('+') ? "text-success" : revenueTrend === "0%" ? "text-muted-foreground" : "text-destructive"
    },
    {
      title: "Commandes totales",
      value: totalOrders.toString(),
      description: "Toutes les commandes",
      icon: ShoppingCart,
      trend: ordersTrend,
      color: ordersTrend.startsWith('+') ? "text-success" : ordersTrend === "0%" ? "text-muted-foreground" : "text-destructive"
    },
    {
      title: "Produits actifs",
      value: activeProducts.toString(),
      description: "Produits en vente",
      icon: Package,
      trend: productsTrend,
      color: "text-warning"
    },
    {
      title: "Taux de conversion",
      value: `${totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0}%`,
      description: "Commandes livrées",
      icon: TrendingUp,
      trend: conversionTrend,
      color: conversionTrend.startsWith('+') ? "text-success" : conversionTrend === "0%" ? "text-muted-foreground" : "text-destructive"
    }
  ];

  const exportToPDF = async () => {
    const element = document.getElementById('analytics-content');
    if (!element) return;

    toast({
      title: "Génération du PDF...",
      description: "Veuillez patienter quelques secondes",
    });

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`analytics-${new Date().toISOString().split('T')[0]}.pdf`);

      toast({
        title: "PDF exporté !",
        description: "Les statistiques ont été enregistrées en PDF",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'exporter le PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Statistiques</h1>
          <p className="font-body text-muted-foreground text-sm">Analysez les performances de votre boutique</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period.toString()} onValueChange={(val) => setPeriod(Number(val))}>
            <SelectTrigger className="w-[150px] sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 jours</SelectItem>
              <SelectItem value="30">30 jours</SelectItem>
              <SelectItem value="90">90 jours</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportToPDF} variant="outline" className="hidden sm:inline-flex">
            <Download className="w-4 h-4 mr-2" />
            Exporter PDF
          </Button>
        </div>
      </div>

      <div id="analytics-content" className="space-y-6">

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full sm:w-auto overflow-x-auto flex">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            <BarChart3 className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Vue d'ensemble</span>
            <span className="sm:hidden">Global</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="text-xs sm:text-sm">
            <Package className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Produits</span>
            <span className="sm:hidden">Prod.</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="text-xs sm:text-sm">
            <ShoppingCart className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Commandes</span>
            <span className="sm:hidden">Cmd.</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => {
              const iconColors = ['#10B981', '#3B82F6', '#06B6D4', '#8B5CF6'];
              return (
                <Card key={index} className="hover:shadow-medium transition-shadow relative overflow-hidden group">
                  {/* Watermark Icon Background */}
                  <stat.icon 
                    className="absolute -bottom-4 -right-4 h-32 w-32 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none"
                    style={{ color: iconColors[index] }}
                  />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.description}
                        </p>
                      </div>
                      <div className={`p-2 rounded-lg bg-accent/20`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-xs">
                      <span className={`font-medium ${stat.color}`}>
                        {stat.trend}
                      </span>
                      <span className="text-muted-foreground ml-1">vs mois dernier</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart orders={orders} period={period} />
            <CategoryPieChart orders={orders} products={products} categories={categories} />
          </div>

          {/* Ventes par catégorie - Details (hidden on mobile) */}
          <Card className="hidden sm:block">
            <CardHeader>
              <CardTitle>Détails des ventes par catégorie</CardTitle>
              <CardDescription>Performance des différentes catégories de produits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categorySales)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, revenue]) => (
                  <div key={category} className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-gradient-primary flex items-center justify-center">
                        <Package className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{revenue.toLocaleString()} XOF</p>
                      <p className="text-xs text-muted-foreground">
                        {totalRevenue > 0 ? ((revenue / totalRevenue) * 100).toFixed(1) : 0}% du total
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Produits les plus vendus
              </CardTitle>
              <CardDescription>Vos meilleurs produits par quantité vendue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((item, index) => (
                  <div key={item.product?.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.product?.price.toLocaleString()} XOF
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {item.quantity} vendus
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stock Status */}
          <Card>
            <CardHeader>
              <CardTitle>État du stock</CardTitle>
              <CardDescription>Surveillez vos niveaux de stock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="relative overflow-hidden group border-0 shadow-none">
                  <Package className="absolute -bottom-3 -right-3 h-24 w-24 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none" style={{ color: '#10B981' }} />
                  <div className="text-center p-4 rounded-lg bg-success/10 relative z-10">
                    <p className="text-2xl font-bold text-success">
                      {products.filter(p => p.stock > 10).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Stock élevé</p>
                  </div>
                </Card>
                <Card className="relative overflow-hidden group border-0 shadow-none">
                  <Package className="absolute -bottom-3 -right-3 h-24 w-24 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none" style={{ color: '#F59E0B' }} />
                  <div className="text-center p-4 rounded-lg bg-warning/10 relative z-10">
                    <p className="text-2xl font-bold text-warning">
                      {products.filter(p => p.stock <= 10 && p.stock > 0).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Stock faible</p>
                  </div>
                </Card>
                <Card className="relative overflow-hidden group border-0 shadow-none">
                  <Package className="absolute -bottom-3 -right-3 h-24 w-24 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none" style={{ color: '#EF4444' }} />
                  <div className="text-center p-4 rounded-lg bg-destructive/10 relative z-10">
                    <p className="text-2xl font-bold text-destructive">
                      {products.filter(p => p.stock === 0).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Rupture de stock</p>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {/* Orders Bar Chart */}
          <OrdersBarChart orders={orders} />

          {/* Order Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="relative overflow-hidden group">
              <ShoppingCart className="absolute -bottom-3 -right-3 h-24 w-24 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none" style={{ color: '#F59E0B' }} />
              <CardContent className="p-6 text-center relative z-10">
                <div className="text-2xl font-bold text-warning">{pendingOrders}</div>
                <div className="text-sm text-muted-foreground">En attente</div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden group">
              <ShoppingCart className="absolute -bottom-3 -right-3 h-24 w-24 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none" style={{ color: '#3B82F6' }} />
              <CardContent className="p-6 text-center relative z-10">
                <div className="text-2xl font-bold text-primary">
                  {orders.filter(o => o.status === 'confirmed').length}
                </div>
                <div className="text-sm text-muted-foreground">Confirmées</div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden group">
              <ShoppingCart className="absolute -bottom-3 -right-3 h-24 w-24 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none" style={{ color: '#06B6D4' }} />
              <CardContent className="p-6 text-center relative z-10">
                <div className="text-2xl font-bold text-accent">
                  {orders.filter(o => o.status === 'shipped').length}
                </div>
                <div className="text-sm text-muted-foreground">Expédiées</div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden group">
              <ShoppingCart className="absolute -bottom-3 -right-3 h-24 w-24 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none" style={{ color: '#10B981' }} />
              <CardContent className="p-6 text-center relative z-10">
                <div className="text-2xl font-bold text-success">{completedOrders}</div>
                <div className="text-sm text-muted-foreground">Livrées</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Commandes récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                    <div>
                      <p className="font-medium">Commande #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName} • {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{order.total.toLocaleString()} XOF</p>
                      <Badge
                        variant={
                          order.status === 'delivered' ? 'default' :
                          order.status === 'pending' ? 'secondary' :
                          order.status === 'cancelled' ? 'destructive' :
                          'outline'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default Analytics;