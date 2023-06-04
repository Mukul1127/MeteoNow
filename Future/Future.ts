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

import Chart from "chart.js/auto";

Chart.defaults.font.family = "Inter";
Chart.defaults.font.size = 10;
Chart.defaults.font.weight = "bold";
Chart.defaults.elements.line.normalized = true;
Chart.defaults.elements.line.spanGaps = true;
Chart.defaults.elements.line.tension = 0.4;
Chart.defaults.elements.point.radius = 2.5;

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfWeek = (new Date).getDay();

let day1: Chart,
  day2: Chart,
  day3: Chart,
  day4: Chart,
  day5: Chart,
  day6: Chart,
  day7: Chart,
  data: Object;
const modal = document.getElementById("modal2") as HTMLDialogElement;

class WeekChart {
  constructor(id: string, slice: Array<number>) {
    this.chart = new Chart(document.getElementById(id)! as HTMLCanvasElement, {
      type: "line",
      data: {
        labels: [
          "12:00 AM",
          "1:00 AM",
          "2:00 AM",
          "3:00 AM",
          "4:00 AM",
          "5:00 AM",
          "6:00 AM",
          "7:00 AM",
          "8:00 AM",
          "9:00 AM",
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "1:00 PM",
          "2:00 PM",
          "3:00 PM",
          "4:00 PM",
          "5:00 PM",
          "6:00 PM",
          "7:00 PM",
          "8:00 PM",
          "9:00 PM",
          "10:00 PM",
          "11:00 PM"
        ],
        datasets: [{
          label: `Temperature in ${data.hourly_units.temperature_2m}`,
          data: data.hourly.temperature_2m.slice(slice[0],slice[1])
          },
          {
            label: `Relative Humidity in ${data.hourly_units.relativehumidity_2m}`,
            data: data.hourly.relativehumidity_2m.slice(slice[0],slice[1])
          },
          {
            label: `Feels Like in ${data.hourly_units.apparent_temperature}`,
            data: data.hourly.apparent_temperature.slice(slice[0],slice[1])
          },
          {
            label: `Wind Speed in ${data.hourly_units.windspeed_10m}`,
            data: data.hourly.windspeed_10m.slice(slice[0],slice[1])
          },
          {
            label: `Precipitation in ${data.hourly_units.precipitation}`,
            data: data.hourly.precipitation.slice(slice[0],slice[1])
          },
          {
            label: `Snowfall in ${data.hourly_units.snowfall}`,
            data: data.hourly.snowfall.slice(slice[0],slice[1])
          },
          {
            label: `Precipitation Probability in ${data.hourly_units.precipitation_probability}`,
            data: data.hourly.precipitation_probability.slice(slice[0],slice[1])
          },
          {
            label: `Snow Depth in ${data.hourly_units.snow_depth}`,
            data: data.hourly.snow_depth.slice(slice[0],slice[1])
          }
        ],
      },
      options: {
        transitions: {
          show: {
            animations: {
              x: {
                from: 0
              },
              y: {
                from: 0
              }
            }
          },
          hide: {
            animations: {
              x: {
                to: 0
              },
              y: {
                to: 0
              }
            }
          }
        }
      }
    })
  }
  update(slice: number[]) {
    this.chart.data.datasets[0].label = `Temperature in ${data.hourly_units.temperature_2m}`;
    this.chart.data.datasets[0].data = data.hourly.temperature_2m.slice(slice[0], slice[1]);
    this.chart.data.datasets[1].label = `Relative Humidity in ${data.hourly_units.relativehumidity_2m}`;
    this.chart.data.datasets[1].data = data.hourly.relativehumidity_2m.slice(slice[0], slice[1]);
    this.chart.data.datasets[2].label = `Feels Like in ${data.hourly_units.apparent_temperature}`;
    this.chart.data.datasets[2].data = data.hourly.apparent_temperature.slice(slice[0], slice[1]);
    this.chart.data.datasets[3].label = `Wind Speed in ${data.hourly_units.windspeed_10m}`;
    this.chart.data.datasets[3].data = data.hourly.windspeed_10m.slice(slice[0], slice[1]);
    this.chart.data.datasets[4].label = `Precipitation in ${data.hourly_units.precipitation}`;
    this.chart.data.datasets[4].data = data.hourly.precipitation.slice(slice[0], slice[1]);
    this.chart.data.datasets[5].label = `Snowfall in ${data.hourly_units.snowfall}`;
    this.chart.data.datasets[5].data = data.hourly.snowfall.slice(slice[0], slice[1]);
    this.chart.data.datasets[6].label = `Precipitation Probability in ${data.hourly_units.precipitation_probability}`;
    this.chart.data.datasets[6].data = data.hourly.precipitation_probability.slice(slice[0], slice[1]);
    this.chart.data.datasets[7].label = `Snow Depth in ${data.hourly_units.snow_depth}`;
    this.chart.data.datasets[7].data = data.hourly.snow_depth.slice(slice[0], slice[1]);
    this.chart.update();
  }
}

function callWeekAPI() {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(pos => {
    getWeekWeather({
      temperatureUnit: localStorage.getItem("temp")!,
      windSpeedUnit: localStorage.getItem("wind")!,
      precipitationUnit: localStorage.getItem("precip")!,
    }, pos.coords.latitude, pos.coords.longitude);
  }, showError);
}

callWeekAPI();

async function getWeekWeather(settings: {
  temperatureUnit: string;
  windSpeedUnit: string;
  precipitationUnit: string;
}, lat: number, lon: number) {
  const API = new URL("https://api.open-meteo.com/v1/forecast");
  API.searchParams.append("latitude", lat.toString());
  API.searchParams.append("longitude", lon.toString());
  API.searchParams.append("hourly", [
    "temperature_2m",
    "relativehumidity_2m",
    "apparent_temperature",
    "windspeed_10m",
    "precipitation",
    "snowfall",
    "precipitation_probability",
    "snow_depth",
  ].toString());
  API.searchParams.append("temperature_unit", settings.temperatureUnit);
  API.searchParams.append("windspeed_unit", settings.windSpeedUnit);
  API.searchParams.append("precipitation_unit", settings.precipitationUnit);
  API.searchParams.append("timeformat", "unixtime");
  API.searchParams.append("timezone", "auto");

  data = await (await fetch(API)).json();

  if (!day1) day1 = new WeekChart("chart1", [0, 24]);
  if (!day2) day2 = new WeekChart("chart2", [24, 48]);
  if (!day3) day3 = new WeekChart("chart3", [48, 72]);
  if (!day4) day4 = new WeekChart("chart4", [72, 96]);
  if (!day5) day5 = new WeekChart("chart5", [96, 120]);
  if (!day6) day6 = new WeekChart("chart6", [120, 144]);
  if (!day7) day7 = new WeekChart("chart7", [144, 168]);

  day1.update([0, 24]);
  day2.update([24, 48]);
  day3.update([48, 72]);
  day4.update([72, 96]);
  day5.update([96, 120]);
  day6.update([120, 144]);
  day7.update([144, 168]);

  document.getElementById("text1").innerHTML = `${daysOfWeek[dayOfWeek]} (Today)`;
  document.getElementById("text2").innerHTML = `${daysOfWeek[(dayOfWeek + 1) % 7]} (Tomorrow)`;
  document.getElementById("text3").innerHTML = daysOfWeek[(dayOfWeek + 2) % 7];
  document.getElementById("text4").innerHTML = daysOfWeek[(dayOfWeek + 3) % 7];
  document.getElementById("text5").innerHTML = daysOfWeek[(dayOfWeek + 4) % 7];
  document.getElementById("text6").innerHTML = daysOfWeek[(dayOfWeek + 5) % 7];
  document.getElementById("text7").innerHTML = daysOfWeek[(dayOfWeek + 6) % 7];

  document.getElementById("loader").classList.add("hidden");
  document.getElementById("footer")?.classList.remove("absolute");
}

function showError(error) {
  let errorCode = "";
  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorCode = "The location request was denied, please enable location access."
      break;
    case error.POSITION_UNAVAILABLE:
      errorCode = "Geolocation is unavailable, try updating your browser."
      break;
    case error.TIMEOUT:
      errorCode = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      errorCode = "An unknown error occurred."
      break;
  }

  document.getElementById("errorText")!.innerHTML = errorCode;
  document.getElementById("loader")?.classList.add("hidden");
  modal.showModal();
}

document.getElementById("done")?.addEventListener("click", callWeekAPI);
const closeButtons = document.getElementsByClassName("close") as HTMLButtonElement[];
for (const button of closeButtons) {
  button.addEventListener("click", () => modal.close());
}