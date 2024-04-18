import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        ...fontFamily,
        sans: ["var(--font-sans)", { fontFeatureSettings: '"ss01", "liga" 1' }],
        serif: [
          "var(--font-serif)",
          { fontFeatureSettings: '"ss01", "liga" 1' },
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        tada: {
          "from, to": { transform: "scale3d(1, 1, 1)" },
          "10%, 20%": {
            transform: "scale3d(0.97, 0.97, 0.97) rotate3d(0, 0, 1, -1.5deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.03, 1.03, 1.03) rotate3d(0, 0, 1, 1.5deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale3d(1.03, 1.03, 1.03) rotate3d(0, 0, 1, -1.5deg)",
          },
        },
        "head-shake": {
          "0%": {
            transform: "translateX(0)",
          },
          "6.5%": {
            transform: "translateX(-3px) rotateY(-8deg)",
          },
          "18.5%": {
            transform: "translateX(2.5px) rotateY(6deg)",
          },
          "31.5%": {
            transform: "translateX(-2px) rotateY(-4deg)",
          },
          "43.5%": {
            transform: "translateX(1.5px) rotateY(2deg)",
          },
          "50%": {
            transform: "translateX(0)",
          },
        },
        pulse: {
          from: {
            transform: "scale3d(1, 1, 1)",
          },
          "50%": {
            transform: "scale3d(1.05, 1.05, 1.05)",
          },
          to: {
            transform: "scale3d(1, 1, 1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        tada: "tada 1.125s cubic-bezier(0.455, 0.030, 0.515, 0.955) both",
        "head-shake": "head-shake 1s ease",
        pulse: "pulse 1s ease",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
