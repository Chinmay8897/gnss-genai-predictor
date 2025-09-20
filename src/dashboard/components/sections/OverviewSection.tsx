import { motion } from "framer-motion";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Satellite, Clock, Target, Zap } from "lucide-react";

export function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-primary bg-clip-text text-transparent">
          GNSS Satellite Error Forecasting
        </h1>
        <p className="text-xl text-muted-foreground">
          Advanced AI/ML models for predicting satellite clock and ephemeris errors
        </p>
      </motion.div>

      {/* Problem Description */}
      <div className="grid md:grid-cols-2 gap-6">
        <DashboardCard
          title="The Challenge"
          description="GNSS satellite error prediction"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Satellite className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-card-foreground">
                  Multi-constellation GNSS
                </h3>
                <p className="text-sm text-muted-foreground">
                  GPS, GLONASS, Galileo, BeiDou satellites
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">Error Types</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Clock Errors</Badge>
                <Badge variant="outline">Ephemeris Errors</Badge>
                <Badge variant="outline">Orbital Drift</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">Satellite Types</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-chart-1/20 text-chart-1 border-chart-1">GEO</Badge>
                <Badge className="bg-chart-2/20 text-chart-2 border-chart-2">GSO</Badge>
                <Badge className="bg-chart-3/20 text-chart-3 border-chart-3">MEO</Badge>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="AI/ML Solution"
          description="Advanced forecasting models"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-accent" />
              <div>
                <h3 className="font-semibold text-card-foreground">
                  Prediction Horizons
                </h3>
                <p className="text-sm text-muted-foreground">
                  15 minutes to 24 hours ahead
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">Short-term</span>
                </div>
                <p className="text-xs text-muted-foreground">15min - 2h</p>
                <p className="text-xs text-success">High Accuracy</p>
              </div>
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-card-foreground">Long-term</span>
                </div>
                <p className="text-xs text-muted-foreground">2h - 24h</p>
                <p className="text-xs text-warning">Medium Accuracy</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-card-foreground">Model Ensemble</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">LSTM Networks</span>
                  <Badge variant="secondary">Time Series</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Transformers</span>
                  <Badge variant="secondary">Attention</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Gaussian Processes</span>
                  <Badge variant="secondary">Uncertainty</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">GANs</span>
                  <Badge variant="secondary">Synthetic</Badge>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard gradient>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">168</div>
            <div className="text-sm text-muted-foreground">Hours of Data</div>
            <div className="text-xs text-muted-foreground mt-1">7 days × 24 hours</div>
          </div>
        </DashboardCard>

        <DashboardCard gradient>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">672</div>
            <div className="text-sm text-muted-foreground">Data Points</div>
            <div className="text-xs text-muted-foreground mt-1">15-minute intervals</div>
          </div>
        </DashboardCard>

        <DashboardCard gradient>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">4</div>
            <div className="text-sm text-muted-foreground">ML Models</div>
            <div className="text-xs text-muted-foreground mt-1">Ensemble approach</div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
