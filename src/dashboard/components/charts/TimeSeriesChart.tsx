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
  Area,
  AreaChart
} from 'recharts';
import { generateTimeSeriesData } from '../../data/mockData';

interface TimeSeriesChartProps {
  data?: any[];
  height?: number;
  showArea?: boolean;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ 
  data = generateTimeSeriesData(),
  height = 300,
  showArea = false 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">Time series data will appear here when available</p>
        </div>
      </div>
    );
  }

  // Group data by time for area chart
  const groupedData = data.reduce((acc: any, item) => {
    const existing = acc.find((d: any) => d.time === item.time);
    if (existing) {
      existing[item.type] = item.value;
    } else {
      acc.push({ time: item.time, [item.type]: item.value });
    }
    return acc;
  }, []);

  if (showArea) {
    return (
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={groupedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
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
                name === 'actual' ? 'Actual' : 'Predicted'
              ]}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="actual"
              stackId="1"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.6}
              name="Actual"
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stackId="2"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.6}
              name="Predicted"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={groupedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
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
              name === 'actual' ? 'Actual' : 'Predicted'
            ]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            name="Actual"
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#10B981" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            name="Predicted"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
