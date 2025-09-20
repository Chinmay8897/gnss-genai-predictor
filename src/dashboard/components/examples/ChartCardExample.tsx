import { ChartCard } from '@/components/ui/chart-card';
import { PredictionErrorHistogram } from '@/dashboard/components/charts';

/**
 * Example usage of the ChartCard component with PredictionErrorHistogram
 *
 * This demonstrates how to wrap any chart component with the reusable ChartCard
 * to get hover effects, typing animations, and consistent styling.
 */

export function ChartCardExample() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold mb-4">ChartCard Component Examples</h2>

      {/* Single chart example */}
      <ChartCard
        title="Prediction Error Distribution (X Component)"
        description="Multi-peak distribution showing systematic biases and failure modes"
        explanation="Multiple peaks at ~-75k, 0, and ~75k indicate systematic biases. The model has distinct failure modes rather than random errors, explaining high RMSE/MAE values. Each peak represents a different prediction scenario where the model consistently over or under-predicts."
        gradient={true}
        glow={true}
        className="max-w-4xl" // Optional custom styling
      >
        <PredictionErrorHistogram
          height={400}
          title="Histogram of Prediction Errors (X Component)"
        />
      </ChartCard>

      {/* Grid layout example */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Sample Chart A"
          description="First chart in grid layout"
          explanation="This is the explanation for the first chart. It will type out character by character when the user hovers over the card or when it comes into view."
          gradient={true}
        >
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Your Chart Component Here</p>
          </div>
        </ChartCard>

        <ChartCard
          title="Sample Chart B"
          description="Second chart in grid layout"
          explanation="This is the explanation for the second chart. The typing effect creates an engaging user experience similar to AI chat responses."
          gradient={true}
          glow={true}
        >
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Your Chart Component Here</p>
          </div>
        </ChartCard>
      </div>

      {/* Custom height example */}
      <ChartCard
        title="Custom Height Chart"
        description="Chart with custom height specification"
        explanation="You can control the height of the ChartCard container to ensure consistent sizing across your dashboard, especially useful for complex chart layouts."
        gradient={true}
        glow={true}
        height={500} // Custom height in pixels
      >
        <div className="h-full bg-muted/20 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Chart with Custom Height</p>
        </div>
      </ChartCard>
    </div>
  );
}

/**
 * ChartCard Props Interface:
 *
 * @param title - Main title displayed in the card header
 * @param description - Subtitle/description shown below the title
 * @param explanation - Text that types out with animation effect
 * @param children - The chart component or any React node to display
 * @param className - Optional custom CSS classes
 * @param gradient - Whether to apply gradient background (default: true)
 * @param glow - Whether to show glow effect on hover (default: false)
 * @param height - Optional fixed height in pixels
 */

// Usage patterns:

// 1. Basic usage:
// <ChartCard title="Chart Title" description="Chart description" explanation="Analysis text">
//   <YourChartComponent />
// </ChartCard>

// 2. With all props:
// <ChartCard
//   title="Advanced Chart"
//   description="Detailed chart description"
//   explanation="Comprehensive analysis explanation that will type out"
//   gradient={true}
//   glow={true}
//   height={400}
//   className="custom-class"
// >
//   <YourChartComponent />
// </ChartCard>

// 3. In responsive grid:
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//   <ChartCard {...props1}><Chart1 /></ChartCard>
//   <ChartCard {...props2}><Chart2 /></ChartCard>
// </div>