/* ========================================
   Experience/Timeline Data
   Raghunandan Shah's Experience & Education
   ======================================== */

export const experience = [
    {
        id: 1,
        type: "work",
        title: "Software Developer Intern",
        organization: "Codtech",
        location: "India",
        startDate: "Jan 2025",
        endDate: "Apr 2025",
        current: false,
        description: `Contributed to full-stack development using React.js and Node.js. 
                  Built reusable UI components and integrated RESTful APIs. 
                  Assisted in backend development and collaborated using Git and Agile practices.`,
        highlights: [
            "Full-stack development with React.js and Node.js",
            "Built reusable UI components",
            "Integrated RESTful APIs",
            "Collaborated using Git and Agile practices",
        ],
        techStack: ["React.js", "Node.js", "REST APIs", "Git"],
    },
    {
        id: 2,
        type: "education",
        title: "B.Tech in Computer Science",
        organization: "Parul University",
        location: "Gujarat, India",
        startDate: "2021",
        endDate: "2025",
        current: false,
        description: `Pursuing Bachelor of Technology in Computer Science with focus on 
                  full-stack development, database management, and modern web technologies.`,
        highlights: [
            "Computer Science fundamentals",
            "Full-stack web development",
            "Database management systems",
            "Software engineering practices",
        ],
        techStack: ["JavaScript", "React", "Node.js", "MongoDB", "PostgreSQL"],
    },
    {
        id: 3,
        type: "education",
        title: "Higher Secondary Education",
        organization: "Smt. G. N. Pandaya School",
        location: "Gujarat, India",
        startDate: "2019",
        endDate: "2021",
        current: false,
        description: `Completed higher secondary education with focus on Science stream.`,
        highlights: [
            "Science stream",
            "Strong foundation in Mathematics",
            "Computer Science basics",
        ],
        techStack: [],
    },
];

// Get work experience only
export const getWorkExperience = () =>
    experience.filter(exp => exp.type === "work");

// Get education only  
export const getEducation = () =>
    experience.filter(exp => exp.type === "education");

export default experience;
