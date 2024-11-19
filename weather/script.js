const API_KEY = 'edf0a44c41bacf2dfb465f5456f82924';

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const forecastResponse = await fetch(forecastUrl);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error('City not found');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        displayWeather(weatherData);
        displayForecast(forecastData.list);

    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p>${error.message}</p>`;
        document.getElementById('forecast-result').innerHTML = '';
        document.querySelector('.forecast-container').style.display = 'none';
    }
}

function displayWeather(data) {
    document.getElementById('weather-result').innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

function displayForecast(data) {
    const dailyData = data.filter(item => item.dt_txt.includes("12:00:00"));
    const forecastHtml = dailyData.slice(0, 5).map(item => {
        const date = new Date(item.dt * 1000);
        return `
            <div class="forecast-day">
                <div>${date.toDateString()}</div>
                <div>Temperature: ${item.main.temp} °C</div>
                <div>Weather: ${item.weather[0].description}</div>
            </div>
        `;
    }).join('');

    document.getElementById('forecast-result').innerHTML = forecastHtml;
    document.querySelector('.forecast-container').style.display = 'block';
}
