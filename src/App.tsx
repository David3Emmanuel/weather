import Map from "./pages/Map";
import './App.css';
import { useState } from "react";
import { Location, Page, Weather } from "./types";
import { AppProvider } from "./appContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState(Page.MAP);
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  return <AppProvider value={{
    currentPage, setCurrentPage,
    location, setLocation,
    weather, setWeather,
  }}>
    <div className="app">
      <Map active={currentPage === Page.MAP} />
    </div>
  </AppProvider>
}
