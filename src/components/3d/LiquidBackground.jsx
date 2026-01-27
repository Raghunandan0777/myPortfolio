/* ========================================
   LiquidBackground Component
   3D animated background with ENHANCED liquid/water motion
   Uses React Three Fiber and custom GLSL shaders
   ======================================== */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Enhanced Water/Liquid Shader Material
 * Creates realistic flowing water-like animations with ripples and waves
 */
const WaterShaderMaterial = () => {
  const meshRef = useRef();
  
  // Enhanced GLSL Vertex Shader - Adds wave displacement
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Multiple wave layers for realistic water movement
      vec3 pos = position;
      float wave1 = sin(pos.x * 2.0 + uTime * 0.8) * 0.15;
      float wave2 = cos(pos.y * 3.0 + uTime * 0.6) * 0.12;
      float wave3 = sin((pos.x + pos.y) * 1.5 + uTime) * 0.1;
      pos.z += wave1 + wave2 + wave3;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Enhanced GLSL Fragment Shader - Liquid water effect with colors and ripples
  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    
    // Simplex noise for organic liquid movement
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      // Create multiple layers of flowing noise for liquid effect
      float time = uTime * 0.3;
      
      // Large slow-moving waves
      float noise1 = snoise(vec3(vUv * 2.0, time * 0.5));
      // Medium ripples
      float noise2 = snoise(vec3(vUv * 4.0 + 50.0, time * 0.8));
      // Small detail waves
      float noise3 = snoise(vec3(vUv * 6.0 + 100.0, time * 1.2));
      // Very fine detail
      float noise4 = snoise(vec3(vUv * 8.0 + 150.0, time * 1.5));
      
      // Combine noises with different weights for depth
      float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.15 + noise4 * 0.05;
      
      // Create flowing color gradients
      vec3 color = mix(uColor1, uColor2, smoothstep(-0.6, 0.6, noise1));
      color = mix(color, uColor3, smoothstep(-0.3, 0.5, noise2) * 0.6);
      color = mix(color, uColor4, smoothstep(0.2, 0.8, noise3) * 0.4);
      
      // Add bright highlights for liquid sheen
      float highlight = smoothstep(0.4, 0.9, combinedNoise);
      color += highlight * vec3(0.3, 0.4, 0.5);
      
      // Add glow/caustic-like effect
      float glow = pow(smoothstep(0.3, 1.0, abs(noise2)), 2.0) * 0.5;
      color += glow * uColor3;
      
      // Create ripple/wave patterns
      float ripple = sin(vUv.x * 20.0 + time * 2.0 + noise1 * 5.0) * 0.5 + 0.5;
      ripple *= sin(vUv.y * 15.0 + time * 1.5 + noise2 * 4.0) * 0.5 + 0.5;
      color += ripple * 0.08 * uColor4;
      
      // Smooth alpha for blending with edges
      float alpha = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
      alpha *= smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
      alpha *= 0.85; // Higher opacity for more visible effect
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Enhanced color palette for water/liquid effect
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#0a0a20') },   // Deep dark blue
    uColor2: { value: new THREE.Color('#1a1040') },   // Purple-blue
    uColor3: { value: new THREE.Color('#3b2080') },   // Bright purple
    uColor4: { value: new THREE.Color('#00a0ff') },   // Cyan highlight
  }), []);

  // Animate shader uniforms
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[5, 5, 1]} position={[0, 0, -1]}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

/**
 * Animated liquid blob/bubble component
 * Floats around with organic movement
 */
const LiquidBlob = ({ position, color, scale = 1, speed = 1 }) => {
  const meshRef = useRef();
  const initialPos = useRef(position);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed;
      // Organic floating motion
      meshRef.current.position.x = initialPos.current[0] + Math.sin(t * 0.5) * 0.3;
      meshRef.current.position.y = initialPos.current[1] + Math.cos(t * 0.4) * 0.2;
      meshRef.current.position.z = initialPos.current[2] + Math.sin(t * 0.3) * 0.1;
      
      // Pulsing scale
      const pulse = 1 + Math.sin(t) * 0.1;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.4}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

/**
 * Floating water droplet/particle
 */
const WaterDroplet = ({ position, delay = 0 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime + delay;
      // Rising animation
      meshRef.current.position.y = position[1] + ((t * 0.3) % 3) - 1.5;
      meshRef.current.position.x = position[0] + Math.sin(t * 2) * 0.1;
      // Fade based on position
      meshRef.current.material.opacity = 0.6 - Math.abs(meshRef.current.position.y) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={0.03}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
    </mesh>
  );
};

/**
 * Main LiquidBackground Component
 * Renders the full 3D liquid water effect canvas
 */
const LiquidBackground = () => {
  // Generate random droplet positions
  const droplets = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      position: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3, Math.random() * -1],
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 70 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        
        {/* Colored point lights for water glow */}
        <pointLight position={[3, 2, 2]} intensity={0.8} color="#a855f7" />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#06b6d4" />
        <pointLight position={[0, 3, 1]} intensity={0.4} color="#3b82f6" />
        
        {/* Main water shader background */}
        <WaterShaderMaterial />
        
        {/* Floating liquid blobs */}
        <LiquidBlob position={[-2, 1, 0.5]} color="#a855f7" scale={0.4} speed={0.8} />
        <LiquidBlob position={[2, -0.5, 0.3]} color="#06b6d4" scale={0.5} speed={1.2} />
        <LiquidBlob position={[-1, -1, 0.2]} color="#3b82f6" scale={0.35} speed={1} />
        <LiquidBlob position={[1.5, 1.5, 0.4]} color="#ec4899" scale={0.3} speed={0.9} />
        <LiquidBlob position={[0, 0.5, 0.6]} color="#8b5cf6" scale={0.25} speed={1.1} />
        
        {/* Water droplets/particles */}
        {droplets.map((droplet, i) => (
          <WaterDroplet key={i} position={droplet.position} delay={droplet.delay} />
        ))}
      </Canvas>
      
      {/* Gradient overlay for depth and text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 via-transparent to-dark-900/80" />
      
      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </div>
  );
};

export default LiquidBackground;
