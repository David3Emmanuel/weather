import './WeatherCard.css';

export default function WeatherCard({ title, children, icon, iconColor }: {
    title?: string,
    children: React.ReactNode,
    icon?: string,
    iconColor?: string,
}) {
    return <div className="weather-card">
        {title && <p className='weather-card__title'>{title} {icon && <span style={{color: iconColor}} className="weather-card__icon material-symbols-outlined">{icon}</span>}</p>}
        {children}
    </div>
}