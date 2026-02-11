"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingShapesProps {
    emotion?: string;
}

export default function FloatingShapes({ emotion }: FloatingShapesProps) {
    const shapes = useMemo(() => {
        const count = 15;
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 60 + 20,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
            type: Math.random() > 0.5 ? "circle" : "blob",
        }));
    }, []);

    const getShapeStyles = () => {
        switch (emotion) {
            case "sad":
                return "fill-blue-500/10 blur-xl";
            case "hopeful":
                return "fill-purple-500/10 blur-lg";
            case "intense":
                return "fill-red-500/15 blur-2xl animate-pulse";
            case "joy":
                return "fill-yellow-400/10 blur-md";
            case "curious":
                return "fill-emerald-400/10 blur-lg";
            default:
                return "fill-cyan-500/10 blur-xl";
        }
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className="absolute"
                    style={{
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 50, 0],
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
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
