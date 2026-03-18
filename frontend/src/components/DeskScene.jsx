import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, ContactShadows, PresentationControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const Monitor = ({ isOn }) => (
    <group position={[0, 0.5, -0.4]}>
        {/* Screen Frame */}
        <mesh castShadow>
            <boxGeometry args={[1.8, 1.1, 0.05]} />
            <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Screen Display */}
        <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.7, 1.0]} />
            <meshStandardMaterial 
                color={isOn ? "#050505" : "#000"} 
                emissive={isOn ? "#6b46c1" : "#000"} 
                emissiveIntensity={isOn ? 0.5 : 0} 
            />
        </mesh>
        {/* Code on screen - simulation */}
        {isOn && (
            <Html transform position={[0, 0, 0.031]} scale={0.08} speed={1} distanceFactor={1.5}>
                <div className="bg-[#0d1117]/80 p-2 rounded text-[10px] text-green-400 font-mono leading-tight w-48 overflow-hidden select-none pointer-events-none">
                    <div className="text-purple-400">const</div> <div className="text-blue-400">Developer</div> = {"{"} <br />
                    &nbsp;&nbsp;name: <div className="text-orange-400">'Harsh'</div>,<br />
                    &nbsp;&nbsp;role: <div className="text-orange-400">'Full Stack'</div>,<br />
                    &nbsp;&nbsp;skills: [<div className="text-orange-400">'React'</div>, <div className="text-orange-400">'Three'</div>]<br />
                    {"}"};
                </div>
            </Html>
        )}
        {/* Stand */}
        <mesh position={[0, -0.6, 0]}>
            <boxGeometry args={[0.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[0.6, 0.02, 0.4]} />
            <meshStandardMaterial color="#111" />
        </mesh>
    </group>
);

const Speaker = ({ position, isOn }) => (
    <group position={position}>
        <mesh castShadow>
            <boxGeometry args={[0.3, 0.5, 0.3]} />
            <meshStandardMaterial color="#111" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Glowing Rim */}
        <mesh position={[0, 0, 0.155]}>
            <ringGeometry args={[0.08, 0.1, 32]} />
            <meshStandardMaterial 
                color={isOn ? "#6b46c1" : "#222"} 
                emissive={isOn ? "#6b46c1" : "#000"} 
                emissiveIntensity={isOn ? 2 : 0} 
            />
        </mesh>
        <mesh position={[0, -0.1, 0.155]}>
            <ringGeometry args={[0.05, 0.07, 32]} />
            <meshStandardMaterial 
                color={isOn ? "#6b46c1" : "#222"} 
                emissive={isOn ? "#6b46c1" : "#000"} 
                emissiveIntensity={isOn ? 2 : 0} 
            />
        </mesh>
    </group>
);

const PC = ({ isOn }) => (
    <group position={[1.4, 0.45, -0.2]}>
        <mesh castShadow>
            <boxGeometry args={[0.5, 1.0, 0.8]} />
            <meshStandardMaterial color="#151515" roughness={0.1} metalness={0.9} transparent opacity={0.9} />
        </mesh>
        {/* Internal Glow / Fans */}
        <mesh position={[0, 0.25, 0.41]}>
            <ringGeometry args={[0.15, 0.18, 32]} />
            <meshStandardMaterial 
                color={isOn ? "#6b46c1" : "#222"} 
                emissive={isOn ? "#6b46c1" : "#000"} 
                emissiveIntensity={isOn ? 3 : 0} 
            />
        </mesh>
        <mesh position={[0, -0.25, 0.41]}>
            <ringGeometry args={[0.15, 0.18, 32]} />
            <meshStandardMaterial 
                color={isOn ? "#6b46c1" : "#222"} 
                emissive={isOn ? "#6b46c1" : "#000"} 
                emissiveIntensity={isOn ? 3 : 0} 
            />
        </mesh>
        {isOn && <pointLight position={[0, 0.3, 0]} intensity={1} color="#6b46c1" distance={2} />}
    </group>
);

const Lamp = ({ isOn, onToggle }) => (
    <group position={[-1.4, 0.1, 0.2]} rotation={[0, Math.PI / 6, 0]}>
        {/* Base / Switch */}
        <mesh castShadow onClick={(e) => { e.stopPropagation(); onToggle(); }} className="cursor-pointer">
            <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
            <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
        {/* The Actual Switch Button */}
        <mesh position={[0, 0.03, 0]} onClick={(e) => { e.stopPropagation(); onToggle(); }}>
            <boxGeometry args={[0.05, 0.02, 0.05]} />
            <meshStandardMaterial color={isOn ? "#6b46c1" : "#111"} emissive={isOn ? "#6b46c1" : "#000"} emissiveIntensity={1} />
        </mesh>
        
        {/* Stylized Lamp Head (Small) */}
        <group position={[0, 0.8, 0]}>
            <mesh castShadow rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.05, 0.1, 0.2, 32]} rotation={[0, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {isOn && (
                <spotLight 
                    position={[0.1, 0, 0]} 
                    angle={0.6} 
                    penumbra={0.5} 
                    intensity={1.5} 
                    distance={10} 
                    color="#fff" 
                    castShadow
                />
            )}
        </group>
        {/* Simple Arm */}
        <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.02, 0.8, 0.02]} />
            <meshStandardMaterial color="#111" />
        </mesh>
    </group>
);

const DeskScene = () => {
    const [lightOn, setLightOn] = useState(true);

    return (
        <div className="w-full h-full relative">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 1.5, 6.5]} fov={35} far={1000} />
                <ambientLight intensity={lightOn ? 0.4 : 0.05} />
                <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={lightOn ? 1.5 : 0.1} castShadow />
                
                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, -0.2, 0]}
                    polar={[-Math.PI / 12, Math.PI / 12]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                        <group position={[0, -0.4, 0]}>
                            {/* Table Top */}
                            <mesh position={[0, -0.1, 0]} receiveShadow castShadow>
                                <boxGeometry args={[4.5, 0.1, 2.5]} />
                                <meshStandardMaterial color="#1a1a24" roughness={0.3} metalness={0.8} />
                            </mesh>
                            
                            <Monitor isOn={lightOn} />
                            <Speaker position={[-1.2, 0.2, -0.3]} isOn={lightOn} />
                            <Speaker position={[1.2, 0.2, -0.3]} isOn={lightOn} />
                            <PC isOn={lightOn} />
                            <Lamp isOn={lightOn} onToggle={() => setLightOn(!lightOn)} />

                            {/* Keyboard Area */}
                            <mesh position={[0, -0.04, 0.8]}>
                                <boxGeometry args={[1.0, 0.02, 0.3]} />
                                <meshStandardMaterial color="#111" />
                            </mesh>
                        </group>
                    </Float>
                </PresentationControls>

                <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2.5} far={10} color="#000" />
                <Environment preset="city" />
                
                {/* Control Hint */}
                <Html position={[2.5, -1.8, 0]} center>
                    <div className="text-white/20 text-[10px] uppercase tracking-widest pointer-events-none select-none whitespace-nowrap">
                        Click the purple button on the desk to toggle light
                    </div>
                </Html>
            </Canvas>
        </div>
    );
};

export default DeskScene;
