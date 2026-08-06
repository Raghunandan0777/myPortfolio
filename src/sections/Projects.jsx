/* ========================================
   Projects Section — Premium Project Showcase
   Featured project (larger), regular project cards
   Hover animations, tech badges, live demo + GitHub
   ======================================== */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import projects from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass rounded-2xl overflow-hidden card-hover group mb-8 md:mb-12"
      style={{ opacity: 0 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Screenshot */}
        <div className="relative overflow-hidden aspect-video lg:aspect-auto">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured badge */}
          <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-lg text-xs font-semibold text-primary-light">
            ★ Featured Project
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <div className="mb-2 text-sm text-primary font-medium">{project.category}</div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            {project.title}
          </h3>
          <p className="text-text-secondary leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="glass px-3 py-1 rounded-lg text-xs font-medium text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn magnetic-btn-primary text-sm"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn magnetic-btn-secondary text-sm"
            >
              <Github size={16} />
              Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="project-card glass rounded-2xl overflow-hidden card-hover group"
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Hover overlay with links */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass w-12 h-12 rounded-xl flex items-center justify-center text-white hover:bg-glass-hover transition-all duration-300 hover:scale-110"
          >
            <ExternalLink size={20} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass w-12 h-12 rounded-xl flex items-center justify-center text-white hover:bg-glass-hover transition-all duration-300 hover:scale-110"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-xs text-primary font-medium">{project.category}</span>
            <h3 className="font-display text-lg font-bold text-white mt-1">
              {project.title}
            </h3>
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-white transition-colors mt-1"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-glass text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-glass text-text-muted">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
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

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          label="Portfolio"
          title="Featured Projects"
          subtitle="A curated selection of projects that showcase my skills and problem-solving approach."
        />

        {/* Featured Projects */}
        {featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.id} project={project} />
        ))}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-8 mt-4">
              More Projects
            </h3>
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
            >
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
