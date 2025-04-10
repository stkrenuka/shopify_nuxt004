/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      animation: {
        pulseCustom: "pulseCustom 2.5s infinite",  // Updated to use custom keyframe name
      },
      keyframes: {
        pulseCustom: {  // Renamed to pulseCustom to avoid conflicts
          "0%": { transform: "scale(0.9)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.9)" },
        },
      },
    },
  },
  plugins: [],
};
