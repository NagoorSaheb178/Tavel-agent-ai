"use client";

import { useState } from "react";
import { InputForm } from "@/components/InputForm";
import { AIThinking } from "@/components/AIThinking";
import { ItineraryDisplay } from "@/components/ItineraryDisplay";

import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  const handlePlanTrip = async (data: any) => {
    setIsLoading(true);
    setError("");

    try {
      const { city, days, budget, interests } = data;
      const prompt = `
        ACT AS: Expert Travel Agent.
        GOAL: Create a trip plan for ${city} (${days} days) with budget ₹${budget} & interests: ${interests}.
        
        PROCESS:
        1. PLAN: Create a daily itinerary.
        2. COST: Estimate costs in INR (₹).
        3. OPTIMIZE: If total > ₹${budget}, switch to cheaper hotels/activities to fit budget.
        4. OUTPUT: Return ONLY valid JSON.

        JSON SCHEMA:
        {
          "tripName": "string",
          "totalCost": number,
          "budgetAnalysis": "string",
          "dailyPlan": [
            {
              "day": number,
              "title": "string",
              "activities": [
                { "time": "string", "activity": "string", "cost": number, "description": "string" }
              ]
            }
          ],
          "bookingTips": ["string"]
        }
      `;

      // @ts-ignore
      if (!window.puter) {
        throw new Error("Puter.js is not loaded");
      }

      console.log("Sending request to Puter...");
      // @ts-ignore
      const response = await window.puter.ai.chat(prompt);
      console.log("Raw Puter response:", response);

      // Clean up response if it contains markdown code blocks
      let cleanResponse = response?.message?.content || response?.message || response?.text || response;
      if (typeof cleanResponse === 'object') cleanResponse = JSON.stringify(cleanResponse);

      // Robust JSON extraction: Find the first '{' and the last '}'
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[0];
      }

      console.log("Parsed clean response:", cleanResponse);
      const result = JSON.parse(cleanResponse);
      setPlan(result);
    } catch (e) {
      console.error("Full Error Object:", e);
      setError(`Agent failed: ${e instanceof Error ? e.message : JSON.stringify(e)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden flex flex-col items-center py-10 px-4 md:py-20">
      {/* Background Gradients & Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"></div>

      <AnimatePresence mode="wait">
        {isLoading && <AIThinking key="loading" />}
      </AnimatePresence>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center space-y-12">
        {/* Header (Only show if no plan yet) */}
        {!plan && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/40">
              Travel<span className="text-primary">Agent</span>.ai
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Your personal AI travel concierge. Tell us your dreams, we handle the logistics.
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!plan ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <InputForm onSubmit={handlePlanTrip} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center"
            >
              <ItineraryDisplay plan={plan} />

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setPlan(null)}
                className="mt-12 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-primary hover:text-white"
              >
                Plan Another Trip
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center max-w-md"
          >
            {error}
          </motion.div>
        )}
      </div>
    </main>
  );
}
