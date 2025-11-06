import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MiniSparklineProps {
  data: number[];
  color?: string;
  className?: string;
}

const MiniSparkline = ({ data, color = 'hsl(var(--primary))', className = '' }: MiniSparklineProps) => {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <div className={`w-full h-10 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniSparkline;
