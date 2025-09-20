import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { modelPerformanceData } from '../../data/mockData';

interface ModelPerformanceChartProps {
  data?: any[];
  height?: number;
}

export const ModelPerformanceChart: React.FC<ModelPerformanceChartProps> = ({ 
  data = modelPerformanceData,
  height = 300 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">Model performance data will appear here when available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <XAxis 
            dataKey="model" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={[85, 100]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--card-foreground))'
            }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)}%`,
              name === 'accuracy' ? 'Accuracy' : name === 'mae' ? 'MAE (ns)' : 'RMSE (ns)'
            ]}
          />
          <Legend />
          <Bar 
            dataKey="accuracy" 
            fill="#3B82F6" 
            name="Accuracy"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="mae" 
            fill="#10B981" 
            name="MAE"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="rmse" 
            fill="#F59E0B" 
            name="RMSE"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
