/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "on-primary-fixed-variant": "#3f465c",
        "primary-fixed": "#dae2fd",
        "on-primary-fixed": "#131b2e",
        "surface-variant": "#e1e3e4",
        "white-pure": "#FFFFFF",
        "outline-variant": "#c6c6cd",
        surface: "#f8f9fa",
        "primary-container": "#131b2e",
        secondary: "#545f73",
        "on-primary-container": "#7c839b",
        "on-surface": "#191c1d",
        "gold-light": "#D4AF37",
        "slate-muted": "#2F454E",
        primary: "#000000",
        error: "#ba1a1a",
        "surface-container": "#edeeef",
        "surface-container-high": "#e1e3e4",
        "surface-container-low": "#f3f4f5",
      },
      maxWidth: {
        "layout-shell": "1280px",
      },
      width: {
        "layout-shell": "89%",
      },
      spacing: {
        "section-gap": "5rem",
        gutter: "1.5rem",
        "margin-mobile": "1.25rem",
        "stack-md": "1rem",
        "stack-sm": "0.5rem",
        "stack-lg": "2rem",
      },
      fontFamily: {
        display: ["PlayfairDisplay_700Bold", "Georgia", "serif"],
        displaySemi: ["PlayfairDisplay_600SemiBold", "Georgia", "serif"],
        body: ["Inter_400Regular", "system-ui", "sans-serif"],
        bodyMedium: ["Inter_500Medium", "system-ui", "sans-serif"],
        bodySemi: ["Inter_600SemiBold", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
      },
    },
  },
  plugins: [],
};
