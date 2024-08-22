import { createContext, useContext } from "react";
import { Location, Page, Weather } from "./types";

export type AppContext = {
    currentPage: Page,
    setCurrentPage: (page: Page) => void,
    location: Location | null,
    setLocation: (location: Location | null) => void,
    weather: Weather | null,
    setWeather: (weather: Weather | null) => void,
}

const appContext = createContext<AppContext>({
    currentPage: Page.MAP,
    setCurrentPage: () => {},
    location: null,
    setLocation: () => {},
    weather: null,
    setWeather: () => {},
});

export const AppProvider = appContext.Provider;
export const useAppContext = () => useContext(appContext);
