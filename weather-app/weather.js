
  const apiKey = '780717444fc0c0fbb2fcf68e7cdd17e6';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

 
  const cityInput          = document.getElementById('locationinput');
  const searchButton       = document.getElementById('searchCity');
  const locationElement    = document.getElementById('location');
  const temperatureElement = document.getElementById('temprature');
  const descriptionElement = document.getElementById('description');

  
  searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) 
        {
            fetchWeather(city);
        }
  });

 
  async function fetchWeather(city) {
    const url = `${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      
      locationElement.textContent    = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
    } catch (err) {
      console.error('Error fetching data:', err);
      locationElement.textContent    = '—';
      temperatureElement.textContent = '—';
      descriptionElement.textContent = 'Unable to fetch weather';
    }
  }

