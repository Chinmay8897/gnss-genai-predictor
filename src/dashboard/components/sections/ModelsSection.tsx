import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, BarChart3 } from "lucide-react";
import { ModelPerformanceChart } from "../charts";

export function ModelsSection() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">ML Models</h1>
        <p className="text-lg text-muted-foreground">
          Advanced machine learning models for satellite error prediction
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <DashboardCard
          title="LSTM Networks"
          description="Long Short-Term Memory for time series prediction"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-card-foreground">Recurrent Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Captures temporal dependencies in satellite data
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Accuracy</span>
                <Badge className="bg-success/20 text-success border-success">94.2%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Prediction Horizon</span>
                <Badge variant="outline">15min - 2h</Badge>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Transformer Models"
          description="Attention-based architecture for complex patterns"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-accent" />
              <div>
                <h3 className="font-semibold text-card-foreground">Attention Mechanism</h3>
                <p className="text-sm text-muted-foreground">
                  Focuses on relevant temporal features
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Accuracy</span>
                <Badge className="bg-success/20 text-success border-success">92.8%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Prediction Horizon</span>
                <Badge variant="outline">2h - 24h</Badge>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Fixed: Added actual chart components with proper height and responsive design */}
      <DashboardCard
        title="Model Performance Comparison"
        description="Accuracy, MAE, and RMSE metrics across different ML models"
        gradient
      >
        <ModelPerformanceChart height={400} />
      </DashboardCard>
    </div>
  );
}
