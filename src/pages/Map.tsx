import { useEffect, useRef, useState } from "react";
import Search from "../components/Search";
import { Location } from "../types";
import mapboxgl, { Map as _Map, Marker } from 'mapbox-gl';

import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWQzZW1tYW51ZWwiLCJhIjoiY20wM3l6ajg1MDJ3bzJqc2hsd2I1NDV5MiJ9.A5MwSrv8it5HNPHAwA34bQ';

export default function Map({ active }: { active: boolean }) {
    const mapContainer = useRef(null);
    const mapRef = useRef<_Map | null>();

    const [lng, setLng] = useState(3.3792);
    const [lat, setLat] = useState(6.5244);

    const [hoverLng, setHoverLng] = useState(3.3792);
    const [hoverLat, setHoverLat] = useState(6.5244);

    const markerElement = document.createElement('div');
    markerElement.className = 'map-tooltip';

    const markerImage = document.createElement('img');
    markerImage.src = 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
    markerElement.appendChild(markerImage);

    const marker = new Marker(markerElement, { anchor: "bottom" });

    const hoverMarkerElement = document.createElement('div');
    hoverMarkerElement.className = 'map-tooltip hover';

    const hoverMarkerImage = document.createElement('img');
    hoverMarkerImage.src = 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
    hoverMarkerElement.appendChild(hoverMarkerImage);

    const hoverMarker = new Marker(hoverMarkerElement, { anchor: "bottom" });

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

        map.on('mousemove', e => {
            setHoverLng(e.lngLat.lng);
            setHoverLat(e.lngLat.lat);

            hoverMarker.remove();
            hoverMarker.setLngLat(e.lngLat);
            hoverMarker.addTo(map);
        })

        map.on('mouseleave', () => hoverMarker.remove());

        mapRef.current = map;
    });

    const handleSearch = (location: Location) => {
        if (mapRef.current) {
            mapRef.current.setCenter([location.lon, location.lat]);
            marker.remove();
            marker.setLngLat([location.lon, location.lat]);
            marker.addTo(mapRef.current);
        }
    }

    return <div className={`map-page ${active ? 'active' : ''}`}>
        <div className="search-container">
            <Search submit={handleSearch} />
        </div>
        <div className="map-container" onMouseMove={() => { }/*hover*/} ref={mapContainer}></div>
    </div>
}