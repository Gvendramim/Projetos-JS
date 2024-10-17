const apiKey = '644aabbefef84fef81e232534241710';
const weatherResult = document.getElementById('weatherResult');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert('Por favor insira um nome de cidade.');
  }
});

function getWeather(city) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => {
      alert('Cidade não encontrada ou ocorreu um erro');
      console.error(error);
    });
}

function displayWeather(data) {
  if (data.error) {
    alert('Cidade não encontrada');
    return;
  }

  const temperature = data.current.temp_c;
  const description = data.current.condition.text;
  const icon = data.current.condition.icon;
  const cityName = data.location.name;
  const country = data.location.country;

  weatherResult.innerHTML = `
    <div class="weather-data">
      <h2>${cityName}, ${country}</h2>
      <img src="${icon}" alt="${description}" />
      <p>Temperatura: ${temperature}°C</p>
      <p>Descrição: ${description}</p>
    </div>
  `;

  weatherResult.style.display = 'block';
}
