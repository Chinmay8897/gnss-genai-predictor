import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ScatterPlotChartProps {
  data?: Array<{
    x: number;
    actualY: number;
    predictedY: number;
    label?: string;
  }>;
  height?: number;
  xLabel?: string;
  yLabel?: string;
}

// Generate mock scatter plot data for time vs error magnitude with actual vs predicted
const generateScatterData = (): Array<{
  x: number;
  actualY: number;
  predictedY: number;
  label: string;
}> => {
  const data = [];
  for (let i = 1; i <= 20; i++) {
    // Simulate time progression with some error variation
    const time = i;
    const baseError = 5 + Math.sin(i * 0.3) * 3; // Oscillating base error
    const actualError = baseError + (Math.random() - 0.5) * 4; // Add random variation for actual
    const predictedError = baseError + (Math.random() - 0.5) * 2; // Less variation for predicted

    data.push({
      x: time,
      actualY: Math.round(actualError * 100) / 100,
      predictedY: Math.round(predictedError * 100) / 100,
      label: `Time: ${time}h`
    });
  }
  return data;
};

// Color function based on error magnitude
const getPointColor = (value: number, isActual: boolean = true) => {
  if (value < 3) return isActual ? '#10B981' : '#34D399'; // Green variants
  if (value < 7) return isActual ? '#F59E0B' : '#FBBF24'; // Yellow variants
  return isActual ? '#EF4444' : '#F87171'; // Red variants
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-card-foreground mb-2">{`Time: ${data.x}h`}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded mr-2"></span>
            Actual Error: <span className="font-medium text-blue-600">{data.actualY}ns</span>
          </p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 bg-orange-400 rounded mr-2"></span>
            Predicted Error: <span className="font-medium text-orange-600">{data.predictedY}ns</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">
            Difference: <span className="font-medium">{Math.abs(data.actualY - data.predictedY).toFixed(2)}ns</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const ScatterPlotChart: React.FC<ScatterPlotChartProps> = ({
  data = generateScatterData(), // Default mock data
  height = 300,
  xLabel = "Time (hours)",
  yLabel = "Error Magnitude (ns)"
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">Scatter plot data will appear here when available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            label={{ value: xLabel, position: 'insideBottom', offset: -10 }}
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
          />
          <YAxis
            type="number"
            dataKey="actualY"
            name={yLabel}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Scatter
            dataKey="actualY"
            name="Actual Data"
            fill="#3B82F6"
            r={6}
          >
            {data.map((entry, index) => (
              <Cell key={`actual-${index}`} fill={getPointColor(entry.actualY, true)} />
            ))}
          </Scatter>
          <Scatter
            dataKey="predictedY"
            name="Predicted Data"
            fill="#FFB347"
            r={5}
            shape="diamond"
          >
            {data.map((entry, index) => (
              <Cell key={`predicted-${index}`} fill={getPointColor(entry.predictedY, false)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
