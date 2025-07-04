
  const apiKey = '780717444fc0c0fbb2fcf68e7cdd17e6';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

 
  const cityInput          = document.getElementById('locationinput');
  const searchButton       = document.getElementById('searchCity');
  const locationElement    = document.getElementById('location');
  const temperatureElement = document.getElementById('temprature');
  const descriptionElement = document.getElementById('description');
  const ForecastElement    = document.getElementById('forecast');

  
  searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) 
        {
            fetchWeather(city);
        }
  });

 
  async function fetchWeather(city) {
  const currentUrl  = `${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    // 1️⃣ Current weather
    const currentRes = await fetch(currentUrl);
    if (!currentRes.ok) throw new Error(`Current: HTTP ${currentRes.status}`);
    const currentData = await currentRes.json();

    // 2️⃣ 5‑day / 3‑hour forecast
    const forecastRes = await fetch(forecastUrl);
    if (!forecastRes.ok) throw new Error(`Forecast: HTTP ${forecastRes.status}`);
    const forecastData = await forecastRes.json();

    // 3️⃣ Show current weather
    locationElement.textContent    = currentData.name;
    temperatureElement.textContent = `${Math.round(currentData.main.temp)}°C`;
    descriptionElement.textContent = currentData.weather[0].description;

    // 4️⃣ Clear + build forecast list

    for (let i = 0; i < 5; i++) {
      const item = forecastData.list[i];           
      const time = item.dt_txt;
      const temp = Math.round(item.main.temp);
      const desc = item.weather[0].description;

      const forecastItem = document.createElement("div");
      forecastItem.className = "forecast-item";
      forecastItem.innerHTML = `
        <strong>${time}</strong><br>
        ${temp}°C<br>
        ${desc}
      `;

      ForecastElement.appendChild(forecastItem);
    }

  } catch (err) {
    console.error("Error fetching data:", err);
    locationElement.textContent    = "—";
    temperatureElement.textContent = "—";
    descriptionElement.textContent = "Unable to fetch weather";
    ForecastElement.innerHTML      = "";
  }
}
