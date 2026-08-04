# Color Flood 🎨

A color-flood puzzle game built with React and TypeScript, featuring 200 procedurally structured levels across 20 unique worlds.

## Features
- 🌍 20 worlds with 200 total levels
- ⭐ Star-rating system for each level
- 🛍️ In-game shop
- 💾 Persistent progress with Supabase
- 📱 Responsive, mobile-friendly design

## Tech Stack
- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Backend/Storage:** Supabase
- **Build Tool:** Vite

## How to Play
Flood the entire board with a single color in the fewest moves possible. Tap a color to flood-fill from the starting cell, expanding your territory step by step until the whole board matches.

## Getting Started

Clone the repo and install dependencies:

\`\`\`bash
git clone https://github.com/saimanesh/color-flood-web.git
cd color-flood-web
npm install
npm run dev
\`\`\`

## Project Structure
\`\`\`
src/
├── components/   # Reusable UI components
├── game/         # Core game logic (flood-fill algorithm, level generation, solver)
├── screens/      # App screens (Home, Game, Shop, World Map, etc.)
└── main.tsx      # App entry point
\`\`\`

## Live Demo
[https://color-flood-web.vercel.app]

## Author
Built by [Nangu Manesh Reddy](https://github.com/saimanesh)