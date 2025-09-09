import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Award
} from 'lucide-react';

const Analytics = () => {
  const { products, orders, categories } = useApp();

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

  const stats = [
    {
      title: "Chiffre d'affaires total",
      value: `${totalRevenue.toLocaleString()} XOF`,
      description: "Revenus générés",
      icon: DollarSign,
      trend: "+12%",
      color: "text-success"
    },
    {
      title: "Commandes totales",
      value: totalOrders.toString(),
      description: "Toutes les commandes",
      icon: ShoppingCart,
      trend: "+5%",
      color: "text-primary"
    },
    {
      title: "Produits actifs",
      value: activeProducts.toString(),
      description: "Produits en vente",
      icon: Package,
      trend: "+2%",
      color: "text-warning"
    },
    {
      title: "Taux de conversion",
      value: `${totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0}%`,
      description: "Commandes livrées",
      icon: TrendingUp,
      trend: "+8%",
      color: "text-success"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Statistiques</h1>
        <p className="text-muted-foreground">Analysez les performances de votre boutique</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="w-4 h-4 mr-2" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="products">
            <Package className="w-4 h-4 mr-2" />
            Produits
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Commandes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
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
            ))}
          </div>

          {/* Ventes par catégorie */}
          <Card>
            <CardHeader>
              <CardTitle>Ventes par catégorie</CardTitle>
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
                <div className="text-center p-4 rounded-lg bg-success/10">
                  <p className="text-2xl font-bold text-success">
                    {products.filter(p => p.stock > 10).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Stock élevé</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-warning/10">
                  <p className="text-2xl font-bold text-warning">
                    {products.filter(p => p.stock <= 10 && p.stock > 0).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Stock faible</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-destructive/10">
                  <p className="text-2xl font-bold text-destructive">
                    {products.filter(p => p.stock === 0).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Rupture de stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {/* Order Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-warning">{pendingOrders}</div>
                <div className="text-sm text-muted-foreground">En attente</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {orders.filter(o => o.status === 'confirmed').length}
                </div>
                <div className="text-sm text-muted-foreground">Confirmées</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent">
                  {orders.filter(o => o.status === 'shipped').length}
                </div>
                <div className="text-sm text-muted-foreground">Expédiées</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
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
  );
};

export default Analytics;