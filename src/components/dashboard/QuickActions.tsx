import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Store, Boxes, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      title: "Nouveau Produit",
      icon: Package,
      link: "/products",
      variant: "default" as const,
      description: "Ajouter un produit"
    },
    {
      title: "Ma Boutique",
      icon: Store,
      link: "/shop/ma-boutique",
      variant: "outline" as const,
      description: "Voir la boutique"
    },
    {
      title: "Gérer Stock",
      icon: Boxes,
      link: "/products",
      variant: "outline" as const,
      description: "Stock & inventaire"
    },
    {
      title: "WhatsApp",
      icon: MessageCircle,
      link: "/shop-settings",
      variant: "outline" as const,
      description: "Configuration"
    }
  ];

  return (
    <Card className="shadow-md border-2">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Actions Rapides
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.link}>
                <Button
                  variant={action.variant}
                  className="w-full h-auto flex flex-col items-center gap-2 p-4 hover:scale-[1.02] transition-transform"
                >
                  <Icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs opacity-70">{action.description}</div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
