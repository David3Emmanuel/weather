const apiKey = 'ac2923b8c0c44fde9c9150005241808';
const baseUrl = 'http://api.weatherapi.com/v1/forecast.json?';
export async function fetchWeatherData(cityName: string, days: number): Promise<void> {
    const completeUrl = `${baseUrl}key=${apiKey}&q=${cityName}&days=${days}`;
    try {
        const response = await fetch(completeUrl);
        if (!response.ok) {
            throw new Error(`City not found: ${cityName}`);
        }
        const data = await response.json()

        // Extract current weather data
        const location = data.location.name;
        const region = data.location.region;
        const country = data.location.country;
        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;
        const humidity = data.current.humidity;
        const windSpeed = data.current.wind_kph;
        const pressure = data.current.pressure_mb;

        console.log(`Current weather for ${location}, ${region}, ${country}:`);
        console.log(`Temperature: ${temperature}°C`);
        console.log(`Condition: ${condition}`);
        console.log(`Humidity: ${humidity}%`);
        console.log(`Wind Speed: ${windSpeed} kph`);
        console.log(`Pressure: ${pressure} mb`);

        // Extract forecast data
        console.log(`\n${days}-Day Weather Forecast:`);
        data.forecast.forecastday.forEach((day: any) => {
            const date = day.date;
            const avgTemp = day.day.avgtemp_c;
            const condition = day.day.condition.text;
            const avgHumidity = day.day.avghumidity;
            const maxWindSpeed = day.day.maxwind_kph;
            const totalPrecipitation = day.day.totalprecip_mm;

            console.log(`Date: ${date}`);
            console.log(`Average Temperature: ${avgTemp}°C`);
            console.log(`Condition: ${condition}`);
            console.log(`Average Humidity: ${avgHumidity}%`);
            console.log(`Max Wind Speed: ${maxWindSpeed} kph`);
            console.log(`Total Precipitation: ${totalPrecipitation} mm\n`);
        });
    } catch (error) {
        console.error(error.message);
    }
}

fetchWeatherData('lagos', 3);