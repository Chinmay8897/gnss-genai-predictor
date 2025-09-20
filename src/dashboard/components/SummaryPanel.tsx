import React from 'react';
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3, Target, Activity } from "lucide-react";

interface SummaryPanelProps {
  histogramData?: number[];
  scatterData?: Array<{x: number, y: number, label?: string}>;
  className?: string;
}

interface AnalysisResult {
  min: number;
  max: number;
  average: number;
  median: number;
  standardDeviation: number;
  trend: 'positive' | 'negative' | 'neutral';
  correlation: number;
  anomalies: Array<{x: number, y: number, reason: string}>;
  distribution: {
    low: number;    // < 3ns
    medium: number; // 3-7ns
    high: number;   // > 7ns
  };
}

// Function to calculate comprehensive statistics
const calculateAnalysis = (
  histogramData: number[] = [], 
  scatterData: Array<{x: number, y: number}> = []
): AnalysisResult => {
  // Histogram data analysis
  const sortedHistogram = [...histogramData].sort((a, b) => a - b);
  const min = Math.min(...histogramData);
  const max = Math.max(...histogramData);
  const average = histogramData.reduce((sum, val) => sum + val, 0) / histogramData.length;
  const median = sortedHistogram[Math.floor(sortedHistogram.length / 2)];
  
  // Standard deviation
  const variance = histogramData.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / histogramData.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Distribution analysis
  const distribution = {
    low: histogramData.filter(val => val < 3).length,
    medium: histogramData.filter(val => val >= 3 && val <= 7).length,
    high: histogramData.filter(val => val > 7).length
  };
  
  // Scatter plot analysis
  let trend: 'positive' | 'negative' | 'neutral' = 'neutral';
  let correlation = 0;
  let anomalies: Array<{x: number, y: number, reason: string}> = [];
  
  if (scatterData.length > 1) {
    // Calculate correlation coefficient
    const n = scatterData.length;
    const sumX = scatterData.reduce((sum, point) => sum + point.x, 0);
    const sumY = scatterData.reduce((sum, point) => sum + point.y, 0);
    const sumXY = scatterData.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumX2 = scatterData.reduce((sum, point) => sum + point.x * point.x, 0);
    const sumY2 = scatterData.reduce((sum, point) => sum + point.y * point.y, 0);
    
    correlation = (n * sumXY - sumX * sumY) / 
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    // Determine trend
    if (correlation > 0.3) trend = 'positive';
    else if (correlation < -0.3) trend = 'negative';
    else trend = 'neutral';
    
    // Detect anomalies (values more than 2 standard deviations from mean)
    const scatterYValues = scatterData.map(point => point.y);
    const scatterMean = scatterYValues.reduce((sum, val) => sum + val, 0) / scatterYValues.length;
    const scatterStdDev = Math.sqrt(
      scatterYValues.reduce((sum, val) => sum + Math.pow(val - scatterMean, 2), 0) / scatterYValues.length
    );
    
    scatterData.forEach(point => {
      if (Math.abs(point.y - scatterMean) > 2 * scatterStdDev) {
        anomalies.push({
          x: point.x,
          y: point.y,
          reason: `Error ${point.y.toFixed(1)}ns is ${((point.y - scatterMean) / scatterStdDev).toFixed(1)}σ from mean`
        });
      }
    });
  }
  
  return {
    min,
    max,
    average,
    median,
    standardDeviation,
    trend,
    correlation,
    anomalies,
    distribution
  };
};

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ 
  histogramData = [5, 8, 3, 10, 12, 7, 9, 6, 11, 4, 8, 13, 7, 9, 5, 10, 8, 6, 12, 9, 4, 7, 11, 8, 5, 9, 6, 10, 7, 8],
  scatterData = [],
  className = ""
}) => {
  // Generate scatter data if not provided
  const actualScatterData = scatterData.length > 0 ? scatterData : 
    Array.from({ length: 20 }, (_, i) => ({
      x: i + 1,
      y: 5 + Math.sin(i * 0.3) * 3 + (Math.random() - 0.5) * 4
    }));

  const analysis = calculateAnalysis(histogramData, actualScatterData);
  
  // Generate insights based on analysis
  const insights = [];
  
  // Basic statistics insights
  insights.push({
    icon: <BarChart3 className="h-4 w-4" />,
    text: `Error range: ${analysis.min.toFixed(1)}ns - ${analysis.max.toFixed(1)}ns (avg: ${analysis.average.toFixed(1)}ns)`,
    type: 'info' as const
  });
  
  // Distribution insights
  const total = analysis.distribution.low + analysis.distribution.medium + analysis.distribution.high;
  const lowPercent = ((analysis.distribution.low / total) * 100).toFixed(0);
  const mediumPercent = ((analysis.distribution.medium / total) * 100).toFixed(0);
  const highPercent = ((analysis.distribution.high / total) * 100).toFixed(0);
  
  insights.push({
    icon: <Target className="h-4 w-4" />,
    text: `Distribution: ${lowPercent}% low, ${mediumPercent}% medium, ${highPercent}% high errors`,
    type: 'info' as const
  });
  
  // Trend insights
  if (analysis.trend === 'positive') {
    insights.push({
      icon: <TrendingUp className="h-4 w-4" />,
      text: `Positive correlation detected (r=${analysis.correlation.toFixed(2)}) - errors tend to increase over time`,
      type: 'warning' as const
    });
  } else if (analysis.trend === 'negative') {
    insights.push({
      icon: <TrendingDown className="h-4 w-4" />,
      text: `Negative correlation detected (r=${analysis.correlation.toFixed(2)}) - errors tend to decrease over time`,
      type: 'success' as const
    });
  } else {
    insights.push({
      icon: <Activity className="h-4 w-4" />,
      text: `Weak correlation (r=${analysis.correlation.toFixed(2)}) - no clear time-based trend`,
      type: 'info' as const
    });
  }
  
  // Anomaly insights
  if (analysis.anomalies.length > 0) {
    insights.push({
      icon: <AlertTriangle className="h-4 w-4" />,
      text: `${analysis.anomalies.length} anomaly detected: ${analysis.anomalies[0].reason}`,
      type: 'error' as const
    });
  } else {
    insights.push({
      icon: <Target className="h-4 w-4" />,
      text: `No significant anomalies detected in the dataset`,
      type: 'success' as const
    });
  }
  
  // Variability insights
  const cv = (analysis.standardDeviation / analysis.average) * 100;
  if (cv > 30) {
    insights.push({
      icon: <AlertTriangle className="h-4 w-4" />,
      text: `High variability detected (CV: ${cv.toFixed(1)}%) - inconsistent error patterns`,
      type: 'warning' as const
    });
  } else {
    insights.push({
      icon: <Target className="h-4 w-4" />,
      text: `Moderate variability (CV: ${cv.toFixed(1)}%) - relatively consistent error patterns`,
      type: 'info' as const
    });
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <DashboardCard
        title="Summary of Analysis"
        description="Comprehensive insights derived from histogram and scatter plot data"
        gradient
        glow
      >
        <div className="space-y-6">
          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-primary">{analysis.min.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">Min (ns)</div>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-accent">{analysis.max.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">Max (ns)</div>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-success">{analysis.average.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">Average (ns)</div>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-warning">{analysis.standardDeviation.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">Std Dev (ns)</div>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Key Insights</span>
            </h4>
            <div className="space-y-2">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg">
                  <div className={`flex-shrink-0 mt-0.5 ${
                    insight.type === 'error' ? 'text-destructive' :
                    insight.type === 'warning' ? 'text-warning' :
                    insight.type === 'success' ? 'text-success' :
                    'text-primary'
                  }`}>
                    {insight.icon}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Summary */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              <span>Error Distribution Summary</span>
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
                <div className="text-lg font-bold text-success">{analysis.distribution.low}</div>
                <div className="text-xs text-muted-foreground">Low Errors</div>
                <div className="text-xs text-success">(&lt;3ns)</div>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="text-lg font-bold text-warning">{analysis.distribution.medium}</div>
                <div className="text-xs text-muted-foreground">Medium Errors</div>
                <div className="text-xs text-warning">(3-7ns)</div>
              </div>
              <div className="text-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <div className="text-lg font-bold text-destructive">{analysis.distribution.high}</div>
                <div className="text-xs text-muted-foreground">High Errors</div>
                <div className="text-xs text-destructive">(&gt;7ns)</div>
              </div>
            </div>
          </div>

          {/* Anomalies Detail */}
          {analysis.anomalies.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span>Detected Anomalies</span>
              </h4>
              <div className="space-y-2">
                {analysis.anomalies.map((anomaly, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex items-center space-x-3">
                      <Badge variant="destructive">Anomaly</Badge>
                      <span className="text-sm text-foreground">
                        Time: {anomaly.x}h, Error: {anomaly.y.toFixed(1)}ns
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{anomaly.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DashboardCard>
    </div>
  );
};
