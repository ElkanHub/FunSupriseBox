"use client";

import { motion } from "framer-motion";
import { DialogueSegment } from "@/lib/data/dialogue";
import { cn } from "@/lib/utils";

interface DialogueRendererProps {
    segment: DialogueSegment;
}

export default function DialogueRenderer({ segment }: DialogueRendererProps) {
    const isWriter = segment.speaker === "Writer";

    return (
        <div className="w-full flex flex-col justify-center min-h-[30vh]">
            <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "flex flex-col gap-3 w-full",
                    isWriter ? "self-start items-start" : "self-end items-end"
                )}
            >
                <div className={cn(
                    "flex flex-col max-w-[90%] w-full rounded-2xl p-6 border",
                    "will-change-transform", // Hint for scale animation
                    isWriter
                        ? "bg-cyan-950/40 border-cyan-500/20 shadow-[0_0_40px_-15px_rgba(6,182,212,0.3)]"
                        : "bg-amber-950/40 border-amber-500/20 shadow-[0_0_40px_-15px_rgba(245,158,11,0.3)]"
                )}>
                    <span className={cn(
                        "text-[10px] uppercase tracking-[0.3em] font-semibold mb-2 block",
                        isWriter ? "text-cyan-400" : "text-amber-400"
                    )}>
                        {segment.speaker}
                    </span>

                    <div className="max-h-[50vh] overflow-y-auto scrollbar-hide pr-2">
                        <p className={cn(
                            "text-xl md:text-2xl font-light leading-relaxed tracking-wide",
                            isWriter ? "text-left text-cyan-50" : "text-right text-amber-50"
                        )}>
                            {segment.text}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
