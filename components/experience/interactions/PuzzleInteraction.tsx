"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function PuzzleInteraction({ onComplete }: { onComplete: () => void }) {
    const [rotation, setRotation] = useState(Math.random() * 360);

    const handleRotate = () => {
        setRotation(prev => {
            const next = prev + 45;
            // Check alignment (allow some margin or snap)
            // Let's say target is 0/360
            if (Math.abs(next % 360) < 5) {
                setTimeout(onComplete, 500);
            }
            return next;
        });
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className="relative w-24 h-24 cursor-pointer"
                onClick={handleRotate}
            >
                {/* Target Outline */}
                <div className="absolute inset-0 border-2 border-white/20 rotate-0 rounded-lg pointer-events-none" />

                {/* Rotatable Piece */}
                <motion.div
                    animate={{ rotate: rotation }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-full h-full bg-gradient-to-tr from-cyan-500/50 to-purple-500/50 rounded-lg border border-white/50 backdrop-blur-sm"
                />
            </div>
            <span className="text-white/40 text-xs uppercase tracking-widest">Align the shape</span>
        </div>
    );
}
