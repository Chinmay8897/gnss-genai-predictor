import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockSatellites } from '../data/mockSatellites';

const SystemOverview: React.FC = () => {
  // Calculate system metrics
  const activeSatellites = mockSatellites.length;
  const averageError = mockSatellites.reduce((sum, sat) => sum + sat.errorRate, 0) / activeSatellites;
  const maxError = Math.max(...mockSatellites.map(sat => sat.errorRate));
  
  const getSystemStatus = () => {
    if (maxError > 80) return { status: 'Critical', color: 'satellite-critical' };
    if (maxError > 50) return { status: 'Warning', color: 'satellite-warning' };
    return { status: 'Normal', color: 'satellite-stable' };
  };

  const systemStatus = getSystemStatus();

  const stableCount = mockSatellites.filter(sat => sat.errorRate < 20).length;
  const warningCount = mockSatellites.filter(sat => sat.errorRate >= 20 && sat.errorRate < 60).length;
  const criticalCount = mockSatellites.filter(sat => sat.errorRate >= 60).length;

  return (
    <Card className="glass-panel p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neon-cyan">System Overview</h2>
        <Badge 
          className={`${systemStatus.color === 'satellite-critical' ? 'satellite-critical' : 
                     systemStatus.color === 'satellite-warning' ? 'satellite-warning' : 
                     'satellite-stable'} px-3 py-1 rounded-full`}
        >
          {systemStatus.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-neon-cyan">{activeSatellites}</div>
          <div className="text-sm text-muted-foreground">Active Satellites</div>
        </div>
        
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-foreground">
            {averageError.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground">Average Error</div>
        </div>
        
        <div className="text-center space-y-2">
          <div className={`text-2xl font-bold ${systemStatus.color === 'satellite-critical' ? 'text-satellite-critical' : 
                          systemStatus.color === 'satellite-warning' ? 'text-satellite-warning' : 
                          'text-satellite-stable'}`}>
            {maxError.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground">Max Error</div>
        </div>

        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-neon-blue">
            {((stableCount / activeSatellites) * 100).toFixed(0)}%
          </div>
          <div className="text-sm text-muted-foreground">Healthy</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Satellite Status Distribution</h3>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-satellite-stable"></div>
            <span>Stable</span>
          </div>
          <span className="font-medium">{stableCount}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-satellite-warning"></div>
            <span>Warning</span>
          </div>
          <span className="font-medium">{warningCount}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-satellite-critical"></div>
            <span>Critical</span>
          </div>
          <span className="font-medium">{criticalCount}</span>
        </div>
      </div>
    </Card>
  );
};

export default SystemOverview;
