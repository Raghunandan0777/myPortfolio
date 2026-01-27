/* ========================================
   SkillSpheres Component
   3D rotating spheres for skills visualization
   Interactive hover effects with skill labels
   ======================================== */
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Individual skill sphere with hover interaction
 */
const SkillSphere = ({ 
  position, 
  color, 
  name, 
  level,
  index 
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animate rotation and hover state
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + index * 0.5;
      
      // Scale animation on hover
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group position={position}>
        {/* Main sphere */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Skill name label */}
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Medium.woff"
        >
          {name}
        </Text>

        {/* Level indicator (shows on hover) */}
        {hovered && (
          <Text
            position={[0, 0, 0.5]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {level}%
          </Text>
        )}

        {/* Glow ring on hover */}
        {hovered && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.55, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

/**
 * Orbit ring decoration
 */
const OrbitRing = ({ radius, color, speed = 1 }) => {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed * 0.1;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius, 64]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/**
 * Main SkillSpheres Component
 * Displays skills as 3D spheres in a circular arrangement
 */
const SkillSpheres = ({ skills = [] }) => {
  // Generate positions in a circular pattern
  const sphereCount = skills.length;
  const radius = 2;

  const sphereData = skills.map((skill, index) => {
    const angle = (index / sphereCount) * Math.PI * 2;
    return {
      ...skill,
      position: [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.5, // Slight vertical variation
        Math.sin(angle) * radius,
      ],
      index,
    };
  });

  // Color palette for spheres
  const colors = ['#a855f7', '#06b6d4', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, 5, 5]} intensity={0.4} color="#a855f7" />
        <pointLight position={[0, -5, 5]} intensity={0.3} color="#06b6d4" />

        {/* Orbit rings */}
        <OrbitRing radius={radius} color="#a855f7" speed={0.5} />
        <OrbitRing radius={radius * 0.7} color="#06b6d4" speed={-0.3} />

        {/* Skill spheres */}
        {sphereData.map((sphere, index) => (
          <SkillSphere
            key={sphere.name}
            position={sphere.position}
            color={colors[index % colors.length]}
            name={sphere.name}
            level={sphere.level}
            index={index}
          />
        ))}

        {/* Center decoration */}
        <Sphere args={[0.15, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#a855f7"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default SkillSpheres;
