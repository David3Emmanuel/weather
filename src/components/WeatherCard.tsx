import { useAppContext } from '../appContext';
import { Theme } from '../types';
import './WeatherCard.css';

export default function WeatherCard({ title, children, icon, darkIconColor, lightIconColor }: {
    title?: string,
    children: React.ReactNode,
    icon?: string,
    darkIconColor?: string,
    lightIconColor?: string,
}) {
    const { theme } = useAppContext();
    const color = theme === Theme.DARK ? darkIconColor : lightIconColor || darkIconColor;

    return <div className="weather-card">
        {title && <p className='weather-card__title'>{title} {icon && <span style={{ color }} className="weather-card__icon material-symbols-outlined">{icon}</span>}</p>}
        {children}
    </div>
}