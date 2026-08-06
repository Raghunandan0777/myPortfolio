/* ========================================
   Process Section — How I Work (Discovery to Launch)
   Interactive 5-stage workflow cards with deliverables
   GSAP scroll animations & 100% mobile responsiveness
   ======================================== */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Layout, Code2, Zap, Rocket, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import processSteps from '../data/process';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Compass, Layout, Code2, Zap, Rocket,
};

const ProcessCard = ({ step, index }) => {
  const cardRef = useRef(null);
  const IconComponent = iconMap[step.icon] || Code2;

  return (
    <div
      ref={cardRef}
      className="process-card glass rounded-2xl p-6 md:p-8 card-hover group relative overflow-hidden flex flex-col justify-between"
    >
      {/* Background Hover Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none`} />

      <div>
        {/* Step Badge & Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
            <IconComponent size={22} />
          </div>
          <span className="font-mono text-3xl font-extrabold text-white/20 group-hover:text-primary-light/50 transition-colors">
            {step.step}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
          {step.title}
        </h3>
        <p className="text-accent text-xs font-mono mb-4">
          {step.subtitle}
        </p>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {step.description}
        </p>
      </div>

      {/* Deliverables Badges */}
      <div className="pt-4 border-t border-glass-border">
        <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
          <CheckCircle2 size={12} className="text-emerald-400" /> Deliverables:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {step.deliverables.map((item, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-glass-light text-text-secondary"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.process-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section-padding relative">
      <div className="section-container relative z-10">
        <SectionHeading
          label="Work Methodology"
          title="How I Work"
          subtitle="A battle-tested 5-stage development process ensuring high quality, transparency, and timely delivery."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {processSteps.map((step, index) => (
            <ProcessCard key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
