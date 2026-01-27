/* ========================================
   Experience Section Component
   Vertical animated timeline with scroll effects
   Shows work history and education
   ======================================== */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '../data/experience';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';

/**
 * Timeline item component
 * Individual entry in the timeline with animations
 */
const TimelineItem = ({ item, index, isLast }) => {
  const ref = useRef(null);
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  // Determine if work or education
  const isWork = item.type === 'work';

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={`relative flex gap-6 md:gap-10 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline line and dot */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`
            relative z-10 w-4 h-4 rounded-full
            ${isWork 
              ? 'bg-gradient-to-r from-purple-500 to-cyan-500' 
              : 'bg-gradient-to-r from-pink-500 to-orange-500'
            }
            shadow-lg shadow-purple-500/30
          `}
        >
          {/* Pulse ring */}
          <div className={`
            absolute inset-0 rounded-full animate-ping
            ${isWork ? 'bg-purple-500/30' : 'bg-pink-500/30'}
          `} />
        </motion.div>

        {/* Line */}
        {!isLast && (
          <div className="flex-1 w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent" />
        )}
      </div>

      {/* Content card */}
      <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <GlassCard className="p-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-purple-400 font-medium">{item.organization}</p>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">
                  {item.startDate} - {item.endDate}
                </div>
                {item.current && (
                  <span className="inline-block px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full mt-1">
                    Current
                  </span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {item.location}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {item.description.replace(/\s+/g, ' ').trim()}
            </p>

            {/* Highlights */}
            {item.highlights && (
              <ul className="space-y-2 mb-4">
                {item.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-purple-400 mt-1">▹</span>
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            )}

            {/* Tech stack */}
            {item.techStack && (
              <div className="flex flex-wrap gap-2">
                {item.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="
                      px-2 py-1 text-xs font-medium
                      bg-white/5 text-gray-400
                      rounded border border-white/10
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

/**
 * Experience Section Component
 */
const Experience = () => {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="section-container relative">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey"
        />

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto space-y-12">
          {experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
