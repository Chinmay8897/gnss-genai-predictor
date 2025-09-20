// Mock data for dashboard charts and visualizations

export interface PredictionDataPoint {
  timestamp: string;
  actualError: number;
  predictedError: number;
  confidence: number;
  satellite: string;
}

export interface ErrorDistributionData {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ModelPerformanceData {
  model: string;
  accuracy: number;
  mae: number;
  rmse: number;
  predictionHorizon: string;
}

export interface TimeSeriesData {
  time: string;
  value: number;
  type: 'actual' | 'predicted';
}

// Generate mock prediction data for the last 24 hours
export const generatePredictionData = (): PredictionDataPoint[] => {
  const data: PredictionDataPoint[] = [];
  const now = new Date();
  const satellites = ['G01', 'G02', 'G03', 'G04', 'G05'];
  
  for (let i = 0; i < 96; i++) { // 96 data points = 24 hours with 15-minute intervals
    const timestamp = new Date(now.getTime() - (95 - i) * 15 * 60 * 1000);
    const satellite = satellites[i % satellites.length];
    
    // Generate realistic error values
    const baseError = Math.random() * 10 + 2; // 2-12 ns base error
    const actualError = baseError + (Math.random() - 0.5) * 2; // Add some noise
    const predictedError = actualError + (Math.random() - 0.5) * 1.5; // Prediction with some error
    const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
    
    data.push({
      timestamp: timestamp.toISOString(),
      actualError: Math.round(actualError * 100) / 100,
      predictedError: Math.round(predictedError * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
      satellite
    });
  }
  
  return data;
};

// Error distribution data
export const errorDistributionData: ErrorDistributionData[] = [
  { category: 'Low Error (<5ns)', count: 68, percentage: 68, color: '#10B981' },
  { category: 'Medium Error (5-15ns)', count: 24, percentage: 24, color: '#F59E0B' },
  { category: 'High Error (>15ns)', count: 8, percentage: 8, color: '#EF4444' }
];

// Model performance data
export const modelPerformanceData: ModelPerformanceData[] = [
  { model: 'LSTM', accuracy: 94.2, mae: 1.8, rmse: 2.3, predictionHorizon: '15min-2h' },
  { model: 'Transformer', accuracy: 92.8, mae: 2.1, rmse: 2.7, predictionHorizon: '2h-24h' },
  { model: 'Gaussian Process', accuracy: 91.5, mae: 2.3, rmse: 2.9, predictionHorizon: '15min-1h' },
  { model: 'Ensemble', accuracy: 95.1, mae: 1.6, rmse: 2.0, predictionHorizon: '15min-24h' }
];

// Time series data for trend analysis
export const generateTimeSeriesData = (): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 48; i++) { // 48 data points = 12 hours with 15-minute intervals
    const time = new Date(now.getTime() - (47 - i) * 15 * 60 * 1000);
    const baseValue = 5 + Math.sin(i * 0.1) * 2; // Oscillating base value
    const actualValue = baseValue + (Math.random() - 0.5) * 1;
    const predictedValue = actualValue + (Math.random() - 0.5) * 0.8;
    
    data.push(
      { time: time.toISOString(), value: Math.round(actualValue * 100) / 100, type: 'actual' },
      { time: time.toISOString(), value: Math.round(predictedValue * 100) / 100, type: 'predicted' }
    );
  }
  
  return data;
};

// Satellite constellation performance data
export const constellationPerformanceData = [
  { constellation: 'GPS (MEO)', accuracy: 96.1, satellites: 12, color: '#3B82F6' },
  { constellation: 'GLONASS (MEO)', accuracy: 94.3, satellites: 8, color: '#10B981' },
  { constellation: 'Galileo (MEO)', accuracy: 93.7, satellites: 6, color: '#F59E0B' },
  { constellation: 'BeiDou (GEO/GSO)', accuracy: 91.2, satellites: 4, color: '#EF4444' }
];

// Prediction accuracy over time
export const accuracyOverTimeData = [
  { time: '00:00', accuracy: 94.2 },
  { time: '04:00', accuracy: 93.8 },
  { time: '08:00', accuracy: 95.1 },
  { time: '12:00', accuracy: 94.7 },
  { time: '16:00', accuracy: 94.9 },
  { time: '20:00', accuracy: 94.5 },
  { time: '24:00', accuracy: 94.3 }
];
