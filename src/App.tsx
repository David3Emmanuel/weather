import Map from "./pages/Map";
import './App.css';
import { useState } from "react";
import { Location, Page, Weather } from "./types";
import { AppProvider } from "./appContext";
import Details from "./pages/Details";
import Tabs from "./components/Tabs";

export default function App() {
  const [currentPage, _setCurrentPage] = useState(Page.MAP);
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

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
  }}>
    <>
    <header>
      <h1>Clima</h1>
      <img src="/logo.svg" alt="logo" />
    </header>
      <div className="app">
        <Tabs />
        <div style={{ flex: 1, position: 'relative' }}>
          <div className={`page-container map-page-container ${prevPage === Page.MAP ? 'prev' : ''} ${currentPage === Page.MAP ? 'current' : ''}`}>
            <Map active={currentPage === Page.MAP} />
          </div>
          <div className={`page-container ${prevPage === Page.DETAILS ? 'prev' : ''} ${currentPage === Page.DETAILS ? 'current' : ''}`}>
            <Details active={currentPage === Page.DETAILS} />
          </div>
        </div>
      </div>
    </>
  </AppProvider>
}