import { useAppContext } from "../appContext";
import { Page, Theme } from "../types";
import { Tab } from "./Tabs";
import ThemeButtons from "./ThemeButtons";

import './Header.css';

export default function Header() {
    const {theme, setCurrentPage, currentPage} = useAppContext();

    return <header className={theme === Theme.DARK ? 'dark' : 'light'}>
        <h1 onClick={() => setCurrentPage(Page.MAP)}>Clima</h1>
        <img src="/logo.svg" alt="logo" onClick={() => setCurrentPage(Page.MAP)} />
        <Tab icon="settings" page={Page.SETTINGS} inactive />
        {currentPage !== Page.SETTINGS && <ThemeButtons />}
    </header>
}