import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCard = ({ project, direction }) => {
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0
        })
    };

    return (
        <motion.div
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 flex flex-col md:flex-row gap-8 md:gap-16 items-center"
        >
            {/* Project Image/Preview (Tilt Effect) */}
            <motion.div
                className="w-full md:w-1/2 relative group rounded-2xl overflow-hidden aspect-video bg-[#1a1a1a] border border-white/10 shadow-2xl"
                whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformPerspective: 1000 }}
            >
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
            </motion.div>

            {/* Project Info */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <h3 className="text-3xl font-bold text-white mb-4">
                    {project.title}
                </h3>
                <div className="p-6 bg-[#111] border border-white/5 rounded-2xl mb-6 relative z-20 shadow-xl">
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        {project.description}
                    </p>
                </div>

                <ul className="flex flex-wrap gap-3 mb-8 justify-start">
                    {project.tech.map((item, index) => (
                        <li key={index} className="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full">
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="flex gap-6 justify-start">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-300"
                    >
                        <Github size={24} />
                    </a>
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-300"
                    >
                        <ExternalLink size={24} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const projects = [
        {
            image: "./Project1.jpeg",
            title: "Portfolio Management System",
            description: "A Portfolio Management System designed to showcase and manage projects, skills, and achievements in a structured and user-friendly way. Includes features like project categorization, dynamic content updates, and a responsive interface for seamless user experience.",
            tech: ["React", "Node.js", "Express", "MongoDB"],
            github: "https://github.com/HarshKumarLPU/Portfolio-Management-System",
            live: "https://portfolio-management-system-woad.vercel.app/"
        },
        {
            image: "./Project2.jpeg",
            title: "DailyWages",
            description: "DailyWages is a simple web app that helps contractors post local jobs and lets workers find nearby work using their pincode/location, with secure login and separate dashboards for each role.",
            tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "i18next"],
            github: "https://github.com/HarshKumarLPU/daily_wages",
            live: "https://example.com"
        },
        {
            image: "./Project3.jpeg",
            title: "Passwordless Authentication System",
            description: "Passwordless Authentication is a web app that lets users sign up and log in without passwords by verifying via email OTP or magic link, with session-based access and basic account recovery. It uses PHP, MySQL, PHPMailer (Composer), Tailwind UI, and typically runs on XAMPP (Apache + MySQL).",
            tech: ["PHP", "MySQL", "PHPMailer", "TailwindCSS"],
            github: "https://github.com/HarshKumarLPU/Passwordless_authentication",
            live: "https://example.com"
        }
    ];

    const paginate = (newDirection) => {
        const nextPage = page + newDirection;
        if (nextPage >= 0 && nextPage < projects.length) {
            setPage([nextPage, newDirection]);
        }
    };

    return (
        <section id="projects" className="w-full px-6 md:px-20 min-h-screen snap-start snap-always flex flex-col items-center justify-center overflow-hidden">
            <div className="max-w-6xl mx-auto w-full relative">
                <motion.div
                    className="relative text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] leading-none pointer-events-none uppercase tracking-tighter whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Projects
                    </motion.span>
                    <h2 className="relative text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tight">
                        My Projects
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="relative h-[600px] md:h-[450px] flex items-center justify-center">
                    <div className="w-full relative h-full">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <ProjectCard
                                key={page}
                                project={projects[page]}
                                direction={direction}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute -left-6 md:-left-24 top-1/2 -translate-y-1/2 z-40">
                        <button
                            onClick={() => paginate(-1)}
                            disabled={page === 0}
                            className={`p-4 rounded-full border border-white/10 transition-all ${page === 0 ? 'opacity-20 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10 hover:scale-110 cursor-pointer shadow-lg backdrop-blur-sm'
                                }`}
                        >
                            <ChevronLeft className="text-white" size={28} />
                        </button>
                    </div>

                    <div className="absolute -right-6 md:-right-24 top-1/2 -translate-y-1/2 z-40">
                        <button
                            onClick={() => paginate(1)}
                            disabled={page === projects.length - 1}
                            className={`p-4 rounded-full border border-white/10 transition-all ${page === projects.length - 1 ? 'opacity-20 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10 hover:scale-110 cursor-pointer shadow-lg backdrop-blur-sm'
                                }`}
                        >
                            <ChevronRight className="text-white" size={28} />
                        </button>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-4 mt-16">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage([index, index > page ? 1 : -1])}
                            className={`h-2 rounded-full transition-all duration-500 ${index === page ? 'w-12 bg-accent' : 'w-3 bg-white/10 hover:bg-white/20'
                                }`}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
