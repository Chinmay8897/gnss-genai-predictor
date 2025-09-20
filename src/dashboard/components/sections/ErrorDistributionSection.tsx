import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { ErrorDistributionChart, TimeSeriesChart, HistogramChart, ScatterPlotChart, LiveSummaryPanel } from "../charts";
import { SimpleSummaryPanel } from "../SimpleSummaryPanel";

export function ErrorDistributionSection() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Error Distribution Analysis</h1>
        <p className="text-lg text-muted-foreground">
          Statistical analysis of prediction errors across different satellite types and time horizons
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <DashboardCard
          title="Error Categories"
          description="Distribution of prediction errors by severity"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-card-foreground">Low Error (&lt;5ns)</span>
              </div>
              <Badge className="bg-success/20 text-success border-success">68%</Badge>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div className="bg-success h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-card-foreground">Medium Error (5-15ns)</span>
              </div>
              <Badge className="bg-warning/20 text-warning border-warning">24%</Badge>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div className="bg-warning h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-card-foreground">High Error (&gt;15ns)</span>
              </div>
              <Badge className="bg-destructive/20 text-destructive border-destructive">8%</Badge>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div className="bg-destructive h-2 rounded-full" style={{ width: '8%' }}></div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Satellite Type Performance"
          description="Prediction accuracy by satellite constellation"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-card-foreground">GPS (MEO)</span>
                <Badge className="bg-chart-1/20 text-chart-1 border-chart-1">96.1%</Badge>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-chart-1 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-card-foreground">GLONASS (MEO)</span>
                <Badge className="bg-chart-2/20 text-chart-2 border-chart-2">94.3%</Badge>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-chart-2 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-card-foreground">Galileo (MEO)</span>
                <Badge className="bg-chart-3/20 text-chart-3 border-chart-3">93.7%</Badge>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-chart-3 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-card-foreground">BeiDou (GEO/GSO)</span>
                <Badge className="bg-chart-4/20 text-chart-4 border-chart-4">91.2%</Badge>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-chart-4 h-2 rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Fixed: Added histogram and scatterplot in responsive grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Error Magnitude Histogram"
          description="Frequency distribution analysis of satellite errors"
          gradient
        >
          <HistogramChart 
            height={350} 
            title="Error Magnitude Distribution"
            data={[2, 4, 6, 8, 3, 5, 7, 9, 4, 6, 8, 10, 3, 5, 7, 9, 2, 4, 6, 8, 5, 7, 9, 11, 4, 6, 8, 10, 3, 5]}
          />
        </DashboardCard>

        <DashboardCard
          title="Error Correlation Scatter Plot"
          description="Time vs error magnitude correlation analysis"
          gradient
        >
          <ScatterPlotChart 
            height={350} 
            title="Time vs Error Magnitude"
            xLabel="Time (hours)"
            yLabel="Error Magnitude (ns)"
          />
        </DashboardCard>
      </div>

      {/* Additional distribution charts */}
      <DashboardCard
        title="Error Distribution by Category"
        description="Distribution of prediction errors by severity category"
        gradient
      >
        <ErrorDistributionChart height={350} />
      </DashboardCard>

      <DashboardCard
        title="Error Trends Over Time"
        description="Temporal analysis of prediction accuracy and error patterns"
        gradient
      >
        <TimeSeriesChart height={400} />
      </DashboardCard>

      {/* Simple Summary Panel - Basic analysis for testing */}
      <SimpleSummaryPanel />
      
      {/* Live Summary Panel - Analysis of error distribution data with real-time updates */}
      <LiveSummaryPanel />
    </div>
  );
}
