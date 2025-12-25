"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateItinerary(formData: any) {

  const { city, days, budget, interests } = formData;

  const prompt = `
    You are an intelligent Agency Travel Planner with strict budget control capabilities.
    
    CLIENT REQUEST:
    - Destination: ${city}
    - Duration: ${days} days
    - Total Budget: $${budget} (Total for the whole trip including stay, food, activities)
    - Interests: ${interests}
    
    AGENT TASK:
    1. PLAN: Draft a high-quality itinerary covering the highlights.
    2. CHECK: Calculate estimated costs (Accommodation, Food, Transport, Tickets).
    3. RE-PLAN: If the draft exceeds $${budget}, strictly optimize:
       - Suggest cheaper accommodation types (Hostels vs Hotels).
       - Replace paid tours with self-guided walks.
       - Find free alternatives for interests.
    4. FORMAT: Output the FINAL optimized itinerary in JSON.

    REQUIRED JSON STRUCTURE:
    {
      "tripName": "string (Creative title)",
      "totalCost": number,
      "budgetAnalysis": "string (e.g., 'Perfectly within budget' or 'Tight budget, focused on free activities')",
      "dailyPlan": [
        {
          "day": number,
          "title": "string (Day theme)",
          "activities": [
            { 
              "time": "string (e.g. 09:00 AM)", 
              "activity": "string", 
              "cost": number (Estimated cost for this specific item), 
              "description": "string (Brief appealing detail)" 
            }
          ]
        }
      ],
      "bookingTips": ["string", "string"]
    }
  `;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a mock error or rethrow
    throw new Error(`Gemini API Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Debug helper
async function listModels() {
  try {
    // @ts-ignore
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).apiKey;
    // The SDK doesn't expose listModels directly on genAI instance easily in all versions without admin.
    // But we gets 404, implying we can't see it. 
  } catch (e) { }
}

