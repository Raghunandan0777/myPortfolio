/* ========================================
   Projects Section — Featured Case Studies & Measurable Results
   Featured projects, problem solved & role highlights,
   Result metrics badges, Interactive Case Study modal
   ======================================== */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight, X, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import projects from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjectCard = ({ project, onOpenCaseStudy }) => {
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
            ★ Featured Case Study
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-sm text-primary font-medium">{project.category}</span>
            <span className="glass px-2.5 py-1 rounded-md text-xs font-mono text-accent">
              Role: {project.role}
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            {project.title}
          </h3>

          <p className="text-text-secondary leading-relaxed mb-4 text-sm md:text-base">
            {project.description}
          </p>

          {/* Problem Solved */}
          {project.problemSolved && (
            <div className="mb-4 p-3.5 rounded-xl bg-glass-light border border-glass-border">
              <div className="text-xs font-mono text-primary-light uppercase tracking-wider mb-1">Problem Solved</div>
              <p className="text-xs text-text-secondary leading-relaxed">{project.problemSolved}</p>
            </div>
          )}

          {/* Measurable Result Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-2 mb-6">
              {project.metrics.map((metric, i) => (
                <div key={i} className="glass p-2.5 rounded-xl text-center border border-primary/20">
                  <div className="text-base font-bold text-gradient">{metric.value}</div>
                  <div className="text-[10px] font-mono text-text-muted">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="glass px-2.5 py-1 rounded-lg text-xs font-medium text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
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
              GitHub
            </a>
            <button
              onClick={() => onOpenCaseStudy(project)}
              className="px-4 py-2.5 rounded-xl glass text-xs font-medium text-text-secondary hover:text-white hover:bg-glass-hover transition-colors flex items-center gap-1.5 ml-auto"
            >
              <FileText size={14} className="text-accent" />
              Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, onOpenCaseStudy }) => {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="project-card glass rounded-2xl overflow-hidden card-hover group flex flex-col justify-between"
    >
      <div>
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
              className="glass w-11 h-11 rounded-xl flex items-center justify-center text-white hover:bg-glass-hover transition-all duration-300 hover:scale-110"
              title="Live Demo"
            >
              <ExternalLink size={18} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass w-11 h-11 rounded-xl flex items-center justify-center text-white hover:bg-glass-hover transition-all duration-300 hover:scale-110"
              title="GitHub Repo"
            >
              <Github size={18} />
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

          {/* Role badge */}
          <div className="text-[11px] font-mono text-accent mb-3">
            Role: {project.role}
          </div>

          {/* Metrics summary */}
          {project.metrics && (
            <div className="flex items-center gap-2 mb-4">
              {project.metrics.slice(0, 2).map((m, i) => (
                <span key={i} className="glass px-2.5 py-1 rounded-lg text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
                  {m.label}: {m.value}
                </span>
              ))}
            </div>
          )}

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
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

      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <button
          onClick={() => onOpenCaseStudy(project)}
          className="w-full py-2 rounded-xl glass-light text-xs font-medium text-text-secondary hover:text-white hover:bg-glass-hover transition-colors flex items-center justify-center gap-1.5"
        >
          <FileText size={14} className="text-accent" />
          View Case Study & Results
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

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
          label="Featured Case Studies"
          title="Proven Results & Impact"
          subtitle="Real-world products delivering measurable performance, speed, and business outcomes."
        />

        {/* Featured Projects */}
        {featuredProjects.map((project) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            onOpenCaseStudy={setSelectedCaseStudy}
          />
        ))}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-8 mt-4">
              More Case Studies & Applications
            </h3>
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
            >
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenCaseStudy={setSelectedCaseStudy}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Interactive Case Study Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl glass-strong rounded-3xl p-6 md:p-8 border border-glass-border shadow-glass overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl glass flex items-center justify-center text-text-secondary hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-4">
              <span className="text-xs font-mono text-primary uppercase tracking-wider">Case Study • {selectedCaseStudy.category}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-1">
                {selectedCaseStudy.title}
              </h3>
              <div className="text-xs font-mono text-accent mt-1">
                My Role: {selectedCaseStudy.role}
              </div>
            </div>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
              <img
                src={selectedCaseStudy.image}
                alt={selectedCaseStudy.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Metrics Panel */}
            {selectedCaseStudy.metrics && (
              <div className="mb-6">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp size={14} /> Measurable Outcomes & Performance Metrics
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedCaseStudy.metrics.map((m, i) => (
                    <div key={i} className="glass p-3 rounded-xl text-center border border-emerald-500/20">
                      <div className="text-lg font-bold text-emerald-400">{m.value}</div>
                      <div className="text-[11px] font-mono text-text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">Project Overview</h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {selectedCaseStudy.description}
                </p>
              </div>

              {selectedCaseStudy.problemSolved && (
                <div className="p-4 rounded-xl glass-light border border-primary/20">
                  <h4 className="text-xs font-mono text-primary-light uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Problem Solved & Value Delivered
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {selectedCaseStudy.problemSolved}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCaseStudy.techStack.map((tech, i) => (
                    <span key={i} className="glass px-3 py-1 rounded-lg text-xs text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-glass-border">
              <a
                href={selectedCaseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn magnetic-btn-primary text-xs flex-1 justify-center"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
              <a
                href={selectedCaseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn magnetic-btn-secondary text-xs flex-1 justify-center"
              >
                <Github size={14} />
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
