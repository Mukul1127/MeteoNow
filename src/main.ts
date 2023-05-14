/*
This file is part of MeteoWeather.

MeteoWeather is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

MeteoWeather is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with MeteoWeather. If not, see
<https://www.gnu.org/licenses/>.

Copyright © 2022-2023 Open-Meteo.com
*/

import "flowbite";

const darkIconClasses = document.getElementById("dark-icon")!.classList;
const lightIconClasses = document.getElementById("light-icon")!.classList;
const classList = document.documentElement.classList;

if (localStorage.getItem("theme") === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  classList!.add("dark");
  lightIconClasses!.remove("hidden");
  lightIconClasses!.remove("invisible");
} else {
  classList!.remove("dark");
  darkIconClasses!.remove("hidden");
  lightIconClasses!.remove("invisible");
  lightIconClasses!.add("hidden");
}

const toggleThemeButton = document.getElementById("theme-toggle") as HTMLButtonElement;
const setDarkTheme = () => {
  classList!.add("dark");
  localStorage.setItem("theme", "dark");
  if (window.location.pathname != "/Today/") document.body.style.backgroundImage = `url("/backgroundDark.svg")`;
}
const setLightTheme = () => {
  classList!.remove("dark");
  localStorage.setItem("theme", "light");
  if (window.location.pathname != "/Today/") document.body.style.backgroundImage = `url("/backgroundLight.svg")`;
}

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem("theme") === "dark") setDarkTheme();
  else setLightTheme();
});

toggleThemeButton!.addEventListener("click", function () {
  darkIconClasses!.toggle("hidden");
  lightIconClasses!.toggle("hidden");

  if (typeof (localStorage.getItem("theme")) == null) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setDarkTheme();
    else setLightTheme();
  }

  if (localStorage.getItem("theme") == "light") setDarkTheme();
  else setLightTheme();
});

const fahrenheitCheckBox = document.getElementById("fahrenheit") as HTMLInputElement;
const celsiusCheckBox = document.getElementById("celsius") as HTMLInputElement;
const mphCheckBox = document.getElementById("mph") as HTMLInputElement;
const kmhCheckBox = document.getElementById("kmh") as HTMLInputElement;
const inchCheckBox = document.getElementById("inch") as HTMLInputElement;
const mmCheckBox = document.getElementById("mm") as HTMLInputElement;

if (localStorage.getItem("temp")) {
  if (localStorage.getItem("temp") === "fahrenheit") fahrenheitCheckBox.checked = true;
  else celsiusCheckBox.checked = true;
} else {
  fahrenheitCheckBox.checked = true;
  localStorage.setItem("temp", "fahrenheit");
}

if (localStorage.getItem("wind")) {
  if (localStorage.getItem("wind") === "mph") mphCheckBox.checked = true;
  else kmhCheckBox.checked = true;
} else {
  mphCheckBox.checked = true;
  localStorage.setItem("wind", "mph");
}

if (localStorage.getItem("precip")) {
  if (localStorage.getItem("precip") === "inch") inchCheckBox.checked = true;
  else mmCheckBox.checked = true;
} else {
  inchCheckBox.checked = true;
  localStorage.setItem("precip", "inch");
}

const openButton = document.getElementById("open") as HTMLButtonElement;
const closeButtons = document.getElementsByClassName("close") as HTMLCollectionOf<HTMLButtonElement>;
const modal = document.getElementById("modal") as HTMLDialogElement;
const doneButton = document.getElementById("done") as HTMLButtonElement;

openButton?.addEventListener("click", () => modal?.showModal());

for (const button of closeButtons) {
  button.addEventListener("click", () => {
    if (localStorage.getItem("temp") == "fahrenheit") fahrenheitCheckBox.checked = true;
    else celsiusCheckBox.checked = true;

    if (localStorage.getItem("wind") == "mph") mphCheckBox.checked = true;
    else kmhCheckBox.checked = true;

    if (localStorage.getItem("precip") == "inch") inchCheckBox.checked = true;
    else mmCheckBox.checked = true;

    modal?.close();
  })
};

doneButton?.addEventListener("click", () => {
  const temperatureBoxChecked = <HTMLInputElement>document.querySelector('input[name="temp"]:checked');
  if (typeof temperatureBoxChecked !== "undefined" && temperatureBoxChecked) localStorage.setItem("temp", temperatureBoxChecked.value);
  else localStorage.setItem("temp", "fahrenheit");

  const windSpeedBoxChecked = <HTMLInputElement>document.querySelector('input[name="wind"]:checked');
  if (typeof windSpeedBoxChecked !== "undefined" && windSpeedBoxChecked) localStorage.setItem("wind", windSpeedBoxChecked.value);
  else localStorage.setItem("wind", "mph");

  const precipitationBoxChecked = <HTMLInputElement>document.querySelector('input[name="precip"]:checked');
  if (typeof precipitationBoxChecked !== "undefined" && precipitationBoxChecked) localStorage.setItem("precip", precipitationBoxChecked.value);
  else localStorage.setItem("precip", "inch");

  modal?.close();
});