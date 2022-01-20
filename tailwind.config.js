module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
      },
      fontSize: {
        xxs: "0.65rem",
        tiny: "0.5rem",
      },
      keyframes: {
        rotate: {
          "100%": { transform: "rotate(90deg)" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        grow: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "rotate-forward": "rotate 150ms ease-in-out forwards",
        "rotate-reverse": "rotate 150ms ease-in-out reverse",
        "fade-in": "fade 150ms ease-in-out forwards",
        "fade-out": "fade 150ms ease-in-out reverse",
        grow: "grow 150ms ease-in-out forwards",
        shrink: "grow 150ms ease-in-out reverse",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
