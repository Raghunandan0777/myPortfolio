/* ========================================
   Text Reveal — GSAP-powered text animation
   Splits text into words/chars with staggered reveals
   Supports multiple animation modes
   ======================================== */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger = 0.03,
  mode = 'words', // 'words', 'chars', 'lines'
  trigger = true, // use scroll trigger
  animation = 'slideUp', // 'slideUp', 'fadeIn', 'clipReveal'
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = el.textContent;
    el.innerHTML = '';

    let elements;
    if (mode === 'chars') {
      elements = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        el.appendChild(span);
        return span;
      });
    } else {
      // words mode
      elements = text.split(' ').map((word, i, arr) => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.verticalAlign = 'top';

        const inner = document.createElement('span');
        inner.textContent = word;
        inner.style.display = 'inline-block';
        wrapper.appendChild(inner);

        el.appendChild(wrapper);
        if (i < arr.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          el.appendChild(space);
        }
        return inner;
      });
    }

    // Animation config based on mode
    let animConfig;
    switch (animation) {
      case 'slideUp':
        animConfig = { y: '110%', opacity: 0 };
        break;
      case 'fadeIn':
        animConfig = { opacity: 0, y: 20 };
        break;
      case 'clipReveal':
        animConfig = { y: '100%', rotateX: 45 };
        break;
      default:
        animConfig = { y: '110%', opacity: 0 };
    }

    gsap.set(elements, animConfig);

    const animTo = {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger,
      delay,
    };

    if (trigger) {
      gsap.to(elements, {
        ...animTo,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    } else {
      gsap.to(elements, animTo);
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, delay, stagger, mode, trigger, animation]);

  return (
    <Tag ref={containerRef} className={className} {...props}>
      {children}
    </Tag>
  );
};

export default TextReveal;
