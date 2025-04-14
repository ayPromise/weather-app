import { WeatherAPIResponse } from "./weather";

export interface CachedWeatherData{
    data:WeatherAPIResponse,
    timestamp:number
}