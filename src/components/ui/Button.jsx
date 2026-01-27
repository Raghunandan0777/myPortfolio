/* ========================================
   Button Component
   Reusable button with glow effects and variants
   Supports primary, secondary, and outline styles
   ======================================== */
import { motion } from 'framer-motion';

/**
 * Button variants configuration
 * Each variant has its own styling for different use cases
 */
const variants = {
  primary: `
    bg-gradient-to-r from-purple-600 to-blue-500 
    text-white font-semibold
    shadow-lg shadow-purple-500/25
    hover:shadow-purple-500/40 hover:shadow-xl
    hover:scale-105
  `,
  secondary: `
    bg-dark-600 text-white font-semibold
    border border-dark-500
    hover:bg-dark-500 hover:border-neon-purple/50
    hover:shadow-lg hover:shadow-purple-500/10
  `,
  outline: `
    bg-transparent text-neon-purple font-semibold
    border border-neon-purple/50
    hover:bg-neon-purple/10 hover:border-neon-purple
    hover:shadow-lg hover:shadow-purple-500/20
  `,
  ghost: `
    bg-transparent text-gray-300 font-medium
    hover:text-white hover:bg-white/5
  `,
};

/**
 * Size variants for the button
 */
const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

/**
 * Button Component with Framer Motion animations
 * @param {string} variant - Button style variant (primary, secondary, outline, ghost)
 * @param {string} size - Button size (sm, md, lg)
 * @param {ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler
 * @param {string} href - Optional link URL (renders as anchor)
 * @param {boolean} external - If true, opens link in new tab
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '',
  onClick,
  href,
  external = false,
  disabled = false,
  icon,
  ...props 
}) => {
  // Base classes applied to all buttons
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `;

  // Motion animation properties
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  };

  // If href is provided, render as anchor tag
  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={baseClasses}
        {...motionProps}
        {...props}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  // Render as button
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...motionProps}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
