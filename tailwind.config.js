/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        card: "rgba(255, 255, 255, 0.9)",
        cardBorder: "rgba(96, 193, 229, 0.25)",
        brand: {
          DEFAULT: "#60C1E5",
          50: "#F0F9FD",
          100: "#E1F3FA",
          200: "#C2E7F6",
          300: "#92D5F0",
          400: "#60C1E5",
          500: "#3BAFD9",
          600: "#2292BC",
          700: "#187192",
          800: "#12526A",
          900: "#0C3647",
        },
        cyber: {
          blue: "#60C1E5",
          purple: "#8B5CF6",
          cyan: "#60C1E5",
          pink: "#EC4899",
          emerald: "#10B981",
          amber: "#F59E0B"
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
