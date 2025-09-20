import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface HistogramChartProps {
  data?: number[];
  height?: number;
  title?: string;
}

// Function to create histogram data from array of numbers
const createHistogramData = (values: number[], bins: number = 10) => {
  if (!values || values.length === 0) return [];
  
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binWidth = (max - min) / bins;
  
  const histogramData = [];
  for (let i = 0; i < bins; i++) {
    const binStart = min + i * binWidth;
    const binEnd = min + (i + 1) * binWidth;
    const count = values.filter(val => val >= binStart && val < binEnd).length;
    
    histogramData.push({
      range: `${binStart.toFixed(1)}-${binEnd.toFixed(1)}`,
      frequency: count,
      binStart,
      binEnd
    });
  }
  
  return histogramData;
};

export const HistogramChart: React.FC<HistogramChartProps> = ({ 
  data = [5, 8, 3, 10, 12, 7, 9, 6, 11, 4, 8, 13, 7, 9, 5, 10, 8, 6, 12, 9], // Default mock data
  height = 300,
  title = "Error Distribution Histogram"
}) => {
  // Convert array of numbers to histogram data
  const histogramData = createHistogramData(data, 8); // 8 bins for better visualization

  if (!histogramData || histogramData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">Histogram data will appear here when available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={histogramData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <XAxis 
            dataKey="range" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis 
            label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={[0, 'dataMax + 1']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--card-foreground))'
            }}
            formatter={(value: number, name: string) => [
              `${value} occurrences`,
              'Frequency'
            ]}
            labelFormatter={(label: string) => `Range: ${label}`}
          />
          <Bar 
            dataKey="frequency" 
            fill="#3B82F6" 
            radius={[2, 2, 0, 0]}
            name="Frequency"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
