import React, { useEffect } from 'react';

interface ChartDebuggerProps {
  componentName: string;
  data?: any;
}

export const ChartDebugger: React.FC<ChartDebuggerProps> = ({ componentName, data }) => {
  useEffect(() => {
    console.log(`[Chart Debug] ${componentName}:`, {
      dataLength: data?.length || 0,
      data: data,
      timestamp: new Date().toISOString()
    });
  }, [componentName, data]);

  return (
    <div className="text-xs text-muted-foreground p-2 bg-muted/20 rounded">
      Debug: {componentName} - Data points: {data?.length || 0}
    </div>
  );
};
