import { Badge } from '@/components/ui/badge';
import { Flame, Zap, TrendingUp } from 'lucide-react';

interface ProductBadgeProps {
  variant: 'new' | 'discount' | 'limited' | 'bestseller';
  value?: number;
}

const ProductBadge = ({ variant, value }: ProductBadgeProps) => {
  const badges = {
    new: {
      label: 'NOUVEAU',
      className: 'bg-primary text-primary-foreground',
      icon: <Zap className="h-3 w-3 mr-1" />
    },
    discount: {
      label: `-${value}%`,
      className: 'bg-destructive text-destructive-foreground',
      icon: null
    },
    limited: {
      label: 'STOCK LIMITÉ',
      className: 'bg-warning text-warning-foreground',
      icon: <Flame className="h-3 w-3 mr-1" />
    },
    bestseller: {
      label: 'BESTSELLER',
      className: 'bg-chart-4 text-white',
      icon: <TrendingUp className="h-3 w-3 mr-1" />
    }
  };

  const badge = badges[variant];

  return (
    <Badge className={`${badge.className} flex items-center font-bold text-xs shadow-md`}>
      {badge.icon}
      {badge.label}
    </Badge>
  );
};

export default ProductBadge;
