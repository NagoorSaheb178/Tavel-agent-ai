"use client";

import { motion } from "framer-motion";
import { Brain, Search, Map as MapIcon, Wallet, CheckCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
    { text: "Analyzing user preferences & constraints...", icon: Brain },
    { text: "Searching flight & hotel databases...", icon: Search },
    { text: "Verifying budget feasibility...", icon: Wallet },
    { text: "Optimizing daily route steps...", icon: MapIcon },
    { text: "Polishing final itinerary...", icon: Sparkles },
];

export function AIThinking() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md">
            <div className="flex w-full max-w-md flex-col items-center space-y-10 p-6">

                {/* Central Neural Hub */}
                <div className="relative flex h-32 w-32 items-center justify-center">
                    {/* Outer Rings */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full border border-primary/30"
                            style={{ width: `${(i + 1) * 100}%`, height: `${(i + 1) * 100}%` }}
                            animate={{ rotate: 360, opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                        />
                    ))}

                    {/* Core Pulse */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <Brain className="relative h-16 w-16 text-primary" />

                    {/* Orbiting Particles */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    </motion.div>
                </div>

                {/* Thought Process Log */}
                <div className="w-full space-y-3">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        // Keep completed items visible but dimmed
                        const isCompleted = index !== currentStep; // Simplified for circular logic (or create real progress if needed)

                        return (
                            <motion.div
                                key={index}
                                initial={false}
                                animate={{
                                    opacity: isActive ? 1 : 0.4,
                                    scale: isActive ? 1.02 : 1,
                                    y: isActive ? 0 : 0
                                }}
                                className={cn(
                                    "flex items-center gap-4 rounded-xl border border-white/5 p-4 transition-all",
                                    isActive ? "bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.2)]" : "bg-transparent"
                                )}
                            >
                                <div className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full bg-background border border-white/10",
                                    isActive && "border-primary text-primary"
                                )}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className={cn("text-sm font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                                        {step.text}
                                    </p>
                                    {isActive && (
                                        <motion.div
                                            className="mt-1 h-1 w-full overflow-hidden rounded-full bg-primary/20"
                                        >
                                            <motion.div
                                                className="h-full bg-primary"
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "100%" }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
