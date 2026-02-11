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
        <div className="w-full min-h-[200px] flex flex-col justify-center">
            <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "flex flex-col gap-2 max-w-[90%]",
                    isWriter ? "self-start items-start" : "self-end items-end"
                )}
            >
                <span className={cn(
                    "text-xs uppercase tracking-widest opacity-50",
                    isWriter ? "text-cyan-400" : "text-amber-400"
                )}>
                    {segment.speaker}
                </span>

                <p className={cn(
                    "text-xl md:text-3xl font-light leading-relaxed",
                    isWriter ? "text-left text-cyan-50" : "text-right text-amber-50"
                )}>
                    {segment.text}
                </p>
            </motion.div>
        </div>
    );
}
