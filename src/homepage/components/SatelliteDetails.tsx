import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SatelliteData } from './Satellite3D';

interface SatelliteDetailsProps {
  satellite: SatelliteData | null;
}

const SatelliteDetails: React.FC<SatelliteDetailsProps> = ({ satellite }) => {
  if (!satellite) {
    return (
      <Card className="glass-panel p-6 h-80 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-4xl mb-3">🛰️</div>
          <p className="text-sm">Hover over a satellite to view details</p>
        </div>
      </Card>
    );
  }

  const getErrorColor = (rate: number) => {
    if (rate < 20) return 'text-satellite-stable';
    if (rate < 60) return 'text-satellite-warning';
    return 'text-satellite-critical';
  };

  const getStatusBadge = (rate: number) => {
    if (rate < 20) return { label: 'Stable', className: 'satellite-stable' };
    if (rate < 60) return { label: 'Warning', className: 'satellite-warning' };
    return { label: 'Critical', className: 'satellite-critical' };
  };

  const status = getStatusBadge(satellite.errorRate);

  return (
    <Card className="glass-panel p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neon-cyan">{satellite.name}</h3>
          <p className="text-sm text-muted-foreground">{satellite.id}</p>
        </div>
        <Badge className={`${status.className} px-3 py-1 rounded-full`}>
          {status.label}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Error Rate</span>
            <span className={`font-semibold ${getErrorColor(satellite.errorRate)}`}>
              {satellite.errorRate.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={satellite.errorRate} 
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Clock Drift</div>
              <div className="text-sm font-medium">{satellite.parameters.clockDrift}ms</div>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-1">Atmospheric Delay</div>
              <div className="text-sm font-medium">{satellite.parameters.atmosphericDelay}ns</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Noise Level</div>
              <div className="text-sm font-medium">{satellite.parameters.noise}dB</div>
            </div>
            
            <div>
              <div className="text-xs text-muted-foreground mb-1">Signal Strength</div>
              <div className="text-sm font-medium">{satellite.parameters.signalStrength}dBm</div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Error Timeline</h4>
          <div className="flex items-end space-x-1 h-16">
            {Array.from({ length: 12 }, (_, i) => {
              const height = Math.random() * satellite.errorRate + 10;
              const barColor = height < 20 ? 'bg-satellite-stable' : 
                              height < 60 ? 'bg-satellite-warning' : 
                              'bg-satellite-critical';
              return (
                <div
                  key={i}
                  className={`flex-1 ${barColor} rounded-t opacity-70`}
                  style={{ height: `${(height / 100) * 100}%` }}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>12h ago</span>
            <span>Now</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SatelliteDetails;
