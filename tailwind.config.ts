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
      extend: {
        typography: (theme: (path: string) => string | undefined) => ({
          DEFAULT: {
            css: {
              "ul, ol": {
                paddingLeft: theme("spacing.6"),
              },
              li: {
                marginBottom: theme("spacing.2"),
              },
            },
          },
        }),
      },
      screens: {
        "3xl": "1600px",
      },
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "16px",
      },
      boxShadow: {
        basic: "-6px 8px 18px 0px rgba(0, 0, 0, 0.40);",
        div: "-6px 8px 18px 0px rgba(0, 0, 0, 0.20);",
        navbar: "0px 3px 10px -2px rgba(0, 0, 0, 0.38)",
      },
      colors: {
        yellow: "#bbbb57",
        black: "#1F1F29",
        bk_txt: "#1A1313",
        bg_menu: "#e0c133",
        bg_white: "#ffffff",
        subMenu: "#f8f5f0",
        gold: "#e0c133",
        text_color: "#59594b",
        titleHome_color: "#60605d",
        title_color: "#3f3f3b",
        separator: "#bbbb57",
      },
      backgroundImage: {
        gradient_about: " linear-gradient(-50deg, #ffffff 20%, #bbbb57 130%);",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;

