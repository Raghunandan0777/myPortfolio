/* ========================================
   Magnetic Button — Pulls toward cursor on hover
   GSAP-based smooth magnetic effect
   Supports primary and secondary variants
   ======================================== */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ 
  children, 
  variant = 'primary', 
  href, 
  onClick, 
  className = '',
  target,
  download,
  strength = 0.3,
  ...props 
}) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  const baseClass = `magnetic-btn magnetic-btn-${variant} ${className}`;

  if (href) {
    return (
      <a 
        ref={btnRef} 
        href={href} 
        className={baseClass} 
        target={target} 
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        download={download}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button ref={btnRef} onClick={onClick} className={baseClass} {...props}>
      {children}
    </button>
  );
};

export default MagneticButton;
