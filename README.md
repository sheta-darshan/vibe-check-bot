# 🤖 The 2026 Vibe-Check Bot

**"Auditing your delusions since 2024."**

![Vibe Check Bot Banner](https://img.shields.io/badge/Vibe_Check-PASSED-neon_green?style=for-the-badge) ![Reality-Score](https://img.shields.io/badge/Reality_Score-Unknown-purple?style=for-the-badge)

## 📜 Overview

The **2026 Vibe-Check Bot** is a high-tech, satirical reality auditing tool built to analyze your New Year's resolutions and life goals. It determines if you are **Achievable**, **Optimistic**, or completely **Delusional**.

Powered by a sophisticated "Reality Engine" (and a bit of math), it serves harsh roasts, reality scores, and detailed receipts for your "Paper Trail."

## ✨ Features

- **🚀 Reality Engine 3.0**: Advanced logic tailored for 2026 to detect "main character energy" and "hustle culture" delusions.
- **💬 Brutal Roasts**: Generates specific feedback based on your input (e.g., quitting sugar, becoming a billionaire, learning Rust).
- **📸 Evidence Generation**:
    - **Holographic Receipt**: Visual proof of your audit.
    - **Paper Trail mode**: For those who prefer the old-school look.
    - **Download & Share**: Expose yourself to the world with one click.
- **🕶️ Matrix Mode**: Triggered by secret keywords (try typing "matrix").
- **🔊 Immersive Audio**: SFX for typing, success, and reality checks.
- **🎞️ History Tape**: Keeps a scrolling record of all your past delusions.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) (v19) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Neon Utilities
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utils**: `html2canvas` for screenshot generation, `canvas-confetti` for celebrations.
- **Testing**: Vitest

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/vibe-check-bot.git
    cd vibe-check-bot
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit `http://localhost:5173` (or the port shown in your terminal).

## 🧪 Running Tests

To verify the Reality Engine logic:

```bash
npm test
```

## 📂 Project Structure

- `src/components`: UI components (ResultCard, Header, HistoryTape).
- `src/utils`: The brains of the operation.
    - `realityEngine.js`: Core logic for determining delusion levels.
    - `scoringEngine.js`: Calculates the breakdown of your score.
    - `contentEngine.js`: Database of roasts and forecasts.
- `src/hooks`: Custom hooks (like `useInternalAudio`).

## 🤝 Contributing

Feel free to submit a PR if you have a new delusion to add to the database or a feature that makes the roast even harder.

## 📄 License

MIT. Use this responsibly. Don't let the bot hurt your feelings too much.
