import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      boxShadow: {
        basic: "-6px 8px 18px 0px rgba(0, 0, 0, 0.40);",
        div: "-6px 8px 18px 0px rgba(0, 0, 0, 0.20);",
        navbar: "0px 3px 10px -2px rgba(0, 0, 0, 0.38)",
      },
      colors: {
        yellow: "#b7ae47",
        black: "#1F1F29",
        bk_txt: "#1A1313",
        bg_menu: "#e0c133",
        bg_white: "#F5F5FA",
        subMenu: "#efefe3",
        gold: "#e0c133",
        text_color: "#59594b",
        titleHome_color: "#60605d",
        title_color: "#3f3f3b",
        separator: "#bbbb57",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

