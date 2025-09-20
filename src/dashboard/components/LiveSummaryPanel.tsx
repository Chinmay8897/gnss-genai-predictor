import React from 'react';
import { SummaryPanel } from './SummaryPanel';
import { useAnalysisData } from '../hooks/useAnalysisData';
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Activity, RefreshCw, AlertCircle } from "lucide-react";

interface LiveSummaryPanelProps {
  className?: string;
}

export const LiveSummaryPanel: React.FC<LiveSummaryPanelProps> = ({ className = "" }) => {
  const { data, isLoading, error, lastUpdated } = useAnalysisData();

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <DashboardCard
          title="Summary of Analysis"
          description="Error loading analysis data"
          gradient
        >
          <div className="flex items-center justify-center p-8 text-center">
            <div className="space-y-3">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              <h3 className="text-lg font-semibold text-destructive">Data Loading Error</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Data Status Header */}
      <DashboardCard gradient>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Live Data Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Loading...'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isLoading && (
              <>
                <RefreshCw className="h-4 w-4 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground">Updating...</span>
              </>
            )}
            <Badge variant={isLoading ? "secondary" : "default"}>
              {isLoading ? "Updating" : "Live"}
            </Badge>
          </div>
        </div>
      </DashboardCard>

      {/* Summary Panel with Live Data */}
      <SummaryPanel
        histogramData={data.histogramData}
        scatterData={data.scatterData}
        className={className}
      />
    </div>
  );
};
