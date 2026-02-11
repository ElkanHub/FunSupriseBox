"use client";

import { motion } from "framer-motion";
import { Speaker } from "@/lib/data/dialogue";

import FloatingShapes from "./FloatingShapes";

interface VisualsManagerProps {
    speaker: Speaker;
    emotion?: string;
}

export default function VisualsManager({ speaker, emotion }: VisualsManagerProps) {
    const getGradient = () => {
        switch (emotion) {
            case "sad":
                return "from-slate-950 via-blue-950 to-black";
            case "hopeful":
                return "from-indigo-950 via-purple-950 to-slate-950";
            case "intense":
                return "from-red-950 via-slate-950 to-black";
            case "joy":
                return "from-sky-950 via-amber-950/20 to-slate-950";
            case "relief":
                return "from-teal-950 via-slate-950 to-black";
            case "curious":
                return "from-emerald-950 via-slate-950 to-black";
            default:
                return "from-gray-950 via-slate-950 to-black";
        }
    };

    return (
        <div className="absolute inset-0 z-0">
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br transition-colors duration-2000 ${getGradient()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                key={emotion}
            />

            <FloatingShapes emotion={emotion} />

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <motion.div
                className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            />
        </div>
    );
}
