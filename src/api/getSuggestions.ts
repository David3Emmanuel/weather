import { Location } from "../types";

export default async function getSuggestions(query: string): Promise<Location[]> {
    const WEATHERAPI_KEY = '2a0f16d5195d4da3b24172627242108';

    const trimmed = query.trim();
    if (!trimmed) return [];

    const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${WEATHERAPI_KEY}&q=${trimmed}`, {
        headers: { 'Access-Control-Allow-Origin': '*', },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as Location[];
}