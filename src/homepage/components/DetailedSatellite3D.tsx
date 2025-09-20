import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DetailedSatellite3DProps {
  position: [number, number, number];
  errorRate: number;
  scale?: number;
  hovered?: boolean;
}

const DetailedSatellite3D: React.FC<DetailedSatellite3DProps> = ({ 
  position, 
  errorRate, 
  scale = 1,
  hovered = false 
}) => {
  const satelliteRef = useRef<THREE.Group>(null);
  const solarPanelLeftRef = useRef<THREE.Mesh>(null);
  const solarPanelRightRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Get color based on error rate
  const getSatelliteColor = () => {
    if (errorRate < 20) return '#10B981'; // Green - stable
    if (errorRate < 60) return '#F59E0B'; // Yellow - warning
    return '#EF4444'; // Red - critical
  };

  // Create materials
  const materials = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({
      color: '#E5E7EB',
      metalness: 0.8,
      roughness: 0.3,
      emissive: getSatelliteColor(),
      emissiveIntensity: 0.2,
    }),
    solarPanel: new THREE.MeshStandardMaterial({
      color: '#1E293B',
      metalness: 0.9,
      roughness: 0.1,
      emissive: '#1E40AF',
      emissiveIntensity: 0.1,
    }),
    antenna: new THREE.MeshStandardMaterial({
      color: '#6B7280',
      metalness: 0.7,
      roughness: 0.2,
    }),
    dish: new THREE.MeshStandardMaterial({
      color: '#F3F4F6',
      metalness: 0.6,
      roughness: 0.4,
    }),
    radiator: new THREE.MeshStandardMaterial({
      color: '#374151',
      metalness: 0.5,
      roughness: 0.6,
    }),
  }), [errorRate]);

  // Animation
  useFrame((state, delta) => {
    if (satelliteRef.current) {
      // Gentle floating animation
      satelliteRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      
      // Slow rotation
      satelliteRef.current.rotation.y += delta * 0.2;
    }

    // Solar panel tracking (simulate sun tracking)
    if (solarPanelLeftRef.current && solarPanelRightRef.current) {
      const sunAngle = state.clock.elapsedTime * 0.1;
      solarPanelLeftRef.current.rotation.z = Math.sin(sunAngle) * 0.2;
      solarPanelRightRef.current.rotation.z = Math.sin(sunAngle) * 0.2;
    }

    // Glow pulsing for high error rates
    if (glowRef.current && errorRate > 60) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group 
      ref={satelliteRef} 
      position={[position[0], position[1], position[2]]} 
      scale={hovered ? scale * 1.3 : scale}
    >
      {/* Main satellite body (bus) */}
      <mesh>
        <boxGeometry args={[0.15, 0.12, 0.18]} />
        <primitive object={materials.body} />
      </mesh>

      {/* Solar panels */}
      <mesh ref={solarPanelLeftRef} position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.06, 0.25, 0.01]} />
        <primitive object={materials.solarPanel} />
      </mesh>
      <mesh ref={solarPanelRightRef} position={[0.2, 0, 0]}>
        <boxGeometry args={[0.06, 0.25, 0.01]} />
        <primitive object={materials.solarPanel} />
      </mesh>

      {/* Solar panel support structures */}
      <mesh position={[-0.12, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.08]} />
        <primitive object={materials.antenna} />
      </mesh>
      <mesh position={[0.12, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.08]} />
        <primitive object={materials.antenna} />
      </mesh>

      {/* Main communication dish */}
      <mesh position={[0, 0.08, 0.05]} rotation={[Math.PI / 6, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.015, 24]} />
        <primitive object={materials.dish} />
      </mesh>

      {/* Dish support */}
      <mesh position={[0, 0.065, 0.03]}>
        <cylinderGeometry args={[0.005, 0.005, 0.03]} />
        <primitive object={materials.antenna} />
      </mesh>

      {/* High-gain antenna */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.05]} />
        <primitive object={materials.antenna} />
      </mesh>

      {/* Omnidirectional antennas */}
      <mesh position={[-0.04, 0.08, 0.08]}>
        <cylinderGeometry args={[0.002, 0.002, 0.03]} />
        <primitive object={materials.antenna} />
      </mesh>
      <mesh position={[0.04, 0.08, 0.08]}>
        <cylinderGeometry args={[0.002, 0.002, 0.03]} />
        <primitive object={materials.antenna} />
      </mesh>
      <mesh position={[0, 0.08, -0.08]}>
        <cylinderGeometry args={[0.002, 0.002, 0.025]} />
        <primitive object={materials.antenna} />
      </mesh>

      {/* Thermal radiators */}
      <mesh position={[0, -0.08, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.005]} />
        <primitive object={materials.radiator} />
      </mesh>
      <mesh position={[0, -0.08, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.005]} />
        <primitive object={materials.radiator} />
      </mesh>

      {/* Thruster modules */}
      <mesh position={[-0.06, -0.04, -0.1]}>
        <cylinderGeometry args={[0.01, 0.008, 0.02]} />
        <primitive object={materials.antenna} />
      </mesh>
      <mesh position={[0.06, -0.04, -0.1]}>
        <cylinderGeometry args={[0.01, 0.008, 0.02]} />
        <primitive object={materials.antenna} />
      </mesh>

      {/* Equipment modules on body */}
      <mesh position={[0.05, 0.02, 0.09]}>
        <boxGeometry args={[0.03, 0.04, 0.02]} />
        <primitive object={materials.antenna} />
      </mesh>
      <mesh position={[-0.05, 0.02, 0.09]}>
        <boxGeometry args={[0.03, 0.04, 0.02]} />
        <primitive object={materials.antenna} />
      </mesh>

      {/* Status glow effect */}
      <mesh ref={glowRef} scale={0.8}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color={getSatelliteColor()}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Error indicator lights */}
      {errorRate > 60 && (
        <>
          <mesh position={[0.08, 0.03, 0.09]}>
            <sphereGeometry args={[0.005, 8, 8]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
          <mesh position={[-0.08, 0.03, 0.09]}>
            <sphereGeometry args={[0.005, 8, 8]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
        </>
      )}
    </group>
  );
};

export default DetailedSatellite3D;
