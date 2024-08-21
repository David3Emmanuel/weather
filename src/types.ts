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
