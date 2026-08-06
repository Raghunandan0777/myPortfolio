/* ========================================
   Process Data — How I Work (Discovery to Launch)
   5-step development workflow
   ======================================== */

export const processSteps = [
  {
    step: "01",
    title: "Discovery & Architecture",
    subtitle: "Understanding your vision, business goals, and technical requirements.",
    description: "We analyze target user personas, define feature specifications, select optimal tech stacks (MERN/PERN/Next.js), and architect scalable database models and REST API blueprints.",
    deliverables: ["Product Roadmap", "Tech Architecture", "Database Schema"],
    icon: "Compass",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    title: "UI/UX & Interactive Design",
    subtitle: "Designing modern, high-converting glassmorphic user interfaces.",
    description: "I build responsive design systems, dark luxury theme tokens, micro-interactions, and component hierarchies that deliver an award-winning user experience on all screen sizes.",
    deliverables: ["Component System", "Responsive Layouts", "Interactive Prototypes"],
    icon: "Layout",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    step: "03",
    title: "Full-Stack Development",
    subtitle: "Writing clean, modular, and high-performance production code.",
    description: "Frontend components are built with React/Next.js and Tailwind, paired with robust Express/Node APIs, database ORMs, JWT authentication, and AI model integrations (OpenAI/Gemini).",
    deliverables: ["RESTful APIs", "AI Integrations", "Database Pipeline"],
    icon: "Code2",
    gradient: "from-primary to-accent",
  },
  {
    step: "04",
    title: "Testing & Performance Audit",
    subtitle: "Rigorously optimizing speed, security, and responsiveness.",
    description: "Every app undergoes end-to-end testing, cross-browser audits, mobile touch testing, SEO metadata setup, and Lighthouse performance tuning (>95 score target).",
    deliverables: ["95+ Lighthouse Score", "SEO Optimization", "Mobile Responsiveness"],
    icon: "Zap",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    step: "05",
    title: "Deployment & Growth",
    subtitle: "Launching to production with automated CI/CD and continuous support.",
    description: "We deploy to cloud providers (Vercel, Render, AWS), configure domain DNS, set up environment secrets, and provide full code documentation and post-launch maintenance.",
    deliverables: ["Cloud Deployment", "CI/CD Pipeline", "Full Documentation"],
    icon: "Rocket",
    gradient: "from-emerald-500 to-teal-400",
  },
];

export default processSteps;
