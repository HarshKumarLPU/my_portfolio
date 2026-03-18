import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const technologies = [
    { name: "React", category: "Frontend", color: "text-blue-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Node.js", category: "Backend", color: "text-green-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: "MongoDB", category: "Database", color: "text-green-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    { name: "Express", category: "Backend", color: "text-gray-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invert: true },
    { name: "TailwindCSS", category: "Frontend", color: "text-teal-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    // { name: "Next.js", category: "Frontend", color: "text-white", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invert: true },
    { name: "TypeScript", category: "Language", color: "text-blue-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    // { name: "Three.js", category: "3D Web", color: "text-white", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", invert: true },
    { name: "Framer Motion", category: "Animation", color: "text-pink-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framer/framer-original.svg", invert: true },
    // { name: "Docker", category: "DevOps", color: "text-blue-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    // { name: "GraphQL", category: "API", color: "text-pink-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
    { name: "Git", category: "Version Control", color: "text-orange-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" }
];

const TechCard = ({ name, category, color, icon, invert, index }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative p-6 md:p-8 rounded-2xl bg-[#0a0a15] border border-white/5 hover:border-white/20 hover:bg-[#111122] shadow-2xl transition-colors duration-300 group cursor-pointer flex flex-col items-center text-center h-full justify-center aspect-square md:aspect-auto md:min-h-[160px] overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>

            {/* Background glowing logo appearing on hover */}
            <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-all duration-500 scale-50 group-hover:scale-150 pointer-events-none"
                style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
            >
                <img
                    src={icon}
                    alt={`${name} background logo`}
                    className={`w-3/4 h-3/4 object-contain blur-[2px] ${invert ? 'invert' : ''}`}
                />
            </div>

            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="pointer-events-none flex flex-col items-center">
                {/* 3D Floating Logo appearing on hover */}
                <div className="h-0 group-hover:h-16 group-hover:mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden flex items-center justify-center">
                    <img
                        src={icon}
                        alt={`${name} logo`}
                        className={`w-12 h-12 object-contain ${invert ? 'invert' : ''}`}
                    />
                </div>

                <h3 className={`text-2xl md:text-3xl font-black mb-2 ${color} drop-shadow-xl tracking-tight transition-all duration-300 group-hover:-translate-y-1`}>
                    {name}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 group-hover:text-gray-400">
                    {category}
                </p>
            </div>
        </motion.div>
    );
};

const TechStack = () => {
    return (
        <section id="techstack" className="w-full px-6 md:px-20 py-20 min-h-screen snap-start snap-always flex flex-col items-center justify-center overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="relative text-center mb-20"
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
                        Arsenal
                    </motion.span>
                    <h2 className="relative text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tight">
                        Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">Stack.</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto drop-shadow-md pb-4">
                        The cutting-edge tools and technologies I use to build robust, scalable, and immersive digital experiences.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8" style={{ perspective: "1000px" }}>
                    {technologies.map((tech, index) => (
                        <TechCard key={index} index={index} {...tech} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
