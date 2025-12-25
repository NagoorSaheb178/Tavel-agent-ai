# Travel Agent AI 🌍✈️

An intelligent, agentic travel planner built with Next.js that generates personalized travel itineraries while strictly adhering to your budget.

![AI Thinking Demo](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop)

## ✨ Features

- **Agentic AI Workflow**: The AI doesn't just write text; it Plans, Checks costs, and Re-plans if the budget is exceeded.
- **Budget Control**: Strict adherence to your specified budget in **Indian Rupees (₹)**.
- **Smart Itineraries**: Generates day-by-day plans with estimated costs for activities, food, and transport.
- **Visual "Thinking" Process**: Watch the AI analyze, search, and optimize your plan in real-time.
- **Responsive Design**: Premium, mobile-first UI with smooth animations and glassmorphism effects.
- **Client-Side AI**: Powered by **Puter.js**, meaning **NO API KEYS** needed for you to run this!

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Engine**: [Puter.js](https://puter.com/) (Gemini-1.5-Flash under the hood)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

First, clone the repository and install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start planning!

## 💡 How it Works

1.  **Input Details**: Enter your destination, duration, budget (₹), and interests.
2.  **AI Processing**:
    *   **PLAN**: The agent drafts a preliminary itinerary.
    *   **COST**: It estimates costs for every single item.
    *   **OPTIMIZE**: If the draft is over budget, it swaps hotels for hostels, paid tours for walking tours, etc.
3.  **Result**: You get a fully optimized JSON itinerary rendered beautifully on your screen.

## 📱 Screenshots

*(Add your screenshots here)*

## 📄 License

MIT
