import Map from "./pages/Map";
import './App.css';
import { useState } from "react";
import { Location, Page, Theme, Weather } from "./types";
import { AppProvider } from "./appContext";
import Details from "./pages/Details";
import Tabs from "./components/Tabs";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [currentPage, _setCurrentPage] = useState(Page.MAP);
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  const [prevPage, setPrevPage] = useState<Page | null>(null);

  const setCurrentPage = (page: Page) => {
    if (page === currentPage) return;
    const [_prevPage, _currentPage] = [prevPage, currentPage];
    setPrevPage(_currentPage);
    _setCurrentPage(page);
    setTimeout(() => {
      setPrevPage(null);
    }, 500);
  }

  return <AppProvider value={{
    currentPage, setCurrentPage,
    location, setLocation,
    weather, setWeather,
    theme, setTheme,
  }}>
    <div className={`root ${theme === Theme.DARK ? 'dark' : 'light'}`}>
      <Header />
      <div className={`app ${theme === Theme.DARK ? 'dark' : 'light'}`}>
        <Tabs />
        <div style={{ flex: 1, position: 'relative', display: "flex" }}>
          <div className={`page-container map-page-container ${prevPage === Page.MAP ? 'prev' : ''} ${currentPage === Page.MAP ? 'current' : ''}`}>
            <Map active={currentPage === Page.MAP} />
          </div>
          <div className={`page-container details-page-container ${prevPage === Page.DETAILS ? 'prev' : ''} ${currentPage === Page.DETAILS ? 'current' : ''}`}>
            <Details active={currentPage === Page.DETAILS} />
          </div>
          <div className={`page-container settings-page-container ${prevPage === Page.SETTINGS ? 'prev' : ''} ${currentPage === Page.SETTINGS ? 'current' : ''}`}>
            <Settings active={currentPage === Page.SETTINGS} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </AppProvider>
}
