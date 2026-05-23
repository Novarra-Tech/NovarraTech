import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
            colors: {
                brand: {
                    blue:    '#0ea5e9',
                    'blue-lt': '#7dd3fc',
                    'blue-dk': '#0369a1',
                    'blue-xl': '#0284c7',
                    cyan:    '#22d3ee',
                    navy:    '#0c2340',
                },
            },
            animation: {
                'fade-up':    'fadeUp 0.7s ease-out forwards',
                'fade-in':    'fadeIn 0.5s ease-out forwards',
                'bounce-slow':'bounce 2.5s infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%':   { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%':   { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [heroui({
        prefix: "heroui",
        addCommonColors: true,
        defaultTheme: "dark",
        defaultExtendTheme: "dark",
        themes: {
            light: {
                colors: {
                    background: "#ffffff",
                    foreground: "#0c2340",
                    primary:   { DEFAULT: "#0284c7", foreground: "#ffffff" },
                    secondary: "#f0f9ff",
                    focus:     "#0284c7",
                    content1:  "#f8fdff",
                    content2:  "#e0f2fe",
                    divider:   "rgba(14,165,233,0.12)",
                },
            },
            dark: {
                colors: {
                    background: "#020b18",
                    foreground: "#e8f4f8",
                    primary:   { DEFAULT: "#0ea5e9", foreground: "#ffffff" },
                    secondary: "#0c2340",
                    accent:    "#0284c7",
                    focus:     "#0ea5e9",
                    content1:  "#071525",
                    content2:  "#0c1f30",
                    divider:   "rgba(14,165,233,0.10)",
                },
            },
        }
    })],
}

module.exports = config;
