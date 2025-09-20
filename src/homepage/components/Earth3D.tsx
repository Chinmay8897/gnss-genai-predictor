import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import earthDayTexture from '/assets/earth-day-2k.jpg';
import earthNightTexture from '/assets/earth-night-4k.jpg';
import earthNormalMap from '/assets/earth-normal-map.jpg';

interface Earth3DProps {
  position?: [number, number, number];
  scale?: number;
}

const Earth3D: React.FC<Earth3DProps> = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load textures
  const [dayTexture, nightTexture, normalMap] = useLoader(TextureLoader, [
    earthDayTexture,
    earthNightTexture,
    earthNormalMap,
  ]);

  // Rotate the Earth slowly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Day side of Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 128, 64]} />
        <meshPhongMaterial
          map={dayTexture}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.4, 0.4)}
          shininess={100}
          transparent={false}
        />
      </mesh>
      
      {/* Night side with city lights - rendered with additive blending */}
      <mesh>
        <sphereGeometry args={[1.001, 128, 64]} />
        <meshBasicMaterial
          map={nightTexture}
          transparent={true}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial
          color="#4A90E2"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default Earth3D;
