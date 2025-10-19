import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShoppingBag, Package, TrendingUp, Users, ExternalLink, Copy, CheckCircle2, MessageCircle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getWhatsAppClickCount, isValidWhatsAppNumber } from '@/lib/whatsapp';

const Dashboard = () => {
  const { user, products, orders, categories, shopSettings } = useApp();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const whatsappClicks = getWhatsAppClickCount();
  const isWhatsAppConfigured = shopSettings?.socialLinks?.whatsapp && isValidWhatsAppNumber(shopSettings.socialLinks.whatsapp);

  const shopUrl = shopSettings?.shopUrl || 'ma-boutique';
  const fullShopUrl = `${window.location.origin}/shop/${shopUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullShopUrl);
    setCopied(true);
    toast({
      title: "Lien copié !",
      description: "Le lien de votre boutique a été copié dans le presse-papier",
    });
    setTimeout(() => setCopied(false), 2000);
  };

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
      value: `${totalRevenue.toLocaleString('fr-FR')} FCFA`,
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

      {/* Lien de la boutique */}
      <Card className="bg-gradient-hero border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Ma Boutique en Ligne
              </CardTitle>
              <CardDescription className="mt-2">
                Partagez ce lien avec vos clients pour qu'ils puissent visiter votre boutique
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
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
                <CheckCircle2 className="h-4 w-4 text-success" />
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
              Copier le lien
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Configuration */}
      {!isWhatsAppConfigured ? (
        <Alert className="border-[#25D366] bg-[#25D366]/10">
          <MessageCircle className="h-4 w-4 text-[#25D366]" />
          <AlertTitle>Activez WhatsApp pour booster vos ventes ! 🚀</AlertTitle>
          <AlertDescription className="space-y-3 mt-2">
            <p className="text-sm">
              Permettez à vos clients de commander directement via WhatsApp. C'est rapide, simple et très populaire au Burkina Faso !
            </p>
            <Link to="/shop-settings">
              <Button className="bg-[#25D366] hover:bg-[#20BA5A] text-white">
                <Settings className="mr-2 h-4 w-4" />
                Configurer WhatsApp Business
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="border-[#25D366]/20 bg-gradient-to-r from-[#25D366]/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  WhatsApp Business
                  <Badge className="bg-[#25D366] hover:bg-[#20BA5A]">Actif</Badge>
                </CardTitle>
                <CardDescription className="mt-2">
                  Les clients peuvent commander via WhatsApp
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
              <div>
                <p className="text-sm font-medium">Numéro configuré</p>
                <p className="text-xs text-muted-foreground">{shopSettings.socialLinks.whatsapp}</p>
              </div>
              <Badge variant="outline">{whatsappClicks} clics</Badge>
            </div>
            <Link to="/shop-settings">
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Modifier les paramètres
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

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
                      {order.total.toLocaleString('fr-FR')} FCFA
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
                      {product.price.toLocaleString('fr-FR')} FCFA
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