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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "foreground-secondary": "var(--foreground-secondary)",
        "foreground-tertiary": "var(--foreground-tertiary)",
        "foreground-quaternary": "var(--foreground-quaternary)",
        "background-elevated-1": "var(--background-elevated-1)",
        "background-elevated-2": "var(--background-elevated-2)",
        "background-elevated-3": "var(--background-elevated-3)",
        primary: {
          DEFAULT: "var(--brand-primary)",
          foreground: "var(--background)"
        },
        // Brand colors
        brand: {
          primary: "var(--brand-primary)"
        },
        // World-specific colors
        disco: {
          primary: "var(--disco-primary)",
          secondary: "var(--disco-secondary)",
          danger: "var(--disco-danger)",
          classified: "var(--disco-classified)",
          glitch: "var(--disco-glitch)"
        },
        nostalgia: {
          primary: "var(--nostalgia-primary)",
          secondary: "var(--nostalgia-secondary)",
          heartbreak: "var(--nostalgia-heartbreak)",
          memory: "var(--nostalgia-memory)",
          tear: "var(--nostalgia-tear)"
        },
        rolemodel: {
          primary: "var(--rolemodel-primary)",
          secondary: "var(--rolemodel-secondary)",
          chaos: "var(--rolemodel-chaos)",
          unhinged: "var(--rolemodel-unhinged)",
          coffee: "var(--rolemodel-coffee)"
        },
        elevation: {
          primary: "var(--elevation-primary)",
          secondary: "var(--elevation-secondary)",
          ascend: "var(--elevation-ascend)",
          gravity: "var(--elevation-gravity)",
          purist: "var(--elevation-purist)"
        },
        // Semantic world colors
        world: {
          primary: "var(--world-primary)",
          secondary: "var(--world-secondary)",
          accent: "var(--world-accent)"
        },
        destructive: "var(--destructive)",
        success: "var(--success)"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in-up 0.5s ease-out',
        'glitch-reality': 'glitch-reality 0.8s infinite',
        'emotional-heartbeat': 'emotional-heartbeat 2s infinite',
        'memory-float': 'memory-float 4s ease-in-out infinite',
        'chaos-explosion': 'chaos-explosion 1s infinite',
        'elevation-float': 'elevation-float 3s ease-in-out infinite',
        'cinematic-pulse': 'cinematic-pulse 4s ease-in-out infinite',
        'spring-bounce': 'spring-bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }
    }
  },
  plugins: [animatePlugin]
};

export default config;
