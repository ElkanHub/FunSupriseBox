"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingShapesProps {
    emotion?: string;
}

export default function FloatingShapes({ emotion }: FloatingShapesProps) {
    const shapes = useMemo(() => {
        const count = 12;
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 40 + 10,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            type: Math.random() > 0.5 ? "circle" : "poly",
        }));
    }, []);

    const getColor = () => {
        switch (emotion) {
            case "sad": return "fill-blue-500/10";
            case "hopeful": return "fill-purple-500/10";
            case "intense": return "fill-red-500/10";
            case "joy": return "fill-yellow-500/10";
            default: return "fill-cyan-500/10";
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
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.1, 1],
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
                        className={getColor()}
                    >
                        {shape.type === "circle" ? (
                            <circle cx="50" cy="50" r="40" />
                        ) : (
                            <path d="M50 10 L90 90 L10 90 Z" />
                        )}
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
