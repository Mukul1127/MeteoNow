/*
This file is part of MetroWeather.

MetroWeather is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

MetroWeather is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with MetroWeather. If not, see
<https://www.gnu.org/licenses/>.

Copyright © 2022-2023 Open-Meteo.com
*/

import "flowbite";

const darkIcon = document.getElementById("dark-icon");
const lightIcon = document.getElementById("light-icon");

if (
  localStorage.getItem("theme") === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  lightIcon!.classList.remove("hidden");
} else {
  document.documentElement.classList.remove("dark");
  darkIcon!.classList.remove("hidden");
}

const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn!.addEventListener("click", function () {
  darkIcon!.classList.toggle("hidden");
  lightIcon!.classList.toggle("hidden");

  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }
});

if (localStorage.getItem("temp")) {
  if (localStorage.getItem("temp") === "fahrenheit") {
    const fahrenheit = document.getElementById("fahrenheit") as HTMLInputElement;
    fahrenheit.checked = true;
  } else {
    const celsius = document.getElementById("celsius") as HTMLInputElement;
    celsius.checked = true;
  }
} else {
  const fahrenheit = document.getElementById("fahrenheit") as HTMLInputElement;
  fahrenheit.checked = true;
  localStorage.setItem("temp", "fahrenheit");
}

if (localStorage.getItem("wind")) {
  if (localStorage.getItem("wind") === "mph") {
    const mph = document.getElementById("mph") as HTMLInputElement;
    mph.checked = true;
  } else {
    const kmh = document.getElementById("kmh") as HTMLInputElement;
    kmh.checked = true;
  }
} else {
  const mph = document.getElementById("mph") as HTMLInputElement;
  mph.checked = true;
  localStorage.setItem("wind", "mph");
}

if (localStorage.getItem("precip")) {
  if (localStorage.getItem("precip") === "inch") {
    const inch = document.getElementById("inch") as HTMLInputElement;
    inch.checked = true;
  } else {
    const mm = document.getElementById("mm") as HTMLInputElement;
    mm.checked = true;
  }
} else {
  const inch = document.getElementById("inch") as HTMLInputElement;
  inch.checked = true;
  localStorage.setItem("precip", "inch");
}

document.getElementById("done")?.addEventListener("click", () => {
  const temp = <HTMLInputElement>document.querySelector('input[name="temp"]:checked'); 
  if (temp) localStorage.setItem("temp", temp.value);
  else localStorage.setItem("temp", "fahrenheit"); 

  const wind = <HTMLInputElement>document.querySelector('input[name="wind"]:checked'); 
  if (wind) localStorage.setItem("wind", wind.value);
  else localStorage.setItem("wind", "mph");

  const precip = <HTMLInputElement>document.querySelector('input[name="precip"]:checked'); 
  if (precip) localStorage.setItem("precip", precip.value);
  else localStorage.setItem("precip", "inch");
})