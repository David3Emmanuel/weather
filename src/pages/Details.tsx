import { useAppContext } from '../appContext';
import WeatherCard from '../components/WeatherCard';
import { Page } from '../types';
import './Details.css';

export default function Details({ active }: { active: boolean }) {
    const { location, weather, setCurrentPage } = useAppContext();

    const windDirectionIcons = {
        N: 'north',
        NE: 'north_east',
        E: 'east',
        SE: 'south_east',
        S: 'south',
        SW: 'south_west',
        W: 'west',
        NW: 'north_west',
    }

    const windDirectionIcon = windDirectionIcons[weather?.windDirection as keyof typeof windDirectionIcons] || '';

    return <main className={`details-page ${active ? 'active' : ''}`}>
        {location && <>
            <div className='details-page__header'>
                <span className="material-symbols-outlined" onClick={() => setCurrentPage(Page.MAP)}>arrow_back</span>
                <h2>Current Weather in {location?.name}</h2>
            </div>
            {weather && <div className='details'>
                <WeatherCard title="Temperature" icon="device_thermostat" iconColor='hsl(0deg 80% 50%)'>
                    {weather.temperature}°C
                </WeatherCard>
                <WeatherCard title="Humidity" icon='water_drop' iconColor='blue'>
                    {weather.humidity}%
                </WeatherCard>
                <WeatherCard title="Wind" icon='air'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p>{weather.windSpeed}m/s</p>
                        <span style={{verticalAlign: 'middle', height: 'fit-content'}} className='material-symbols-outlined'>{windDirectionIcon}</span>
                    </div>
                </WeatherCard>
                <WeatherCard>
                    <img src={weather.icon} alt="weather" />
                    <p style={{ textAlign: 'center' }}>{weather.condition}</p>
                </WeatherCard>
                <WeatherCard title="Pressure" icon='swap_driving_apps_wheel'>
                    {weather.pressure} hPa
                </WeatherCard>
                <WeatherCard title="Precipitation" icon='rainy' iconColor='blue'>
                    {weather.precipitation} mm
                </WeatherCard>
            </div>}
        </>}
        {!location && <>
            <div className='details-page__header'>
                <span className="material-symbols-outlined" onClick={() => setCurrentPage(Page.MAP)}>arrow_back</span>
                <h2>Back to map</h2>
            </div>
            <div className='details-page__empty' onClick={() => setCurrentPage(Page.MAP)}>
                <span className="material-symbols-outlined">info</span>
                <p>Select a location to see the weather</p>
            </div>
        </>}
    </main>
}