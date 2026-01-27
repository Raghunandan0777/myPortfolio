/* ========================================
   FloatingElements Component
   3D floating geometric shapes with parallax effects
   Creates depth and visual interest in background
   ======================================== */
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

/**
 * Animated floating shape component
 * Each shape floats and rotates independently
 */
const FloatingShape = ({ 
  position, 
  color, 
  geometry = 'icosahedron',
  scale = 1,
  speed = 1,
  distort = 0.3,
}) => {
  const meshRef = useRef();

  // Rotate shape over time
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  // Render different geometries based on prop
  const renderGeometry = () => {
    switch (geometry) {
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />;
      case 'icosahedron':
      default:
        return <icosahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

/**
 * Glowing particle component
 * Adds sparkle effects to the scene
 */
const GlowingParticle = ({ position, color, size = 0.05 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.5 + 0.5;
      meshRef.current.scale.setScalar(size * (0.8 + pulse * 0.4));
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

/**
 * FloatingElements Component
 * Renders multiple floating 3D shapes and particles
 */
const FloatingElements = ({ density = 'normal' }) => {
  // Shape configurations based on density
  const shapes = density === 'high' ? [
    { position: [-3, 2, -2], color: '#a855f7', geometry: 'icosahedron', scale: 0.4, speed: 0.8 },
    { position: [3, -1, -3], color: '#06b6d4', geometry: 'octahedron', scale: 0.5, speed: 1 },
    { position: [-2, -2, -2], color: '#ec4899', geometry: 'dodecahedron', scale: 0.35, speed: 1.2 },
    { position: [2, 2, -4], color: '#3b82f6', geometry: 'torus', scale: 0.3, speed: 0.6 },
    { position: [0, 3, -3], color: '#10b981', geometry: 'icosahedron', scale: 0.25, speed: 1.1 },
    { position: [-4, 0, -3], color: '#f59e0b', geometry: 'octahedron', scale: 0.4, speed: 0.9 },
  ] : [
    { position: [-3, 2, -2], color: '#a855f7', geometry: 'icosahedron', scale: 0.4, speed: 0.8 },
    { position: [3, -1, -3], color: '#06b6d4', geometry: 'octahedron', scale: 0.5, speed: 1 },
    { position: [-2, -2, -2], color: '#ec4899', geometry: 'dodecahedron', scale: 0.35, speed: 1.2 },
  ];

  // Particle positions
  const particles = [
    { position: [-1, 1, -1], color: '#a855f7', size: 0.03 },
    { position: [1.5, 0.5, -1.5], color: '#06b6d4', size: 0.04 },
    { position: [-0.5, -1, -1], color: '#ec4899', size: 0.025 },
    { position: [2, 1.5, -2], color: '#3b82f6', size: 0.035 },
    { position: [-2, -0.5, -1.5], color: '#10b981', size: 0.03 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#a855f7" />
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#06b6d4" />

        {/* Floating shapes */}
        {shapes.map((shape, index) => (
          <FloatingShape key={`shape-${index}`} {...shape} />
        ))}

        {/* Glowing particles */}
        {particles.map((particle, index) => (
          <GlowingParticle key={`particle-${index}`} {...particle} />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingElements;
