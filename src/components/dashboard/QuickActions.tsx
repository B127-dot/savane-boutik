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
      <CardContent className="p-4 md:p-6">
        <h2 className="text-base md:text-lg font-bold mb-4 flex items-center gap-2">
          <span className="text-xl md:text-2xl">🎯</span>
          Actions Rapides
        </h2>
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 scrollbar-hide">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.link} className="snap-start shrink-0 md:shrink">
                <Button
                  variant={action.variant}
                  className="w-[140px] md:w-full h-auto flex flex-col items-center gap-2 p-4 hover:scale-[1.05] hover:shadow-lg hover:bg-primary/10 transition-all duration-300 group min-h-[100px] md:min-h-[110px]"
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                  <div className="text-center">
                    <div className="font-semibold text-xs md:text-sm">{action.title}</div>
                    <div className="text-[10px] md:text-xs opacity-70">{action.description}</div>
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
