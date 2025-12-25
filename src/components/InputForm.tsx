import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Calendar, Wallet, Heart, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputFormProps {
    onSubmit: (data: any) => void;
    isLoading: boolean;
}

const TRENDING_INTERESTS = [
    "Hidden Gems", "Culinary Tours", "Eco-Tourism", "Adventure Sports",
    "Historical Sites", "Wellness & Spa", "Nightlife", "Photography",
    "Local Culture", "Shopping", "Art & Museums", "Nature Walks"
];

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [customInterest, setCustomInterest] = useState("");

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(prev => prev.filter(i => i !== interest));
        } else {
            // User requested no limit (implied by removing "Select up to 5" text)
            setSelectedInterests(prev => [...prev, interest]);
        }
    };

    const addCustomInterest = (e: React.KeyboardEvent | React.MouseEvent) => {
        if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
            if (selectedInterests.length < 5) {
                setSelectedInterests(prev => [...prev, customInterest.trim()]);
                setCustomInterest("");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        // Override interests with the selected array
        data.interests = selectedInterests.join(", ");
        onSubmit(data);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl"
        >
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Plan Your Journey</h2>
                <p className="text-muted-foreground">Let our Agentic AI craft your perfect itinerary.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-white/80">
                        <Plane className="h-4 w-4 text-primary" /> Destination
                    </label>
                    <input
                        name="city" required placeholder="Where do you want to go?"
                        className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white placeholder:text-white/20 transition-all focus:border-primary/50 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-white/80">
                            <Calendar className="h-4 w-4 text-primary" /> Duration (Days)
                        </label>
                        <input
                            name="days" type="number" required min="1" max="14" placeholder="e.g. 5"
                            className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white placeholder:text-white/20 transition-all focus:border-primary/50 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-primary/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-white/80">
                            <Wallet className="h-4 w-4 text-primary" /> Budget (₹)
                        </label>
                        <input
                            name="budget" type="number" required min="1000" placeholder="e.g. 50000"
                            className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-white placeholder:text-white/20 transition-all focus:border-primary/50 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-primary/50"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-white/80">
                        <Heart className="h-4 w-4 text-primary" /> Interests
                    </label>

                    {/* Hidden input to pass validation and form data */}
                    <input
                        type="hidden"
                        name="interests"
                        value={selectedInterests.join(", ")}
                        required
                    />

                    {/* Chips Display */}
                    <div className="flex flex-wrap gap-2">
                        {TRENDING_INTERESTS.map((interest) => (
                            <button
                                key={interest}
                                type="button"
                                onClick={() => toggleInterest(interest)}
                                className={cn(
                                    "rounded-full px-3 py-1 text-xs font-medium transition-all border",
                                    selectedInterests.includes(interest)
                                        ? "bg-primary text-white border-primary shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                                        : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/20 hover:text-white"
                                )}
                            >
                                {interest}
                            </button>
                        ))}
                    </div>

                    {/* Custom Input */}
                    <div className="relative flex items-center gap-2">
                        <input
                            value={customInterest}
                            onChange={(e) => setCustomInterest(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomInterest(e))}
                            placeholder="Add custom interest..."
                            className="flex-1 rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white placeholder:text-white/20 focus:border-primary/50 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={addCustomInterest}
                            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Selected Tags Display */}
                    <AnimatePresence>
                        {selectedInterests.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex flex-wrap gap-2 pt-2"
                            >
                                {selectedInterests.map(tag => (
                                    <motion.span
                                        key={tag}
                                        layout
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="flex items-center gap-1 rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-primary border border-primary/20"
                                    >
                                        {tag}
                                        <button type="button" onClick={() => toggleInterest(tag)} className="hover:text-white"><X className="h-3 w-3" /></button>
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {selectedInterests.length === 0 && (
                        <p className="text-xs text-red-400 font-medium ml-1">* Please select at least one interest</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading || selectedInterests.length === 0}
                    className="group relative w-full overflow-hidden rounded-xl bg-primary py-4 font-bold text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? "Starting Agent..." : "Generate Itinerary"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>
            </form>
        </motion.div>
    );
}
