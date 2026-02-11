"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function DragInteraction({ onComplete }: { onComplete: () => void }) {
    const [complete, setComplete] = useState(false);

    return (
        <div className="relative w-64 h-32 flex items-center justify-center">
            {/* Target Zone */}
            <div className="absolute right-0 w-16 h-16 border-2 border-dashed border-white/30 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
            </div>

            {/* Draggable Object */}
            <motion.div
                drag
                dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                whileDrag={{ scale: 1.1 }}
                onDragEnd={(e, info) => {
                    // Check if dropped near target (simple distance check or just check x offset)
                    // Target is at right-0. Let's assume standard width container.
                    // Actually, using getBoundingClientRect is safer in real implementation, 
                    // but for this contained example, let's assume if it's dragged far enough right.
                    if (info.point.x > window.innerWidth / 2 + 50) { // Rough estimation based on being centered
                        setComplete(true);
                        onComplete();
                    }

                    // Better logic: use relative offset from start
                    if (info.offset.x > 100) {
                        setComplete(true);
                        onComplete();
                    }
                }}
                className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-lg cursor-grab active:cursor-grabbing z-10"
            />

            {!complete && (
                <span className="absolute bottom-0 text-[10px] text-white/40 uppercase tracking-widest pointer-events-none">
                    Drag to the light
                </span>
            )}
        </div>
    );
}
