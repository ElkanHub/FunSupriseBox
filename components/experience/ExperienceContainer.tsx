"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { dialogueData } from "@/lib/data/dialogue";
import { introYes, introNo } from "@/lib/data/introDialogue";
import DialogueRenderer from "./DialogueRenderer";
import InteractionManager from "./InteractionManager";
import VisualsManager from "./VisualsManager";
import { Button } from "@/components/ui/button";

export default function ExperienceContainer() {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasAcknowledgedTitle, setHasAcknowledgedTitle] = useState(false);
    const [introSelection, setIntroSelection] = useState<"yes" | "no" | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isEnded, setIsEnded] = useState(false);

    // Merge dialogue based on selection
    const fullDialogue = useMemo(() => {
        if (!introSelection) return dialogueData;
        const intro = introSelection === "yes" ? introYes : introNo;
        return [...intro, ...dialogueData];
    }, [introSelection]);

    const currentSegment = fullDialogue[currentIndex];

    const handleStartQuestion = (selection: "yes" | "no") => {
        setIntroSelection(selection);
        setHasStarted(true);
    };

    const handleAcknowledgeTitle = () => {
        setHasAcknowledgedTitle(true);
    };

    const handleNext = () => {
        if (currentIndex < fullDialogue.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setIsEnded(true);
        }
    };

    if (isEnded) {
        return <EndingSequence />;
    }

    if (!hasStarted) {
        return <IntroSequence onStart={handleStartQuestion} />;
    }

    if (!hasAcknowledgedTitle) {
        return <TitleSettingScreen onBegin={handleAcknowledgeTitle} />;
    }

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
            <VisualsManager
                speaker={currentSegment.speaker}
                emotion={currentSegment.emotion}
            />

            <div className="z-10 w-full max-w-md px-6 flex flex-col items-center gap-8">
                <DialogueRenderer
                    segment={currentSegment}
                />

                <InteractionManager
                    type={currentSegment.interactionType}
                    onComplete={handleNext}
                />
            </div>
        </div>
    );
}

function TitleSettingScreen({ onBegin }: { onBegin: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-12 p-8 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-6xl font-thin tracking-[0.3em] uppercase text-cyan-500">
                    The Unspoken Void
                </h1>
                <p className="text-sm md:text-base font-light tracking-widest text-slate-400 uppercase">
                    Setting: A digital whisper between worlds
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="space-y-6 flex flex-col items-center"
            >
                <div className="w-12 h-[1px] bg-slate-700" />
                <p className="text-xl font-extralight italic text-slate-300 max-w-sm">
                    Welcome... prepare to read a story that wasn't meant for eyes to see.
                </p>
                <Button
                    onClick={onBegin}
                    variant="ghost"
                    className="mt-8 border border-white/20 hover:bg-white hover:text-black transition-all duration-500 px-8 py-6 rounded-none tracking-widest uppercase text-xs"
                >
                    Enter the Void
                </Button>
            </motion.div>
        </div>
    );
}

function IntroSequence({ onStart }: { onStart: (selection: "yes" | "no") => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-8 animate-in fade-in duration-1000">
            <h1 className="text-2xl font-light tracking-widest text-center px-4">Have you had your own website before?</h1>
            <div className="flex gap-4">
                <Button
                    variant="outline"
                    className="text-black border-white hover:bg-white hover:text-black transition-colors"
                    onClick={() => onStart("yes")}
                >
                    Yes
                </Button>
                <Button
                    variant="outline"
                    className="text-black border-white hover:bg-white hover:text-black transition-colors"
                    onClick={() => onStart("no")}
                >
                    No
                </Button>
            </div>
        </div>
    )
}

function EndingSequence() {
    const [timeLeft, setTimeLeft] = useState(10);
    const [exploded, setExploded] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setExploded(true);
        }
    }, [timeLeft]);

    if (exploded) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }} // Fast flash
                    className="absolute inset-0 bg-white"
                    onAnimationComplete={() => console.log("flashed")}
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                    className="text-white font-thin text-sm tracking-[0.5em] z-10"
                >
                    Goodbye.
                </motion.div>
            </div>
        )
    }

    return (
        <div className="h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center gap-8 overflow-hidden">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-light leading-relaxed max-w-lg"
            >
                Hope you enjoyed it… I was just feeling a bit bored and seeing your message, I had the idea to do this bit for you. I’ll be taking it down after some time because it costs to keep this page up. Unless maybe you learn to code, then I can let you have it and maintain it yourself… 😏
                <br /><br />
                Anyways, let me know what you think about this and we will talk more… later…
            </motion.p>

            <motion.div
                key={timeLeft}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    x: timeLeft <= 3 ? [0, -10, 10, -10, 10, 0] : 0 // Shake effect
                }}
                transition={{ duration: 0.5 }}
                className="text-6xl font-bold text-red-500 font-mono"
            >
                00:{timeLeft.toString().padStart(2, '0')}
            </motion.div>
        </div>
    )
}
