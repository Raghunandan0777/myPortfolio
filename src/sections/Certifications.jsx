/* ========================================
   Certifications Section — Premium Certification Cards
   Glass cards, glowing hover effects, skills badges
   ======================================== */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Brain, Cloud, Code, CheckCircle, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import certifications from '../data/certifications';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Award, Brain, Cloud, Code,
};

const CertificationCard = ({ cert, index }) => {
  const IconComponent = iconMap[cert.icon] || Award;

  return (
    <div className="cert-card glass rounded-2xl p-6 md:p-8 card-hover group relative overflow-hidden">
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="w-12 h-12 rounded-xl glass-light flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-300">
          <IconComponent size={24} />
        </div>
        <span className="glass px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 flex items-center gap-1">
          <CheckCircle size={12} />
          {cert.badge}
        </span>
      </div>

      {/* Title & Issuer */}
      <div className="relative z-10 mb-4">
        <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-primary-light transition-colors">
          {cert.title}
        </h3>
        <p className="text-text-secondary text-sm font-medium">
          {cert.issuer} • <span className="text-accent">{cert.date}</span>
        </p>
      </div>

      {/* Skills Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
        {cert.skills.map((skill, i) => (
          <span
            key={i}
            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-glass-light text-text-muted"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Credential ID */}
      <div className="text-[11px] font-mono text-text-muted pt-3 border-t border-glass-border flex items-center justify-between relative z-10">
        <span>ID: {cert.credentialId}</span>
        <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          Verified <ExternalLink size={10} />
        </span>
      </div>
    </div>
  );
};

const Certifications = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.cert-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
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
    <section id="certifications" ref={sectionRef} className="section-padding relative">
      <div className="section-container relative z-10">
        <SectionHeading
          label="Credentials"
          title="Certifications & Honors"
          subtitle="Validated technical expertise in full-stack engineering, AI integrations, and cloud infrastructure."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
