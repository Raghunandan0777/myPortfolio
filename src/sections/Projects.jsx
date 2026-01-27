/* ========================================
   Projects Section Component
   Dynamic project cards with 3D hover effects
   Filterable by category with smooth transitions
   ======================================== */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, getCategories } from '../data/projects';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

/**
 * Project Card Component
 * Displays individual project with 3D tilt effect
 */
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard
        className="group h-full overflow-hidden"
        hover3D={true}
        glowOnHover={true}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Image / Placeholder */}
        <div className="relative h-48 overflow-hidden">
          {/* Actual project image or gradient fallback */}
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-transform duration-500
                ${isHovered ? 'scale-110' : 'scale-100'}
              `}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          ) : null}
          {/* Gradient fallback (shows if no image or image fails to load) */}
          <div 
            className={`
              absolute inset-0 
              bg-gradient-to-br from-purple-600/30 via-cyan-600/30 to-pink-600/30
              transition-transform duration-500
              ${isHovered ? 'scale-110' : 'scale-100'}
              ${project.image ? 'hidden' : 'block'}
            `}
          />
          
          {/* Project number badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm font-mono text-purple-300">
            #{String(project.id).padStart(2, '0')}
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-purple-300 border border-purple-500/30">
            {project.category}
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-yellow-300 border border-yellow-500/30">
              <span>⭐</span> Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="
                  px-2 py-1 text-xs font-medium
                  bg-white/5 text-gray-300
                  rounded-md border border-white/10
                "
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 flex items-center justify-center gap-2
                py-2.5 rounded-lg
                bg-gradient-to-r from-purple-500/20 to-cyan-500/20
                border border-purple-500/30
                text-sm font-medium text-white
                hover:from-purple-500/30 hover:to-cyan-500/30
                transition-all duration-300
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-2
                px-4 py-2.5 rounded-lg
                bg-white/5 border border-white/10
                text-sm font-medium text-gray-300
                hover:bg-white/10 hover:text-white
                transition-all duration-300
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

/**
 * Projects Section Component
 */
const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...getCategories()];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="section-container relative">
        <SectionTitle
          title="My Projects"
          subtitle="Explore my recent work and side projects"
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View more on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            href="https://github.com/Raghunandan0777"
            external
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            }
          >
            View More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
