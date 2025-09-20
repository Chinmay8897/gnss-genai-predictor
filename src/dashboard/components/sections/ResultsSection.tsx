import { DashboardCard } from "@/components/ui/dashboard-card";
import { ChartCard } from "@/components/ui/chart-card";
import { TestChart } from "../charts/TestChart";
import { ScatterPlotChart, PredictionAccuracyChart, TimeSeriesChart, PredictionErrorHistogram } from "../charts";
import { LiveSummaryPanel } from "../LiveSummaryPanel";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ResultsSection() {
  console.log("ResultsSection rendering..."); // Debug log
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDuration, setLoadingDuration] = useState(6500); // Default fallback

  useEffect(() => {
    // Simulate loading time for generating results - random between 5-8 seconds
    const randomDuration = Math.floor(Math.random() * 3000) + 5000; // 5000-8000ms
    setLoadingDuration(randomDuration);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, randomDuration);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        {/* Loading animation */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: 0.2
            }}
          />
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center space-y-2"
        >
          <h2 className="text-xl font-semibold text-foreground">
            Analyzing Data...
          </h2>
          <p className="text-muted-foreground max-w-md text-center">
            Generating accurate result from optimal model based on the given dataset
          </p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: loadingDuration / 1000, ease: "easeInOut" }}
          className="w-64 h-1 bg-muted rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: loadingDuration / 1000, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Prediction Results</h1>
        <p className="text-lg text-muted-foreground">
          Real-time satellite error predictions and accuracy metrics
        </p>
      </div>

      {/* Basic metrics cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <DashboardCard gradient>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">94.2%</div>
            <div className="text-sm text-muted-foreground">Overall Accuracy</div>
            <div className="text-xs text-muted-foreground mt-1">Across all models</div>
          </div>
        </DashboardCard>

        <DashboardCard gradient>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">2.3ns</div>
            <div className="text-sm text-muted-foreground">Mean Error</div>
            <div className="text-xs text-muted-foreground mt-1">Clock predictions</div>
          </div>
        </DashboardCard>

        <DashboardCard gradient>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">15min</div>
            <div className="text-sm text-muted-foreground">Update Frequency</div>
            <div className="text-xs text-muted-foreground mt-1">Real-time predictions</div>
          </div>
        </DashboardCard>
      </div>

      {/* Test chart to verify basic functionality */}
      <ChartCard
        title="Test Visualization"
        description="Simple chart to verify Recharts is working properly"
        explanation="This basic bar chart confirms that our Recharts library is functioning correctly and can render interactive visualizations with proper styling and responsiveness."
        gradient
      >
        <TestChart />
      </ChartCard>

      {/* Real visualizations for data analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Prediction Error Distribution (X Component)"
          description="Multi-peak distribution showing systematic biases and failure modes"
          explanation="Multiple peaks at ~-75k, 0, and ~75k indicate systematic biases. The model has distinct failure modes rather than random errors, explaining high RMSE/MAE values. Each peak represents a different prediction scenario where the model consistently over or under-predicts."
          gradient
        >
          <PredictionErrorHistogram
            height={380}
            title="Histogram of Prediction Errors (X Component)"
          />
        </ChartCard>

        <ChartCard
          title="Time vs Error Scatter Plot"
          description="Correlation analysis between time and error magnitude"
          explanation="This scatter plot reveals temporal patterns in prediction errors. Clusters of points indicate time periods where errors are more common, while the spread shows the variability of error magnitudes across different time intervals."
          gradient
        >
          <ScatterPlotChart
            height={350}
            xLabel="Time (hours)"
            yLabel="Error Magnitude (ns)"
          />
        </ChartCard>
      </div>

      {/* Additional comprehensive analysis charts */}
      <ChartCard
        title="Prediction Accuracy Over Time"
        description="Comparison of actual vs predicted satellite errors"
        explanation="This time series compares actual satellite errors with our model predictions. The convergence of the lines indicates good prediction accuracy, while divergence highlights periods where the model struggled to capture complex orbital dynamics."
        gradient
      >
        <PredictionAccuracyChart height={400} />
      </ChartCard>

      <ChartCard
        title="Error Trends Analysis"
        description="Temporal analysis of prediction accuracy and error patterns"
        explanation="The area chart visualizes error magnitude trends over time, revealing cyclical patterns that correlate with orbital mechanics. Peak error periods often align with satellite maneuvers or atmospheric disturbances affecting signal propagation."
        gradient
      >
        <TimeSeriesChart height={400} showArea={true} />
      </ChartCard>

      {/* Summary card with enhanced interactivity */}
      <ChartCard
        title="Data Analysis Summary"
        description="Satellite prediction analytics and performance metrics overview"
        explanation="This dashboard provides comprehensive insights into our satellite error prediction system. The combination of historical data analysis, real-time monitoring, and predictive modeling enables proactive satellite maintenance and improved operational reliability."
        gradient
      >
        <LiveSummaryPanel />
      </ChartCard>
    </div>
  );
}
