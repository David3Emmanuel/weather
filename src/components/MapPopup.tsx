import { useEffect, useRef } from "react";
import { Location, Weather } from "../types";
import { Map as _Map, Popup } from 'mapbox-gl';

import './MapPopup.css';

export default function MapPopup({ location, weather, map }: {
    location: Location | null,
    weather: Weather | null,
    map: _Map | null,
}) {

    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const popup = new Popup({
            closeButton: false,
            closeOnClick: false,
            closeOnMove: false,
        });
        popup.setDOMContent(popupRef.current!);
        if (location) popup.setLngLat([location.lon, location.lat]);
        if (map) popup.addTo(map);

        return () => { popup.remove() };
    }, [location, map])

    return <div style={{ display: 'none' }}>
        <div ref={popupRef} className="map-popup__container">
            <div className="map-popup">
                <div className="map-popup__title">
                    {location && <>
                        <div className="map-popup__city">{location.name}</div>
                        <div className="map-popup__country">{location.country}</div>
                    </>}
                </div>
                <div className="map-popup__condition">
                    {weather && <>
                        <img src={weather.icon} alt="weather" />
                        <div>{weather.condition}</div>
                    </>}
                </div>
                <div className="map-popup__cta">See more</div>
            </div>
            <div className="map-popup__overlay">
                <div className="map-popup__cta">See more</div>
            </div>
        </div>
    </div>
}