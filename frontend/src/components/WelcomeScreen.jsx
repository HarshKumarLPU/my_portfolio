import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';

const TapeDecoration = ({ text, className, rotate, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay, ease: "backOut" }}
        className={`absolute px-4 py-2 bg-[#151515] text-[#e0e0e0] font-bold text-xs md:text-sm tracking-widest uppercase shadow-2xl z-20 ${className}`}
        style={{
            transform: `rotate(${rotate}deg)`,
            clipPath: 'polygon(1% 2%, 99% 0%, 98% 98%, 0% 100%)',
            border: '1px solid #333'
        }}
    >
        {text}
    </motion.div>
);

const Letter = ({ char, position, rotation, material, floatProps }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
            ref.current.rotation.y = rotation[1] + Math.cos(state.clock.elapsedTime * 0.5 + position[1]) * 0.1;
        }
    });

    return (
        <Float {...floatProps}>
            <Text3D
                ref={ref}
                font="/fonts/helvetiker_bold.typeface.json"
                position={position}
                rotation={rotation}
                size={2.5}
                height={1}
                curveSegments={6}
                bevelEnabled
                bevelThickness={0.1}
                bevelSize={0.05}
                bevelOffset={0}
                bevelSegments={3}
            >
                {char}
                {material}
            </Text3D>
        </Float>
    );
};

const Typography3D = () => {
    return (
        <group position={[-0.5, 0.5, 0]}>
            {/* F */}
            <Letter char="F" position={[-6, 1.5, 0]} rotation={[0.1, 0.2, -0.1]} floatProps={{ speed: 1.5, rotationIntensity: 0.2, floatIntensity: 1 }}
                material={<meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.1} />}
            />
            {/* U */}
            <Letter char="U" position={[-3, 1.5, 1]} rotation={[0, -0.2, 0]} floatProps={{ speed: 2, rotationIntensity: 0.4, floatIntensity: 1.5 }}
                material={<meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.5} />}
            />
            {/* L */}
            <Letter char="L" position={[0, 2, 0]} rotation={[-0.2, 0.1, 0.2]} floatProps={{ speed: 1.2, rotationIntensity: 0.3, floatIntensity: 0.8 }}
                material={<meshStandardMaterial color="#f59e0b" roughness={0.4} metalness={0.7} wireframe={false} />}
            />
            {/* L */}
            <Letter char="L" position={[2.8, 1.5, -1]} rotation={[0, 0.1, -0.1]} floatProps={{ speed: 1.8, rotationIntensity: 0.5, floatIntensity: 1.2 }}
                material={<meshStandardMaterial color="#84cc16" roughness={0.8} metalness={0.1} />}
            />

            {/* S */}
            <Letter char="S" position={[-5, -2, 1]} rotation={[-0.1, 0.2, 0.1]} floatProps={{ speed: 1.6, rotationIntensity: 0.3, floatIntensity: 1.1 }}
                material={<meshStandardMaterial color="#e5e7eb" roughness={0.9} metalness={0} />}
            />
            {/* T */}
            <Letter char="T" position={[-2, -2.5, 2]} rotation={[0.2, -0.1, 0]} floatProps={{ speed: 2.2, rotationIntensity: 0.6, floatIntensity: 1.8 }}
                material={<meshStandardMaterial color="#ea580c" roughness={0.3} metalness={0.6} />}
            />
            {/* A */}
            <Letter char="A" position={[0.5, -2, 0]} rotation={[0, 0.3, -0.2]} floatProps={{ speed: 1.4, rotationIntensity: 0.2, floatIntensity: 0.9 }}
                material={
                    <meshStandardMaterial
                        color="#3b82f6"
                        transparent={true}
                        opacity={0.8}
                        metalness={0.2}
                        roughness={0.1}
                    />
                }
            />
            {/* C */}
            <Letter char="C" position={[3.5, -2, 1]} rotation={[-0.1, -0.2, 0]} floatProps={{ speed: 1.9, rotationIntensity: 0.4, floatIntensity: 1.3 }}
                material={<meshStandardMaterial color="#f3f4f6" roughness={0.1} metalness={0.2} />}
            />
            {/* K */}
            <Letter char="K" position={[6.5, -1.5, -1]} rotation={[0, 0, 0.1]} floatProps={{ speed: 1.3, rotationIntensity: 0.1, floatIntensity: 0.7 }}
                material={<meshStandardMaterial color="#c026d3" roughness={0.4} metalness={0.5} />}
            />
        </group>
    );
};

const WelcomeScreen = ({ onEnter }) => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState("WAITING TO START...");
    const [hasClickedEnter, setHasClickedEnter] = useState(false);

    useEffect(() => {
        if (!hasClickedEnter) return;

        const texts = [
            "INITIALIZING SYSTEM ARCHITECTURE...",
            "COMPILING ASSETS...",
            "LOADING 3D ENVIRONMENT...",
            "CALIBRATING LIGHTING ENGINE...",
            "ESTABLISHING SECURE CONNECTION...",
            "OPTIMIZING FOR PERFORMANCE..."
        ];

        let intervalId;
        // Total duration for loading
        const totalDuration = 3500;
        const startTime = Date.now() + 200; // brief delay

        setLoadingText(texts[0]);
        const startTextCycle = () => {
            intervalId = setInterval(() => {
                setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
            }, 500);
        };
        setTimeout(startTextCycle, 200);

        const updateProgress = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;

            if (elapsed > 0) {
                // Easing for industrial feel
                let progressFactor = elapsed / totalDuration;
                if (progressFactor > 1) progressFactor = 1;
                const easeOutProgress = 1 - Math.pow(1 - progressFactor, 3);

                const newProgress = Math.min(100, easeOutProgress * 100);
                setProgress(Math.floor(newProgress));

                if (progressFactor >= 1) {
                    setLoadingText("ALL SYSTEMS GO!");
                    clearInterval(intervalId);

                    // Wait a moment at 100% before transitioning
                    setTimeout(() => {
                        onEnter();
                    }, 500);
                    return;
                }
            }
            requestAnimationFrame(updateProgress);
        };

        const animationId = requestAnimationFrame(updateProgress);
        return () => {
            cancelAnimationFrame(animationId);
            clearInterval(intervalId);
        };
    }, [hasClickedEnter, onEnter]);

    return (
        <motion.div
            className="fixed inset-0 z-50 overflow-hidden bg-[#111] text-foreground"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
            {/* Canvas Background & 3D Typography */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                    <color attach="background" args={['#111111']} />
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#6b21a8" />
                    <Environment preset="city" />

                    {/* Faint Background Grid */}
                    <Grid
                        position={[0, -5, -5]}
                        args={[50, 50]}
                        cellSize={1}
                        cellThickness={1}
                        cellColor="#333"
                        sectionSize={3}
                        sectionThickness={1.5}
                        sectionColor="#444"
                        fadeDistance={30}
                    />

                    <Center>
                        <Typography3D />
                    </Center>

                    <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4} resolution={256} frames={1} />
                </Canvas>
            </div>

            {/* HTML Overlays (Tape styles) */}
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                <div className="relative w-full max-w-6xl h-full">
                    <TapeDecoration text="HARSH KUMAR" className="top-[15%] left-[5%] md:left-[10%]" rotate={-4} delay={0.8} />
                    <TapeDecoration text="FRONTEND" className="top-[50%] left-[2%] md:left-[8%]" rotate={8} delay={1.0} />
                    <TapeDecoration text="BACKEND" className="top-[40%] right-[5%] md:right-[15%]" rotate={-6} delay={1.2} />
                    <TapeDecoration text="API DESIGNER" className="bottom-[20%] right-[10%] md:right-[20%]" rotate={5} delay={1.4} />
                    <TapeDecoration text="DATABASE" className="bottom-[15%] left-[15%] md:left-[25%]" rotate={-3} delay={1.6} />
                </div>
            </div>

            {/* Conditional Bottom UI Elements */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-[500px] flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {!hasClickedEnter ? (
                        <motion.button
                            key="enter-button"
                            onClick={() => setHasClickedEnter(true)}
                            className="px-8 py-4 bg-gray-400/80 backdrop-blur-md rounded-[2rem] text-black font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-xl flex items-center gap-3 cursor-pointer pointer-events-auto"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{
                                y: [0, -6, 0, -3, 0],
                                opacity: 1,
                            }}
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "loop",
                                opacity: { duration: 1, repeat: 0 }
                            }}
                        >
                            ENTER PORTFOLIO
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.button>
                    ) : (
                        <motion.div
                            key="loading-bar"
                            className="w-[85%] flex flex-col items-center gap-3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {/* Professional Progress Info */}
                            <div className="flex justify-between w-full text-white/80 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase mb-1">
                                <span className="opacity-90">{loadingText}</span>
                                <span className="flex items-center gap-2">
                                    {progress === 100 ? (
                                        <span className="text-white">SYSTEM READY</span>
                                    ) : (
                                        <span className="animate-pulse">PROCESSING</span>
                                    )}
                                    <span className="w-12 text-right text-white">{progress}%</span>
                                </span>
                            </div>

                            {/* Sleek Progress Bar Container */}
                            <div className="w-full h-[4px] bg-white/10 relative overflow-hidden flex items-center rounded-full">
                                {/* Sleek Gradient Fill */}
                                <div
                                    className="absolute h-full bg-gradient-to-r from-gray-500 via-gray-100 to-white transition-all duration-75 ease-out rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </motion.div>
    );
};

export default WelcomeScreen;
