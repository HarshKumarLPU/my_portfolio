import { motion } from 'framer-motion';

const TimelineItem = ({ year, title, subtitle, description, isLast, delay, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className="relative mb-16 md:mb-24 last:mb-0">
            {/* Timeline Line (Desktop Center / Mobile Left) */}
            <div className={`absolute h-full w-[2px] bg-white/10 left-4 md:left-1/2 md:-translate-x-1/2 ${isLast ? 'h-0' : ''}`} />

            {/* Timeline Node */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 h-4 w-4 rounded-full bg-accent border-4 border-[#0a0a0a] z-10 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>

            <motion.div
                className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay }}
            >
                {/* Content Card */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-accent/30 transition-all duration-500 group">
                        <span className="inline-block text-accent font-mono text-sm mb-2 tracking-[0.2em]">{year}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis mb-1">
                            {title}
                        </h3>
                        {subtitle && <h4 className="text-gray-400 font-medium mb-3">{subtitle}</h4>}
                        {description && <p className="text-gray-500 text-sm leading-relaxed">{description}</p>}
                    </div>
                </div>

                {/* Spacer (Desktop Central Line Area) */}
                <div className="hidden md:block w-[10%]"></div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[45%]"></div>
            </motion.div>
        </div>
    );
};

const Experience = () => {
    const experiences = [
        {
            year: "2020 - 2021",
            title: "Matriculation",
            subtitle: "Secondary Education",
            description: "Built a strong foundation in science and mathematics."
        },
        {
            year: "2021 - 2023",
            title: "Intermediate",
            subtitle: "Higher Secondary",
            description: "Focused on Computer Science and core subjects like PCM."
        },
        {
            year: "2023 - Present",
            title: "Bachelor of Technology (B.Tech)",
            subtitle: "Undergraduate Degree",
            description: "Pursuing B.Tech with a focus on software development and modern web technologies."
        }
    ];

    return (
        <section id="experience" className="w-full px-6 md:px-20 py-24 overflow-hidden relative min-h-screen snap-start snap-always flex flex-col items-center justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    className="relative text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/[0.02] leading-none pointer-events-none uppercase tracking-tighter whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Succession
                    </motion.span>
                    <h2 className="relative text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">Journey.</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="relative mt-20">
                    {/* Items */}
                    {experiences.map((exp, index) => (
                        <TimelineItem
                            key={index}
                            index={index}
                            {...exp}
                            isLast={index === experiences.length - 1}
                            delay={0.2 * (index + 1)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
