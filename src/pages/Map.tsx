import { useEffect, useRef, useState } from "react";
import Search from "../components/Search";
import { Location, Weather } from "../types";
import mapboxgl, { Map as _Map } from 'mapbox-gl';

import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MAPBOX_KEY } from '../../env';
import getCurrentWeather from "../api/getCurrentWeather";
import MapPopup from "../components/MapPopup";
import { useAppContext } from "../appContext";
mapboxgl.accessToken = MAPBOX_KEY;

export default function Map({ active }: { active: boolean }) {
    const mapContainer = useRef(null);
    const mapRef = useRef<_Map | null>();

    const [lng, setLng] = useState(3.3792);
    const [lat, setLat] = useState(6.5244);

    const {
        location: searchLocation,
        weather: searchWeather,
        setLocation: setSearchLocation,
        setWeather: setSearchWeather
    } = useAppContext();

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

        mapRef.current = map;
    });

    const handleSearch = (location: Location) => {
        if (mapRef.current) {
            mapRef.current.setCenter([location.lon, location.lat]);
            setSearchLocation(location);

            setSearchWeather(null);
            getCurrentWeather(location.id).then((weather: Weather) => {
                setSearchWeather(weather);
            })
        }
    }

    return <div className={`map-page ${active ? 'active' : ''}`}>
        <MapPopup map={mapRef.current || null} location={searchLocation} weather={searchWeather} />
        <div className="search-container">
            <Search submit={handleSearch} />
        </div>
        <div className="map-container" ref={mapContainer}></div>
    </div>
}