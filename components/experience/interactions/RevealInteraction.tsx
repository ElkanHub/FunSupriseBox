"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function RevealInteraction({ onComplete }: { onComplete: () => void }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative p-8 cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onComplete}
        >
            <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-all duration-700 rounded-full" />

            <motion.div
                animate={{ opacity: isHovered ? 1 : 0.05, filter: isHovered ? "blur(0px)" : "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="text-white text-lg font-light tracking-widest uppercase"
            >
                I am listening
            </motion.div>
        </div>
    );
}
