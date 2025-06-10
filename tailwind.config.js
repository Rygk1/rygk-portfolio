// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,ts}"], // Ajusta si usas otra estructura
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
