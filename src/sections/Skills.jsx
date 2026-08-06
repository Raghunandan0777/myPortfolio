/* ========================================
   Skills Section — Interactive Glowing Skill Cards
   Responsive grid of skill cards with hover glow
   GSAP scroll-triggered stagger entrance
   ======================================== */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Atom, Globe, Server, Zap, Database, FileCode,
  Palette, Cloud, Container, GitBranch, Brain,
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import skills from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

// Map icon names to Lucide components
const iconMap = {
  Atom, Globe, Server, Zap, Database, FileCode,
  Palette, Cloud, Container, GitBranch, Brain,
};

const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);

  // Mouse position tracking for radial glow
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const IconComponent = iconMap[skill.icon] || Atom;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="skill-card glass rounded-2xl p-6 card-hover cursor-default group relative"
      style={{ opacity: 0 }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
        style={{
          backgroundColor: `${skill.color}15`,
          boxShadow: `0 0 0px ${skill.color}00`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 30px ${skill.color}40`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0px ${skill.color}00`;
        }}
      >
        <IconComponent size={24} style={{ color: skill.color }} />
      </div>

      {/* Name */}
      <h3 className="font-display font-semibold text-lg text-white mb-1">
        {skill.name}
      </h3>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed">
        {skill.description}
      </p>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${skill.color}30, 0 0 20px ${skill.color}10`,
        }}
      />
    </div>
  );
};

const categories = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Databases' },
  { id: 'devops', label: 'DevOps & Cloud' },
  { id: 'ai', label: 'AI Integrations' },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: {
              each: 0.08,
              from: 'start',
            },
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
  }, [activeCategory]);

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Tech Stack"
          title="Skills & Technologies"
          subtitle="The tools and technologies I use to bring ideas to life."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-glow-sm scale-105'
                  : 'glass text-text-secondary hover:text-white hover:bg-glass-hover'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
