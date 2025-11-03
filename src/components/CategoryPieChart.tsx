import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Order, Product, Category } from '@/contexts/AppContext';

interface CategoryPieChartProps {
  orders: Order[];
  products: Product[];
  categories: Category[];
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const CategoryPieChart = ({ orders, products, categories }: CategoryPieChartProps) => {
  const chartData = useMemo(() => {
    const categorySales: { [key: string]: number } = {};
    
    orders.forEach(order => {
      order.products.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          const category = categories.find(c => c.id === product.categoryId);
          const categoryName = category?.name || 'Sans catégorie';
          categorySales[categoryName] = (categorySales[categoryName] || 0) + (item.price * item.quantity);
        }
      });
    });

    return Object.entries(categorySales)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [orders, products, categories]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventes par Catégorie</CardTitle>
        <CardDescription>Répartition du chiffre d'affaires</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => `${value.toLocaleString()} XOF`}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
