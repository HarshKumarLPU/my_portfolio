import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';

const BackgroundReveal = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef(null);

    // Smooth movement
    const springConfig = { damping: 45, stiffness: 300 };
    const smoothedX = useSpring(mouseX, springConfig);
    const smoothedY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    useAnimationFrame(() => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--x', `${smoothedX.get()}px`);
            containerRef.current.style.setProperty('--y', `${smoothedY.get()}px`);
        }
    });

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050510]"
        >
            {/* Layer 1: The vibrant colorful background */}
            <div 
                className="absolute inset-0 opacity-60"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, #4c1d95 0%, transparent 60%),
                        radial-gradient(circle at 80% 70%, #1e40af 0%, transparent 60%),
                        radial-gradient(circle at 40% 80%, #701a75 0%, transparent 60%),
                        radial-gradient(circle at 70% 20%, #172554 0%, transparent 60%),
                        radial-gradient(circle at 50% 50%, #0c4a6e 0%, transparent 70%)
                    `,
                    filter: 'blur(70px)',
                    transform: 'translateZ(0)'
                }}
            />
            
            {/* Layer 2: The dark mask overlay */}
            <div 
                className="absolute inset-0 bg-[#050510]"
                style={{
                    WebkitMaskImage: `radial-gradient(400px circle at var(--x) var(--y), transparent 0%, black 100%)`,
                    maskImage: `radial-gradient(400px circle at var(--x) var(--y), transparent 0%, black 100%)`,
                }}
            />

            {/* Subtle interactive accent glow */}
            <motion.div
                className="absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 transition-opacity duration-500"
                style={{
                    x: smoothedX,
                    y: smoothedY,
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                    boxShadow: '0 0 100px rgba(139, 92, 246, 0.1)',
                }}
            />
        </div>
    );
};

export default BackgroundReveal;
