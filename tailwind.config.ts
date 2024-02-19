import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default {
	content: [
    "./src/**/*.astro"
  ],
  darkMode: "class",
  plugins: [
    import("flowbite/plugin")
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter", {
            fontFeatureSettings: '"ss01", "cv05", "ss03"'
          }, ...defaultTheme.fontFamily.sans
        ]
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        }
      },
      animation: {
        blink: "blink 1s infinite"
      }
    }
  }
} satisfies Config