import React, { useState } from 'react';
import Space3DScene from './Space3DScene';
import SystemOverview from './SystemOverview';
import SatelliteDetails from './SatelliteDetails';
import { SatelliteData } from './Satellite3D';

const SatelliteDashboard: React.FC = () => {
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteData | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-deep via-space-dark to-space-surface star-field p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
            3D Satellite Dashboard
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time monitoring of GPS satellite constellation with advanced 3D visualization and error tracking
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* 3D Scene - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-2/3 glass-panel rounded-xl p-1 neon-glow">
              <Space3DScene onSatelliteHover={setSelectedSatellite} />
            </div>
            
            {/* System Overview Panel */}
            <div className="h-1/3">
              <SystemOverview />
            </div>
          </div>

          {/* Right Sidebar - Details Panel */}
          <div className="lg:col-span-1">
            <SatelliteDetails satellite={selectedSatellite} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center py-4">
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-satellite-stable"></div>
              <span>Stable (&lt;20% error)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-satellite-warning"></div>
              <span>Warning (20-60% error)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-satellite-critical"></div>
              <span>Critical (&gt;60% error)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteDashboard;
