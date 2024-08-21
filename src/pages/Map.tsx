import { useEffect, useRef, useState } from "react";
import MapTooltip from "../components/MapTooltip";
import Search from "../components/Search";

import './Map.css';

import mapboxgl, { Map as _Map } from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWQzZW1tYW51ZWwiLCJhIjoiY20wM3l6ajg1MDJ3bzJqc2hsd2I1NDV5MiJ9.A5MwSrv8it5HNPHAwA34bQ';

export default function Map({ active }: { active: boolean }) {
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);

    const mapContainer = useRef(null);
    const mapRef = useRef<_Map | null>(null);
    // 6.5244° N, 3.3792° E
    const [lng, setLng] = useState(3.3792);
    const [lat, setLat] = useState(6.5244);

    useEffect(() => {
        if (mapRef.current) return; // initialize map only once
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
    }, []);


    const hover = (e: React.MouseEvent) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        setLeft(e.clientX - bounds.left);
        setTop(e.clientY - bounds.top);

        setShowTooltip(e.clientX > bounds.left && e.clientX < bounds.right && e.clientY > bounds.top && e.clientY < bounds.bottom);
    }

    return <div
        className={`map-page ${active ? 'active' : ''}`}
    >
        <div className="search-container">
            <Search getSuggestions={city => [city]} submit={() => { }} />
        </div>
        <div className="map-container" onMouseMove={hover} ref={mapContainer}></div>
    </div>
}