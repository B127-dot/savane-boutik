import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Order } from '@/contexts/AppContext';

interface RevenueChartProps {
  orders: Order[];
  period: number; // 7, 30, or 90 days
}

const RevenueChart = ({ orders, period }: RevenueChartProps) => {
  const chartData = useMemo(() => {
    const now = new Date();
    const data: { date: string; revenue: number }[] = [];
    
    // Générer les données pour la période
    for (let i = period - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
      
      // Calculer le revenu pour cette date
      const dayRevenue = orders
        .filter(order => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.toDateString() === date.toDateString() &&
            order.status !== 'cancelled'
          );
        })
        .reduce((sum, order) => sum + order.total, 0);
      
      data.push({ date: dateStr, revenue: dayRevenue });
    }
    
    return data;
  }, [orders, period]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution du Chiffre d'Affaires</CardTitle>
        <CardDescription>Revenus des {period} derniers jours</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value.toLocaleString()} XOF`, 'Revenu']}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
