import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import DetailedSatellite3D from './DetailedSatellite3D';

export interface SatelliteData {
  id: string;
  name: string;
  position: [number, number, number];
  errorRate: number; // 0-100
  parameters: {
    clockDrift: number;
    atmosphericDelay: number;
    noise: number;
    signalStrength: number;
  };
}

interface Satellite3DProps {
  data: SatelliteData;
  onHover: (satellite: SatelliteData | null) => void;
}

const Satellite3D: React.FC<Satellite3DProps> = ({ data, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Get color based on error rate
  const getSatelliteColor = () => {
    if (data.errorRate < 20) return '#10B981'; // Green - stable
    if (data.errorRate < 60) return '#F59E0B'; // Yellow - warning
    return '#EF4444'; // Red - critical
  };

  return (
    <group 
      position={data.position}
      onPointerEnter={() => {
        setHovered(true);
        onHover(data);
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      {/* Detailed satellite model */}
      <DetailedSatellite3D
        position={[0, 0, 0]}
        errorRate={data.errorRate}
        scale={0.8}
        hovered={hovered}
      />

      {/* Tooltip */}
      {hovered && (
        <Html position={[0, 0.2, 0]} center>
          <div className="glass-panel px-4 py-3 rounded-lg text-sm min-w-56 pointer-events-none shadow-lg">
            <div className="font-semibold text-neon-cyan mb-2 text-base">{data.name}</div>
            <div className="text-xs text-muted-foreground mb-2">{data.id}</div>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between">
                <span>Error Rate:</span>
                <span style={{ color: getSatelliteColor() }} className="font-medium">
                  {data.errorRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Clock Drift:</span>
                <span className="font-medium">{data.parameters.clockDrift}ms</span>
              </div>
              <div className="flex justify-between">
                <span>Atm. Delay:</span>
                <span className="font-medium">{data.parameters.atmosphericDelay}ns</span>
              </div>
              <div className="flex justify-between">
                <span>Noise Level:</span>
                <span className="font-medium">{data.parameters.noise}dB</span>
              </div>
              <div className="flex justify-between">
                <span>Signal:</span>
                <span className="font-medium">{data.parameters.signalStrength}dBm</span>
              </div>
              <div className="mt-2 pt-2 border-t border-border/20">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span 
                    style={{ color: getSatelliteColor() }} 
                    className="font-medium text-xs uppercase tracking-wide"
                  >
                    {data.errorRate < 20 ? 'STABLE' : data.errorRate < 60 ? 'WARNING' : 'CRITICAL'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Satellite3D;
