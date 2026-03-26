import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    // Use MotionValues for high-performance positioning (bypasses React render cycle)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Add spring physics for a smoother, premium feel
    const springConfig = { damping: 25, stiffness: 250 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a');

            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="hidden md:block">
            {/* Small dot - follows mouse exactly */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />
            {/* Outer solid ball - follows with spring lag */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 bg-[#0a0a15] backdrop-blur-[2px] border border-white/10 rounded-full pointer-events-none z-[9999] flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.8)]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    opacity: isHovering ? 0 : 1,
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(26, 26, 46, 0)' : 'rgba(10, 10, 21, 0.6)',
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />
        </div>
    );
};

export default CustomCursor;
