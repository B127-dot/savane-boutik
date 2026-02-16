import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCountUp } from '@/hooks/useCountUp';
import MiniSparkline from './MiniSparkline';
import { useMemo } from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor?: string;
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
  sparklineData?: number[];
  showTrend?: boolean;
}

const KPICard = ({ 
  title, 
  value, 
  icon: Icon, 
  iconColor = 'hsl(var(--primary))',
  trend, 
  badge, 
  action,
  level = 3,
  sparklineData,
  showTrend = true
}: KPICardProps) => {
  const shadowClass = level === 1 ? 'shadow-lg' : level === 2 ? 'shadow-md' : 'shadow-sm';
  const borderClass = level === 1 ? 'border-primary/20' : '';

  // Extract numeric value for count-up animation
  const numericValue = useMemo(() => {
    if (typeof value === 'number') return value;
    const match = String(value).match(/[\d,]+/);
    if (match) {
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return null;
  }, [value]);

  const animatedCount = useCountUp({ 
    end: numericValue || 0, 
    duration: 1200 
  });

  const displayValue = useMemo(() => {
    if (typeof value === 'number') return animatedCount;
    if (numericValue !== null) {
      return String(value).replace(/[\d,]+/, String(animatedCount).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    }
    return value;
  }, [value, animatedCount, numericValue]);

  const getBadgeClass = (variant: string) => {
    switch (variant) {
      case 'destructive': return 'bg-kpi-danger text-white';
      case 'warning': return 'bg-kpi-warning text-white';
      case 'success': return 'bg-kpi-success text-white';
      default: return '';
    }
  };

  return (
    <Card className={`${shadowClass} ${borderClass} hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden`}>
      {/* Watermark Icon Background - hidden on mobile */}
      <Icon 
        className="absolute -bottom-4 -right-4 h-32 w-32 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none hidden sm:block"
        style={{ color: iconColor }}
      />
      <CardContent className="p-4 sm:p-6 relative z-10">
        <div className="flex items-start justify-between mb-2 sm:mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-display font-medium text-muted-foreground mb-1 truncate">{title}</p>
            <p className="text-xl sm:text-3xl font-display font-extrabold tabular-nums truncate">{displayValue}</p>
          </div>
          <div className="flex flex-col items-end gap-1 sm:gap-2 ml-2">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary transition-all duration-300 group-hover:rotate-6 group-hover:scale-110" />
            {badge && (
              <Badge className={`${getBadgeClass(badge.variant)} text-[10px] sm:text-xs whitespace-nowrap ${badge.variant === 'destructive' ? 'animate-pulse' : ''}`}>
                {badge.text}
              </Badge>
            )}
          </div>
        </div>

        {showTrend && trend && (
          <div className="flex items-center gap-1 mb-2 sm:mb-3 animate-fade-in flex-wrap">
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-kpi-success shrink-0" />
            ) : (
              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-kpi-danger shrink-0" />
            )}
            <span className={`text-xs sm:text-sm font-medium ${trend.isPositive ? 'text-kpi-success' : 'text-kpi-danger'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">{trend.label}</span>
          </div>
        )}

        {/* Sparkline hidden on mobile */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="mb-3 hidden sm:block">
            <MiniSparkline 
              data={sparklineData} 
              color={trend?.isPositive ? 'hsl(var(--kpi-success))' : 'hsl(var(--primary))'}
            />
          </div>
        )}

        {action && (
          <Link to={action.link}>
            <Button size="sm" variant="outline" className="w-full mt-1 sm:mt-2 hover:bg-primary/10 transition-colors text-xs sm:text-sm">
              {action.label}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;
