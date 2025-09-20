import React from 'react';
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Activity } from "lucide-react";

export const SimpleSummaryPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardCard
        title="Summary of Analysis"
        description="Basic analysis summary for testing"
        gradient
        glow
      >
        <div className="space-y-6">
          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-primary">3.2</div>
              <div className="text-xs text-muted-foreground">Min (ns)</div>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-accent">12.8</div>
              <div className="text-xs text-muted-foreground">Max (ns)</div>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-success">7.4</div>
              <div className="text-xs text-muted-foreground">Average (ns)</div>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-warning">2.1</div>
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
              <div className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg">
                <div className="flex-shrink-0 mt-0.5 text-primary">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  Error range: 3.2ns - 12.8ns (avg: 7.4ns)
                </p>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg">
                <div className="flex-shrink-0 mt-0.5 text-success">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  Distribution: 40% low, 35% medium, 25% high errors
                </p>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg">
                <div className="flex-shrink-0 mt-0.5 text-warning">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  Positive correlation detected (r=0.65) - errors tend to increase over time
                </p>
              </div>
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
                <div className="text-lg font-bold text-success">12</div>
                <div className="text-xs text-muted-foreground">Low Errors</div>
                <div className="text-xs text-success">(&lt;3ns)</div>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="text-lg font-bold text-warning">10</div>
                <div className="text-xs text-muted-foreground">Medium Errors</div>
                <div className="text-xs text-warning">(3-7ns)</div>
              </div>
              <div className="text-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <div className="text-lg font-bold text-destructive">8</div>
                <div className="text-xs text-muted-foreground">High Errors</div>
                <div className="text-xs text-destructive">(&gt;7ns)</div>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};
