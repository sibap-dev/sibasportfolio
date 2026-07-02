/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-card': '#0d0d0d',
        'neon-cyan': '#00F0FF',
        'electric-purple': '#B026FF',
        'neon-pink': '#FF2D95',
        'neon-green': '#39FF14',
      },
      animation: {
        blob: "blob 7s infinite",
        gradient: "gradient 3s ease infinite",
        pulse: "pulse 2s ease-in-out infinite",
        'spin-slow': "spin 8s linear infinite",
        'spin-reverse': "spin-reverse 12s linear infinite",
        float: "floaty 6s ease-in-out infinite",
        'glow-pulse': "glow-pulse 3s ease-in-out infinite",
        'shimmer': "shimmer 3s ease-in-out infinite",
        'border-glow': "border-glow 3s ease-in-out infinite",
        'fade-in-up': "fadeInUp 0.7s ease-out forwards",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        'spin-reverse': {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        'border-glow': {
          "0%, 100%": { borderColor: "rgba(0, 240, 255, 0.3)" },
          "50%": { borderColor: "rgba(176, 38, 255, 0.5)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
