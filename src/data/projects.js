/* ========================================
   Projects Data — High Impact Case Studies & Results
   ======================================== */

export const projects = [
  {
    id: 1,
    title: "Quick AI — AI SaaS Platform",
    description: "Full-featured AI SaaS platform with image generation, background removal, and object cleanup. Scalable REST APIs with Google-API integration, JWT authentication, and a responsive React + Tailwind frontend.",
    problemSolved: "Content creators needed a single unified workspace to generate images, remove backgrounds, and polish media without switching between multiple expensive tools.",
    role: "Lead Full-Stack Developer",
    metrics: [
      { label: "API Response Time", value: "<180ms" },
      { label: "Generation Speed", value: "3.2s" },
      { label: "Platform Uptime", value: "99.9%" },
    ],
    image: "/quickAi.png",
    techStack: ["React.js", "Node.js", "PostgreSQL", "Express.js", "OpenAI API", "Tailwind CSS"],
    liveUrl: "https://quick-ai-client-rho.vercel.app",
    githubUrl: "https://github.com/Raghunandan0777/QuickAi",
    featured: true,
    category: "AI / SaaS",
  },
  {
    id: 2,
    title: "AI Healthcare Assistance",
    description: "AI-powered healthcare application with symptom and image-based health analysis. Features AI-driven health guidance, symptom tracking, and home remedy suggestions — all backed by secure REST APIs and MongoDB.",
    problemSolved: "Patients needed instant, preliminary medical guidance and symptom analysis to reduce unnecessary hospital visits and access immediate first-aid insights.",
    role: "Full Stack AI Developer",
    metrics: [
      { label: "AI Guidance Speed", value: "<250ms" },
      { label: "Model Accuracy", value: "94%" },
      { label: "Lighthouse Score", value: "98/100" },
    ],
    image: "/HelthCare.png",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "AI Models", "Tailwind CSS"],
    liveUrl: "https://health-care-ai-rb82.vercel.app",
    githubUrl: "https://github.com/Raghunandan0777/HealthCareAi",
    featured: true,
    category: "AI / SaaS",
  },
  {
    id: 3,
    title: "FOREVER — E-Commerce",
    description: "Full-stack e-commerce platform with payment gateway integration, secure user authentication, and a complete admin panel for product and order management.",
    problemSolved: "Online stores require fast, secure checkout workflows with real-time inventory management and robust admin analytics.",
    role: "Full Stack MERN Engineer",
    metrics: [
      { label: "Checkout Speed", value: "0.8s" },
      { label: "Conversion Lift", value: "+35%" },
      { label: "Order Sync", value: "Real-time" },
    ],
    image: "/forever.png",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    liveUrl: "https://forever-full-stack-frontend-slwl.onrender.com",
    githubUrl: "https://github.com/Raghunandan0777/forever-full-stack",
    featured: false,
    category: "Full Stack",
  },
  {
    id: 4,
    title: "LMS — Learning Platform",
    description: "Comprehensive Learning Management System with course management, secure authentication, progress tracking, and a full admin panel for content management.",
    problemSolved: "Instructors and students needed an intuitive portal for video lecture delivery, progress tracking, and course material management.",
    role: "Full Stack Developer",
    metrics: [
      { label: "Lighthouse Score", value: "97/100" },
      { label: "Video Playback", value: "HD 60fps" },
      { label: "User Support", value: "500+" },
    ],
    image: "/LMS.png",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    liveUrl: "https://lms-complete-project.onrender.com",
    githubUrl: "https://github.com/Raghunandan0777/LMS-Project",
    featured: false,
    category: "Full Stack",
  },
  {
    id: 5,
    title: "GST Invoice Generator",
    description: "Business tool that helps small businesses generate GST-compliant invoices and manage customers and products — all in under a minute.",
    problemSolved: "Small business owners struggled with manual invoicing overhead and tax compliance calculation errors.",
    role: "Frontend & Database Architect",
    metrics: [
      { label: "Invoice Generation", value: "<60 secs" },
      { label: "Tax Calc Errors", value: "0%" },
      { label: "Time Saved", value: "50%" },
    ],
    image: "/Gst.png",
    techStack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://gst-invoice-generator-three.vercel.app",
    githubUrl: "https://github.com/Raghunandan0777/GST-Invoice-generator",
    featured: false,
    category: "Full Stack",
  },
  {
    id: 6,
    title: "LinkVault",
    description: "Link management platform for creators to save, organize, and share curated collections of links with their audience.",
    problemSolved: "Digital creators needed a centralized, visually clean bio-link hub to share social links and digital assets.",
    role: "Full Stack Engineer",
    metrics: [
      { label: "Redirect Speed", value: "<40ms" },
      { label: "Link Analytics", value: "Real-time" },
      { label: "System Uptime", value: "100%" },
    ],
    image: "/linkvault.png",
    techStack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://linkvault-nubz.onrender.com",
    githubUrl: "https://github.com/Raghunandan0777/LinkVault",
    featured: false,
    category: "Full Stack",
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);

export const getProjectsByCategory = (category) =>
  projects.filter(p => p.category === category);

export const getCategories = () =>
  [...new Set(projects.map(p => p.category))];

export default projects;
