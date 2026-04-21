/* ========================================
   Projects Data
   Raghunandan Shah's Projects
   ======================================== */

export const projects = [
    {
        id: 1,
        title: "Quick AI — AI SaaS Platform",
        description: "Built AI tools for image generation, background removal, and object cleanup. Developed scalable REST APIs and integrated google-api services. Implemented JWT authentication and responsive UI using React and Tailwind.",
        image: "/quickAi.png",
        techStack: ["React.js", "Node.js", "PostgreSQL", "Express.js", "OpenAI API", "Tailwind CSS", "JWT"],
        liveUrl: "https://quick-ai-client-rho.vercel.app",
        githubUrl: "https://github.com/Raghunandan0777/QuickAi",
        featured: true,
        category: "AI/SaaS",
    },
    {
        id: 2,
        title: "AI Healthcare Assistance Platform",
        description: "Built an AI-based healthcare web application using the MERN stack. Integrated open-source AI models for symptom and image-based health analysis. Enabled symptom tracking, AI-driven health guidance, and home remedy suggestions. Designed secure REST APIs and managed user health data using MongoDB.",
        image: "/HelthCare.png",
        techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Open-Source AI", "Tailwind CSS"],
        liveUrl: "https://health-care-ai-rb82.vercel.app",
        githubUrl: "https://github.com/Raghunandan0777/HealthCareAi",
        featured: true,
        category: "AI/SaaS",
    },
    {
        id: 3,
        title: "FOREVER Ecommerce Website",
        description: "Built an Ecommerce website using the MERN stack. With payment gateway integration and secure user authentication. and admin panel for product management.",
        image: "/forever.png",
        techStack: ["React.js", "Node.js", "MongoDB", "Express.js","Tailwind CSS"],
        liveUrl: "https://forever-full-stack-frontend-slwl.onrender.com",
        githubUrl: "https://github.com/Raghunandan0777/forever-full-stack",
        featured: true,
        category: "FullStack",
    },

    
    {
       id: 4,
       title: "LMS",
       description: "Built an LMS website using the MERN stack. With proper course management and secure user authentication. and admin panel for course management.",
       image: "/LMS.png",
       techStack: ["React.js", "Node.js", "MongoDB", "Express.js","Tailwind CSS"],
       liveUrl: "https://lms-complete-project.onrender.com",
       githubUrl: "https://github.com/Raghunandan0777/LMS-Project",
       category: "FullStack",
       featured: true,
   },
    {
       id: 5,
       title: "GST-Invoice-generator",
       description: "Built an GST Invoice generator  its helps the small business to generate gst invoice and manage their customers and products. in one minuts",
       image: "/Gst.png",
       techStack: ["Next.js", "Node.js", "superbase", "Express.js","Tailwind CSS","typescript"],
       liveUrl: "https://gst-invoice-generator-three.vercel.app",
       githubUrl: "https://github.com/Raghunandan0777/GST-Invoice-generator",
       category: "FullStack",
       featured: true,
   },

   {
       id: 6,
       title: "LinkVault",
       description: "Built an LinkVault its helps the creater to save their likns and share with their followers",
       image: "/linkvault.png",
       techStack: ["Next.js", "Node.js", "superbase", "Express.js","Tailwind CSS","typescript"],
       liveUrl: "https://linkvault-nubz.onrender.com",
       githubUrl: "https://github.com/Raghunandan0777/LinkVault",
       category: "FullStack",
       featured: true,
   },
];
// Get featured projects for hero/highlights
export const getFeaturedProjects = () => projects.filter(p => p.featured);

// Get projects by category
export const getProjectsByCategory = (category) =>
    projects.filter(p => p.category === category);

// Get all unique categories
export const getCategories = () =>
    [...new Set(projects.map(p => p.category))];

export default projects;
