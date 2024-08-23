import { useAppContext } from '../appContext';
import { Theme } from '../types';
import './ThemeButtons.css';

export default function ThemeButtons() {
    const { theme, setTheme } = useAppContext();

    return <div className='theme-buttons'>
        <button
            className={`dark ${theme === Theme.DARK ? 'active' : ''}`}
            onClick={() => setTheme(Theme.DARK)}
        >
            Dark
        </button>
        <button
            className={`light ${theme === Theme.LIGHT ? 'active' : ''}`}
            onClick={() => setTheme(Theme.LIGHT)}
        >
            Light
        </button>
    </div>
}