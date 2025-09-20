import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { generatePredictionData } from '../../data/mockData';

interface PredictionAccuracyChartProps {
  data?: any[];
  height?: number;
}

export const PredictionAccuracyChart: React.FC<PredictionAccuracyChartProps> = ({ 
  data = generatePredictionData().slice(-24), // Last 24 data points
  height = 300 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">Prediction data will appear here when available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            label={{ value: 'Error (ns)', angle: -90, position: 'insideLeft' }}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--card-foreground))'
            }}
            labelFormatter={(value) => new Date(value).toLocaleString()}
            formatter={(value: number, name: string) => [
              `${value.toFixed(2)} ns`,
              name === 'actualError' ? 'Actual Error' : 'Predicted Error'
            ]}
          />
          <Legend />
          <ReferenceLine y={5} stroke="#10B981" strokeDasharray="5 5" label="Low Error Threshold" />
          <ReferenceLine y={15} stroke="#F59E0B" strokeDasharray="5 5" label="High Error Threshold" />
          <Line 
            type="monotone" 
            dataKey="actualError" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            name="Actual Error"
          />
          <Line 
            type="monotone" 
            dataKey="predictedError" 
            stroke="#10B981" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            name="Predicted Error"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
