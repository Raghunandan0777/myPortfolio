/* ========================================
   Timeline Section — Interactive Journey
   Vertical timeline with scroll-triggered animations
   Glowing dots, animated connector line
   ======================================== */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BookOpen, Layout, Layers, Brain, Rocket,
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import timeline from '../data/timeline';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  BookOpen, Layout, Layers, Brain, Rocket,
};

const TimelineItem = ({ item, index, isLast }) => {
  const itemRef = useRef(null);
  const IconComponent = iconMap[item.icon] || BookOpen;
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        {
          opacity: 0,
          x: isEven ? -60 : 60,
          y: 20,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={itemRef}
      className={`relative flex items-start gap-6 md:gap-0 mb-16 last:mb-0 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      style={{ opacity: 0 }}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} ml-10 md:ml-0`}>
        <div className="glass rounded-2xl p-6 card-hover group">
          {/* Phase badge */}
          <div className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary-light ${isEven ? 'md:ml-auto' : ''}`}>
            <IconComponent size={14} />
            {item.phase}
          </div>

          {/* Year */}
          <div className="font-display text-2xl font-bold text-gradient mb-2">
            {item.year}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold text-white mb-3">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tech Tags */}
          <div className={`flex flex-wrap gap-1.5 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            {item.techTags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-glass text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center dot — Desktop */}
      <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10">
        <div className="timeline-dot" />
      </div>

      {/* Left dot — Mobile */}
      <div className="md:hidden absolute left-[20px] top-6 -translate-x-1/2 z-10">
        <div className="timeline-dot" />
      </div>

      {/* Empty space for the other side on desktop */}
      <div className="hidden md:block flex-1" />
    </div>
  );
};

const Timeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  // Animate the timeline line on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          label="My Journey"
          title="The Path So Far"
          subtitle="From writing my first line of code to building AI-powered products."
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="timeline-line origin-top"
            style={{ scaleY: 0 }}
          />

          {/* Timeline Items */}
          {timeline.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
