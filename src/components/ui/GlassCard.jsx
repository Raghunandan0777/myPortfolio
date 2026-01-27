/* ========================================
   GlassCard Component
   Glassmorphism card with 3D tilt effect on hover
   Perfect for project cards and content blocks
   ======================================== */
import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * GlassCard Component
 * A reusable card with glassmorphism styling and 3D tilt effect
 * 
 * @param {ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hover3D - Enable 3D tilt effect on hover
 * @param {boolean} glowOnHover - Enable glow effect on hover
 * @param {function} onClick - Optional click handler
 */
const GlassCard = ({ 
  children, 
  className = '', 
  hover3D = true,
  glowOnHover = true,
  onClick,
  as = 'div',
  ...props 
}) => {
  // State for tracking mouse position for 3D effect
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  /**
   * Handle mouse movement for 3D tilt calculation
   * Calculates rotation based on mouse position relative to card center
   */
  const handleMouseMove = (e) => {
    if (!hover3D) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation (max 10 degrees)
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  /**
   * Reset rotation when mouse leaves
   */
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Base glassmorphism styles
  const glassStyles = `
    relative overflow-hidden
    bg-white/5 backdrop-blur-xl
    border border-white/10
    rounded-2xl
    transition-all duration-300 ease-out
    ${glowOnHover ? 'hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const Component = motion[as] || motion.div;

  return (
    <Component
      className={glassStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: hover3D 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` 
          : undefined,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border glow on hover */}
      {glowOnHover && (
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(6, 182, 212, 0.1))',
          }}
        />
      )}
    </Component>
  );
};

export default GlassCard;
