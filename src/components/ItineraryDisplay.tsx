"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, MapPin } from "lucide-react";

export function ItineraryDisplay({ plan }: { plan: any }) {
    if (!plan) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl space-y-8 p-4"
        >
            {/* Overview Card */}
            <motion.div
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl"
                whileHover={{ scale: 1.01 }}
            >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <motion.h1
                            className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        >
                            {plan.tripName}
                        </motion.h1>
                        <div className="mt-2 inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                            {plan.budgetAnalysis}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">Estimated Cost</p>
                        <p className="text-4xl font-bold text-emerald-400 drop-shadow-sm">₹{plan.totalCost.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-0">
                {plan.dailyPlan.map((day: any, index: number) => (
                    <div key={day.day} className="relative pl-6 md:pl-10 py-6 first:pt-0 last:pb-0">
                        {/* Timeline Line */}
                        <div className="absolute left-[7px] md:left-[9px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

                        {/* Timeline Dot */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="absolute left-0 top-8 h-4 w-4 md:h-5 md:w-5 rounded-full border-4 border-background bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                        />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 className="mb-6 text-xl md:text-2xl font-bold text-white flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                                <span className="text-primary/80">Day {day.day}</span>
                                <span className="hidden md:inline text-lg font-normal text-muted-foreground">|</span>
                                <span>{day.title}</span>
                            </h3>

                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                                {day.activities.map((act: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="group relative overflow-hidden rounded-xl bg-black/40 border border-white/5 p-4 md:p-5 transition-all hover:border-primary/40 hover:bg-black/60"
                                    >
                                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <MapPin className="h-10 w-10 md:h-12 md:w-12 text-primary" />
                                        </div>

                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                                                <Clock className="h-3 w-3" /> {act.time}
                                            </div>
                                            <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">
                                                {/* Replaced DollarSign with IndianRupee if available, or just text. 
                                                    Using hardcoded symbol for safety as Lucide might not have IndianRupee in all versions 
                                                    or user wants ONLY the symbol. 
                                                    Actually better to just remove the icon if we have the symbol in text, 
                                                    OR use the IndianRupee icon if imported. 
                                                    Let's use Banknote or generic, but the user said "indian rupee symbol ONLY".
                                                    So I will remove the icon and just keep the text symbol.
                                                */}
                                                {act.cost === 0 ? "Free" : `₹${act.cost.toLocaleString('en-IN')}`}
                                            </div>
                                        </div>
                                        <h4 className="font-semibold text-white text-lg mb-2">{act.activity}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{act.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Tips */}
            {plan.bookingTips && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="rounded-xl bg-gradient-to-br from-primary/10 to-transparent p-6 border border-primary/20 backdrop-blur-sm"
                >
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">i</span>
                        Agent Notes & Recommendations
                    </h4>
                    <ul className="grid gap-2 sm:grid-cols-2">
                        {plan.bookingTips.map((tip: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.div>
    );
}
