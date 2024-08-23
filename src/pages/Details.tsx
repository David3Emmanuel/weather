import { useAppContext } from '../appContext';
import PageHeader from '../components/PageHeader';
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
            <PageHeader title={`Current Weather in ${location?.name}`} />
            <h2>Current Weather in {location?.name}</h2>
            {weather && <div className='details'>
                <WeatherCard
                    title="Temperature"
                    icon="device_thermostat"
                    darkIconColor='hsl(0deg 80% 50%)'
                    lightIconColor='hsl(0 53% 79%)'
                >
                    {weather.temperature}°C
                </WeatherCard>
                <WeatherCard
                    title="Humidity"
                    icon='water_drop'
                    darkIconColor='blue'
                    lightIconColor='lightblue'
                >
                    {weather.humidity}%
                </WeatherCard>
                <WeatherCard title="Wind" icon='air'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p>{weather.windSpeed}m/s</p>
                        <span style={{ verticalAlign: 'middle', height: 'fit-content' }} className='material-symbols-outlined'>{windDirectionIcon}</span>
                    </div>
                </WeatherCard>
                <WeatherCard>
                    <img src={weather.icon} alt="weather" />
                    <p style={{ textAlign: 'center' }}>{weather.condition}</p>
                </WeatherCard>
                <WeatherCard title="Pressure" icon='swap_driving_apps_wheel' lightIconColor='white'>
                    {weather.pressure} hPa
                </WeatherCard>
                <WeatherCard
                    title="Precipitation"
                    icon='rainy'
                    darkIconColor='blue'
                    lightIconColor='lightblue'
                >
                    {weather.precipitation} mm
                </WeatherCard>
            </div>}
        </>}
        {!location && <>
            <PageHeader title="Back to map" />
            <div className='details-page__empty' onClick={() => setCurrentPage(Page.MAP)}>
                <span className="material-symbols-outlined">info</span>
                <p>Select a location to see the weather</p>
            </div>
        </>}
    </main>
}