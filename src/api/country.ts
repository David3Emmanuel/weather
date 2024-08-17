const apikey = 'ZeW4R073W9kDEj98Iah8efSxMGKbJ5MS'; 

export const fetchWeatherData = async (lat: number, lon: number) => { 
    const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${apikey}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const values = data.timelines.daily[0].values;
    if (!values) {
        throw new Error('No weather data available');
    }
    console.log(values);

    return {
        "Temperature": values.temperatureAvg + '°C',
        "Humidity": values.humidityAvg,
        "Chance of Rain": values.precipitationProbabilityAvg + '%',
        "Wind Speed": values.windSpeedAvg,
    } as object
}