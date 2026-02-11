"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingShapesProps {
    emotion?: string;
}

export default function FloatingShapes({ emotion }: FloatingShapesProps) {
    const shapes = useMemo(() => {
        // Reduced from 15 to 8 for better performance on mobile
        const count = 8;
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 60 + 30, // Slightly larger average for less overlap
            duration: Math.random() * 25 + 15, // Slower is cheaper
            delay: Math.random() * 5,
            type: Math.random() > 0.5 ? "circle" : "blob",
        }));
    }, []);

    const getShapeStyles = () => {
        // Optimized blurs: standardizing and reducing intensity
        switch (emotion) {
            case "sad":
                return "fill-blue-500/10 blur-xl";
            case "hopeful":
                return "fill-purple-500/10 blur-xl";
            case "intense":
                return "fill-red-500/10 blur-xl";
            case "joy":
                return "fill-yellow-400/10 blur-lg";
            case "curious":
                return "fill-emerald-400/10 blur-xl";
            default:
                return "fill-cyan-500/10 blur-xl";
        }
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className="absolute"
                    style={{
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        willChange: "transform", // Hint to GPU
                    }}
                    animate={{
                        y: [0, -60, 0],
                        x: [0, 40, 0],
                        opacity: [0.3, 0.6, 0.3], // Simpler opacity animation instead of rotate/scale for perf
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        delay: shape.delay,
                        ease: "easeInOut",
                    }}
                >
                    <svg
                        width={shape.size}
                        height={shape.size}
                        viewBox="0 0 100 100"
                        className={getShapeStyles()}
                    >
                        {shape.type === "circle" ? (
                            <circle cx="50" cy="50" r="40" />
                        ) : (
                            <path d="M50 10 Q90 10 90 50 T50 90 T10 50 T50 10" />
                        )}
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
