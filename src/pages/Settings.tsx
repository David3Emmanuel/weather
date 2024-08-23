import PageHeader from '../components/PageHeader';
import ThemeButtons from '../components/ThemeButtons';
import './Settings.css';

export default function Settings({ active }: { active: boolean }) {
    return <main className={`settings-page ${active ? 'active' : ''}`}>
        <PageHeader title="Settings" />
        <div className='settings'>
            <div className='theme-settings'>
                <p>Theme</p>
                <ThemeButtons />
            </div>
        </div>
    </main>
}