/* ========================================
   SectionTitle Component
   Animated section headers with gradient text
   Used for consistent section styling throughout
   ======================================== */
import { motion } from 'framer-motion';

/**
 * SectionTitle Component
 * Displays a section heading with optional subtitle and gradient effects
 * 
 * @param {string} title - Main heading text
 * @param {string} subtitle - Optional subtitle/description
 * @param {string} align - Text alignment (left, center, right)
 * @param {boolean} gradient - Enable gradient text effect
 * @param {string} className - Additional CSS classes
 */
const SectionTitle = ({ 
  title, 
  subtitle,
  align = 'center',
  gradient = true,
  className = '',
}) => {
  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Text alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div
      className={`mb-12 md:mb-16 ${alignClasses[align]} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Main Title */}
      <motion.h2 
        variants={itemVariants}
        className={`
          text-3xl md:text-4xl lg:text-5xl font-bold font-display
          ${gradient 
            ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-200% animate-gradient-shift' 
            : 'text-white'
          }
        `}
      >
        {title}
      </motion.h2>
      
      {/* Decorative line */}
      <motion.div
        variants={itemVariants}
        className={`
          h-1 w-20 mt-4 rounded-full
          bg-gradient-to-r from-purple-500 to-cyan-500
          ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}
        `}
      />
      
      {/* Subtitle */}
      {subtitle && (
        <motion.p 
          variants={itemVariants}
          className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
