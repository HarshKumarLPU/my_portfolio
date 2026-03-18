import { motion } from 'framer-motion';
import { Server, LayoutDashboard, Code2 } from 'lucide-react';

const ServiceCard = ({ title, description, icon: Icon, delay }) => {
    return (
        <motion.div
            className="relative p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-all duration-500 group overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay }}
            whileHover={{ y: -10 }}
        >
            {/* Glow effect on hover */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-accent/30 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="mb-6 inline-block p-4 rounded-xl bg-white/5 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                {Icon && <Icon size={36} strokeWidth={1.5} />}
            </div>
            <h3 className="text-2xl text-white font-semibold mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </motion.div>
    );
};

const Services = () => {
    const services = [
        {
            title: "Frontend Development",
            description: "Building responsive and interactive user interfaces using React, Tailwind CSS, and modern animations for smooth user experiences.",
            icon: LayoutDashboard,
            delay: 0.2,
        },
        {
            title: "Backend Development",
            description: "Developing scalable and secure backend systems and APIs using Node.js, Express, and databases with a focus on performance.",
            icon: Server,
            delay: 0.4,
        },
        {
            title: "Full Stack Development",
            description: "Building end-to-end web applications with seamless frontend and backend integration. Focused on responsive UI, APIs, and scalable database solutions.",
            icon: Code2,
            delay: 0.3,
        }
    ];

    return (
        <section id="services" className="w-full px-6 md:px-20 min-h-screen snap-start snap-always flex flex-col items-center justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    className="relative text-center mb-24"
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
                        Services
                    </motion.span>
                    <h2 className="relative text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tight">
                        WHAT I DO
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
