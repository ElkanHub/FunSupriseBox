"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CatchInteraction({ onComplete }: { onComplete: () => void }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition({
                x: Math.random() * 200 - 100,
                y: Math.random() * 100 - 50,
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-64 h-32 flex items-center justify-center overflow-hidden">
            <motion.button
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                onClick={onComplete}
                className="w-12 h-12 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)] flex items-center justify-center text-black font-bold text-xs"
            >
                CATCH
            </motion.button>
        </div>
    );
}
