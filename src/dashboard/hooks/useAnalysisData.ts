import { useState, useEffect } from 'react';

interface AnalysisData {
  histogramData: number[];
  scatterData: Array<{x: number, y: number, label?: string}>;
  lastUpdated: Date;
}

interface UseAnalysisDataReturn {
  data: AnalysisData;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date;
  updateData: (newHistogramData: number[], newScatterData: Array<{x: number, y: number, label?: string}>) => void;
}

// Mock data generator for demonstration
const generateMockHistogramData = (): number[] => {
  return Array.from({ length: 30 }, () => {
    // Generate realistic error values with some distribution
    const base = 5 + Math.random() * 8; // 5-13 range
    const variation = (Math.random() - 0.5) * 4; // ±2 variation
    return Math.max(0, base + variation);
  });
};

const generateMockScatterData = (): Array<{x: number, y: number, label: string}> => {
  return Array.from({ length: 20 }, (_, i) => {
    const x = i + 1;
    const baseY = 5 + Math.sin(i * 0.3) * 3;
    const y = baseY + (Math.random() - 0.5) * 4;
    return {
      x,
      y: Math.max(0, y),
      label: `Time: ${x}h, Error: ${y.toFixed(1)}ns`
    };
  });
};

export const useAnalysisData = (): UseAnalysisDataReturn => {
  const [data, setData] = useState<AnalysisData>({
    histogramData: generateMockHistogramData(),
    scatterData: generateMockScatterData(),
    lastUpdated: new Date()
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate data updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        setData({
          histogramData: generateMockHistogramData(),
          scatterData: generateMockScatterData(),
          lastUpdated: new Date()
        });
        setIsLoading(false);
        setError(null);
      }, 1000);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const updateData = (newHistogramData: number[], newScatterData: Array<{x: number, y: number, label?: string}>) => {
    setIsLoading(true);
    setError(null);

    try {
      setData({
        histogramData: newHistogramData,
        scatterData: newScatterData,
        lastUpdated: new Date()
      });
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update data');
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    lastUpdated: data.lastUpdated,
    updateData
  };
};
