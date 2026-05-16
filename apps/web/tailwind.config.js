/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        panel: "#0a0f0d",
        panel2: "#121615",
        panel3: "#191f1c",
        line: "rgba(255, 255, 255, 0.09)",
        line2: "rgba(255, 255, 255, 0.17)",
        warm: "#ffffff",
        muted: "#9ca09d",
        faint: "#5e6262",
        amber: "#f6a313",
        amber2: "#ffd98a",
        green: "#7affb4",
        cyan: "#55d6ff",
        red: "#ff6b6b"
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        body: ["Manrope", "Inter", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(246,163,19,.18), 0 32px 120px rgba(246,163,19,.10), 0 42px 120px rgba(0,0,0,.72)",
        card: "inset 0 1px 0 rgba(255,255,255,.04), 0 24px 80px rgba(0,0,0,.42)",
        product: "0 0 0 1px rgba(246,163,19,.18), 0 32px 120px rgba(246,163,19,.10), 0 42px 120px rgba(0,0,0,.72)"
      },
      borderRadius: {
        card: "16px",
        product: "26px"
      }
    }
  },
  plugins: []
};
