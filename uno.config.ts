/*
  MeteoWeather is a Accurate Weather App 
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

import { defineConfig, presetUno } from "unocss"

const uno = presetUno();

export default defineConfig({
  theme: {
    breakpoints: {
      "xs": "20rem",
      "sm": "40rem",
      "md": "48rem",
      "lg": "64rem",
      "xl": "80rem",
      "2xl": "96rem"
    },
    fontFamily: {
      sans: [
        "Inter", uno.theme.fontFamily.sans
      ]
    },
    animation: {
      keyframes: {
        blink: `{
          0%, 100% { opacity: 0; }
          50% { opacity: 1; },
        }`
      },
      durations: {
        blink: "1s",
      },
      timingFns: {
        blink: "ease-in-out",
      },
      counts: {
        blink: "infinite",
      },
    }
  }
});