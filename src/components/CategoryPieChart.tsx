import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { Order, Product, Category } from '@/contexts/AppContext';

interface CategoryPieChartProps {
  orders: Order[];
  products: Product[];
  categories: Category[];
}

const COLORS = [
  'hsl(280, 65%, 60%)',  // Violet
  'hsl(217, 91%, 60%)',  // Bleu
  'hsl(142, 76%, 36%)',  // Vert
  'hsl(48, 96%, 53%)',   // Orange/Jaune
  'hsl(340, 75%, 55%)',  // Rose
];

// Active shape for hover effect
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
      />
    </g>
  );
};

const CategoryPieChart = ({ orders, products, categories }: CategoryPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { chartData, totalRevenue } = useMemo(() => {
    const categorySales: { [key: string]: number } = {};
    let total = 0;
    
    orders.forEach(order => {
      order.products.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          const category = categories.find(c => c.id === product.categoryId);
          const categoryName = category?.name || 'Sans catégorie';
          const amount = item.price * item.quantity;
          categorySales[categoryName] = (categorySales[categoryName] || 0) + amount;
          total += amount;
        }
      });
    });

    const data = Object.entries(categorySales)
      .map(([name, value]) => ({ 
        name, 
        value,
        percentage: total > 0 ? Math.round((value / total) * 100) : 0
      }))
      .sort((a, b) => b.value - a.value);

    return { chartData: data, totalRevenue: total };
  }, [orders, products, categories]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toLocaleString();
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Ventes par Catégorie</CardTitle>
        <CardDescription>Répartition du chiffre d'affaires</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col items-center">
          {/* Donut Chart with Central Label */}
          <div className="relative w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  cornerRadius={6}
                  dataKey="value"
                  activeIndex={activeIndex !== null ? activeIndex : undefined}
                  activeShape={renderActiveShape}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  animationBegin={0}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {chartData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="transition-all duration-200"
                      style={{ 
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Central Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-muted-foreground font-medium">Total CA</span>
              <span className="text-xl font-bold text-foreground">
                {formatCurrency(totalRevenue)}
              </span>
              <span className="text-xs text-muted-foreground">XOF</span>
            </div>
          </div>

          {/* Custom Legend with Progress Bars */}
          <div className="w-full mt-4 space-y-3">
            {chartData.map((entry, index) => (
              <motion.div
                key={entry.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`group cursor-pointer transition-all duration-200 ${
                  activeIndex === index ? 'scale-[1.02]' : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {entry.percentage}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${entry.percentage}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full transition-all duration-200"
                    style={{ 
                      backgroundColor: COLORS[index % COLORS.length],
                      boxShadow: activeIndex === index 
                        ? `0 0 12px ${COLORS[index % COLORS.length]}` 
                        : 'none'
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {chartData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Aucune donnée disponible</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
