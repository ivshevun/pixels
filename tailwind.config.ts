import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: "#0D0C22"
        },
        gray: {
          400: "#565564"
        },
        yellow: {
          100: "#f8f7f4",
          200: "#f5f3f0"
        },
        purple: {
          950: '#ea64d966'
        }
      },
      screens: {
        "xs": "360px"
      },
      boxShadow: {
        "3xl": "0 0 0 4px rgba(234,100,217,0.1)"
      }
    },
    fontFamily: {
      mona: ["var(--font-mona)"]
    }
  },
  darkMode: "class"
};
export default config;
