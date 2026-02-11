"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function ConnectInteraction({ onComplete }: { onComplete: () => void }) {
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Source point (draggable)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Target point (fixed)
    const targetX = 140; // Relative to center
    const targetY = 0;

    const handleDragEnd = () => {
        const currentX = x.get();
        const currentY = y.get();

        // Distance check (within 30px of target)
        const distance = Math.sqrt(
            Math.pow(currentX - targetX, 2) + Math.pow(currentY - targetY, 2)
        );

        if (distance < 30) {
            setIsComplete(true);
            // Snap to target
            x.set(targetX);
            y.set(targetY);
            setTimeout(onComplete, 800);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-80 h-40 flex items-center justify-center select-none"
        >
            {/* Connection Line (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line
                    x1="40"
                    y1="50%"
                    x2={useTransform(x, (v: number) => v + 160)} // Adjust based on center origin
                    y2={useTransform(y, (v: number) => v + 80)}
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="opacity-20"
                />

                {/* Completed Line */}
                {isComplete && (
                    <motion.line
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        x1="160" // Center
                        y1="80"
                        x2={160 + targetX}
                        y2={80 + targetY}
                        stroke="rgba(34, 211, 238, 0.6)"
                        strokeWidth="2"
                    />
                )}
            </svg>

            {/* Target Dot */}
            <div
                style={{ transform: `translate(${targetX}px, ${targetY}px)` }}
                className="absolute w-6 h-6 rounded-full border border-white/20 flex items-center justify-center"
            >
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isComplete ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-white/20'}`} />
            </div>

            {/* Source Dot (Draggable) */}
            <motion.div
                drag
                dragConstraints={containerRef}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                style={{ x, y }}
                animate={isComplete ? { scale: 0.8, opacity: 0.5 } : { scale: 1 }}
                className={`z-10 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center cursor-grab active:cursor-grabbing backdrop-blur-sm transition-colors duration-300 ${isComplete ? 'bg-cyan-500/40 border-cyan-400' : 'bg-white/5 hover:bg-white/10'}`}
            >
                <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-white' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'}`} />
            </motion.div>

            <div className="absolute -bottom-8 left-0 w-full text-center">
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                    {isComplete ? "Connection Restored" : "Bridge the gap"}
                </span>
            </div>
        </div>
    );
}
