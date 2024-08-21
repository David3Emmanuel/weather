export enum Page { MAP, DETAILS, SETTINGS };
export type Location = {
    id: number,
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    url: string,
};
export type Weather = {
    temperature: number,
    condition: string,
    icon: string,
    windSpeed: number,
    windDirection: string,
    pressure: number,
    precipitation: number,
    humidity: number,
}
