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
  trend, 
  badge, 
  action,
  level = 3,
  sparklineData,
  showTrend = true
}: KPICardProps) => {
  const shadowClass = level === 1 ? 'shadow-lg' : level === 2 ? 'shadow-md' : 'shadow-sm';
  const borderClass = level === 1 ? 'border-2' : 'border';
  const iconSize = level === 1 ? 'h-8 w-8' : level === 2 ? 'h-6 w-6' : 'h-5 w-5';

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

  // Get background shapes and colors based on title
  const getBackgroundStyle = () => {
    const titleLower = title.toLowerCase();
    
    if (badge?.variant === 'destructive') {
      return {
        color: 'hsl(var(--kpi-danger))',
        iconColor: 'text-kpi-danger',
        shapes: (
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 400 200">
            <path d="M0,100 Q100,50 200,80 T400,100 L400,200 L0,200 Z" fill="currentColor" />
            <circle cx="350" cy="50" r="80" fill="currentColor" opacity="0.5" />
          </svg>
        )
      };
    }
    
    if (titleLower.includes('chiffre') || titleLower.includes('revenue') || titleLower.includes('ventes')) {
      return {
        color: 'hsl(var(--kpi-success))',
        iconColor: 'text-kpi-success',
        shapes: (
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 400 200">
            <path d="M0,150 Q100,100 200,120 T400,140 L400,200 L0,200 Z" fill="currentColor" />
            <circle cx="320" cy="60" r="100" fill="currentColor" opacity="0.6" />
            <circle cx="80" cy="140" r="60" fill="currentColor" opacity="0.4" />
          </svg>
        )
      };
    }
    
    if (titleLower.includes('commande') || titleLower.includes('order') || titleLower.includes('attente')) {
      return {
        color: 'hsl(var(--chart-2))',
        iconColor: 'text-chart-2',
        shapes: (
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 400 200">
            <path d="M0,120 Q150,70 300,110 T400,90 L400,200 L0,200 Z" fill="currentColor" />
            <circle cx="300" cy="80" r="90" fill="currentColor" opacity="0.5" />
          </svg>
        )
      };
    }
    
    if (titleLower.includes('stock') || titleLower.includes('produit') || titleLower.includes('product')) {
      return {
        color: 'hsl(var(--kpi-warning))',
        iconColor: 'text-kpi-warning',
        shapes: (
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 400 200">
            <path d="M0,130 Q120,90 240,120 T400,110 L400,200 L0,200 Z" fill="currentColor" />
            <circle cx="340" cy="70" r="85" fill="currentColor" opacity="0.6" />
            <path d="M0,160 Q80,140 160,155 T320,165" stroke="currentColor" strokeWidth="30" fill="none" opacity="0.3" />
          </svg>
        )
      };
    }
    
    if (titleLower.includes('conversion') || titleLower.includes('taux')) {
      return {
        color: 'hsl(var(--chart-4))',
        iconColor: 'text-chart-4',
        shapes: (
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 400 200">
            <circle cx="350" cy="60" r="95" fill="currentColor" opacity="0.6" />
            <circle cx="250" cy="140" r="70" fill="currentColor" opacity="0.4" />
            <circle cx="100" cy="100" r="50" fill="currentColor" opacity="0.3" />
          </svg>
        )
      };
    }
    
    return {
      color: 'hsl(var(--primary))',
      iconColor: 'text-primary',
      shapes: (
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 400 200">
          <path d="M0,140 Q100,100 200,130 T400,120 L400,200 L0,200 Z" fill="currentColor" />
          <circle cx="330" cy="75" r="80" fill="currentColor" opacity="0.5" />
        </svg>
      )
    };
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <Card className={`${shadowClass} ${borderClass} hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative`}>
      {/* Large background shapes */}
      <div className="absolute inset-0 pointer-events-none" style={{ color: backgroundStyle.color }}>
        {backgroundStyle.shapes}
      </div>
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-display font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-display font-extrabold tabular-nums">{displayValue}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Icon className={`${iconSize} ${backgroundStyle.iconColor} transition-all duration-300 group-hover:scale-110`} strokeWidth={2} />
            {badge && (
              <Badge className={`${getBadgeClass(badge.variant)} ${badge.variant === 'destructive' ? 'animate-pulse' : ''}`}>
                {badge.text}
              </Badge>
            )}
          </div>
        </div>

        {showTrend && trend && (
          <div className="flex items-center gap-1 mb-3 animate-fade-in">
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

        {sparklineData && sparklineData.length > 0 && (
          <div className="mb-3">
            <MiniSparkline 
              data={sparklineData} 
              color={trend?.isPositive ? 'hsl(var(--kpi-success))' : 'hsl(var(--primary))'}
            />
          </div>
        )}

        {action && (
          <Link to={action.link}>
            <Button size="sm" variant="outline" className="w-full mt-2 hover:bg-primary/10 transition-colors">
              {action.label}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;
