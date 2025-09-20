import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export function DemoSection() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Live Demo</h1>
        <p className="text-lg text-muted-foreground">
          Interactive demonstration of satellite error prediction in real-time
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <DashboardCard
          title="Prediction Controls"
          description="Control the live prediction demo"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="flex space-x-3">
              <Button className="flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Start Demo</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Pause className="h-4 w-4" />
                <span>Pause</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </Button>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-card-foreground">Demo Settings</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Prediction Horizon</span>
                  <span className="text-sm font-medium">15 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Update Frequency</span>
                  <span className="text-sm font-medium">Real-time</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Satellite Filter</span>
                  <span className="text-sm font-medium">All Constellations</span>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Live Status"
          description="Current prediction system status"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">System Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-success">Online</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">Active Models</span>
              <span className="text-sm text-muted-foreground">4/4</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">Last Update</span>
              <span className="text-sm text-muted-foreground">2 seconds ago</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">Prediction Accuracy</span>
              <span className="text-sm text-success font-medium">94.2%</span>
            </div>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard
        title="Live Prediction Visualization"
        description="Real-time satellite error predictions and actual measurements"
        gradient
      >
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">Start the Demo</h3>
          <p className="text-muted-foreground mb-4">
            Click the "Start Demo" button to begin the live prediction visualization
          </p>
          <Button size="lg" className="flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Launch Interactive Demo</span>
          </Button>
        </div>
      </DashboardCard>
    </div>
  );
}
