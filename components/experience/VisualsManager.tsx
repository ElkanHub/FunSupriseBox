"use client";

import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Speaker } from "@/lib/data/dialogue";
import { cn } from "@/lib/utils";
import FloatingShapes from "./FloatingShapes";

interface VisualsManagerProps {
    speaker: Speaker;
    emotion?: string;
}

const VisualsManager = memo(function VisualsManager({ speaker, emotion }: VisualsManagerProps) {
    const getGradient = () => {
        switch (emotion) {
            case "sad":
                return "from-slate-950 via-blue-950/30 to-black";
            case "hopeful":
                return "from-indigo-950/50 via-purple-950/20 to-slate-950";
            case "intense":
                return "from-red-950/30 via-slate-950 to-black";
            case "joy":
                return "from-sky-950/40 via-amber-950/10 to-slate-950";
            case "relief":
                return "from-teal-950/30 via-slate-950 to-black";
            case "curious":
                return "from-emerald-950/20 via-slate-950 to-black";
            default:
                return "from-gray-950 via-slate-950 to-black";
        }
    };

    const getAccentColor = () => {
        return speaker === "Writer" ? "bg-cyan-500/5" : "bg-amber-500/5";
    };

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={emotion}
                    className={cn(
                        "absolute inset-0 bg-gradient-to-br",
                        getGradient()
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    style={{ willChange: "opacity" }}
                />
            </AnimatePresence>

            <div className={cn("absolute inset-0 transition-colors duration-1000", getAccentColor())} />

            <FloatingShapes emotion={emotion} />

            {/* Modern grain effect */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

            {/* Bottom vignette */}
            <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        </div>
    );
});

export default VisualsManager;
