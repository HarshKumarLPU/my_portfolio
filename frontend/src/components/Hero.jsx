import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
import { Download, Github, Linkedin } from 'lucide-react';

const TypingText = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [typingSpeed, setTypingSpeed] = useState(150);

    const roles = ["Full Stack Developer", "MERN Stack ", "Problem Solver"];

    useEffect(() => {
        let timer = setTimeout(() => {
            handleTyping();
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, typingSpeed]);

    const handleTyping = () => {
        const i = loopNum % roles.length;
        const fullText = roles[i];

        if (isDeleting) {
            setDisplayText(fullText.substring(0, displayText.length - 1));
            setTypingSpeed(50);
        } else {
            setDisplayText(fullText.substring(0, displayText.length + 1));
            setTypingSpeed(150);
        }

        if (!isDeleting && displayText === fullText) {
            setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(500);
        }
    };

    return (
        <div className="text-lg md:text-xl font-bold tracking-widest uppercase text-white/50 min-h-[1.5em] flex items-center justify-center">
            <span>{displayText}</span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-0.5 h-6 bg-accent ml-2"
            />
        </div>
    );
};

const Hero = () => {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement
    const springConfig = { damping: 30, stiffness: 200 };
    const smoothedX = useSpring(mouseX, springConfig);
    const smoothedY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    useAnimationFrame(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            // Calculate relative position within the text container
            containerRef.current.style.setProperty('--x', `${smoothedX.get() - rect.left}px`);
            containerRef.current.style.setProperty('--y', `${smoothedY.get() - rect.top}px`);
        }
    });

    return (
        <section id="home" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden snap-start snap-always border-b border-white/5 text-white">

            {/* Massive Background Text with Spotlight Reveal - RESTORED ORIGINAL LAYOUT */}
            <div
                ref={containerRef}
                className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center z-10 pointer-events-none group/hero"
            >
                <div className="relative flex flex-col items-center pointer-events-auto cursor-default">
                    <motion.h1
                        className="text-[16vw] md:text-[14vw] leading-none font-black whitespace-nowrap tracking-tighter transition-colors duration-300 uppercase"
                        style={{
                            backgroundImage: `radial-gradient(400px circle at var(--x) var(--y), rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.5) 30%, rgba(255, 255, 255, 0.1) 60%)`,
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            textShadow: '0 0 40px rgba(139, 92, 246, 0.1)'
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        HI, I'M HARSH
                    </motion.h1>

                    {/* Hover-reveal Description Tag - RESTORED ORIGINAL STYLE */}
                    <motion.div
                        className="opacity-0 group-hover/hero:opacity-100 transition-all duration-700 translate-y-2 group-hover/hero:translate-y-0 pointer-events-none mt-2 max-w-[500px]"
                    >
                        <p className="text-[0.6rem] md:text-xs font-bold uppercase tracking-[0.4em] text-gray-400 text-center leading-relaxed">
                            A FULL STACK DEVELOPER PASSIONATE ABOUT CRAFTING <span className="text-purple-400">BOLD AND MEMORABLE PROJECTS. 🚀</span>
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Interactive Elements at Bottom - NEW STUFF ADDED BELOW AS REQUESTED */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 w-full max-w-xl px-10 z-20">
                <div className="flex items-center gap-8">
                    <motion.a
                        href="/cv.pdf"
                        download
                        className="group flex items-center gap-2 px-6 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 text-[10px] font-bold tracking-[0.2em] uppercase"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <Download size={12} className="group-hover:text-accent transition-colors" />
                        Download CV
                    </motion.a>

                    <div className="flex items-center gap-6">
                        <motion.a
                            href="https://github.com/HarshKumarLPU" target="_blank" rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-all hover:scale-120"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <Github size={18} />
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com/in/harshkumar-cse/" target="_blank" rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-all hover:scale-120"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                        >
                            <Linkedin size={18} />
                        </motion.a>
                    </div>
                </div>

                {/* Typing Role Animation */}
                <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                >
                    <TypingText />
                </motion.div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none"></div>

        </section>
    );
};

export default Hero;
