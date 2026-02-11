"use client";

import { motion } from "framer-motion";
import { Speaker } from "@/lib/data/dialogue";

interface VisualsManagerProps {
    speaker: Speaker;
    emotion?: string;
}

export default function VisualsManager({ speaker, emotion }: VisualsManagerProps) {
    // Map emotions to gradient classes or colors
    const getGradient = () => {
        switch (emotion) {
            case "sad":
                return "from-slate-900 via-slate-800 to-black";
            case "hopeful":
                return "from-indigo-900 via-purple-900 to-slate-900";
            case "intense":
                return "from-red-900/20 via-slate-900 to-black";
            case "joy":
                return "from-sky-900/40 via-blue-900/20 to-slate-900";
            case "relief":
                return "from-teal-900/30 via-slate-900 to-black";
            default:
                return "from-gray-900 via-slate-950 to-black";
        }
    };

    return (
        <div className="absolute inset-0 z-0">
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${getGradient()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1.5 } }}
                key={emotion} // Triggers animation on change
            />

            {/* Optional: Add particle effects or subtle movement here */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />
        </div>
    );
}
