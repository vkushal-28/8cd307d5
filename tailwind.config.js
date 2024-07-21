/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        bl: "#131430",
        bgDark: "#0d0d0d",
        bgLightGreen: "#ecfbf4",
        bgLightGreenTwo: "#ccf2db",
        bgLightGreenThree: "#acebce",
        bgGry: "#e4ecef",

        drkGrnTwo: "#1cae81",
        drkGrn: "#1c8a6f",
        yellowGreen: "#d3ecb3",
        bgPrakey: "#ebfbf8",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        gradient: "gradient 4s ease infinite",
      },
    },
  },

  plugins: [],
};
