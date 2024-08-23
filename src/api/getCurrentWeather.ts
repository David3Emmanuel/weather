import { Weather } from "../types";

export default async function getCurrentWeather(id: number): Promise<Weather> {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHERAPI_KEY}&q=id:${id}&aqi=no`, {
        headers: { 'Access-Control-Allow-Origin': '*', },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as {
        current: {
            temp_c: number,
            condition: {
                text: string,
                icon: string,
            },
            wind_kph: number,
            wind_dir: string,
            pressure_mb: number,
            precip_mm: number,
            humidity: number,
        }
    };

    return {
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        icon: data.current.condition.icon,
        precipitation: data.current.precip_mm,
        pressure: data.current.pressure_mb,
        windDirection: data.current.wind_dir,
        windSpeed: data.current.wind_kph,
    }
}