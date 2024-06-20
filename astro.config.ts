/*
  MeteoNow is a Weather App 
  Copyright (C) 2024 Mukul Kedia

  MeteoNow is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published
  by the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  MeteoNow is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with MeteoNow. If not, see <https://www.gnu.org/licenses/>.
*/

import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://meteonow.mookul.dev/",
  integrations: [
    (await import("@astrojs/tailwind")).default(),
    (await import("@astrojs/sitemap")).default(),
    (await import("@playform/compress")).default()
  ]
});
