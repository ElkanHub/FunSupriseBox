"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SwipeInteraction({ onComplete }: { onComplete: () => void }) {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [0, 200], [1, 0]);
    const backgroundOpacity = useTransform(x, [0, 200], [0.1, 0.5]);

    return (
        <div className="relative w-64 h-14 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div
                style={{ opacity: backgroundOpacity }}
                className="absolute inset-0 bg-cyan-500/20"
            />

            <motion.div
                className="text-white/30 text-xs uppercase tracking-widest absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ opacity }}
            >
                Swipe to continue
            </motion.div>

            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 200 }}
                dragElastic={0.1}
                dragSnapToOrigin // Snaps back if not completed
                onDragEnd={(e, info) => {
                    if (info.offset.x > 150) {
                        onComplete();
                    }
                }}
                style={{ x }}
                className="absolute left-1 top-1 w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
                <ArrowRight className="text-black w-5 h-5" />
            </motion.div>
        </div>
    );
}
