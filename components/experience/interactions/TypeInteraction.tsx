"use client";

import { useState, useEffect } from "react";

export default function TypeInteraction({ onComplete }: { onComplete: () => void }) {
    const targetWord = "connect";
    const [input, setInput] = useState("");

    useEffect(() => {
        if (input.toLowerCase() === targetWord) {
            onComplete();
        }
    }, [input, onComplete]);

    return (
        <div className="flex flex-col items-center gap-4">
            <span className="text-white/40 text-xs uppercase tracking-widest">Type &quot;{targetWord}&quot;</span>
            <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-b border-white/30 text-center text-white text-2xl outline-none focus:border-cyan-400 py-2 w-48 font-light"
            />
        </div>
    );
}
