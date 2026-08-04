/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: ["nativewind/preset"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        secondary: {
          light: '#3B82F6',
          DEFAULT: '#60A5FA',
        },
        alert: '#EF4444',
        success: '#10B981',
      },
    },
  },
  plugins: [],
};
