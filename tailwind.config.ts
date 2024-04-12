/*
  MeteoWeather is a Weather App 
  Copyright (C) 2024 Mukul Kedia

  MeteoWeather is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published
  by the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  MeteoWeather is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with MeteoWeather. If not, see <https://www.gnu.org/licenses/>.
*/

import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default {
	content: [
    "./src/**/*.astro"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["CascadiaCode", ...defaultTheme.fontFamily.mono]
      },
      spacing: {
        "4.5": "1.10rem",
      }
    }
  }
} satisfies Config