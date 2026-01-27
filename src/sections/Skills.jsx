/* ========================================
   Skills Section Component
   Animated progress bars with glow effects
   Categorized skills with visual indicators
   ======================================== */
import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import SectionTitle from '../components/ui/SectionTitle';
import GlassCard from '../components/ui/GlassCard';

/**
 * Animated skill bar component
 * Shows skill name and animated progress indicator
 */
const SkillBar = ({ name, level, delay, color }) => {
  // Color classes based on skill category
  const colorClasses = {
    'neon-purple': {
      gradient: 'from-purple-500 to-purple-400',
      glow: 'shadow-purple-500/30',
      bg: 'bg-purple-500/10',
    },
    'neon-cyan': {
      gradient: 'from-cyan-500 to-cyan-400',
      glow: 'shadow-cyan-500/30',
      bg: 'bg-cyan-500/10',
    },
    'neon-pink': {
      gradient: 'from-pink-500 to-pink-400',
      glow: 'shadow-pink-500/30',
      bg: 'bg-pink-500/10',
    },
  };

  const colors = colorClasses[color] || colorClasses['neon-purple'];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      {/* Skill name and level */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="text-gray-500 text-sm font-mono">{level}%</span>
      </div>

      {/* Progress bar container */}
      <div className={`h-2 rounded-full ${colors.bg} overflow-hidden`}>
        {/* Animated progress fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
          className={`
            h-full rounded-full
            bg-gradient-to-r ${colors.gradient}
            shadow-lg ${colors.glow}
          `}
        />
      </div>
    </motion.div>
  );
};

/**
 * Skill category card component
 */
const SkillCategory = ({ category, data, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
  >
    <GlassCard className="p-6 h-full">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{data.icon}</span>
        <h3 className="text-xl font-bold text-white">{data.title}</h3>
      </div>

      {/* Skills list */}
      <div className="space-y-4">
        {data.items.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={skillIndex * 0.1}
            color={data.color}
          />
        ))}
      </div>
    </GlassCard>
  </motion.div>
);

/**
 * Skills Section Component
 */
const Skills = () => {
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none opacity-50" />
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="section-container relative">
        <SectionTitle
          title="My Skills"
          subtitle="Technologies and tools I work with"
        />

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([key, data], index) => (
            <SkillCategory
              key={key}
              category={key}
              data={data}
              index={index}
            />
          ))}
        </div>

        {/* Additional skills text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Also experienced with: 
            <span className="text-gray-400"> REST APIs, WebSockets, OAuth, JWT, Testing (Jest, Cypress), Agile/Scrum, Code Review</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
