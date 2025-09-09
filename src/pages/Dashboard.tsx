import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Package, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
  const { user, products, orders, categories } = useApp();

  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const stats = [
    {
      title: "Produits Actifs",
      value: activeProducts,
      description: "Produits en vente",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Commandes",
      value: orders.length,
      description: "Total des commandes",
      icon: ShoppingBag,
      color: "text-green-600"
    },
    {
      title: "Revenus",
      value: `${totalRevenue.toLocaleString('fr-FR')} €`,
      description: "Chiffre d'affaires total",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "En Attente",
      value: pendingOrders,
      description: "Commandes à traiter",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue {user?.name}, voici un aperçu de votre activité
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dernières Commandes</CardTitle>
            <CardDescription>
              Aperçu des commandes récentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">#{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customerEmail}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={order.status === 'pending' ? 'default' : 'secondary'}
                    >
                      {order.status}
                    </Badge>
                    <span className="text-sm font-medium">
                      {order.total.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produits Populaires</CardTitle>
            <CardDescription>
              Vos produits les plus vendus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Stock: {product.stock}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {categories.find(c => c.id === product.categoryId)?.name || 'Sans catégorie'}
                    </Badge>
                    <span className="text-sm font-medium">
                      {product.price.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;