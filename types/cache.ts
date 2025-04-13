import { WeatherAPIResponse } from "./weather";

export interface CacheItem{
    data:WeatherAPIResponse,
    timestamp:number
}