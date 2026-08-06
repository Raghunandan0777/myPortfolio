/* ========================================
   Section Heading — Reusable section header
   Label badge + large heading + subtitle
   GSAP scroll-triggered reveal
   ======================================== */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionHeading = ({ label, title, subtitle, align = 'center', className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const children = el.children;

    gsap.fromTo(
      children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  const alignClass = align === 'left' ? 'text-left' : 'text-center';

  return (
    <div ref={containerRef} className={`mb-16 md:mb-20 ${alignClass} ${className}`}>
      {/* Label badge */}
      {label && (
        <div className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary-light ${align === 'center' ? 'mx-auto' : ''}`}>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          {label}
        </div>
      )}

      {/* Main heading */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed" style={align === 'center' ? { margin: '1rem auto 0' } : {}}>
          {subtitle}
        </p>
      )}

      {/* Accent line */}
      <div
        className={`mt-6 h-px w-16 bg-gradient-to-r from-primary to-accent ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};

export default SectionHeading;
