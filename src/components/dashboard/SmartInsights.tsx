import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, PackageX, Clock, MessageCircle, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product, Order, ShopSettings, AbandonedCart } from '@/contexts/AppContext';

interface SmartInsightsProps {
  products: Product[];
  orders: Order[];
  shopSettings: ShopSettings | null;
  abandonedCarts: AbandonedCart[];
}

interface Insight {
  type: 'critical' | 'warning' | 'info';
  icon: React.ElementType;
  title: string;
  message: string;
  action: string;
  link: string;
}

const SmartInsights = ({ products, orders, shopSettings, abandonedCarts }: SmartInsightsProps) => {
  const insights: Insight[] = [];

  // Produits en rupture de stock (Critical)
  const outOfStockProducts = products.filter(p => p.stock === 0 && p.status === 'active');
  if (outOfStockProducts.length > 0) {
    insights.push({
      type: 'critical',
      icon: PackageX,
      title: 'Produits en rupture de stock',
      message: `${outOfStockProducts.length} produits ne peuvent plus être vendus`,
      action: 'Réapprovisionner',
      link: '/products'
    });
  }

  // Paniers abandonnés (Warning)
  if (abandonedCarts.length > 0) {
    insights.push({
      type: 'warning',
      icon: ShoppingCart,
      title: 'Paniers abandonnés',
      message: `${abandonedCarts.length} client${abandonedCarts.length > 1 ? 's ont' : ' a'} abandonné leur panier`,
      action: 'Relancer les clients',
      link: '/marketing'
    });
  }

  // Commandes en attente anciennes (Warning)
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oldPendingOrders = orders.filter(o => {
    if (o.status !== 'pending') return false;
    const orderDate = new Date(o.createdAt);
    return orderDate < oneDayAgo;
  });

  if (oldPendingOrders.length > 0) {
    insights.push({
      type: 'warning',
      icon: Clock,
      title: 'Commandes en attente',
      message: `${oldPendingOrders.length} commandes attendent depuis plus de 24h`,
      action: 'Traiter maintenant',
      link: '/orders'
    });
  }

  // WhatsApp non configuré (Info)
  const isWhatsAppConfigured = shopSettings?.socialLinks?.whatsapp;
  if (!isWhatsAppConfigured) {
    insights.push({
      type: 'info',
      icon: MessageCircle,
      title: 'Boostez vos ventes',
      message: 'Activez WhatsApp pour augmenter vos conversions de 30%',
      action: 'Configurer WhatsApp',
      link: '/shop-settings'
    });
  }

  // Produits inactifs nombreux (Info)
  const inactiveProducts = products.filter(p => p.status === 'inactive');
  if (inactiveProducts.length > 5) {
    insights.push({
      type: 'info',
      icon: PackageX,
      title: 'Produits inactifs',
      message: `Vous avez ${inactiveProducts.length} produits inactifs. Pensez à les réactiver ou les supprimer`,
      action: 'Gérer produits',
      link: '/products'
    });
  }

  // Aucune commande récente (Warning si plus de 7 jours sans commande)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentOrders = orders.filter(o => new Date(o.createdAt) >= sevenDaysAgo);
  if (orders.length > 0 && recentOrders.length === 0) {
    insights.push({
      type: 'warning',
      icon: Clock,
      title: 'Aucune vente récente',
      message: 'Vous n\'avez pas eu de commande depuis plus de 7 jours',
      action: 'Voir marketing',
      link: '/marketing'
    });
  }

  if (insights.length === 0) {
    return null;
  }

  const getBorderClass = (type: string) => {
    switch (type) {
      case 'critical': return 'border-kpi-danger bg-kpi-danger/10';
      case 'warning': return 'border-kpi-warning bg-kpi-warning/10';
      case 'info': return 'border-primary bg-primary/10';
      default: return '';
    }
  };

  const getIconClass = (type: string) => {
    switch (type) {
      case 'critical': return 'text-kpi-danger';
      case 'warning': return 'text-kpi-warning';
      case 'info': return 'text-primary';
      default: return '';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        Nécessite votre attention
      </h2>
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <Alert key={index} className={getBorderClass(insight.type)}>
            <Icon className={`h-4 w-4 ${getIconClass(insight.type)}`} />
            <AlertTitle className="font-semibold">{insight.title}</AlertTitle>
            <AlertDescription className="space-y-3 mt-2">
              <p className="text-sm">{insight.message}</p>
              <Link to={insight.link}>
                <Button 
                  size="sm" 
                  variant={insight.type === 'critical' ? 'destructive' : insight.type === 'warning' ? 'default' : 'outline'}
                  className="mt-2"
                >
                  {insight.action}
                </Button>
              </Link>
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
};

export default SmartInsights;
