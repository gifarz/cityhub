// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: ['8px', '1.5'], // Default for small screens
        base: ['12px', '1.5'], // Default for small screens
        lg: ['18px', '1.6'],  // Larger for medium screens
        xl: ['20px', '1.6'],  // Even larger for large screens
      },
      colors: {
        "primary-bg": "#1B1B1B"
      },
      screens: {
        sm: '640px', // Small devices
        md: '768px', // Medium devices
        lg: '1024px', // Large devices
        xl: '1280px', // Extra large devices
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};