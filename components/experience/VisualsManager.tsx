"use client";

import { motion } from "framer-motion";
import { Speaker } from "@/lib/data/dialogue";
import { cn } from "@/lib/utils";
import FloatingShapes from "./FloatingShapes";

interface VisualsManagerProps {
    speaker: Speaker;
    emotion?: string;
}

export default function VisualsManager({ speaker, emotion }: VisualsManagerProps) {
    const getGradient = () => {
        switch (emotion) {
            case "sad":
                return "from-slate-950 via-blue-950/40 to-black";
            case "hopeful":
                return "from-indigo-950 via-purple-950/30 to-slate-950";
            case "intense":
                return "from-red-950/40 via-slate-950 to-black";
            case "joy":
                return "from-sky-950 via-amber-950/20 to-slate-950";
            case "relief":
                return "from-teal-950/40 via-slate-950 to-black";
            case "curious":
                return "from-emerald-950/30 via-slate-950 to-black";
            default:
                return "from-gray-950 via-slate-950 to-black";
        }
    };

    const getAccentColor = () => {
        return speaker === "Writer" ? "bg-cyan-500/5" : "bg-amber-500/5";
    };

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br transition-colors duration-3000 ease-in-out ${getGradient()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
                key={emotion}
            />

            <div className={cn("absolute inset-0 transition-colors duration-2000", getAccentColor())} />

            <FloatingShapes emotion={emotion} />

            {/* Modern grain effect */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* Bottom vignette for cinematic feel */}
            <motion.div
                className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-black via-black/40 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
            />
        </div>
    );
}
