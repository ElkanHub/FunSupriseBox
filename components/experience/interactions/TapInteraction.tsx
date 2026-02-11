"use client";

import { motion } from "framer-motion";

export default function TapInteraction({ onComplete }: { onComplete: () => void }) {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onComplete}
            className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white tracking-widest uppercase text-sm hover:bg-white/20 transition-all"
        >
            Continue
        </motion.button>
    );
}
