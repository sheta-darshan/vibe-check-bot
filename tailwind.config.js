/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-purple': '#2D1B69',
        'cyber-charcoal': '#121212',
        'neon-gold': '#FFD700',
        'neon-pink': '#FF00FF',
        'neon-green': '#39FF14',
        'neon-blue': '#00FFFF',
        'neon-purple': '#bf00ff',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
