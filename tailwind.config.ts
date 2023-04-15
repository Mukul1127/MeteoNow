import type { Config } from "tailwindcss"

export default {
  darkMode: "class",
  theme: { extend: { fontFamily: { sans: ["InterVariable", "sans-serif"] } } },
  content: ["./index.html", "./Today/index.html", "./Future/index.html", "./src/**/*.{js,ts,jsx,tsx}", "./Today/Today.ts", "./Future/Future.ts"],
  plugins: [import("flowbite/plugin")]
} satisfies Config