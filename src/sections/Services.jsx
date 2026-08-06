/* ========================================
   Services Section — Glass Service Cards
   3x2 grid with icons, deliverables badges, hover glow
   GSAP staggered entrance & 100% Mobile Responsive
   ======================================== */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe, Brain, Layout, Code, BarChart3, Cog, CheckCircle2,
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import services from '../data/services';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Globe, Brain, Layout, Code, BarChart3, Cog,
};

const ServiceCard = ({ service, index }) => {
  const IconComponent = iconMap[service.icon] || Globe;

  return (
    <div className="service-card glass rounded-2xl p-6 md:p-8 card-hover group relative overflow-hidden flex flex-col justify-between">
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />

      <div>
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
          <IconComponent size={26} className="text-white" />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
          {service.title}
        </h3>

        {/* Value Prop */}
        {service.valueProp && (
          <div className="text-xs font-mono text-accent mb-3">
            {service.valueProp}
          </div>
        )}

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      {/* Deliverables */}
      {service.deliverables && (
        <div className="pt-4 border-t border-glass-border">
          <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-400" /> Key Deliverables:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {service.deliverables.map((item, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-glass-light text-text-secondary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-white/10" />
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
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
    <section id="services" ref={sectionRef} className="section-padding relative">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="What I Offer"
          title="Services & Solutions"
          subtitle="From architectural design to cloud deployment — end-to-end engineering solutions built for scale."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
