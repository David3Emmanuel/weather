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

function Tab({ icon, label, page, className }: {
    icon: string,
    label: string,
    page: Page,
    className?: string,
}) {
    const { currentPage, setCurrentPage } = useAppContext();

    return <div
        className={`tab ${currentPage === page ? 'active' : ''} ${className || ''}`}
        onClick={() => setCurrentPage(page)}
    >
        <span className="material-symbols-outlined">{icon}</span>
        <p>{label}</p>
    </div>
}