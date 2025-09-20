import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Earth3D from './Earth3D';
import Satellite3D, { SatelliteData } from './Satellite3D';
import { mockSatellites } from '../data/mockSatellites';

interface Space3DSceneProps {
  onSatelliteHover: (satellite: SatelliteData | null) => void;
}

const Space3DScene: React.FC<Space3DSceneProps> = ({ onSatelliteHover }) => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl">
      <Canvas
        camera={{
          position: [0, 1, 5],
          fov: 60,
        }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting setup for realistic Earth rendering */}
          <ambientLight intensity={0.2} color="#404080" />
          
          {/* Main sun light */}
          <directionalLight
            position={[10, 5, 5]}
            intensity={2.5}
            color="#FFF8DC"
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* Fill light for the dark side */}
          <pointLight 
            position={[-8, 2, -3]} 
            intensity={0.8} 
            color="#4A90E2" 
            distance={15}
            decay={2}
          />
          
          {/* Rim lighting */}
          <pointLight 
            position={[0, 8, 0]} 
            intensity={0.6} 
            color="#60A5FA" 
            distance={12}
          />

          {/* Stars background */}
          <Stars
            radius={300}
            depth={60}
            count={20000}
            factor={7}
            saturation={0}
            fade
            speed={0.5}
          />

          {/* Earth */}
          <Earth3D position={[0, -1, 0]} scale={1.2} />

          {/* Satellites */}
          {mockSatellites.map((satellite) => (
            <Satellite3D
              key={satellite.id}
              data={satellite}
              onHover={onSatelliteHover}
            />
          ))}

          {/* Camera controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.2}
            autoRotate={false}
            autoRotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-space-dark/30 rounded-xl" />
    </div>
  );
};

export default Space3DScene;
