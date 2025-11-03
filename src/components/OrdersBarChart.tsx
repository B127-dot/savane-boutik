import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Order } from '@/contexts/AppContext';

interface OrdersBarChartProps {
  orders: Order[];
}

const OrdersBarChart = ({ orders }: OrdersBarChartProps) => {
  const chartData = useMemo(() => {
    const statusLabels: { [key: string]: string } = {
      pending: 'En attente',
      confirmed: 'Confirmées',
      shipped: 'Expédiées',
      delivered: 'Livrées',
      cancelled: 'Annulées'
    };

    const statusCounts = {
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };

    orders.forEach(order => {
      if (order.status in statusCounts) {
        statusCounts[order.status as keyof typeof statusCounts]++;
      }
    });

    return Object.entries(statusCounts).map(([status, count]) => ({
      status: statusLabels[status] || status,
      count,
      fill: status === 'delivered' ? 'hsl(var(--chart-1))' :
            status === 'pending' ? 'hsl(var(--chart-3))' :
            status === 'confirmed' ? 'hsl(var(--chart-2))' :
            status === 'shipped' ? 'hsl(var(--chart-4))' :
            'hsl(var(--chart-5))'
    }));
  }, [orders]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes par Statut</CardTitle>
        <CardDescription>Répartition des commandes selon leur état</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="status" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value}`, 'Nombre']}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OrdersBarChart;
