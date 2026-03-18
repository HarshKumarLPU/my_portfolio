import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="relative w-full px-6 md:px-20 overflow-hidden flex flex-col items-center justify-center min-h-screen snap-start snap-always">
            <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">

                {/* Image Container */}
                <motion.div
                    className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative w-full h-full rounded-full border-2 border-white/10 backdrop-blur-sm overflow-hidden group">
                        <img
                            src="/harsh123.jpeg"
                            alt="Harsh"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                        />
                    </div>
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 relative">
                    <div className="relative mb-12">
                        <motion.span
                            className="absolute -top-12 -left-4 text-[12vw] font-black text-white/[0.03] leading-none pointer-events-none uppercase tracking-tighter"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            About
                        </motion.span>
                        <motion.h2
                            className="relative text-5xl md:text-7xl font-black text-white leading-tight uppercase tracking-tight"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
                                About Me
                            </span>
                        </motion.h2>
                        <motion.div
                            className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4"
                            initial={{ width: 0 }}
                            whileInView={{ width: 96 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        ></motion.div>
                    </div>

                    <motion.div
                        className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p>
                            A creative mind driven by curiosity and a passion for building meaningful digital experiences.
                            Focused on crafting modern, scalable web applications with smooth user interfaces
                            and efficient backend systems using technologies like React, Node.js, PHP, and MySQL.

                        </p>
                        <p>
                            Enjoys turning complex ideas into simple, user-friendly solutions.
                            With hands-on experience in projects like a real-time CPU Scheduler Simulator
                            and a Passwordless Authentication System, the goal is to create impactful products
                            that combine performance, security, and clean design.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
