"use client";

import { motion, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";

export default function PuzzleInteraction({ onComplete }: { onComplete: () => void }) {
    const [rotation, setRotation] = useState(0);
    const [isAligned, setIsAligned] = useState(false);

    // Initialize with random rotation in useEffect to avoid hydration/purity issues
    useEffect(() => {
        setRotation(Math.floor(Math.random() * 360));
    }, []);

    const checkAlignment = (currentRotation: number) => {
        const normalized = ((currentRotation % 360) + 360) % 360;
        // Target is 0, allow 10 degree margin for "feel"
        if (normalized < 10 || normalized > 350) {
            setIsAligned(true);
            setTimeout(onComplete, 600);
            return true;
        }
        return false;
    };

    const handleRotate = () => {
        if (isAligned) return;
        setRotation(prev => {
            const next = prev + 45;
            checkAlignment(next);
            return next;
        });
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Target Outline (Ghost) */}
                <div className="absolute inset-0 border-2 border-white/10 rounded-2xl rotate-0 scale-105 pointer-events-none" />

                {/* Glow Effect when aligned */}
                {isAligned && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"
                    />
                )}

                {/* Rotatable Piece */}
                <motion.div
                    animate={{
                        rotate: rotation,
                        scale: isAligned ? 0.9 : 1,
                        borderColor: isAligned ? "rgba(34, 211, 238, 0.8)" : "rgba(255, 255, 255, 0.3)"
                    }}
                    onPan={(_e: any, info: PanInfo) => {
                        if (isAligned) return;
                        // Map horizontal/vertical pan to rotation sensitivity
                        setRotation(prev => prev + info.delta.x + info.delta.y);
                    }}
                    onPanEnd={() => {
                        checkAlignment(rotation);
                    }}
                    onClick={handleRotate}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ cursor: isAligned ? "default" : "grab" }}
                    whileTap={{ cursor: "grabbing", scale: 0.95 }}
                    className={`w-24 h-24 bg-gradient-to-tr ${isAligned ? 'from-cyan-400 to-emerald-400' : 'from-cyan-500/40 to-purple-500/40'} rounded-2xl border backdrop-blur-md shadow-xl flex items-center justify-center transition-colors duration-500`}
                >
                    <div className="w-8 h-1 bg-white/40 rounded-full" />
                </motion.div>
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-medium">
                    {isAligned ? "Perfectly Aligned" : "Drag or Click to Align"}
                </span>
                <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-cyan-400"
                        animate={{ width: isAligned ? "100%" : "0%" }}
                    />
                </div>
            </div>
        </div>
    );
}
