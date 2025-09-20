import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface ErrorDistributionChartProps {
  data?: any[];
  height?: number;
}

// Generate mock error distribution data with actual vs predicted comparison
const generateErrorDistributionData = () => {
  return [
    {
      category: 'Low Error (<5ns)',
      actualCount: 68,
      predictedCount: 72,
      actualPercentage: 68,
      predictedPercentage: 72,
      color: '#10B981'
    },
    {
      category: 'Medium Error (5-15ns)',
      actualCount: 24,
      predictedCount: 22,
      actualPercentage: 24,
      predictedPercentage: 22,
      color: '#F59E0B'
    },
    {
      category: 'High Error (>15ns)',
      actualCount: 8,
      predictedCount: 6,
      actualPercentage: 8,
      predictedPercentage: 6,
      color: '#EF4444'
    }
  ];
};

export const ErrorDistributionChart: React.FC<ErrorDistributionChartProps> = ({
  data = generateErrorDistributionData(),
  height = 300
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">Error distribution data will appear here when available</p>
        </div>
      </div>
    );
  }

  const COLORS = data.map((item: any) => item.color);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-card-foreground mb-2">{data.category}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded mr-2"></span>
              Actual: <span className="font-medium text-blue-600">{data.actualCount} ({data.actualPercentage}%)</span>
            </p>
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-orange-400 rounded mr-2"></span>
              Predicted: <span className="font-medium text-orange-600">{data.predictedCount} ({data.predictedPercentage}%)</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">
              Difference: <span className="font-medium">{Math.abs(data.actualCount - data.predictedCount)} cases</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            labelLine={false}
            label={({ actualPercentage }: any) => `${actualPercentage}%`}
            outerRadius={60}
            fill="#8884d8"
            dataKey="actualCount"
            name="Actual Distribution"
          >
            {data.map((_entry: any, index: number) => (
              <Cell key={`actual-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            data={data}
            cx="70%"
            cy="50%"
            labelLine={false}
            label={({ predictedPercentage }: any) => `${predictedPercentage}%`}
            outerRadius={60}
            fill="#8884d8"
            dataKey="predictedCount"
            name="Predicted Distribution"
          >
            {data.map((_entry: any, index: number) => (
              <Cell key={`predicted-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.7} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
