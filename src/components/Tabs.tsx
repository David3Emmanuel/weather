import { useAppContext } from '../appContext';
import { Page } from '../types';
import './Tabs.css';

export default function Tabs() {
    return <aside className='tabs'>
        <Tab icon="map" label="Map" page={Page.MAP} className='map-tab' />
        <Tab icon="info" label="Details" page={Page.DETAILS} />
        <Tab icon="settings" label="Settings" page={Page.SETTINGS} />
    </aside>
}

export function Tab({ icon, label, page, className, inactive }: {
    icon: string,
    label?: string,
    page: Page,
    className?: string,
    inactive?: boolean,
}) {
    const { currentPage, setCurrentPage } = useAppContext();

    return <div
        className={`tab ${(!inactive && currentPage === page) ? 'active' : ''} ${className || ''}`}
        onClick={() => setCurrentPage(page)}
    >
        <span className="material-symbols-outlined" style={{fontSize: label?24:48}}>{icon}</span>
        {label && <p>{label}</p>}
    </div>
}