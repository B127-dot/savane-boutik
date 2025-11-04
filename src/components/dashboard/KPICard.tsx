import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  badge?: {
    text: string;
    variant: 'default' | 'destructive' | 'warning' | 'success';
  };
  action?: {
    label: string;
    link: string;
  };
  level?: 1 | 2 | 3;
}

const KPICard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  badge, 
  action,
  level = 3 
}: KPICardProps) => {
  const shadowClass = level === 1 ? 'shadow-lg' : level === 2 ? 'shadow-md' : 'shadow-sm';
  const borderClass = level === 1 ? 'border-2' : 'border';
  const iconSize = level === 1 ? 'h-8 w-8' : level === 2 ? 'h-6 w-6' : 'h-5 w-5';

  const getBadgeClass = (variant: string) => {
    switch (variant) {
      case 'destructive': return 'bg-kpi-danger text-white';
      case 'warning': return 'bg-kpi-warning text-white';
      case 'success': return 'bg-kpi-success text-white';
      default: return '';
    }
  };

  return (
    <Card className={`${shadowClass} ${borderClass} hover:scale-[1.02] transition-transform`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-extrabold tabular-nums">{value}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Icon className={`${iconSize} text-primary`} />
            {badge && (
              <Badge className={getBadgeClass(badge.variant)}>
                {badge.text}
              </Badge>
            )}
          </div>
        </div>

        {trend && (
          <div className="flex items-center gap-1 mb-3">
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 text-kpi-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-kpi-danger" />
            )}
            <span className={`text-sm font-medium ${trend.isPositive ? 'text-kpi-success' : 'text-kpi-danger'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        )}

        {action && (
          <Link to={action.link}>
            <Button size="sm" variant="outline" className="w-full mt-2">
              {action.label}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;
