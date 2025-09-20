import React, { useState } from 'react';
import { SummaryPanel } from './SummaryPanel';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

export const SummaryPanelDemo: React.FC = () => {
  const [scenario, setScenario] = useState<'normal' | 'high-variability' | 'improving' | 'anomalies'>('normal');

  // Different data scenarios for demonstration
  const scenarios = {
    normal: {
      name: "Normal Distribution",
      description: "Typical satellite error patterns with moderate variability",
      histogramData: [4, 6, 5, 7, 6, 8, 5, 6, 7, 5, 6, 8, 4, 7, 6, 5, 7, 6, 8, 5, 6, 7, 5, 6, 8, 4, 7, 6, 5, 7],
      scatterData: Array.from({ length: 20 }, (_, i) => ({
        x: i + 1,
        y: 5 + Math.sin(i * 0.2) * 1.5 + (Math.random() - 0.5) * 2
      }))
    },
    'high-variability': {
      name: "High Variability",
      description: "Inconsistent error patterns with wide range",
      histogramData: [2, 12, 4, 15, 3, 18, 5, 11, 2, 16, 4, 13, 3, 17, 5, 10, 2, 14, 4, 12, 3, 16, 5, 11, 2, 15, 4, 13, 3, 17],
      scatterData: Array.from({ length: 20 }, (_, i) => ({
        x: i + 1,
        y: 8 + Math.sin(i * 0.5) * 6 + (Math.random() - 0.5) * 8
      }))
    },
    improving: {
      name: "Improving Trend",
      description: "Errors decreasing over time with good consistency",
      histogramData: [12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 11, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      scatterData: Array.from({ length: 20 }, (_, i) => ({
        x: i + 1,
        y: 12 - i * 0.4 + (Math.random() - 0.5) * 2
      }))
    },
    anomalies: {
      name: "With Anomalies",
      description: "Normal pattern with statistical outliers",
      histogramData: [4, 6, 5, 7, 6, 8, 5, 6, 7, 5, 6, 8, 4, 7, 6, 5, 7, 6, 8, 5, 6, 7, 5, 6, 8, 4, 7, 6, 5, 7],
      scatterData: Array.from({ length: 20 }, (_, i) => {
        const baseY = 5 + Math.sin(i * 0.2) * 1.5 + (Math.random() - 0.5) * 2;
        // Add anomalies at specific points
        if (i === 5 || i === 12 || i === 18) {
          return { x: i + 1, y: baseY + 8 + Math.random() * 4 }; // Anomaly
        }
        return { x: i + 1, y: baseY };
      })
    }
  };

  const currentScenario = scenarios[scenario];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Summary Panel Demo</span>
          </CardTitle>
          <CardDescription>
            Interactive demonstration of the Summary Panel with different data scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(scenarios).map(([key, data]) => (
                <Button
                  key={key}
                  variant={scenario === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScenario(key as any)}
                  className="flex items-center space-x-2"
                >
                  {key === 'normal' && <BarChart3 className="h-4 w-4" />}
                  {key === 'high-variability' && <AlertTriangle className="h-4 w-4" />}
                  {key === 'improving' && <TrendingUp className="h-4 w-4" />}
                  {key === 'anomalies' && <AlertTriangle className="h-4 w-4" />}
                  <span>{data.name}</span>
                </Button>
              ))}
            </div>
            
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">{currentScenario.name}</h4>
              <p className="text-sm text-muted-foreground">{currentScenario.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <SummaryPanel 
        histogramData={currentScenario.histogramData}
        scatterData={currentScenario.scatterData}
      />
    </div>
  );
};
