import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface PredictionErrorHistogramProps {
  height?: number;
  title?: string;
}

// Generate realistic prediction error data with multiple peaks as described
const generatePredictionErrorData = () => {
  const data = [];
  const binSize = 25000; // 25k bin size for good granularity
  const minError = -250000;
  const maxError = 250000;

  // Create bins
  for (let error = minError; error <= maxError; error += binSize) {
    let actualFrequency = 0;
    let predictedFrequency = 0;

    // Create multiple peaks for actual data
    // Peak around -75,000 (systematic underprediction)
    if (error >= -100000 && error <= -50000) {
      actualFrequency = 2.8 - Math.abs(error + 75000) / 50000 * 2.5;
    }
    // Peak around 0 (correct predictions)
    else if (error >= -25000 && error <= 25000) {
      actualFrequency = 2.5 - Math.abs(error) / 25000 * 2.2;
    }
    // Peak around 75,000 (systematic overprediction)
    else if (error >= 50000 && error <= 100000) {
      actualFrequency = 2.6 - Math.abs(error - 75000) / 50000 * 2.3;
    }
    // Smaller peaks and noise
    else if (error >= -200000 && error <= -150000) {
      actualFrequency = 0.8 + Math.random() * 0.4;
    }
    else if (error >= 150000 && error <= 200000) {
      actualFrequency = 0.7 + Math.random() * 0.3;
    }
    // Background noise
    else {
      actualFrequency = Math.random() * 0.5;
    }

    // Generate predicted data with some variation from actual
    // Predicted data should be more centered (better performance)
    if (error >= -50000 && error <= 50000) {
      predictedFrequency = 2.9 - Math.abs(error) / 50000 * 2.6; // Higher peak at center
    }
    else if (error >= -100000 && error <= -50000) {
      predictedFrequency = actualFrequency * 0.7; // Reduced error in negative range
    }
    else if (error >= 50000 && error <= 100000) {
      predictedFrequency = actualFrequency * 0.6; // Reduced error in positive range
    }
    else {
      predictedFrequency = actualFrequency * 0.4; // Much less noise
    }

    // Ensure frequency is within 0-3 range and add some randomness
    actualFrequency = Math.max(0, Math.min(3.0, actualFrequency + (Math.random() - 0.5) * 0.2));
    predictedFrequency = Math.max(0, Math.min(3.0, predictedFrequency + (Math.random() - 0.5) * 0.15));

    data.push({
      error: error,
      actualFrequency: Math.round(actualFrequency * 100) / 100,
      predictedFrequency: Math.round(predictedFrequency * 100) / 100,
      binLabel: `${(error / 1000).toFixed(0)}k to ${((error + binSize) / 1000).toFixed(0)}k`
    });
  }

  return data;
};

// Custom tooltip to show error range and frequency for both datasets
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">
          Error Range: {data.binLabel}
        </p>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-red-500 rounded mr-2"></span>
            Actual: <span className="text-red-600 font-medium">{data.actualFrequency}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded mr-2"></span>
            Predicted: <span className="text-blue-600 font-medium">{data.predictedFrequency}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Difference: {Math.abs(data.actualFrequency - data.predictedFrequency).toFixed(2)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const PredictionErrorHistogram: React.FC<PredictionErrorHistogramProps> = ({
  height = 400,
  title = "Histogram of Prediction Errors (X Component)"
}) => {
  const data = generatePredictionErrorData();

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Distribution shows multiple peaks indicating systematic biases and failure modes
        </p>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--muted-foreground))"
            opacity={0.3}
          />
          <XAxis
            dataKey="error"
            type="number"
            scale="linear"
            domain={[-250000, 250000]}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            label={{
              value: 'Prediction Error (Predicted - True)',
              position: 'insideBottom',
              offset: -10,
              style: { textAnchor: 'middle', fontSize: '12px', fill: 'hsl(var(--muted-foreground))' }
            }}
          />
          <YAxis
            domain={[0, 3.0]}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            label={{
              value: 'Frequency',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: '12px', fill: 'hsl(var(--muted-foreground))' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />
          <Bar
            dataKey="actualFrequency"
            name="Actual Data"
            fill="#87CEEB"
            stroke="#5DADE2"
            strokeWidth={1}
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="predictedFrequency"
            name="Predicted Data"
            fill="#FFB347"
            stroke="#FF8C00"
            strokeWidth={1}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};