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

© 2022-2023 Copyright: Open-Meteo.com
*/

import Chart from "chart.js/auto"

Chart.defaults.font.family = "InterVar";
Chart.defaults.font.size = 10;
Chart.defaults.font.weight = "bold";
Chart.defaults.elements.line.borderWidth = 1;
Chart.defaults.elements.line.normalized = true;
Chart.defaults.elements.line.spanGaps = true;

let chart: Chart;

function callCurrentAPI() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      getCurrentWeather({
        temperatureUnit: localStorage.getItem("temp")!,
        windSpeedUnit: localStorage.getItem("wind")!,
        precipitationUnit: localStorage.getItem("precip")!
      }, pos.coords.latitude, pos.coords.longitude);
    });
  }
}

callCurrentAPI();

async function getCurrentWeather(settings: {
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
    "cloudcover",
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
  API.searchParams.append("current_weather", "true");

  const response = await fetch(API);
  const data = await response.json();

  document.getElementById("temperature")!.innerText = `${data.current_weather.temperature} °${settings.temperatureUnit[0].toLocaleUpperCase()}`;
  document.getElementById("wind")!.innerText = `${data.current_weather.windspeed} ${settings.windSpeedUnit.toLocaleUpperCase()} Wind Speed`;
  document.getElementById("winddirection")!.innerText = `${data.current_weather.winddirection}° Wind Angle`;

  let BGImage;

  switch (data.current_weather.weathercode) {
    case 0: 
      BGImage = "/Images/Clear.webp";
      break;
    case 1:
    case 2:
    case 3:
      BGImage = "/Images/PartlyCloudy.webp";
      break;
    case 45:
    case 48:
      BGImage = "/Images/Fog.webp";
    case 51:
    case 53:
    case 55:
      BGImage = "/Images/Drizzle.webp";
      break;
    case 61:
    case 63:
    case 65:
      BGImage = "/Images/Rain.webp";
      break;
    case 56:
    case 57:
    case 66:
    case 67:
      BGImage = "/Images/FreezingRain.webp";
      break;
    case 71:
    case 73:
    case 75:
    case 77:
      BGImage = "/Images/Snow.webp";
      break;
    case 80:
    case 81:
    case 82:
      BGImage = "/Images/RainShowers.webp";
      break;
    case 85:
    case 86:
      BGImage = "/Images/SnowShowers.webp";
      break;
    case 95:
    case 96:
    case 99:
      BGImage = "/Images/Thunderstorm.webp";
      break;
  }

  document.body.style.background = `url(${BGImage}) no-repeat center center fixed`;
  document.body.style.backgroundSize = "cover";

  if (!chart) chart = new Chart(
    document.getElementById("chart")! as HTMLCanvasElement, {
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
            data: data.hourly.temperature_2m.slice(0, 24)
          },
          {
            label: `Relative Humidity in ${data.hourly_units.relativehumidity_2m}`,
            data: data.hourly.relativehumidity_2m.slice(0, 24)
          },
          {
            label: `Feels like in ${data.hourly_units.apparent_temperature}`,
            data: data.hourly.apparent_temperature.slice(0, 24)
          },
          {
            label: `Wind Speed in ${data.hourly_units.windspeed_10m}`,
            data: data.hourly.windspeed_10m.slice(0, 24)
          },
          {
            label: `Cloud Cover in ${data.hourly_units.cloudcover}`,
            data: data.hourly.cloudcover.slice(0, 24)
          },
          {
            label: `Precipitation in ${data.hourly_units.precipitation}`,
            data: data.hourly.precipitation.slice(0, 24)
          },
          {
            label: `Snowfall in ${data.hourly_units.snowfall}`,
            data: data.hourly.snowfall.slice(0, 24)
          },
          {
            label: `Precipitation Probability in ${data.hourly_units.precipitation_probability}`,
            data: data.hourly.precipitation_probability.slice(0, 24)
          },
          {
            label: `Snow Depth in ${data.hourly_units.snow_depth}`,
            data: data.hourly.snow_depth.slice(0, 24)
          }
        ],
      },
      options: {
        responsive: false,
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
    }
  )
  chart.data.datasets[0].label = `Temperature in ${data.hourly_units.temperature_2m}`;
  chart.data.datasets[0].data = data.hourly.temperature_2m.slice(0, 24)
  chart.data.datasets[1].label = `Relative Humidity in ${data.hourly_units.relativehumidity_2m}`;
  chart.data.datasets[1].data = data.hourly.relativehumidity_2m.slice(0, 24)
  chart.data.datasets[2].label = `Feels Like in ${data.hourly_units.apparent_temperature}`;
  chart.data.datasets[2].data = data.hourly.apparent_temperature.slice(0, 24)
  chart.data.datasets[3].label = `Wind Speed in ${data.hourly_units.windspeed_10m}`;
  chart.data.datasets[3].data = data.hourly.windspeed_10m.slice(0, 24)
  chart.data.datasets[4].label = `Precipitation in ${data.hourly_units.precipitation}`;
  chart.data.datasets[4].data = data.hourly.precipitation.slice(0, 24)
  chart.data.datasets[5].label = `Snowfall in ${data.hourly_units.snowfall}`;
  chart.data.datasets[5].data = data.hourly.snowfall.slice(0, 24)
  chart.data.datasets[6].label = `Precipitation Probability in ${data.hourly_units.precipitation_probability}`;
  chart.data.datasets[6].data = data.hourly.precipitation_probability.slice(0, 24)
  chart.data.datasets[7].label = `Snow Depth in ${data.hourly_units.snow_depth}`;
  chart.data.datasets[7].data = data.hourly.snow_depth.slice(0, 24)
  chart.update();

  document.getElementById("loader").classList.add("hidden");
  document.getElementById("content")?.classList.remove("hidden");
}

document.getElementById("done")?.addEventListener("click", () => callCurrentAPI());