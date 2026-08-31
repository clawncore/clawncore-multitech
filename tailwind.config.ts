import type { Config } from "tailwindcss";

export default {
    darkMode: ["class", "[data-theme='dark']"],
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                nvidia: {
                    50: "#f0f9e0",
                    100: "#d4f0b8",
                    200: "#b8e790",
                    300: "#9cde68",
                    400: "#88d540",
                    500: "#76B900",
                    600: "#5a8f00",
                    700: "#3d6200",
                    800: "#2a4500",
                    900: "#1a2d00",
                },
                cc: {
                    dark: "#0a0a0f",
                    darker: "#050508",
                    card: "#111118",
                    surface: "#1a1a24",
                    border: "#2a2a35",
                },
                chart: {
                    "1": "var(--chart-1)",
                    "2": "var(--chart-2)",
                    "3": "var(--chart-3)",
                    "4": "var(--chart-4)",
                    "5": "var(--chart-5)",
                },
                sidebar: {
                    DEFAULT: "var(--sidebar-background)",
                    foreground: "var(--sidebar-foreground)",
                    primary: "var(--sidebar-primary)",
                    "primary-foreground": "var(--sidebar-primary-foreground)",
                    accent: "var(--sidebar-accent)",
                    "accent-foreground": "var(--sidebar-accent-foreground)",
                    border: "var(--sidebar-border)",
                    ring: "var(--sidebar-ring)",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Inter", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
                serif: ["var(--font-serif)"],
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "float": "float 6s ease-in-out infinite",
                "gradient": "gradient 3s ease infinite",
                "fade-up": "fadeUp 0.8s ease-out forwards",
                "slide-in-left": "slideInLeft 0.8s ease-out forwards",
                "slide-in-right": "slideInRight 0.8s ease-out forwards",
                "scale-in": "scaleIn 0.6s ease-out forwards",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite",
                "slide-up": "slideUp 0.5s ease-out forwards",
                "shimmer": "shimmer 2s linear infinite",
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
                float: {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-20px) rotate(180deg)" },
                },
                gradient: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                fadeUp: {
                    from: { opacity: "0", transform: "translateY(30px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                slideInLeft: {
                    from: { opacity: "0", transform: "translateX(-40px)" },
                    to: { opacity: "1", transform: "translateX(0)" },
                },
                slideInRight: {
                    from: { opacity: "0", transform: "translateX(40px)" },
                    to: { opacity: "1", transform: "translateX(0)" },
                },
                scaleIn: {
                    from: { opacity: "0", transform: "scale(0.9)" },
                    to: { opacity: "1", transform: "scale(1)" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(118, 185, 0, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(118, 185, 0, 0.6)" },
                },
                slideUp: {
                    from: { opacity: "0", transform: "translateY(100%)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    from: { backgroundPosition: "-200% 0" },
                    to: { backgroundPosition: "200% 0" },
                },
            },
            scrollSnapType: {
                y: "y mandatory",
                "y-proximity": "y proximity",
            },
            scrollSnapAlign: {
                start: "start",
                center: "center",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
