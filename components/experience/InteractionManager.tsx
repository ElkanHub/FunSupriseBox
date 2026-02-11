"use client";

import { InteractionType } from "@/lib/data/dialogue";
import TapInteraction from "./interactions/TapInteraction";
import HoldInteraction from "./interactions/HoldInteraction";
import DragInteraction from "./interactions/DragInteraction";
import SwipeInteraction from "./interactions/SwipeInteraction";
import RevealInteraction from "./interactions/RevealInteraction";
import TypeInteraction from "./interactions/TypeInteraction";
import CatchInteraction from "./interactions/CatchInteraction";
import PuzzleInteraction from "./interactions/PuzzleInteraction";
import { motion } from "framer-motion";

interface InteractionManagerProps {
    type: InteractionType;
    onComplete: () => void;
}

export default function InteractionManager({ type, onComplete }: InteractionManagerProps) {
    return (
        <motion.div
            key={type}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full flex justify-center py-10"
        >
            {type === "tap" && <TapInteraction onComplete={onComplete} />}
            {type === "hold" && <HoldInteraction onComplete={onComplete} />}
            {type === "drag" && <DragInteraction onComplete={onComplete} />}
            {type === "swipe" && <SwipeInteraction onComplete={onComplete} />}
            {type === "reveal" && <RevealInteraction onComplete={onComplete} />}
            {type === "type" && <TypeInteraction onComplete={onComplete} />}
            {type === "catch" && <CatchInteraction onComplete={onComplete} />}
            {type === "puzzle" && <PuzzleInteraction onComplete={onComplete} />}
        </motion.div>
    );
}
