import { useEffect, useRef, useState } from "react";
import Search from "../components/Search";
import { Location, Weather } from "../types";
import mapboxgl, { Map as _Map } from 'mapbox-gl';

import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import getCurrentWeather from "../api/getCurrentWeather";
import MapPopup from "../components/MapPopup";
import { useAppContext } from "../appContext";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

export default function Map({ active }: { active: boolean }) {
    const mapContainer = useRef(null);
    const mapRef = useRef<_Map | null>();

    const [lng, setLng] = useState(3.3792);
    const [lat, setLat] = useState(6.5244);

    const { setLocation, setWeather } = useAppContext();

    useEffect(() => {
        if (mapRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: 10
        });

        map.on('move', () => {
            setLng(map.getCenter().lng);
            setLat(map.getCenter().lat);
        });

        map.on('idle', function () {
            map.resize()
        })

        mapRef.current = map;
    });

    const handleSearch = (location: Location) => {
        if (mapRef.current) {
            mapRef.current.setCenter([location.lon, location.lat]);
            setLocation(location);

            setWeather(null);
            getCurrentWeather(location.id).then((weather: Weather) => {
                setWeather(weather);
            })
        }
    }

    return <main className={`map-page ${active ? 'active' : ''}`}>
        <MapPopup map={mapRef.current || null} />
        <div className="search-container">
            <Search submit={handleSearch} />
        </div>
        <div className="map-container" ref={mapContainer}></div>
    </main>
}