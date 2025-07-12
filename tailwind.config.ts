import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "foreground-secondary": "hsl(var(--foreground-secondary))",
        "foreground-tertiary": "hsl(var(--foreground-tertiary))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        // Brand colors
        brand: {
          primary: "hsl(var(--brand-primary))"
        },
        // World-specific colors
        disco: {
          primary: "hsl(var(--disco-primary))",
          secondary: "hsl(var(--disco-secondary))",
          danger: "hsl(var(--disco-danger))",
          warning: "hsl(var(--disco-warning))",
          classified: "hsl(var(--disco-classified))"
        },
        nostalgia: {
          primary: "hsl(var(--nostalgia-primary))",
          secondary: "hsl(var(--nostalgia-secondary))",
          accent: "hsl(var(--nostalgia-accent))",
          heartbreak: "hsl(var(--nostalgia-heartbreak))"
        },
        rolemodel: {
          primary: "hsl(var(--rolemodel-primary))",
          secondary: "hsl(var(--rolemodel-secondary))",
          chaos: "hsl(var(--rolemodel-chaos))"
        },
        elevation: {
          primary: "hsl(var(--elevation-primary))",
          secondary: "hsl(var(--elevation-secondary))",
          ascend: "hsl(var(--elevation-ascend))"
        },
        // Semantic world colors
        world: {
          primary: "hsl(var(--world-primary))",
          secondary: "hsl(var(--world-secondary))",
          accent: "hsl(var(--world-accent))"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [animatePlugin]
};

export default config;
