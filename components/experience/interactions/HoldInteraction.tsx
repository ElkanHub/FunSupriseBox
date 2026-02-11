"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function HoldInteraction({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const controls = useAnimation();

    const handlePointerDown = async () => {
        controls.start({
            scale: 1.2,
            transition: { duration: 2, ease: "linear" }
        });

        // Animate progress manually or via state?
        // Let's use a timeout for simplicity combined with visual feedback
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 2; // 50 * 20ms = 1000ms = 1s... actually let's aim for 2s
            // 2s = 2000ms. 2000 / 20 = 100 intervals. 100 * 1 = 100%
            // So increment by 1 every 20ms

            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    onComplete();
                    return 100;
                }
                return prev + 1.5;
            });
        }, 20);

        // Store interval ID in a way to clear it on up? 
        // Simpler: use a ref or just rely on react state updates stopping if component unmounts (but we need to stop on release)
        // Actually, let's use a ref for the interval in a real app, but for this snippet:
        (window as any).holdInterval = interval;
    };

    const handlePointerUp = () => {
        controls.stop();
        controls.start({ scale: 1 });
        clearInterval((window as any).holdInterval);
        setProgress(0);
    };

    return (
        <div className="relative flex flex-col items-center gap-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Progress Ring */}
                <svg className="absolute w-full h-full -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r="46"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-white/20"
                    />
                    <circle
                        cx="48"
                        cy="48"
                        r="46"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-cyan-400 Transition-all duration-75 ease-linear"
                        strokeDasharray="289"
                        strokeDashoffset={289 - (289 * progress) / 100}
                    />
                </svg>

                <motion.button
                    animate={controls}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-xs text-white uppercase tracking-wider select-none will-change-transform"
                >
                    Hold
                </motion.button>
            </div>
            <span className="text-white/50 text-[10px] tracking-widest uppercase">Hold to proceed</span>
        </div>
    );
}
