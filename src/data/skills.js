/* ========================================
   Skills Data
   Raghunandan Shah's Technical Skills
   ======================================== */

export const skills = {
    // Frontend Development Skills
    frontend: {
        title: "Frontend",
        icon: "🎨",
        color: "neon-purple",
        items: [
            { name: "React.js", level: 90 },
            { name: "JavaScript (ES6+)", level: 88 },
            { name: "HTML5", level: 95 },
            { name: "CSS3", level: 90 },
            { name: "Tailwind CSS", level: 92 },
        ],
    },

    // Backend Development Skills
    backend: {
        title: "Backend",
        icon: "⚙️",
        color: "neon-cyan",
        items: [
            { name: "Node.js", level: 88 },
            { name: "Express.js", level: 85 },
            { name: "REST APIs", level: 90 },
            { name: "JWT Authentication", level: 85 },
            { name: "OAuth", level: 80 },
        ],
    },

    // Database Skills
    databases: {
        title: "Databases",
        icon: "🗄️",
        color: "neon-pink",
        items: [
            { name: "MongoDB", level: 88 },
            { name: "PostgreSQL", level: 85 },
            { name: "SQL", level: 82 },
        ],
    },

    // Tools & Deployment
    tools: {
        title: "Tools & Deployment",
        icon: "🚀",
        color: "neon-purple",
        items: [
            { name: "Git", level: 90 },
            { name: "GitHub", level: 90 },
            { name: "Postman", level: 85 },
            { name: "Vercel", level: 88 },
            { name: "Render", level: 85 },
        ],
    },
};

// Tech stack icons for About section (Your actual tech stack)
export const techStackIcons = [
    { name: "React.js", icon: "⚛️", category: "frontend" },
    { name: "JavaScript", icon: "🟨", category: "frontend" },
    { name: "Node.js", icon: "🟩", category: "backend" },
    { name: "Express.js", icon: "⚡", category: "backend" },
    { name: "MongoDB", icon: "🍃", category: "database" },
    { name: "PostgreSQL", icon: "🐘", category: "database" },
    { name: "Tailwind CSS", icon: "💨", category: "frontend" },
    { name: "HTML5", icon: "🌐", category: "frontend" },
    { name: "CSS3", icon: "🎨", category: "frontend" },
    { name: "Git", icon: "📂", category: "tools" },
    { name: "GitHub", icon: "🐙", category: "tools" },
    { name: "Postman", icon: "📬", category: "tools" },
    { name: "Vercel", icon: "▲", category: "deployment" },
    { name: "Render", icon: "🚀", category: "deployment" },
    { name: "REST APIs", icon: "🔗", category: "backend" },
    { name: "JWT", icon: "🔐", category: "backend" },
];

// Helper to get all skills as flat array
export const getAllSkills = () => {
    return Object.values(skills).flatMap(category => category.items);
};

export default skills;
